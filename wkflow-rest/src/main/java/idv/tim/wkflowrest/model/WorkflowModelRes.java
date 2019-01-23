package idv.tim.wkflowrest.model;

public class WorkflowModelRes {
	
	private String bpmnXmlContent = "";
	private String bpmnXmlFileName = "";
	private String autoDeployment = "";
	private WorkflowDeployResult theDeployResult= null;
	private String workflowSettings = "Hi,Tim" ;
	private String subWorkflowSettings = "Hi,Tim";

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
	
	

}
