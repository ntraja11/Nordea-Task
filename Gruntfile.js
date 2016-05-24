module.exports = function(grunt) {
	'use strict';

	var assign = require('object.assign').getPolyfill();
	var path = require('path');

	


	var sassTasks = {
		global: {
			options: {
				sourcemap: false
			},
			files: {
				'css/common.css': 'scss/common.scss'
			}
		}
	};

	var watchList = {
		options: {
			spawn: false,
			livereload: false
		},
		global: {
			files: ['scss/**/*.scss','js/**/*.js'],
			tasks: ['sass:global','jshint']
		}
	};

	
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		
		sass: sassTasks,

		connect: {
			dev: {
				options: {
					port: grunt.option('port') || 8789,
					base: '',
					open: true,
          livereload: true
				}
			}

		},

		watch: watchList,

		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				browser: true,
				node	 : true,
				curly  : true,
				eqeqeq : true,
				eqnull : true,
				strict : true,
				undef  : true,
				unused : true,
				quotmark: true,
				latedef: true
			},
			files:{
				src:['!Gruntfile.js','js/**/*.js']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-prompt');


	
	grunt.registerTask('dev', '>> Starts SASS watch and a web server.', ['jshint', 'sass', 'connect:dev', 'watch']);

};
