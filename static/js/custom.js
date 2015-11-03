var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function() {
    $('#status').text('connected');
});

socket.on('disconnect', function() {
    $('#status').text('disconnected');
});

function display_data(laser_data) {
  var data_str = "( ";
  console.log(laser_data.data)
  var array = laser_data.data;
  for (var i=0;i<array.length;i++){
    var point = array[i];
    var angle = point[0];
    var distance = point[1];
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
