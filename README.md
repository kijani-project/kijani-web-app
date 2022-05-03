# kijani web app

[![Bootstrap](https://img.shields.io/static/v1?label=Bootstrap&message=5.1.3&color=blueviolet)](https://getbootstrap.com)
[![Webpack](https://img.shields.io/static/v1?label=Webpack&message=5&color=83c6e8)](https://webpack.js.org)
[![BrowserSync](https://img.shields.io/static/v1?label=BrowserSync&message=2&color=red)](https://browsersync.io)

## Development

[Node.js](http://nodejs.org/) and npm is required dependency to contribute on this project.

#### Installation

1. Install [Node.js](http://nodejs.org/) (installation depends on operating system).
   ([npm is distributed with Node.js](https://www.npmjs.com/get-npm)).
2. Clone the repository using `git clone https://github.com/kijani-project/kijani-web-app.git`.
3. Open project folder and run `npm install` command.

#### Build commands

* `npm run start` ─ webpack can watch files and recompile whenever they change, and
  start [BrowserSync](https://browsersync.io/) server session.
* `npm run build` ─ compile assets without any compression or optimization.
* `npm run build:production` ─ compile and optimize (the files in your assets' directory) for production.
* `npm run clean` ─ cleanup previous build files in /dist folder.
* `npm run lint:js` ─ this command will lint all js files based on ```.eslintrc.js```.
* `npm run lint:style` ─ this command will lint all style files based on ```.stylelintrc.js```

## Structure

Shorten directories and files structure which you'll see after build:

```bash
▼ project/
│
├──▼ src/
│  ├──▼ assets/            # template asset files
│  │  ├──► fonts/          # place template fonts files here
│  │  ├──► images/         # template images files
│  │  └──▼ styles/         # template style files
│  │     ├── [...]         # 7-1 Sass architecture folders
│  │     └── main.scss     # main Sass file that references scss source files
│  ├──▼ html/              # template HTML files
│  │  ├──▼ partials/       # partials of HTML code
│  │  │  └── [...]
│  │  ├── 404.html         # example 404 error page
│  │  └── index.html       # default index page
│  │  └── [...]
│  ├──▼ scripts/           # template javascript files
│  │  ├──► modules/        # dedicated project modules
│  │  ├──▼ vendor/         # necessary parts of frameworks and libs
│  │  │  └── [...]         # Bootstrap, jQuery, etc...
│  │  └── main.js          # main javascript file that references JS source files
│  ├── index.js            # entry point of template
│  └── [...]
├──▼ dist/                 # distribution folder with production build (don't edit*)
│  ├──► css/               # output styles
│  ├──► images/            # output images
│  ├──► js/                # output javascripts
│  ├── index.html          # homepage
│  └── [...]               # miscellaneous
├──▼ node_modules/         # Node.js packages (don't edit*)
│  └── [...]
├── .babelrc               # Babel configuration file
├── .eslintrc.js           # ESLint configuration file
├── .stylelintrc.js        # StyleLint configuration file
├── package.json           # Node.js dependencies and scripts
├── webpack.config.js      # Webpack configuration file
├── package-lock.json      # Node.js dependencies lock file (don't edit)
└── [...]                  # other files
```
