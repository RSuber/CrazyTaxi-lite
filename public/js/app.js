(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var MyRouter = require('./router');

window.addEventListener('load', function () {
  console.log('I am functional');
  var GameRouter = new MyRouter();
  Backbone.history.start();
});
},{"./router":7}],2:[function(require,module,exports){
module.exports = Backbone.Model.extend({
url:'http://grid.queencityiron.com/api/players',
defaults:{
  energyPerMove: 0,
  name:'',
  startingEnergy: 0,
},
})

},{}],3:[function(require,module,exports){
let PlayerCollection = require('./PlayerType');
module.exports = Backbone.Collection.extend({
  url:'http://grid.queencityiron.com/api/players',
  model:PlayerCollection,
})

},{"./PlayerType":2}],4:[function(require,module,exports){
let UserModel = require('./user');
module.exports = Backbone.Collection.extend({
  url:'http://grid.queencityiron.com/api/highscore',
  model:UserModel,
})

},{"./user":6}],5:[function(require,module,exports){
/// Gabe helped me get the data posting and getting
let UserModel = require('./user');
let UserCollection = require('./UserCollection');
let PlayerTypeCollection = require('./PlayerTypeCollection');
let PlayerType = require('./PlayerType')
module.exports = Backbone.Model.extend({
  initialize: function (){
    let self = this;
    this.UserModel = new UserModel()
    self.PlayerCollection= new UserCollection()
    self.PlayerTypeCollection = new PlayerTypeCollection()
    self.PlayerTypeCollection.fetch({
      success:function() {
          self.PlayerTypeCollection.trigger('start')
      }
    })
    self.PlayerCollection.fetch({
      success:function() {
        self.PlayerCollection.trigger('loaded')
      }
    });
  },
url:"http://grid.queencityiron.com/api/highscore",
 defaults:{
   xvalue: 4,
   yvalue: 4,
   name: '',
   playerType:'',
   energyPerMovePerMove: 100,
   startingenergyPerMove: 0,
   startingEnergy:30,
   username:'',
   score:10,
 },

 //start
 Start: function(input) {
   this.set('name',input);
   if (this.get('playerType') === ('big')){
     this.set('energyPerMove',150);
   }
  else if(this.get('playerType')===('small')){
  }
  console.log(this.get('energyPerMove'));
 },
 sendScore: function() {
   this.UserModel.set('name', this.get('name'))
   this.UserModel.set('score', this.get('score'))
   this.UserModel.set('playerType', this.get('playerType'))
   console.log(this.UserModel);
   this.UserModel.save()
 },
 NewGame: function() {
   this.trigger('Restart',this);
  this.clear({
     silent: true
   },this);
   this.set(this.defaults);
 },

 up: function() {
  if (this.get('yvalue') < 9 && this.get('yvalue') >-1 && this.get('playerType')==='big') {
  this.set('yvalue', this.get('yvalue') + 1);
  this.set('energyPerMove', this.get('energyPerMove')- 5);
  this.consumeenergyPerMove();
  console.log(this.get('energyPerMove'))
  }
  else if (this.get('yvalue') < 9 && this.get('yvalue') >-1 && this.get('playerType') === 'small'){
  this.set('yvalue', this.get('yvalue') + 2);
  this.set('energyPerMove', this.get('energyPerMove') - 10);
  this.consumeenergyPerMove();
  console.log(this.get('energyPerMove'))
}
},


down: function() {
  if (this.get('yvalue') > - 9 && this.get('yvalue') >0 && this.get('playerType')==='big') {
  this.set('yvalue', this.get('yvalue') - 1);
  this.set('energyPerMove', this.get('energyPerMove') - 5);
  this.consumeenergyPerMove();
  console.log(this.get('energyPerMove'))
  }
  else if (this.get('yvalue') > - 9 && this.get('yvalue') >-1 && this.get('playerType') === 'small'){
  this.set('yvalue', this.get('yvalue') - 2);
  this.set('energyPerMove', this.get('energyPerMove') - 10);
  this.consumeenergyPerMove();
  console.log(this.get('energyPerMove'))
  }
},


left: function() {
  if (this.get('xvalue') > - 9 && this.get('xvalue') >0 && this.get('playerType')==='big') {
  this.set('xvalue', this.get('xvalue') - 1);
  this.set('energyPerMove', this.get('energyPerMove') - 5);
  this.consumeenergyPerMove();
  console.log(this.get('energyPerMove'))
  }
  else if (this.get('xvalue') > - 9 && this.get('xvalue') >-1&& this.get('playerType') === 'small'){
  this.set('xvalue', this.get('xvalue') - 2);
  this.set('energyPerMove', this.get('energyPerMove') - 10);
  this.consumeenergyPerMove();
  console.log(this.get('energyPerMove'))
  }
},


right: function() {
  if (this.get('xvalue') < 9 && this.get('xvalue') >-1 && this.get('playerType')==='big') {
  this.set('xvalue', this.get('xvalue') + 1);
  this.set('energyPerMove', this.get('energyPerMove') - 5);
  this.consumeenergyPerMove();
  }
  else if (this.get('xvalue') < 9 && this.get('xvalue') >-1 && this.get('playerType') === 'small'){
  this.set('xvalue', this.get('xvalue') + 2);
  this.set('energyPerMove', this.get('energyPerMove') - 10);
  this.consumeenergyPerMove();
  console.log(this.get('energyPerMove'))
  }
},
consumeenergyPerMove: function() {
  if(this.get('energyPerMove') <= 0){
  console.log('you Dead')
  this.trigger('death');
}
},
});

},{"./PlayerType":2,"./PlayerTypeCollection":3,"./UserCollection":4,"./user":6}],6:[function(require,module,exports){
module.exports = Backbone.Model.extend({

url:'http://grid.queencityiron.com/api/highscore',
defaults:{
  name: '',
  score:0,
  playerType: '',
},
})

},{}],7:[function(require,module,exports){
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

},{"./model/PlayerTypeCollection":3,"./model/UserCollection":4,"./model/directionmodel":5,"./view/directionview":8,"./view/killview":9,"./view/playerview":10}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
module.exports = Backbone.View.extend({

     initialize: function () {
       this.model.PlayerCollection.on('loaded', this.render, this);
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
     this.model.PlayerCollection.forEach(function(model) {
       let scoreList = document.createElement('li')
         scoreList.textContent = `${model.get('playerType')} ${model.get('name')} ${model.get('score')} `;
             renderScores.appendChild(scoreList);
     })
   }
});

},{}],10:[function(require,module,exports){
module.exports = Backbone.View.extend({

  initialize: function () {
    this.model.on('change', this.render, this);
    this.model.PlayerTypeCollection.on('start',this.render,this)
  },

  events: {
    //event name selector : function to call
    'click #start' : 'clickStart',
    'click #input' : 'clickInput',
  },

  clickStart: function(){
    let input = document.getElementById('input');
    this.model.Start(input.value);
    console.log(this.model.get('name'));
  },
  clickInput: function(){
    let input = document.getElementById('input')
    input.addEventListener('click',function(){
      input.value = ""
    })
  },

  render: function() {
    console.log('bootymeat')
      let name = this.model.get("name");
      let view = document.getElementById('ul');
      view.innerHTML = name
      this.model.PlayerTypeCollection.forEach(function(model){
        let Buttons = document.getElementById('buttons');
        let ButtonMaker= document.createElement('button');
        $(ButtonMaker).html(model.get('name'));
        Buttons.appendChild(ButtonMaker);
      })
  },

});

},{}]},{},[1])