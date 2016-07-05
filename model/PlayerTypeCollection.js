let PlayerCollection = require('./PlayerType');
module.exports = Backbone.Collection.extend({
  url:'http://grid.queencityiron.com/api/players',
  model:PlayerCollection,
})
