let db = uniCloud.database({
  throwOnNotFound:false,
})

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
  if(event.api === 'publish'){
    return await db.collection('message').add({
      content: event.content,
      image: event.image,
      createTime: event.createTime,
    })
  }
  
  if(event.api === 'getMessages'){
    return await db.collection('message').get()
  }
  
	//返回数据给客户端
	return "新消息提醒"
};
