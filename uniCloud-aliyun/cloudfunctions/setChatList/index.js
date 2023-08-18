'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db=uniCloud.database()
	const collection=db.collection('chatList')
	let res=''
	//判读是否纯在该用户的数据  判读新用户第一次进入
	const isUserid=await collection.where({
		"userid":event.userid
	}).get()
	console.log(1)
	console.log(isUserid)
	if(!isUserid.data.length){
		console.log(2)
		res=await collection.add({
			userid:event.userid,
			data:[event.data]
			})
		return
		console.log(4)
	}
	console.log(3)
	//判断对方是否在消息队列中
	const isHas=await collection.where({
		"data.acc":event.data.acc
	}).get()
	
	if(isHas.data.length){
		res=await collection.where({
			"data.acc":event.data.acc
		}).update({
		 "data.$.des":event.data.des,
		 })
	}else{
		const dbCmd = db.command
		res = await collection.where({userid:event.userid}).update({
	 	data: dbCmd.push([event.data])
	 })
	}
	//返回数据给客户端
	return {
		code:1,
		data:res
	}
};
