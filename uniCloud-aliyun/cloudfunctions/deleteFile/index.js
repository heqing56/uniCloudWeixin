'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// 云函数删除文件示例代码
	let res = await uniCloud.deleteFile({
	    fileList: [
	        event.str // 阿里云fileID是url形式，例：https://xxx.com/xxx.png
	    ]
	});
	console.log(res)
	//返回数据给客户端
	return {
		code:1,
		data:res.fileList
	}
};
