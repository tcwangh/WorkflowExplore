package idv.tim.wkflowrest.model;

public class WorkflowModelRes {
	private String resultCode = "0";
	private String resultMessage = "Normal End";
	private String workflowKey = "";
	private String workflowName = "";
	private String bpmnXmlContent = "";
	private String bpmnXmlFileName = "";
	private String sqlContent = "";
	private String sqlFileName = "";
	private String autoDeployment = "";
	private WorkflowDeployResult theDeployResult= null;
	private String workflowSettings = "Hi,Tim" ;
	private String subWorkflowSettings = "Hi,Tim";
	
	public String getWorkflowKey() {
		return workflowKey;
	}

	public void setWorkflowKey(String workflowKey) {
		this.workflowKey = workflowKey;
	}

	public String getWorkflowSettings() {
		return workflowSettings;
	}

	public void setWorkflowSettings(String workflowSettings) {
		this.workflowSettings = workflowSettings;
	}

	public String getSubWorkflowSettings() {
		return subWorkflowSettings;
	}

	public void setSubWorkflowSettings(String subWorkflowSettings) {
		this.subWorkflowSettings = subWorkflowSettings;
	}

	public String getBpmnXmlContent() {
		return bpmnXmlContent;
	}

	public void setBpmnXmlContent(String bpmnXmlContent) {
		this.bpmnXmlContent = bpmnXmlContent;
	}

	public String getBpmnXmlFileName() {
		return bpmnXmlFileName;
	}

	public void setBpmnXmlFileName(String bpmnXmlFileName) {
		this.bpmnXmlFileName = bpmnXmlFileName;
	}
	
	public String getSqlContent() {
		return sqlContent;
	}
	
	public String getSqlFileName() {
		return sqlFileName;
	}

	public void setSqlFileName(String sqlFileName) {
		this.sqlFileName = sqlFileName;
	}

	public void setSqlContent(String sqlContent) {
		this.sqlContent = sqlContent;
	}

	public String getAutoDeployment() {
		return autoDeployment;
	}

	public void setAutoDeployment(String autoDeployment) {
		this.autoDeployment = autoDeployment;
	}

	public WorkflowDeployResult getTheDeployResult() {
		return theDeployResult;
	}

	public void setTheDeployResult(WorkflowDeployResult theDeployResult) {
		this.theDeployResult = theDeployResult;
	}

	public String getWorkflowName() {
		return workflowName;
	}

	public void setWorkflowName(String workflowName) {
		this.workflowName = workflowName;
	}

	public String getResultCode() {
		return resultCode;
	}

	public void setResultCode(String resultCode) {
		this.resultCode = resultCode;
	}

	public String getResultMessage() {
		return resultMessage;
	}

	public void setResultMessage(String resultMessage) {
		this.resultMessage = resultMessage;
	}

}
