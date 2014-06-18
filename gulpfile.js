var gulp = require('gulp');
var bower = require('gulp-bower');
var newer = require('gulp-newer');
var gulpFilter = require('gulp-filter');

gulp.task('bower', function () {
  var libDestination = 'lib/';
  var filter = gulpFilter(function (file) {
    var path = file.path.replace(/\\/g, '/');

    function isDist() {
      return path.indexOf('/dist/') == path.indexOf('/');
    }

    if (path.indexOf('leaflet-routing/') == 0) {
      return path.indexOf('leaflet-routing/src/') == 0;
    }
    else if (path.indexOf('leaflet-search/') == 0) {
      return path == 'leaflet-search/images/search-icon.png' || isDist();
    }
    else if (path.indexOf('Leaflet.Elevation/') == 0 || path.indexOf('leaflet.draw/') == 0) {
      return isDist();
    }
    else if (path.indexOf('leaflet-plugins/') == 0) {
      return path == 'leaflet-plugins/control/Permalink.js' || path == 'leaflet-plugins/control/Permalink.Layer.js';
    }
    else if (path.indexOf('leaflet-gpx/') == 0) {
      return path != 'leaflet-gpx/LICENSE' && path != 'leaflet-gpx/README.md' && path != 'leaflet-gpx/.bower.json';
    }
    else {
      return path == "normalize-css/normalize.css";
    }
  });
  return bower()
    .pipe(filter)
    .pipe(gulp.dest(libDestination))
});