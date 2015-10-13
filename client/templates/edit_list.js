Template.editList.onRendered(function() {
    //$(document).ready(orderLabelsItems);
    //console.log(this);
    //todo:subscribe to items of this
    orderLabelsItems();
});
Template.editList.onCreated(function () {

});

Template.editList.__helpers=Template.list_article.__helpers;
Template.editList.events({
    'click #updatePost': function (e) {
        //Submit code
        e.preventDefault();
        console.log(this);
        var headingObj={};
        headingObj.v=getHeadingUp();
        headingObj.d=this._id;
        //var currentUserId=Meteor.userId();
        Meteor.call('updateList', getTagsUp(), getListItemsUp(),headingObj,function(err,results){
            if(!err)Router.go('/');
        });


    },

    'click .removeRow': function (e) {
        e.preventDefault();
        Meteor.call('deleteItem',this._id);
        //removeRow(e.target);
    },
    'click .createField': function (e) {
        e.preventDefault();
        createFieldUp(e);
    },
    'blur #itemsCount': function (e) {
        e.preventDefault();
        (updateFields)();
    },
    'click .tags-parent':function (evt) {
        evt.preventDefault();
        $('input#tags').focus();
    },
    'keyup #tags':function(evt) {
        evt.preventDefault();
        if(evt.keyCode==32){
            var tag=evt.target.value.trim();
            evt.target.value='';
            if($('.theTag').length<8){
                $('#tags-group').append(createTagNode(tag));
            }else{
                //thats enough tags
            }
        }
    }

});