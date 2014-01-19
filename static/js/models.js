/*
 * Attribution:
 * http://paltman.com/2012/04/30/integration-backbonejs-tastypie/
 * Tastypie Models avoid redirects for ending '/'s and have recursive toJSON()
 */
JJ.Models.Tastypie = Backbone.Model.extend({
  base_url: function() {
    var temp_url = Backbone.Model.prototype.url.call(this);
    return (temp_url.charAt(temp_url.length - 1) === "/" ? temp_url : temp_url+"/");
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
/*
 * End Attribution
 */

/*
 * Goal
 * GoalInstance
 */
JJ.Models.Goal = JJ.Models.Tastypie.extend({
  urlRoot: "/api/v1/goal/",
});

JJ.Models.GoalInstance = JJ.Models.Tastypie.extend({
  urlRoot: "/api/v1/goal/instance/",
  defaults: {
    "rating": "3",
  }
});

/*
 * EntryType
 */
JJ.Models.EntryType = JJ.Models.Tastypie.extend({
  urlRoot: "/api/v1/entry/type/",
});

JJ.Models.EntryTypeCollection = JJ.Models.TastypieCollection.extend({
  model: JJ.Models.EntryType,
  url: "/api/v1/entry/type/",
});

/*
 * Location
 */
JJ.Models.Location = JJ.Models.Tastypie.extend({
  urlRoot: "/api/v1/entry/location/",
});

JJ.Models.LocationCollection = JJ.Models.TastypieCollection.extend({
  model: JJ.Models.Location,
  url: "/api/v1/entry/location/",
});

/*
 * DrillEntryModule
 */
JJ.Models.DrillEntryModule = JJ.Models.Tastypie.extend({
  urlRoot: "/api/v1/entry/module/drill/",
  defaults: {
    "rating": "3",
  }
});

/*
 * SparringEntryModule
 */
JJ.Models.SparringEntryModule = JJ.Models.Tastypie.extend({
  urlRoot: "/api/v1/entry/module/sparring/",
  defaults: {
    "rating": "3",
  }
});

/*
 * JudoEntry
 */
JJ.Models.JudoEntry = JJ.Models.Tastypie.extend({
  urlRoot: "/api/v1/entry/judo/",
  defaults: {
    "rating": "3",
    "start": new Date(),
    "end": new Date(),
  },
  
  /*
   * Expands JSON elements for easier manipulation.
   */
  stayHydrated: function() {
    var start = this.get("start");
    if (!(start instanceof Date)) {
      this.set("start", new Date(start));
    }
    var end = this.get("end");
    if (!(end instanceof Date)) {
      this.set("end", new Date(end));
    }
    var drills = this.get("drills");
    for (var i=drills.length; i--;) {
      var drill = drills[i];
      if (!(drill instanceof JJ.Models.DrillEntryModule)) {
        drills[i] = new JJ.Models.DrillEntryModule(drill);
      }
    }
  },
});