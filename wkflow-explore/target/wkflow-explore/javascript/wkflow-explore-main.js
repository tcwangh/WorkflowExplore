/**
 * author:tcwangh 
 */
if (document.addEventListener) {
	document.addEventListener('DOMContentLoaded',eventDOMLoaded,false);
}
window.addEventListener('load',eventWindowLoaded,false);
function eventDOMLoaded () {
	console.log('我提前執行了');
}
var _theAppContext;
function eventWindowLoaded(){
	console.log('頁面初始化完畢');
	_theAppContext = appStart();
}
function appStart() {
	var workflowTemplatesMap = {};
	var theAppObj = {
			init: function() {
				this.initFuncIcons();
				this.initTabSection();
				$('#createWorkflowImg').on('click',jQuery.proxy(this,'newFile',this));
				//var newWorkflowIcon  = document.getElementById('createWorkflowImg') ;
				//newWorkflowIcon.onclick=this.newFile;
				var displayAreaInfo = this.getDisplayInfo();
				return this;
			},
			initFuncIcons : function () {
				var funIcon = 
					"<table class='icon_table'>" + 
						"<tr>" + 
							"<td class='funcIcon'><img id='createWorkflowImg' class='imgIcon', src='images/create1.png' title='Create New Workflow'></td>" +
							"<td class='funcIcon'><img id='downloadImg' class='imgIcon', src='images/download.png' title='Download BPMN and Settings'></td>" +
						"</tr>" + 
					"</table>";
				$('#toolbarDiv').append(funIcon);
			},
			initTabSection : function () {
				var dispTabs = 
					"<section id='tabContainer' class='tabContainer'>" + 
						"<ul id='tab_controls' class='tabControls'>" + 
						"</ul>" +
						"<div id='tab_container' class='tabContentsContainer'>" +
						"</div>" +
					"</section>";
				$('#disign-block-main').append(dispTabs);
				var tabContentPaddingSize = 5;
				//$('#tabContainer').jQdmtab({
				//	padding:tabContentPaddingSize,
				//	borderWidth:1});
				$('#tabContainer').ccwtab('init',{
					padding:tabContentPaddingSize,
					borderWidth:1,
					triggerTabCreateAfterEvent:'true',
					triggerTabChangeEvent:'true',
					contentsContainerClass:'tabContentsContainer'
				});
				$('#tabContainer').bind('ccwtab.TabCreateComplete',function(e,data){
					_theAppContext.tabCreateDone(e,data);
				});
				$('#tabContainer').bind('ccwtab.TabDeleteComplete',function(e,data){
					_theAppContext.tabDeleteDone(e,data);
				});
				$('#tabContainer').bind('ccwtab.TabChangeComplete',function(e,data){
					_theAppContext.tabChangeDone(e,data);
				});
			},
			initInnerDesignTabSection : function(parentDivId,theNewTabId) {
				console.debug(parentDivId)
				var designTabSectionId = 'dsgContainer_'+theNewTabId;
				var designTabUlId = 'dsg_controls_'+ theNewTabId;
				var designTabContainerId = 'dsg_container_' + theNewTabId;
				var dispTabs = 
					"<section id='" + designTabSectionId + "' class='tabContainer'>" + 
						"<div id='" + designTabContainerId + "' class='tabContentsContainer_below'>" +
						"</div>" +
						"<ul id='" + designTabUlId + "' class='tabControls_below'>" + 
						"</ul>" +
					"</section>";
				$('#' + parentDivId).append(dispTabs);
				$('#' + designTabSectionId).ccwtab('init',{
					padding:5,
					borderWidth:1,
					triggerTabCreateAfterEvent:'false',
					triggerTabChangeEvent:'false',
					contentsContainerClass:'tabContentsContainer_below'
				});
				var flowTab = theNewTabId+"_FLOW";
				$('#' + designTabSectionId).ccwtab('addtab',{
					newTabId:flowTab,
					displayName:'Design',
					closeTab:'disabled'
				});
				console.debug("FlowTabId is " + flowTab);
				/*
				var bpmnTab=theNewTabId+"_BPMN";
				$('#' + designTabSectionId).ccwtab('addtab',{
					newTabId:bpmnTab,
					displayName:'BPMN',
					closeTab:'disabled'
				});
				var sqlTab=theNewTabId+"_SQL";
				$('#' + designTabSectionId).ccwtab('addtab',{
					newTabId:sqlTab,
					displayName:'SQL',
					closeTab:'disabled'
				});
				*/
				var dsgAreaId = theNewTabId + "_DesignArea";
				var dsgAreaLeftDivId = theNewTabId + "_DesignLeft"
				var dsgAreaRightDivId = theNewTabId + "_DesignRight"
				var dsgTabDivId= "tab_" + flowTab;
				var workflowTemplateInfo = workflowTemplatesMap[theNewTabId];
				console.debug(workflowTemplateInfo);
				var dsgSectionId = 	"<section id='" + dsgAreaId + "' class='designAreaContainer' >" + 
										"<div id='" + dsgAreaLeftDivId + "' class='designAreaLeft' ></div>" +
										"<div id='" + dsgAreaRightDivId + "' class='designAreaRight' ></div>" + 
									"</section>";
				$('#' + dsgTabDivId).append(dsgSectionId);
				$('#' + dsgAreaId).wkflowdsg('init',{
					configDivId:dsgAreaLeftDivId,
					displayDivId:dsgAreaRightDivId,
					wkflowId:theNewTabId,
					dsgAreaId:dsgAreaId,
					workflowTemplateInfo:workflowTemplateInfo
				});
				$('#' + dsgAreaId).bind('wkflowdsg.wkflowInfoChangeReq',function(e,data){
					console.debug("ChangeWorkflowInfoRequest-"+ data.wkflw_key);
					//console.debug(e);
					//console.debug(data);
					//_theAppContext.tabChangeDone(e,data);
					var workflowTemplateInfo = workflowTemplatesMap[data.wkflw_key];
					//console.debug(workflowTemplateInfo);
					_theAppContext.showWorkflowInfoModifyForm(workflowTemplateInfo,_theAppContext.displayWorkflowInfoToZtree);
				});
				
			},
			newFile : function (obj) {
				var newWrkflowId = obj.getFormattedDate();
				console.debug("Create New Workflow ID:" + newWrkflowId);
				var workflowTemplateInfo = _theAppContext.getNewWorkflowTemplateObj(newWrkflowId);
				workflowTemplatesMap[newWrkflowId]=workflowTemplateInfo;
				console.debug(workflowTemplatesMap);
				$('#tabContainer').ccwtab('addtab',{
					newTabId:newWrkflowId,
					displayName:newWrkflowId,
					closeTab:'enabled'
				});
				
			},
			tabCreateDone : function (e,data) {
				console.debug(e);
				console.debug(data);
				var theNewCreateTabDivName = data.tabDivName;
				var theNewTabId = data.newTabId;
				console.debug("Tab Created-Div Name: " + data.tabDivName);
				_theAppContext.initInnerDesignTabSection(theNewCreateTabDivName,theNewTabId);
			},
			tabDeleteDone : function (e,data) {
				console.debug(e);
				console.debug(data);
				console.debug("Tab Deleted-Div Name: " + data.removedTabId + ";" +  data.removedTabDivName);
			},
			tabChangeDone : function (e,data) {
				console.debug(e);
				console.debug(data);
				console.debug("Activate Tab Id: " + data.activateTabId + "; Previous Tab id" +  data.previousTabid);
			},
			getDisplayInfo : function() {
				var displayInfo = {
						window_height:$(window).height(),  // returns height of browser viewport
						window_width:$(window).width(),     
						document_height:$(document).height(), // returns height of HTML document
						document_width:$(document).width(),
						screen_height:screen.height,
						screen_width:screen.width};
				console.log(displayInfo);
				return displayInfo;
			},
			getFormattedDate : function () {
				var d = new Date();
			    var str = "WKFLW_" +  d.getFullYear() + ('0' + (d.getMonth() + 1)).slice(-2) + ('0' + d.getDate()).slice(-2) + ('0' + d.getHours()).slice(-2) + ('0' + d.getMinutes()).slice(-2) + ('0' + d.getSeconds()).slice(-2);
			    return str;
			},
			closeTabEventHandler : function () {
				console.debug("tab closed");
			},
			showWorkflowInfoModifyForm : function (workflowTemplateInfo,callback) {
				var wkflwInfoModifyDialog = "<section id='modelInclude'></section>";
				var inputSrc = 	"<table class='form_table'>" +
							   		"<tr>" +
										"<td><label id='lbl_wkflwKey' class='form_label'>Workflow Key</label></td>" + 
				                    	"<td><input id='input_wkflwKey' type='text' disabled value='" + workflowTemplateInfo.WKFLW_KEY + "' class='textbox_M'></td>" +
				                    "</tr>" +
				                    "<tr>" +
				                    	"<td><label id='lbl_wkflwId' class='form_label'>Workflow ID</label></td>" + 
				                    	"<td><input id='input_wkflwId' type='text' value='" + workflowTemplateInfo.WKFLW_ID + "'  class='textbox_M'></td>" +
				                    "</tr>" +
				                    "<tr>" +
			                    		"<td><label id='lbl_wkflwName' class='form_label'>名稱</label></td>" + 
			                    		"<td><input id='input_wkflwName' type='text' value='" + workflowTemplateInfo.WKFLW_NAME + "' class='textbox_L'></td>" +
			                    	"</tr>" +
			                    	 "<tr>" +
			                    		"<td><label id='lbl_wkflwCatg' class='form_label'>類別</label></td>" + 
			                    		"<td><input id='input_wkflwCatg' type='text' value='" + workflowTemplateInfo.WKFLW_CATG + "' class='textbox_L'></td>" +
			                    	"</tr>" +
			                    	 "<tr>" +
			                    		"<td><label id='lbl_wkflwReason' class='form_label'>理由</label></td>" + 
			                    		"<td><input id='input_wkflwReason' type='text' value='" + workflowTemplateInfo.WKFLW_REASON + "' class='textbox_L'></td>" +
			                    	"</tr>" +
			                    	 "<tr>" +
			                    	 	"<td><label id='lbl_wkflwDesc' class='form_label'>說明</label></td>" + 
			                    		"<td><textarea id='input_wkflwDesc' class='textarea_L'>" + workflowTemplateInfo.WKFLW_DESC + "</textarea></td>" +
			                    	"</tr>" +
			                    	 "<tr>" +
			                    		"<td><label id='lbl_wkflwStatus' class='form_label'>狀態</label></td>" + 
			                    		"<td><input id='input_wkflwStatus' type='text' value='" + workflowTemplateInfo.WKFLW_STATUS + "' class='textbox_M'></td>" +
			                    	"</tr>" +
			                    	"<tr>" +
			                    		"<td><label id='lbl_wkflwPrivId' class='form_label'>權限代碼</label></td>" + 
			                    		"<td><input id='input_wkflwPrivId' type='text' value='" + workflowTemplateInfo.WKFLW_PRIV_ID + "' class='textbox_M'></td>" +
			                    	"</tr>" +
			                    	"<tr>" +
			                    		"<td><label id='lbl_wkflwClaimUser' class='form_label'>申請人</label></td>" + 
			                    		"<td><input id='input_wkflwClaimUser' type='text' value='" + workflowTemplateInfo.CALIM_USER + "' class='textbox_M'></td>" +
			                    	"</tr>" +
			                    	"<tr>" +
		                    			"<td><label id='lbl_wkflwClaimTime' class='form_label'>註冊時間</label></td>" + 
		                    			"<td><input id='input_wkflwDesc' type='text' disabled value='" + workflowTemplateInfo.CALIM_TIME + "' class='textbox_M'></td>" +
		                    		"</tr>" +
		                    		"<tr>" +
		                    			"<td><label id='lbl_bpmnProcId' class='form_label'>BPMN流程編號</label></td>" + 
		                    			"<td><input id='input_bpmnProcId' type='text' value='" + workflowTemplateInfo.ACT_PROC_ID + "' class='textbox_M'></td>" +
		                    		"</tr>" +
		                    		"<tr>" +
	                    				"<td><label id='lbl_bpmnFileName' class='form_label'>BPMN檔案名稱</label></td>" + 
	                    				"<td><input id='input_bpmnFileName' type='text' disabled value='" + workflowTemplateInfo.ACT_PROC_DEF_FILE_NAME + "' class='textbox_L'></td>" +
	                    			"</tr>" +
			                    "</table>";
				
				$('body').append(wkflwInfoModifyDialog);
				$('#modelInclude').ccwform('init',{
					inputSrc:inputSrc,
					dialogHeader:"設定樣板資訊",
					
				});
				$('#modelInclude').bind('ccwform.afterSubmit',function(e,data){
					console.debug(data);
					callback(data);
				});
			},
			displayWorkflowInfoToZtree(data){
				console.debug(data);
				var workflowTemplateInfo = workflowTemplatesMap[data.dialogInputData.input_wkflwKey];
				workflowTemplateInfo.WKFLW_NAME = data.dialogInputData.input_wkflwName;
				workflowTemplateInfo.WKFLW_CATG = data.dialogInputData.input_wkflwCatg;
				workflowTemplateInfo.WKFLW_REASON = data.dialogInputData.input_wkflwReason;
				workflowTemplateInfo.WKFLW_DESC = data.dialogInputData.input_wkflwDesc;
				workflowTemplateInfo.WKFLW_STATUS = data.dialogInputData.input_wkflwStatus;
				workflowTemplateInfo.WKFLW_PRIV_ID = data.dialogInputData.input_wkflwPrivId;
				workflowTemplateInfo.CALIM_USER = data.dialogInputData.input_wkflwClaimUser;
				workflowTemplateInfo.ACT_PROC_ID = data.dialogInputData.input_bpmnProcId;
				workflowTemplateInfo.ACT_PROC_DEF_FILE_NAME = data.dialogInputData.input_bpmnFileName;
				console.debug(workflowTemplateInfo);
				var dsgAreaId = data.dialogInputData.input_wkflwKey + "_DesignArea";
				$('#' + dsgAreaId).wkflowdsg('updateWorkflowInfo',{
					wkflowId:data.dialogInputData.input_wkflwKey,
					dsgAreaId:dsgAreaId,
					workflowTemplateInfo:workflowTemplateInfo
				});
			},
			getNewWorkflowTemplateObj:function(newWKFLW_KEY){
				var workflowTemplateInfo = {};
				workflowTemplateInfo.WKFLW_KEY=newWKFLW_KEY;
				workflowTemplateInfo.WKFLW_ID=newWKFLW_KEY;
				workflowTemplateInfo.WKFLW_NAME="TBD";
				workflowTemplateInfo.WKFLW_CATG="TBD";
				workflowTemplateInfo.WKFLW_REASON="TBD";
				workflowTemplateInfo.WKFLW_DESC="";
				workflowTemplateInfo.WKFLW_STATUS="";
				workflowTemplateInfo.WKFLW_PRIV_ID="";
				workflowTemplateInfo.CALIM_USER="";
				workflowTemplateInfo.CALIM_TIME="%SYS_DATE%";
				workflowTemplateInfo.ACT_PROC_ID="";
				workflowTemplateInfo.ACT_PROC_DEF_FILE_NAME="";
				return workflowTemplateInfo;
			}
	}
	return theAppObj.init();
}