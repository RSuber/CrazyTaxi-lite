module.exports = Backbone.View.extend({

     initialize: function () {
       this.model.PlayerTypeCollection.on('loaded', this.render, this);
   },
  events: {
    'click #restart': 'tryAgain',
  },
  tryAgain: function(){
    this.model.sendScore();
    this.model.NewGame();
    input = document.getElementById('input');
    console.log(input)
    input.value = ""
  },
   render: function(){
    let finalScore = this.el.querySelector('#scoreBoard')
     finalScore.textContent = `You lost douche!
     Final score: ${this.model.get('score')}`;
     let renderScores = this.el.querySelector('#highScoreList')
     let self = this;
     this.model.PlayerTypeCollection.forEach(function(model) {
       let scoreList = document.createElement('li')
       console.log(model);
         scoreList.textContent = `${model.get('playerType')} ${model.get('name')} ${model.get('score')} `;
             renderScores.appendChild(scoreList);
     })
   }
});
