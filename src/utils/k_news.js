const request=require('request')
const date=new Date();
const keywordNews = (keyword,callback)=>{
    const url = 'http://newsapi.org/v2/everything?' +
          'q='+keyword+'&' +
          'from='+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'&'+
          'sortBy=popularity&' +
          'apiKey=0b889214a8814c7c95e641e30265489f';

    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to services!',undefined);
        }else if(response.totalResults===0){
                        callback('Unable to find news',undefined)
                    }else{  
                        callback(undefined,{
                            news:{
                                title:response.body.articles[0].title,
                                description:response.body.articles[0].description,
                                url:response.body.articles[0].url
                            },news2:{
                                title:response.body.articles[1].title,
                                description:response.body.articles[1].description,
                                url:response.body.articles[1].url
                            }
                           })
                    }
    })
}

module.exports=keywordNews