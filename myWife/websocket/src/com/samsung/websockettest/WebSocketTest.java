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
    	String islast=null;
    	int i;
    	JSONObject jsonObject=new JSONObject();
    	JSONObject jsonObject2=new JSONObject();
    	for(i=0;i<=3;i++) {
    		if(i==0){
    			chinese="今天";
    			english="what is today weather";
    			islast="false";
    			}else if(i==1) {
    				chinese="今天的天气怎么样";
        			english="what do you eat today";
        			islast="true";
    			}else if(i==2) {
    				chinese="你叫什";
        			english="how are you";
        			islast="false";
    			}else if(i==3) {
    				chinese="你叫什么名字";
        			english="how are you";
        			islast="true";
    			}
    	
    		jsonObject.put("id",i);
    		jsonObject.put("chinese",chinese);
    		jsonObject.put("english",english);
    		jsonObject.put("islast", islast);
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
