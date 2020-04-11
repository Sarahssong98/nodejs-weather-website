const request=require('request')
const airNews = (callback)=>{
    var SERVICE_KEY = 'Kw7bbE05Nd5eVBMmixfDxoN2zN7A5ToXfgXywwQxfDto71%2BSap5wQbgdIBYOeCLBpLP7fML%2FBU%2FVHIlQ5MKpiw%3D%3D'
    var url='http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=Kw7bbE05Nd5eVBMmixfDxoN2zN7A5ToXfgXywwQxfDto71%2BSap5wQbgdIBYOeCLBpLP7fML%2FBU%2FVHIlQ5MKpiw%3D%3D&numOfRows=10&pageNo=1&stationName=%EC%84%9C%EC%B4%88%EA%B5%AC&dataTerm=DAILY&ver=1.3&_returnType=json'

    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location services!',undefined);
        }
        else if(response.totalCount===0){
            callback('Unable to find location',undefined)
        }else{            
            
            callback(undefined,{
                air:{
                    time :response.body.list[0].dataTime,
                    ttgrade:response.body.list[0].khaiGrade,
                    mmgrade: response.body.list[0].pm25Grade1h,
                    mmvalue:response.body.list[0].pm25Value

                }, air2:{
                    time :response.body.list[1].dataTime,
                    ttgrade:response.body.list[1].khaiGrade,
                    mmgrade: response.body.list[1].pm25Grade1h,
                    mmvalue:response.body.list[1].pm25Value

                }})
            
        }
    })
}
  // Service Key
 
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

module.exports=airNews