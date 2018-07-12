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
    			chinese="����������ô������������������������������������������������ô������������������������������������������������ô��������������������������������������";
    			english="what is today weather";
    			}else if(i==1) {
    				chinese="�����Է����������Է����������Է����������Է����������Է����������Է����������Է����������Է����������Է����������Է�����";
        			english="what do you eat today";
    			}else if(i==2) {
    				chinese="�������������������������������������������������������������������������������������";
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
