"use strict"
var request = require('request');

var config = require('../config/auth');

var models = require("../models");
var userController = require("../controllers/db/UserController");

var fbMessengerController = require("../controllers/fb/fbMessengerController")

var activeUsers = {};//Hash table

var util = require('util')

function receivedDeliveryConfirmation(event)
{
	  var senderID = event.sender.id;
	  var recipientID = event.recipient.id;
	  var timeOfMessage = event.timestamp;
	  var message = event.message;

	  console.log("Successfully sent message for user %d and page %d at %d with message:",
	    senderID, recipientID, timeOfMessage);
	  console.log(JSON.stringify(message));
}

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: config.messenger.access_token },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s",
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      //console.error(error.message);
    }
  });
}


function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:",
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;

  console.log('Sender Id: '+senderID);


  if (messageText && message.is_echo === undefined){

	activeUsers.senderID = fbMessengerController.addToUser(activeUsers.senderID, messageText);
	if(activeUsers.senderID.email != ''){
		userController.createUser(activeUsers.senderID)
		delete activeUsers.senderID
	}
    // If we receive a text message, check to see if it matches any special
    // keywords and send back the corresponding example. Otherwise, just echo
    // the text we received.
    switch (messageText) {
      // case 'image':
      //   sendImageMessage(senderID);
      //   break;

      // case 'button':
      //   sendButtonMessage(senderID);
      //   break;

      // case 'generic':
      //   sendGenericMessage(senderID);
      //   break;

      // case 'receipt':
      //   sendReceiptMessage(senderID);
      //   break;

      default:
        let constructedMessage = fbMessengerController.getMessage(senderID, activeUsers.senderID);
		console.log('Trying to send this message back to facebook: '+ constructedMessage)
		callSendAPI(constructedMessage)
    }
  } else if (messageAttachments) {
    //sendTextMessage(senderID, "Message with attachment received");
  }
}

module.exports = function(app, passport){
	app.route('/weChatBot/webhook')
	.post(function(req, res) {
        console.log('===============message=============')

        console.log(req.body.xml)

        var tousername = req.body.xml.tousername[0]
        var fromusername = req.body.xml.fromusername[0]
        var msgtype = req.body.xml.msgtype[0]
        var content = req.body.xml.content[0]
        var createtime = parseInt(req.body.xml.createtime[0])


        res.contentType("application/xml")
        var reply = "Hi there";

        var str = util.format("<xml><ToUserName><![CDATA[%s]]></ToUserName><FromUserName><![CDATA[%s]]></FromUserName><CreateTime>%d</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[%s]]></Content></xml>", tousername, fromusername, createtime+1, reply)



        res.send(str)
		// var data = req.body;
        //
		//   // Make sure this is a page subscription
		//   if (data.object == 'page') {
		//     // Iterate over each entry
		//     // There may be multiple if batched
		//     data.entry.forEach(function(pageEntry) {
		//       var pageID = pageEntry.id;
		//       var timeOfEvent = pageEntry.time;
        //
		//       // Iterate over each messaging event
		//       pageEntry.messaging.forEach(function(messagingEvent) {
		//         if (messagingEvent.optin) {
		//           receivedAuthentication(messagingEvent);
		//         } else if (messagingEvent.message) {
		//           receivedMessage(messagingEvent);
		//         } else if (messagingEvent.delivery) {
		//           receivedDeliveryConfirmation(messagingEvent);
		//         } else if (messagingEvent.postback) {
		//           receivedPostback(messagingEvent);
		//         } else {
		//           console.log("Webhook received unknown messagingEvent: ", messagingEvent);
		//         }
		//       });
		//      });
		//      res.sendStatus(200);
  // 		}
	})
    .get(function(req, res) {
    	console.log(req.query)
        var echostr = req.param('echostr', null)
        res.send(echostr)
	});


};