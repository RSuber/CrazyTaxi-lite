module.exports = Backbone.View.extend({

    initialize: function () {
      this.model.on('change', this.render, this);
    },

  events: {
    //event name selector : function to call
    'click #up' : 'clickUp',
    'click #down' : 'clickDown',
    'click #left' : 'clickLeft',
    'click #right' : 'clickRight',
  },

  clickUp: function () {
    this.model.up();
    console.log('you clicked up');
  },

  clickDown: function () {
    this.model.down();
  },

  clickLeft: function () {
    this.model.left();
  },

  clickRight: function () {
    this.model.right();
  },
  // Riggan helped me with this one
createGrid : function() {
  let grid = this.el.querySelector('#Grid');
  let random = 1
  grid.innerHTML = '';
  console.log('making grid');
  let size = 10;
  for (y=0; y<size; y++){
    var row = document.createElement("div");
    row.classList.add('row');
for(x=0; x<size; x++){
  var cell = document.createElement('div');
  cell.classList.add('cell')
  row.appendChild(cell)
  if(this.model.get("xvalue") === y && this.model.get("yvalue")===x){
    cell.setAttribute('id','player');
  }
  else if(y === this.model.get('ytreasure')  && x === this.model.get('xtreasure') ){
    cell.setAttribute('id','treasure');
  }
  else if (this.model.get('ytreasure') === this.model.get('yvalue') && this.model.get('xtreasure') === this.model.get('xvalue')){
    console.log('HIMINAMEISLOGAN')
    y =this.model.get('ytreasure')
    x = this.model.get('xtreasure')
    this.model.treasureGenerator(x,y)
  }
}
grid.appendChild(row)
}
},
  render: function () {
    $('ul').html(`${this.model.get('name')}`)
    let buttonRight = this.el.querySelector('#xAxis');
    buttonRight.textContent = this.model.get('xvalue');
    let buttonUp = this.el.querySelector('#yAxis');
    buttonUp.textContent = this.model.get('yvalue');
    this.createGrid();
}
});
