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
			//console.log(data);
			
			if(s.length > 1)
				return false;
			ani();
			//console.log(s.length);
		}
		
		
		function ani(){
			var data = [];
			var index = 0,index2 = 0;
			//var chinese=data.chinese;
			//var english=data.english;
			$('#chinese').append("<li id='message' style='top:503px;'></li>");
			$('#eg').append("<li id='english' style='top:570px;'></li>");
			$('#chinese').append("<li id='message2' style='top:100px;font-size:45px;color:#425876'></li>");
			$('#eg').append("<li id='english2' style='top:167px;font-size:36px;color:#fff'></li>");
			var textHeight = 66;
			
			function type(){
			    document.getElementById("message").innerText = s[0].chinese;
			   	document.getElementById("english").innerText = s[0].english;
			   	$("#message").animate({
					   top:503-$('#message').height()+textHeight
				   },500);
				setTimeout(function(){
					 $("#message").css("top",503-$('#message').height()+textHeight);
				},500);	
				   
				  
			   	
			}

			function getStringLength(string){
				return	string.length;
			}

			function animote(callback){
				var lastStr = s.shift();
				//console.log("lastone",lastStr);
				//console.log("animation...........");
				move(lastStr);
				
					document.getElementById("message").innerText ="";
				   	document.getElementById("english").innerText ="";
//					$("#message").attr("class","resetposition");
//					$("#english").attr("class","resetposition");
					document.getElementById("message2").innerText =lastStr.chinese;
				   	document.getElementById("english2").innerText =lastStr.english;
					callback();
					
			}
			function action(){
				
//				document.getElementById("message2").innerText ="";
//			   	document.getElementById("english2").innerText ="";
			   	
//			   	$("#message2").attr("class","resetposition");
//				$("#english2").attr("class","resetposition");
			
				
			   	
				index = 0;
				index2 = 0;
				//console.log("gangning",s.length);
				data = s[0];
				var wa = setInterval(type, 500);
				setTimeout(function(){
					clearInterval(wa);
					animote(function(){
						s.length > 0 ?action():false;
						});	
				},100);	
				
				
			}
			
			function move(lastStr){
				setTimeout(function(){
					document.getElementById("message2").innerText ="";
				   	document.getElementById("english2").innerText ="";
				},400);	
				$("#message").animate({
					   top:50
				   },700,function(){
					   $("#message").animate({
						   top:100
					   },300)
				   });
//				$("#english").animate({
//					   top:117+$('#message').height()-textHeight
//				   },700,function(){
//					   $("#english").animate({
//						   top:167+$('#message').height()-textHeight
//					   },300)
//				   });
//				$("#message").attr("class","scrollup");
//				$("#english").attr("class","scrollupEg");
			}

			action(0);	
		}

		function onOpen(event) {
		}

		function onError(event) {
			alert(event.data);
		}
	}