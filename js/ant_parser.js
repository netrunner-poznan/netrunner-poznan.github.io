function addSpace(string, len)
{
	var cArray = string.split("");
   var cNewName = string;

   if(cArray.length < len){
      var l = len - cArray.length;
      for (var i = 0; i < l; i++) {
      	cNewName += " ";
      }
   }
   return cNewName;
}

$(document).ready(function(){
	var files = $.map($('.raport'), function(el) {
		return {file: $(el).attr('href')};
	});	

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
         	var text = '   | gracz          | p  | l.w | l.r | l.p | corp	                                       '
							+'| runner                                       \n'+
							  '---+----------------+----+-----+-----+-----+---------------------------------------------------'
							+'+---------------------------------------------------\n';
            $(xml).find("FinalResult").each(function(){
					var num = addSpace($(this).find("FinalPlace:first").text() + '.',3);
					var nick = addSpace($(this).find("Alias:first").text(),15);
					var points = addSpace($(this).find("Points:first").text(),3);
					var lw = addSpace($(this).find("GamesWin:first").text(),4);
					var lr = addSpace($(this).find("GamesDraw:first").text(),4);
					var lp = addSpace($(this).find("GamesLoose:first").text(),4);
					var corpoIdentity = addSpace($(this).find("CorpoIdentity:first").text(),50)
					var runnerIdentity = addSpace($(this).find("RunnerIdentity:first").text(),50)

					text+= num + '| ' + nick + '| ' + points +'| ' + lw + '| ' + lr + '| ' + lp + '| '+ corpoIdentity +'| '+runnerIdentity+'\n';


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

	$(".tabela:first").html(function(){
		var content = $('<pre>');
		var players = [];

		$.each(files,function(i,entry) {
			$.ajax({
				async: false,
				type: "GET",
		    	url: entry["file"],
		    	dataType: "xml",
		       
		    	success: function (xml) { 
					$(xml).find("FinalResult").each(function(){
						var nick = $(this).find("Alias:first").text();
						var points = parseInt($(this).find("Points:first").text());
						var lw =	parseInt($(this).find("GamesWin:first").text());
						var lr = parseInt($(this).find("GamesDraw:first").text());
						var lp = parseInt($(this).find("GamesLoose:first").text());
	 	       	
						var idx = players.findIndex( function(element, index, array) {
							return element.nick === nick;						
						});

						if (idx == -1)
						{
							player = {nick: nick,
										points: points,
										matches: 1,
									  	lw: lw,
										lr: lr,
										lp: lp
								  		};
							players.push( player);
						}
						else
						{
							players[idx].points += points;
							players[idx].matches++;
							players[idx].lw += lw;
							players[idx].lr += lr;
							players[idx].lp += lp; 
						}
					});
				
	    		}               
	 		});
		});

		players.sort(function(a,b) {return a.points < b.points;} );		
		var text = '   | gracz          | p  | m  | l.w | l.r | l.p \n---+----------------+----+----+-----+-----+-----\n';
		$.each(players,function (i, elem) { 
         
					var num = addSpace(i+1 + '.',3);
					var nick = addSpace(elem.nick,15);
					var points = addSpace(elem.points+'',3);
					var matches = addSpace(elem.matches +'',3);
					var lw = addSpace(elem.lw+'',4);
					var lr = addSpace(elem.lr+'',4);
					var lp = addSpace(elem.lp+'',4);

					text+= num + '| ' + nick + '| ' + points +'| ' + matches + '| ' + lw + '| ' + lr + '| ' + lp + '\n';
		               
            });
		content.append( text);
		return content;	
	});
});

