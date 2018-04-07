const mongoose = require('mongoose');
const Types = require('mongoose').SchemaTypes;
const passportLocalMongoose = require('passport-local-mongoose');

const MembersSchema = mongoose.Schema({
    name: {type: String, noedit: true},
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    birthday: {type: String, noedit: true},
    gender: { type: String, required: false},
    keyAccess: { type: Types.Boolean, require:false},
    program: {type: String},
    timestamp: {type: String, required:true}
},{
    strict: false,
    strictQuery: false // Turn on strict mode for query filters
});

MembersSchema.method('userPassword',function(){
    return this.password;
})

MembersSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('members', MembersSchema);