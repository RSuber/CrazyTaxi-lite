let UserModel = require('./user');
module.exports = Backbone.Collection.extend({
  url:'http://grid.queencityiron.com/api/highscore',
  model:UserModel,
})
