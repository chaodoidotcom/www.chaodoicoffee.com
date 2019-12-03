var tleUtil = {
	
	extractStdAryObj : function(dataObj, value){
		var result = $.grep(dataObj, function(e){return e.name == value;});
		if(result.length == 0){
			return false;
		}else if(result.length == 1){
			return result[0].value;
		}else{
			// multiple items found
		}
	},
	
	myDecodeURI : function(tags, stripTagsOption){
		/* init default value */
		if(stripTagsOption == undefined){var stripTagsOption = false;}
		var cleanedTags = decodeURIComponent(tags);
		if(stripTagsOption){
			cleanedTags = strip_tags(cleanedTags);
		}
		return cleanedTags;
	},
	
	strip_tags : function(input, allowed){
		allowed = (((allowed || '') + '')
			.toLowerCase()
			.match(/<[a-z][a-z0-9]*>/g) || [])
			.join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
	    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
		return input.replace(commentsAndPhpTags, '').
			replace(tags, function ($0, $1) {
				return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    			});
	},
	
	cleanJId : function(id){
		var res = id.match(/#/g);
		if(!res){id = '#'+id;}
		return id;
	},
	
	validateEmail :function(email){
		 var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(email);
	},
	
	validateStringLength : function(str, condition){
		return this.validateValue(str.length, condition);
	},
	
	validateNumberValue : function(val, condition){
		return this.validateValue(val, condition);
	},
	
	validateValue : function(val, condition){
		// condition = "> 0,< 20"
		var operators = this.genOperators();
		var conditionAry = condition.split(',');
		var x = conditionAry.length;
		if(!val){return false;}
		for(var y=0 ; y<x ;y++){
			var subConditionAry = conditionAry[y].split(' ');
			if(operators[subConditionAry[0]](parseFloat(val), parseFloat(subConditionAry[1]))){
				continue;							
			}else{
				return false;
				break;													
			}
		}
		return true;
	},
	
	genOperators : function(){
		var operatorAry = {
			'+': function(a, b) { return a + b; },
			'-': function(a, b) { return a - b; },
			'==': function(a, b) { return a == b; },
			'!=': function(a, b) { return a != b; },
			'>': function(a, b) { return a > b; },
			'>=': function(a, b) { return a >= b; },
			'<': function(a, b) { return a < b; },
			'<=': function(a, b) { return a <= b; },
		};
		return operatorAry;
	},
	
	getObjSize : function(obj){
		var size = 0, key;
    	for (key in obj) {
        	if (obj.hasOwnProperty(key)) size++;
    	}
    	return size;
	},
	
	enterAndRun : function(event,fns,var1,var2){
		if(!var1){var var1 = false;}
		if(!var2){var var2 = false;}
	
		if(event.keyCode == 13){
			eval(fns)(var1, var2);
		}
	},
	
	loadPaging : function(obj){
		var page = $(obj).val();
		var url = $(obj).data('url') + page;
		window.open(url,'_self');
	},
	
};

var tleForm = {
	
	cleanOptions : function(options){
		if(!('formID' in options)){
			console.log('Tle Fatal Error : "formID" property is missing in "data-options" attribute.');
		}
		
		if(!('inputAlert' in options)){options.inputAlert = true;}
		if(!('htmlAlert' in options)){options.htmlAlert = false;}
		if(options.htmlAlert === false && !('htmlAlertID' in options)){
			console.log('Tle Notice : "htmlAlertID" property is mission in "data-options" attribute.');
			}
		
		return options;
	},
	
	reset : function(buttonObj){
		var options = $(buttonObj).data('options');
		
		var selector = options.formID + ' *';
		$(selector).filter(':input').each(function(){
			var tag = $(this).prop('tagName');
			if(tag == 'INPUT' || tag == 'TEXTAREA'){
				$(this).val('');
				$(this).removeAttr('checked');
			}else if(tag == 'BUTTON'){

			}
		});
		
		$(options.htmlAlertID).html(''); // clear htmlNotice
		this.clearAllNotice($(options.formID)); // clear inputNotice
	},
	
	submit : function(buttonObj){
		var options = this.cleanOptions($(buttonObj).data('options'));
		var formObj = $(options.formID);
		var error = this.applyFilter(options);
		
		if(error){
			console.log('form value are not valid.');
			console.log(options);
			console.log(window.formErrorAry);
			return;
			}
		
		
		this.clearDisabled(options.formID);
		//var formData = $(formObj).serializeArray();
		//console.log(formData);
		
		$('#clearButton').hide();
		$('#submitButton').hide();
		$('#loadingIcon').show();
		
		
		$('#submit_button').html('<span style="display:inline-block;height:46;width:250px;line-height:46px;text-algin:center;">กรุณารอ...<span>');
		$(formObj).submit();
		},
	
	applyFilter : function(options){
		var selector = options.formID + ' *';
		var error = false;
		window.formErrorAry = [];
		window.htmlNotice = '';
		
		$(selector).filter(':input').each(function(){
					
			if($(this).attr('data-filter')){
				// gen data
				var inputObj = {
					element:$(this).prop('tagName'),
					type:$(this).attr('type'),
					name:$(this).prop('name'),
					id:$(this).prop('id'),
					val:$(this).val(),
					filterAry:$(this).data('filter'),
					error:false
				};

				tleForm.clearNotice(inputObj.name);
				
				//console.log(element);
				var notice = tleForm.validateVal(inputObj);
				
				if(notice){
					error = true;
					inputObj.notice = notice;
					inputObj.error = true;
					window.formErrorAry.push(inputObj);
					tleForm.genNotice(options, inputObj);
					}
				}
				
			});
			
		// console.log(errorAry);
		
		// gen notice
		if(error && options.htmlAlert && formErrorAry.length > 0){
			$(options.htmlAlertID).html(window.htmlNotice);
		}else if(!error){
			$(options.htmlAlertID).html('');			
		}
		
		return error;
	},
		
	validateVal : function(element){
		
		var val = element.val;
		var length = tleUtil.getObjSize(element.filterAry);
		for(var i = 0 ; i < length ; i++){
			var temp = element.filterAry[i];
			var notice = temp.notice;
			switch(temp.filter){
				case 'required':
					if(!val){return notice;}
					break;
				case 'validate':
					switch(temp.topic){
						case 'length':
							if(!tleUtil.validateStringLength(val, temp.condition)){return notice;}
							break;
						case 'value':
							if(!tleUtil.validateNumberValue(val, temp.condition)){return notice;}
							break;
						case 'email':
							if(!tleUtil.validateEmail(val)){return notice;}
							break;
						case 'number':
							if(!($.isNumeric(val))){return notice;}
							break;
						case 'integer':
							if(!(val == parseInt(val, 10))){return notice;}
							break;
						case 'match':
							if(!(val == $(temp.matchToID).val())){return notice;}
							break;
						default:
						}
					break;
				case 'disabled':
					if(val == temp.condition){return notice;}
					break;
				default:
			}
		}
		return false;
	},
	
	genNotice : function(options, inputObj){
	
		// input alert
		if(options.inputAlert){
		
			var formGroupId = '#' + inputObj.name + 'FormGroup';
			var inputId = '#' + inputObj.name + 'Input';

			var noticeElement = tleForm.genNoticeElements('error');
	
			// change class
			var addClass = noticeElement['formGroupClass'] + ' has-feedback';
			$(formGroupId).addClass(addClass);
			//$(formGroupId).append(noticeElement['spanIcon']);
		
			// print notice in placeholder
			$(inputId).val('');
			$(inputId).attr('placeholder', inputObj.notice);
			}
				
		// html alert
		if(options.htmlAlert){
			window.htmlNotice += '<div style="color:red;">' + inputObj.notice + '</div>';
			}

		return;
	},
	
	genNoticeElements : function(alertType){
		if(alertType === false || alertType == 'error'){
			var ary = {
				formGroupClass:'has-error',
				spanIcon:'<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>'
			};
		}else if(alertType == 'warning'){
			var ary = {
				formGroupClass:'has-warning',
				spanIcon:'<span class="glyphicon glyphicon-warning-sign form-control-feedback" aria-hidden="true"></span>'
			};
		}else if(alertType === true || alertType == 'success'){
			var ary = {
				formGroupClass:'has-success',
				spanIcon:'<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>'
			};
		}else{
			var ary = {
				formGroupClass:'',
				spanIcon:''
			};
		}
		return ary;
	},
	
	clearDisabled : function(formID){
		var selector = formID + ' *';
		$(selector).filter(':input').not('button').each(function(){
			if($(this).is(':disabled')){
				$(this).prop('disabled', false);
			}
			});
		return;
		},
	
	clearNotice : function(name){
		var formGroupId = '#'+name+'FormGroup';
		$(formGroupId).removeClass('has-error has-warning has-success has-feedback');
		var iconId = formGroupId + ' > .glyphicon';
		$(iconId).remove();
	},
	
	clearAllNotice : function(formObj){
		//var formJId = tleUtil.cleanJId(formId);
		$(formObj).find('.form-group').each(function(){
			$(this).removeClass('has-error has-warning has-success has-feedback');
			$(this).find('.glyphicon').remove();
			$(this).find('input, textarea').attr('placeholder', '');
		});
		//window.resetSettlement();
	},
	
};

/* Function -------------------------------------------------------------------------------------------> */
function subscribeEmail(){
	var jid = '#subscribeInputId';
	var email = $(jid).val();
	
	if(tleUtil.validateEmail(email)){
		var url = window.sess['URL'] + 'subscribe';
		var data = '?email='+encodeURIComponent(email);
		var uri = url+data;
		window.open(uri,'_self');
	}else{
		alert('Email is not valid.');
		$(jid).val('');
	}
}

var tleImg = {
	
	resizeImg : function(obj, mode, dimension){
		// mode => 'fit', 'full'
		// dimension => 'both', 'horizontal', 'vertical', 'none'
		if(mode == undefined){var mode = 'fit';}
		if(dimension == undefined){var dimension = 'both';}
	
		//console.log('Mode : '+mode+' Dimension : '+dimension);
	
		var containerWidth = $(obj).parent().width();
		var containerHeight = $(obj).parent().height();
		var imgWidth = $(obj).width();
		var imgHeight = $(obj).height();
		var imgFactor = imgHeight / imgWidth;
		//console.log('Container : ' + containerWidth + ' - ' + containerHeight);
		//console.log('Image : ' + imgWidth + ' - ' + imgHeight + ' - ' + imgFactor);
		
		if(mode == 'fit'){		
			if(imgHeight > containerHeight){
				var newHeight = containerHeight;
				var newWidth = Math.floor(newHeight / imgFactor);
			}else{
				var newHeight = imgHeight;
				var newWidth = imgWidth;
			}	
		
			if(newWidth > containerWidth){
				newWidth = containerWidth;
				newHeight = Math.floor(newWidth * imgFactor);
			}
			//console.log('Fit - H : '+newHeight + ' - W : ' + newWidth);
		}else if(mode == 'full'){
			var newHeight = containerHeight;
			var newWidth = Math.floor(newHeight / imgFactor);	
		
			if(newWidth < containerWidth){
				newWidth = containerWidth;
				newHeight = Math.floor(newWidth * imgFactor);
			}
			//console.log('Full - H : '+newHeight + ' - W : ' + newWidth);
		}
		
		newWidthText = newWidth + 'px';
		newHeightText = newHeight + 'px';
		//console.log(newWidthText + ' - ' + newHeightText);
	
		$(obj).width(newWidthText);
		$(obj).height(newHeightText);
			
		if(dimension != 'none'){
			this.reImgPos(obj,dimension);
		}else{
			this.fadeInImg(obj);	
		}
	},
	
	reImgPos : function(obj, dimension){
		// dimension => 'both', 'horizontal', 'vertical', 'none'
		if(dimension == undefined){var dimension = 'both';}
	
		//console.log(dimension);
	
		if(dimension != 'none'){
			if(dimension == 'horizontal' || dimension == 'both'){
				var containerWidth = $(obj).parent().width();
				var imgWidth = $(obj).width();
		
				if(imgWidth > containerWidth){
					var leftPx = '-'+((imgWidth - containerWidth)/2) + 'px';
				}else if(imgWidth < containerWidth){
					var leftPx = ((containerWidth - imgWidth)/2) + 'px';
				};
				//console.log('containerWidth : ' + containerWidth + ' - imgWidth : ' + imgWidth + ' - left : ' + leftPx);
				$(obj).css({left:leftPx});
			};
	
			if(dimension == 'vertical' || dimension == 'both'){
				var containerHeight = $(obj).parent().height();
				var imgHeight = $(obj).height();
		
				if(imgHeight > containerHeight){
					var topPx = '-'+((imgHeight - containerHeight)/2) + 'px';
				}else if(imgHeight < containerHeight){
					var topPx = ((containerHeight - imgHeight)/2) + 'px';
				};
				$(obj).css({top:topPx});
			};
		}
	
		this.fadeInImg(obj);	
	},
	
	fadeInImg : function(obj){
		if($(obj).css('display') == 'none'){
			$(obj).fadeIn('500');
			}
	},
	
	imgError : function(obj){
		$(obj).load(function(){resizeImg($(obj));});
		obj.src = window.sess['defaultImgURL'];
		obj.onerror = '';
		obj.onclick = '';
		if(obj.parentNode != undefined){
			if(obj.parentNode.nodeName == "A"){
				obj.parentNode.removeAttribute("href");
				obj.parentNode.removeAttribute("target");
			}
		}
		return true;
	},
	
};

/* Function -------------------------------------------------------------------------------------------> */
function pressEnterAndRun(event,fns){
	if(event.keyCode == 13){
		eval(fns)();
	}
}

/* Function -------------------------------------------------------------------------------------------> */
$(document).ready(function(){
	$('.defaultImg, .defaultImgHoverable').load(function(){tleImg.resizeImg($(this));});
	$('.defaultImg, .defaultImgHoverable').error(function(){tleImg.imgError($(this));});
	
	/* maintain scroll function Function -------------------------------------------------------------------------------------------> */
	if(window.sess['maintainScrollSection'].indexOf(window.sess['section']) !== -1){
		(function($){
			window.onbeforeunload = function(e){window.name += ' [' + $(window).scrollTop().toString() + '[' + $(window).scrollLeft().toString();};
			$.maintainscroll = function(){
				if(window.name.indexOf('[') > 0){
					var parts = window.name.split('[');			
					window.name = $.trim(parts[0]);
					var left = parseInt(parts[parts.length - 1]);
					var top = parseInt(parts[parts.length - 2]);
					window.scrollTo(left, top);
					}		
				};	
			$.maintainscroll();
			})(jQuery);
		}
		
});