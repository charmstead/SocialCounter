const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proxySchema = new Schema({
    
            proxy:{ type: Schema.Types.String, unique:true},
            used:{type: Boolean, default:false},
            status:{type:String,default:'good'},
            created_at: {type:Date, default:Date.now}
});

module.exports = mongoose.model('Proxy', proxySchema);
