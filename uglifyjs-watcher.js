/*
*    Required Modules
**/
var fs = require("fs");
var exec = require("child_process").exec;

var uglifyjsWatcher = (function(process, fs, exec){

	var userDir = process.cwd();
	var list;

	var isWatching = false;
	var cmdString = "cat";
	var minifiedIndex = 1;

	var loadSettingFile = function()
	{

		if( process.argv[2] == undefined )
		{
			console.log("missing argument: filename");
			process.exit();
		}
		else
		{

			try
			{

				list = require( userDir + "/" + process.argv[2] );

				// see if we have scripts to minify

				if( list.scripts == undefined )
				{
					console.log("can't find scripts property in the json file");
					process.exit();
				}

				if( list.scripts.length == 0 )
				{
					console.log("scripts property has length of 0");
					process.exit();
				}

				if( list.minifiedFilename == undefined )
				{
					console.log("please specify minifiedFilename property");
					process.exit();
				}

				if( list['uglify-js-arguments'] == undefined )
				{
					console.log("please specify uglify-js arguments");
					process.exit();
				}

			}
			catch(e)
			{
				console.log("can't find a json file: " + process.argv[2] );
			}
			
		}

	}

	var generateUglifyJSCommand = function()
	{
		list.scripts.forEach(function(obj,index){
		
			cmdString += " " + obj;

		});

		cmdString += " | uglifyjs " + list['uglify-js-arguments'] + " " + list.minifiedFilename;

	}

	var watchFiles = function()
	{

		list.scripts.forEach(function(file,index){

			fs.watchFile( userDir + "/" + file , { persistent: true, interval: 2000}, function(curr,prev){

				if( curr.mtime - prev.mtime)
				{
					minify();
				}


			} );

		});

		
	}

	var minify = function()
	{
		exec(cmdString, function(error, stdout, stderr){

			if( error == null && stderr == "" )
			{
				console.log( minifiedIndex + ". minified: " + list.minifiedFilename );
				minifiedIndex++;

				if( !isWatching )
				{
					watchFiles();
					isWatching = true;
				}
			}
			else
			{
				console.log(error);
				console.log(stderr);
			}

		});
	}


	return {

		init: function()
		{
			loadSettingFile();
			generateUglifyJSCommand();
			minify();

		}

	}

}( process, fs, exec));

module.exports = uglifyjsWatcher;