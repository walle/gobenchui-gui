document.addEventListener('DOMContentLoaded', function() {

  var ipc = require('ipc'); 

  var open = document.getElementById('open');
  open.onclick = function() {
    ipc.send('openOpenWindow');
  };

}, false);
