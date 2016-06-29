module.exports = Backbone.Model.extend({
 defaults:{
   xvalue: 0,
   yvalue: 0,
   username: '',
   energy: 0,
 },

 //start
 start: function(input) {
   this.set('username', input);
 },


 up: function() {
  if (this.get('yvalue') < 10 && this.get('size')==='big') {
  this.set('yvalue', this.get('yvalue') + 1);
  }
  else if (this.get('yvalue') < 10 && this.get('size') === 'small'){
  this.set('yvalue', this.get('yvalue') + 2);
  }
},


down: function() {
  if (this.get('yvalue') > - 10 && this.get('size')==='big') {
  this.set('yvalue', this.get('yvalue') - 1);
  }
  else if (this.get('yvalue') > - 10 && this.get('size') === 'small'){
  this.set('yvalue', this.get('yvalue') - 2);
  }
},


left: function() {
  if (this.get('xvalue') > - 10 && this.get('size')==='big') {
  this.set('xvalue', this.get('xvalue') - 1);
  }
  else if (this.get('xvalue') > - 10 && this.get('size') === 'small'){
  this.set('xvalue', this.get('xvalue') - 2);
  }
},


right: function() {
  if (this.get('xvalue') < 10 && this.get('size')==='big') {
  this.set('xvalue', this.get('xvalue') + 1);
  }
  else if (this.get('xvalue') < 10 && this.get('size') === 'small'){
  this.set('xvalue', this.get('xvalue') + 2);
  }
},


});
