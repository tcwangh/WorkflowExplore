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
	_theAppContext.loadWorkflowFromLocalStorage();
}
function appStart() {
	var designAreaForTabs="tabContainer";
	var LS_KEYS="LS_KEYS";
	var LS_KEY_HEAD="LS_KEY_";
	var LS_KEYS_ARRAY=[];
	var workflowDefinitionMap = {};
	var WORKFLOW_VARIABLE_TYPES = [
        { Name: "java.lang.String", Id: 0 },
        { Name: "java.util.collection", Id: 1 }
    ];
	var WORKFLOW_VARIABLE_CATEGORIES = [
        { Name: "ACT_PARM_NAME", Id: 0 },
        { Name: "PARM_NAME", Id: 1 }
    ];
	var theCodeMirrorObj = null; //only used in model form, will not have multi
	var theAppObj = {
			init: function() {
				this.initFuncIcons();
				this.initTabSection();
				$('#createWorkflowImg').on('click',jQuery.proxy(this,'newFile',this));
				$('#downloadImg').on('click',jQuery.proxy(this,'downloadBPMN',this));
				$('#runImg').on('click',jQuery.proxy(this,'runWorkflow',this));
				
				var displayAreaInfo = this.getDisplayInfo();
				return this;
			},
			initFuncIcons : function () {
				var funIcon = 
					"<table class='icon_table'>" + 
						"<tr>" + 
							"<td class='funcIcon'><img id='createWorkflowImg' class='imgIcon', src='images/create1.png' title='Create New Workflow'></td>" +
							"<td class='funcIcon'><img id='downloadImg' class='imgIcon', src='images/download.png' title='Download BPMN and Settings'></td>" +
							"<td class='funcIcon'><img id='runImg' class='imgIcon', src='images/run.png' title='Run the Workflow'></td>" +
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
					_theAppContext.removeWorkflowFromLocalStorage(data.removedTabId);
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
				var workflowDefinitionData= workflowDefinitionMap[theNewTabId];
				console.debug(workflowDefinitionData);
				var dsgSectionId = 	"<section id='" + dsgAreaId + "' class='designAreaContainer' wkflw_key='" + theNewTabId +"'>" + 
										"<div id='" + dsgAreaLeftDivId + "' class='designAreaLeft' ></div>" +
										"<div id='" + dsgAreaRightDivId + "' class='designAreaRight' ></div>" + 
									"</section>";
				$('#' + dsgTabDivId).append(dsgSectionId);
				$('#' + dsgAreaId).wkflowdsg('init',{
					configDivId:dsgAreaLeftDivId,
					displayDivId:dsgAreaRightDivId,
					wkflowId:theNewTabId,
					dsgAreaId:dsgAreaId,
					//workflowTemplateInfo:workflowTemplateInfo
					workflowDefinitionData:workflowDefinitionData
				});
				$('#' + dsgAreaId).bind('wkflowdsg.wkflowInfoChangeReq',function(e,data){
					console.debug("ChangeWorkflowInfoRequest-"+ data.wkflw_key);
					var workflowDefinitionData= workflowDefinitionMap[data.wkflw_key];
					_theAppContext.showWorkflowInfoModifyForm(workflowDefinitionData,_theAppContext.displayWorkflowInfoToZtree);
				});
				$('#' + dsgAreaId).bind('wkflowdsg.wkflowInfoChangeDone',function(e,data){
					//console.debug(e);
					//console.debug(data);
					_theAppContext.updateWorkflowToLocalStorage(data.wkflw_key);
				});
				$('#' + dsgAreaId).bind('wkflowdsg.wkflowParameterClick',function(e,data){
					console.debug(e);
					console.debug(data);
					if (data.parm_type=="workflow"){
						_theAppContext.showWorkflowGlobalParameterForm(data.wkflw_key,_theAppContext.updateWorkflowGlobalParameters);
					}else {
						console.debug("ChangeTaskSettings-"+ data.wkflw_key);
						var workflowDefinitionData= workflowDefinitionMap[data.wkflw_key];
						_theAppContext.showTaskParamModifyForm(workflowDefinitionData,data,_theAppContext.updateTaskSettings)
					}
					
				});
			},
			newFile : function (obj) {
				var newWrkflowId = obj.getFormattedDate();
				console.debug("Create New Workflow ID:" + newWrkflowId);
				var workflowDefinition = new WorkflowDefinition({"WKFLW_KEY":newWrkflowId});
				console.debug(workflowDefinition);
				workflowDefinitionMap[newWrkflowId]=workflowDefinition;
				LS_KEYS_ARRAY.push(newWrkflowId);
				this.updateWorkflowToLocalStorage(newWrkflowId);
				$('#tabContainer').ccwtab('addtab',{
					newTabId:newWrkflowId,
					displayName:newWrkflowId,
					closeTab:'enabled'
				});
				
			},
			updateWorkflowToLocalStorage:function(workflowId){
				var keyLen = LS_KEYS_ARRAY.length;
				var keyList="";
				for(var i=0;i<keyLen;i++){
					if (i==keyLen-1) {
						keyList += LS_KEYS_ARRAY[i];
					}else {
						keyList += LS_KEYS_ARRAY[i]+",";
					}
				}
				console.debug("updateWorkflowToLocalStorage["+LS_KEYS+"]:" + keyList);
				window.localStorage.removeItem(LS_KEYS);
				window.localStorage.setItem(LS_KEYS, keyList);
				var workflowDefinitionObj= workflowDefinitionMap[workflowId].getJsonObject();
				console.debug(workflowDefinitionObj)
				var LS_KEY_NAME= LS_KEY_HEAD + workflowId;
				window.localStorage.setItem(LS_KEY_NAME, JSON.stringify(workflowDefinitionObj));
			},
			loadWorkflowFromLocalStorage:function(){
				var workflowKeys = window.localStorage.getItem(LS_KEYS);
				console.debug(workflowKeys);
				if (workflowKeys!==null && workflowKeys!==''){
					var workflowKeyArray = workflowKeys.split(",");
					console.debug(workflowKeyArray.length);
					for (var i=0;i<workflowKeyArray.length;i++) {
						if (workflowKeyArray[i] !=null) {
							var tmpLocalStorageWorkflowDataKey = LS_KEY_HEAD+workflowKeyArray[i];
							var tmpLocalStorageworkflowData = window.localStorage.getItem(tmpLocalStorageWorkflowDataKey);
							console.debug(tmpLocalStorageWorkflowDataKey);
							console.debug(tmpLocalStorageworkflowData);
							var workflowDefinition = new WorkflowDefinition({"WKFLW_KEY":workflowKeyArray[i]});
							workflowDefinition.parseJson(tmpLocalStorageworkflowData);
							LS_KEYS_ARRAY.push(workflowKeyArray[i]);
							workflowDefinitionMap[workflowKeyArray[i]]=workflowDefinition;
							$('#tabContainer').ccwtab('addtab',{
								newTabId:workflowKeyArray[i],
								displayName:workflowKeyArray[i],
								closeTab:'enabled'
							});
						}
					}
					
				}
				
				var localStorageKeys = Object.keys(localStorage);
				for (var i=0;i<localStorageKeys.length;i++) {
					console.debug(localStorageKeys[i]);
				}
				
			},
			removeWorkflowFromLocalStorage:function(workflowId){
				var index = LS_KEYS_ARRAY.indexOf(workflowId);
				console.debug("removeWorkflowFromLocalStorage:" + workflowId + "," + index);
				if (index>-1) {
					console.debug(LS_KEYS_ARRAY);
					console.debug(workflowDefinitionMap);
					LS_KEYS_ARRAY.splice(index,1);
					delete workflowDefinitionMap[workflowId];
					var keyLen = LS_KEYS_ARRAY.length;
					var keyList="";
					for(var i=0;i<keyLen;i++){
						if (i==keyLen-1) {
							keyList += LS_KEYS_ARRAY[i];
						}else {
							keyList += LS_KEYS_ARRAY[i]+",";
						}
					}
					console.debug("removeWorkflowFromLocalStorage["+LS_KEYS+"]:" + keyList);
					window.localStorage.removeItem(LS_KEYS);
					window.localStorage.setItem(LS_KEYS, keyList);
					var LS_KEY_NAME= LS_KEY_HEAD + workflowId;
					window.localStorage.removeItem(LS_KEY_NAME);
				}
			},
			downloadBPMN : function (obj) {
				console.debug(obj);
				console.debug("Hi,Let's download BPMN");
				var theActiveTabInfo = $('#' + designAreaForTabs).ccwtab('getActiveTab',{});
				console.debug(theActiveTabInfo);
				var workflowDefinitionData= workflowDefinitionMap[theActiveTabInfo.currentTabId];
				console.debug(workflowDefinitionData.getJsonObject());
				
				var dsgAreaId = theActiveTabInfo.currentTabId + "_DesignArea";
				var taskSettings = $('#' + dsgAreaId).wkflowdsg('getTaskSettings',{});
				console.debug(taskSettings);	
				workflowDefinitionData.updateTaskList(taskSettings);
				workflowDefinitionData.updateLinkList(taskSettings);
				_theAppContext.updateWorkflowToLocalStorage(theActiveTabInfo.currentTabId);
				/*
				var search = {	"templateData": {	"workflowKey":"WKFLW000001",
	 				  								"workflowId":"dynamicStartEndProcess",
	 				  								"workflowName":"Dynamic Start End Process",
	 				  								"workflowCategory":"Dynamic Processes",
	 				  								"workflowReason":"startEndActivity",
	 				  								"workflowDescription":"Hello",
	 				  								"workflowStatus":"Enabled",
	 				  								"workflowPrivilegeId":"WKFLW000001",
	 				  								"claimUser":"tcwangh",
	 				  								"claimTime":"",
	 				  								"workflowActivitiProcessId":"",
	 				  								"workflowActivitiDefFileName":""
	                 							},
	                 			"inputVariables":[{"name":"lotId","type":"java.lang.String","memo":"hello"}],
	                 			"inputValues":[{"name":"lotId","type":"java.lang.String","value":"Tim00001.00"}]
				};
				*/
				S_downloadBPMN_SQL(workflowDefinitionData.getJsonObject());   
			},
			downloadBPMNDone:function(obj){
				console.debug("downloadBPMNDone");
				console.debug(obj);
				var zip = new JSZip();
				zip.file(obj.Response.bpmnXmlFileName, obj.Response.bpmnXmlContent);
				zip.file(obj.Response.sqlFileName, obj.Response.sqlContent);
				var blob = zip.generate({type:"blob"});
				saveAs(blob, obj.Response.workflowName + ".zip");
			},
			runWorkflow:function(obj) {
				console.debug(obj);
				console.debug("Hi,Let's run the workflow");
				var theActiveTabInfo = $('#' + designAreaForTabs).ccwtab('getActiveTab',{});
				console.debug(theActiveTabInfo);
				var workflowDefinitionData= workflowDefinitionMap[theActiveTabInfo.currentTabId];
				console.debug(workflowDefinitionData);
				if (workflowDefinitionData.templateEntities != null && workflowDefinitionData.templateEntities.length > 0) {
					//for(var i=0;i<workflowDefinitionData.templateEntities.length;i++){
					//	console.debug(workflowDefinitionData.templateEntities[i].category + "-" + workflowDefinitionData.templateEntities[i].name);
					//}
					_theAppContext.showWorkflowGlobalParameterTestValueInputForm(workflowDefinitionData,_theAppContext.getInputWorkflowTestData);
				}
			},
			getInputWorkflowTestData:function(workflowKey,data){
				console.debug(workflowKey);
				console.debug(data);
				var workflowDefinitionData= workflowDefinitionMap[workflowKey];
				console.debug(workflowDefinitionData);
				var inputTestData = {};
			    if (workflowDefinitionData.templateEntities != null && workflowDefinitionData.templateEntities.length > 0) {
					for(var i=0;i<workflowDefinitionData.templateEntities.length;i++){
						var tmpKey = "input_" + workflowDefinitionData.templateEntities[i].name;
						var tmpValue = "";
						if(tmpKey in data.dialogInputData) {
							tmpValue = data.dialogInputData[tmpKey];
						}
						inputTestData[workflowDefinitionData.templateEntities[i].name]=tmpValue;
					}
				}
				console.debug(inputTestData);
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
			
			showWorkflowGlobalParameterTestValueInputForm : function (workflowDefinitionData,callback) {
				var wkflwInfoModifyDialog = "<section id='modelInclude'></section>";
				var inputSrc = 	"<table class='form_table'>" ;
				for(var i=0;i<workflowDefinitionData.templateEntities.length;i++){
					inputSrc += "<tr>" ;
					inputSrc += 	"<td><label id='lbl_" + workflowDefinitionData.templateEntities[i].name + "' class='form_label'>" + workflowDefinitionData.templateEntities[i].name + "</label></td>" + 
                					"<td><input id='input_" + workflowDefinitionData.templateEntities[i].name + "' type='text' value='' class='textbox_M'></td>" ;
					inputSrc += "</tr>";
				}
				inputSrc += "</table>";
				$('body').append(wkflwInfoModifyDialog);
				$('#modelInclude').ccwform('init',{
					inputSrc:inputSrc,
					dialogHeader:"輸入Workflow執行測試資料",
					hasGrid:false,
					gridSettings:{},
					eventBinder:null
				});
				$('#modelInclude').bind('ccwform.afterSubmit',function(e,data){
					console.debug(data);
					callback(workflowDefinitionData.templateData.WKFLW_KEY,data);
				});
			},
			showTaskParamModifyForm : function (workflowDefinitionData,taskData,callback) {
				var taskParmModifyDialog = "<section id='modelInclude'></section>";
				var inputSrc = 	"<div class='task_comm_setting'>" +
									"<table class='form_table'>" + 
				 						"<tr>" +
				 							"<td><label id='lbl_taskType' class='form_label'>任務類型</label></td>" + 
				 							"<td>" +
				 							"    <select id='input_taskType'>" +
				 							"      <option value='service'>Service Task</option>" +
				 							"      <option value='script'>Script Task</option>" +
				 							"    </select>" +
				 							"</td>" +
				 						"</tr>" + 
				 					"</table>" +
				 				"</div>" + 
				 				"<div id='task_service_setting_div' class='task_service_setting'>Service</div>" + 
				 				"<div id='task_script_setting_div' class='task_script_setting'>" +
				 					"<textarea id='code' name='code'>" +
				 					"//this block allow you to define function&#13;" +
				 					"//please define your function in javascript.&#13;" +
				 					"//Hot keys: &#13;" +
				 					"//CTRL-ALT:Autocomplete"+
				 					"</textarea>" +
				 				"</div>";
				$('body').append(taskParmModifyDialog);
				
				
				$('#modelInclude').ccwform('init',{
					inputSrc:inputSrc,
					dialogHeader:"設定流程任務",
					hasGrid:false,
					width:"600px",
					height:"500px",
					gridSettings:{},
					eventBinder:_theAppContext.bindEventTaskParamModifyForm
				});
				$('#modelInclude').bind('ccwform.afterSubmit',function(e,data){
					console.debug(data);
					callback(workflowDefinitionData.templateData.WKFLW_KEY,data);
				});
			},
			bindEventTaskParamModifyForm : function(){
				//Default show service task div
				$("#input_taskType").val("service");
				var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
				        lineNumbers: true,
				        matchBrackets: true,
				        extraKeys: {"Ctrl-Alt": "autocomplete"},
				        //mode: "text/typescript",
				        mode: {name: "javascript", globalVars: true},
				        autoRefresh:true,
				        autofocus: true
				});
				_theAppContext.theCodeMirrorObj = editor;
				console.debug(_theAppContext.theCodeMirrorObj.lineCount());
				$("#task_script_setting_div").hide();
				$("#task_service_setting_div").show();
				$('#input_taskType').change(function() {
					if (this.value == "script") {
						$("#task_script_setting_div").show(20);
						$("#task_service_setting_div").hide(20);
						//console.debug(_theAppContext.theCodeMirrorObj.lineCount());
						_theAppContext.theCodeMirrorObj.focus();
						_theAppContext.theCodeMirrorObj.setCursor(_theAppContext.theCodeMirrorObj.lineCount(), 0);
						_theAppContext.theCodeMirrorObj.refresh();
					}else {
						$("#task_script_setting_div").hide(20);
						$("#task_service_setting_div").show(20);
					}
					console.debug(this.value);
				});
				
			},
			showWorkflowInfoModifyForm : function (workflowDefinitionData,callback) {
				var wkflwInfoModifyDialog = "<section id='modelInclude'></section>";
				var inputSrc = 	"<table class='form_table'>" +
							   		"<tr>" +
										"<td><label id='lbl_wkflwKey' class='form_label'>Workflow Key</label></td>" + 
				                    	"<td><input id='input_wkflwKey' type='text' disabled value='" + workflowDefinitionData.templateData.WKFLW_KEY + "' class='textbox_M'></td>" +
				                    "</tr>" +
				                    "<tr>" +
				                    	"<td><label id='lbl_wkflwId' class='form_label'>Workflow ID</label></td>" + 
				                    	"<td><input id='input_wkflwId' type='text' value='" + workflowDefinitionData.templateData.WKFLW_ID + "'  class='textbox_M'></td>" +
				                    "</tr>" +
				                    "<tr>" +
			                    		"<td><label id='lbl_wkflwName' class='form_label'>名稱</label></td>" + 
			                    		"<td><input id='input_wkflwName' type='text' value='" + workflowDefinitionData.templateData.WKFLW_NAME + "' class='textbox_L'></td>" +
			                    	"</tr>" +
			                    	 "<tr>" +
			                    		"<td><label id='lbl_wkflwCatg' class='form_label'>類別</label></td>" + 
			                    		"<td><input id='input_wkflwCatg' type='text' value='" + workflowDefinitionData.templateData.WKFLW_CATG + "' class='textbox_L'></td>" +
			                    	"</tr>" +
			                    	 "<tr>" +
			                    		"<td><label id='lbl_wkflwReason' class='form_label'>理由</label></td>" + 
			                    		"<td><input id='input_wkflwReason' type='text' value='" + workflowDefinitionData.templateData.WKFLW_REASON + "' class='textbox_L'></td>" +
			                    	"</tr>" +
			                    	 "<tr>" +
			                    	 	"<td><label id='lbl_wkflwDesc' class='form_label'>說明</label></td>" + 
			                    		"<td><textarea id='input_wkflwDesc' class='textarea_L'>" + workflowDefinitionData.templateData.WKFLW_DESC + "</textarea></td>" +
			                    	"</tr>" +
			                    	 "<tr>" +
			                    		"<td><label id='lbl_wkflwStatus' class='form_label'>狀態</label></td>" + 
			                    		"<td><input id='input_wkflwStatus' type='text' value='" + workflowDefinitionData.templateData.WKFLW_STATUS + "' class='textbox_M'></td>" +
			                    	"</tr>" +
			                    	"<tr>" +
			                    		"<td><label id='lbl_wkflwPrivId' class='form_label'>權限代碼</label></td>" + 
			                    		"<td><input id='input_wkflwPrivId' type='text' value='" + workflowDefinitionData.templateData.WKFLW_PRIV_ID + "' class='textbox_M'></td>" +
			                    	"</tr>" +
			                    	"<tr>" +
			                    		"<td><label id='lbl_wkflwClaimUser' class='form_label'>申請人</label></td>" + 
			                    		"<td><input id='input_wkflwClaimUser' type='text' value='" + workflowDefinitionData.templateData.CALIM_USER + "' class='textbox_M'></td>" +
			                    	"</tr>" +
			                    	"<tr>" +
		                    			"<td><label id='lbl_wkflwClaimTime' class='form_label'>註冊時間</label></td>" + 
		                    			"<td><input id='input_wkflwDesc' type='text' disabled value='" + workflowDefinitionData.templateData.CALIM_TIME + "' class='textbox_M'></td>" +
		                    		"</tr>" +
		                    		"<tr>" +
		                    			"<td><label id='lbl_bpmnProcId' class='form_label'>BPMN流程編號</label></td>" + 
		                    			"<td><input id='input_bpmnProcId' type='text' value='" + workflowDefinitionData.templateData.ACT_PROC_ID + "' class='textbox_M'></td>" +
		                    		"</tr>" +
		                    	"</table>";
				
				$('body').append(wkflwInfoModifyDialog);
				$('#modelInclude').ccwform('init',{
					inputSrc:inputSrc,
					dialogHeader:"設定樣板資訊",
					hasGrid:false,
					gridSettings:{},
					eventBinder:null
				});
				$('#modelInclude').bind('ccwform.afterSubmit',function(e,data){
					console.debug(data);
					callback(data);
				});
			},
			displayWorkflowInfoToZtree(data){
				console.debug(data);
				var workflowDefinitionData = workflowDefinitionMap[data.dialogInputData.input_wkflwKey]
				workflowDefinitionData.templateData.WKFLW_NAME = data.dialogInputData.input_wkflwName;
				workflowDefinitionData.templateData.WKFLW_CATG = data.dialogInputData.input_wkflwCatg;
				workflowDefinitionData.templateData.WKFLW_REASON = data.dialogInputData.input_wkflwReason;
				workflowDefinitionData.templateData.WKFLW_DESC = data.dialogInputData.input_wkflwDesc;
				workflowDefinitionData.templateData.WKFLW_STATUS = data.dialogInputData.input_wkflwStatus;
				workflowDefinitionData.templateData.WKFLW_PRIV_ID = data.dialogInputData.input_wkflwPrivId;
				workflowDefinitionData.templateData.CALIM_USER = data.dialogInputData.input_wkflwClaimUser;
				workflowDefinitionData.templateData.ACT_PROC_ID = data.dialogInputData.input_bpmnProcId;
				workflowDefinitionData.templateData.ACT_PROC_DEF_FILE_NAME = data.dialogInputData.input_wkflwName +  ".bpmn20.xml";
				console.debug(workflowDefinitionData);
				//updateWorkflowToLocalStorage(data.dialogInputData.input_wkflwKey);
				var dsgAreaId = data.dialogInputData.input_wkflwKey + "_DesignArea";
				$('#' + dsgAreaId).wkflowdsg('updateWorkflowInfo',{
					wkflowId:data.dialogInputData.input_wkflwKey,
					dsgAreaId:dsgAreaId,
					workflowDefinitionData:workflowDefinitionData
				});
			},
			showWorkflowGlobalParameterForm:function(wkflowKey,callback){
				console.debug(wkflowKey);
				var wkflwInfoModifyDialog = "<section id='modelInclude' wkflw_key='" + wkflowKey + "'></section>";
				$('body').append(wkflwInfoModifyDialog);
				var workflowDefinitionData = workflowDefinitionMap[wkflowKey]
				//var clients = [
			    //    { "Name": "FAB_CODE", "Type": "java.lang.String", "Memo": "Fab Code", "Category": "ACT_PARM_NAME"},
			    //    { "Name": "LOT_ID", "Type": "java.lang.String", "Memo": "Lot Id", "Category": "ACT_PARM_NAME"},
			    //    { "Name": "TOOL_ID", "Type": "java.lang.String", "Memo": "Tool Id", "Category": "ACT_PARM_NAME"},
			    //];
				
				var gridSettings = {
						width: "100%",
						height: "400px",
						inserting: true,
						editing: true,
						sorting: true,
						paging: true,
			 			data: workflowDefinitionData.templateEntities,
			 			fields: [
							{ title: "Name", name: "name", type: "text", width: 150, validate: "required" },
							{ title: "Type", name: "type", type: "select", items:WORKFLOW_VARIABLE_TYPES,valueField: "Name", textField: "Name", width: 150 },
							{ title: "Category", name: "category", type: "select", items: WORKFLOW_VARIABLE_CATEGORIES, valueField: "Name", textField: "Name",width:150 },
							{ title: "Memo", name: "memo", type: "text", width: 200 },
							{ type: "control" }
						]};
				var inputSrc = 	"<div id='jsGrid' wkflw_key='" + wkflowKey + "'></div>";
				
				$('#modelInclude').ccwform('init',{
					inputSrc:inputSrc,
					dialogHeader:"Setup Workflow Global Parameters",
					hasGrid:true,
					width:"750px",
					gridSettings:gridSettings,
					eventBinder:null
				});
				$('#modelInclude').bind('ccwform.afterSubmit',function(e,data){
					console.debug(data);
					callback(data);
				});
			},
			updateWorkflowGlobalParameters:function(data){
				console.debug(data);
				if (data.gridData.length > 0) {
					console.debug(data.wkflw_key + ";" + data.gridData);
					var workflowDefinitionData = workflowDefinitionMap[data.wkflw_key];
					workflowDefinitionData.templateEntities = data.gridData;
					_theAppContext.updateWorkflowToLocalStorage(data.wkflw_key);
				}
			},
			updateWorkflowConsole:function(data) {
				var dsgAreaId = data.Response.workflowKey + "_DesignArea";
				console.debug(dsgAreaId);
				$('#' + dsgAreaId).wkflowdsg('updateConsole',{data:data});
					
			},
			updateTaskSettings:function(data){
				console.debug(data);
			}
	}
	return theAppObj.init();
}