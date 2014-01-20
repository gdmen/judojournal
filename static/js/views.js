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
  template: Handlebars.templates["entry/type/edit/single"],
});

JJ.Views.EditLocation = JJ.Views.AbstractEditModel.extend({
  template: Handlebars.templates["entry/location/edit/single"],
});

JJ.Views.EditDrill = JJ.Views.AbstractEditModel.extend({
  template: Handlebars.templates["entry/module/drill/edit/single"],
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
  parentModel: null,
  // Subclasses set to the parent model's field that is to be selected.
  field: "",
  events: {
    "change select": "changed",
  },
  
  /*
   * Updates the parent model on input changes.
   */
  changed: function(e) {
    var value = $(e.currentTarget).val();
    this.parentModel.set(this.field, value);
    console.log(this.parentModel);
  },
  
  initialize: function(options) {
    this.parentModel = options.parentModel;
    this.render();
  },
  
  render: function() {
    // Sets the currently selected element before rendering view.
    var selected = this.parentModel.get(this.field);
    var json = {collection: this.collection.toJSON()};
    if (typeof selected === "undefined" && json.collection.length > 0) {
      this.parentModel.set(this.field, json.collection[0].resource_uri);
      selected = this.parentModel.get(this.field);
    }
    for (var i=json.collection.length; i--;) {
      json.collection[i]["selected"] = (json.collection[i].resource_uri === selected);
    }
    this.$el.html(this.template(json));
    return this;
  },
});

/*
 * JJ.Views.AbstractSelectModel instances
 */

JJ.Views.SelectLocation = JJ.Views.AbstractSelectModel.extend({
  template: Handlebars.templates["entry/location/select/one"],
  field: "location",
}); 

JJ.Views.SelectEntryType = JJ.Views.AbstractSelectModel.extend({
  template: Handlebars.templates["entry/type/select/one"],
  field: "type",
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
    var parentView = this;
    model.save(null, {
      success: function(m) {
        console.log("SAVED new model...");
        console.log(m);
        parentView.modelArray.push(m);
        parentView.addView(m);
        console.log(parentView.modelArray);
      },
      error: console.log.backboneError,
    });
  },
  
  /*
   * Backbone destroys a model and removes it from the parent model's list.
   */
  removeModel: function(m) {
    console.log("removeModel");
    var parentView = this;
    m.destroy({
      success: function(m) {
        console.log("Destroyed a model...");
        console.log(m);
        var index = parentView.modelArray.indexOf(m);
        parentView.modelArray.splice(index, 1);
        console.log(parentView.modelArray);
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
  template: Handlebars.templates["entry/module/drill/edit/list"],
  field: "drills",
  insertViewConstructor: JJ.Views.EditDrill,
  insertModelConstructor: JJ.Models.DrillEntryModule,
});


/************************************************************
 *
 * Parent view for JudoEntry form.
 *
 ************************************************************/
JJ.Views.EditJudoEntry = JJ.Views.AbstractEditModel.extend({
  template: Handlebars.templates["entry/judo/edit/single"],
  extendEvents: {
    "click #save": "save",
  },
  
  /*
   * Saves this view's model.
   */
  save: function() {
    console.log("**********SAVING**********");
    console.log(this.model.toJSON());
    this.model.stayHydrated();
    console.log(this.model.toJSON());
    this.model.save(null, {
      success: function(m) {
        console.log(m.toJSON());
        console.log("**********DONE SAVING**********");
      },
      error: JJ.Util.backboneError,
    });
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
    var entry = this.model;
    entry.stayHydrated();
    var json = entry.toJSON();
    
    // Entry formatting
    var formatString = "ddd, dd mmm yyyy HH:MM";
    json["start"] = dateFormat(entry.get("start"), formatString);
    json["end"] = dateFormat(entry.get("end"), formatString);
    this.$el.html(this.template(json));
    
    // AbstractEditModelList's
    new JJ.Views.EditDrillList({parentModel: entry, el: this.$("#drills")});
    
    // AbstractSelectModelList's
    var locations = new JJ.Models.LocationCollection();
    locations.fetch({
      success: function(m) {
        new JJ.Views.SelectLocation({collection: m, parentModel: entry, el: this.$("#location")});
      },
      error: JJ.Util.backboneError,
    });
    var types = new JJ.Models.EntryTypeCollection();
    types.fetch({
      success: function(m) {
        new JJ.Views.SelectEntryType({collection: m, parentModel: entry, el: this.$("#type")});
      },
      error: JJ.Util.backboneError,
    });
    
    // DOM JS linking
    this.linkDOM();
    
    return this;
  },
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
JJ.Views.StaticLanding = JJ.Views.AbstractStaticPage.extend({
  template: Handlebars.templates["static/landing"],
});