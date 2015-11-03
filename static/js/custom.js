var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function() {
    $('#status').text('connected');
});

socket.on('disconnect', function() {
    $('#status').text('disconnected');
});

function display_data(laser_data) {
  var data_str = "( ";
  var array = laser_data.data;
  console.log(array)
  for (var i=0;i<array.length;i++){
    var point = array[i];
    console.log(point)
    var angle = point.r;
    var distance = point.t;
    data_str += "(" + angle + "," + distance + ") ";
  }
  data_str += ")";
  console.log(array);
  $("#data").text(data_str);
}

$('#update').click(function() {
  console.log('update me plz');
  socket.emit('update', display_data);
});
