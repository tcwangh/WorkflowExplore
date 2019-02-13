package idv.tim.wkflowrest.exception;

public class WorkflowError {
	private String workflowKey;
	private int code;
	private String message;
	
	public WorkflowError(String workflowKey,int code, String message) {
		this.code = code;
		this.message = message;
		this.workflowKey = workflowKey;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getWorkflowKey() {
		return workflowKey;
	}
	public void setWorkflowKey(String workflowKey) {
		this.workflowKey = workflowKey;
	}
	
	

}
