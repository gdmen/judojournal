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
    var json = this.model.toJSON();
    this.$el.html(this.template(json));
    new ShowStatusView({model: this.prior_status, el: this.$("#prior_status")});
    return this;
  },
});

var EditModelView = Backbone.View.extend({
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
  }
});

var EditStatusView = EditModelView.extend({
  template: TEMPLATES['model/status/edit'],
  
  initialize: function(options) {
    EditStatusView.__super__.initialize.apply(this); 
    this.model.on('change', this.render, this);
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

var EditEventView = EditModelView.extend({
  template: TEMPLATES['model/event/edit'],
  
  initialize: function(options) {
    EditEventView.__super__.initialize.apply(this); 
    this.model.on('change', this.render, this);
    this.prior_status = options.prior_status;
    this.render();
  },
  
  render: function() {
    var json = this.model.toJSON();
    this.$el.html(this.template(json));
    new EditStatusView({model: this.prior_status, el: this.$("#prior_status")});
    return this;
  },
});