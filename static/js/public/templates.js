(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['entry/judo/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n          <li>\r\n            <div>\r\n              ";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n              ";
  if (helper = helpers.details) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.details); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n            </div>\r\n          </li>\r\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n          <li>\r\n            <div>\r\n              ";
  if (helper = helpers.partner) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.partner); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n              ";
  if (helper = helpers.minutes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.minutes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n              ";
  if (helper = helpers.details) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.details); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n            </div>\r\n          </li>\r\n        ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n          <li>\r\n            <div>\r\n              ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n              ";
  if (helper = helpers.details) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.details); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n            </div>\r\n          </li>\r\n        ";
  return buffer;
  }

  buffer += "\r\n\r\n<div class=\"row\">\r\n  <div id=\"entry-rating\">\r\n    ";
  stack1 = self.invokePartial(partials['partials/rating'], 'partials/rating', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n  </div>\r\n</div>\r\n\r\n<div class=\"row\">\r\n\r\n  <div class=\"columns entry-form-meta\">\r\n	\r\n		<div id=\"art\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.art)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n		\r\n		<div id=\"type\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.type)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n		\r\n		<div id=\"location\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.location)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n		\r\n		<div>\r\n			<h3 class=\"\">\r\n				<i class=\"fa fa-calendar\"></i>\r\n				Thursday, 15 Jan 2014\r\n			</h3>\r\n		</div>\r\n		\r\n		<div>\r\n			<h3 class=\"plaintext\">from</h3>\r\n			<h3 class=\"\">\r\n				<i class=\"fa fa-clock-o\"></i>\r\n				2:45PM\r\n			</h3>\r\n		</div>\r\n		\r\n		<div>\r\n			<h3 class=\"plaintext\">until</h3>\r\n			<h3 class=\"\">\r\n				<i class=\"fa fa-clock-o\"></i>\r\n				4:45PM\r\n			</h3>\r\n		</div>\r\n		\r\n  </div>\r\n</div>\r\n\r\n\r\n<div class=\"row\">\r\n\r\n  <div class=\"medium-10 medium-centered large-uncentered large-4 columns\">\r\n    <div id=\"drills\">\r\n      <div class=\"list-controls\">\r\n        <h2 class=\"title\">DRILLS</h2>\r\n      </div>\r\n      <ul class=\"model-list\">\r\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.drills), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      </ul>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"medium-10 medium-centered large-uncentered large-4 columns\">\r\n    <div id=\"sparring\">\r\n      <div class=\"list-controls\">\r\n        <h2 class=\"title\">SPARRING</h2>\r\n      </div>\r\n      <ul class=\"model-list\">\r\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sparring), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      </ul>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"medium-10 medium-centered large-uncentered large-4 columns\">\r\n    <div id=\"notes\">\r\n      <div class=\"list-controls\">\r\n        <h2 class=\"title\">NOTES</h2>\r\n      </div>\r\n      <ul class=\"model-list\">\r\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.notes), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      </ul>\r\n    </div>\r\n  </div>\r\n  \r\n</div>";
  return buffer;
  });
templates['pages/home'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\r\n\r\n<div class=\"row\">\r\n  <div id=\"widgets\" class=\"columns\">\r\n    <a href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.links)),stack1 == null || stack1 === false ? stack1 : stack1.newEntry)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"button radius success tiny\">\r\n      <i class=\"fa fa-file\"></i> New Entry\r\n    </a>\r\n  </div>\r\n</div>";
  return buffer;
  });
templates['partials/rating'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\r\n<div class=\"rating\">\r\n  <img src=\"/static/img/rating-";
  if (helper = helpers.rating) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.rating); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ".png\">\r\n</div>";
  return buffer;
  });
})();