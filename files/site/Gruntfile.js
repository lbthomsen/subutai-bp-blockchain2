
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jsResources: [],
        cssResources: [],
        clean: {
            start: {
                dot: true,
                src: ['pub/']
            },
            finish: {
                src: [
                    'pub/js/app.js',
                    'pub/css/style.css'
                ]
            }
        },
        copy: {
            build: {
                files: [
                    {
                        cwd: 'src/',
                        dest: 'pub/',
                        expand: true,
                        //Copy over the index.html file and all the files in the "views" directory
                        src: ['index.html', 'robots.txt', 'sitemap.xml', '.htaccess', 'BingSiteAuth.xml', 'favicon.ico', 'views/**', 'img/**']
                    },
                    {
                        cwd: 'node_modules/bootstrap',
                        dest: 'pub/',
                        expand: true,
                        src: ['fonts/**']
                    }, 
                    {
                        cwd: 'node_modules/font-awesome',
                        dest: 'pub/',
                        expand: true,
                        src: ['fonts/**']
                    },
                    {
                        cwd: './',
                        dest: 'pub/json',
                        expand: true,
                        src: ['package.json', 'node_modules/**/package.json']
                    }
                ]
            }
        },
        replace: {
            gather: {
                files: [
                    {
                        cwd: 'src/',
                        dest: 'pub/',
                        expand: true,
                        src: ['index.html']
                    }
                ],
                options: {
                    patterns: [
                        {
                            //Grab the <!--build-js-start--> and <!--build-js-end--> comments and everything in-between
                            match: /\<\!\-\-build\-js\-start[\s\S]*build\-js\-end\-\-\>/,
                            replacement: function (matchedString) {
                                //Grab all of the src attributes from the <script> tags
                                var jsArray = matchedString.match(/(src\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/g);
                                jsArray.forEach(function (element) {
                                    //Get just the value of the src attribute (the file path to the JS file)
                                    var resourceTarget = element.match(/(src\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/)[ 2 ];
                                    targetConfig = grunt.config('jsResources');
                                    //Alter the path for use with the concat task
                                    targetConfig.push('src/' + resourceTarget);
                                    //Add the path to the JS file to the jsResources configuration property
                                    grunt.config('jsResources', targetConfig);
                                });

                                //Replace the entire build-js-start to build-js-end block with this <script> tag
                                return '<script type="text/javascript" src="js/app.min.js?v=' + grunt.config('pkg.version') + '"></script>';
                            }
                        },
                        {
                            //Grab the <!--build-css-start--> and <!--build-css-end--> comments and everything in-between
                            match: /\<\!\-\-build\-css\-start[\s\S]*build\-css\-end\-\-\>/,
                            replacement: function (matchedString) {
                                //Grab all of the href attributes from the <href> tags
                                var cssArray = matchedString.match(/(href\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/g);
                                cssArray.forEach(function (element) {
                                    var resourceTarget = element.match(/(href\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/)[ 2 ];
                                    var targetConfig = grunt.config('cssResources');
                                    //Alter the path for use with the concat task
                                    targetConfig.push('src/' + resourceTarget);
                                    //Add the path to the CSS file to the cssResources configuration property
                                    grunt.config('cssResources', targetConfig);
                                });

                                //Replace the entire build-css-start to build-css-end block with this <link> tag
                                return '<link rel="stylesheet" media="screen" href="css/style.min.css?v=' + grunt.config('pkg.version') + '"/>';
                            }
                        }
                    ]
                }
            }
        },
        concat: {
            js: {
                //Concatenate all of the files in the jsResources configuration property
                src: ['<%= jsResources %>'],
                dest: 'pub/js/app.js',
                options: {
                    separator: ';'
                }
            },
            css: {
                //Concatenate all of the files in the cssResources configuration property
                src: ['<%= cssResources %>'],
                dest: 'pub/css/style.css'
            }

        },
        uglify: {
            build: {
		options: {
			mangle: true,
			compress: true
		}, 
                files: [
                    {
                        'pub/js/app.min.js': ['pub/js/app.js']
                    }
                ]
            }
        },
        cssmin: {
            build: {
                options: {
                    shorthandCompacting: false,
                    roundingPrecision: -1
                },
                files: {
                    'pub/css/style.min.css': 'pub/css/style.css'
                }
            }
        },
        htmlmin: {
            build: {
                options: {// Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {
                        expand: true,
                        src: ['pub/**/*.html']
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', 'Creates a build from the files in the app directory', function () {
        //So the user doesn't have to add '--force' to the command to clean the build directory
        grunt.option('force', true);

        grunt.task.run([
            'clean:start',
            'copy:build',
            'replace:gather',
            'concat:css',
            'concat:js',
            'uglify:build',
            'cssmin:build',
            'htmlmin:build',
            'clean:finish'
        ]);

    });

};
