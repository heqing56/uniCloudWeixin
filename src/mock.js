const Mock = require('better-mock/dist/mock.mp.js')
 
Mock.mock('/index/list', 'GET', {
	"code": 1,
	"msg": "succsee",
	"data": {
        'list|150':[
            {
                name:'@cname',
                'src|1-13':0,
                'des':'@cparagraph(1,2)',
                'time':'@date(MM-dd)',
                'id|+1':111111
            }
        ]
		
	}
})
Mock.mock('/man/list', 'GET', {
	"code": 1,
	"msg": "succsee",
	"data": {
        'list|250':[
            {
                name:'@cname',
                'src|1-13':0,
                'id|+1':111111
            }
        ]
		
	}
})

 