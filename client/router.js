
Router.configure({
  layoutTemplate: 'layoutMain',
   loadingTemplate: 'loading'
});
Router.route('/second', function () {
    this.render('secondPage');
    this.layout('mainSide');
});
Router.route('/new', {
    onBeforeAction: function(){
        console.log(this.params._id);
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            //Router.go('/login');
            this.render('loginForm');
        }
        },
    template:'createList'
});
Router.route('/edit/:_id', {
    onBeforeAction: function(){
        //console.log();
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
            //console.log(this);
        } else {
            //Router.go('/login');
            this.render('loginForm');
        }
    },
    data: function(){
        return lists.findOne({_id:new Mongo.ObjectID(this.params._id)});
    },
    waitOn:this.data,
    name:'edit',
    template:'editList'
});
Router.route('/profile',{
    //name:'my_account_info',
    template:'account_info',
    data: function(){
        console.log(Meteor.user());
        return Meteor.user();
    },
    waitOn: function(){
        //return Meteor.subscribe('userData');
    },
    subscriptions: function(){
        //return Meteor.subscribe('userData');
    }
});
Router.route('/account_info/:createdBy',{
    name:'account_info',
    data: function(){
        var usr=this.params.createdBy;
        console.log(Meteor.users.findOne({_id:usr}));
        return Meteor.users.findOne({_id:usr});

    },
    waitOn: function(){
        //return Meteor.subscribe('lists');
    },
    subscriptions: function(){
        //return Meteor.subscribe('todos');
    }
});
Router.route('/login',{
template:'loginForm',
    name:'login'
});
Router.route('/signup',{
    template:'signupForm',
    name:'signup'
});
Router.route('/',{
    template:'main'
});
/*
 Router.route('/', function () {
 this.render('firstPage');
 this.layout(Meteor.user() ? 'mainSide' : 'mainNav');
 });
 Router.route('/second', function () {
 this.render('secondPage');
 this.layout(Meteor.user() ? 'mainSide' : 'mainNav');
 });

 Router.route('/list/:_id', {
 name: 'listPage',
 template: 'listPage',
 data: function(){
 var currentList = this.params._id;
 var currentUser = Meteor.userId();
 return Lists.findOne({ _id: currentList, createdBy: currentUser });
 },
 onRun: function(){
 console.log("You triggered 'onRun' for 'listPage' route.");
 this.next();
 },
 onRerun: function(){
 console.log("You triggered 'onRerun' for 'listPage' route.");
 },
 onBeforeAction: function(){
 console.log("You triggered 'onBeforeAction' for 'listPage' route.");
 var currentUser = Meteor.userId();
 if(currentUser){
 this.next();
 } else {
 this.render("login");
 }
 },
 onAfterAction: function(){
 console.log("You triggered 'onAfterAction' for 'listPage' route.");
 },
 onStop: function(){
 console.log("You triggered 'onStop' for 'listPage' route.");
 }
 });


 */