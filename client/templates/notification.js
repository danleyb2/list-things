Template.notificationsT.events({
    'click .disp-notf': function (e) {
        e.preventDefault();
        $('#notfPane').slideToggle(300);

    }
});
Template.notificationsT.helpers({
   notification: function () {
       var notification=[];
       var rtnf=notifications.find().fetch();

       for(rt in rtnf){
           var itm=rtnf[rt];
           //console.log(rt);
           notification.push(
               getUserFullName(itm.creator) + ' ' +
               getActionType(itm.type) + ' ' +
               getTimeFormated(itm.date)
           );
       }
        return notification;
   }
    ,
    'userNotifications': function () {
        return notifications.find({}).count();
    }
});