/************************************************************
 *
 * JJ.Views.AbstractEditModel
 *  - Attaches a form view to a model.
 *  - Does *not* update the view on model changes.
 *
 ************************************************************/
JJ.Views.AbstractEditModel = Backbone.View.extend({
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
    JJ.debug.log("CHANGED");
    var splitName = e.currentTarget.name.split(":");
    if (splitName[0] === this.model.get("resource_uri")) {
      var field = splitName.pop();
      JJ.debug.log(field);
      var value = $(e.currentTarget).val();
      this.model.set(field, value);
    } else {
      JJ.debug.log("NOT ME!");
      JJ.debug.log(splitName[0]);
      JJ.debug.log(this.model.get("resource_uri"));
    }
    JJ.debug.log(this.model.toJSON());
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
    JJ.debug.log("removing");
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
    JJ.debug.log(this.parentModel);
  },
  
  initialize: function(options) {
    this.parentModel = options.parentModel;
    this.render();
  },
  
  render: function() {
    // Sets the currently selected element before rendering view.
    var selected = this.parentModel.get(this.field);
    var json = {collection: this.collection.toJSON()};
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
    JJ.debug.log("addModel");
    var model = new this.insertModelConstructor();
    var successCallback = function(m) {
      JJ.debug.log("SAVED new model...");
      JJ.debug.log(m);
      this.modelArray.push(m);
      this.addView(m);
      JJ.debug.log(this.modelArray);
    }
    model.save(null, {
      success: successCallback,
      error: JJ.debug.log.backboneError,
    });
  },
  
  /*
   * Backbone destroys a model and removes it from the parent model's list.
   */
  removeModel: function(m) {
    JJ.debug.log("removeModel");
    var successCallback = function(m) {
      JJ.debug.log("Destroyed a model...");
      JJ.debug.log(m);
      var index = this.modelArray.indexOf(m);
      this.modelArray.splice(index, 1);
      JJ.debug.log(this.modelArray);
    }
    m.destroy({
      success: successCallback,
      error: JJ.debug.log.backboneError,
    });
  },
  
  /*
   * Appends a new model view to this view's container.
   * @params: The model to append.
   */
  addView: function(m) {
    JJ.debug.log("addView");
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
 * Parent view for Entry form.
 *
 ************************************************************/
JJ.Views.EditEntry = JJ.Views.AbstractEditModel.extend({
  template: Handlebars.templates["entry/judo/edit/single"],
  extendEvents: {
    "click #save": "save",
  },
  
  /*
   * Saves this view's model.
   */
  save: function() {
    JJ.debug.log("**********SAVING**********");
    this.model.save(null, {
      success: function(m) {
        JJ.debug.log(m.toJSON());
        JJ.debug.log("**********DONE SAVING**********");
      },
      error: JJ.debug.backboneError,
    });
  },
    
  initialize: function(options) {
    JJ.Views.EditEntry.__super__.initialize.apply(this);
  },
  
  /*
   * Links DOM to third party JS libraries.
   */
  linkDOM: function() {
    var dtpFormat = "M d, Y H:i:s";
    var dtpOnChangeDateTime = function(ct,$input) {
      $input.change();
    }
    $("#dtp_start").datetimepicker({
      format: dtpFormat,
      onShow: function(ct) {
        this.setOptions({
          maxDate: $("#dtp_end").val() ? $("#dtp_end").val() : false
        })
      },
      onChangeDateTime: dtpOnChangeDateTime,
    });
    $("#dtp_end").datetimepicker({
      format: dtpFormat,
      onShow: function(ct) {
        this.setOptions({
          minDate: $("#dtp_start").val() ? $("#dtp_start").val() : false
        })
      },
      onChangeDateTime: dtpOnChangeDateTime,
    });
  },
  
  render: function() {
    var entry = this.model;
    entry.stayHydrated();
    var json = entry.toJSON();
    
    // Entry formatting
    var dateFormat = "mmm d, yyyy HH:MM:ss";
    json["start"] = dateFormat(entry.get("start"), dateFormat);
    json["end"] = dateFormat(entry.get("end"), dateFormat);
    this.$el.html(this.template(json));
    
    // AbstractEditModelList's
    new JJ.Views.EditDrillList({parentModel: entry, el: this.$("#drills")});
    
    // AbstractSelectModelList's
    var locations = new JJ.Views.LocationCollection();
    locations.fetch({
      success: function(m) {
        new JJ.Views.SelectLocation({collection: m, parentModel: entry, el: this.$("#location")});
      },
      error: JJ.debug.backboneError,
    });
    var types = new JJ.Views.EntryTypeCollection();
    types.fetch({
      success: function(m) {
        new JJ.Views.SelectEntryType({collection: m, parentModel: entry, el: this.$("#type")});
      },
      error: JJ.debug.backboneError,
    });
    
    // DOM JS linking
    this.linkDOM();
    
    return this;
  },
});