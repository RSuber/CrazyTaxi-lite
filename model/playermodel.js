module.exports = Backbone.Model.extend({

  defaults: {
    username: '',
  },
  //start
  start: function(input) {
    this.set('username', input);
  }
});
