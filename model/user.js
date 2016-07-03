module.exports = Backbone.Model.extend({

url:'http://grid.queencityiron.com/api/highscore',
defaults:{
  username: '',
  energy: 0,
  score: 0
},
})
