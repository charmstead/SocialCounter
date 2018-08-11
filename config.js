var qs = require('qs');

const url ='http://faceofzaron.zaron.com.ng/wp-admin/admin-ajax.php?jury=okay';
const data = { 'action':'vote_for_photo','photo_id':'1323','nonce_id':'a60d83da5b'};
const options = {
    method: 'POST',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Referer': 'http://faceofzaron.zaron.com.ng/wp-admin/admin-ajax.php',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent':"Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; ja-jp) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5",
       },
    data: qs.stringify(data),
    url:url
};


module.exports=options;