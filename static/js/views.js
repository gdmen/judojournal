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

/************************************************************
 *
 * JJ.Views.AbstractEditModel
 *  - Attaches a form view to a model.
 *  - Updates the model on input changes.
 *  - Does *not* update the view on model changes.
 *
 ************************************************************/
JJ.Views.AbstractEditModel = Backbone.View.extend({
  template: null,
  baseEvents: {
    "change input": "changed",
    "change textarea": "changed",
    "change select": "changed",
  },
  
  // For subclasses to add events.
  extendEvents: {},
  
  events: function() {
    return _.extend({},this.baseEvents,this.extendEvents);
  },
  
  /*
   * Updates the model on input changes.
   */
  changed: function(e) {
    var splitName = e.currentTarget.name.split(":");
    console.log("Changed: " + e.currentTarget.name);
    if (splitName[0] === this.model.cid) {
      var field = splitName.pop();
			if (_.isUndefined(this.model.field)) {
				console.log("UNDEFINED " + field + " in " + this.model.cid);
				return;
			}
      var value = $(e.currentTarget).val();
      this.model.set(field, value);
      console.log("Set " + field + " to " + value + " in " + this.model.cid);
    }
  },
  
  initialize: function(options) {
    this.render();
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
    "click .remove-this": "remove",
  },
  /*
   * Delete this view's model.
   */
  remove: function() {
    this.parentView.removeModel(this.model);
    this.$el.remove();
  },
  
  initialize: function(options) {
    this.parentView = options.parentView;
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
JJ.Views.AbstractSelectModel = Backbone.View.extend({
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
    $(this.selectors.drop).show();
    $(this.selectors.search).focus();
    $(this.selectors.clickAway).show();
  },
  
  hideDrop: function(e) {
    $(this.selectors.drop).hide();
    $(this.selectors.clickAway).hide();
  },
  
  filterOptions: function(e) {
    //console.log("----- FILTER -----");
    var filter = $(e.currentTarget).val().toLowerCase();
    var that = this;
    var create = true;
    this.collection.each(function(m) {
      var mSelector = "#" + that.getOptionId(m);
      if (m.get(that.uniqueKey).toLowerCase().indexOf(filter) > -1) {
        //console.log("showing: " + m.get(that.uniqueKey));
        $(mSelector).show();
        create = false;
      } else {
        //console.log("hiding: " + m.get(that.uniqueKey));
        $(mSelector).hide();
      }
    });
    var createElement = $(this.selectors.create);
    var createVal = $(this.selectors.search).val();
    if (create && createVal !== "") {
      createElement.text('Add "' + createVal + '"');
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
    $(this.selectors.input).val(target.data('value')).change();
    this.render();
  },
  
  createModel: function(e) {
    console.log("CREATE MODEL");
    this.hideDrop();
  },
  
  /*
   * Updates the parent model on input changes.
   */
  selectInput: function(e) {
    console.log("selectInput");
    var value = $(e.currentTarget).val();
    if (value === "") {
      return;
    }
  },
  
  /*
   * Updates the parent model on input changes.
   */
  customInput: function(e) {
    console.log("customInput");
    // Hacky grabbing the currently typed input in the chosen (jquery plugin) search input.
    var value = $(this.selector).next().find(".chosen-search input").val();
    if (value === "") {
      return;
    }
    // Swap to saving display
    this.startSaveUI();
    
    var params = {};
    params[this.uniqueKey] = value;
    var model = new this.modelConstructor(params);
    var that = this;
    model.save(null, {
      success: function(m) {
        console.log("SAVED new SelectModel...");
        console.log(m);
        //that.model.set(that.field, m.get("resource_uri"));
        that.options.push({"name": m.get(that.uniqueKey), "resource_uri": m.get("resource_uri")});
        // TODO: minor improvement by using chosen's update instead of re-rendering
        that.render();
      },
      error: console.log.backboneError,
    });
  },
  
  //$(this.buttonSelector).html("Saving <i class='fa fa-spinner fa-spin'></i>");
  
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
    
    if (!_.isUndefined(selectedModel)) {
      this.selectedKey = selectedModel[this.uniqueKey];
      this.model.set(this.field, selectedModel["resource_uri"]);
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
  hint: "(e.g. Judo)",
});

JJ.Views.SelectType = JJ.Views.AbstractSelectModel.extend({
  template: Handlebars.templates["models/entry/singleSelect"],
  field: "type",
  uniqueKey: "name",
  collectionConstructor: JJ.Models.TypeCollection,
  placeholder: "Type",
  hint: "(e.g. Practice)",
});

JJ.Views.SelectLocation = JJ.Views.AbstractSelectModel.extend({
  template: Handlebars.templates["models/entry/singleSelect"],
  field: "location",
  uniqueKey: "name",
  collectionConstructor: JJ.Models.LocationCollection,
  placeholder: "Location",
  hint: "(e.g. Kodokan)",
});


/************************************************************
 *
 * JJ.Views.AbstractEditModelList
 *  - Manages a list of AbstractEditModel's for a parent.
 *  - Does *not* update the view on model changes.
 *
 ************************************************************/
JJ.Views.AbstractEditModelList = Backbone.View.extend({
  template: null,
  model: null,
  // Subclasses set to the parent model's array field that is to be managed.
  field: "",
  insertViewConstructor: null,
  insertModelConstructor: null,
  events: {
    "click .add-model": "addModel",
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
    var div = $( "<div/>" );
    div.attr("id", id);
    this.$el.append(div);
    new this.insertViewConstructor({model: m, parentView: this, el: this.$(document.getElementById(id))});
  },
  
  initialize: function(options) {
    this.modelArray = options.model.get(this.field);
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
JJ.Views.TimeSelect = Backbone.View.extend({
  template: Handlebars.templates["widgets/time"],
  events: {
    "change select": "update",
  },
  
  /*
   * Updates the model on input changes.
   */
	update: function() {
		var hour = $("#" + this.field + "-hour").val();
		var minute = $("#" + this.field + "-minute").val();
		var period = $("#" + this.field + "-period").val();
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
    "click #save": "save",
		"change #date": "dateChanged",
  },
  
  /*
   * Saves this view's model.
   * If this is the first save, redirect to the saved-model edit page.
   */
  save: function() {
    console.log("**********SAVING**********");
    this.startSaveUI();
    console.log(this.model.toJSON());
    this.model.stayHydrated();
    console.log(this.model.toJSON());
    var id = this.model.get("id");
    var that = this;
    this.model.save(null, {
      success: function(m) {
        console.log(m.toJSON());
        that.endSaveUI();
        if (_.isUndefined(id)) {
          console.log("REDIRECT");
          window.location.replace(JJ.Views.Util.links.editEntry(m.get("id")));
        }
        console.log("**********DONE SAVING**********");
      },
      error: JJ.Util.backboneError,
    });
  },
  
  /*
   * UI handling for starting and ending saving.
   */
  startSaveUI: function() {
    this.$("#save").html("Saving <i class='fa fa-spinner fa-spin'></i>");
  },
  endSaveUI: function() {
    this.$("#save").html("Save Entry");
  },
	
	dateChanged: function(e) {
		$.each(this.timeSelects, function(index, view) {
			view.update();
		});
	},
  
  /*
   * Links DOM to third party JS libraries.
   */
  linkDOM: function() {
		console.log(this.model.get("start"));
    this.dateEl.datepicker({
			dateFormat: "d M, yy",
		});
		this.dateEl.datepicker("setDate", this.model.get("start"));
  },
  
  render: function() {
    this.model.stayHydrated();
    var json = this.model.toJSON();
    this.$el.html(this.template(json));
    
    // AbstractSelectModelList's
    new JJ.Views.SelectArt({model: this.model, el: this.$("#art")});
    new JJ.Views.SelectType({model: this.model, el: this.$("#type")});
    new JJ.Views.SelectLocation({model: this.model, el: this.$("#location")});
		
		// TimeSelect's
		this.dateEl = this.$("#date");
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
			var periods = [
				{
					value: "AM",
					display: "AM",
					selected: ("AM" === selectedPeriod),
				},
				{
					value: "PM",
					display: "PM",
					selected: ("PM" === selectedPeriod),
				},
			];
			that.timeSelects.push(
				new JJ.Views.TimeSelect({
					model: that.model,
					el: that.$("#" + name),
					field: name,
					dateEl: that.dateEl,
					hours: hours,
					minutes: minutes,
					periods: periods
				})
			);
    });
    
    // AbstractEditModelList's
    new JJ.Views.EditDrillList({model: this.model, el: this.$("#drills")});
    
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
JJ.Views.AbstractManageModelWidget = Backbone.View.extend({
  name: "",
  events: {},
  
  toggle: function() {
    var drop = $("#" + this.name + "-manage-drop");
    if (drop.is(":hidden")) {
      $("#" + this.name + "-manage-i-down").hide();
      $("#" + this.name + "-manage-i-up").show();
      drop.slideDown("fast");
    } else {
      $("#" + this.name + "-manage-i-up").hide();
      $("#" + this.name + "-manage-i-down").show();
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
JJ.Views.AbstractStaticPage = Backbone.View.extend({
  initialize: function(options) {
    this.options = options;
    this.options.links = {};
    this.render();
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
    var div = $( "<div/>" );
    div.attr("id", id);
    $("#widgets").append(div);
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