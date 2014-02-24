(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['entry/judo/single'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n      <div class=\"medium-10 large-8 columns\">\r\n        <div class=\"module-section drill\">\r\n          <div class=\"section-header\">\r\n            <h3 class=\"list-title\">Drills</h3>\r\n          </div>\r\n          <ul class=\"model-list row\">\r\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.drills), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n              <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.name), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.details), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "model-entry columns\">\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.details), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.name), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.details), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n              </li>\r\n            ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "has-title ";
  }

function program5(depth0,data) {
  
  
  return "has-body ";
  }

function program7(depth0,data) {
  
  
  return "\r\n                  <div class=\"model-body-cap\"></div>\r\n                ";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n                  <div class=\"model-header\">\r\n                    <div class=\"model-title\">\r\n                      ";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n                    </div>\r\n                  </div>\r\n                ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n                  <div class=\"model-body\">\r\n                    ";
  if (helper = helpers.compiled_details) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.compiled_details); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                  </div>\r\n                ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n      <div class=\"medium-10 large-8 columns\">\r\n        <div class=\"module-section sparring\">\r\n          <div class=\"section-header\">\r\n            <h3 class=\"list-title\">Sparring</h3>\r\n          </div>\r\n          <ul class=\"model-list row\">\r\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sparring), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    ";
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n              <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.partner), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.details), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "model-entry columns\">\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.details), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.partner), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.details), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n              </li>\r\n            ";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n                  <div class=\"model-header\">\r\n                    <div class=\"model-title\">\r\n                      ";
  if (helper = helpers.partner) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.partner); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " (";
  if (helper = helpers.minutes) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.minutes); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " minutes)\r\n                    </div>\r\n                  </div>\r\n                ";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n      <div class=\"medium-10 large-8 columns end\">\r\n        <div class=\"module-section note\">\r\n          <div class=\"section-header\">\r\n            <h3 class=\"list-title\">Notes</h3>\r\n          </div>\r\n          <ul class=\"model-list row\">\r\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.notes), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    ";
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n              <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.title), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.details), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "model-entry columns\">\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.details), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.title), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.details), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n              </li>\r\n            ";
  return buffer;
  }
function program19(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n                  <div class=\"model-header\">\r\n                    <div class=\"model-title\">\r\n                      ";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n                    </div>\r\n                  </div>\r\n                ";
  return buffer;
  }

  buffer += "\r\n<div class=\"entry public\">\r\n\r\n  <div class=\"row\">\r\n    <div class=\"columns entry-header\">\r\n      <div class=\"entry-header-left\">\r\n        <div class=\"date\">\r\n          <h6 class=\"month\">February</h6>\r\n          <span class=\"day\">14</span>\r\n          <span class=\"year\">2014</span>\r\n        </div>\r\n      </div>\r\n      \r\n      <div id=\"entry-rating\">\r\n        ";
  stack1 = self.invokePartial(partials['partials/rating'], 'partials/rating', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      </div>\r\n      \r\n      <div class=\"entry-header-row\">\r\n        <h1 id=\"art\" class=\"headertext\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.art)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\r\n        <h1 id=\"type\" class=\"headertext\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.type)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\r\n      </div>\r\n      \r\n      <div class=\"entry-header-section\">\r\n      \r\n        <div class=\"entry-header-row\">\r\n          <h5 id=\"location\" class=\"headertext\">\r\n            <a href=\"";
  if (helper = helpers.profileLink) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.profileLink); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a> @ "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.location)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\r\n        </div>\r\n        \r\n        <div class=\"entry-header-row\">\r\n          <h5 id=\"date\" class=\"headertext\">\r\n            ";
  if (helper = helpers.displayDate) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.displayDate); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " (";
  if (helper = helpers.displayDuration) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.displayDuration); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + ")\r\n          </h5>\r\n        </div>\r\n        \r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <div class=\"row\">\r\n\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.drills), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sparring), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.notes), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    \r\n  </div>\r\n</div>";
  return buffer;
  });
templates['pages/home'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\r\n\r\n<div class=\"row\">\r\n  <div class=\"columns\">\r\n    <a href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.links)),stack1 == null || stack1 === false ? stack1 : stack1.newEntry)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"button radius success tiny\">\r\n      <i class=\"fa fa-file\"></i> New Entry\r\n    </a>\r\n    <a href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.links)),stack1 == null || stack1 === false ? stack1 : stack1.profile)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"button radius success tiny\">\r\n      <i class=\"fa fa-user\"></i> Profile\r\n    </a>\r\n  </div>\r\n</div>";
  return buffer;
  });
templates['pages/profile'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n            <li>\r\n              <div class=\"entry-right\">\r\n                <a class=\"button secondary tiny\" href=\"";
  if (helper = helpers.link) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.link); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">view</a>\r\n              </div>\r\n              <h2 class=\"title entry-left\">";
  stack1 = self.invokePartial(partials['partials/rating'], 'partials/rating', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.art)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.type)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h2>\r\n              <div class=\"date entry-left\">";
  if (helper = helpers.date) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.date); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\r\n            </li>\r\n          ";
  return buffer;
  }

  buffer += "\r\n<div class=\"row profile public\">\r\n  <div class=\"medium-11 large-8 large-centered columns\">\r\n    <div class=\"row\">\r\n      <div class=\"medium-3 columns profile-header\">\r\n      \r\n        <div class=\"row\">\r\n        \r\n          <div class=\"small-6 medium-12 columns\">\r\n            <div class=\"profile-badge\">\r\n              <div class=\"square-dummy\"></div>\r\n              <div class=\"profile-badge-padding\">\r\n                <div class=\"image\"><img src=\"/static/img/profile.png\"></div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          \r\n          <div class=\"small-6 medium-12 columns\">\r\n            <div class=\"profile-meta\">\r\n              <h5 class=\"username\">\r\n                ";
  if (helper = helpers.username) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.username); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n              </h5>\r\n              <a href=\"data:application/octet-stream,";
  if (helper = helpers.exportContent) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.exportContent); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" download=\"";
  if (helper = helpers.exportName) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.exportName); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">Export JSON</a>\r\n            </div>\r\n          </div>\r\n          \r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"medium-9 columns profile-feed\">\r\n        <ul class=\"entry-list\">\r\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.entries), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </ul>\r\n      </div>\r\n      \r\n    </div>\r\n  </div>\r\n</div>";
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