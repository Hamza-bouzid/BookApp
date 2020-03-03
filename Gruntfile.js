const sass = require('node-sass');
module.exports = function (grunt) {

  //Configuration
  grunt.initConfig({

    //Concat Js and CSS
    concat: {
      js: {
        src: ['src/js/*.js'],
        dest: 'build/js/script.js'
      },
      css: {
        src: ['css/**/*.css'],
        dest: 'build/css/style.css'
      }
    },
    //Compile Sass
    sass: {
      options: {
        implementation: sass,
        sourceMap: false
      },
      build: {
        files: [{
          src: "src/sass/main.scss",
          dest: "build/css/style.css"
        }]
      }
    },

    //MInify
    cssmin: {
      css: {
        src: 'build/css/style.css',
        dest: 'build/css/style.min.css'
      }
    },

    //Uglify JS
    uglify: {
      build: {
        files: [{
          src: "src/script.js",
          dest: "build/js/script.js"
        }]
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  // register tasks
  grunt.registerTask('concat-js', ['concat:js']);
  grunt.registerTask('concat-css', ['concat:css']);
  grunt.loadNpmTasks('grunt-contrib-cssmin');

}