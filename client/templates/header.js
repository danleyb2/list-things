Template.header.onRendered(function() {

});
Template.header.helpers({
    'currentUserName': function () {
        return 'Hi ' + Meteor.user().username;
    },
    'currentUserId': function () {
        return Meteor.userId();
    }
});
Template.header.events({
    'click #toggle-accountInfo': function (e) {
        //e.preventDefault();
        //$('.account-info').slideToggle(700);

    },
    'click #open': function (e) {
        /*e.preventDefault();
        $('#mform').slideToggle(300);
        //$(e.target).toggleClass('close');
        $('.listForm').slideToggle(2000);
        //$(e.target).html='Good idea..';
        */
    },
    'click .disp-notf': function (e) {
        e.preventDefault();
        $('#mform').slideToggle(300);

    },
    'click #openListForm': function (e) {
        /*e.preventDefault();
        $('.listForm').slideToggle(1000);
        //$('.feed').toggleClass('mt60');
        */
    },

    'click #signout': function (e) {
        e.preventDefault();
        Meteor.logout(function (err) {
            if (err) {
                console.log('logout failure' + err);
            }
        });
    }
});