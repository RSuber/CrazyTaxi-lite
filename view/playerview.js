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
    console.log(input.value)
    this.model.start(input.value);

  },

  render: function() {
      let input = document.getElementById('input');
      input.style.background = "lightblue";
      input.style.color = "white";
  },



});
