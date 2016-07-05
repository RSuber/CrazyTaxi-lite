module.exports = Backbone.View.extend({

  initialize: function () {
    this.model.on('change', this.render, this);
    this.model.PlayerTypeCollection.on('start',this.render,this)
  },

  events: {
    //event name selector : function to call
    'click #start' : 'clickStart',
    'click #input' : 'clickInput',
  },

  clickStart: function(){
    let input = document.getElementById('input');
    this.model.Start(input.value);
    console.log(this.model.get('name'));
  },
  clickInput: function(){
    let input = document.getElementById('input')
    input.addEventListener('click',function(){
      input.value = ""
    })
  },

  render: function() {
    console.log('bootymeat')
      let name = this.model.get("name");
      let view = document.getElementById('ul');
      view.innerHTML = name
      this.model.PlayerTypeCollection.forEach(function(model){
        let Buttons = document.getElementById('buttons');
        let ButtonMaker= document.createElement('button');
        $(ButtonMaker).html(model.get('name'));
        $(ButtonMaker).
        Buttons.appendChild(ButtonMaker);
      })
  },

});
