/* Function -------------------------------------------------------------------------------------------> */
function changeCompare(num){
	var selectId = '#compare'+num;
	var data = $(selectId).find(':selected').data('prop');
	
	for(var k in data){
		if(data.hasOwnProperty(k)){
			var id = '#'+k+'_'+num;
			$(id).html(unescape(data[k]));
		}
	}
		
	var img = $(selectId).find(':selected').data('img');
	var id = '#img_'+num;
	var onload = "tleImg.resizeImg(this,'fit','none')";
	$(id).html('<img class="defaultImg" src="'+img+'" onload="'+onload+'" />');
}

/* Function -------------------------------------------------------------------------------------------> */
function submitCal(){
	var capital = $('#capital').val();
	var volumn = $('#volumn').val();
	var result = Math.floor(capital/ (((volumn*45)*0.25)*30));
	$('#result').html(result);
}

/* Function -------------------------------------------------------------------------------------------> */
function resetCal(){
	$('#capital').val('');
	$('#volumn').val('');
	$('#result').html('-');
}

/* Function -------------------------------------------------------------------------------------------> */
$(document).ready(function(){
	changeCompare(1);
	$('#compare2').val(18);
	changeCompare(2);
});