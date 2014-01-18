//http://paltman.com/2012/04/30/integration-backbonejs-tastypie/
JJ.TastypieModel = Backbone.Model.extend({
    base_url: function() {
      var temp_url = Backbone.Model.prototype.url.call(this);
      return (temp_url.charAt(temp_url.length - 1) == '/' ? temp_url : temp_url+'/');
    },
    url: function() {
      return this.base_url();
    },
    toJSON: function() {
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
    },
    
});

JJ.TastypieCollection = Backbone.Collection.extend({
    parse: function(response) {
        this.recent_meta = response.meta || {};
        return response.objects || response;
    }
});

JJ.GoalModel = JJ.TastypieModel.extend({
  urlRoot: "/api/v1/goal/",
});

JJ.GoalInstanceModel = JJ.TastypieModel.extend({
  urlRoot: "/api/v1/goal/instance/",
  defaults: {
    "rating": "3",
  }
});

JJ.EntryTypeModel = JJ.TastypieModel.extend({
  urlRoot: "/api/v1/entry/type/",
});

JJ.EntryTypeCollection = JJ.TastypieCollection.extend({
  model: JJ.EntryTypeModel,
  url: "/api/v1/entry/type/",
});

JJ.LocationModel = JJ.TastypieModel.extend({
  urlRoot: "/api/v1/entry/location/",
});

JJ.LocationCollection = JJ.TastypieCollection.extend({
  model: JJ.LocationModel,
  url: "/api/v1/entry/location/",
});

JJ.DrillEntryModuleModel = JJ.TastypieModel.extend({
  urlRoot: "/api/v1/entry/module/drill/",
  defaults: {
    "rating": "3",
  }
});

JJ.SparringEntryModuleModel = JJ.TastypieModel.extend({
  urlRoot: "/api/v1/entry/module/sparring/",
  defaults: {
    "rating": "3",
  }
});

JJ.EntryAModel = JJ.TastypieModel.extend({
  urlRoot: "/api/v1/entry/a/",
  defaults: {
    "rating": "3",
    "start": new Date(),
    "end": new Date(),
    "drills": [],
    "sparring": [],
  },
  stayHydrated: function() {
    for(var i=this.get('drills').length; i--;) {
      var drill = this.get('drills')[i];
      if(!(drill instanceof JJ.DrillEntryModuleModel)) {
        this.get('drills')[i] = new JJ.DrillEntryModuleModel(drill);
      }
    }
    //var type = this.get("type");
    //if(!(type instanceof JJ.EntryTypeModel)) {
    //  this.set("type", new JJ.EntryTypeModel(type));
    //}
    //var location = this.get("location");
    //if(!(location instanceof JJ.LocationModel)) {
    //  this.set("location", new JJ.LocationModel(location));
    //}
  },
});