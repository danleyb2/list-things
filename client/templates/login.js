Template.loginForm.onRendered(function() {


});
Template.loginForm.helpers({

});

Template.loginForm.events({
    'click #signin': function (e) {
        e.preventDefault();

        /*better selectors*/
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();


       /* var username = $('input#username')[0].value;
        var email = $('input#email')[0].value;
        var password = $('input#password')[0].value;*/
        console.log(username+' - '+password);
        Meteor.loginWithPassword(username, password, function (err) {
            if (err) {
                console.log('login failure: ' + err.reason);
            }else{
                var currentRoute = Router.current().route.getName();
                if(currentRoute == "login"){
                    Router.go("/");
                }
            }
        });
    }



});