module.exports = Backbone.Model.extend({
  defaults:{
    xvalue: 0,
    yvalue: 0,
    username: '',
    energy:100,
    size:"nan",
    move: 1
  },
  start: function(input, size) {
    if (this.get('type')){
    this.set('username', input);
  }},
  up: function() {
    if (this.get('yvalue') < 10 && this.get('size')==='big') {
    this.set('yvalue', this.get('yvalue') + 1);
    }
    else if (this.get('yvalue') <10 && this.get('size') === 'small'){
    this.set('yvalue', this.get('yvalue') + 2);
    }
  },

  down: function() {
    if (this.get('yvalue') < 10 && this.get('size')==='big') {
    this.set('yvalue', this.get('yvalue') - 1);
    this.set('energy', energy.get('energy') -2);
    }
    else if (this.get('yvalue') <10 && this.get('size') === 'small'){
    this.set('yvalue', this.get('yvalue') - 2);
    this.set('energy', energy.get('energy')-2);
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
  },
  size: function() {
    if(this.get('size') === "large"){
      this.set('energy', this.set('energy') + 50);
    }
  else if(this.get('size')==="small"){

  }
  }

});
