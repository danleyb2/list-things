var NonEmptyString = Match.Where(function (x) {
    check(x, String);
    return x.length !== 0;
});


Meteor.methods({
    'sendLogMessage': function(){
        console.log("Hello world");
    },
    'insertNewList':function(listTags,listItems,listList){
        //insert tags       v1
        //insert items
        //insert list with the ids

        //insert list heading to get id    v2
        //insert items with id
        //insert tags with id
        //update list with tag items ids


        //rather just create a list id from db v3

        var listId=new Mongo.ObjectID;



        // console.log(listTags);
        function tag_ObjIds() {
            var tag_ids = [];
            listTags.forEach(function (tag) {
                tag_ids.push(tags.insert({//todo:use upset
                    name: tag,
                    listId:listId,
                    count:1
                    //createdBy:Meteor.userId()
                    //insert if not exist
                }));
            });
            return tag_ids;
        }
        // console.log(listItems);
        function item_ObjIds() {
            var item_ids = [];
            listItems.forEach(function (item) {
                item_ids.push(items.insert({
                    item: item,
                    listId:listId,
                    createdBy:Meteor.userId(),
                    position: "",//to use in displaying
                    ups: [],//default 0
                    downs: [],//default 0
                    dateAdded: new Date()
                }));
            });

            return item_ids;
        }


        //console.log(listList);
        lists.insert({
            _id:listId,
            heading:listList,
            createdBy:Meteor.userId(),
            items:item_ObjIds(),//[] items id
            tags:tag_ObjIds(),//[] tags ids
            upVotes:[],
            shares:0,
            datePosted:new Date(),//todo:use getTime
            favs:[],
            downVotes:[]

        });





    },
    'updateList':function(listTags,listItems,listList){

        var listid=listList.d;
        console.log(listid);

        //update list heading heading
        lists.update(listid, {$set: {heading: listList.v}});
        //update list tags  tag


        //update list items item


        // console.log(listTags);
        function tag_ObjIds() {
            var tag_ids = [];
            listTags.forEach(function (tag) {
               // console.log(tag);
                if(tag.d=='') {
                    tag_ids.push(tags.insert({
                        name: tag.v,
                        listId: listid
                        //createdBy:Meteor.userId()
                        //insert if not exist
                    }));
                }else{
                    tags.update(tag.d, {$set: {name: tag.v}},{multi: false});
                }
            });
            return tag_ids;
        }
        // console.log(listItems);
        function item_ObjIds() {
            var item_ids = [];
            listItems.forEach(function (item) {
                console.log(item);

                if(item.d=='') {
                    console.log(item);
                    item_ids.push(items.insert({
                        item: item.v,
                        listId: listid,
                        createdBy: Meteor.userId(),
                        position: "",//to use in displaying
                        ups: [],//default 0
                        downs: [],//default 0
                        dateAdded: new Date()
                    }));
                }else{

                    items.update(item.d, {$set: {item: item.v}},{multi: false});
                }
            });

            return item_ids;
        }

        //var i=item_ObjIds();
        //var t=tag_ObjIds();
        //console.log(i);
        //console.log(t);

       // lists.update(listid,{ $push: { items: { $each: i},tags: { $each: t}} });



    },
    'deleteList': function (listId) {
        //todo:delete items of the list too
        lists.remove({_id:listId,createdBy:Meteor.userId()});
    },
    'deleteItem': function (itemId) {
        //todo:update list, remove from set
        items.remove({_id:itemId,createdBy:Meteor.userId()});
    },
    'deleteTag': function (tagId) {
        //todo:update list, remove from set and decrement tags count
       // lists.remove({_id:listId,createdBy:Meteor.userId()});
    },
    'setUsername': function (newUsername) {

        Meteor.setUsername(Meteor.userId(), newUsername);
    },
    'setTagLine': function (newTagline) {
        //Accounts.setUsername(Meteor.userId(), newUsername);
        Meteor.users.update(Meteor.userId,{$upset: {'profile.tagline': newTagline}});

    },
    'listUpVote': function (listId) {
        if(Meteor.userId()!=null) {
            lists.update(listId, {$addToSet: {upVotes: Meteor.userId()}});
            var creator=lists.findOne({_id:listId}).createdBy;
            if(creator!=Meteor.userId()) {

                var notif = {
                    creator: Meteor.userId(),
                    type: 'listUpVote',
                    toUser: creator,
                    to: listId,//use the user id instead
                    date: new Date(),
                    seen: false
                };
                notifications.insert(notif);
            }
        }else{
            //user should login
        }
    },
    'listDownVote': function (listId) {
        if(Meteor.userId()!=null) {
            lists.update(listId, {$addToSet: {downVotes: Meteor.userId()}});
            var creator=lists.findOne({_id:listId}).createdBy;
            if(creator!=Meteor.userId()) {
                var notif = {
                    creator: Meteor.userId(),
                    type: 'listDownVote',
                    toUser: creator,
                    to: listId,//use the user id instead
                    date: new Date(),
                    seen: false
                };
                notifications.insert(notif);
            }
       }
    },
    'listItemUpVote': function (listItemId) {
        if(Meteor.userId()!=null) {
            items.update(listItemId, {$addToSet: {ups: Meteor.userId()}});
            var creator=items.findOne({_id:listItemId}).createdBy;
            if(creator!=Meteor.userId()) {
                var notif = {
                    creator: Meteor.userId(),
                    type: 'listItemUpVote',
                    toUser: creator,
                    to: listItemId,//use the user id instead
                    date: new Date(),
                    seen: false
                };
                notifications.insert(notif);
            }
        }
    },
    'listItemDownVote': function (listItemId) {
        if(Meteor.userId()!=null) {
            items.update(listItemId, {$addToSet: {downs: Meteor.userId()}});
            var creator=items.findOne({_id:listItemId}).createdBy;
            if(creator!=Meteor.userId()) {
                var notif = {
                    creator: Meteor.userId(),
                    type: 'listItemDownVote',
                    toUser: creator,
                    to: listItemId,//use the user id instead
                    date: new Date(),
                    seen: false
                };
                notifications.insert(notif);
            }
        }
    },
    'listFav': function (listId) {
        if(Meteor.userId()!=null) {
            //userData.update(favLists, {$push: {favs: listId} });
            lists.update(listId, {$addToSet: {favs: Meteor.userId()}});
        }
    },
    'createAUser': function (options) {
        Accounts.createUser( options , function(err){
            if( err ) console.log( err.message );
            console.log('user created');
        });
    },
    'userFullName': function (userID) {
           //return getUserFullName(userID);
    },
    'userName': function (userID) {
        //return getUserName(userID);
    }
});