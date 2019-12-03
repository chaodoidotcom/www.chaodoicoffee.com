/* Function -------------------------------------------------------------------------------------------> */
function selectBranch(obj){
	// var id = $(obj).data('id');
	// var desc = $(obj).data('desc');
	// var text1 = $(obj).data('text1');
	// var img = $(obj).data('img');
	// var lat = $(obj).data('lat');
	// var lng = $(obj).data('lng');
	
	//tleMaps.panTo(lat, lng);
	//tleMaps.setZoom(15);
	
	//console.log(id + ' - ' + text1 + ' - ' + img + ' - ' + lat + ' - ' + lng);
	// var elements = 'ID : ' + id + '<br/>';
	// elements += 'Desc : ' + desc + '<br/>';
	// elements += 'Text1 : ' + text1 + '<br/>';
	// elements += 'img : ' + img + '<br/>';
	// $('#gmap-canvas').html(elements);
	
	var branchId = $(obj).data('id');
	var url = window.sess.URL+'branch/loadBranchDetail/' + branchId;
	var responseId = '#gmap-canvas';
	$(responseId).html(window.sess.loadingImg);
	
	$.get(url, function(res){
		$(responseId).html(res);
	});
	
}

/* Function -------------------------------------------------------------------------------------------> */
function loadBranch(obj){
	var provinceId = $(obj).val();
	var url = window.sess.URL+'branch/loadBranch/'+provinceId;
	
	var responseId = '#provinceResult';
	$(responseId).html(window.sess.loadingImg);
	
	$.get(url, function(res){
		$(responseId).html(res);
		$('#gmap-canvas').html('<h3 style="margin-top:100px;text-align:center;">กรุณาเลือกสาขาทางด้านซ้ายเพื่อแสดงข้อมูล</h3>');
	});
	
}

/* Function -------------------------------------------------------------------------------------------> */
$(document).ready(function(){
	loadBranch($('#provinceSelect'));
});