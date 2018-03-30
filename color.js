module.exports = function ( RED ) {
  "use strict";
  const static_resourses_path = __dirname+"/resources/static/";

  function main ( config ) {
    RED.nodes.createNode( this, config );
    this.color = config.color;
    this.property = config.property;
    this.white = config.white;
    this.val = config.val;
    var node = this;

    this.on("input", function(msg) {
      var color = node.color;
      if(typeof(msg.payload) != "undefined" && msg.payload != ""){color = msg.payload;}
      if(typeof(msg.value) != "undefined" && msg.value != ""){color = msg.value;}
      if(typeof(msg.color) != "undefined" && msg.color != ""){color = msg.color;}
      var property = node.property;
      if(property == "" || typeof property == "undefined"){
        msg.color = node.color
      }
      else{
        msg[property] = node.color;
      }
      if(node.white) {
        if(node.val.length < 4) {
          switch(node.val.length) {
            case 1:
              node.val = "000"+node.val;
              break;
            case 2:
              node.val = "00"+node.val;
              break;
            case 3:
              node.val = "0"+node.val;
            default:
              break;
          }
        }
        msg[property] = msg[property] + node.val;
      }
      node.send(msg);
    });
  }
  RED.nodes.registerType("color", main);

  RED.httpAdmin.get('/color/*', function(req, res){
    var filename = static_resourses_path+req.params[0];
    res.sendfile(filename);
  });
}
