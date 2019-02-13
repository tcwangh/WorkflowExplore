package idv.tim.wkflowrest.exception;

public class WorkflowDeployException extends RuntimeException{
	
	private String workflowKey;
	private String message;

	public WorkflowDeployException(String workflowKey,String msg) {
		this.workflowKey = workflowKey;
		this.message = msg;
	}

	public String getWorkflowKey() {
		return workflowKey;
	}

	public String getMessage() {
		return message;
	}
	
	

}
