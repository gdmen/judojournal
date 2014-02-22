/*
 * Attribution:
 * http://paltman.com/2012/04/30/integration-backbonejs-tastypie/
 * Tastypie Models avoid redirects for ending '/'s and have recursive toJSON()
 */
JJ.Models.Tastypie = Backbone.Model.extend({
  
  /*
   * [gdm] Reverting changes to most recent save.
   */
  discardChanges: function() {
    console.log(this.previousAttributes());
    this.set(this.previousAttributes());
    return this;
  },
  /*
   * [gdm] Compiles certain fields for display.
   */
  compileDisplay: function() {
    return this;
  },
  /*
   * [gdm] Compiles field to markdown and sanitizes output.
   */
  _markdown: function(field) {
    !_.isUndefined(this.get(field)) && this.set("compiled_" + field, html_sanitize(JJ.Markdown.makeHtml(this.get(field))));
  },
  /*
   * [gdm] Expands elements for easier manipulation.
   */
  hydrate: function() {
		console.log("HYDRATING ENTRY " + this.cid);
    this.compileDisplay();
    return this;
  },
  /*
   * [gdm] Dehydrates elements for saving.
   */
  dehydrated: function() {
		return this.clone();
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
      if (value !== null && _.isFunction(value.toJSON)) {
        json[name] = value.toJSON();
      } else if (_.isArray(value)) {
        json[name] = _.clone(value);
        $.each(value, function(index, element) {
          if (element !== null && _.isFunction(element.toJSON)) {
            json[name][index] = element.toJSON();
          }
        });
      }
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
    rating: 3,
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
 * NoteEntryModule
 */
JJ.Models.NoteEntryModule = JJ.Models.Tastypie.extend({
  urlRoot: "/api/v1/module/note/",
  defaults: {
  },
  compileDisplay: function() {
    this._markdown("details");
    return this;
  },
});

/*
 * DrillEntryModule
 */
JJ.Models.DrillEntryModule = JJ.Models.Tastypie.extend({
  urlRoot: "/api/v1/module/drill/",
  defaults: {
  },
  compileDisplay: function() {
    this._markdown("details");
    return this;
  },
});

/*
 * SparringEntryModule
 */
JJ.Models.SparringEntryModule = JJ.Models.Tastypie.extend({
  urlRoot: "/api/v1/module/sparring/",
  defaults: {
  },
  compileDisplay: function() {
    this._markdown("details");
    return this;
  },
});

/*
 * JudoEntry
 */
JJ.Models.JudoEntry = JJ.Models.Tastypie.extend({
  urlRoot: "/api/v1/entry/judo/",

	defaults: function() {
    var coeff = 1000 * 60 * 5;
		var now = new Date(Math.round((new Date()).getTime() / coeff) * coeff);
		return {
			rating: 3,
			start: now,
			end: now,
			notes: [],
			drills: [],
			sparring: [],
		};
	},
  
  compileDisplay: function() {
		this._markdownArray("notes");
		this._markdownArray("drills");
		this._markdownArray("sparring");
    return this;
  },
	_markdownArray: function(field) {
    var arr = this.get(field);
    for (var i=arr.length; i--;) {
      arr[i].compileDisplay();
    }
	},
  
  /*
   * Minimal hydration for Collection sorting.
   */
  hydrateForCompare: function() {
    var start = this.get("start");
    if (!(start instanceof Date)) {
      this.set({"start": new Date(Date.parse(start))},{silent:true});
    }
  },
  
  /*
   * Expands elements for easier manipulation.
   */
  hydrate: function() {
		console.log("HYDRATING ENTRY " + this.cid);
    this.hydrateForCompare();
    var end = this.get("end");
    if (!(end instanceof Date)) {
      this.set({"end": new Date(Date.parse(end))},{silent:true});
    }
		this._hydrateArray("notes", JJ.Models.NoteEntryModule);
		this._hydrateArray("drills", JJ.Models.DrillEntryModule);
		this._hydrateArray("sparring", JJ.Models.SparringEntryModule);
    this.compileDisplay();
    return this;
  },
	_hydrateArray: function(field, type) {
    var arr = this.get(field);
    for (var i=arr.length; i--;) {
      var elem = arr[i];
      if (!(elem instanceof type)) {
        arr[i] = new type(elem);
      }
    }
	},
  
  /*
   * Dehydrates elements for saving.
   */
  dehydrated: function() {
		console.log("DEHYDRATING ENTRY " + this.cid);
		var clone = this.clone();
		this._dehydrateArray(clone, "notes", JJ.Models.NoteEntryModule);
		this._dehydrateArray(clone, "drills", JJ.Models.DrillEntryModule);
		this._dehydrateArray(clone, "sparring", JJ.Models.SparringEntryModule);
		return clone;
  },
	_dehydrateArray: function(clone, field, type) {
		clone.set(field, _.clone(clone.get(field)));
    var arr = clone.get(field);
    for (var i=0; i < arr.length; i++) {
      if (arr[i] instanceof type) {
        arr[i] = arr[i].get("resource_uri");
      } else if (!_.isUndefined(arr[i].resource_uri)) {
        arr[i] = arr[i].resource_uri;
			}
    }
	},
});

JJ.Models.JudoEntryCollection = JJ.Models.TastypieCollection.extend({
  model: JJ.Models.JudoEntry,
  url: "/api/v1/entry/judo/",
  comparator: function(item) {
    item.hydrateForCompare();
    return -(item.get('start'));
  }
});