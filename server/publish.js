Meteor.publish('theLists', function(){
    //current user id =this.userId
    return lists.find({},{sort: {datePosted: -1}, limit: 10});
});
Meteor.publish('theItems', function(){
    return items.find();
});
Meteor.publish('theTags', function(){
    return tags.find();
});
Meteor.publish('theNotifications', function(){
    if (this.userId) {
        return notifications.find({toUser: this.userId}, {sort: {date: -1}, limit: 20});
    }
});
Meteor.publish("userName", function () {
    return Meteor.users.find({},
        {fields:
        {
            services: 0,
            /*'profile':1,*/
            'createdAt':0
        }
        });

});


/*
 // publish dependent documents and simulate joins
 Meteor.publish("roomAndMessages", function (roomId) {
 check(roomId, String);
 return [
 Rooms.find({_id: roomId}, {fields: {secretInfo: 0}}),
 Messages.find({roomId: roomId})
 ];
 });
 */