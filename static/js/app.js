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
JJ.Util = {};
JJ.Models = {};
JJ.Views = {};

JJ.Util.log = function(s) {
  console.log(s);
}
JJ.Util.backboneError = function(response) {
  console.log("ERROR");
  console.log(response);
}

JJ.Util.handleUnknownRoute = function(url) {
  //window.location = "/";
  console.log("UNKNOWN ROUTE");
  console.log(url);
}