/*
 * Adds CSRF token to Backbone.sync headers.
 */
 $(function(){
  var _sync = Backbone.sync;
  Backbone.sync = function(method, model, options) {
    if (method === 'create' || method === 'update' || method === 'delete') {
      var csrf_token = $('meta[name="csrf-token"]').attr('content');
      options.beforeSend = function(xhr){
        xhr.setRequestHeader('X-CSRFToken', csrf_token);
      };
    }
    return _sync(method, model, options);
  };
});

/* 
 * (Bugfix)
 * Tastypie returns a 201 with an empty response upon successful
 * Backbone.Model.save but jquery ajax incorrectly considers the empty response
 * an error.
 */
$.ajaxSetup({dataFilter: function(data, type) {
  if (type === "json" && data === "") {
    data = null;
  }
  return data;
}});

// Instantiate app namespace.
window.JJ = {};

/*
 * http://lostechies.com/derickbailey/
 */
function AppView(){
  /*
	 * Hacky resets since backbone seems to not do a full page refresh between pages.
	 */
	this.pageReset = function() {
		// Foundation menu
		$(".top-bar").removeClass("expanded");
	};
 
	this.clearView = function() {
		console.log("clearView");
		if (this.currentView){
			this.currentView.close();
		}
		this.pageReset();
	};
	
	this.showView = function(view) {
    this.clearView();
		console.log("showView");
		this.currentView = view;
		$("#content").html(this.currentView.el);
		this.currentView.render();
  };
}
JJ.AppView = new AppView();

// Instantiate subspaces.
JJ.Meta = {};
JJ.Util = {};
JJ.Models = {};
JJ.Views = {};

JJ.Meta.name = "JudoJournal";
if (djangoUser) {
  JJ.Meta.user = {
    username: djangoUser.username,
  };
}

JJ.Util.log = function(s) {
  console.log(s);
}
JJ.Util.backboneError = function(response) {
  console.log("ERROR");
  console.log(response);
}

JJ.Util.unknownRoute = function(url) {
  console.log("UNKNOWN ROUTE");
  console.log(url);
  window.location = "/";
}

JJ.Util.links = {
  view: {
    entry: function(id) {
      return "/entry/" + id;
    },
    profile: function(id) {
      return "/profile/" + id;
    },
  },
  edit: {
    prefix: "/m/",
    entry: function(id) {
      return this.prefix + "#/entry/" + id;
    },
  },
}
/*
 * http://stackoverflow.com/questions/986937/how-can-i-get-the-browsers-scrollbar-sizes
 */
JJ.Util.scrollbarWidth = function() {
	var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
			widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
	$outer.remove();
	return 100 - widthWithScroll;
};

/*
 * http://blogorama.nerdworks.in/entry-JavaScriptfunctionthrottlingan.aspx
 */
JJ.Util.throttle = function(callback, delay) {
	var previousCall = new Date().getTime();
	return function() {
		var time = new Date().getTime();
		if ((time - previousCall) >= delay) {
			previousCall = time;
			callback.apply(null, arguments);
		}
	};
}

JJ.Util.EmbedMedia = function(el) {
  var id;
  var images = el.find(".image-embed");
  images.each(function() {
    id = this.innerHTML;
    if (!id.match(/^[0-9a-zA-Z]+$/)) {
      this.innerHTML = "";
    } else {
      this.innerHTML = "<img src='http://i.imgur.com/"+ id +".jpg' />";
    }
  });

  var videos = el.find(".video-embed");
  videos.each(function() {
    id = this.innerHTML;
    if (!id.match(/^[a-zA-Z0-9_-]{11}$/)) {
      this.innerHTML = "";
    } else {
      this.innerHTML = "<iframe width='560' height='315' src='//www.youtube.com/embed/"+ id +"?rel=0' frameborder='0' allowfullscreen></iframe>";
    }
  });
}

JJ.Views.Util = {
  dateFormat: {
    date: "dd mmm, yyyy",
    hour: "hh",
    min: "MM",
    period: "TT",
    displayTime: "h:MMTT",
    displayDate: "dddd, dd mmm yyyy",
    filename: "yyyymmdd_HHMMss",
  },
}

/*
 * http://lostechies.com/derickbailey/
 */
Backbone.View.prototype.close = function(){
	this.remove(); // Remove view from DOM
	this.unbind(); // Unbind all local event bindings
	
	if (!_.isUndefined(this.model)) {
		this.model.unbind(); // Unbind reference to the model
	}

	delete this.$el; // Delete the jQuery wrapped object variable
	delete this.el; // Delete the variable reference to this node
  if (this.onClose){
    this.onClose();
  }
}

JJ.Views.AbstractView = Backbone.View.extend({
	//onClose: function () {
	//},
});

JJ.Markdown = new Showdown.converter();