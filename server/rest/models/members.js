const mongoose = require('mongoose');
const Types = require('mongoose').SchemaTypes;
const passportLocalMongoose = require('passport-local-mongoose');


var addressModelSchema = new mongoose.Schema({
    latitude: String,
    longitude: String})

mongoose.model('location',addressModelSchema ,'location' )

const MembersSchema = mongoose.Schema({
    name: {type: String, noedit: true},
    username: { type: String, index: { unique: true } },
    password: { type: String},
    profession: {type: String, required: true},
    birthday: {type: String, noedit: true},
    gender: { type: String, required: false},
    location: { latitude: String, longitude: String},
    timestamp: {type: String, required:true},
    photo: { type: String }
},{
    strict: false,
    strictQuery: false // Turn on strict mode for query filters
});

// MembersSchema.pre('save', function(next) {
//     var doc = this;
//     counter.findByIdAndUpdateAsync({_id: 'entityId'}, {$inc: { seq: 1} }, {new: true, upsert: true}).then(function(count) {
//         console.log("...count: "+JSON.stringify(count));
//         doc.name = count.seq;
//         next();
//     })
//     .catch(function(error) {
//         console.error("counter error-> : "+error);
//         throw error;
//     });
// });
MembersSchema.method('userPassword',function(){
    return this.password;
})

MembersSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('members', MembersSchema);