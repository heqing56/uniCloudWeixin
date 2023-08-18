'use strict';

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	const collection = db.collection('chat')
	const dbCmd = db.command
	let res=''
	if(event._id){
		 res = await collection.doc(event._id).update({
			content: dbCmd.push([event.data])
		})
	}else{
		 res = await collection.add({
			    "withWho": event.withWho,
			    "content": [
			       event.data
			    ]
		})
	}
	console.log(res)
	    uniCloud.callFunction({
	              name: "unipush",
	              data: {name:'zhansan'},
	            }).then(res=>{
					console.log(res,'调用云函数')
				})
	//返回数据给客户端
	return {
		code:1,
		msg:'添加成功',
		data:res
	}
};
