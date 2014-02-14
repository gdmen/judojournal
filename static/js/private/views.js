/*
 * Allows use of all Handlebars templates as partials.
 */
Handlebars.partials = Handlebars.templates;
JJ.Util.links.edit.prefix = "";

/************************************************************
 *
 * JJ.Views.AbstractEditModel
 *  - Attaches a form view to a model.
 *  - Updates the model on input changes.
 *  - Does *not* update the view on model changes.
 *
 ************************************************************/
JJ.Views.AbstractEditModel = JJ.Views.AbstractView.extend({
  template: null,
  baseEvents: {
    "keyup input": "throttledChange",
    "change input": "change",
    "change select": "change",
    "keyup textarea": "throttledChange",
    "change textarea": "change",
  },
  
  // For subclasses to add events.
  extendEvents: {},
  
  events: function() {
    return _.extend({},this.baseEvents,this.extendEvents);
  },
  
  /*
   * Updates the model on input changes.
   */
	autosave: false,
  change: function(e) {
		var name = e.currentTarget.name;
    //console.log("Changed: " + name);
    var splitName = name.split(":");
    if (splitName[0] === this.model.cid) {
      var field = splitName.pop();
			var value = $(e.currentTarget).val();
      this.model.set(field, value);
			//console.log(value.length);
      console.log("Set " + field + " to " + value.length + " in " + this.model.cid);
			this.autosave && this.save();
    }
  },
	
	_previousCall: new Date().getTime(),
	throttledChange: function(e) {
		var time = new Date().getTime();
		//console.log("t");
		if ((time - this._previousCall) >= 1000) {
			this._previousCall = time;
			this.change(e);
		}
	},
	//JJ.Util.throttle(this.change, 1000),
  
  /*
   * Saves this view's model.
	 * Calls this.firstSave if the model was new.
   */
  save: function() {
    this.startSave();
		var model = this.model;
    var isNew = model.isNew();
		var clone = model.dehydrated();
    var that = this;
    clone.save(null, {
      success: function(m) {
        that.disableSave();
        if (isNew) {
					model.set({id: m.get("id"), resource_uri: m.get("resource_uri")}, {silent: true});
					that.firstSave(model);
        }
				that.endSave(model);
      },
      error: JJ.Util.backboneError,
    });
  },
	
  /*
	 * Called on the first time this model is saved.
   */
	firstSave: function(model) {
		console.log("ABSTRACT FIRST SAVE");
	},
	/*
	 * Called after each save.
	 */
	endSave: function(model) {
		console.log("ABSTRACT END SAVE");
	},
	 
  /*
   * UI handling for starting and ending saving.
   */
  startSave: function() {
		console.log("**********START SAVING**********");
		console.log(this.model.cid);
		this.$el.find(this.selectors.save).removeClass("enabled disabled");
		this.$el.find(this.selectors.save).addClass("saving");
  },
	enableSave: function() {
		//console.log("**********ENABLED**********");
		//console.log(this.model.cid);
		this.$el.find(this.selectors.save).removeClass("disabled saving");
		this.$el.find(this.selectors.save).addClass("enabled");
	},
  disableSave: function() {
		//console.log("**********DONE SAVING**********");
		//console.log(this.model.cid);
		this.$el.find(this.selectors.save).removeClass("enabled saving");
		this.$el.find(this.selectors.save).addClass("disabled");
  },
  
  initialize: function(options) {
		this.selectors = {};
		this.selectors["save"] = "#" + this.model.cid + "-save";
		this.baseEvents["click " + this.selectors.save + ".enabled"] = "save";
		this.model.on("change", this.enableSave, this);
		// TODO - fix where this is used. It's weird.
		this.model.parentView = this;
  },
  
  render: function() {
    this.model.hydrate();
    this.$el.html(this.template(this.model.toJSON()));
		// TODO: Not sure that this is a good  place for this. Should either be
		// less specific or more specific.
		$("textarea").autosize();
    return this;
  },
});

/*
 * JJ.Views.AbstractEditModel instances
 */
 
JJ.Views.EditListElement = JJ.Views.AbstractEditModel.extend({
  // If this is the first save, add to parentView.
	firstSave: function(model) {
		this.parentView.addModel(model);
	},
	endSave: function(model) {
		this.parentView.hideModal();
	},
	
	initialize: function(options) {
		this.parentView = options.parentView;
		return JJ.Views.AbstractEditModel.prototype.initialize.call(this, options);
	},
});

JJ.Views.EditNote = JJ.Views.EditListElement.extend({
  template: Handlebars.templates["entry/module/note/single"],
});
JJ.Views.EditDrill = JJ.Views.EditListElement.extend({
  template: Handlebars.templates["entry/module/drill/single"],
});
JJ.Views.EditSparring = JJ.Views.EditListElement.extend({
  template: Handlebars.templates["entry/module/sparring/single"],
});

/************************************************************
 *
 * JJ.Views.AbstractSelectModel
 *  - Manages a <select> form element for a parent model.
 *  - Does *not* update the view on model changes.
 *
 ************************************************************/
JJ.Views.AbstractSelectModel = JJ.Views.AbstractView.extend({
  template: null,
  // The parent model's field that is to be selected.
  field: "",
  collectionConstructor: null,
  uniqueKey: "",
  placeholder: "",
  hint: "",
	icon: {
		className: "fa fa-pencil",
		text: "",
	},
  // TODO: move this to initialize()? Would be easier to maintain naming
  // consistent with template.
  events: {
    "click .select-display .edit-link": "showDrop",
    "click .click-away-overlay": "hideDrop",
    "keyup .select-search > input": "filterOptions",
    "click .select-option": "selectOption",
    "click .select-create": "createModel",
  },
  
  showDrop: function(e) {
    this.$el.find(this.selectors.drop).show();
    this.$el.find(this.selectors.search).focus();
    this.$el.find(this.selectors.clickAway).show();
  },
  
  hideDrop: function(e) {
    this.$el.find(this.selectors.drop).hide();
    this.$el.find(this.selectors.clickAway).hide();
  },
  
  filterOptions: function(e) {
    var filter = $(e.currentTarget).val().toLowerCase();
    var that = this;
    var noExactMatch = true;
    this.collection.each(function(m) {
      var mSelector = "#" + that.getOptionId(m);
      if (m.get(that.uniqueKey).toLowerCase().indexOf(filter) > -1) {
        that.$el.find(mSelector).show();
				if (m.get(that.uniqueKey).toLowerCase() === filter) {
					noExactMatch = false;
				}
      } else {
        that.$el.find(mSelector).hide();
      }
    });
    var createElement = this.$el.find(this.selectors.create);
    var createVal = this.$el.find(this.selectors.search).val();
    if (noExactMatch && createVal !== "") {
      createElement.html("Add '" + createVal + "'");
      createElement.show();
    } else {
      createElement.hide();
    }
  },
  
  getOptionId: function(model) {
    return this.field + "-select-option-" + model.get("id");
  },
  
  selectOption: function(e) {
    var target = $(e.currentTarget);
    target.addClass("option-selected").siblings().removeClass("option-selected");
    this.$el.find(this.selectors.input).val(target.data('value')).change();
    this.render();
  },
  
  createModel: function(e) {
    console.log("CREATE MODEL");
    var createVal = this.$el.find(this.selectors.search).val();
    if (createVal === "") {
      return;
    }
		// Start create display
    var createElement = this.$el.find(this.selectors.create);
		createElement.html("Creating '" + createVal + "' <i class='fa fa-spinner fa-spin'></i>");
    
		// Save new model
    var params = {};
    params[this.uniqueKey] = createVal;
    var model = new this.collection.model(params);
    var that = this;
    model.save(null, {
      success: function(m) {
        //console.log("SAVED new SelectModel...");
        //console.log(m);
        that.model.set(that.field, m.get("resource_uri"));
        that.collection.add(m);
				// TODO: avoid the full re-render
        that.render();
      },
      error: JJ.Util.backboneError,
    });
  },
  
  initialize: function(options) {
    this.model = options.model;
    
    var vs = {};
    vs.div = "#" + this.field + "-select";
    vs.clickAway = vs.div + " .click-away-overlay";
    vs.input = vs.div + " .select-input";
    vs.display = vs.div + " .select-display";
    vs.drop = vs.div + " .select-drop";
    vs.search = vs.drop + " .select-search > input";
    vs.create = vs.drop + " .select-create";
    
    this.selectors = vs;
    
    this.collection = new this.collectionConstructor();
    
    // TODO: this is kinda hinky
    // Initially loaded Entry is hydrated => full object in this field rather
    // than just the resource_uri
    var selectedModel = this.model.get(this.field);
    
    if (!_.isUndefined(selectedModel) && !_.isString(selectedModel)) {
      this.selectedKey = selectedModel[this.uniqueKey];
			params = {};
			params[this.field] = selectedModel["resource_uri"];
      this.model.set(params, {silent:true});
    }
    this.render();
    // Load collection.
    var that = this;
    this.collection.fetch({
      success: function(c) {
        that.render();
      },
      error: JJ.Util.backboneError,
    });
  },
  
  render: function() {
    var options = [];
    // Sets the currently selected element before rendering view.
    var selectedURI = this.model.get(this.field);
    var that = this;
    this.collection.each(function(m) {
      var isSelected = (m.get("resource_uri") === selectedURI);
      options.push({
        name: m.get(that.uniqueKey),
        resource_uri: m.get("resource_uri"),
        selected: isSelected,
        id: that.getOptionId(m),
      });
      if (isSelected) {
        that.selectedKey = m.get(that.uniqueKey);
      }
    });

    var json = {
      cid: this.model.cid,
      field: this.field,
      options: options,
      placeholder: this.placeholder,
      hint: this.hint,
			icon: this.icon,
      selectedKey: this.selectedKey,
    };
    
    this.$el.html(this.template(json));
    return this;
  },
});

/*
 * JJ.Views.AbstractSelectModel instances
 */

JJ.Views.SelectArt = JJ.Views.AbstractSelectModel.extend({
  template: Handlebars.templates["entry/select"],
  field: "art",
  uniqueKey: "name",
  collectionConstructor: JJ.Models.ArtCollection,
  placeholder: "Art",
  hint: "e.g. Judo",
});

JJ.Views.SelectType = JJ.Views.AbstractSelectModel.extend({
  template: Handlebars.templates["entry/select"],
  field: "type",
  uniqueKey: "name",
  collectionConstructor: JJ.Models.TypeCollection,
  placeholder: "Class",
  hint: "e.g. Practice",
});

JJ.Views.SelectLocation = JJ.Views.AbstractSelectModel.extend({
  template: Handlebars.templates["entry/select"],
  field: "location",
  uniqueKey: "name",
  collectionConstructor: JJ.Models.LocationCollection,
  placeholder: "Location",
  hint: "e.g. Kodokan",
	icon: {
		className: "",
		text: "@",
	},
});


/************************************************************
 *
 * JJ.Views.AbstractEditModelList
 *  - Manages a list of AbstractEditModel's for a parent.
 *  - Does *not* update the view on model changes.
 *
 ************************************************************/
JJ.Views.AbstractEditModelList = JJ.Views.AbstractView.extend({
  template: null,
  model: null,
  // Subclasses set to the parent model's array field that is to be managed.
  field: "",
  insertViewConstructor: null,
  insertModelConstructor: null,
  events: {
    "click .add-model": "newModel",
    "click .click-away-overlay": "hideModal",
		"click .close-modal": "hideModal",
		"click .edit-model": "editModel",
		"click .delete-model": "deleteModel",
  },
	
  showModal: function(model) {
		if (this.currentModalView) {
			this.currentModalView.close();
		}
    this.currentModalView = new this.insertViewConstructor({model: model, parentView: this});
		this.$el.find(this.selectors.modal).html(this.currentModalView.el);
		this.currentModalView.render();
		this.$el.find(this.selectors.modalWrapper).show();
    this.$el.find(this.selectors.focus).focus();
    this.$el.find(this.selectors.clickAway).show();
		$("body").addClass("active-modal").css("margin-right", JJ.Util.scrollbarWidth() + "px");
  },
  
  hideModal: function(e) {
    this.$el.find(this.selectors.modalWrapper).hide();
    this.$el.find(this.selectors.clickAway).hide();
		$("body").removeClass("active-modal").css("margin-right", "");
		this.render();
  },
	
  /*
   * Spawns creation modal.
   */
	newModel: function(e) {
    var model = new this.insertModelConstructor();
		this.showModal(model);
	},
	
  /*
   * Spawns edit modal.
   */
	editModel: function(e) {
		var buttonDiv = $(e.currentTarget).parent();
    var uri = buttonDiv.data("uri").split("-")[0];
		
    var model = this.modelArray[this._getIndexByURI(uri)];
		this.showModal(model);
	},
	
  /*
   * Adds a saved model to the parent model's list.
	 * Triggers ui save for parent model's view.
   */
  addModel: function(model) {
    console.log("addModel");
		if (_.isUndefined(model.get("id"))) {
			console.log("THIS IS A BIG PROBLEM");
			return;
		}
		this.modelArray.push(model);
		this.model.set(this.field, this.modelArray);
		this.render();
		this.model.parentView.save();
  },
  
	/*
	 * Removes parent div and then removes model.
	 */
	deleteModel: function(e) {
		var buttonDiv = $(e.currentTarget).parent();
    var uri = buttonDiv.data("uri").split("-")[0];
		
		this.removeModel(this._getIndexByURI(uri));
		
		var root = buttonDiv.parent().parent();
		root.unbind();
		root.remove();
	},
	
	_getIndexByURI: function(uri) {
		for (var i=0; i < this.modelArray.length; i++) {
			if ((!_.isUndefined(this.modelArray[i].get) && this.modelArray[i].get("resource_uri") === uri)
				 || (this.modelArray[i] === uri)) {
				return i;
			}
		}
		return -1;
	},
	
  /*
   * Removes model by:
	 * - removing from parent model's list
	 * - //backbone-destroying
	 *  (currently not doing this in order to preserve manual entry saving idiom)
   */
  removeModel: function(index) {
    console.log("removeModel");
		this.modelArray.splice(index, 1);
		this.model.set(this.field, this.modelArray);
		
    /*var that = this;
    model.destroy({
      success: function(m) {
        console.log("Destroyed a model...");
        console.log(m);
      },
      error: JJ.Util.backboneError,
    });*/
  },
  
  initialize: function(options) {
		this.listViews = [];
		
    var vs = {};
		vs.controls = ".list-controls";
    vs.modalWrapper = ".modal-wrapper";
    vs.clickAway = vs.modalWrapper + " .click-away-overlay";
    vs.modal = vs.modalWrapper + " .modal";
		vs.focus = vs.modal + " .focus";
    vs.list = ".model-list";
    
    this.selectors = vs;
    this.render();
  },
  
  render: function() {
    this.modelArray = this.model.get(this.field).slice(0);
		var json = {models: JSON.parse(JSON.stringify(this.modelArray))};
    this.$el.html(this.template(json));
    
    JJ.Views.Util.configModals();
    return this;
  },
});

/*
 * JJ.Views.AbstractEditModelList instances
 */
JJ.Views.EditNoteList = JJ.Views.AbstractEditModelList.extend({
  template: Handlebars.templates["entry/module/note/list"],
  field: "notes",
  insertViewConstructor: JJ.Views.EditNote,
  insertModelConstructor: JJ.Models.NoteEntryModule,
});
JJ.Views.EditDrillList = JJ.Views.AbstractEditModelList.extend({
  template: Handlebars.templates["entry/module/drill/list"],
  field: "drills",
  insertViewConstructor: JJ.Views.EditDrill,
  insertModelConstructor: JJ.Models.DrillEntryModule,
});
JJ.Views.EditSparringList = JJ.Views.AbstractEditModelList.extend({
  template: Handlebars.templates["entry/module/sparring/list"],
  field: "sparring",
  insertViewConstructor: JJ.Views.EditSparring,
  insertModelConstructor: JJ.Models.SparringEntryModule,
});

/************************************************************
 *
 * JJ.Views.TimeSelect
 *  - Attaches a multi-input time select to a single datetime field.
 *  - Updates the model on input changes.
 *  - Does *not* update the view on model changes.
 *
 ************************************************************/
JJ.Views.TimeSelect = JJ.Views.AbstractView.extend({
  template: Handlebars.templates["partials/time"],
  events: {
    "change select": "change",
  },
  
  /*
   * Updates the model on input changes.
   */
	change: function(e) {
		var hour = this.$el.find("#" + this.field + "-hour").val();
		var minute = this.$el.find("#" + this.field + "-minute").val();
		var period = this.$el.find("#" + this.field + "-period").val();
		var date = this.dateEl.val();
		var datetime = new Date(date + " " + hour + ":" + minute + " " + period);
		if (!isNaN(datetime.getTime())) {
			this.model.set(this.field, datetime);
			console.log("Set " + this.field + " time:");
			console.log(this.model.get(this.field));
		} else {
			console.log("PROBLEMS: DID NOT set " + this.field + " time.");
		}
	},
  
  initialize: function(options) {
		this.field = options.field;
		this.dateEl = options.dateEl;
		this.hours = options.hours;
		this.minutes = options.minutes;
		this.periods = options.periods;
    this.render();
  },
  
  render: function() {
		var json = {
			identifier: this.field,
			hours: this.hours,
			minutes: this.minutes,
			periods: this.periods,
		}
    this.$el.html(this.template(json));
    return this;
  },
});


/************************************************************
 *
 * Main(parent) view for JudoEntry form.
 *
 ************************************************************/
JJ.Views.EditJudoEntry = JJ.Views.AbstractEditModel.extend({
  template: Handlebars.templates["entry/judo/single"],
  extendEvents: {
		"change #date": "dateChanged",
    "click .click-away-overlay": "hideModals",
    "click .modal-trigger": "showModal",
  },
	autosave: true,
	
  showModal: function(e) {
		var classes = e.currentTarget.className.split(" ");
		var filteredClasses = [];
		for (var i in classes) {
			if (classes[i] !== "modal-trigger" && classes[i].indexOf("modal") !== -1) {
				filteredClasses.push(classes[i]);
			}
		}
		var modalWrapper = this.$el.find("." + filteredClasses.join("."));
		modalWrapper.show();
    modalWrapper.find(".focus").focus();
    modalWrapper.find(".click-away-overlay").show();
		$("body").addClass("active-modal").css("margin-right", JJ.Util.scrollbarWidth() + "px");
  },
  
  hideModals: function(e) {
    this.$el.find(".modal-wrapper").hide();
    this.$el.find(".click-away-overlay").hide();
		$("body").removeClass("active-modal").css("margin-right", "");
  },
	
  // If this is the first save, redirect to the saved-model edit page.
	firstSave: function(model) {
		console.log("REDIRECT");
    JJ.router.navigate(JJ.Util.links.edit.entry(model.get("id")), {trigger: true, replace: true});
	},
	
	dateChanged: function(e) {
		$.each(this.timeSelects, function(index, view) {
			view.change();
		});
	},
  
  /*
   * Links DOM to third party JS libraries.
   */
  linkDOM: function() {
    this.dateEl.datepicker({
			dateFormat: "d M, yy",
			defaultDate: null,
		});
		this.dateEl.datepicker("setDate", this.model.get("start"));
  },
  
  render: function() {
		this.model.hydrate();
    var json = this.model.toJSON();
		json.ratings = [];
		var i;
		for (i = 1; i <= 5; i++) {
			json.ratings.push({
				rating: i,
				checked: i === this.model.get("rating"),
			});
		}
    this.$el.html(this.template(json));
    
    // AbstractSelectModelList's
    new JJ.Views.SelectArt({model: this.model, el: this.$el.find("#art")});
    new JJ.Views.SelectType({model: this.model, el: this.$el.find("#type")});
    new JJ.Views.SelectLocation({model: this.model, el: this.$el.find("#location")});
		
		// TimeSelect's
		this.dateEl = this.$el.find("#date");
    // Set selected time formatting
		this.timeSelects = [];
    var that = this;
    ["start", "end"].forEach(function (name) {
			var hours = [];
			var minutes = [];
			var datetime = that.model.get(name);
      //var selectedDate = dateFormat(datetime, JJ.Views.Util.dateFormat.date);
      var selectedHour = dateFormat(datetime, JJ.Views.Util.dateFormat.hour);
      var selectedMinute = dateFormat(datetime, JJ.Views.Util.dateFormat.min);
			selectedMinute = String(parseInt(selectedMinute) - parseInt(selectedMinute)%5);
      var selectedPeriod = dateFormat(datetime, JJ.Views.Util.dateFormat.period);
			var i;
			for (i = 1; i <= 12; i++) {
				var display = i > 9 ? "" + i: "0" + i;
				hours.push({
					value: i,
					display: display,
					selected: (display === selectedHour),
				});
			}
			for (i = 0; i < 60; i+=5) {
				var display = i > 9 ? "" + i: "0" + i;
				minutes.push({
					value: i,
					display: display,
					selected: (display === selectedMinute),
				});
			}
			var periods = [{
					value: "AM",
					display: "AM",
					selected: ("AM" === selectedPeriod),
				},{
					value: "PM",
					display: "PM",
					selected: ("PM" === selectedPeriod),
				},
			];
			that.timeSelects.push(
				new JJ.Views.TimeSelect({
					model: that.model,
					el: that.$el.find("#" + name),
					field: name,
					dateEl: that.dateEl,
					hours: hours,
					minutes: minutes,
					periods: periods
				})
			);
    });
    
    // AbstractEditModelList's
    new JJ.Views.EditNoteList({model: this.model, el: this.$el.find("#notes")});
    new JJ.Views.EditDrillList({model: this.model, el: this.$el.find("#drills")});
    new JJ.Views.EditSparringList({model: this.model, el: this.$el.find("#sparring")});
    
    JJ.Views.Util.configModals();
    
    // DOM JS linking
    this.linkDOM();
    
    return this;
  },
});