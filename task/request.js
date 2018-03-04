const axios = require('axios');
const config = require('../auth').config;


//for youtube
const getChannelViews = (appName) => {

    //the appName is also known as the channel Name
    const youTubeName = appName ?config.youtube.url.replace('placeholder', appName) :null;

    console.log("youtube url" + youTubeName);

    return axios.get(youTubeName, { headers: config.youtube.headers })
        .catch(error => {
            console.log("an error occured here");
            return "apiRequest failed";
        });

}

//for instagram
const instagramCount = (userName) => {

    const url = userName ?config.instagram.replace('placeholder', userName):null;

    console.log("instagram url is" + url);

    return axios.get(url)
        .catch(error => {
            console.log("an error occured here");
            return "apiRequest failed";
        });

}

//for twitter
const twitterCount = (userName) => {

    
    const url = userName ? config.twitter.replace('twitter_username', userName):null;

    console.log("twitter url is" + url);

    return axios.get(url)
        .catch(error => {
            console.log("an error occured here");
            return "apiRequest failed";
        });

}

//for soundcloud
const soundcloudCount = (userName) => {

    const url = userName ?config.soundcloud.replace('username', userName):null;

    console.log("soundcloud url is" + url);

    return axios.get(url)
        .catch(error => {
            console.log("an error occured here");
            return "apiRequest failed";
        });

}

//for Facebook
const facebookCount = (userName) => {

    const url = userName ? config.facebook.replace('fanPageName', userName):null;

    console.log("facebook page url is" + url);

    return axios.get(url)
        .catch(error => {
            console.log("an error occured here");
            return "apiRequest failed";
        });

}

module.exports = {
    getYoutubeCount: getChannelViews,
    getInstagramCount: instagramCount,
    getTwitterCount: twitterCount,
    getSoundcloudCount: soundcloudCount,
    getFacebookCount: facebookCount
}