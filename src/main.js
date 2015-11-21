var app = require('app');
var BrowserWindow = require('browser-window');
const shell = require('shell');
var exec = require('child_process').exec;
var os = require('os')
var ipc = require('ipc');
var fs = require('fs');

var mainWindow = null;
var openWindow = null;

var proc = null;

app.on('window-all-closed', function() {
  // Stay active until the user quits explicitly with Cmd + Q on OS X 
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  app.setName('Gobenchui GUI');

  var bin = __dirname + '/../bin/gobenchui-' + os.platform() + '-' + os.arch();
  var exec = require('child_process').exec;

  mainWindow = new BrowserWindow({
    width: 1250,
    height: 750,
    title: 'Gobenchui GUI',
    icon: __dirname + '/../assets/icon.png'
  });
  mainWindow.loadUrl('file://' + __dirname + '/../app/index.html');

  //mainWindow.webContents.openDevTools();
  
  ipc.on('openOpenWindow', function() {
    openOpenWindow();
  });

  ipc.on('open', function(e, data) {
    if (proc) { proc.kill(); }
    proc = exec(bin + ' ' + data.args + ' ' + data.pkg/*, function(e, so, se) {
      console.log('Error: ' + e);
      console.log('Stdout: ' + so);
      console.log('Stderr: ' + se);
    }*/);
    mainWindow.loadUrl('http://localhost:6222/');
    fs.readFile(__dirname + '/inject.js', function (err, data) {
      mainWindow.webContents.executeJavaScript(data + '');
    });
    openWindow.close();
    openWindow = null;
  });

  var Menu = require('menu');
  menu = Menu.buildFromTemplate(menuTemplate());
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', function() {
    if (proc) { proc.kill(); }
    mainWindow = null;
    openWindow = null;
  });
});

var openOpenWindow = function() {
  openWindow = new BrowserWindow({
    width: 400,
    height: 300,
    title: 'Open'
  });
  openWindow.loadUrl('file://' + __dirname + '/../app/open.html');
  //openWindow.webContents.openDevTools();
  openWindow.on('closed', function() {
    openWindow = null;
  });
};

// menuTemplate returns the template for the main menu.
// Contains some OSX specific code, so it's not just a object.
var menuTemplate = function() {
  var template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click: openOpenWindow
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function() {
            app.quit();
          }
        },
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Full Screen',
          accelerator: (function() {
            if (process.platform == 'darwin') {
              return 'Ctrl+Command+F';
            } else {
              return 'F11';
            }
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
          }
        },
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: function() {
            shell.openExternal('https://github.com/divan/gobenchui')
          }
        },
      ]
    },
  ];

  if (process.platform == 'darwin') {
    var name = app.getName();
    template.unshift({
      label: name,
      submenu: [
        {
          label: 'About ' + name,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide ' + name,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function() {
            app.quit();
          }
        },
      ]
    });
    // Window menu.
    template[3].submenu.push(
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        role: 'front'
      }
    );
  }
  ;

  return template;
};
