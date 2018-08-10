const axios = require('axios');
var path = require('path');
var qs = require('qs');
const Proxy = require('../model/proxySchema')
const options = require('../config')


let counter = 0;

let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(path.join(__dirname, 'proxy.txt'))
});

lineReader.on('line', function (line) {
    counter++;
    setTimeout(() => {
        let proxy_address = line.split(":");
        let proxy = { host: proxy_address[0], port: proxy_address[1] }
        options.proxy=proxy;
        console.log('proxy:', proxy);
        console.log(counter)
        axios(options)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log("error");
               
            });

        
    }, 2000 * counter);

});

Proxy.find({ 'used': false },(err,prxy)=>{
    
    prxy.map((p,i)=>{

        setTimeout(() => {

            Proxy
            .findByIdAndUpdate(p._id,
                { 
                    '$set': { used: true } }, (err, od) => {
                })

            let proxy_address = p.proxy.split(":");
            let proxy = { host: proxy_address[0], port: proxy_address[1] }
            options.proxy=proxy;
            axios(options)
            .then(res => {
                console.log(res.statusCode)
            })
            .catch(error => {
                console.log("error");
               
            });

        },i*1500)
    })

})