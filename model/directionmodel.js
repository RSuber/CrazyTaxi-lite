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
