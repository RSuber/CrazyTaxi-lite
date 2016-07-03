module.exports = Backbone.View.extend({

  initialize: function () {
    this.model.on('change', this.render, this);
    this.model.playertype.on('gotTypes', this.render, this);
  },

  events: {
    //event name selector : function to call
    'click #start' : 'clickStart',
    'click #input' : 'clickInput',
    'click #big'   : 'ChooseBig',
    'click #small' : 'ChooseSmall'
  },

  ChooseBig: function (){
    let Size = this.model.set('size','big')
    console.log(this.model.get('size'));
  },
  ChooseSmall: function(){
    let Size = this.model.set('size', "small")
      console.log(this.model.get('size'));
  },
  clickStart: function(){
    let input = document.getElementById('input');
    this.model.start(input.value);
    console.log(this.model.get('size'));
  },
  clickInput: function(){
    let input = document.getElementById('input')
    input.addEventListener('click',function(){
      input.value = ""
    })
  },

  render: function() {
      let name = this.model.get("username");
      let view = document.getElementById('ul');
      view.innerHTML = name
  },

});
