$(document).ready(function() {

   $('#calendar').fullCalendar({

      lang: 'pl',
      events: 'https://www.google.com/calendar/feeds/9urt0f96rut3kjqg7a75r8vttc%40group.calendar.google.com/public/basic',
      editable: true,
      isCustom: true,

      eventClick: function(event) {
         // opens events in a popup window
         window.open(event.url, 'gcalevent', 'width=700,height=600');
         return false;
      },
      eventMouseover: function (event, jsEvent, view) {
         $(".event-popup").fadeOut("slow", function () {
             $(this).remove();
         });
         var event_popup = '<div class="event-popup" style="background: rgba(0, 0, 0, 0.8); border: 1px solid #b5e853; padding: 0.8em 1em;">' + event.start.format("YYYY-MM-DD") +'<BR>' + event.start.format("HH:mm") +'<BR><strong>' +event.title +'</strong><p>';
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
            cell.css("background-color", "rgba(255, 255, 255, 0.3)");
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
            //   $(element).find('.fc-event').css({'background-color':'#B5C637','border-color':'#B5C637'});
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
      }
   });
   
});