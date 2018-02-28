const axios = require('axios');
const config = require('../auth').config;


//for youtube
const getChannelViews = (appName) => {

    //the appName is also known as the channel Name
    const youTubeName = config.youtube.url.replace('placeholder', appName);

    console.log("youtube url" + youTubeName);

    return axios.get(youTubeName, { headers: config.youtube.headers })
        .catch(error => {
            console.log("an error occured here");
            return "apiRequest failed";
        });

}

//for instagram
const instagramCount = (userName) => {

    const url = config.instagram.replace('placeholder', userName);

    console.log("instagram url is" + url);

    return axios.get(url)
        .catch(error => {
            console.log("an error occured here");
            return "apiRequest failed";
        });

}

//for twitter
const twitterCount = (userName) => {

    const url = config.twitter.replace('twitter_username', userName);

    console.log("twitter url is" + url);

    return axios.get(url)
        .catch(error => {
            console.log("an error occured here");
            return "apiRequest failed";
        });

}

//for soundcloud
const soundcloudCount = (userName) => {

    const url = config.soundcloud.replace('username', userName);

    console.log("soundcloud url is" + url);

    return axios.get(url)
        .catch(error => {
            console.log("an error occured here");
            return "apiRequest failed";
        });

}

//for Facebook
const facebookCount = (userName) => {

    const url = config.facebook.replace('fanPageName', userName);

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