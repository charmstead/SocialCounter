const axios = require('axios');
var path = require('path');
var qs = require('qs');
const Proxy = require('../model/proxySchema')
const options = require('../config')
const proxies = require('./proxy')


let counter = 0;

// let lineReader = require('readline').createInterface({
//     input: require('fs').createReadStream(path.join(__dirname, 'proxy.txt'))
// });

// lineReader.on('line', function (line) {
//     counter++;
//     setTimeout(() => {
//         let proxy_address = line.split(":");
//         let proxy = { host: proxy_address[0], port: proxy_address[1] }
//         options.proxy=proxy;
//         console.log('proxy:', proxy);
//         console.log(counter)
//         axios(options)
//             .then(res => {
//                 console.log(res)
//             })
//             .catch(error => {
//                 console.log("error");

//             });


//     }, 2000 * counter);

// });


// try {

//     Proxy.insertMany(proxies, (err, result) => {

//       console.log("Successfully added proxies")
//     })
//   }
//   catch (e) {
//      console.log("Error occurred")
//   }



Proxy.find({ 'used': false,'status':{$ne:'bad'} }, (err, prxy) => {

    prxy.map((p, i) => {

        setTimeout(() => {
            console.log(i)

            let proxy_address = p.proxy.split(":");
            let proxy = { host: proxy_address[0], port: proxy_address[1] }
            options.proxy = proxy;
            console.log(proxy)
            axios(options)
                .then(res => {
                    console.log(res)
                    if (res.data.length < 2) {
                        Proxy
                            .findByIdAndUpdate(p._id,
                                {
                                    '$set': { used: true }
                                }, (err, od) => {
                                })
                    }
                })
                .catch(error => {
                    console.log("error");

                    Proxy
                        .findByIdAndUpdate(p._id,
                            {
                                '$set': { used: true,status:'bad' }
                            }, (err, od) => {
                            })

                });

        }, i * 2000)
    })

})