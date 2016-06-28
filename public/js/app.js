(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var PlayerModel = require('./model/playermodel');
var DirectionModel = require('./model/directionmodel');
var DirectionView = require('./view/directionview');
var PlayerView = require('./view/playerview');

window.addEventListener('load', function () {
  console.log('I am functional');

  var vmodel = new PlayerModel();

  var vdirection = new DirectionModel();

  var player = new PlayerView({
    model: vmodel,
    el: document.getElementById('player-view')
  });

  var direction = new DirectionView({
    model: vdirection,
    el: document.getElementById('direction-view')
  });
});
},{"./model/directionmodel":2,"./model/playermodel":3,"./view/directionview":4,"./view/playerview":5}],2:[function(require,module,exports){
module.exports = Backbone.Model.extend({
  defaults:{
    xvalue: 0,
    yvalue: 0,
  },

  up: function() {
    if (this.get('yvalue') < 10) {
    this.set('yvalue', this.get('yvalue') + 1);
    }
  },

  down: function() {
    if (this.get('yvalue') > -10) {
    this.set('yvalue', this.get('yvalue') - 1);
    }
  },

  left: function() {
    if (this.get('xvalue') > -10) {
    this.set('xvalue', this.get('xvalue') - 1);
    }
  },

  right: function() {
    if (this.get('xvalue') < 10) {
    this.set('xvalue', this.get('xvalue') + 1);
    }
  }

});

},{}],3:[function(require,module,exports){
module.exports = Backbone.Model.extend({

  defaults: {
    username: '',
  },
  //start
  start: function(input) {
    this.set('username', input);
  }
});

},{}],4:[function(require,module,exports){
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
  },

  clickStart: function(){
    let input = document.getElementById('input');
    this.model.start(input.value);
    console.log(input.value)
  },

  render: function() {
      let name = this.model.get("username");
      let view = document.getElementById('ul');
      view.innerHtml = name
  },



});

},{}]},{},[1])