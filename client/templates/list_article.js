Template.loginBanner.onRendered(function() {

});

Template.list_article.helpers({
    'listItems': function () {
        //console.log(this);
        return items.find({_id: {$in: this.items}}).fetch();
    },
    'tagItems': function () {
        //console.log(this);
        return tags.find({_id: {$in: this.tags}}).fetch();
    },
    'getUser': function () {
        var rtn=  Meteor.users.findOne({_id:this.createdBy});
        if(rtn){
            return rtn.profile.firstname+ ' '+rtn.profile.lastname;
        }
    },
    'forUser': function () {
        return this.createdBy == Meteor.userId();
    },
    'itemsCount': function () {
        return this.items.length;
    },
    'upsCount': function () {
        return this.ups.length;
    },
    'downsCount': function () {
        return this.downs.length;
    },
    'upVotesCount': function () {
        return this.upVotes.length;
    },
    'downVotesCount': function () {
        return this.downVotes.length;
    },
    'favsCount': function () {
        return this.favs.length;
    },
    'dateFormated': function () {
        var dt = this.datePosted;
        //return dt.toLocaleString();
        return nicerDateFrom(dt.getTime());
    },
    'objID': function () {
        //console.log(this);
        return this._id._str;
    }


});
Template.list_article.events({
    'click .upvote': function (e) {
        e.preventDefault();
        //console.log(trg);
        Meteor.call('listUpVote', this._id);
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
    'click .litem a.up': function (e) {
        e.preventDefault();
        //console.log(e.target.id);
        Meteor.call('listItemUpVote', this._id);
    },
    'click .litem a.down': function (e) {
        e.preventDefault();
        Meteor.call('listItemDownVote', this._id);
    },
    'click .delete-list': function (e) {
        e.preventDefault();
        Meteor.call('deleteList', this._id);

    },
    'click #upe': function (e) {
        e.preventDefault();
    }

});
