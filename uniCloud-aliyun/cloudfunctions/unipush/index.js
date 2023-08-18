'use strict';
const uniPush = uniCloud.getPushManager({appId:"__UNI__AE5DD00"}) 
exports.main = async (event, context) => {
	console.log(event,context,'被调用的unipush')
	return await uniPush.sendMessage({
			"push_clientid": event.push_clientid, 	//填写上一步在uni-app客户端获取到的客户端推送标识push_clientid
			"title": "通知栏显示的标题",	
			"content": "通知栏显示的内容",
			"force_notification":true,
			"payload": {
				"text":"体验一下uni-push2.0"
			}
		})
};
