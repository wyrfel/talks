/* global module:false */
module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner:
				'/*!\n' +
				' * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
				' * http://lab.hakim.se/reveal-js\n' +
				' * MIT licensed\n' +
				' *\n' +
				' * Copyright (C) 2014 Hakim El Hattab, http://hakim.se\n' +
				' */'
		},

		uglify: {
                        gruntfile: 'bower_components/reveal-js/Gruntfile.js',
                        tasks: ['uglify']
		},

		cssmin: {
                        gruntfile: 'bower_components/reveal-js/Gruntfile.js',
                        tasks: ['cssmin']
		},

		sass: {
                        gruntfile: 'bower_components/reveal-js/Gruntfile.js',
                        tasks: ['sass']
		},

		jshint: {
                        gruntfile: 'bower_components/reveal-js/Gruntfile.js',
                        tasks: ['jshint']
		},

		connect: {
			server: {
				options: {
					port: port,
					base: '.'
				}
			}
		},

		zip: {
                        gruntfile: 'bower_components/reveal-js/Gruntfile.js',
                        tasks: ['zip']
		},

		watch: {
			main: {
				files: ['Gruntfile.js', 'js/reveal/reveal.js', 'css/reveal/reveal.css'],
				tasks: 'default'
			},
			theme: {
				files: ['css/reveal/theme/source/*.scss', 'css/reveal/theme/template/*.scss'],
				tasks: 'themes'
			}
		}

	});

	// Dependencies
	grunt.loadNpmTasks( 'grunt-contrib-qunit' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-zip' );

	// Default task
	grunt.registerTask( 'default', [ 'jshint', 'cssmin', 'uglify', 'qunit' ] );

	// Theme task
	grunt.registerTask( 'themes', [ 'sass' ] );

	// Package presentation to archive
	grunt.registerTask( 'package', [ 'default', 'zip' ] );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'connect', 'watch' ] );

	// Run tests
	grunt.registerTask( 'test', [ 'jshint', 'qunit' ] );

};
