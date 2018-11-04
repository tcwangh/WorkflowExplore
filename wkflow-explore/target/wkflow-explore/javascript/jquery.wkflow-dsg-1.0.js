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
				var wkflowInfoDiv = options.wkflowId + "designAreaRightTop";
				var otherInfoDiv =  options.wkflowId + "designAreaRightDown";
				var  displayArea = 	"<div id='" + wkflowInfoDiv + "' class='designAreaRightTop' ></div>" +
									"<div id='" + otherInfoDiv + "' class='designAreaRightDown' ></div>";
				$(this).find("div[id='" + options.displayDivId + "']").append(displayArea);
				
				var theNewTabId =options.wkflowId;
				var designAreaRightTopTabSectionId = 'dsgRTContainer_'+theNewTabId;
				var designAreaRightTopTabUlId = 'dsgRT_controls_'+ theNewTabId;
				var designAreaRightTopTabContainerId = 'dsgRT_container_' + theNewTabId;
				var dispTabs = 
					"<section id='" + designAreaRightTopTabSectionId + "' class='tabContainer'>" + 
						"<ul id='" + designAreaRightTopTabUlId + "' class='tabControls'>" + 
						"</ul>" +
						"<div id='" + designAreaRightTopTabContainerId + "' class='tabContentsContainer'>" +
						"</div>"
					"</section>";
				$('#' + wkflowInfoDiv).append(dispTabs);
				var tabContentPaddingSize = 5;
				
				$('#'+designAreaRightTopTabSectionId).ccwtab('init',{
					padding:tabContentPaddingSize,
					borderWidth:1,
					triggerTabCreateAfterEvent:'false',
					triggerTabChangeEvent:'false',
					contentsContainerClass:'tabContentsContainer'
				});
				
				var wkflowInfoTab = theNewTabId+"_WKFLOWINFO";
				$('#' + designAreaRightTopTabSectionId).ccwtab('addtab',{
					newTabId:wkflowInfoTab,
					displayName:'Workflow Data',
					closeTab:'disabled'
				});
				//The workflow-info container div is tab_{wkflowInfoTab}
				//append ztree div to workflow-info container
				var wkflowInfoContainerDivId = "tab_"+ wkflowInfoTab;
				var wkflowInfoZtreeDivId = "ztree_" + wkflowInfoTab;
				var ztreeDiv = "<div id='" + wkflowInfoZtreeDivId + "' class='ztree'></div>";
				$('#' + wkflowInfoContainerDivId).append(ztreeDiv);
				zTreeNodes = [
			      	{"name":"模版資訊", open:true, iconOpen:"css/zTreeStyle/img/diy/1_open.png", iconClose:"css/zTreeStyle/img/diy/1_close.png",children: [
			      	{ "name":"編號" + "-" , open:false,children:[{"name":"",icon:"css/zTreeStyle/img/diy/9.png"}]},
			      	{ "name":"名稱" + "-" , open:false,children:[{"name":"",icon:"css/zTreeStyle/img/diy/9.png"}]},
			      	{ "name":"類別" + "-" , open:false,children:[{"name":"",icon:"css/zTreeStyle/img/diy/9.png"}]},
			      	{ "name":"理由" + "-" , open:false,children:[{"name":"",icon:"css/zTreeStyle/img/diy/9.png"}]},
			      	{ "name":"說明" + "-" , open:false,children:[{"name":"",icon:"css/zTreeStyle/img/diy/9.png"}]},
			      	{ "name":"責任部門" + "-"  , open:false,children:[{"name":"",icon:"css/zTreeStyle/img/diy/9.png"}]},
			      	{ "name":"權限代碼" + "-"  , open:false,children:[{"name":"",icon:"css/zTreeStyle/img/diy/9.png"}]},
			      	{ "name":"檢查碼" + "-"  , open:false,children:[{"name":"",icon:"css/zTreeStyle/img/diy/9.png"}]},
			      	{ "name":"啟用" + "-" , open:false,children:[{"name":"",icon:"css/zTreeStyle/img/diy/9.png"}]},
			      	{ "name":"狀態" + "-"  , open:false,children:[{"name":"",icon:"css/zTreeStyle/img/diy/9.png"}]},
			      	{ "name":"申請人" + "-"  , open:false,children:[{"name":"",icon:"css/zTreeStyle/img/diy/9.png"}]},
			      	{ "name":"申請時間" + "-"  , open:false,children:[{"name":"",icon:"css/zTreeStyle/img/diy/9.png"}]}
			      	]}];
				var setting = {};
				var zTreeObj;
				zTreeObj=  $.fn.zTree.init($("#" + wkflowInfoZtreeDivId), setting, zTreeNodes);
				
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