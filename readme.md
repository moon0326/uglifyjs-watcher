Installation
============

```html
npm install uglifyjs-watcher
```

JSON Format (git includes a sample file)
========================================

```javascript
{

	"uglify-js-arguments": "-o",
	"scripts": [
		// list your scripts to be minified
	],

	"minifiedFilename": "minified.js"

}
```

Syntax
======

```html
uglifyjs-watcher minify.json
```
