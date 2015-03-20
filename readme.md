About
=====

Tired of minifiying your JS files manually? You can use uglifyjs-watcher to watch your changes in js files. Uglifyjs-watcher will minify all your files whenever you save your files.

Installation
============

```html
npm install uglifyjs-watcher -g
```

* Until I make a patch, you MUST install this module with -g option.

JSON Format
========================================

```javascript
{

    "uglify-js-arguments": [
        "--source-map bundle.min.js.map",
        "--source-map-root http://localhost/js",
        "-m",
        "-c"
    ],
    "scripts": [
        "app.js",
        "files.js",
        ...
    ],

    "minifiedFilename": "minified.js"

}
```

Syntax
======

```html
uglifyjs-watcher minify.json
```
