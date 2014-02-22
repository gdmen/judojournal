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
    "keydown input": "throttledChange",
    "change input": "change",
    "change select": "change",
    "keydown textarea": "throttledChange",
    "change textarea": "change",
  },
  
  // For subclasses to add events.
  extendedEvents: {},
  
  events: function() {
    return _.extend({},this.baseEvents,this.extendedEvents);
  },
  
  /*
   * Updates the model on input changes.
   */
	autosave: false,
  change: function(e) {
		var name = e.currentTarget.name;
    console.log("Changed: " + name);
    var splitName = name.split(":");
    if (splitName[0] === this.model.cid) {
      var field = splitName.pop();
			var value = $(e.currentTarget).val();
      this.model.set(field, value);
			//console.log(value.length);
      console.log("Set " + field + " to " + value.length + " in " + this.model.cid);
      this.enableSave();
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
    
    this.$el.find("textarea").trigger("autosize.destroy").autosize({append: "\n"});
  /*
		// Handles all modals for the page.
		var modalWrapper = $(".modal-wrapper");
		var clickAway = $(".click-away-overlay");
		modalWrapper.show();
		clickAway.show().css("right", JJ.Util.scrollbarWidth() + "px").hide();
    var hiddenTextareas = $("textarea:hidden");
    hiddenTextareas.show();
		$("textarea").autosize();
    $("textarea").trigger('autosize.resize');
    hiddenTextareas.hide();
		modalWrapper.hide();
  */
    return this;
  },
});

/*
 * JJ.Views.AbstractEditModel instances
 */
 
JJ.Views.EditListElement = JJ.Views.AbstractEditModel.extend({
  template: null,
  insertModelConstructor: null,

  extendedEvents: {
		"click .edit-model": "editModel",
		"click .view-model": "endEdit",
		"click .delete-model": "removeModel",
  },
  
  editModel: function(e) {
    this.$el.find(".view").hide();
    this.$el.find(".edit").css("display", "block");
    this.$el.find("textarea").trigger("autosize.resize");
  },
  
  endEdit: function(e) {
    this.model.discardChanges();
    this.render();
  },
  
  viewModel: function(e) {
    this.$el.find(".edit").hide();
    this.$el.find(".view").show();
  },
  
  removeModel: function(e) {
    this.parentView.removeModel(this.model);
    var that = this;
    this.$el.animate({ height: 0, opacity: 0 }, 'slow', function() {
      that.close();
    });
  },
  
  // If this is the first save, add to parentView.
	firstSave: function(model) {
		this.parentView.addModel(model);
	},
	endSave: function(model) {
    this.render();
	},
  
	initialize: function(options) {
		this.parentView = options.parentView;
    if (_.isUndefined(options.model)) {
      options.model = new this.insertModelConstructor();
    }
    this.model = options.model;
		return JJ.Views.AbstractEditModel.prototype.initialize.call(this, options);
	},
  
  render: function() {
		var ret = JJ.Views.AbstractEditModel.prototype.render.call(this);
    this.viewModel();
    JJ.Util.EmbedMedia(this.$el);
    return ret;
  },
});

JJ.Views.EditNote = JJ.Views.EditListElement.extend({
  template: Handlebars.templates["entry/module/note/single"],
  insertModelConstructor: JJ.Models.NoteEntryModule,
});
JJ.Views.EditDrill = JJ.Views.EditListElement.extend({
  template: Handlebars.templates["entry/module/drill/single"],
  insertModelConstructor: JJ.Models.DrillEntryModule,
});
JJ.Views.EditSparring = JJ.Views.EditListElement.extend({
  template: Handlebars.templates["entry/module/sparring/single"],
  insertModelConstructor: JJ.Models.SparringEntryModule,
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
  events: {
    "click .add-model": "newModel",
  },
	
  /*
   * Spawns list element view.
   */
	newModel: function(e) {
    console.log("NEW");
    this.insertView(new this.insertViewConstructor({parentView: this}));
	},
	
  /*
   * Adds a saved model to the parent model's list.
	 * Triggers ui save for parent model's view.c
   */
  addModel: function(model) {
    console.log("addModel");
		if (_.isUndefined(model.get("id"))) {
			console.log("THIS IS A BIG PROBLEM");
			return;
		}
		this.modelArray.push(model);
		this.model.set(this.field, this.modelArray);
		this.model.parentView.save();
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
	 *  (currently not doing)
   */
  removeModel: function(model) {
    console.log("removeModel");
    var index = this._getIndexByURI(model.get("resource_uri"));
    console.log(index);
    if (index > -1) {
      this.modelArray.splice(index, 1);
      this.model.set(this.field, this.modelArray);
      this.modelArray = this.model.get(this.field).slice(0);
      this.model.parentView.enableSave();
    }
		
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
		this.elementViews = [];
		
    var vs = {};
    vs.list = ".model-list";
    
    this.selectors = vs;
    this.render();
  },
  
  insertView: function(view) {
    view.render();
    this.$el.find(this.selectors.list).append(view.el);
  },
  
  render: function() {
    this.modelArray = this.model.get(this.field).slice(0);
    this.$el.html(this.template());
    var that = this;
    $.each(this.modelArray, function(index, model) {
      var div = $('<div></div>');
      that.insertView(new that.insertViewConstructor({model: model, parentView: that}));
    });
    
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
});
JJ.Views.EditDrillList = JJ.Views.AbstractEditModelList.extend({
  template: Handlebars.templates["entry/module/drill/list"],
  field: "drills",
  insertViewConstructor: JJ.Views.EditDrill,
});
JJ.Views.EditSparringList = JJ.Views.AbstractEditModelList.extend({
  template: Handlebars.templates["entry/module/sparring/list"],
  field: "sparring",
  insertViewConstructor: JJ.Views.EditSparring,
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
      this.displayEl.html(dateFormat(datetime, JJ.Views.Util.dateFormat.displayTime));
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
    this.displayEl = options.displayEl;
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
  extendedEvents: {
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
    console.log(model.get("id"));
    console.log(JJ.Util.links.edit.entry(model.get("id")));
    JJ.router.navigate(JJ.Util.links.edit.entry(model.get("id")), {trigger: true, replace: true});
	},
	
	dateChanged: function(e) {
		$.each(this.timeSelects, function(index, view) {
			view.change();
		});
    this.$el.find(".display.date").html(dateFormat(this.model.get("start"), JJ.Views.Util.dateFormat.displayDate));
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
    this.$el.find(".entry-save").scrollToFixed({
      preFixed: function() {
        $(this).css("margin-top", "1rem");
        $(".entry-header").css("margin-top", "-1rem");
      },
      postFixed: function() {
        $(this).css("margin-top", "");
        $(".entry-header").css("margin-top", "");
      }
    });
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
    json.displayStart = dateFormat(this.model.get("start"), JJ.Views.Util.dateFormat.displayTime);
    json.displayEnd = dateFormat(this.model.get("end"), JJ.Views.Util.dateFormat.displayTime);
    json.displayDate = dateFormat(this.model.get("start"), JJ.Views.Util.dateFormat.displayDate);
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
      selectedMinute = parseInt(selectedMinute) - parseInt(selectedMinute)%5;
			selectedMinute = selectedMinute > 9 ? "" + selectedMinute: "0" + selectedMinute;
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
          displayEl: that.$el.find(".display." + name),
					hours: hours,
					minutes: minutes,
					periods: periods
				})
			);
    });
    
    // AbstractEditModelList's
    new JJ.Views.EditDrillList({model: this.model, el: this.$el.find("#drills")});
    new JJ.Views.EditSparringList({model: this.model, el: this.$el.find("#sparring")});
    new JJ.Views.EditNoteList({model: this.model, el: this.$el.find("#notes")});
    
    // DOM JS linking
    this.linkDOM();
    
    return this;
  },
});