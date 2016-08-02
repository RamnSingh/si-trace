module.exports = function(objectId){
    return{
        summary     : String,
        description : String,
        priority    : String,
        status      : {type: String, default : "New"},
        creationDate: {type: Date, default : Date.now},
        user        : { type: objectId, ref: 'user' },
        owner       : { type: objectId, ref: 'user' },
        comments    : [{ type: objectId, ref: 'comment' }]
    }
};