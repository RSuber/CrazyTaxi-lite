(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var MyRouter = require('./router');

window.addEventListener('load', function () {
  console.log('I am functional');
  var GameRouter = new MyRouter();
  Backbone.history.start();
});
},{"./router":3}],2:[function(require,module,exports){
module.exports = Backbone.Model.extend({
 defaults:{
   xvalue: 0,
   yvalue: 0,
   username: '',
   energy: 100,
 },

 //start
 start: function(input) {
   console.log("hi")
   if (this.get('size') === ('big')){
     this.set('energy',150);
     this.set('username', input);
   }
  else if(this.get('size')===('small')){
    this.set('username',input);
  }
  console.log(this.get('energy'));
 },


 up: function() {
  if (this.get('yvalue') < 10 && this.get('size')==='big') {
  this.set('yvalue', this.get('yvalue') + 1);
  this.set('energy', this.get('energy')- 5);
  console.log(this.get('energy'))
  }
  else if (this.get('yvalue') < 10 && this.get('size') === 'small'){
  this.set('yvalue', this.get('yvalue') + 2);
  this.set('energy', this.get('energy') - 10);
  }
},


down: function() {
  if (this.get('yvalue') > - 10 && this.get('size')==='big') {
  this.set('yvalue', this.get('yvalue') - 1);
  this.set('energy', this.get('energy') - 5);
  }
  else if (this.get('yvalue') > - 10 && this.get('size') === 'small'){
  this.set('yvalue', this.get('yvalue') - 2);
  this.set('energy', this.get('energy') - 10);
  }
},


left: function() {
  if (this.get('xvalue') > - 10 && this.get('size')==='big') {
  this.set('xvalue', this.get('xvalue') - 1);
  this.set('energy', this.get('energy') - 5);
  }
  else if (this.get('xvalue') > - 10 && this.get('size') === 'small'){
  this.set('xvalue', this.get('xvalue') - 2);
  this.set('energy', this.get('energy') - 10);
  }
},


right: function() {
  if (this.get('xvalue') < 10 && this.get('size')==='big') {
  this.set('xvalue', this.get('xvalue') + 1);
  this.set('energy', this.get('energy') - 5);
  }
  else if (this.get('xvalue') < 10 && this.get('size') === 'small'){
  this.set('xvalue', this.get('xvalue') + 2);
  this.set('energy', this.get('energy') - 10);
  }
},


});

},{}],3:[function(require,module,exports){

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

},{"./model/directionmodel":2,"./view/directionview":4,"./view/playerview":5}],4:[function(require,module,exports){


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

  render: function () {
    let buttonRight = this.el.querySelector('#xAxis');
    buttonRight.textContent = this.model.get('xvalue');

    let buttonLeft = this.el.querySelector('#xAxis');
    buttonLeft.textContent = this.model.get('xvalue');

    let buttonUp = this.el.querySelector('#yAxis');
    buttonUp.textContent = this.model.get('yvalue');
  }


});

},{}],5:[function(require,module,exports){
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
    this.model.start(input.value);
    console.log(this.model.get('size'));
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