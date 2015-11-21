document.addEventListener('DOMContentLoaded', function() {

  var ipc = require('ipc');
  //var dialog = require('electron').dialog;
  var remote = require('remote'); 
  var dialog = remote.require('dialog'); 

  var form = document.getElementById('proc');
  var path = document.getElementById('path');
  path.onclick = function() {
    dialog.showOpenDialog({ properties: ['openDirectory'] }, function(f) {
      var s = '' + f;
      var val = s.substring(s.indexOf('/src/') + 5); 
      path.value = val;
    });
  };

  var submit = document.getElementById('submit');
  submit.onclick = function() {
    var proc = {
      args: form.args.value,
      pkg: form.path.value   
    };
    if (proc.args != '' && proc.pkg != 'Select package') {
      ipc.send('open', proc);
    } else {
      alert('Please select flags and package.');
    }
  };
}, false);
