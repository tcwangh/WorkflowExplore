/**
 * constructor
 * WKFLW_KEY
 */

function WorkflowDefinition(config) {
	this.templateData = {};
	this.templateData.WKFLW_KEY=config.WKFLW_KEY;
	this.templateData.WKFLW_ID=config.WKFLW_KEY;
	this.templateData.WKFLW_NAME="TBD";
	this.templateData.WKFLW_CATG="TBD";
	this.templateData.WKFLW_REASON="TBD";
	this.templateData.WKFLW_DESC="";
	this.templateData.WKFLW_STATUS="Enabled";
	this.templateData.WKFLW_PRIV_ID="";
	this.templateData.CALIM_USER="";
	this.templateData.CALIM_TIME="%SYS_DATE%";
	this.templateData.ACT_PROC_ID="";
	this.templateData.ACT_PROC_DEF_FILE_NAME="";
}

WorkflowDefinition.prototype.updateTemplateData = function(config) {
	this.templateData.WKFLW_NAME = config.WKFLW_NAME;
	this.templateData.WKFLW_CATG = config.WKFLW_CATG;
	this.templateData.WKFLW_REASON = config.WKFLW_REASON
	this.templateData.WKFLW_DESC = config.WKFLW_DESC
	//this.templateData.WKFLW_STATUS = config.WKFLW_STATUS
	this.templateData.WKFLW_PRIV_ID = config.WKFLW_PRIV_ID
	this.templateData.CALIM_USER = config.CALIM_USER
	this.templateData.ACT_PROC_ID = config.ACT_PROC_ID
	this.templateData.ACT_PROC_DEF_FILE_NAME = config.ACT_PROC_DEF_FILE_NAME
}

WorkflowDefinition.prototype.getJsonObject = function() {
	var theObj = { "templateData": 	{	"workflowKey":this.templateData.WKFLW_KEY,
										"workflowId":this.templateData.WKFLW_KEY,
										"workflowName":this.templateData.WKFLW_NAME,
										"workflowCategory":this.templateData.WKFLW_CATG,
										"workflowReason":this.templateData.WKFLW_REASON,
										"workflowDescription":this.templateData.WKFLW_DESC,
										"workflowStatus":this.templateData.WKFLW_STATUS,
										"workflowPrivilegeId":this.templateData.WKFLW_PRIV_ID,
										"claimUser":this.templateData.CALIM_USER,
										"claimTime":this.templateData.CALIM_TIME,
										"workflowActivitiProcessId":this.templateData.ACT_PROC_ID,
										"workflowActivitiDefFileName":this.templateData.ACT_PROC_DEF_FILE_NAME
									},
					"inputVariables":[{"name":"lotId","type":"java.lang.String","memo":"hello"}],
					"inputValues":[{"name":"lotId","type":"java.lang.String","value":"Tim00001.00"}]
			
	};
	return theObj;
}