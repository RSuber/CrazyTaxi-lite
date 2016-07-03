(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var MyRouter = require('./router');

window.addEventListener('load', function () {
  console.log('I am functional');
  var GameRouter = new MyRouter();
  Backbone.history.start();
});
},{"./router":5}],2:[function(require,module,exports){
let UserModel = require('./user');
module.exports = Backbone.Collection.extend({
  url:'http://grid.queencityiron.com/api/highscore',
  model:UserModel,
})

},{"./user":4}],3:[function(require,module,exports){
/// Gabe helped me get the data posting and getting
let UserModel = require('./user');
let UserCollection = require('./UserCollection');
module.exports = Backbone.Model.extend({
  initialize: function (){
    let self = this;
    self.PlayerTypeCollection= new UserCollection();
    self.PlayerTypeCollection.fetch({
      success:function() {
        console.log(self.PlayerTypeCollection);
        self.PlayerTypeCollection.trigger('loaded')
      }
    });

  },
url:"http://grid.queencityiron.com/api/highscore",
 defaults:{
   xvalue: 0,
   yvalue: 0,
   username: '',
   energy: 100,
   score: Math.floor(Math.random() * 100),
 },

 //start
 Start: function(input) {
   this.set('username',input);
   if (this.get('size') === ('big')){
     this.set('energy',150);
   }
  else if(this.get('size')===('small')){
  }
  console.log(this.get('energy'));
 },
 sendScore: function() {
   this.get('username')
   this.get('name')
   this.get('score')
   this.save();
   console.log('saving')
 },
 NewGame: function() {
   this.trigger('Restart',this);
  this.clear({
     silent: true
   },this);
   this.set(this.defaults);
   console.log(this.defaults)
 },
 up: function() {
  if (this.get('yvalue') < 10 && this.get('size')==='big') {
  this.set('yvalue', this.get('yvalue') + 1);
  this.set('energy', this.get('energy')- 5);
  this.consumeEnergy();
  console.log(this.get('energy'))
  }
  else if (this.get('yvalue') < 10 && this.get('size') === 'small'){
  this.set('yvalue', this.get('yvalue') + 2);
  this.set('energy', this.get('energy') - 10);
  this.consumeEnergy();
  console.log(this.get('energy'))
}
},


down: function() {
  if (this.get('yvalue') > - 10 && this.get('size')==='big') {
  this.set('yvalue', this.get('yvalue') - 1);
  this.set('energy', this.get('energy') - 5);
  this.consumeEnergy();
  console.log(this.get('energy'))
  }
  else if (this.get('yvalue') > - 10 && this.get('size') === 'small'){
  this.set('yvalue', this.get('yvalue') - 2);
  this.set('energy', this.get('energy') - 10);
  this.consumeEnergy();
  console.log(this.get('energy'))
  }
},


left: function() {
  if (this.get('xvalue') > - 10 && this.get('size')==='big') {
  this.set('xvalue', this.get('xvalue') - 1);
  this.set('energy', this.get('energy') - 5);
  this.consumeEnergy();
  console.log(this.get('energy'))
  }
  else if (this.get('xvalue') > - 10 && this.get('size') === 'small'){
  this.set('xvalue', this.get('xvalue') - 2);
  this.set('energy', this.get('energy') - 10);
  this.consumeEnergy();
  console.log(this.get('energy'))
  }
},


right: function() {
  if (this.get('xvalue') < 10 && this.get('size')==='big') {
  this.set('xvalue', this.get('xvalue') + 1);
  this.set('energy', this.get('energy') - 5);
  this.consumeEnergy();
  }
  else if (this.get('xvalue') < 10 && this.get('size') === 'small'){
  this.set('xvalue', this.get('xvalue') + 2);
  this.set('energy', this.get('energy') - 10);
  this.consumeEnergy();
  console.log(this.get('energy'))
  }
},
consumeEnergy: function() {
  if(this.get('energy') <= 0){
  console.log('you Dead')
  this.trigger('death');
}
},
});

},{"./UserCollection":2,"./user":4}],4:[function(require,module,exports){
module.exports = Backbone.Model.extend({

url:'http://grid.queencityiron.com/api/highscore',
defaults:{
  username: '',
  energy: 0,
  score: 0
},
})

},{}],5:[function(require,module,exports){
let DirectionModel =require('./model/directionmodel');
let DirectionView = require('./view/directionview');
let UserCollection = require('./model/UserCollection')
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
      console.log(model);
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

},{"./model/UserCollection":2,"./model/directionmodel":3,"./view/directionview":6,"./view/killview":7,"./view/playerview":8}],6:[function(require,module,exports){
module.exports = Backbone.View.extend({

    initialize: function () {
      this.model.on('change', this.render, this);
    },

  events: {
    //event name selector : function to call
    'click #up' : 'clickUp',
    'click #down' : 'clickDown',
    'click #left' : 'clickLeft',
    'click #right' : 'clickRight',
  },

  clickUp: function () {
    this.model.up();
    console.log('you clicked up');
  },

  clickDown: function () {
    this.model.down();
  },

  clickLeft: function () {
    this.model.left();
  },

  clickRight: function () {
    this.model.right();
  },
  // Riggan and Geoff helped me with this one
createGrid : function() {
  let grid = this.el.querySelector('#Grid');
  grid.innerHTML = '';
  console.log('making grid');
  let size = 10;
  for (y=0; y<size; y++){
    var row = document.createElement("div");
    row.classList.add('row');
for(x=0; x<size; x++){
  var cell = document.createElement('div');
  cell.classList.add('cell')
  row.appendChild(cell)
  if(this.model.get("xvalue") === y && this.model.get("yvalue")===x){
    cell.setAttribute('id','player');
  }
}
grid.appendChild(row)
}
},
  render: function () {
    let buttonRight = this.el.querySelector('#xAxis');
    buttonRight.textContent = this.model.get('xvalue');
    let buttonUp = this.el.querySelector('#yAxis');
    buttonUp.textContent = this.model.get('yvalue');
    this.createGrid();
}
});

},{}],7:[function(require,module,exports){
module.exports = Backbone.View.extend({

     initialize: function () {
       this.model.PlayerTypeCollection.on('loaded', this.render, this);
   },
  events: {
    'click #restart': 'tryAgain',
  },
  tryAgain: function(){
    this.model.sendScore();
    this.model.NewGame();
    input = document.getElementById('input');
    console.log(input)
    input.value = ""
  },
   render: function(){
    let finalScore = this.el.querySelector('#scoreBoard')
     finalScore.textContent = `You lost douche!
     Final score: ${this.model.get('score')}`;
     let renderScores = this.el.querySelector('#highScoreList')
     let self = this;
     this.model.PlayerTypeCollection.forEach(function(model) {
       let scoreList = document.createElement('li')
       console.log(model);
         scoreList.textContent = `${model.get('playerType')} ${model.get('name')} ${model.get('score')} `;
             renderScores.appendChild(scoreList);
     })
   }
});

},{}],8:[function(require,module,exports){
module.exports = Backbone.View.extend({

  initialize: function () {
    this.model.on('change', this.render, this);
  },

  events: {
    //event name selector : function to call
    'click #start' : 'clickStart',
    'click #input' : 'clickInput',
    'click #big'   : 'ChooseBig',
    'click #small' : 'ChooseSmall'
  },

  ChooseBig: function (){
    let Size = this.model.set('size','big')
    console.log(this.model.get('size'));
  },
  ChooseSmall: function(){
    let Size = this.model.set('size', "small")
      console.log(this.model.get('size'));
  },
  clickStart: function(){
    let input = document.getElementById('input');
    this.model.Start(input.value);
    console.log(this.model.get('username'));
  },
  clickInput: function(){
    let input = document.getElementById('input')
    input.addEventListener('click',function(){
      input.value = ""
    })
  },

  render: function() {
      let name = this.model.get("username");
      let view = document.getElementById('ul');
      view.innerHTML = name
  },

});

},{}]},{},[1])