var LocationModel = Backbone.Model.extend({
  urlRoot: '/api/locations',
  defaults: {
    "name": "",
    "address": "",
  }
});
var GoalModel = Backbone.Model.extend({
  urlRoot: '/api/goals',
  defaults: {
    "brief": "",
    "details": "",
    "rating": "",
  }
});
var QuestionModel = Backbone.Model.extend({
  urlRoot: '/api/questions',
  defaults: {
    "brief": "",
    "details": "",
    "answer": "",
  }
});
var StatusModel = Backbone.Model.extend({
  urlRoot: '/api/statuses',
  defaults: {
    "text": "",
    "lbs": "",
    "rating": "",
  }
});
var EventModel = Backbone.Model.extend({
  urlRoot: '/api/events',
  defaults: {
    "start_time": "",
    "end_time": "",
    "rating": "",
  }
});