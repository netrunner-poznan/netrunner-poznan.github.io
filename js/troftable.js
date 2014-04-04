function moveScroll(){
    var scroll = $(window).scrollTop();
    var anchor_top = $("#maintable").offset().top;
    var anchor_bottom = $("#bottom_anchor").offset().top;
    if (scroll>anchor_top && scroll<anchor_bottom) {
        clone_table = $("#clone");
        if(clone_table.length == 0){
            clone_table = $("#maintable").clone();
            clone_table.attr('id', 'clone');
            clone_table.css({position:'fixed',
                    'pointer-events': 'none',
                    top:0});
            clone_table.width($("#maintable").width());
            $("#table-container").append(clone_table);

            $("#clone").css({visibility:'hidden'});
            $("#clone thead").css({visibility:'visible' });
        }
        if($(window).scrollLeft() > 0){
            var scroll_position = $(window).scrollLeft();
            var object_position = $("#maintable").offset().left;
            $("#clone").css({'left': (object_position - scroll_position)});
        } 
        else if($(window).scrollLeft() == 0){
            $("#clone").css({'left': $("#maintable").offset().left});
        }
    } 
    else {
        $("#clone").remove();
    }
}

$(window).scroll(moveScroll);

var alreadyrunflag=0 //flag to indicate whether target function has already been run
if (document.addEventListener)
    document.addEventListener("DOMContentLoaded", function(){
        alreadyrunflag=1; 
        var URL = "0AiDHrschxjK2dDFJOGJteFJ1bTZZUDJsYmRtdk5EUVE"
        Tabletop.init( { key: URL, callback: showInfo, simpleSheet: true })
    }, false)
else if (document.all && !window.opera){
    document.write('<script type="text/javascript" id="contentloadtag" defer="defer" src="javascript:void(0)"><\/script>')
    var contentloadtag=document.getElementById("contentloadtag")
    contentloadtag.onreadystatechange=function(){
        if (this.readyState=="complete"){
            alreadyrunflag=1; 
            var URL = "0AiDHrschxjK2dDFJOGJteFJ1bTZZUDJsYmRtdk5EUVE"
            Tabletop.init( { key: URL, callback: showInfo, simpleSheet: true })
        }
    }
}

function showInfo(data) 
{
    var trofTable = {"data": data,
                     "pagination": 100,
                     "tableDiv": "#trofTable",
                     "filterDiv": "#trofTable"
                    }
    Sheetsee.makeTable(trofTable)
    Sheetsee.initiateTableFilter(trofTable)
    
    if ($(window).width() < 1024) {
        var elements = document.getElementsByClassName("initials")
        for (var i=0; i<elements.length; i++){
        elements[i].innerHTML = elements[i].innerHTML.replace(/^([A-Z])[^\& ]*[\&nbsp;]*[ ]*([A-Z])/, "$1.$2")
        }
    }
}
  
window.onload=function(){
  setTimeout("if (!alreadyrunflag) Tabletop.init( { key: URL, callback: showInfo, simpleSheet: true })", 0)
}  