Template.createList.onRendered(function () {
    //this.$('.container');
    updateFields();
});
Template.createList.helpers({});
Template.createList.events({
    'click #post': function (e) {
        //Submit code
        e.preventDefault();
        //var currentUserId=Meteor.userId();
        Meteor.call('insertNewList', getTags(), getListItems(), getHeading(),function(err,results){
            Router.go('/');
        });

        var list_id;
        //update_items(list_id,item_Objs());
        //update_tags(list_id,tag_Objs());

        function update_tags(list_id, tags) {
            lists.update(list_id, {$set: {tags: tags}});
        }

        function update_items(list_id, items) {
            lists.update(list_id, {$set: {items: items}});
        }

    },

    'click .removeRow': function (e) {
        e.preventDefault();
        removeRow(e.target);
    },
    'click .createField': function (e) {
        e.preventDefault();
        createField(e);
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
