import {
	request
} from '../request.js'
 
 
export const getData = data => {
	return request({
		url: "/index/list",//对应mock中的接口
		method: 'GET',//对应mock中的请求的type
		data
	})
}
export const getManList = data => {
	return request({
		url: "/man/list",//对应mock中的接口
		method: 'GET',//对应mock中的请求的type
		data
	})
}