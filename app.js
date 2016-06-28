var PlayerModel = require('./model/player');
var DirectionModel =require('./model/direction')
var DirectionView = require('./view/direction');
var PlayerView = require('./view/player');

window.addEventListener('load', function(){
 console.log('I am functional');

 let vmodel = new Player();

 let vdirection = new Direction();


 let player = new PlayerView({
   model: vmodel,
   el: document.getElementByID('player-view'),
 });

 let direction = new DirectionView({
   model: vdirection,
   el: document.getElementByID('direction-view')
 })
});
