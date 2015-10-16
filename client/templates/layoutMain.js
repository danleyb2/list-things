Template.layoutMain.onRendered(function() {

});

Template.layoutMain.helpers({

    'top': function () {
        //return lists.find({},{$sort:{votes:-1},$limit:5}).fetch();
    },
    'recent': function () {
        return lists.find({},{sort:{datePosted:-1},limit:5}).fetch();
    }
});

Template.layoutMain.events({

});