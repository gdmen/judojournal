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
    this.json = options;
    this.json.links = {};
  },
  
  render: function() {
    this.$el.html(this.template(this.json));
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
    this.json.name = JJ.Meta.name;
    this.json.links = {
      newEntry: JJ.Util.links.edit.entry("new"),
    };
    this.json.entries = this.json.entries.toJSON();
    var i;
    for (i = 0; i < this.json.entries.length; i++) {
      this.json.entries[i].link = JJ.Util.links.view.entry(this.json.entries[i].id);
    }
    console.log(this.json);
    this.$el.html(this.template(this.json));
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
    this.json = this.model.toJSON();
    this.json.links = {
      newEntry: JJ.Util.links.edit.entry("new"),
    };
    console.log(this.json);
    this.$el.html(this.template(this.json));
    return this;
  },
});