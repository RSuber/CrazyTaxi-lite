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
