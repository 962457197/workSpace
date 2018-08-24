	function start() {
		var webSocket = new WebSocket('ws://localhost:8080/websocket/websocket');

		webSocket.onerror = function(event) {
			onError(event)
		};

		webSocket.onopen = function(event) {
			onOpen(event)
		};
		
		var delTime = 0;
		webSocket.onmessage = function(event) {
			var data = JSON.parse(event.data);
			if(data.islast == 'true'){
				delTime += 1000;
			}
			delTime += 1000;
			setTimeout(function(){
				onMessage(event)
			},delTime);	
			
		};
		var s = [];
		var temp = {chinese:"",english:""};
		function onMessage(event) {
			var data = JSON.parse(event.data);
			console.log("++++++++++"+data.chinese+"---------"+data.islast);
			if(data.islast=="false"){
				$("#chinese").html(data.chinese);
				$("#eg").html(data.english);
			}
			if(data.islast=="true"){
				temp.chinese = temp.chinese + data.chinese;
				temp.english = temp.english + data.english;
				$("#chinese").html(temp.chinese);
				$("#eg").html(temp.english);
				
			}
		}
		function onOpen(event) {
		}

		function onError(event) {
			alert(event.data);
		}
	}