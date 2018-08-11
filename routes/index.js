var express = require('express');
var router = express.Router();
const client = require('../task/request');
const axios = require('axios');
const Proxy = require('../model/proxySchema')

const options = require('../config')


//popularity stats
const fbFanCount = 89052564;
const igFollowersCount = 109150263.3;
const twitterFollowersCount = 79012167.9;
const youtubeViews = 11705847569.7;
const soundcloud = 2950743.2;
const snapchatFollowersCount = 15772500;



/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Welcome to socialCounter', email: 'tomideso@gmail.com' });
});


/* POST new proxy */
router.post('/proxy', function (req, res, next) {
  let proxies = req.body.proxies;


  try {

    Proxy.insertMany(proxies, (err, result) => {

      res.send("Successfully added proxies")
    })
  }
  catch (e) {
    return res.send("Error occurred")
  }

});

router.get('/all', function (req, res, next) {
  let proxies = req.body.proxies;

  Proxy.find({'status':{$ne:'bad'} },(err,prxy)=>{

    prxy.map((p,i)=>{

      setTimeout(() => {

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

      res.send(proxy);
  })

});


/* Get proxy not used */
router.get('/proxy', function (req, res, next) {
  let proxies = req.body.proxies;

  Proxy.find({ 'used': false },(err,proxy)=>{

      res.send(proxy);
  })

});


//we make post request to this route to interact with the api

router.post('/socialcount', function (req, res, next) {

  console.log(req.body.youtube);

  const youtube = req.body.youtube || null;
  const instagramId = req.body.instagramId || null;
  const twitterId = req.body.twitterId || null;
  const soundcloudId = req.body.soundcloudId || null;
  const facebookId = req.body.facebookId || null;


  axios.all([

    client.getYoutubeCount(youtube),
    client.getInstagramCount(instagramId),
    client.getTwitterCount(twitterId),
    client.getSoundcloudCount(soundcloudId),
    client.getFacebookCount(facebookId)

  ]).then(axios.spread((res1, res2, res3, res4, res5) => {

    //the response will be sent as json to the requester
    processResponse(res1, res2, res3, res4, res5, (result) => {

      return res.json(result);
    });


  })).catch((err1) => {

    console.log("debugging what actually happened" + err1);
    return res.send(err1);

  });

});



//performs neccessary calculations.
processResponse = (res1, res2, res3, res4, res5, done) => {

  //RESULT WILL BE COMPUTED HERE
  var result = {
    // youtubeChannelViews: 0,
    // instagramFollowers: 0,
    // twitterFollowers: 0,
    // soundcloud: 0,
    // facebookFanCount: 0
  };

  //commented out so that platform not included in the req body is not sent out at all as zero

  var popularity = {
    // youtube: 0,
    // instagram: 0,
    // twitter: 0,
    // soundcloud: 0,
    // facebook: 0,
    // overall: 0
  };

  count = 0;

  let promise1 = new Promise((resolve, reject) => {

    if (res1.data) {

      const utube = res1.data.items[0]["statistics"].viewCount;
      result.youtubeChannelViews = parseInt(utube);
      console.log(res1.data.items[0]["statistics"]);

      if (result.youtubeChannelViews > 0) {
        count++;
        const urate = (result.youtubeChannelViews / youtubeViews);
        popularity.youtube = Number((urate * 100).toFixed(2));
        if (popularity.youtube) {

          resolve();
        }
      }
      else { reject() }


    } else { reject() }

  }).catch(() => { });

  let promise2 = new Promise((resolve, reject) => {

    if (res2.data) {

      result.instagramFollowers = res2.data.graphql.user.edge_followed_by.count;
      console.log(res2.data.graphql.user.edge_followed_by.count);

      if (result.instagramFollowers > 0) {
        count++;
        const ig = (result.instagramFollowers / igFollowersCount);
        popularity.instagram = Number((ig * 100).toFixed(2));

        if (popularity.instagram) {
          console.log("Instagram is alive...");
          resolve();
        }
      } else { reject() }

    } else { reject() }

  }).catch(() => { });


  let promise3 = new Promise((resolve, reject) => {
    if (res3.data) {
      console.log(res3.data);
      result.twitterFollowers = res3.data[0]['followers_count'];

      if (result.twitterFollowers > 0) {
        count++;
        const twit = (result.twitterFollowers / twitterFollowersCount);
        popularity.twitter = Number((twit * 100).toFixed(2));

        if (popularity.twitter) {
          resolve();
        }
      } else { reject() }


    } else { reject() }

  }).catch(() => { });;


  let promise4 = new Promise((resolve, reject) => {

    if (res4.data) {
      console.log(res4.data);
      result.soundcloud = res4.data['followers_count'];

      if (result.soundcloud > 0) {
        count++;
        const sc = (result.soundcloud / soundcloud);
        popularity.soundcloud = Number((sc * 100).toFixed(2));

        if (popularity.soundcloud) {

          resolve();
        }
      } else { reject() }


    } else { reject() }

  }).catch(() => { });;


  let promise5 = new Promise((resolve, reject) => {

    if (res5.data) {
      console.log(res5.data);
      result.facebookFanCount = res5.data.fan_count;

      if (result.facebookFanCount > 0) {
        count++;
        const fb = (result.facebookFanCount / fbFanCount);
        popularity.facebook = Number((fb * 100).toFixed(2));

        if (popularity.facebook) {

          resolve();
        }
      } else { reject() }

    } else { reject() }

  }).catch(() => { });

  Promise.all([promise1, promise2, promise3, promise4, promise5])
    .then(() => {

      popularity.overall = (Object.values(popularity).reduce((a, b) => a + b, 0)) / count;
      popularity.overall = Number(popularity.overall.toFixed(2)) + "%";

      console.log("we are done " + JSON.stringify(popularity));

      done({ result, popularity });
    });



}

module.exports = router;