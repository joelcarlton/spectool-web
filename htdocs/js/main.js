
$(document).ready( function() {

  $.ajax({
    url: 'data/wispy.01.txt',
    type: 'GET',
    success: function( rsp, textstatus, xhr ) {
      doit( rsp );
    },
  });

} );


function doit( spectool_log )
{
  var data = [];

  _.each( spectool_log.split("\n"), function(line,linenum) {
    var fields = line.split(": ");
    if (fields.length != 2) return;
    var t = linenum; // TODO try to parse a timestamp out of fields[0]
    var samples = _.map( fields[1].trim().split(" "), function(x) { return parseInt(x) } );
    data.push( [ t, samples ] );
  } );

  var sx = 4;
  var cx = data[0][1].length * sx;
  var cy = data.length;

  var $canvas = $( '<canvas width="'+cx+'" height="'+cy+'"></canvas>' );
  var ctx = $canvas[0].getContext("2d");
  var img = ctx.getImageData( 0, 0, cx, cy );
  var colors = palette();
  var p = 0;
  var z_min = -100;
  var z_max = -50;

  _.each( data, function(point,y) {
    _.each( point[1], function(z,x) {
      if (z < z_min) z = z_min;
      else if (z >= z_max) z = z_max-1;
      var z_norm = (z - z_min) / (z_max - z_min);
      var rgb = colors[ Math.floor(z_norm*(colors.length-1)) ];
      for (i=0; i<sx; i++) {
        img.data[p++] = rgb[0];
        img.data[p++] = rgb[1];
        img.data[p++] = rgb[2];
        img.data[p++] = 255;
      }
    } );
  } );

  ctx.putImageData( img, 0, 0 );

  $('#spectool').append( $canvas );
}


function palette()
{
  return [
    [ 0, 0, 0, ],
    [ 0, 0, 46, ],
    [ 0, 0, 51, ],
    [ 0, 5, 55, ],
    [ 0, 10, 60, ],
    [ 0, 16, 64, ],
    [ 0, 23, 68, ],
    [ 0, 30, 72, ],
    [ 0, 38, 77, ],
    [ 0, 47, 81, ],
    [ 0, 57, 85, ],
    [ 0, 67, 89, ],
    [ 0, 78, 94, ],
    [ 0, 90, 98, ],
    [ 0, 102, 102, ],
    [ 0, 106, 97, ],
    [ 0, 111, 92, ],
    [ 0, 115, 86, ],
    [ 0, 119, 79, ],
    [ 0, 123, 72, ],
    [ 0, 128, 64, ],
    [ 0, 132, 55, ],
    [ 0, 136, 45, ],
    [ 0, 140, 35, ],
    [ 0, 145, 24, ],
    [ 0, 149, 12, ],
    [ 0, 153, 0, ],
    [ 13, 157, 0, ],
    [ 27, 162, 0, ],
    [ 41, 166, 0, ],
    [ 57, 170, 0, ],
    [ 73, 174, 0, ],
    [ 89, 179, 0, ],
    [ 107, 183, 0, ],
    [ 125, 187, 0, ],
    [ 143, 191, 0, ],
    [ 163, 195, 0, ],
    [ 183, 200, 0, ],
    [ 204, 204, 0, ],
    [ 208, 191, 0, ],
    [ 212, 177, 0, ],
    [ 217, 163, 0, ],
    [ 221, 147, 0, ],
    [ 225, 131, 0, ],
    [ 229, 115, 0, ],
    [ 234, 97, 0, ],
    [ 238, 79, 0, ],
    [ 242, 61, 0, ],
    [ 246, 41, 0, ],
    [ 251, 21, 0, ],
    [ 255, 0, 0 ]
  ];
}