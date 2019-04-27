var socket=io();
function sendmessage()
{
	var text=$('#message').val();
	socket.emit('fromclient',text);
	socket.on('fromserver',function(message)
	{
		var ul = document.getElementById("chatarea");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(message));
  ul.append(li);
	li.removeChild(childNodes[0]);
	});
}
