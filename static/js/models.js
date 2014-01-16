var EntryTypeModel = Backbone.Model.extend({
  urlRoot: '/api/v1/entry_type',
});

var GoalModel = Backbone.Model.extend({
  urlRoot: '/api/v1/goal',
});

var GoalInstanceModel = Backbone.Model.extend({
  urlRoot: '/api/v1/goal_instance',
  defaults: {
    "rating": "3",
  }
});

var LocationModel = Backbone.Model.extend({
  urlRoot: '/api/v1/location',
});

var DrillEntryModulModel = Backbone.Model.extend({
  urlRoot: '/api/v1/drill_entry_modul',
  defaults: {
    "rating": "3",
  }
});

var SparringEntryModulModel = Backbone.Model.extend({
  urlRoot: '/api/v1/sparring_entry_module',
  defaults: {
    "rating": "3",
  }
});

var EntryAModel = Backbone.Model.extend({
  urlRoot: '/api/v1/entry_a',
  defaults: {
    "rating": "3",
  }
});