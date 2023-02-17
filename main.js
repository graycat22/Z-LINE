function doPost(e) {
  var replyToken= JSON.parse(e.postData.contents).events[0].replyToken;
  if (typeof replyToken === 'undefined') {
    return;
  }

  var url = 'https://api.line.me/v2/bot/message/reply';
  var channelToken = 'JM3WilyttcFJpQlQQqgjlBEg4Q30hzhDPiQgq95Upy+obYmenxcwcePqNRMc8a6p1uN7h/8Im8uOpfNwg/Y2fSVlajDtY0Dend4gWBR3GcKhEJs6VNV/5eo6NmyxpFyiqPiY/g6Esfw65/klAxGaGAdB04t89/1O/w1cDnyilFU=';

  var message = JSON.parse(e.postData.contents).events[0].message;

  var messages = [{
    'type': 'text',
    'text': message.text,
  }];

  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + channelToken,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': messages,
    }),
  });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}