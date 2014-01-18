(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['entry/a/edit/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\r\n<div class=\"row\">\r\n  <div class=\"small-6 columns\">\r\n    <div class=\"small-12 columns\">\r\n      <input type=\"text\" name=\"rating\" value=\"";
  if (helper = helpers.rating) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.rating); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n      <div><span id=\"type\"></span> @ <span id=\"location\"></span></div>\r\n      <br />\r\n      <input id=\"dtp_start\" type=\"text\" name=\"start\" value=\"";
  if (helper = helpers.start) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.start); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n      <br />\r\n      <input id=\"dtp_end\" type=\"text\" name=\"end\" value=\"";
  if (helper = helpers.end) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.end); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n    </div>\r\n    <div class=\"small-12 columns\">\r\n      <textarea name=\"pre_status\"> ";
  if (helper = helpers.pre_status) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.pre_status); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>\r\n    </div>\r\n    <div class=\"small-12 columns\">\r\n      <textarea name=\"post_status\"> ";
  if (helper = helpers.post_status) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.post_status); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"small-6 columns\" id=\"goals\">\r\n    <h3>Goals</h3>\r\n    <ul>\r\n      <li>Coffee</li>\r\n      <li>Milk</li>\r\n      <li>Coffee</li>\r\n    </ul>\r\n  </div>\r\n  \r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"small-12 columns\">\r\n    <h2>DRILLS</h2>\r\n    <div id=\"drills\"></div>\r\n  </div>\r\n  \r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"small-12 columns\">\r\n    <h2>RANDORI</h2>\r\n    <div id=\"sparring\"></div>\r\n  </div>\r\n  \r\n</div>\r\n<div class=\"row\">\r\n  <div class=\"small-12 columns\">\r\n    <button id=\"save\">save</button>\r\n  </div>\r\n\r\n</div>";
  return buffer;
  });
templates['entry/a/view/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  if (helper = helpers.hours) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.hours); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "h";
  return buffer;
  }

  buffer += "<div class=\"row\">\r\n  <div class=\"small-6 columns\">\r\n    <div class=\"small-12 columns\">\r\n      <div><span id=\"activity\"></span> @ <span id=\"location\"></span></div>\r\n      <br />";
  if (helper = helpers.date) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.date); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " for ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hours), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  if (helper = helpers.minutes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.minutes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "m from ";
  if (helper = helpers.start_time) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.start_time); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " to ";
  if (helper = helpers.end_time) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.end_time); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n    </div>\r\n    <div class=\"small-12 columns\" id=\"prior_status\">\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"small-6 columns\" id=\"goals\">\r\n    <h3>Goals</h3>\r\n    <ul>\r\n      <li>Coffee</li>\r\n      <li>Milk</li>\r\n      <li>Coffee</li>\r\n    </ul>\r\n  </div>\r\n  \r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"small-12 columns\">\r\n    <div class=\"panel\">\r\n      DRILLS\r\n    </div>\r\n  </div>\r\n  \r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"small-12 columns\">\r\n    <div class=\"panel\">\r\n      RANDORI\r\n    </div>\r\n  </div>\r\n  \r\n</div>";
  return buffer;
  });
templates['entry/location/edit/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\r\n<h4>location</h2>\r\n<input type=\"text\" name=\"name\" value=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n<br />\r\n<input type=\"text\" name=\"url\" value=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />";
  return buffer;
  });
templates['entry/location/select/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n  <option value=\"";
  if (helper = helpers.resource_uri) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.resource_uri); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</option>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "selected";
  }

  buffer += "\r\n<select name=\"location\">\r\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.collection), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</select>";
  return buffer;
  });
templates['entry/location/view/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  return escapeExpression(stack1);
  });
templates['entry/module/drill/edit/list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "\r\n<button id=\"add\">add</button>\r\n\r\n";
  return buffer;
  });
templates['entry/module/drill/edit/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\r\n<h4><input type=\"text\" name=\"name\" value=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" /></h4>\r\n<br />\r\n<input type=\"text\" name=\"rating\" value=\"";
  if (helper = helpers.rating) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.rating); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n<br />\r\n<textarea name=\"details\"> ";
  if (helper = helpers.details) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.details); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>";
  return buffer;
  });
templates['entry/type/edit/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h4>activity</h2>\r\n<input type=\"text\" name=\"name\" value=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n<br />\r\n<input type=\"text\" name=\"type\" value=\"";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />";
  return buffer;
  });
templates['entry/type/select/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n  <option value=\"";
  if (helper = helpers.resource_uri) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.resource_uri); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " | ";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</option>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "selected";
  }

  buffer += "\r\n<select name=\"type\">\r\n<!-- <option value='' disabled style='display:none;'>Please Choose</option> -->\r\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.collection), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</select>";
  return buffer;
  });
templates['home'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });
})();