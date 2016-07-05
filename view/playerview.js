module.exports = Backbone.View.extend({

  initialize: function () {
    this.model.PlayerTypeCollection.on('start',this.render,this)
  },

  events: {
    //event name selector : function to call
    'click #start' : 'clickStart',
    'click #input' : 'clickInput',
    'click #Small' : 'clickSmall',
    'click #Large' : 'clickLarge',
    'click #Gargantuan' : 'clickGargantuan'
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
  clickSmall: function(){
    let Small = document.getElementById('Small')
    this.model.ChooseCharacter(Small)
  },
  clickLarge: function(){
    let Large = document.getElementById('Large')
    this.model.ChooseCharacter(Large)
  },
  clickGargantuan: function(){
    let Gargantuan = document.getElementById('Gargantuan')
    this.model.ChooseCharacter(Gargantuan)
  },

  render: function() {
      let name = this.model.get("name");
      let view = document.getElementById('ul');
      view.innerHTML = name
      this.model.PlayerTypeCollection.forEach(function(model){
        let Buttons = document.getElementById('buttons');
        let ButtonMaker= document.createElement('button');
        $(ButtonMaker).html(model.get('name'));
        $(ButtonMaker).attr('id',model.get('name'))
        Buttons.appendChild(ButtonMaker);
      })
  },

});
