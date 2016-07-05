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
   xtreasure:0,
   ytreasure:0,
   name: '',
   playerType:'',
   energyPerMove: 0,
   startingEnergy: 0,
   username:'',
   score:0,
 },

 //start
 Start: function(input) {
   this.set('name',input);
 },
 ChooseCharacter: function(size){
    let User = this.UserModel
    let defaults = this
   this.PlayerTypeCollection.forEach(function(model){
        if($(size).attr('id') === model.get('name')){
          defaults.set('energyPerMove', model.get('energyPerMove'))
          defaults.set('playerType', model.get('name'))
          defaults.set('startingEnergy', model.get('startingEnergy'))
        }
      else {
        console.log(model.get('name'))
        console.log($(size).attr('id'))
      }
   });
 },
 sendScore: function() {
   this.UserModel.set('name', this.get('name'))
   this.UserModel.set('score', this.get('score'))
   this.UserModel.set('playerType', this.get('playerType'))
   console.log(this.UserModel);
   this.UserModel.save()
   console.log('saving')
 },
 NewGame: function() {
   this.trigger('Restart',this);
  this.clear({
     silent: true
   },this);
   this.set(this.defaults);
 },

 up: function() {
  if (this.get('yvalue') < 9 && this.get('yvalue') > -1 ) {
  this.set('yvalue', this.get('yvalue') + 1);
  this.set('startingEnergy', this.get('startingEnergy')- this.get('energyPerMove'));
  this.set('score', this.get('score') + 1)
  this.consumeenergy();
  console.log(this.get('startingEnergy'))
  }
},


down: function() {
  if (this.get('yvalue') > - 9 && this.get('yvalue') >0 ) {
  this.set('yvalue', this.get('yvalue') - 1);
  this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'));
  this.set('score', this.get('score') + 1)
  this.consumeenergy();
  console.log(this.get('startingEnergy'))
  }
},


left: function() {
  if (this.get('xvalue') > - 9 && this.get('xvalue') >0 ){
  this.set('xvalue', this.get('xvalue') - 1);
  this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'));
  this.set('score', this.get('score') + 1)
  this.consumeenergy();
  console.log(this.get('startingEnergy'))
  }
},


right: function() {
  if (this.get('xvalue') < 9 && this.get('xvalue') >-1) {
  this.set('xvalue', this.get('xvalue') + 1);
  this.set('startingEnergy', this.get('startingEnergy') - this.get('energyPerMove'));
  this.set('score', this.get('score') + 1)
  this.consumeenergy();
  }
},
consumeenergy: function() {
  if(this.get('startingEnergy') <= 0){
  console.log('you Dead')
  this.trigger('death');
}},
scoring: function(x,y) {
  xx = this.get('xvalue')
  yy = this.get('yvalue')
  if(xx === x && yy === y){
    this.set('score', this.get('score') + 20)
  }
},
treasureGenerator: function() {
  //  this.on('treasureGen', this.model.treasureGenerator())
   this.set('xtreasure', Math.floor(Math.random() * 9) + 1)
   this.set('ytreasure',Math.floor(Math.random()* 9) + 1)
   this.set('score', this.get('score') + 5)
 }
});
