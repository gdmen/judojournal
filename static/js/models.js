/*
 * Attribution:
 * http://paltman.com/2012/04/30/integration-backbonejs-tastypie/
 * Tastypie Models avoid redirects for ending '/'s and have recursive toJSON()
 */
JJ.Models.Tastypie = Backbone.Model.extend({
  
  /*
   * [gdm] Expands elements for easier manipulation.
   */
  hydrate: function() {
		console.log("HYDRATING ENTRY " + this.cid);
  },
  /*
   * [gdm] Dehydrates elements for saving.
   */
  dehydrated: function() {
		return _.clone(this);
  },

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
      _.isFunction(value.toJSON) && (json[name] = value.toJSON());
    });
    this._isSerializing = false;
    // Also return cid
    json['cid'] = this.cid;
    return json;
  },
});
JJ.Models.TastypieCollection = Backbone.Collection.extend({
  parse: function(response) {
    this.recent_meta = response.meta || {};
    return response.objects || response;
  }
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
    rating: "3",
  }
});

/*
 * Art
 */
JJ.Models.Art = JJ.Models.Tastypie.extend({
  urlRoot: "/api/v1/art/",
});

JJ.Models.ArtCollection = JJ.Models.TastypieCollection.extend({
  model: JJ.Models.Art,
  url: "/api/v1/art/",
});

/*
 * Art
 */
JJ.Models.Type = JJ.Models.Tastypie.extend({
  urlRoot: "/api/v1/type/",
});

JJ.Models.TypeCollection = JJ.Models.TastypieCollection.extend({
  model: JJ.Models.Type,
  url: "/api/v1/type/",
});

/*
 * Location
 */
JJ.Models.Location = JJ.Models.Tastypie.extend({
  urlRoot: "/api/v1/location/",
});

JJ.Models.LocationCollection = JJ.Models.TastypieCollection.extend({
  model: JJ.Models.Location,
  url: "/api/v1/location/",
});

/*
 * DrillEntryModule
 */
JJ.Models.DrillEntryModule = JJ.Models.Tastypie.extend({
  urlRoot: "/api/v1/module/drill/",
  defaults: {
    rating: "3",
  }
});

/*
 * SparringEntryModule
 */
JJ.Models.SparringEntryModule = JJ.Models.Tastypie.extend({
  urlRoot: "/api/v1/module/sparring/",
  defaults: {
    rating: "3",
  }
});

/*
 * JudoEntry
 */
JJ.Models.JudoEntry = JJ.Models.Tastypie.extend({
  urlRoot: "/api/v1/entry/judo/",

	defaults: function() {
		var now = new Date;
		return {
			rating: "3",
			start: now,
			end: now,
			drills: [],
			sparring: [],
		};
	},
  
  /*
   * Expands elements for easier manipulation.
   */
  hydrate: function() {
		console.log("HYDRATING ENTRY " + this.cid);
    var start = this.get("start");
    if (!(start instanceof Date)) {
      this.set({"start": new Date(Date.parse(start))},{silent:true});
    }
    var end = this.get("end");
    if (!(end instanceof Date)) {
      this.set({"end": new Date(Date.parse(end))},{silent:true});
    }
    var drills = this.get("drills");
    for (var i=drills.length; i--;) {
      var drill = drills[i];
      if (!(drill instanceof JJ.Models.DrillEntryModule)) {
        drills[i] = new JJ.Models.DrillEntryModule(drill);
      }
    }
  },
  
  /*
   * Dehydrates elements for saving.
   */
  dehydrated: function() {
		console.log("DEHYDRATING ENTRY " + this.cid);
		var clone = _.clone(this);
		clone.set("drills", _.clone(clone.get("drills")));
    var drills = clone.get("drills");
    for (var i=0; i < drills.length; i++) {
      if (drills[i] instanceof JJ.Models.DrillEntryModule) {
        drills[i] = drills[i].get("resource_uri");
      }
    }
		return clone;
  },
});