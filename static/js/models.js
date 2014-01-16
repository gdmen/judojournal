Backbone.Model.prototype.toJSON = function() {
  if (this._isSerializing) {
    return this.id || this.cid;
  }
  this._isSerializing = true;
  var json = _.clone(this.attributes);
  _.each(json, function(value, name) {
    _.isFunction(value.toJSON) && (value[name] = value.toJSON());
  });
  this._isSerializing = false;
  return json;
}

JJ.EntryTypeModel = Backbone.Model.extend({
  urlRoot: '/api/v1/entry/type/',
});

JJ.GoalModel = Backbone.Model.extend({
  urlRoot: '/api/v1/goal/',
});

JJ.GoalInstanceModel = Backbone.Model.extend({
  urlRoot: '/api/v1/goal/instance/',
  defaults: {
    "rating": "3",
  }
});

JJ.LocationModel = Backbone.Model.extend({
  urlRoot: '/api/v1/location/',
});

JJ.DrillEntryModulModel = Backbone.Model.extend({
  urlRoot: '/api/v1/entry/module/drill/',
  defaults: {
    "rating": "3",
  }
});

JJ.SparringEntryModulModel = Backbone.Model.extend({
  urlRoot: '/api/v1/entry/module/sparring/',
  defaults: {
    "rating": "3",
  }
});

JJ.EntryAModel = Backbone.Model.extend({
  urlRoot: '/api/v1/entry/a/',
  defaults: {
    "rating": "3",
    "start": new Date(),
    "end": new Date(),
  }
});