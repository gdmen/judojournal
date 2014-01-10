var StatusView = Backbone.View.extend({
  template: TEMPLATES['model/status'],
  initialize: function(options) {
    this.model.on('change', this.render, this);
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

var EventView = Backbone.View.extend({
  template: TEMPLATES['model/event'],
  
  initialize: function(options) {
    this.model.on('change', this.render, this);
    this.prior_status = options.prior_status;
    this.render();
  },
  render: function() {
    var json = this.model.toJSON();
    this.$el.html(this.template(json));
    new StatusView({model: this.prior_status, el: this.$("> #prior_status")});
    return this;
  },
});