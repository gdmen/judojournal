/*
var ShowStatusView = Backbone.View.extend({
  template: Handlebars.templates.status_show,
  initialize: function(options) {
    this.model.on('change', this.render, this);
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

var ShowLocationView = Backbone.View.extend({
  template: Handlebars.templates.location_show,
  initialize: function(options) {
    this.model.on('change', this.render, this);
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

var ShowActivityView = Backbone.View.extend({
  template: Handlebars.templates.activity_show,
  initialize: function(options) {
    this.model.on('change', this.render, this);
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

var ShowEntryView = Backbone.View.extend({
  template: Handlebars.templates.event_show,
  
  initialize: function(options) {
    this.model.on('change', this.render, this);
    this.prior_status = options.prior_status;
    this.location = options.location;
    this.activity = options.activity;
    this.render();
  },
  render: function() {
    var json = this.model.toJSON();
    var start_date = new Date(Date.parse(json.start_time));
    var end_date = new Date(Date.parse(json.end_time));
    json.start_time = start_date.toLocaleTimeString();
    json.end_time = end_date.toLocaleTimeString();
    var ms_per_min = 1000*60;
    var minutes = Math.floor((end_date - start_date) / ms_per_min);
    json.hours = Math.floor(minutes / 60);
    if(json.hours == 0) {
      json.hours = false;
    }
    console.log(json);
    json.minutes = minutes % 60;
    json.date = start_date.toLocaleDateString();
    this.$el.html(this.template(json));
    new ShowStatusView({model: this.prior_status, el: this.$("#prior_status")});
    new ShowLocationView({model: this.location, el: this.$("#location")});
    new ShowActivityView({model: this.activity, el: this.$("#activity")});
    return this;
  },
});
*/

JJ.AbstractEditModelView = Backbone.View.extend({
  events: {
    "change input": "changed",
    "change select": "changed",
  },
 
  changed: function(e){
    var changed = e.currentTarget;
    var value = $(e.currentTarget).val();
    this.model.set(changed.name, value);
    this.render();
  },
  
  initialize: function(options) {
    this.render();
  },
  
  // Link DOM to third party JS libraries
  linkDOM: function() {
  },
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.linkDOM();
    return this;
  },
});

JJ.EditDrillView = JJ.AbstractEditModelView.extend({
  template: Handlebars.templates['entry/module/drill/edit/single'],
  
  remove: function() {
    console.log('removing');
    this.parent_view.remove_model(this.model);
  },
  
  initialize: function(options) {
    this.parent_view = options.parent_view;
    this.render();
  },
}); 

JJ.AbstractEditListModelView = Backbone.View.extend({
  field: '',
  parent_model: null,
  new_view: null,
  new_model: null,
  events: {
    "click #add": "add",
  },
 
  add: function(e) {
    console.log('add');
    var model = new this.new_model();
    var this_view = this;
    var model_array = this.model_array;
    console.log(model_array);
    
    model.save(null, {
      success: function(m) {
        console.log("SAVED new model...");
        console.log(m);
        model_array.push(m);
        this_view.render();
      },
      error: function(response) {
        console.log("ERROR");
        console.log(response);
      }
    });
  },
  
  addModel: function(m) {
    console.log('addModel');
    var div = $( "<div/>" );
    var id = m.get('resource_uri');
    this.$el.append(div);
    div.attr('id', id);
    new this.new_view({model: m, parent_view: this, el: this.$(document.getElementById(id))});
  },
  
  initialize: function(options) {
    this.model_array = options.parent_model.get(this.field);
    this.render();
  },
  
  render: function() {
    this.$el.html(this.template());
    for(var i=this.model_array.length; i--;) {
      this.addModel(this.model_array[i]);
    }
    return this;
  },
});
JJ.EditListDrillView = JJ.AbstractEditListModelView.extend({
  template: Handlebars.templates['entry/module/drill/edit/list'],
  field: 'drills',
  new_view: JJ.EditDrillView,
  new_model: JJ.DrillEntryModuleModel,
});

JJ.AbstractSelectModelView = Backbone.View.extend({
  field: '',
  parent_model: null,
  events: {
    "change select": "changed",
  },
 
  changed: function(e){
    var value = $(e.currentTarget).val();
    this.parent_model.set(this.field, value);
    console.log(this.parent_model);
    this.render();
  },
  
  initialize: function(options) {
    this.parent_model = options.parent_model;
    this.render();
  },
  
  render: function() {
    var selected = this.parent_model.get(this.field);
    var json = {collection: this.collection.toJSON()};
    for(var i=json.collection.length; i--;) {
      json.collection[i]['selected'] = (json.collection[i].resource_uri === selected);
    }
    this.$el.html(this.template(json));
    return this;
  },
});

JJ.SelectLocationView = JJ.AbstractSelectModelView.extend({
  template: Handlebars.templates['entry/location/select/single'],
  field: 'location',
}); 

JJ.SelectEntryTypeView = JJ.AbstractSelectModelView.extend({
  template: Handlebars.templates['entry/type/select/single'],
  field: 'type',
}); 




JJ.EditTypeView = JJ.AbstractEditModelView.extend({
  template: Handlebars.templates['entry/type/edit/single'],
});

JJ.EditLocationView = JJ.AbstractEditModelView.extend({
  template: Handlebars.templates['entry/location/edit/single'],
});

JJ.EditEntryView = JJ.AbstractEditModelView.extend({
  template: Handlebars.templates['entry/a/edit/single'],
  events: {
    "change input": "changed",
    "change select": "changed",
    "click #save": "save",
  },
  
  save: function() {
    var entry = this.model;
    console.log("**********SAVING**********");
    console.log(entry.toJSON());
    entry.save(null, {
      success: function(m) {
        console.log("SAVED entry...");
        console.log(m.toJSON());
        console.log("**********DONE SAVING**********");
      },
      error: function(response) {
        console.log("ERROR");
        console.log(response);
      }
    });
    //TODO: add error handling here to print improper input warning
    /*
    type.save(null, {
      success: function(m) {
        console.log("SAVED type...");
        event.set('type', m.get('resource_uri'));
        location.save(null, {
          success: function(m) {
            console.log("SAVED location...");
            event.set('location', m.get('resource_uri'));
            event.save(null, {
              success: function(m) {
                console.log("SAVED event...");
                console.log(m.toJSON());
                console.log("**********DONE SAVING**********");
              },
              error: function(response) {
                console.log("ERROR");
                console.log(response);
              }
            });
          },
          error: function(response) {
            console.log("ERROR");
            console.log(response);
          }
        });
      },
      error: function(response) {
        console.log("ERROR");
        console.log(response);
      }
    });
    */
  },
    
  initialize: function(options) {
    JJ.EditEntryView.__super__.initialize.apply(this);
  },
  
  linkDOM: function() {
    $('#dtp_start').datetimepicker({
      format: 'd.m.Y H:i',
      hours12: true,
      onShow:function( ct ){
       this.setOptions({
        maxDate:$('#dtp_end').val()?$('#dtp_end').val():false
       })
      },
    });
    $('#dtp_end').datetimepicker({
      format: 'd.m.Y H:i',
      hours12: true,
      onShow:function( ct ){
       this.setOptions({
        minDate:$('#dtp_start').val()?$('#dtp_start').val():false
       })
      },
    });
  },
  
  render: function() {
    var entry = this.model;
    entry.stayHydrated();
    this.$el.html(this.template(entry.toJSON()));
    
    // ADD / REMOVE oneToMany
    new JJ.EditListDrillView({parent_model: entry, el: this.$('#drills')});
    
    // SELECT foreign key
    var locations = new JJ.LocationCollection();
    locations.fetch({
      success: function(m) {
        new JJ.SelectLocationView({collection: m, parent_model: entry, el: this.$('#location')});
      },
      //error: handleUnknownRoute
    });
    var types = new JJ.EntryTypeCollection();
    types.fetch({
      success: function(m) {
        new JJ.SelectEntryTypeView({collection: m, parent_model: entry, el: this.$('#type')});
      },
      //error: handleUnknownRoute
    });
    
    // DOM JS linking
    this.linkDOM();
    
    return this;
  },
});