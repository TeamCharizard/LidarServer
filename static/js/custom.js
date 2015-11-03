var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function() {
    $('#status').text('connected');
});

socket.on('disconnect', function() {
    $('#status').text('disconnected');
});

socket.on('force_update', function(laser_data) {
  display_data(laser_data);
});

function display_data(laser_data) {
  console.log(laser_data.data)

  var canvas = document.getElementById("viz");

  if (canvas.getContext){

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,400,400);
    ctx.beginPath();
    ctx.moveTo(200,200);
    ctx.lineTo(400,200);
    ctx.stroke();

    var scale = 0.2;

    var array = laser_data.data;
    data_str = "( ";

    for (var i=0;i<array.length;i++){
      var point = array[i];
      var angle = point[0];
      var distance = point[1] * scale;

      data_str += "(" + angle + "," + distance + ") ";
      var rad = (angle * Math.PI) / 180;
      var x = 200 + Math.cos(rad) * distance;
      var y = 200 + Math.sin(rad) * distance;

      if (x < 10) x = 10;
      if (x > 390) x = 390;
      if (y < 10) y = 10;
      if (y > 390) y = 390;

      ctx.fillRect(x-3,y-3,6,6);
    }

    data_str += ")";
    console.log(array);
    $("#data").text(data_str);
  }
}

$('#update').click(function() {
  console.log('update me plz');
  socket.emit('update', display_data);
});
