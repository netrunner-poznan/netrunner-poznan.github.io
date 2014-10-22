 function addSpace(string, len)
   {
      var cArray = string.split("");
      var cNewName = string;

      if(cArray.length < len)
      {
         var l = len - cArray.length;
         for (var i = 0; i < l; i++) {
            cNewName += " ";
         }
      }
      return cNewName;
   }

$(document).ready(function() {
$(".archiwa a.raport").click(function(){
 $.ajax({
          type: "GET",
          url: $(this).attr('href'),
          dataType: "xml",
          
          success: function (xml) { 
	               var text = '';
	               $(xml).find("Round").each(function(){
		               text+= 'Runda: ' + $(this).find("Number:first").text() + '\n'
		               $(this).find("Game").each(function(){
                   if( $(this).find("IsBYE:first").text() == 'true' )
                      text+= $(this).find("Player1Alias:first").text() + ' (bye)' + '\n';
                   else
		                     text+= $(this).find("Player1Alias:first").text() + ' vs ' 
                           + $(this).find("Player2Alias:first").text() + '\n   ' 
                           + $(this).find("Player1RaceCorpo:first").text() + ':' + $(this).find("Player2RaceRunner:first").text() + ' - ' 
                           + $(this).find("Player1Score1:first").text() + ':' + $(this).find("Player2Score1:first").text() + '\n   '
                           + $(this).find("Player1RaceRunner:first").text() + ':' + $(this).find("Player2RaceCorpo:first").text() + ' - '
                           + $(this).find("Player1Score2:first").text() + ':'+ $(this).find("Player2Score2:first").text() + '\n';
		                  });
		               text+= '\n';
	               });
             var  content = $('html').html('<pre>');
	               $('pre',content).append( text);
	               document.open();
	               document.write(content.html());
	               document.close();
          }               
       });
    return false;
  });
$(".archiwa a.tabela").click(function(){
 $.ajax({
          type: "GET",
          url: $(this).attr('href'),
          dataType: "xml",
          
          success: function (xml) { 
	               var text = '   | gracz        | p  | l.w | l.r | l.p \n---+--------------+----+-----+-----+-----\n';
	               $(xml).find("FinalResult").each(function(){
			var num = addSpace($(this).find("FinalPlace:first").text() + '.',3);
			var nick = addSpace($(this).find("Alias:first").text(),13);
			var points = addSpace($(this).find("Points:first").text(),3);
			var lw = addSpace($(this).find("GamesWin:first").text(),4);
			var lr = addSpace($(this).find("GamesDraw:first").text(),4);
			var lp = addSpace($(this).find("GamesLoose:first").text(),4);

			text+= num + '| ' + nick + '| ' + points +'| ' + lw + '| ' + lr + '| ' + lp + '\n';
		               
	               });
             	       var  content = $('html').html('<pre>');
	               $('pre',content).append( text);
	               document.open();
	               document.write(content.html());
	               document.close();
          }               
       });
    return false;
  });
});
