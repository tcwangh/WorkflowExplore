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
				var dsgAreaId = theNewTabId + "_DesignArea";
				var dsgAreaLeftDivId = theNewTabId + "_DesignLeft"
				var dsgAreaRightDivId = theNewTabId + "_DesignRight"
				var dsgTabDivId= "tab_" + flowTab;
				var dsgSectionId = 	"<section id='" + dsgAreaId + "' class='designAreaContainer' >" + 
										"<div id='" + dsgAreaLeftDivId + "' class='designAreaLeft' ></div>" +
										"<div id='" + dsgAreaRightDivId + "' class='designAreaRight' ></div>" + 
									"</section>";
				$('#' + dsgTabDivId).append(dsgSectionId);
				$('#' + dsgAreaId).wkflowdsg('init',{
					configDivId:dsgAreaLeftDivId,
					displayDivId:dsgAreaRightDivId
				});
				
			},
			newFile : function (obj) {
				var newWrkflowId = obj.getFormattedDate();
				console.debug("Create New Workflow ID:" + newWrkflowId);
				//$('#tabContainer').jQdmtabAdd({
				//	newTabId:newWrkflowId,
				//	closeEventHandler:obj.closeTabEventHandler()});
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
			}
	}
	return theAppObj.init();
}