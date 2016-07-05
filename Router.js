let DirectionModel =require('./model/directionmodel');
let DirectionView = require('./view/directionview');
let UserCollection = require('./model/UserCollection')
let PlayerTypeCollection = require("./model/PlayerTypeCollection")
let PlayerView = require('./view/playerview');
let KillView = require('./view/killview')
// let HighScoreCollection = require('./models/highscore.collection')

module.exports = Backbone.Router.extend({
  initialize: function(){
    let vdirection = new DirectionModel();
    vdirection.on('death', function(){
      this.navigate('Killscreen',{trigger:true})
    }, this);
    this.player = new PlayerView({
      model: vdirection,
      el: document.getElementById('player-view'),
    });

    this.direction = new DirectionView({
      model: vdirection,
      el: document.getElementById('direction-view')
    });
    this.kill= new KillView({
      model: vdirection,
      el: document.getElementById('killview')
    });
    vdirection.on('Restart',function(model){
      this.navigate('',{
        trigger:true
      })
    }, this)
  },
  routes: {
    'MainGame' :'mainGame',
    'Restart' : 'restart',
    'Killscreen':'killscreen',
    '' : 'restart',
  },
mainGame: function(){
  console.log('hello')
  this.player.el.classList.add('hidden');
  this.direction.el.classList.remove('hidden')
},
restart: function(){
  this.trigger('Start')
  console.log('hello')
  this.direction.el.classList.add('hidden')
  this.player.el.classList.remove('hidden')
  this.kill.el.classList.add('hidden')
},
killscreen: function(){
  this.direction.el.classList.add('hidden');
  this.kill.el.classList.remove('hidden');
}

})
