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
   energyPerMove: 100,
   startingEnergy: 0,
   username:'',
   score:10,
 },

 //start
 Start: function(input) {
   this.set('name',input);
 },
 ChooseCharacter: function(size){
   this.PlayerTypeCollection.forEach(function(model){
        if($(size).attr('id') === model.get('name')){
          this.UserModel.set('name', model.get('name'))
          this.UserModel.set('score', model.get('score'))
          this.User
        }
      else{
        console.log(model.get('name'))
        console.log($(size).attr('id'))
      }
   })
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
