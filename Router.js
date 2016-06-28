
let DirectionModel =require('./model/directionmodel');
let DirectionView = require('./view/directionview');
let PlayerView = require('./view/playerview');

module.exports = Backbone.Router.extend({
  initialize: function(){
    let vdirection = new DirectionModel();

    this.player = new PlayerView({
      model: vdirection,
      el: document.getElementById('player-view'),
    });

    this.direction = new DirectionView({
      model: vdirection,
      el: document.getElementById('direction-view')
    })
  },
  routes: {
    'MainGame' :'mainGame',
    'restart' : 'restart',
    '' : 'restart',
  },
mainGame: function(){
  console.log('hello')
  this.player.el.classList.add('hidden');
  this.direction.el.classList.remove('hidden')
},
restart: function(){
  console.log('hello')
  this.direction.el.classList.add('hidden')
  this.player.el.classList.remove('hidden')
}

})
