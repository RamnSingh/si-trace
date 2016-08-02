module.exports = function(objectId){
    return{
        comment : require('./comment')(objectId),
        ticket  : require('./ticket')(objectId),
        user    : require('./user')
    }
};