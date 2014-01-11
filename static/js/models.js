var LocationModel = Backbone.Model.extend({
  urlRoot: '/api/locations',
  defaults: {
    "name": "",
    "url": "",
    "address": "",
  }
});
var GoalModel = Backbone.Model.extend({
  urlRoot: '/api/goals',
  defaults: {
    "brief": "",
    "details": "",
    "rating": "3",
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
    "rating": "3",
  }
});
var ActivityModel = Backbone.Model.extend({
  urlRoot: '/api/activities',
  defaults: {
    "activity": "",
    "type": "",
  }
});
var EventModel = Backbone.Model.extend({
  urlRoot: '/api/events',
  defaults: {
    "start_time": new Date(),
    "end_time": new Date(),
    "rating": "3",
  }
});