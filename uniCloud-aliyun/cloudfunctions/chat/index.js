'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db = uniCloud.database()
	const collection = db.collection('chat')
	const {my,you}=event
	const dbCmd = db.command
	let res = await collection.where({
	  $or:[
		  {
			  withWho:my+'_'+you
		  },
		  {
			  withWho:you+'_'+my
		  }
	  ]
	})
	.get()
	console.log('res : ', res)
	
	//返回数据给客户端
	return {
		code:1,
		msg:'请求成功了哦',
		data:res.data
	}
};
