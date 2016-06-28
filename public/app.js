var DirectionModel = require('./model/directionmodel');
var PlayerModel = require('./model/playermodel');
var DirectionView = require('./view/directionview');
var PlayerView = require('./view/playerview');

window.addEventListener('load', function(){

  //Models
  let dmodel = new DirectionModel();
  let pmodel = new PlayerModel();

  //Views
  let player = new PlayerView({
    model: pmodel,
    el: document.getElementById('player-view'),
  });

  let direction = new DirectionView({
    model: dmodel,
    el: document.getElementById('direction-view')
  });
});
