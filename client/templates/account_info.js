Template.accountInfo.onRendered(function() {


});
Template.accountInfo.onCreated(function () {

});
Template.accountInfo.helpers({
    'full_name': function () {
        return this.profile.firstname+" "+this.profile.lastname;//
    },
    'firstname': function () {

        return this.profile.firstname;//
    },
    'lastname': function () {
        return this.profile.lastname;//
    },
    'tagline': function () {
        //console.log(Template.instance());
        return this.profile.tagline;
    },
    'favoriteCount': function () {
        return 45;
    },
    'listCount': function () {
        return lists.find({'createdBy': this._id}, {}).count();
    },
    'new': function () {
        return 1;
    }
});

Template.accountInfo.events({
    'click .edit': function (e) {
        r=this;
        t=Template.instance();
        e.preventDefault();
        //console.log(Template.instance());

    },
    'click .downvote': function (e) {
        e.preventDefault();
        Meteor.call('listDownVote', this._id);

    },
    'click #share': function (e) {
        e.preventDefault();
    },
    'click .fav': function (e) {
        e.preventDefault();
        Meteor.call('listFav', this._id);
    },
    'click #upe': function (e) {
        e.preventDefault();
    }

});

//username
Template.usernameTemplate.onRendered(function () {
    Session.set('u-edit',false);
   // console.log(this);
});
Template.usernameTemplate.onCreated(function () {
    //todo this.ibedit=new ReactiveVar(false);
});
Template.usernameTemplate.helpers({
    'edit': function () {
        return Session.get('u-edit');
        // todo return this.ibedit.get();
}
});
Template.usernameTemplate.events({
    'click .edit': function (e) {
        e.preventDefault();
        Session.set('u-edit',true);
        //todo this.ibedit.set(true);
        //e.stopImmediatePropagation();
        //e.stopPropagation();
    },
    'click .cancel': function (e) {
        e.preventDefault();
        Session.set('u-edit',false);

    },
    'click .save': function (e) {
        e.preventDefault();
        Meteor.call("setUsername",Template.instance().find('input').value, function () {
            Session.set('u-edit',false);
        });
    }
});
//end username

//fullname
Template.fullnameTemplate.onRendered(function () {
    Session.set('f-edit',false);
});

Template.fullnameTemplate.helpers({
    'edit': function () {
        return Session.get('f-edit');
    }
});
Template.fullnameTemplate.events({
    'click .edit': function (e) {
        e.preventDefault();
        Session.set('f-edit',true);
        //e.stopImmediatePropagation();
        //e.stopPropagation();

    },
    'click .cancel': function (e) {
        e.preventDefault();
        Session.set('f-edit',false);

    },
    'click .save': function (e) {
        e.preventDefault();

        Meteor.users.update(Meteor.userId(),{$set: {'profile.firstname': Template.instance().find('input#firstname').value}});
        Meteor.users.update(Meteor.userId(),{$set: {'profile.lastname': Template.instance().find('input#lastname').value}});


        Session.set('f-edit',false);

    }
});
//end fullname

//tagline
Template.taglineTemplate.onRendered(function () {

    Session.set('t-edit',false);

});

Template.taglineTemplate.helpers({
    'edit': function () {
        return Session.get('t-edit');
    }
});
Template.taglineTemplate.events({
    'click .edit': function (e) {
        e.preventDefault();
        Session.set('t-edit',true);
        //e.stopImmediatePropagation();
        //e.stopPropagation();

    },
    'click .cancel': function (e) {
        e.preventDefault();
        Session.set('t-edit',false);

    },
    'click .save': function (e) {
        e.preventDefault();
        Meteor.users.update(Meteor.userId(),{$set: {'profile.tagline': Template.instance().find('input#tagline').value}}, function () {
            Session.set('t-edit',false);
        });


    }
});
//end tagline