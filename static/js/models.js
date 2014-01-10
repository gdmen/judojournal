var LocationModel = Backbone.Model.extend({
  urlRoot: '/api/locations/',
});
var GoalModel = Backbone.Model.extend({
  urlRoot: '/api/goals/',
});
var QuestionModel = Backbone.Model.extend({
  urlRoot: '/api/questions/',
});
var StatusModel = Backbone.Model.extend({
  urlRoot: '/api/statuses/',
});
var EventModel = Backbone.Model.extend({
  urlRoot: '/api/events/',
});