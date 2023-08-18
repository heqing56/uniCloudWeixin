'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db=uniCloud.database()
	const collection=db.collection('chatList')
	const result=await collection.where({userid:event.userid}).get()
	let res=[]
	if(result.data.length){
		res=result.data[0].data
	}
	console.log(res)
	//返回数据给客户端
	return {
		code:1,
		data:res
	}
};
