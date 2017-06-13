module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        postcss: {
            options: {
                map: true,
                processors: [
                    require('lost'),
                    require('autoprefixer')(),
                    require('cssnext')(),
                    require('cssnano')(),
                    require('precss')()
                ]
            },
            dist: {
                src: 'src/css/style.css',
                dest: 'dist/css/style.css'
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        qunit: {
            files: ['test/**/*.html']
        },

        jshint: {
            files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },

        autoprefixer: {
            single_file: {
                src: 'dist/css/style.css',
                dest: 'dist/css/style.css'
            }
        },

        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['uglify:dev', 'concat']
            },
            files: ['src/css/style.css', '<%= jshint.files %>'],
            tasks: ['postcss', 'autoprefixer', 'jshint', 'qunit']
        }

    });

    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('uglify:dev', ['postcss', 'concat', 'uglify']);
    grunt.registerTask('default', ['watch', 'jshint', 'qunit', 'concat', 'uglify']);
    grunt.registerTask('test', ['jshint', 'qunit']);

};