//index.hbms 의 자바스크립트 파일 
const usnewsBtn=document.querySelector('#us')
const krnewsBtn=document.querySelector('#kr')

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const mess=document.querySelector("#title")
const mess1=document.querySelector("#err")
const mess2=document.querySelector("#news1")
const link1=document.querySelector("#link1")

const mess3=document.querySelector("#err2")
const mess4=document.querySelector("#news2")
const mess5=document.querySelector("#link2")
usnewsBtn.addEventListener('click',()=>{
    const location='arizona'
    mess1.textContent='Loading...'
    mess2.textContent='';
    fetch('/weather/search?address='+location).then((response)=>{
        response.json().then((data)=>{
            console.log(data)
            if(data.error){
                //paragraph 의 내용을 manipulate 가능
                mess1.textContent=data.error
            }else{
                mess1.textContent=data.location
                mess2.textContent=data.forecast
                mess3.textContent=""
                mess4.textContent=""
                mess5.textContent=""
            }
        })

    })
})
krnewsBtn.addEventListener('click',()=>{
    const location='seoul'
    mess1.textContent='Loading...'
    mess2.textContent='';
    var result = fetch('/weather/search?address='+location, {
        method: 'get',
      }).then(function(response) {
        return response.json(); // pass the data as promise to next then block
      }).then(function(data) {
        mess1.textContent=data.location
        mess2.textContent=data.forecast
      
        return fetch('weather/air'); // make a 2nd request and return a promise
      })
      .then(function(response) {
        return response.json();
      }).then(function(data_){
        switch(data_.air1.ttgrade){
            case '1':ttgrade="좋음";break;
            case '2':ttgrade="보통";break;
            case '3':ttgrade="나쁨";break;
            case '4':ttgrade="매우 나쁨";break
        }
        switch(data_.air2.mmgrade){
            case '1':mmgrade="좋음";break;
            case '2':mmgrade="보통";break;
            case '3':mmgrade="나쁨";break;
            case '4':mmgrade="매우 나쁨";break
        }
          switch(data_.air2.ttgrade){
            case '1':ttgrade2="좋음";break;
            case '2':ttgrade2="보통";break;
            case '3':ttgrade2="나쁨";break;
            case '4':ttgrade2="매우 나쁨";break
        }
        switch(data_.air2.mmgrade){
            case '1':mmgrade2="좋음";break;
            case '2':mmgrade2="보통";break;
            case '3':mmgrade2="나쁨";break;
            case '4':mmgrade2="매우 나쁨";break
        }
        mess3.textContent="실시간 미세먼지 정보"
        mess4.innerHTML="측정시: "+data_.air1.time+"<br/>"+"통합대기환경수치 : "+ttgrade+"  미세먼지수치 : "+mmgrade
        +"<br/>"+"미세먼지(PM2.5) 농도(단위 : ㎍/㎥) : "+data_.air1.mmvalue
        mess5.innerHTML="측정시: "+data_.air2.time+"<br/>"+"통합대기환경수치 : "+ttgrade2+"  미세먼지수치 : "+mmgrade2
        +"<br/>"+"미세먼지(PM2.5) 농도(단위 : ㎍/㎥) : "+data_.air2.mmvalue
    })
      .catch(function(error) {
        console.log('Request failed', error)
      })
})
//eventhandler 
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    mess1.textContent='Loading...'
    mess2.textContent='';
    fetch('/weather/search?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            //paragraph 의 내용을 manipulate 가능
            mess1.textContent=data.error
        }else{
            mess1.textContent=data.location
            mess2.textContent=data.forecast
        }
    })
    })
})
