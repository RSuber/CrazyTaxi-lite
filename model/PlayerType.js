module.exports = Backbone.Model.extend({
url:'http://grid.queencityiron.com/api/players',
defaults:{
  energyPerMove: 0,
  name:'',
  startingEnergy: 0,
},
})
