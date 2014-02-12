/*
 * Allows use of all Handlebars templates as partials.
 */
Handlebars.partials = Handlebars.templates;
JJ.Util.links.editPrefix = "/m";

/************************************************************
 *
 * JJ.Views.AbstractStaticPage
 *  - Static template inputs only.
 *
 ************************************************************/
JJ.Views.AbstractStaticPage = JJ.Views.AbstractView.extend({
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
JJ.Views.Home = JJ.Views.AbstractStaticPage.extend({
  template: Handlebars.templates["home"],
  
  render: function() {
    this.options.name = JJ.Meta.name;
    this.options.links.newEntry = JJ.Util.links.edit.entry("new");
    this.$el.html(this.template(this.options));
    return this;
  },
});