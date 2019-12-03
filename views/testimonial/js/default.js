/* Function -------------------------------------------------------------------------------------------> */
$(document).ready(function(){
	
	$(window).on('scroll',function(data){
		$.each(window.myajax.catid, function(index, value){
			if(window.myajax.active[index] == 'no'){return;}
			if(($(window).scrollTop() + $(window).height() + window.myajax.buffer) > $('body').height()){
				
				var url = window.sess['URL']+'ajax/loadcontent?catId='+value+'&start='+window.myajax.start[index]+'&limit='+window.myajax.limit[index];
				window.myajax.active[index] = 'no';
				$.get(url, function(res){
					var desJId = '#contentContainer'+index;
					if(res == 'nomore'){
						var html = '<div class="noMoreDiv">No More Content&nbsp;&nbsp;<span class="glyphicon glyphicon-comment" aria-hidden="true"></span></div>';
						$(desJId).append(html);
					}else{
						$(desJId).append(res);
						window.myajax.start[index] += window.myajax.limit[index];
						window.myajax.active[index] = 'yes';
					}
					//updateContentContainer();
					});
					
				}
			});		
		});
	
});