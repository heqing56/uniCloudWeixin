'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	  const collection = db.collection('user')
	const res = await collection.where(event).get()
	//返回数据给客户端
	return {
		code:1,
		data:res.data
	}
};
