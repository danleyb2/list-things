function getListItems(){
    list=[];
    for(var i= 0;i< $(".l-item").size();i++){
        var l=$(".l-item")[i].value.trim();
        if(l!='')list.push(l);
    }
    return list;
}
function getHeading(){
    return $("#heading")[0].value;
}
function upDateTags(){

}
function getTags(){
    //rtAr= $("#tags")[0].value.split(' ');
    return $('.theTag').text().split('#').splice(1);
    return rtAr.map(function(s){
        return s.replace('#','');
    });
}

function getListItemsUp(){
    list=[];
    for(var i= 0;i< $(".l-item").size();i++){
        var l={};
        l.v=$(".l-item")[i].value.trim();
        l.d=$(".l-item")[i].id;
        if(true/*l!=''*/)list.push(l);
    }
    return list;
}
function getHeadingUp(){
    var h=$(".heading")[0];
    return /*{d: h.id,v:*/h.value//};
    console.log(this);
}
function getTagsUp(){
    var list=[];
    var tgObj= $('.theTag');
    for(var i= 0;i< tgObj.size();i++){
        var l={};
        l.v=tgObj[i].innerHTML.trim();
        l.d=tgObj[i].id;
        if(true/*l!=''*/)list.push(l);
    }
    return list;
}
function createFieldUp(evt){
    t=evt;
    var x=$('.item')[0].cloneNode(true);
    x.getElementsByTagName('input')[0].value='';
    x.getElementsByTagName('input')[0].id='';
    x.getElementsByClassName('item_count_label')[0].innerHTML=($('.items')[0].childElementCount+1)+'.';
    $('.items').append(x);
    $('#itemsCount')[0].value=$('.item_count_label').length;

}

function removeRowUp(a){
    if( $('.item_count_label').length==1 ){
        return;
    }
    a.closest('section').remove();
    orderLabelsItems();

}
function getRemoveRowId(a){
    var inputDiv=a.closest('div').previousElementSibling;
    return inputDiv.getElementsByTagName('input')[0].id;
}


function removeRow(a){
    if( $('.item_count_label').length==1 ){
        return;
    }
    a.closest('section').remove();
    orderLabelsItems();

}
function orderLabelsItems(){
    var items=$('.item_count_label');
    var d=items.length;
    $('#itemsCount')[0].value=d;
    for(var i=0;i<d;i++){
        items[i].innerHTML=(i+1)+'.';
    }
}
function updateFields(){
    var items=$('.item_count_label');
    var d=items.length;
    var it=$('#itemsCount')[0].value;
    var diff=it-d;
    if(diff>0) {
        for (var i = 1; i <= diff; i++) {
            createField(null);
        }
    }
}
function createField(evt){
    t=evt;
    var x=$('.item')[0].cloneNode(true);
    x.getElementsByTagName('input')[0].value='';
    x.getElementsByClassName('item_count_label')[0].innerHTML=($('.items')[0].childElementCount+1)+'.';
    $('.items').append(x);
    $('#itemsCount')[0].value=$('.item_count_label').length;

}
function createTagNode(tag){
    var tagNode='' +
        '<div class="tag-added">'+
        '<span class="theTag">'+tag+'</span>'+
        '<i class="glyphicon glyphicon-remove-circle remove-tag" onclick="this.parentNode.remove();" style="cursor:default;"></i>' +
        '</div>';
    return tagNode;
}
$(document).ready(function(){
    console.log('Dom ready');

});