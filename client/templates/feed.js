Template.feed.onRendered(function() {


});


Template.feed.helpers({
    'lItems': function () {
        var currentlistHeading = Meteor.userId();
        return lists.find({heading: currentlistHeading}, {sort: {id: -1, name: 1}});
    },
    'list': function () {
        return lists.find({}, {sort: {datePosted: -1}}).fetch();
    }
});