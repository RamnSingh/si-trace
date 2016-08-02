var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/trace');

var Schema   = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    schemas  = require('./schemas')(ObjectId);

/*

mongoose.model('users', new Schema({
    username    : String,
    password    : String,
    firstName   : String,
    lastName    : String,
    email       : String,
    dateOfBirth : Date
}));
mongoose.model('tickets', new Schema({
    summary     : String,
    description : String,
    priority    : String,
    status      : String,
    creationDate: Date,
    ticket      : ObjectId
    
}));
mongoose.model('comments', new Schema({
    content     : String,
    creationDate: Date,
    user        : ObjectId,
    ticket      : ObjectId
}));
*/
module.exports = {
    ObjectId  : ObjectId,
    user      : mongoose.model('user', new Schema(schemas.user)),
    ticket    : mongoose.model('ticket', new Schema(schemas.ticket)),
    comment   : mongoose.model('comment', new Schema(schemas.comment))
};