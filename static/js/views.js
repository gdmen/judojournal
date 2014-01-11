var ShowStatusView = Backbone.View.extend({
  template: TEMPLATES['model/status/show'],
  initialize: function(options) {
    this.model.on('change', this.render, this);
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

var ShowEventView = Backbone.View.extend({
  template: TEMPLATES['model/event/show'],
  
  initialize: function(options) {
    this.model.on('change', this.render, this);
    this.prior_status = options.prior_status;
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    new ShowStatusView({model: this.prior_status, el: this.$("#prior_status")});
    return this;
  },
});

var AbstractEditModelView = Backbone.View.extend({
  events: {
    "change input": "changed",
    "change select": "changed",
  },
 
  changed: function(e){
    var changed = e.currentTarget;
    var value = $(e.currentTarget).val();
    var obj = {};
    obj[changed.name] = value;
    this.model.set(obj);
    console.log(this.model.toJSON());
  },
  
  initialize: function(options) {
    _.bindAll(this, "changed");
    this.model.on('change', this.render, this);
    this.render();
  },
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

var EditStatusView = AbstractEditModelView.extend({
  template: TEMPLATES['model/status/edit'],
});

var EditLocationView = AbstractEditModelView.extend({
  template: TEMPLATES['model/location/edit'],
});

var EditActivityView = AbstractEditModelView.extend({
  template: TEMPLATES['model/activity/edit'],
});

var EditEventView = AbstractEditModelView.extend({
  template: TEMPLATES['model/event/edit'],
  events: {
    "change input": "changed",
    "change select": "changed",
    "click #save": "save",
  },
  
  save: function() {
    var event = this.model;
    var prior_status = this.prior_status;
    var location = this.location;
    var activity = this.activity;
    console.log("**********SAVING**********");
    //TODO: add error handling here to print improper input warning
    prior_status.save(null, {
      success: function (m) {
        console.log("SAVED PRIOR_STATUS...");
        event.set('prior_status', m.get('id'));
        location.save(null, {
          success: function (m) {
            console.log("SAVED location...");
            event.set('location', m.get('id'));
            activity.save(null, {
              success: function (m) {
                console.log("SAVED activity...");
                event.set('activity', m.get('id'));
                event.save(null, {
                  success: function (m) {
                    console.log("SAVED event...");
                    console.log(m.toJSON());
                    console.log("**********DONE SAVING**********");
                  }
                });
              }
            });
          }
        });
      }
    });
  },
    
  initialize: function(options) {
    this.prior_status = options.prior_status;
    this.location = options.location;
    this.activity = options.activity;
    EditEventView.__super__.initialize.apply(this);
  },
  
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    console.log(this.model.toJSON());
    new EditStatusView({model: this.prior_status, el: this.$("#prior_status")});
    new EditLocationView({model: this.location, el: this.$("#location")});
    new EditActivityView({model: this.activity, el: this.$("#activity")});
    return this;
  },
});