module.exports = Backbone.View.extend({

  initialize: function () {
    this.model.on('change', this.render, this);
  },

  events: {
    //event name selector : function to call
    'click #start' : 'clickStart',
  },

  clickStart: function(){
    let input = document.getElementById('input');
    this.model.start(input.value);
    console.log(input.value)
  },

  render: function() {
      let name = this.model.get("username");
      let view = document.getElementById('ul');
      view.innerHTML = name
  },



});
