const express=require("express");
const https=require("https");
const router=express.Router();


router.get('/a',(req,res,next)=>{
    console.log("inside fetch news");
    https.get('https://time.com/',(response)=>{
        let html='';
        response.on('data',(chunk)=>{
            html+=chunk;
        });
        response.on('end',()=>{
            console.log("typeof",typeof(html));
            var finalhtml=html.slice(72998,75190);
            strarr=finalhtml.split(" ");
            length=strarr.length;
            var count=0,flag=0,mainarr=[];
            var newsarray=[
                {title:'',link:''},
                {title:'',link:''},
                {title:'',link:''},
                {title:'',link:''},
                {title:'',link:''},
            ]
            for(i=0;i<length;i++){
                if(strarr[i].includes('href')){
                    linkbeta=strarr[i].split('/');
                    newsarray[count].link='http://'+linkbeta[1]+'/'+linkbeta[2];
                    count++;
                    flag=1
                }   
                if(strarr[i].includes("</h2>")) {
                    mainarr.push(strarr[i]);
                    flag=0;
                }
                if(flag==1){
                    mainarr.push(strarr[i]);
                }
             }
            mainarrjoin=mainarr.join(" ");
            mainarrsplit=mainarrjoin.split(">");
            mainarrspitlength=mainarrsplit.length;
            m=0;
            n=0
            while(m<=mainarrspitlength){
                if(m==1||m==4||m==7||m==10||m==13){
                    t1=mainarrsplit[m].slice(0,-3);
                    newsarray[n].title=t1;
                    n++;
                }
                m++;
            }
            var my = JSON.stringify(newsarray);
            console.log(my);
            res.send(my);
            res.end();
        })
    });
})
module.exports=router;