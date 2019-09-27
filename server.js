const express = require('express');
const puppeteer = require('puppeteer');
const absolutify = require('absolutify')
const app = express();

const Port = process.env.PORT || 5000

app.get('/',async (req,res)=>{
    const {url} = req.query
    console.log(req.query)
    if(!url){
        return res.send('you need a url dummy')
    }else{
        try{
            const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(`https://${url}`)

        let document = await page.evaluate(()=> document.documentElement.outerHTML)
        document = absolutify(document,`/url=${url.split('/')[0]}`)
        return res.send(document)
        }catch (e){
            return res.send(e)
        }
        
    }
})

app.listen(Port,()=>{console.log('app listening')})