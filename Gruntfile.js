module.exports = function (grunt) {

	grunt.initConfig({

		uglify: {
			options: {
				banner: grunt.file.read('src/loStorage.js').split('\n')[0] + "\n"
			},

			my_target: {
				files: {
					'src/loStorage.min.js': ['src/loStorage.js']
				}
			}
		},

		jasmine: {
			src: 'src/loStorage.js',
			options: {
				specs: 'spec/spec.js',
				vendor: 'vendor/jasmine/lib/jasmine-core/jasmine.js'
			}
		},

		watch: {
			test: {
				files: ['src/loStorage.js', 'spec/*'],
				tasks: 'test'
			},

			min: {
				files: ['src/loStorage.js'],
				tasks: 'min'
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('min', 'uglify');
	grunt.registerTask('test', 'jasmine');
	grunt.registerTask('release', ['test', 'min']);
	grunt.registerTask('default', 'release');

};
