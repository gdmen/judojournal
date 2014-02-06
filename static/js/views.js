JJ.Views.Util = {
  dateFormat: {
    date: "dd mmm, yyyy",
    hour: "hh",
    min: "MM",
    period: "TT",
  },
  links: {
    editEntry: function(id) {
      return "/#/entry/" + id + "/edit";
    }
  }
}

/*
 * http://lostechies.com/derickbailey/
 */
Backbone.View.prototype.close = function(){
	this.remove(); // Remove view from DOM
	this.unbind(); // Unbind all local event bindings
	
	if (!_.isUndefined(this.model)) {
		this.model.unbind(); // Unbind reference to the model
	}

	delete this.$el; // Delete the jQuery wrapped object variable
	delete this.el; // Delete the variable reference to this node
  if (this.onClose){
    this.onClose();
  }
}

JJ.Views.AbstractView = Backbone.View.extend({
	//onClose: function () {
	//},
});

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
    "change input": "change",
    "change textarea": "change",
    "change select": "change",
    "change div[contenteditable='true']": "change",
  },
  
  // For subclasses to add events.
  extendEvents: {},
  
  events: function() {
    return _.extend({},this.baseEvents,this.extendEvents);
  },
  
  /*
   * Updates the model on input changes.
   */
  change: function(e) {
		var name = "";
		if ($(e.currentTarget).is("input,textarea,select")) {
			name = e.currentTarget.name;
		} else {
			name = e.currentTarget.title;
		}
    console.log("Changed: " + name);
    var splitName = name.split(":");
    if (splitName[0] === this.model.cid) {
      var field = splitName.pop();
			var value = "";
			if ($(e.currentTarget).is("input,textarea,select")) {
				value = $(e.currentTarget).val();
			} else {
				value = $(e.currentTarget).html();
			}
      this.model.set(field, value);
      console.log("Set " + field + " to " + value + " in " + this.model.cid);
    }
  },
  
  /*
   * Saves this view's model.
   */
  save: function() {
    this.startSave();
    var that = this;
    this.model.save(null, {
      success: function(m) {
        that.disableSave();
      },
      error: JJ.Util.backboneError,
    });
  },
  /*
   * UI handling for starting and ending saving.
   */
  startSave: function() {
		console.log("**********START SAVING**********");
		this.$el.find(this.selectors.save).removeClass("enabled disabled");
		this.$el.find(this.selectors.save).addClass("saving");
  },
	enableSave: function() {
		console.log("**********ENABLED**********");
		console.log(this.model.cid);
		this.$el.find(this.selectors.save).removeClass("disabled saving");
		this.$el.find(this.selectors.save).addClass("enabled");
	},
  disableSave: function() {
		console.log("**********DONE SAVING**********");
		this.$el.find(this.selectors.save).removeClass("enabled saving");
		this.$el.find(this.selectors.save).addClass("disabled");
  },
  
  initialize: function(options) {
		this.selectors = {};
		this.selectors["save"] = "#" + this.model.cid + "-save";
		this.baseEvents["click " + this.selectors.save + ".enabled"] = "save";
		console.log(this.baseEvents);
		this.model.on("change", this.enableSave, this);
  },
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

/*
 * JJ.Views.AbstractEditModel instances
 */

JJ.Views.EditDrill = JJ.Views.AbstractEditModel.extend({
  template: Handlebars.templates["models/entry/module/drill/edit/single"],
  extendEvents: {
  },
  
  initialize: function(options) {
    this.render();
  },
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
  // TODO: move this to initialize()? Would be easier to maintain naming
  // consistent with template.
  events: {
    "click .select-display .link": "showDrop",
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
        console.log("SAVED new SelectModel...");
        console.log(m);
        that.model.set(that.field, m.get("resource_uri"));
        that.collection.add(m);
				// TODO: avoid the full re-render
        that.render();
      },
      error: console.log.backboneError,
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
  template: Handlebars.templates["models/entry/singleSelect"],
  field: "art",
  uniqueKey: "name",
  collectionConstructor: JJ.Models.ArtCollection,
  placeholder: "Art",
  hint: "e.g. Judo",
});

JJ.Views.SelectType = JJ.Views.AbstractSelectModel.extend({
  template: Handlebars.templates["models/entry/singleSelect"],
  field: "type",
  uniqueKey: "name",
  collectionConstructor: JJ.Models.TypeCollection,
  placeholder: "Class",
  hint: "e.g. Practice",
});

JJ.Views.SelectLocation = JJ.Views.AbstractSelectModel.extend({
  template: Handlebars.templates["models/entry/singleSelect"],
  field: "location",
  uniqueKey: "name",
  collectionConstructor: JJ.Models.LocationCollection,
  placeholder: "Location",
  hint: "e.g. Kodokan",
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
    "click .add-model": "createModel",
    "click .click-away-overlay": "hideModal",
    //"click .add-model": "addModel",
  },
	
  showModal: function(model) {
    new this.insertViewConstructor({model: model, el: this.$el.find(this.selectors.modal)});
		
    this.$el.find(this.selectors.modal).show();
    this.$el.find(this.selectors.focus).focus();
    this.$el.find(this.selectors.clickAway).show();
  },
  
  hideModal: function(e) {
    this.$el.find(this.selectors.modal).hide();
    this.$el.find(this.selectors.clickAway).hide();
  },
	
  /*
   * Spawns creation modal.
   */
	createModel: function(e) {
    var model = new this.insertModelConstructor();
		this.showModal(model);
	},
	
  /*
   * Adds a new model to the parent model's list.
   */
  addModel: function(e) {
    console.log("addModel");
    var model = new this.insertModelConstructor();
    var that = this;
    model.save(null, {
      success: function(m) {
        console.log("SAVED new model...");
        console.log(m);
        that.modelArray.push(m);
        that.addView(m);
        console.log(that.modelArray);
      },
      error: console.log.backboneError,
    });
  },
  
  /*
   * Backbone destroys a model and removes it from the parent model's list.
   */
  removeModel: function(m) {
    console.log("removeModel");
    var that = this;
    m.destroy({
      success: function(m) {
        console.log("Destroyed a model...");
        console.log(m);
        var index = that.modelArray.indexOf(m);
        that.modelArray.splice(index, 1);
        console.log(that.modelArray);
      },
      error: console.log.backboneError,
    });
  },
  
  /*
   * Appends a new model view to this view's container.
   * @params: The model to append.
   */
  addView: function(m) {
    console.log("addView");
    var id = m.get("resource_uri");
    var div = $("<div/>");
    div.attr("id", id);
    this.$el.append(div);
    new this.insertViewConstructor({model: m, el: this.$el.find(document.getElementById(id))});
  },
  
  initialize: function(options) {
    this.modelArray = options.model.get(this.field);
		
    var vs = {};
    vs.div = ".model-list";
    vs.clickAway = vs.div + " .click-away-overlay";
    vs.modal = vs.div + " .modal";
		vs.focus = vs.div + " .focus";
    
    this.selectors = vs;
    this.render();
  },
  
  render: function() {
    this.$el.html(this.template());
    for (var i=0; i < this.modelArray.length; i++) {
      this.addView(this.modelArray[i]);
    }
    return this;
  },
});

/*
 * JJ.Views.AbstractEditModelList instances
 */
JJ.Views.EditDrillList = JJ.Views.AbstractEditModelList.extend({
  template: Handlebars.templates["models/entry/module/drill/edit/list"],
  field: "drills",
  insertViewConstructor: JJ.Views.EditDrill,
  insertModelConstructor: JJ.Models.DrillEntryModule,
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
  template: Handlebars.templates["widgets/time"],
  events: {
    "change select": "change",
  },
  
  /*
   * Updates the model on input changes.
   */
	change: function() {
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
			console.log("DID NOT set " + this.field + " time.");
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
  template: Handlebars.templates["models/entry/judo/edit/single"],
  extendEvents: {
		"change #date": "dateChanged",
  },
	
  /*
   * Saves this view's model.
   * If this is the first save, redirect to the saved-model edit page.
   */
  save: function() {
    this.startSave();
    var isNew = this.model.isNew();
    var that = this;
    this.model.save(null, {
      success: function(m) {
        that.disableSave();
        if (isNew) {
          console.log("REDIRECT");
          window.location.replace(JJ.Views.Util.links.editEntry(m.get("id")));
        }
      },
      error: JJ.Util.backboneError,
    });
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
    this.model.stayHydrated();
    var json = this.model.toJSON();
    this.$el.html(this.template(json));
    
    // AbstractSelectModelList's
    new JJ.Views.SelectArt({model: this.model, el: this.$el.find("#art")});
    new JJ.Views.SelectType({model: this.model, el: this.$el.find("#type")});
    new JJ.Views.SelectLocation({model: this.model, el: this.$el.find("#location")});
		
		// TimeSelect's
		this.dateEl = this.$el.find("#date");
		var hours = [];
		var minutes = [];
    // Set selected time formatting
		this.timeSelects = [];
    var that = this;
    ["start", "end"].forEach(function (name) {
			var datetime = that.model.get(name);
      //var selectedDate = dateFormat(datetime, JJ.Views.Util.dateFormat.date);
      var selectedHour = dateFormat(datetime, JJ.Views.Util.dateFormat.hour);
      var selectedMinute = dateFormat(datetime, JJ.Views.Util.dateFormat.min);
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
			for (i = 0; i < 60; i++) {
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
    new JJ.Views.EditDrillList({model: this.model, el: this.$el.find("#drills")});
    
    // DOM JS linking
    this.linkDOM();
    
    return this;
  },
});


/************************************************************
 *
 * JJ.Views.AbstractManageModelWidget
 *  - Model management widget.
 *
 ************************************************************/
JJ.Views.AbstractManageModelWidget = JJ.Views.AbstractView.extend({
  name: "",
  events: {},
  
  toggle: function() {
    var drop = this.$el.find("#" + this.name + "-manage-drop");
    if (drop.is(":hidden")) {
      this.$el.find("#" + this.name + "-manage-i-down").hide();
      this.$el.find("#" + this.name + "-manage-i-up").show();
      drop.slideDown("fast");
    } else {
      this.$el.find("#" + this.name + "-manage-i-up").hide();
      this.$el.find("#" + this.name + "-manage-i-down").show();
      drop.slideUp("fast");
    }
  },
  
  initialize: function(options) {
    this.options = options;
    this.events["click " + "#" + this.name + "-manage-click"] = "toggle";
    this.render();
  },
  
  render: function() {
    this.$el.html(this.template(this.options));
    return this;
  },
});

/*
 * JJ.Views.AbstractManageModelWidget instances
 */

JJ.Views.ManageQuestionsWidget = JJ.Views.AbstractManageModelWidget.extend({
  template: Handlebars.templates["widgets/manage/question"],
  name: 'question',
});

JJ.Views.ManageGoalsWidget = JJ.Views.AbstractManageModelWidget.extend({
  template: Handlebars.templates["widgets/manage/goal"],
  name: 'goal',
});

JJ.Views.ManageTechniquesWidget = JJ.Views.AbstractManageModelWidget.extend({
  template: Handlebars.templates["widgets/manage/technique"],
  name: 'technique',
});

JJ.Views.ManageLocationsWidget = JJ.Views.AbstractManageModelWidget.extend({
  template: Handlebars.templates["widgets/manage/location"],
  name: 'location',
});

JJ.Views.ManageArtsWidget = JJ.Views.AbstractManageModelWidget.extend({
  template: Handlebars.templates["widgets/manage/art"],
  name: 'art',
});

/************************************************************
 *
 * JJ.Views.AbstractStaticPage
 *  - Static template inputs only.
 *
 ************************************************************/
JJ.Views.AbstractStaticPage = JJ.Views.AbstractView.extend({
  initialize: function(options) {
    this.options = options;
    this.options.links = {};
  },
  
  render: function() {
    this.$el.html(this.template(this.options));
    return this;
  },
});

/*
 * JJ.Views.AbstractStaticPage instances
 */
/*
JJ.Views.StaticLanding = JJ.Views.AbstractStaticPage.extend({
  template: Handlebars.templates["pages/landing"],
});
*/

/************************************************************
 *
 * Main view for Home page.
 *
 ************************************************************/
JJ.Views.HomePage = JJ.Views.AbstractStaticPage.extend({
  template: Handlebars.templates["pages/home"],
  widgets: {
    question: JJ.Views.ManageQuestionsWidget,
    goal: JJ.Views.ManageGoalsWidget,
    technique: JJ.Views.ManageTechniquesWidget,
    location: JJ.Views.ManageLocationsWidget,
    art: JJ.Views.ManageArtsWidget,
  },
  
  /*
   * Appends a new div.
   * @params: The div id to append.
   */
  addWidgetDiv: function(id) {
    var div = $("<div/>");
    div.attr("id", id);
    this.$el.find("#widgets").append(div);
    return div;
  },
  
  render: function() {
    this.options.name = JJ.Meta.name;
    this.options.links.newEntry = JJ.Views.Util.links.editEntry("#");
    this.$el.html(this.template(this.options));
    var that = this;
    Object.keys(this.widgets).forEach(function (name) {
      new that.widgets[name]({name: name, el: that.addWidgetDiv("manage-" + name + "-div")});
    });    
    return this;
  },
});