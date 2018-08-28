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
			//console.log("++++++++++"+data.chinese+"---------"+data.islast);
			if(data.islast=="false"){
				$("#ch").html(temp.chinese+data.chinese);
				$("#eg").html(temp.english+data.english);
			}
			if(data.islast=="true"){
//				temp.chinese = "<marquee direction='up' >"+temp.chinese+data.chinese+"</marquee>";
				temp.chinese = temp.chinese+data.chinese;
				temp.english = temp.english + data.english;
				$("#ch").html(temp.chinese);
				$("#eg").html(temp.english);
				console.log("Chinese text height"+$("#chinese").find("ul").height());
//				console.log("div rect height"+$("#chinese").height());
			}
			var scrollHeight=$("#chinese").height()-$("#chinese").find("ul").height();
			console.log("scroll height"+scrollHeight)
			if($("#chinese").find("ul").height()>$("#chinese").height()){
				$("#chinese").find("ul").animate({
					marginTop:(scrollHeight)+"px"
				},1000);
			}
		}
		function onOpen(event) {
		}

		function onError(event) {
			alert(event.data);
		}
	}