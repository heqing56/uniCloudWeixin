export const request = (config, contentType) => {
	// config.url = 'http://localhost:8080' + config.url;
	config.methods = config.methods;
	if (!config.data) {
		config.data = {};
	}
	let promise = new Promise(function(resolve, reject) {
        uni.request({...config,
            success: (res) => {
                return resolve(res.data)
            },
            fail:(err)=>{
                return reject(err)
            }
        });
	})
	return promise;
};