module.exports = function (grunt) {

  grunt.initConfig({
    shell: { /*grunt-shell*/
      options: { /*настройка задачи*/
        stdout: true,
        stderr: true
      },
      server: {
        command: 'java -jar SimpleTurnPvPGameBackend-004-jar-with-dependencies.jar 8080'
      }
    },
    fest: { /*grunt-fest*/
      templates: { /*Подзадача*/
        files: [{ /* указание файлов группами */
          expand: true,
          cwd: 'templates', /* исходная директория */
          src: '*.xml', /* имена шаблонов */
          dest: 'public_html/js/tmpl' /* результирующая директория */
        }],
        options: { /* формат функции шаблона */
          template: function (data) {
            return grunt.template.process( /* присваиваем функцию шаблона */
              'define(function () { return <%= contents %> ; });',
                {data: data}
            );
          }
        }
      }
    },
    watch: { /*grunt-watch*/
      fest: {/*Подзадача*/
        files: ['templates/*.xml'], /* Следим за шаблонами */
        tasks: ['fest'], /* Перекомпилировать */
        options: {
          interrupt: true,
          atBegin: true /* Запустить задачу при старте */
        }
      },
      server: {/*Подзадача*/
        files: [ /* Следим за JS */
          'public_html/js/**/*.js',
          'public_html/css/**/*.css'
        ],
        options: {
          livereload: true /* автоматическая перезагрузка */
        }
      }
    },
    concurrent: { /*grunt-concurrent*/
      target: ['watch', 'shell'],
      options: {
        logConcurrentOutput: true /* Вывод процесса */
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-fest');

  grunt.registerTask('default', ['concurrent']);

};