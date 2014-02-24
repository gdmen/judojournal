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
    this.json.links = {
      newEntry: JJ.Util.links.edit.entry("new"),
      profile: "/profile",
    };
    console.log(this.json);
    this.$el.html(this.template(this.json));
    return this;
  },
});

/************************************************************
 *
 * Main view for Profile page.
 *
 ************************************************************/
JJ.Views.Profile = JJ.Views.AbstractPage.extend({
  template: Handlebars.templates["pages/profile"],
  
  render: function() {
    this.json.entries = this.json.entries.toJSON();
    var i;
    for (i = 0; i < this.json.entries.length; i++) {
      this.json.entries[i].link = JJ.Util.links.view.entry(this.json.entries[i].id);
      this.json.entries[i].date = dateFormat(this.json.entries[i].start, JJ.Views.Util.dateFormat.date);
    }
    this.json.exportContent = escape(JSON.stringify(this.json));
    this.json.exportName = this.json.username + "_" + dateFormat(new Date(), JJ.Views.Util.dateFormat.filename) + ".json";
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
    this.model.hydrate();
    this.json = this.model.toJSON();
    this.json.links = {
      newEntry: JJ.Util.links.edit.entry("new"),
    };
    var start = this.model.get("start");
    var end = this.model.get("end");
    var duration = (end - start) / (1000 * 60); //in total minutes
    var hours = Math.floor(duration / 60);
    var minutes = duration % 60;
    this.json.displayStart = dateFormat(start, JJ.Views.Util.dateFormat.displayTime);
    this.json.displayEnd = dateFormat(end, JJ.Views.Util.dateFormat.displayTime);
    this.json.displayDuration = "";
    if (hours > 0) {
      this.json.displayDuration += hours + " hours";
      if (minutes > 0) {
        this.json.displayDuration += " "
      } 
    } if (minutes > 0) {
      this.json.displayDuration += minutes + " minutes"
    }
    this.json.displayDate = dateFormat(start, JJ.Views.Util.dateFormat.displayDate);
    this.json.profileLink = JJ.Util.links.view.profile(this.json.user.username);
    console.log(this.json);
    this.$el.html(this.template(this.json));
    JJ.Util.EmbedMedia(this.$el);
    return this;
  },
});