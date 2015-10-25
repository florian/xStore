module.exports = function (grunt) {

	grunt.initConfig({

		meta: {
			banner: '// ' + grunt.file.read('src/loStorage.js').split("\n")[0]
		},

		min: {
			dist: {
				src: ['<banner>', 'src/loStorage.js'],
				dest: 'src/loStorage.min.js'
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

	grunt.registerTask('test', 'jasmine');
	grunt.registerTask('release', 'test min');
	grunt.registerTask('default', 'release');

};
