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
    if(json.hours === 0) {
      json.hours = false;
    }
    JJ.debug.log(json);
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












    
  initialize: function(options) {
    JJ.Views.EditEntry.__super__.initialize.apply(this);
  },











    //TODO: add error handling here to print improper input warning
    /*
    type.save(null, {
      success: function(m) {
        JJ.debug.log("SAVED type...");
        event.set('type', m.get('resource_uri'));
        location.save(null, {
          success: function(m) {
            JJ.debug.log("SAVED location...");
            event.set('location', m.get('resource_uri'));
            event.save(null, {
              success: function(m) {
                JJ.debug.log("SAVED event...");
                JJ.debug.log(m.toJSON());
                JJ.debug.log("**********DONE SAVING**********");
              },
              error: function(response) {
                JJ.debug.log("ERROR");
                JJ.debug.log(response);
              }
            });
          },
          error: function(response) {
            JJ.debug.log("ERROR");
            JJ.debug.log(response);
          }
        });
      },
      error: function(response) {
        JJ.debug.log("ERROR");
        JJ.debug.log(response);
      }
    });
    */
    
    
    
    
    


/************************************************************
 *
 * JJ.Views.AbstractManageModelWidget
 *  - Model management widget.
 *
 ************************************************************/
JJ.Views.AbstractManageModelWidget = JJ.Views.AbstractView.extend({
  name: "",
  events: {},
  
  toggle: function() {
    var drop = this.$el.find("#" + this.name + "-manage-drop");
    if (drop.is(":hidden")) {
      this.$el.find("#" + this.name + "-manage-i-down").hide();
      this.$el.find("#" + this.name + "-manage-i-up").show();
      drop.slideDown("fast");
    } else {
      this.$el.find("#" + this.name + "-manage-i-up").hide();
      this.$el.find("#" + this.name + "-manage-i-down").show();
      drop.slideUp("fast");
    }
  },
  
  initialize: function(options) {
    this.options = options;
    this.events["click " + "#" + this.name + "-manage-click"] = "toggle";
    this.render();
  },
  
  render: function() {
    this.$el.html(this.template(this.options));
    return this;
  },
});

/*
 * JJ.Views.AbstractManageModelWidget instances
 */

JJ.Views.ManageQuestionsWidget = JJ.Views.AbstractManageModelWidget.extend({
  template: Handlebars.templates["widgets/manage/question"],
  name: 'question',
});

JJ.Views.ManageGoalsWidget = JJ.Views.AbstractManageModelWidget.extend({
  template: Handlebars.templates["widgets/manage/goal"],
  name: 'goal',
});

JJ.Views.ManageTechniquesWidget = JJ.Views.AbstractManageModelWidget.extend({
  template: Handlebars.templates["widgets/manage/technique"],
  name: 'technique',
});

JJ.Views.ManageLocationsWidget = JJ.Views.AbstractManageModelWidget.extend({
  template: Handlebars.templates["widgets/manage/location"],
  name: 'location',
});

JJ.Views.ManageArtsWidget = JJ.Views.AbstractManageModelWidget.extend({
  template: Handlebars.templates["widgets/manage/art"],
  name: 'art',
});

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

/*
 * JJ.Views.AbstractStaticPage instances
 */
/*
JJ.Views.StaticLanding = JJ.Views.AbstractStaticPage.extend({
  template: Handlebars.templates["pages/landing"],
});
*/

/************************************************************
 *
 * Main view for Home page.
 *
 ************************************************************/
JJ.Views.HomePage = JJ.Views.AbstractStaticPage.extend({
  template: Handlebars.templates["index/home"],
  widgets: {
    question: JJ.Views.ManageQuestionsWidget,
    goal: JJ.Views.ManageGoalsWidget,
    technique: JJ.Views.ManageTechniquesWidget,
    location: JJ.Views.ManageLocationsWidget,
    art: JJ.Views.ManageArtsWidget,
  },
  
  /*
   * Appends a new div.
   * @params: The div id to append.
   */
  addWidgetDiv: function(id) {
    var div = $("<div/>");
    div.attr("id", id);
    this.$el.find("#widgets").append(div);
    return div;
  },
  
  render: function() {
    this.options.name = JJ.Meta.name;
    this.options.links.newEntry = JJ.Util.links.edit.entry("new");
    this.$el.html(this.template(this.options));
    var that = this;
    Object.keys(this.widgets).forEach(function (name) {
      new that.widgets[name]({name: name, el: that.addWidgetDiv("manage-" + name + "-div")});
    });    
    return this;
  },
});