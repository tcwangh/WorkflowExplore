/**
 * Author:Tim Wang
 */

;(function(d,$){
	
	var wkflowdsg_defaults = {
			tabContentsContainer:'.tabContentsContainer',
			tabEventAction:'click',
			currentSelector:'current',
			tabCreatDoneEvent:'ccwtab.TabCreateComplete',
			tabDeleteDoneEvent:'ccwtab.TabDeleteComplete',
			tabChangeEvent:'ccwtab.TabChangeComplete',
			triggerTabCreateAfterEvent:'OnTabCreateDone',
			componentSettings:'wkflowdsg_settings'
	};
	
	var wkflowdsg_methods = {
			
			init: function(options) {
				var defaults=wkflowdsg_defaults;
				var _setting = $.extend(defaults,options);
				$(this).data(wkflowdsg_defaults.componentSettings,_setting);
				var newProcess ="<div class='mainproc row'>" +
								"	<div class='task col-xl-6 show-col'></div>" +
								"</div>" + 
								"<div class='mainproc row'>" +
								"	<div class='task col-xl-6 show-col'></div>" +
								"</div>" + 
								"<div class='mainproc row'>" +
								"	<div class='task col-xl-6 show-col'></div>" +
								"</div>";
				
				
				$(this).find("div[id='" + options.configDivId + "']").append(newProcess);
			}
			
	}
	
	$.fn.wkflowdsg=function(method) {
		if (wkflowdsg_methods[method]) {
			return wkflowdsg_methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		}else {
			$.error('The method :' + method + " isn't exist in wkflowdsg");
		}
	}
	
}(document,jQuery));