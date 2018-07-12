var s=[];     //中文
var eg=[];    //英文
  
	function start() {
		var webSocket = new WebSocket('ws://localhost:8080/websocket/websocket');

		webSocket.onerror = function(event) {
			onError(event)
		};

		webSocket.onopen = function(event) {
			onOpen(event)
		};

		webSocket.onmessage = function(event) {
			onMessage(event)
		};
		var s = [];
		function onMessage(event) {
			var data = JSON.parse(event.data);
			s.push(data);
			//eg.push(data.english);
			console.log(data);
			
			if(s.length > 1)
				return false;
			ani();
			console.log(s.length);
		}
		
		
		function ani(){
			var data = [];
			var index = 0,index2 = 0;
			//var chinese=data.chinese;
			//var english=data.english;
			$('#chinese').append("<li id='message' style='width:1000px;top:503px;'></li>");
			$('#eg').append("<li id='english' style='width:1000px;top:570px;'></li>");
			$('#chinese').append("<li id='message2' style='width:1000px;top:100px;font-size:45px;color:#425876'></li>");
			$('#eg').append("<li id='english2' style='width:1000px;top:167px;font-size:36px;color:#fff'></li>");
			function type(){
			    document.getElementById("message").innerText = s[0].chinese.substring(0,index++);
			   	document.getElementById("english").innerText = s[0].english.substring(0,index2+=3);
			}

			function getStringLength(string){
				return	string.length;
			}

			function animote(callback){
				var lastStr = s.shift();
				console.log("lastone",lastStr);
				console.log("animation...........");
				move(lastStr);
				setTimeout(function(){
					document.getElementById("message").innerText ="";
				   	document.getElementById("english").innerText ="";
					$("#message").attr("class","resetposition");
					$("#english").attr("class","resetposition");
					document.getElementById("message2").innerText =lastStr.chinese;
				   	document.getElementById("english2").innerText =lastStr.english;
					callback();
				},1000);	
			}
			function action(){
				
//				document.getElementById("message2").innerText ="";
//			   	document.getElementById("english2").innerText ="";
			   	
//			   	$("#message2").attr("class","resetposition");
//				$("#english2").attr("class","resetposition");
			
				
			   	
				index = 0;
				index2 = 0;
				console.log("gangning",s.length);
				data = s[0];
				var wa = setInterval(type, 500);
				setTimeout(function(){
					clearInterval(wa);
					animote(function(){
						s.length > 0 ?action():false;
						});	
				},Math.max(getStringLength(data.chinese),getStringLength(data.english)/3)*500+500);	
				
				
			}
			
			function move(lastStr){
				setTimeout(function(){
					document.getElementById("message2").innerText ="";
				   	document.getElementById("english2").innerText ="";
				},400);	
				
				$("#message").attr("class","scrollup");
				$("#english").attr("class","scrollupEg");
			}

			action(0);	
		}

		function onOpen(event) {
		}

		function onError(event) {
			alert(event.data);
		}
	}