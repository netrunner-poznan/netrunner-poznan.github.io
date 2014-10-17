$(document).ready(function() {

    var showhex = true;
   $('#calendar').fullCalendar({

      lang: 'pl',
      events: 'https://www.google.com/calendar/feeds/9urt0f96rut3kjqg7a75r8vttc%40group.calendar.google.com/public/basic',
      editable: true,
      isCustom: true,

      //eventClick: function(event) {
         // opens events in a popup window
      //   window.open(event.url, 'gcalevent', 'width=700,height=600');
      //   return false;
      //},
      eventMouseover: function (event, jsEvent, view) {
         $(".event-popup").fadeOut("slow", function () {
             $(this).remove();
         });
         var event_popup = '<div class="event-popup" style="background: rgba(0, 0, 0, 0.8); border: 1px solid #b5e853; padding: 0.8em 1em;">' + event.start.format("DD-MM-YYYY") +'<BR>' + event.start.format("HH:mm") +'<BR><strong>' +event.title +'</strong><p>';
         /*'<BR>'+ event.location */
         event_popup += '</p>';
         $("body").append(event_popup);
         var pop_top = $(window).height() - jsEvent.pageY;
         $(".event-popup").css({
             "bottom": pop_top,
                 "left": jsEvent.pageX
         }).fadeIn("fast");
      },
      eventMouseout: function () 
      {
         $(".event-popup").delay(10).fadeOut("slow", function () 
         {
            $(this).remove();
         });
      }, 
      dayRender: function (date, cell) 
      {
         var today = new Date();
         if (date.date() === today.getDate() && date.month()  === today.getMonth()) 
         {
            cell.css({"background-color":"rgba(255, 255, 255, 0.3)"});
         }
      },
      eventRender: function (event, element) 
      {
         $(element).find('.fc-time').css('display','none');
         $(element).find('.fc-content').css({'height':'40px','text-align':'center','vertical-align':'middle'});
         
         if(event.title.indexOf("Turniej") >= 0 || event.title.indexOf("turniej") >= 0)
         {
            $(element).find('.fc-title').html("Turniej");
            //if(event.title.indexOf("ligowy") >= 0)
            //{
               $(element).css({'background-color':'#3E894A','border-color':'rgba(255, 255, 255, 0.0)'});
            //}
         }
         else if(event.title.indexOf("Luźne") >= 0 || event.title.indexOf("luźne") >= 0 )
         {
            $(element).find('.fc-title').css({"font-size":"12px"});
            $(element).find('.fc-title').html("Luźne granie");
         }
        
         if(event.location.indexOf("Plan-Sza") >= 0)
         {
            $(element).find('.fc-title').after($("<span class=\"fc-icon\" style=\"display: block;   margin-left: auto;   margin-right: auto;\"></span>").html("<img src=\"../img/calendar/plansza.png\" />"));
         }
         else if (event.location.indexOf("Cube") >= 0)
         {
            $(element).find('.fc-title').after($("<span class=\"fc-icon\" style=\"display: block;   margin-left: auto;   margin-right: auto;\"></span>").html("<img src=\"../img/calendar/cube.png\" />"));
         }
         else if (event.location.indexOf("GOSU") >= 0)
         {
            $(element).find('.fc-title').after($("<span class=\"fc-icon\" style=\"display: block;   margin-left: auto;   margin-right: auto;\"></span>").html("<img src=\"../img/calendar/gosu.png\" />"));
         }
         
         $(element).find('.fc-title').after($("<span class=\"hex_popup_date\" style=\"display: none;\"></span>").html(event.start.format("DD-MM-YYYY")));
         $(element).find('.fc-title').after($("<span class=\"hex_popup_time\" style=\"display: none;\"></span>").html(event.start.format("HH:mm")));
         $(element).find('.fc-title').after($("<span class=\"hex_popup_title\" style=\"display: none;\"></span>").html(event.title));

         var today = new Date();
         if(event.end < today)
         {
            if(showhex)
               $(element).find('.fc-content').before($("<img src=\"http://photoandvision.com/CSS/images/cross-red.png\" style=\"position:absolute;z-index:1;max-height:100px;top: -20px; margin-left: -40px;\" /></img>").html(".."));
            else
               $(element).find('.fc-content').before($("<img src=\"http://photoandvision.com/CSS/images/cross-red.png\" style=\"position:absolute;z-index:1;max-height:100px;top: -28px;\" /></img>").html(".."));
            //$(element).css({'background-color':'#666666','border-color':'rgba(255, 255, 255, 0.0)'});
         }
         else if(   event.start.date() === today.getDate() 
                 && event.start.month() === today.getMonth() 
                 && event.start.year() ===  today.getFullYear())
         {
            $(element).css({'background-color':'#FF0000','border-color':'rgba(255, 255, 255, 0.0)'});
         }
         
         $(element).attr("target", "_blank");
         
         if(event.description.indexOf("www.facebook.com/events") >=0)
         {
            var urlRegex = /(https?:\/\/[^\s]+)/g;
            var link = urlRegex.exec(event.description);
            //alert(link[0]);
            $(element).attr("href", link[0]);
            
            event.url = link[0];
         }
      },
      viewRender: function (view) 
      {
         var h;
         if (view.name == "month") 
         {
            h = NaN;
         }
         else 
         {
            h = 2500;  // high enough to avoid scrollbars
         }

      $('#calendar').fullCalendar('option', 'contentHeight', h);
      },
      
      eventAfterAllRender: function (){
      
      
     
      
      if($('.hexviewbutton',$('.fc-right')).length == 0 )
      {
         $('.fc-right').prepend('<button type="button" class="hexviewbutton fc-button fc-state-default fc-corner-left fc-corner-right">Widok</button>');
         $( ".hexviewbutton" ).click(function() {
               showhex = !showhex;
              
                //$('#calendar').fullCalendar('destroy');


            $('#calendar').fullCalendar('refetchEvents');
         });
      }
      
      var html = $('<div/>').addClass('hexview');
      var header = $('<div/>').addClass('header');
      var header2 = $('<div/>').addClass('header bottom');
      header.append($('<div/>').addClass('dayname').html('pon'));
      header2.append($('<div/>').addClass('dayname').html('pon'));
      header.append($('<div/>').addClass('dayname').html('wt'));
      header2.append($('<div/>').addClass('dayname').html('wt'));
      header.append($('<div/>').addClass('dayname').html('śr'));
      header2.append($('<div/>').addClass('dayname').html('śr'));
      header.append($('<div/>').addClass('dayname').html('czw'));
      header2.append($('<div/>').addClass('dayname').html('czw'));
      header.append($('<div/>').addClass('dayname').html('pt'));
      header2.append($('<div/>').addClass('dayname').html('pt'));
      header.append($('<div/>').addClass('dayname').html('sb'));
      header2.append($('<div/>').addClass('dayname').html('sb'));
      header.append($('<div/>').addClass('dayname').html('ne'));
      header2.append($('<div/>').addClass('dayname').html('ne'));
      html.append(header);
      html.append(header2);
      
      $('.fc-content-skeleton').each( function(i){
        
        var dayNum =[];
        $('table > thead tr td', $(this)).each(function (){
        
               var date = [];
               date['date'] = $(this).html();
            
            if($(this).hasClass( "fc-other-month" ))
               date['othermonth'] = true;
            else
               date['othermonth'] = false;
            
            if($(this).hasClass( "fc-today" ))
               date['today'] = true;
            else
               date['today'] = false;
            
            dayNum.push(date);
          });
        
         if(i % 2 == 0)
            row = $('<div/>').addClass('hex-row');
         else
            row = $('<div/>').addClass('hex-row even');
            
         $('table > tbody tr td', $(this)).each(function (i){
            var col =  $('<div/>').addClass('hexagon');
            if(dayNum[i]['today'])
               col.addClass('today');
            if(dayNum[i]['othermonth'])
               col.addClass('othermonth');
            var daynum = $('<div/>').addClass('daynum').html(dayNum[i]['date']);
           
            var event = $('<div/>').addClass('fc-event-container').html($(this).html());
            col.append(daynum);
            col.append(event);
            row.append(col);
          });
          
         html.append(row);
      });
         
      $(".hexview").replaceWith("");
      $( ".fc-view-container" ).after(html);
      
      if(showhex)
      {
         $( ".fc-view-container" ).css({"display": "none"});
         $( ".hexview" ).css({"display": "inline"});
         
         $('.fc-event').mouseover( function(jsEvent){
            $(".event-popup").fadeOut("slow", function () {
                  $(this).remove();
               });
            var event_popup = '<div class="event-popup" style="background: rgba(0, 0, 0, 0.8); border: 1px solid #b5e853; padding: 0.8em 1em;">' + $('.hex_popup_date',$(this)).text() +'<BR>' + $('.hex_popup_time',$(this)).text()+'<BR><strong>' +$('.hex_popup_title',$(this)).text() +'</strong><p>';
            /*'<BR>'+ event.location */
            event_popup += '</p>';
            $("body").append(event_popup);
            var pop_top = $(window).height() - jsEvent.pageY;
            $(".event-popup").css({
               "bottom": pop_top,
               "left": jsEvent.pageX
            }).fadeIn("fast");
         });
         
         $('.fc-event').mouseout( function () {
            $(".event-popup").delay(2).fadeOut("slow", function () 
            {
               $(this).remove();
            });
         }); 
      }
      else
      {
         $( ".fc-view-container" ).css({"display": "inline"});
         $( ".hexview").css({"display": "none"});
      }
      
      $( "#calendar").css({"margin-bottom": "40px"});
   } 
   });
   
});