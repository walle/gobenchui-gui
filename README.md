# Gobenchui GUI

Simple app to try out Electron (http://electron.atom.io/).

Trying out a little more complex application. A desktop application for
gobenchui (https://github.com/divan/gobenchui).

It uses a patched version of gobenchui that doesn't open a browser on invocation.
Modified line https://github.com/divan/gobenchui/blob/master/web.go#L59

Gobenchui's output is modified in two ways, in the electron application. 
The header is removed and the Highcharts export chart label is changed 
from "Download" to "Save". [Code](https://github.com/walle/gobenchui-gui/blob/master/src/inject.js)

#### Goals

* Multi window application
* Serve content from server application running in background
* Manipulate content served by server application
* File handling with dialog
* Package for multiple platforms

##### Non goals

* Being pretty, as long as you can see what is happening it's ok
* Good code quality, simple test code is ok
* Bug free code, will probably be some bugs, but it's ok

![Screen1](https://github.com/walle/gobenchui-gui/raw/master/assets/screenshots/screen1.jpg)

![Screen2](https://github.com/walle/gobenchui-gui/raw/master/assets/screenshots/screen2.jpg)

![Screen3](https://github.com/walle/gobenchui-gui/raw/master/assets/screenshots/screen3.jpg)

![Screen4](https://github.com/walle/gobenchui-gui/raw/master/assets/screenshots/screen4.jpg)

![Screen5](https://github.com/walle/gobenchui-gui/raw/master/assets/screenshots/screen5.jpg)

## Installation

Only tested on OSX.

Download from github releases (https://github.com/walle/gobenchui-gui/releases/). 
Unzip the .zip file and start the application. 

### Run from source

You can test it out by running it from source. Clone the repository and
cd into it. Run `$ npm install` to install dependencies then `$ npm start` to
run the app. This requires you to have `npm` (https://www.npmjs.com/) installed.

## Usage

You need to have a go path set up, with some code that contain benchmark
tests. Then click the open button (or CmdOrCtrl+O), select the go package
folder and input the selected flags. See
https://github.com/divan/gobenchui#filtering-commits for available flags.

## Contributing

All contributions are welcome! Send pull requests with changes or open issues
if you find something.

## License

The code is under the MIT license. See [LICENSE](LICENSE) for more
information.
