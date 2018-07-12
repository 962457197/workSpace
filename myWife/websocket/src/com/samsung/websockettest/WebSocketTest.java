package com.samsung.websockettest;

import java.io.IOException;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import net.sf.json.JSONObject;

@ServerEndpoint("/websocket")
public class WebSocketTest {

    @OnMessage
    public void onMessage(String message, Session session) throws IOException, InterruptedException {

    	session.getBasicRemote().sendText(message);

    }

    @OnOpen
    public void onOpen(Session session) throws IOException, InterruptedException {
    	String chinese=null;
    	String english=null;
    	int i;
    	JSONObject jsonObject=new JSONObject();
    	JSONObject jsonObject2=new JSONObject();
    	for(i=0;i<=2;i++) {
    		if(i==0){
    			chinese="今天天气怎么样啊大大萨达萨达萨达打撒打撒打撒打撒打撒今天天气怎么样啊大大萨达萨达萨达打撒打撒打撒打撒打撒今天天气怎么样啊大大萨达萨达萨达打撒打撒打撒打撒打撒";
    			english="what is today weather";
    			}else if(i==1) {
    				chinese="你今天吃饭了吗你今天吃饭了吗你今天吃饭了吗你今天吃饭了吗你今天吃饭了吗你今天吃饭了吗你今天吃饭了吗你今天吃饭了吗你今天吃饭了吗你今天吃饭了吗";
        			english="what do you eat today";
    			}else if(i==2) {
    				chinese="你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗你好吗";
        			english="how are you";
    			}
    	
    		jsonObject.put("id",i);
    		jsonObject.put("chinese",chinese);
    		jsonObject.put("english",english);
    		onMessage(jsonObject.toString(),session);
    		jsonObject=new JSONObject();
    		//Thread.sleep(1000);
    		
    	}
    		

        System.out.println("Client connected");
    }

    @OnClose
    public void onClose() {
        System.out.println("Connection closed");
    }
}
