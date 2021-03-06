module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

      watch: {
        html: {
          files: ['./src/pages/**/*'],
          tasks: ['html']
        },
        js: {
          files: ['./src/js/*.js'],
          tasks: ['js']
        },
        sass: {
          files: ['./src/sass/**/*.scss'],
          tasks: ['style']
        },
        css: {
          files: ['./dist/styles/*.css']
        },
        livereload: {
          files: ['./dist/**/*'],    
          options: {livereload: true}
        }
      },
        
      concat: {
        options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
        },
        dist: {
          // the files to concatenate
          src: ['src/js/jquery.js', 'src/js/js.js'],
          // the location of the resulting JS file
          dest: './dist/js/<%= pkg.name %>.js'
        }
      },
        
      uglify: {
        options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        dist: {
          files: {
            './dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
          }
        }
      },

          
      sass: {                                 
        dist: {                             
            files: {                        
                './dist/styles/main.css': './src/sass/main.scss'
            }
        }
      },

      autoprefixer: {
        dist: {
          options: {
            browsers: ['last 2 versions', '> 1%']
          },
          files: {
            './dist/styles/main.css' : './dist/styles/main.css'
          }
        }
      },

      cssmin: {
        add_banner: {
          options: {
          banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
          report: 'gzip'
          },
          files: {
            './dist/styles/main.min.css' : './dist/styles/main.css'
          }
        }
      },

      assemble: {
        options: {
          layout: './src/pages/layout/default.hbs',
          partials: './src/pages/partials/**/*.hbs',
          data: './src/pages/json/**/*.{json,yml}',
          flatten: true
        },
        pages: {
          src: './src/pages/*.hbs',
          dest: './dist/'
        }
      },

      htmlmin: {
        dist: {
          options: {
            removeComments: true,
            collapseWhitespace: true,
            removeEmptyAttributes: true,
            removeCommentsFromCDATA: true,
            removeRedundantAttributes: true,
            collapseBooleanAttributes: true
          },
          files: {
            // Destination : Source
            './dist/index.html': './dist/index.html'
          }
        }
      },

      imagemin: {
        dynamic: {
          options:{
            optimizationLevel: 3
          },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/resources',          // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'dist/resources'         // Destination path prefix
        }]
        }
      },
          
      connect: {
        server: {
          options: {
            port: 8000,
            base: './dist/'
          }
        }
      },
    
      clean: {
        all: ['./dist/*.html']
      },

      'gh-pages': {
        options: {
          base: 'dist'
        },
        src: ['**']
      }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('html', ['assemble', 'htmlmin']);

  grunt.registerTask('js', ['concat', 'uglify']);

  grunt.registerTask('img', ['imagemin']);

  grunt.registerTask('style', ['sass', 'autoprefixer', 'cssmin']);

  grunt.registerTask('serve', [ 'default', 'connect', 'watch']);

  grunt.registerTask('pub', ['default','gh-pages']);

  grunt.registerTask('default', ['js', 'style', 'clean', 'imagemin', 'html']);

};