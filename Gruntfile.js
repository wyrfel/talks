var mozjpeg = require('imagemin-mozjpeg');

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
		},

        'gh-pages': {
            options: {
                push: true
            },
            src: [
                'js/**/*.js',
                'css/**/*.css',
                'images/**/*',
                'backgrounds/**/*',
                'bower_components/**',
                'index.html',
                'mobile/network-performance/**/*'
            ]
        },

        'bower-install-simple': {
            options: {
                production: true
            }
        },

        imagemin: {
            original: {
                files: [{
                    expand: true,
                    cwd: 'assets/images/src/',
                    src: ['**/*.png', '**/*.gif'],
                    dest: 'images/'
                }]
            },
            normalized: {
                options: {
                    use: [mozjpeg()]
                },
                files: [{
                    expand: true,
                    cwd: 'assets/images/normalized/',
                    src: ['**/*.jpg', '**/*.jpeg'],
                    dest: 'images/'
                }]
            }
        },

        'image_resize': {
            options: {
                width: 1280,
                height: 768
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'assets/images/src/',
                    src: ['**/*.{jpg,jpeg}'],
                    dest: 'assets/images/normalized/'
                }]
            }
        }

	});

	// Dependencies
	grunt.loadNpmTasks( 'grunt-contrib-qunit' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-zip' );
    grunt.loadNpmTasks( 'grunt-gh-pages' );
    grunt.loadNpmTasks( 'grunt-bower-install-simple' );
    grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
    grunt.loadNpmTasks( 'grunt-image-resize' );

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

    // publish github pages
    grunt.registerTask( 'publish', [ 'bower-install-simple', 'imagemin', 'gh-pages' ]);

    // publish github pages
    grunt.registerTask( 'assets', [ 'image_resize', 'imagemin' ]);
};
