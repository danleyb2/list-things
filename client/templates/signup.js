Template.signupForm.onRendered(function() {

});
Template.signupForm.helpers({

});
Template.signupForm.events({
    'click #signin': function (e) {
        //e.preventDefault();
        /*better selectors*/

    },
    'click #signup': function (e) {

        e.preventDefault();
        var email =     $('[name=email]').val();
        var password =  $('[name=password]').val();
        var username=   $('[name=username]').val();

        var first =     $('[name=firname]').val();
        var last =      $('[name=secname]').val();


        var options = {
            username: username,
            emails: [{
                address: email,
                verified: false
            }],
            password: password,
            profile: {
                firstname:first,
                lastname: last
            }
        };
        console.log(options);
        Accounts.createUser(options, function (err) {
            if (err) console.log(err.message);
            console.log('user created');
            Router.go('/');
        });
        // Meteor.call('createUser',options);

    }

});