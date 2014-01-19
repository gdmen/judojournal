// Instantiate app namespace
window.JJ = {};

JJ.debug.log = function(s) {
  console.log(s);
}
JJ.debug.backboneError = function(response) {
  JJ.debug.log("ERROR");
  JJ.debug.log(response);
}