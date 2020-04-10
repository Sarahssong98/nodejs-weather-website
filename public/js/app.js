//index.hbms 의 자바스크립트 파일 


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const mess1=document.querySelector("#err")

const mess2=document.querySelector("#weather")
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