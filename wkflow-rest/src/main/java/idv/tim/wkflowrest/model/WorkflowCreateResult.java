package idv.tim.wkflowrest.model;

public class WorkflowCreateResult {
	
	private BPMNDeployStatus bpmnDeployStatus;
	private InstanceCreateResult  instanceCreationResult;

	public BPMNDeployStatus getBpmnDeployStatus() {
		return bpmnDeployStatus;
	}

	public void setBpmnDeployStatus(BPMNDeployStatus bpmnDeployStatus) {
		this.bpmnDeployStatus = bpmnDeployStatus;
	}

	public InstanceCreateResult getInstanceCreationResult() {
		return instanceCreationResult;
	}

	public void setInstanceCreationResult(InstanceCreateResult instanceCreationResult) {
		this.instanceCreationResult = instanceCreationResult;
	}
	


}
