module.exports = function(objectId){
    return{
        content     : { type: String, default : ""},
        creationDate: { type: Date, default : Date.now},
        user        : { type: objectId, ref: 'user' },
        ticket      : { type: objectId, ref: 'ticket' }
    }
};