 nicerDateFrom=function(list_date) {

    //diff times in milliseconds
    var second  =    1000;           // 1000 milliseconds in a second
    var minute  =    60 * second;    // 60 seconds in a minute
    var hour    =    60 * minute;    // 60 minutes in an hour
    var day     =    24 * hour;      // 24 hours in a day
    var week    =    day*7;          // 7 days in a week
    var month   =    day*30;         // '30' days in a month
    // total   number of days


    timeDiff = new Date().getTime() - list_date;

    var weeks   = Math.floor(timeDiff / week);
    var hours   = Math.floor(timeDiff / hour);
    var mins    = Math.floor(timeDiff / minute);
    var rMins   = timeDiff % minute;
    var seconds = Math.floor(timeDiff / second);
    var days    = Math.floor(timeDiff / day);
    var months  = Math.floor(timeDiff / month);


    //seconds less than a 60secs(a min)
    //diplay no of minutes opt seconds
    if (seconds < 60) {
        if (seconds > 3) {
            return seconds + ' seconds ago';
        } else {
            return 'just now';
        }
    }

    // min less than a 60mins( an hour)
    //display no of hours opt with seconds
    else if (mins < 60) {
        return (mins > 1) ? (mins + ' mins ago') : ('a min ago')
    }
    // hours less than a 24( a day)
    else if (hours < 24) {
        if ((mins%60)>1){
            return (hours > 1) ? (hours + ' hrs '+mins%60+' mins ago'):('an hour ago');
        }else{
            return (hours > 1) ?(hours + ' hrs ago') : ('an hour ago');
        }

    }
    // days less than a 7( a week)
    else if (days < 7) {
        //date greater than a 24 hrs
        //display no of days  opt with hours
        return (days > 1) ? (days + ' days ago') : ('a day ago')
    }

    // days greater than a 7 but less than 30( a month)
    else if (days < 30) {

        return (Math.floor(days / 7) + ' weeks and ' + days % 7 + ' days ago');
    }

    //if date is a month older than current date..
    else if (days > 30) {
        console.log(months);
        if (months >= 12) {

            date_str = new Date(list_date).toDateString();
            date_to = date_str.substr(date_str.indexOf(' ') + 1);
            return (date_to);
        } else {
            return (months > 1) ? (months + ' months ago') : ('a month ago')

        }
    }
};


//if(Meteor.isServer){

    getUserFullName =function (userid) {
        var rtn=  Meteor.users.findOne({_id:userid});
        if(rtn){
           return rtn.profile.firstname+ ' '+rtn.profile.lastname;
        }
        console.log('Nothing');
    };

    getUserName= function (userid) {
        var rtn= Meteor.users.findOne({_id:userid});
        if(rtn){
            return rtn.username;
        }
    };
    getActionType= function (action) {
        switch (action){
            case 'listUpVote':
                return 'uped your list ';
            case 'listItemUpVote':
                return 'uped your list item';
            case 'listDownVote':
                return 'downed your list ';
            case 'listItemDownVote':
                return 'downed  your list Item';
        }

    };
    getTimeFormated= function (dt) {
        return nicerDateFrom(dt);
    };
//}