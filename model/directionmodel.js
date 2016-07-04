/// Gabe helped me get the data posting and getting
let UserModel = require('./user');
let UserCollection = require('./UserCollection');
module.exports = Backbone.Model.extend({
  initialize: function (){
    let self = this;
    this.UserModel = new UserModel()
    console.log(self.UserModel)
    self.PlayerTypeCollection= new UserCollection()
    self.PlayerTypeCollection.fetch({
      success:function() {
        self.PlayerTypeCollection.trigger('loaded')
      }
    });
  },
url:"http://grid.queencityiron.com/api/highscore",
 defaults:{
   xvalue: 4,
   yvalue: 4,
   name: '',
   playerType:'',
   energy: 100,
   score:0,
 },

 //start
 Start: function(input) {
   this.set('name',input);
   if (this.get('playerType') === ('big')){
     this.set('energy',150);
   }
  else if(this.get('playerType')===('small')){
  }
  console.log(this.get('energy'));
 },
 sendScore: function() {
   this.UserModel.set('name', this.get('name'))
   this.UserModel.set('playerType', this.get('playerType'))
   this.UserModel.set('score', this.get('score'))
   this.UserModel.save()
   console.log(this.UserModel)
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
  this.set('energy', this.get('energy')- 5);
  this.consumeEnergy();
  console.log(this.get('energy'))
  }
  else if (this.get('yvalue') < 9 && this.get('yvalue') >-1 && this.get('playerType') === 'small'){
  this.set('yvalue', this.get('yvalue') + 2);
  this.set('energy', this.get('energy') - 10);
  this.consumeEnergy();
  console.log(this.get('energy'))
}
},


down: function() {
  if (this.get('yvalue') > - 9 && this.get('yvalue') >0 && this.get('playerType')==='big') {
  this.set('yvalue', this.get('yvalue') - 1);
  this.set('energy', this.get('energy') - 5);
  this.consumeEnergy();
  console.log(this.get('energy'))
  }
  else if (this.get('yvalue') > - 9 && this.get('yvalue') >-1 && this.get('playerType') === 'small'){
  this.set('yvalue', this.get('yvalue') - 2);
  this.set('energy', this.get('energy') - 10);
  this.consumeEnergy();
  console.log(this.get('energy'))
  }
},


left: function() {
  if (this.get('xvalue') > - 9 && this.get('xvalue') >0 && this.get('playerType')==='big') {
  this.set('xvalue', this.get('xvalue') - 1);
  this.set('energy', this.get('energy') - 5);
  this.consumeEnergy();
  console.log(this.get('energy'))
  }
  else if (this.get('xvalue') > - 9 && this.get('xvalue') >-1&& this.get('playerType') === 'small'){
  this.set('xvalue', this.get('xvalue') - 2);
  this.set('energy', this.get('energy') - 10);
  this.consumeEnergy();
  console.log(this.get('energy'))
  }
},


right: function() {
  if (this.get('xvalue') < 9 && this.get('xvalue') >-1 && this.get('playerType')==='big') {
  this.set('xvalue', this.get('xvalue') + 1);
  this.set('energy', this.get('energy') - 5);
  this.consumeEnergy();
  }
  else if (this.get('xvalue') < 9 && this.get('xvalue') >-1 && this.get('playerType') === 'small'){
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
