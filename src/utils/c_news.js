const request=require('request')
var endOfLine = require('os').EOL;
const countryNews = (country,callback)=>{
    const url = 'http://newsapi.org/v2/top-headlines?' +
            'country='+country+'&' +
            'apiKey=0b889214a8814c7c95e641e30265489f';
    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to services!',undefined);
        }else if(response.totalResults===0){
                        callback('Unable to find news',undefined)
                    }else{  
                        // const text='Source: '+response.articles[0].source.name
                        // const author='Author: '+response.articles[0].author          
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
// const keywordNews = (keyword,callback)=>{
//     const url = 'http://newsapi.org/v2/everything?' +
//           'q='+keyword+'&' +
//           'from=2020-04-10&' +
//           'sortBy=popularity&' +
//           'apiKey=0b889214a8814c7c95e641e30265489f';

//     request({url,json:true},(error,response)=>{
//         if(error){
//             callback('Unable to connect to services!',undefined);
//         }else if(response.totalResults===0){
//                         callback('Unable to find news',undefined)
//                     }else{  
//                         // const text='Source: '+response.articles[0].source.name
//                         // const author='Author: '+response.articles[0].author          
//                         news="News: "+response.body.articles[0].title+response.body.articles[0].description+"\n"
//                         news2="News: "+response.body.articles[1].title+response.body.articles[1].description+"\n"
//                        callback(undefined,{news,news2})
                        
//                     }
//     })
// }

module.exports=countryNews