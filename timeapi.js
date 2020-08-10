const express=require("express");
const https=require("https");
const router=express.Router();
const fs=require("fs");



router.get('/a',(req,res,next)=>{
    console.log("inside fetch news");
    https.get('https://time.com/',(response)=>{
        let html='';
        response.on('data',(chunk)=>{
            html+=chunk;
        });
        response.on('end',()=>{
            console.log("typeof",typeof(html));
            var flag1=0,strarr=[];
            fullpagearray=html.split(" ");
            fullpagearrayLength=fullpagearray.length;
            for(var k=0;k<fullpagearrayLength;k++){
                if(fullpagearray[k]=='decoration-arrow">Latest'){
                    flag1=1;
                }
                if(fullpagearray[k]=="<section"){
                    flag1=0;
                }
                if(flag1==1){
                    strarr.push(fullpagearray[k]);
                }
            }
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
                    newsarray[count].link='https://'+linkbeta[1]+'/'+linkbeta[2];
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