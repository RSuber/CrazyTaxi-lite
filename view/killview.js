module.exports = Backbone.View.extend({

    // initialize: function () {
    //   this.model.on('load', this.render, this);
    // },
    events: {
      'click #restart': 'GameRestart'
    },
  GameRestart: function(){

  },
  render: function(){
    let finalScore = this.el.querySelector('#scoreBoard')
     finalScore.textContent = `You lost ${model.get('username')}
     Final score: ${model.get('score')}`;
     let renderScores = this.el.querySelector('#highScoreList')
     let self = this;
     this.model.collectionOfHighScores.forEach(function(model) {
       let scoreList = document.createElement('li')
       console.log(model);
         scoreList.textContent = `${model.get('playerType')} ${model.get('name')} ${model.get('score')} `;
             renderScores.appendChild(scoreList);
     })
  }
});
