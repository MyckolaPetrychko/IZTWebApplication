/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
	// map tells the System loader where to look for things
	System.packageWithIndex = false;
	var map = {
		'app': 'app', // 'dist',
		'@angular': 'node_modules/@angular',
		// 'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
		'rxjs': 'node_modules/rxjs',
		'ag-grid-ng2': 'node_modules/ag-grid-ng2',
        'ag-grid': 'node_modules/ag-grid',
		// 'ng2-translate': 'node_modules'
	    // 'primeng': 'node_modules/primeng',
		'ng2-bootstrap': 'node_modules/ng2-bootstrap',
		'moment': 'node_modules/moment/moment.js'			
	};

	// packages tells the System loader how to load when no filename and/or no extension
	var packages = {
		'app': { main: 'boot.js', defaultExtension: 'js' },
		'rxjs': { defaultExtension: 'js' },
		'ag-grid-ng2': {
            defaultExtension: "js"
        },
        'ag-grid': {
            defaultExtension: "js"
        },
		'ng2-bootstrap' : {
			main: 'ng2-bootstrap.js', defaultExtension: 'js'
		}
		
		//'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
		// 'primeng':                    { main: 'primeng.js', defaultExtension: 'js' },
		// 'ng2-translate': { main: 'ng2-translate.js', defaultExtension: 'js' }

	};
	var ngPackageNames = [
		'common',
		'compiler',
		'core',
		'forms',
		'http',
		'platform-browser',
		'platform-browser-dynamic',
		'router',
		'router-deprecated',
		'upgrade'
	];

	// Bundled (~40 requests):
	function packUmd(pkgName) {
		packages['@angular/' + pkgName] = {
			main: 'bundles/' + pkgName + '.umd.js',
			defaultExtension: 'js'
		};
	}

	// Add package entries for angular packages
	ngPackageNames.forEach(packUmd);
	var config = {
		map: map,
		packages: packages
	};
	System.config(config);
})(this);

System.import('app/boot')
	.then(null, console.error.bind(console));
