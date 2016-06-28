var PlayerModel = require('./model/playermodel');
var DirectionModel =require('./model/directionmodel')
var DirectionView = require('./view/directionview');
var PlayerView = require('./view/playerview');

window.addEventListener('load', function(){
 console.log('I am functional');

 let vmodel = new PlayerModel();

 let vdirection = new DirectionModel();


 let player = new PlayerView({
   model: vmodel,
   el: document.getElementById('player-view'),
 });

 let direction = new DirectionView({
   model: vdirection,
   el: document.getElementById('direction-view')
 })
});
