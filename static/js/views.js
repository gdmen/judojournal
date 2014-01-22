/************************************************************
 *
 * JJ.Views.AbstractEditModel
 *  - Attaches a form view to a model.
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
    console.log("CHANGED");
    var splitName = e.currentTarget.name.split(":");
    if (splitName[0] === this.model.cid) {
      var field = splitName.pop();
      console.log(field);
      var value = $(e.currentTarget).val();
      this.model.set(field, value);
    } else {
      console.log("NOT ME!");
      console.log(splitName[0]);
      console.log(this.model.cid);
    }
    console.log(this.model.toJSON());
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

JJ.Views.EditType = JJ.Views.AbstractEditModel.extend({
  template: Handlebars.templates["models/entry/type/edit/single"],
});

JJ.Views.EditLocation = JJ.Views.AbstractEditModel.extend({
  template: Handlebars.templates["models/location/edit/single"],
});

JJ.Views.EditDrill = JJ.Views.AbstractEditModel.extend({
  template: Handlebars.templates["models/entry/module/drill/edit/single"],
  extendEvents: {
    "click .remove-this": "remove",
  },
  /*
   * Delete this view's model.
   */
  remove: function() {
    console.log("removing");
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
  modelConstructor: null,
  collectionConstructor: null,
  modelParam: "",
  placeholder: "",
  events: {
    "change select": "selectInput",
    "click .customInput": "customInput",
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
    this.parentModel.set(this.field, value);
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
    params[this.modelParam] = value;
    var model = new this.modelConstructor(params);
    var that = this;
    model.save(null, {
      success: function(m) {
        console.log("SAVED new SelectModel...");
        console.log(m);
        that.parentModel.set(that.field, m.get("resource_uri"));
        that.options.push({"name": m.get(that.modelParam), "resource_uri": m.get("resource_uri")});
        // TODO: minor improvement by using chosen's update instead of re-rendering
        that.render();
      },
      error: console.log.backboneError,
    });
  },
  
  /*
   * UI handling for starting and ending saving.
   */
  startSaveUI: function() {
    $(this.buttonSelector).html("Saving <i class='fa fa-spinner fa-spin'></i>");
  },
  endSaveUI: function() {
  },  
  
  initialize: function(options) {
    this.parentModel = options.parentModel;
    this.displayField = this.field.charAt(0).toUpperCase() + this.field.slice(1);
    this.selector = "#" + this.field + "-select";
    this.buttonSelector = "#" + this.field + "-select-new-button";
    this.options = [];
    this.render();
    // Load collection and store in valueURIDict. Re-link DOM on success.
    var that = this;
    (new this.collectionConstructor()).fetch({
      success: function(c) {
        c.each(function(m) {
          that.options.push({name: m.get(that.modelParam), resource_uri: m.get("resource_uri")});
        });
        that.render();
      },
      error: JJ.Util.backboneError,
    });
  },

  /*
   * Links DOM to third party JS libraries.
   */
  linkDOM: function() {
    $(this.selector).chosen({
      no_results_text: "<div id='" + this.buttonSelector.slice(1) +"' class='customInput button success expand radius'>Add this " + this.displayField + "</div><br class='show-for-small-only' />",
      placeholder_text_single: this.placeholder,
      width: "100%"
    });
  },
  
  render: function() {
    // Sets the currently selected element before rendering view.
    var selected = this.parentModel.get(this.field);
    
    if (typeof selected === "undefined" && this.options.length > 0) {
      selected = this.options[0].resource_uri;
      this.parentModel.set(this.field, selected);
    }
    for (var i=this.options.length; i--;) {
     this.options[i]["selected"] = (this.options[i].resource_uri === selected);
    }
    var json = {
      //cid: this.parentModel.cid,
      field: this.field,
      options: this.options,
    };
    this.$el.html(this.template(json));
    this.linkDOM();
    return this;
  },
});

/*
 * JJ.Views.AbstractSelectModel instances
 */

JJ.Views.SelectArt = JJ.Views.AbstractSelectModel.extend({
  template: Handlebars.templates["models/entry/singleSelect"],
  field: "art",
  modelParam: "name",
  modelConstructor: JJ.Models.Art,
  collectionConstructor: JJ.Models.ArtCollection,
  placeholder: "Art (e.g. Judo)",
});

JJ.Views.SelectType = JJ.Views.AbstractSelectModel.extend({
  template: Handlebars.templates["models/entry/singleSelect"],
  field: "type",
  modelParam: "name",
  modelConstructor: JJ.Models.Type,
  collectionConstructor: JJ.Models.TypeCollection,
  placeholder: "Type (e.g. Practice)",
});

JJ.Views.SelectLocation = JJ.Views.AbstractSelectModel.extend({
  template: Handlebars.templates["models/entry/singleSelect"],
  field: "location",
  modelParam: "name",
  modelConstructor: JJ.Models.Location,
  collectionConstructor: JJ.Models.LocationCollection,
  placeholder: "Club Name",
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
  parentModel: null,
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
    this.modelArray = options.parentModel.get(this.field);
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
 * Main(parent) view for JudoEntry form.
 *
 ************************************************************/
JJ.Views.EditJudoEntry = JJ.Views.AbstractEditModel.extend({
  template: Handlebars.templates["models/entry/judo/edit/single"],
  extendEvents: {
    "click #save": "save",
  },
  
  /*
   * Saves this view's model.
   */
  save: function() {
    console.log("**********SAVING**********");
    this.startSaveUI();
    console.log(this.model.toJSON());
    this.model.stayHydrated();
    console.log(this.model.toJSON());
    var that = this;
    this.model.save(null, {
      success: function(m) {
        console.log(m.toJSON());
        that.endSaveUI();
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
    this.$("#save").html("Save");
  },  
  
  /*
   * Links DOM to third party JS libraries.
   */
  linkDOM: function() {
    $(function(){
      var dtpDate = "D, d M Y";
      var dtpTime = "H:i";
      var dtpSeparator = " ";
      var dtpDateTime = dtpDate + dtpSeparator + dtpTime;
      var dFDate = "ddd, dd mmm yyyy";
      var dFTime = "HH:MM";
      var dtpStartSetBounds = function(ct) {
        var end = $("#dtp_end").val();
        var maxDate = false;
        var maxTime = false;
        if (end) {
          split = end.split(dtpSeparator);
          maxTime = split.pop();
          maxDate = split.join(dtpSeparator);
          if (dateFormat(ct, dFDate) !== maxDate) {
            maxTime = false;
          }
        }
        this.setOptions({
          maxDate: maxDate,
          maxTime: maxTime,
        });
      }
      $("#dtp_start").datetimepicker({
        formatDate: dtpDate,
        formatTime: dtpTime,
        format: dtpDateTime,
        onShow: dtpStartSetBounds,
        onSelectDate: dtpStartSetBounds,
        onChangeDateTime: function(ct,$input) {
          // Validate.
          var end = $("#dtp_end").val();
          console.log(ct);
          if (end) {
            split = end.split(dtpSeparator);
            var cDate = dateFormat(ct, dFDate);
            var cTime = dateFormat(ct, dFTime)
            var endTime = split.pop();
            var endDate = split.join(dtpSeparator);
            if (cDate > endDate || (cDate === endDate && cTime > endTime)) {
              this.setOptions({
                value: end,
              });
            }
          }
          $input.change();
        },
      });
      var dtpEndSetBounds = function(ct) {
        var start = $("#dtp_start").val();
        var minDate = false;
        var minTime = false;
        if (start) {
          split = start.split(dtpSeparator);
          minTime = split.pop();
          minDate = split.join(dtpSeparator);
          if (dateFormat(ct, dFDate) !== minDate) {
            minTime = false;
          }
        }
        this.setOptions({
          minDate: minDate,
          minTime: minTime,
        });
      }
      $("#dtp_end").datetimepicker({
        formatDate: dtpDate,
        formatTime: dtpTime,
        format: dtpDateTime,
        onShow: dtpEndSetBounds,
        onSelectDate: dtpEndSetBounds,
        onChangeDateTime: function(ct,$input) {
          // Validate.
          var start = $("#dtp_start").val();
          if (start) {
            split = start.split(dtpSeparator);
            var cDate = dateFormat(ct, dFDate);
            var cTime = dateFormat(ct, dFTime)
            var startTime = split.pop();
            var startDate = split.join(dtpSeparator);
            if (cDate < startDate || (cDate === startDate && cTime < startTime)) {
              this.setOptions({
                value: start,
              });
            }
          }
          $input.change();
        },
      });
    });
  },
  
  render: function() {
    this.model.stayHydrated();
    var json = this.model.toJSON();
    
    // Entry formatting
    var formatString = "ddd, dd mmm yyyy HH:MM";
    json["start"] = dateFormat(this.model.get("start"), formatString);
    json["end"] = dateFormat(this.model.get("end"), formatString);
    this.$el.html(this.template(json));
    
    // AbstractEditModelList's
    new JJ.Views.EditDrillList({parentModel: this.model, el: this.$("#drills")});
    
    // AbstractSelectModelList's
    new JJ.Views.SelectArt({parentModel: this.model, el: this.$("#art")});
    new JJ.Views.SelectType({parentModel: this.model, el: this.$("#type")});
    new JJ.Views.SelectLocation({parentModel: this.model, el: this.$("#location")});
    
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
  
  toggle: function() {
    var drop = $("#" + this.name + "-manage-drop");
    var show = "show";
    var hide = "hide";
    if (drop.is(":hidden")) {
      $("#" + this.name + "-manage-i-down").toggleClass(show, false);
      $("#" + this.name + "-manage-i-down").toggleClass(hide, true);
      $("#" + this.name + "-manage-i-up").toggleClass(show, true);
      $("#" + this.name + "-manage-i-up").toggleClass(hide, false);
      drop.slideDown("fast");
    } else {
      $("#" + this.name + "-manage-i-up").toggleClass(show, false);
      $("#" + this.name + "-manage-i-up").toggleClass(hide, true);
      $("#" + this.name + "-manage-i-down").toggleClass(show, true);
      $("#" + this.name + "-manage-i-down").toggleClass(hide, false);
      drop.slideUp("fast");
    }
  },
  
  initialize: function(options) {
    this.options = options;
    //this.events["click " + "#" + this.name + "-manage-click"] = "toggle";
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
  events: {
    "click #question-manage-click": "toggle"
  }
});

JJ.Views.ManageGoalsWidget = JJ.Views.AbstractManageModelWidget.extend({
  template: Handlebars.templates["widgets/manage/goal"],
  name: 'goal',
  events: {
    "click #goal-manage-click": "toggle"
  }
});

JJ.Views.ManageTechniquesWidget = JJ.Views.AbstractManageModelWidget.extend({
  template: Handlebars.templates["widgets/manage/technique"],
  name: 'technique',
  events: {
    "click #technique-manage-click": "toggle"
  }
});

JJ.Views.ManageLocationsWidget = JJ.Views.AbstractManageModelWidget.extend({
  template: Handlebars.templates["widgets/manage/location"],
  name: 'location',
  events: {
    "click #location-manage-click": "toggle"
  }
});

JJ.Views.ManageArtsWidget = JJ.Views.AbstractManageModelWidget.extend({
  template: Handlebars.templates["widgets/manage/art"],
  name: 'art',
  events: {
    "click #art-manage-click": "toggle"
  }
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
 * Main(parent) view for Home page.
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
    this.$el.html(this.template(this.options));
    var that = this;
    Object.keys(this.widgets).forEach(function (name) {
      new that.widgets[name]({name: name, el: that.addWidgetDiv("manage-" + name + "-div")});
    });    
    return this;
  },
});