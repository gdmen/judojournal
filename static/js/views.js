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
JJ.AbstractSelectModelView = Backbone.View.extend({
  field: '',
  events: {
    "change select": "changed",
  },
 
  changed: function(e){
    var value = $(e.currentTarget).val();
    this.parent.set(this.field, value);
    this.render();
  },
  
  initialize: function(options) {
    this.parent = options.parent;
    this.render();
  },
  
  render: function() {
    var selected = this.parent.get(this.field);
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
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
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
    var event = this.model;
    console.log("**********SAVING**********");
    //event.set('type', event.type.toJSON());
    //event.set('location', event.location.toJSON());
    console.log(event.toJSON());
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
  
  render: function() {
    this.model.stayHydrated();
    this.$el.html(this.template(this.model.toJSON()));
    new JJ.EditTypeView({model: this.model.get('type'), el: this.$("#type")});
    //new JJ.EditLocationView({model: this.model.get('location'), el: this.$("#location")});
    var entry = this.model;
    var locations = new JJ.LocationCollection();
    locations.fetch({
      success: function(m) {
        new JJ.SelectLocationView({collection: m, parent: entry, el: this.$("#location")});
      },
      //error: handleUnknownRoute
    });
    // UI library linking
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
    return this;
  },
});