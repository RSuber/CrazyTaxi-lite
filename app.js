
let MyRouter = require('./router');

window.addEventListener('load', function(){
 console.log('I am functional');
var GameRouter = new MyRouter;
Backbone.history.start()
});
