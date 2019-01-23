package idv.tim.wkflowrest.model;

public class TaskData {
	
	private String taskId;
	private String taskType;
	private String taskName;
	
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getTaskType() {
		return taskType;
	}
	public void setTaskType(String taskType) {
		this.taskType = taskType;
	}
	
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public String toString() {
		return String.format("%1$-10s","TaskId:") + String.format("%1$-15s",this.taskId) + 
				 String.format("%1$-10s","TaskType:") + String.format("%1$-15s",this.taskType)+ 
				 String.format("%1$-10s","TaskName:") + String.format("%1$-15s",this.taskName);
	}
}
