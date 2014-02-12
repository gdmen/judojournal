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

/*
 * Allows use of all Handlebars templates as partials.
 */
Handlebars.partials = Handlebars.templates;

// Instantiate app namespace.
window.JJ = {};

// Instantiate subspaces.
JJ.Meta = {};
JJ.Util = {};
JJ.Models = {};
JJ.Views = {};

JJ.Meta.name = "JudoJournal";

JJ.Util.log = function(s) {
  console.log(s);
}
JJ.Util.backboneError = function(response) {
  console.log("ERROR");
  console.log(response);
}

JJ.Util.unknownRoute = function(url) {
  //window.location = "/";
  console.log("UNKNOWN ROUTE");
  console.log(url);
}

JJ.Util.links = {
  edit: {
    entry: function(id) {
      return "/#/entry/" + id;
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
	console.log(callback);
	var previousCall = new Date().getTime();
	return function() {
		var time = new Date().getTime();
		if ((time - previousCall) >= delay) {
			previousCall = time;
			callback.apply(null, arguments);
		}
	};
}

// TODO: put this with template/ code somewhere?

/*
 * http://stackoverflow.com/questions/11924452/handlebar-js-iterating-over-for-basic-loop
 */
Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 1; i <= n; ++i)
        accum += block.fn(i);
    return accum;
});