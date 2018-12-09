/**
 * Author:Tim Wang
 */

;(function(d,$){
	
	var wkflowdsg_defaults = {
			addTaskEventBinder:'.addTaskIcon',
			expandEventBinder:'.expandIcon',
			collapseEventBinder:'.collapseIcon',
			wkflowInfoChangeReqEvent:'wkflowdsg.wkflowInfoChangeReq',
			componentSettings:'wkflowdsg_settings'
	};
	
	var wkflowdsg_methods = {
			
			init: function(options) {
				var defaults=wkflowdsg_defaults;
				
				var newProcess ="<div class='mainproc'>" +
								"	<div class='mainproc-pic'><img id='flowStart' class='flowIcon', src='images/start.png' title='Start the workflow'></div>" +
								"   <div class='startend'>" +
								"       <div class='task-title'>" +
								"       	<table class='icon_table'>" + 
								"           	<tr>" + 
								"                   <td class='task-title-table'>Start</td>" +
								"					<td class='funcIcon'><img id='setWFParameterImg' class='imgIcon', src='images/parameters3.png' title='Setup Workflow Parameters'></td>" +
								"                   <td><img id='expandStart' class='imgIcon expandIcon', src='images/expand.png' title='Show detail'></td>" +
								"                   <td><img id='collapseStart' class='imgIcon collapseIcon', src='images/collapse.png' title='Collapse the detail'></td>" +
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
				$(this).find("div[id='" + options.configDivId + "']").delegate(wkflowdsg_defaults.expandEventBinder,'mouseover',function(e) {
					$(this).attr("src","images/expand_on.png");
				});
				$(this).find("div[id='" + options.configDivId + "']").delegate(wkflowdsg_defaults.expandEventBinder,'mouseleave',function(e) {
					$(this).attr("src","images/expand.png");
				});
				$(this).find("div[id='" + options.configDivId + "']").delegate(wkflowdsg_defaults.collapseEventBinder,'mouseover',function(e) {
					$(this).attr("src","images/collapse_on.png");
				});
				$(this).find("div[id='" + options.configDivId + "']").delegate(wkflowdsg_defaults.collapseEventBinder,'mouseleave',function(e) {
					$(this).attr("src","images/collapse.png");
				});
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
									"                   <td><img id='expandStart' class='imgIcon expandIcon', src='images/expand.png' title='Show detail'></td>" +
									"                   <td><img id='collapseStart' class='imgIcon collapseIcon', src='images/collapse.png' title='Collapse the detail'></td>" +
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
				var ztreeDiv = "<div id='" + wkflowInfoZtreeDivId + "' class='ztree wkflwInfoZTree' dsgarea='" + options.dsgAreaId + "' wkflw_key='" + options.wkflowId + 
					"' wkflwInfoContainerDiv='" + wkflowInfoContainerDivId + "' wkflwZtreeDiv='" + wkflowInfoZtreeDivId + "'></div>";
				var wkflowInfoDivSettings = {
						"wkflowInfoContainerDivId":wkflowInfoContainerDivId,
						"wkflowInfoZtreeDivId":wkflowInfoZtreeDivId,
						"ztreeDiv":ztreeDiv
				};
				var _setting = $.extend(defaults,options,wkflowInfoDivSettings);
				$(this).data(wkflowdsg_defaults.componentSettings,_setting);
				console.debug(_setting);
				$('#' + wkflowInfoContainerDivId).append(ztreeDiv);
				var zTreeNodes = [
			      	{"name":"模版資訊", open:true, iconOpen:"css/zTreeStyle/img/diy/1_open.png", iconClose:"css/zTreeStyle/img/diy/1_close.png",children: [
			      	{ "name":"識別碼" + "-" + options.workflowTemplateInfo.WKFLW_KEY , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"編號" + "-" + options.workflowTemplateInfo.WKFLW_ID , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"名稱" + "-" + options.workflowTemplateInfo.WKFLW_NAME , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"類別" + "-" + options.workflowTemplateInfo.WKFLW_CATG , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"理由" + "-" + options.workflowTemplateInfo.WKFLW_REASON , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"說明" + "-" + options.workflowTemplateInfo.WKFLW_DESC , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"狀態" + "-" + options.workflowTemplateInfo.WKFLW_STATUS  , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"權限代碼" + "-" + options.workflowTemplateInfo.WKFLW_PRIV_ID  , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"申請人" + "-"  + options.workflowTemplateInfo.CALIM_USER , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"申請時間" + "-" + options.workflowTemplateInfo.CALIM_TIME  , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"BPMN流程編號" + "-" + options.workflowTemplateInfo.ACT_PROC_ID  , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"BPMN檔案名稱" + "-" + options.workflowTemplateInfo.ACT_PROC_DEF_FILE_NAME  , open:false,icon:"css/zTreeStyle/img/diy/9.png"}
			      	]}];
				
				var setting = {
				};
				var zTreeObj;
				zTreeObj=  $.fn.zTree.init($("#" + wkflowInfoZtreeDivId), setting, zTreeNodes);
				
				$('#' + wkflowInfoZtreeDivId).on('click',function(e){
					var dsgSourceDivId = $(this).attr('dsgarea');
					var dsgWorkflowKey= $(this).attr('wkflw_key');
					var wkflowInfoContainerDivId= $(this).attr('wkflwInfoContainerDiv');
					var wkflowInfoZtreeDivId= $(this).attr('wkflwZtreeDiv');
					console.debug(dsgSourceDivId);
					$('#' + dsgSourceDivId).trigger(wkflowdsg_defaults.wkflowInfoChangeReqEvent,
							[{wkflw_key:dsgWorkflowKey,containerId:wkflowInfoContainerDivId,
								ztreeDivId:wkflowInfoZtreeDivId}]);
					
				});
			},
			updateWorkflowInfo:function(options){
				console.debug("updateWorkflowInfo");
				console.debug(options);
				var _setting = $(this).data(wkflowdsg_defaults.componentSettings);
				//console.debug(_setting);
				//var wkflowInfoContainerDivId = _setting.wkflowInfoContainerDivId;
				var wkflowInfoZtreeDivId = _setting.wkflowInfoZtreeDivId;
				//var ztreeDiv = _setting.wkflowInfoZtreeDivId;
				//$('#' + wkflowInfoContainerDivId).append(ztreeDiv);
				zTreeNodes = [
			      	{"name":"模版資訊", open:true, iconOpen:"css/zTreeStyle/img/diy/1_open.png", iconClose:"css/zTreeStyle/img/diy/1_close.png",children: [
			      	{ "name":"識別碼" + "-" + options.workflowTemplateInfo.WKFLW_KEY , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"編號" + "-" + options.workflowTemplateInfo.WKFLW_ID , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"名稱" + "-" + options.workflowTemplateInfo.WKFLW_NAME , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"類別" + "-" + options.workflowTemplateInfo.WKFLW_CATG , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"理由" + "-" + options.workflowTemplateInfo.WKFLW_REASON , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"說明" + "-" + options.workflowTemplateInfo.WKFLW_DESC , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"狀態" + "-" + options.workflowTemplateInfo.WKFLW_STATUS  , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"權限代碼" + "-" + options.workflowTemplateInfo.WKFLW_PRIV_ID  , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"申請人" + "-"  + options.workflowTemplateInfo.CALIM_USER , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"申請時間" + "-" + options.workflowTemplateInfo.CALIM_TIME  , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"BPMN流程編號" + "-" + options.workflowTemplateInfo.ACT_PROC_ID  , open:false,icon:"css/zTreeStyle/img/diy/9.png"},
			      	{ "name":"BPMN檔案名稱" + "-" + options.workflowTemplateInfo.ACT_PROC_DEF_FILE_NAME  , open:false,icon:"css/zTreeStyle/img/diy/9.png"}
			      	]}];
				var setting = {
				};
				
				var zTreeObj=  $.fn.zTree.init($("#" + wkflowInfoZtreeDivId), setting, zTreeNodes);
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