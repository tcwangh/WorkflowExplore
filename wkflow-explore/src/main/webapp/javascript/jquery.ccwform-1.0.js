/**
 * 
 */
;(function(d,$){
	var ccwform_defaults = {
			fadeTime:500,
			overlayOpacity:0.7,
			afterSubmitEvent:'ccwform.afterSubmit',
	};
	var ccwform_methods = {
			init: function(options) {
				var defaults=ccwform_defaults;
				var _setting = $.extend(defaults,options);
				var setSource = _setting.inputSrc;
				var wdHeight=$(window).height();
				var srcSectionId = $(this).attr('id');
				var theForm = "<div id='mdOverlay'></div>" +
				              "<div id='mdWindow'>" + 
				              "    <div id='mdHeader'>" + 
				              "        <div id='mdTitle'>" + _setting.dialogHeader + "</div>" +
				              "        <div id='mdClose'>" +
				              "            <img id='mdCloseImg' class='closeTabIcon', src='images/close-icon.png' title='Close'>" +
				              "		   </div>" +
				              "    </div>" + 
				              "    <div id='contWrap'>" +setSource + "</div>" +
				              "    <div id='mdFooter'>" +
				              "        <input id='mdCancel' class='button' srcSec='" + srcSectionId + "' type='Submit' value='Cancel'>" +
				              "        <input id='mdConfirm' class='button' srcSec='" + srcSectionId + "' type='Submit' value='Submit'>" +
				              "    </div>"
				              "</div>";
				$('body').append(theForm);
				$('#mdOverlay, #mdWindow').css({display:'block',opacity:'0'});
				$('#mdOverlay').css({height:wdHeight}).stop().
					animate({opacity:_setting.overlayOpacity},_setting.fadeTime);
				$('#mdWindow').stop().animate({opacity:'1'},_setting.fadeTime);
				$('#mdCloseImg').on('mouseover',function(e){
					$(this).attr("src","images/close-icon-on.png");
				});
				$('#mdCloseImg').on('mouseleave',function(e){
					$(this).attr("src","images/close-icon.png");
				});
				
				$('#mdCloseImg').on('click',function(){
					$('#mdWindow, #mdOverlay').stop().animate({opacity:'0'},_setting.fadeTime,function(){
						$('#mdWindow, #mdOverlay').remove();
					});
				});
				$('#mdConfirm').on('click',function(){
			        console.debug("confirm click");
			        //console.debug($('#contWrap').find('input'));
			        var srcSectionId = $(this).attr('srcSec');
			        var inputList = $('#contWrap').find('input');
			        var inputData = {};
			        for(var i = 0; i < inputList.length; i++) {
			        	//console.log("loop["+ i+ "]", inputList[i].id + "-"+ inputList[i].value)
			        	inputData[inputList[i].id]=inputList[i].value;
			        }
			        $('#' + srcSectionId).trigger(ccwform_defaults.afterSubmitEvent,[{dialogInputData:inputData}]);
			        closeDialog();
			    });
				$('#mdCancel').on('click',function(){
			        console.debug("cancel click");
			        closeDialog();
			    });
				function closeDialog() {
					$('#mdWindow, #mdOverlay').stop().animate({opacity:'0'},_setting.fadeTime,function(){
						$('#mdWindow, #mdOverlay').remove();
					});
				}
			}
	}
	$.fn.ccwform=function(method) {
		if (ccwform_methods[method]) {
			return ccwform_methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		}else {
			$.error('The method :' + method + " isn't exist in ccwtab");
		}
	}
}(document,jQuery));