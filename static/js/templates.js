(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['models/art/edit/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\r\n<h4>activity</h2>\r\n<input type=\"text\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":name\" value=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n<br />\r\n<input type=\"text\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":type\" value=\"";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />";
  return buffer;
  });
templates['models/entry/judo/edit/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "\r\n\r\n<div class=\"row\">\r\n\r\n  <div class=\"columns entry-form-meta\">\r\n		<div id=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-save\" class=\"entry-save disabled\">\r\n			<i class=\"saving fa fa-spinner fa-spin\"></i>\r\n			<i class=\"enabled fa fa-floppy-o\"></i>\r\n			<i class=\"disabled fa fa-check\"></i>\r\n		</div>\r\n		<div class=\"entry-info\">\r\n			<div id=\"art\"></div>\r\n			<div id=\"type\"></div>\r\n			<div>\r\n				<div id=\"at\"><h3>@</h3></div>\r\n				<div id=\"location\"></div>\r\n			</div>\r\n		</div>\r\n  </div>\r\n  \r\n  <div class=\"small-6 columns\">\r\n    <h4>from:</h4>\r\n		<div id=\"start\"></div>\r\n  </div>\r\n  \r\n  <div class=\"small-6 columns\">\r\n    <h4>until:</h4>\r\n		<div id=\"end\"></div>\r\n  </div>\r\n	\r\n  <div class=\"columns text-center\">\r\n    <div id=\"date\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":date\"></div>\r\n  </div>\r\n  \r\n  <div class=\"columns\">\r\n    <h3>pre-training notes:</h3>\r\n  </div>\r\n  <div class=\"columns\">\r\n		<div title=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":pre_status\" class=\"content-editable\" contentEditable=\"true\" data-placeholder=\"How did you feel before?\">";
  if (helper = helpers.pre_status) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.pre_status); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n  </div>\r\n  \r\n  <div class=\"columns\">\r\n    <h3>post-training notes:</h3>\r\n  </div>\r\n  <div class=\"columns\">\r\n		<div title=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":post_status\" class=\"content-editable\" contentEditable=\"true\" data-placeholder=\"How did you feel after?\">";
  if (helper = helpers.post_status) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.post_status); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n  </div>\r\n  \r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"columns\">\r\n    ";
  stack1 = self.invokePartial(partials['widgets/rating'], 'widgets/rating', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"columns\">\r\n    <h2>DRILLS</h2>\r\n    <div id=\"drills\"></div>\r\n  </div>\r\n  \r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div class=\"columns\">\r\n    <h2>SPARRING</h2>\r\n    <div id=\"sparring\"></div>\r\n  </div>\r\n  \r\n</div>";
  return buffer;
  });
templates['models/entry/judo/view/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
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
templates['models/entry/module/drill/edit/list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  buffer += "\r\n<div class=\"model-list\">\r\n	<div class=\"modal\"></div>\r\n	<div class=\"click-away-overlay\"></div>\r\n	<button class=\"add-model\">add</button>\r\n</div>";
  return buffer;
  });
templates['models/entry/module/drill/edit/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;


  buffer += "\r\n<div id=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-save\" class=\"modal-save disabled\">\r\n	<i class=\"saving fa fa-spinner fa-spin\"></i>\r\n	<i class=\"enabled fa fa-floppy-o\"></i>\r\n	<i class=\"disabled fa fa-check\"></i>\r\n</div>\r\n<h4><input type=\"text\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":name\" class=\"focus\" value=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" /></h4>\r\n<br />\r\n";
  stack1 = self.invokePartial(partials['widgets/rating'], 'widgets/rating', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n<br />\r\n<textarea name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":details\"> ";
  if (helper = helpers.details) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.details); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>";
  return buffer;
  });
templates['models/entry/singleSelect'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n      <h3 class=\"link selected-key\"><i class=\"fa fa-pencil\"></i > ";
  if (helper = helpers.selectedKey) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.selectedKey); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h3>\r\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n      <h3 class=\"link placeholder\"><i class=\"fa fa-pencil\"></i > ";
  if (helper = helpers.placeholder) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.placeholder); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h3>\r\n    ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n          <li id=\"";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\r\n              data-value=\"";
  if (helper = helpers.resource_uri) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.resource_uri); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"\r\n              class=\"select-option ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"\r\n          >\r\n            ";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n          </li>\r\n        ";
  return buffer;
  }
function program6(depth0,data) {
  
  
  return "option-selected";
  }

  buffer += "\r\n\r\n<div id=\"";
  if (helper = helpers.field) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.field); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-select\" class=\"single-select\">\r\n  <div class=\"click-away-overlay\"></div>\r\n  <input class=\"select-input\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":";
  if (helper = helpers.field) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.field); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" type=\"text\"/>\r\n  <div class=\"select-display\">\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selectedKey), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    <div class=\"select-drop\">\r\n      <div class=\"select-search\">\r\n        <input type=\"text\" autocomplete=\"off\" placeholder=\"";
  if (helper = helpers.hint) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.hint); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"/>\r\n        <i class=\"fa fa-search fa-2x\"></i>\r\n      </div>\r\n      <ul class=\"select-options\">\r\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.options), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      </ul>\r\n      <h3 class=\"link select-create\">\r\n      </h3>\r\n    </div>\r\n  </div>\r\n</div>";
  return buffer;
  });
templates['models/location/edit/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\r\n<h4>location</h2>\r\n<input type=\"text\" name=\"name\" placeholder=\"Name\" value=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"  />\r\n<br />\r\n<input type=\"text\" name=\"url\" placeholder=\"Website\" value=\"";
  if (helper = helpers.url) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />";
  return buffer;
  });
templates['models/location/view/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  return escapeExpression(stack1);
  });
templates['models/type/edit/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\r\n<h4>activity</h2>\r\n<input type=\"text\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":name\" value=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />\r\n<br />\r\n<input type=\"text\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":type\" value=\"";
  if (helper = helpers.type) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.type); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" />";
  return buffer;
  });
templates['pages/home'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\r\n\r\n<div class=\"row\">\r\n  <div id=\"widgets\" class=\"columns\">\r\n    <a href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.links)),stack1 == null || stack1 === false ? stack1 : stack1.newEntry)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"button radius success tiny\">\r\n      <i class=\"fa fa-file\"></i> New Entry\r\n    </a>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n  <div id=\"widgets\" class=\"columns\">\r\n  </div>\r\n</div>";
  return buffer;
  });
templates['widgets/manage/art'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"manage-widget\">\r\n  <div class=\"manage-header\">\r\n    <a href=\"#\" class=\"left\"><h4>Manage Arts</h4></a>\r\n    <div id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-click\" class=\"right link\">\r\n      <h4>\r\n        <i id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-i-down\" class=\"fa fa-chevron-down show\"></i>\r\n        <i id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-i-up\" class=\"fa fa-chevron-up hide\"></i>\r\n      </h4>\r\n    </div>\r\n  </div>\r\n  <div id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-drop\" class=\"manage-drop hide\">\r\n    <ul>\r\n      <li><a href=\"#\">This is a link</a></li>\r\n      <li><a href=\"#\">This is another</a></li>\r\n      <li><a href=\"#\">Yet another</a></li>\r\n    </ul>\r\n  </div>\r\n</div>";
  return buffer;
  });
templates['widgets/manage/goal'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"manage-widget\">\r\n  <div class=\"manage-header\">\r\n    <a href=\"#\" class=\"left\"><h4>Manage Goals</h4></a>\r\n    <div id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-click\" class=\"right link\">\r\n      <h4>\r\n        <i id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-i-down\" class=\"fa fa-chevron-down show\"></i>\r\n        <i id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-i-up\" class=\"fa fa-chevron-up hide\"></i>\r\n      </h4>\r\n    </div>\r\n  </div>\r\n  <div id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-drop\" class=\"manage-drop hide\">\r\n    <ul>\r\n      <li><a href=\"#\">This is a link</a></li>\r\n      <li><a href=\"#\">This is another</a></li>\r\n      <li><a href=\"#\">Yet another</a></li>\r\n    </ul>\r\n  </div>\r\n</div>";
  return buffer;
  });
templates['widgets/manage/location'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"manage-widget\">\r\n  <div class=\"manage-header\">\r\n    <a href=\"#\" class=\"left\"><h4>Manage Locations</h4></a>\r\n    <div id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-click\" class=\"right link\">\r\n      <h4>\r\n        <i id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-i-down\" class=\"fa fa-chevron-down show\"></i>\r\n        <i id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-i-up\" class=\"fa fa-chevron-up hide\"></i>\r\n      </h4>\r\n    </div>\r\n  </div>\r\n  <div id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-drop\" class=\"manage-drop hide\">\r\n    <ul>\r\n      <li><a href=\"#\">This is a link</a></li>\r\n      <li><a href=\"#\">This is another</a></li>\r\n      <li><a href=\"#\">Yet another</a></li>\r\n    </ul>\r\n    <button id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-add\">Add</button>\r\n  </div>\r\n</div>";
  return buffer;
  });
templates['widgets/manage/question'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"manage-widget\">\r\n  <div class=\"manage-header\">\r\n    <a href=\"#\" class=\"left\"><h4>Manage Questions</h4></a>\r\n    <div id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-click\" class=\"right link\">\r\n      <h4>\r\n        <i id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-i-down\" class=\"fa fa-chevron-down show\"></i>\r\n        <i id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-i-up\" class=\"fa fa-chevron-up hide\"></i>\r\n      </h4>\r\n    </div>\r\n  </div>\r\n  <div id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-drop\" class=\"manage-drop hide\">\r\n    <ul>\r\n      <li><a href=\"#\">This is a link</a></li>\r\n      <li><a href=\"#\">This is another</a></li>\r\n      <li><a href=\"#\">Yet another</a></li>\r\n    </ul>\r\n  </div>\r\n</div>";
  return buffer;
  });
templates['widgets/manage/technique'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"manage-widget\">\r\n  <div class=\"manage-header\">\r\n    <a href=\"#\" class=\"left\"><h4>Manage Techniques</h4></a>\r\n    <div id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-click\" class=\"right link\">\r\n      <h4>\r\n        <i id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-i-down\" class=\"fa fa-chevron-down show\"></i>\r\n        <i id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-i-up\" class=\"fa fa-chevron-up hide\"></i>\r\n      </h4>\r\n    </div>\r\n  </div>\r\n  <div id=\"";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-manage-drop\" class=\"manage-drop hide\">\r\n    <ul>\r\n      <li><a href=\"#\">This is a link</a></li>\r\n      <li><a href=\"#\">This is another</a></li>\r\n      <li><a href=\"#\">Yet another</a></li>\r\n    </ul>\r\n  </div>\r\n</div>";
  return buffer;
  });
templates['widgets/rating'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"rating\">\r\n  <label for=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":rating-1\">\r\n    <input id=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":rating-1\" type=\"radio\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":rating\" value=\"1\" />\r\n    <img src=\"http://digitod.com/wp-content/uploads/2013/04/smiley-face.png\">\r\n  </label>\r\n  <label for=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":rating-2\">\r\n    <input id=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":rating-2\" type=\"radio\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":rating\" value=\"2\" />\r\n    <img src=\"http://digitod.com/wp-content/uploads/2013/04/smiley-face.png\">\r\n  </label>\r\n  <label for=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":rating-3\">\r\n    <input id=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":rating-3\" type=\"radio\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":rating\" value=\"3\" />\r\n    <img src=\"http://digitod.com/wp-content/uploads/2013/04/smiley-face.png\">\r\n  </label>\r\n  <label for=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":rating-4\">\r\n    <input id=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":rating-4\" type=\"radio\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":rating\" value=\"4\" />\r\n    <img src=\"http://digitod.com/wp-content/uploads/2013/04/smiley-face.png\">\r\n  </label>\r\n  <label for=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":rating-5\">\r\n    <input id=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":rating-5\" type=\"radio\" name=\"";
  if (helper = helpers.cid) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cid); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":rating\" value=\"5\" />\r\n    <img src=\"http://digitod.com/wp-content/uploads/2013/04/smiley-face.png\">\r\n  </label>\r\n</div>";
  return buffer;
  });
templates['widgets/time'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n		<select id=\"";
  if (helper = helpers.identifier) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.identifier); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-hour\" name=\"";
  if (helper = helpers.identifier) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.identifier); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":hour\">\r\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.hours), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		</select>\r\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n				<option value=\"";
  if (helper = helpers.value) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.value); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  if (helper = helpers.display) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.display); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</option>\r\n			";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "selected";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n		<select id=\"";
  if (helper = helpers.identifier) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.identifier); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-minute\" name=\"";
  if (helper = helpers.identifier) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.identifier); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":minute\">\r\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.minutes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		</select>\r\n	";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n		<select id=\"";
  if (helper = helpers.identifier) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.identifier); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "-period\" name=\"";
  if (helper = helpers.identifier) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.identifier); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ":period\">\r\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.periods), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		</select>\r\n	";
  return buffer;
  }

  buffer += "<div class=\"time-select\">\r\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hours), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.minutes), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.periods), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>";
  return buffer;
  });
})();