/**
 * Author:Tim Wang
 */

;(function(d,$){
	
	var wkflowdsg_defaults = {
			addTaskEventBinder:'.addTaskIcon',
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
				var newProcess ="<div class='mainproc'>" +
								"	<div class='mainproc-pic'><img id='flowStart' class='flowIcon', src='images/start.png' title='Start the workflow'></div>" +
								"   <div class='startend'>" +
								"       <div class='task-title'>" +
								"       	<table class='icon_table'>" + 
								"           	<tr>" + 
								"                   <td class='task-title-table'>Start</td>" +
								"					<td class='funcIcon'><img id='setWFParameterImg' class='imgIcon', src='images/parameters3.png' title='Setup Workflow Parameters'></td>" +
								"                   <td class='funcIcon'><img id='expandStart' class='imgIcon', src='images/expand2.png' title='Show detail'></td>" +
								"                   <td class='funcIcon'><img id='collapseStart' class='imgIcon', src='images/collapse.png' title='Collapse the detail'></td>" +
								"				</tr>" + 
								"			</table>"+
								"       </div>" + 
								"       <div class='task-detail'></div>" +
								"   </div>" +
								"</div>" + 
								"<div class='mainproc'>" +
								"	<div class='taskctl'>" +
								"       <img id='addTaskImg' class='addTaskIcon' src='images/add-task-icon.png' title='Add task' />" +
								"   </div>" +
								"</div>" + 
								"<div class='mainproc'>" +
								"	<div class='mainproc-pic'><img id='flowEnd' class='flowIcon', src='images/end.png' title='End of the workflow'></div>" +
								"	<div class='startend'>" +
								"       <div class='task-title'>" +
								"       	<table class='icon_table'>" + 
								"           	<tr>" + 
								"                   <td class='task-title-table'>End</td>" +
								"					<td class='funcIcon'></td>" +
								"				</tr>" + 
								"			</table>"+
								"       </div>" + 
								"   </div>" +
								"</div>";
				$(this).find("div[id='" + options.configDivId + "']").append(newProcess);
				$(this).find("div[id='" + options.configDivId + "']").delegate(wkflowdsg_defaults.addTaskEventBinder,'click',function(e) {
					console.debug(e);
					console.debug("Add Task Event fired!");
					var parentMainprocDiv = $(this).closest("div[class*='mainproc']");
					console.debug(parentMainprocDiv);
					var newTask = 	"<div class='mainproc'>" +
									"	<div class='mainproc-pic'><img class='flowIcon', src='images/task2.png' title='task'></div>" +
									"	<div class='task'>" +
									"		<div class='task-title'>" +
									"       	<table class='icon_table'>" + 
									"           	<tr>" + 
									"                   <td class='task-title-table'>Task</td>" +
									"					<td class='funcIcon'><img id='setWFParameterImg' class='imgIcon', src='images/parameters3.png' title='Setup Workflow Parameters'></td>" +
									"                   <td class='funcIcon'><img id='expandStart' class='imgIcon', src='images/expand2.png' title='Show detail'></td>" +
									"                   <td class='funcIcon'><img id='collapseStart' class='imgIcon', src='images/collapse.png' title='Collapse the detail'></td>" +
									"				</tr>" + 
									"			</table>"+
									"       </div>" + 
									"       <div class='task-detail'></div>" +
									"	</div>" +
									"</div>"+
									"<div class='mainproc'>" +
									"	<div class='taskctl'>" +
									"       <img id='addTaskImg' class='addTaskIcon' src='images/add-task-icon.png' title='Add task' />" +
									"   </div>" +
									"</div>";
					$(newTask).insertAfter(parentMainprocDiv);
				});
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