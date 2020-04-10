//index.hbms 의 자바스크립트 파일 

const usnewsBtn=document.querySelector('#us')
const krnewsBtn=document.querySelector('#kr')
const newsForm=document.querySelector('form')
const search=document.querySelector('input')
const mess=document.querySelector("#title")
const mess1=document.querySelector("#err")
const mess2=document.querySelector("#news1")
const link1=document.querySelector("#link1")

const mess3=document.querySelector("#err2")
const mess4=document.querySelector("#news2")
const link2=document.querySelector("#link2")
usnewsBtn.addEventListener('click',()=>{
    const country='us'
    mess1.textContent='Loading...'
    mess2.textContent='';
    fetch('/news/country?country='+country).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                //paragraph 의 내용을 manipulate 가능
                mess1.textContent=data.error
            }else{
                mess.textContent='United States Breaking News'
                mess1.textContent=data.news.title
                mess2.textContent=data.news.description;
                link1.textContent=data.news.url;
                link1.href = data.news.url;
                mess3.textContent=data.news2.title;
                mess4.textContent=data.news2.description
                link2.textContent=data.news2.url;
                link2.href = data.news.url;
               
            }
        })
    })
    })
krnewsBtn.addEventListener('click',()=>{
    const country='kr'
    mess1.textContent='Loading...'
    mess2.textContent='';
    fetch('/news/country?country='+country).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                //paragraph 의 내용을 manipulate 가능
                mess1.textContent=data.error
            }else{
                mess.textContent='한국 실시간 뉴스'
                mess1.textContent=data.news.title
                mess2.textContent=data.news.description;
                link1.textContent=data.news.url;
                link1.href = data.news.url;
                mess3.textContent=data.news2.title;
                mess4.textContent=data.news2.description
                link2.textContent=data.news2.url;
                link2.href = data.news.url;
            }
        })

})
})
newsForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const keyword = search.value
    console.log(keyword)
    mess1.textContent='Loading...'
    mess2.textContent='';
    fetch('/news/search?keyword='+keyword).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            //paragraph 의 내용을 manipulate 가능
            mess1.textContent=data.error
        }else{
            mess.textContent='Related News'
            mess1.textContent=data.news.title
            mess2.textContent=data.news.description;
            link1.textContent=data.news.url;
            link1.href = data.news.url;
            mess3.textContent=data.news2.title;
            mess4.textContent=data.news2.description
            link2.textContent=data.news2.url;
            link2.href = data.news.url;
        }
    })
})
})
//eventhandler 
