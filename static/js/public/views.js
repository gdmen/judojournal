/*
 * Allows use of all Handlebars templates as partials.
 */
Handlebars.partials = Handlebars.templates;
JJ.Util.links.editPrefix = "/m";

/************************************************************
 *
 * JJ.Views.AbstractPage
 *  - Static template inputs only.
 *
 ************************************************************/
JJ.Views.AbstractPage = JJ.Views.AbstractView.extend({
  baseEvents: {
  },
  
  // For subclasses to add events.
  extendEvents: {},
  
  events: function() {
    return _.extend({},this.baseEvents,this.extendEvents);
  },
  initialize: function(options) {
    this.options = options;
    this.options.links = {};
  },
  
  render: function() {
    this.$el.html(this.template(this.options));
    return this;
  },
});

/************************************************************
 *
 * Main view for Home page.
 *
 ************************************************************/
JJ.Views.Home = JJ.Views.AbstractPage.extend({
  template: Handlebars.templates["pages/home"],
  
  render: function() {
    this.options.name = JJ.Meta.name;
    this.options.links = {
      newEntry: JJ.Util.links.edit.entry("new"),
    };
    this.$el.html(this.template(this.options));
    return this;
  },
});

/************************************************************
 *
 * JJ.Views.ViewJudoEntry
 *
 ************************************************************/
JJ.Views.ViewJudoEntry = JJ.Views.AbstractPage.extend({
  template: Handlebars.templates["entry/judo/single"],
  
  initialize: function(options) {
  },
  
  render: function() {
    this.options = this.model.toJSON();
    this.options.links = {
      newEntry: JJ.Util.links.edit.entry("new"),
    };
    console.log(this.options);
    this.$el.html(this.template(this.options));
    //this.model.save();
    return this;
  },
});