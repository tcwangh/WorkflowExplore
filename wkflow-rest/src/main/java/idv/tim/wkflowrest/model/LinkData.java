package idv.tim.wkflowrest.model;

public class LinkData {
	
	private String linkId;
	private String fromTaskId;
	private String toTaskId;
	
	
	
	public String getLinkId() {
		return linkId;
	}



	public void setLinkId(String linkId) {
		this.linkId = linkId;
	}



	public String getFromTaskId() {
		return fromTaskId;
	}



	public void setFromTaskId(String fromTaskId) {
		this.fromTaskId = fromTaskId;
	}



	public String getToTaskId() {
		return toTaskId;
	}



	public void setToTaskId(String toTaskId) {
		this.toTaskId = toTaskId;
	}



	public String toString() {
		return 	String.format("%1$-10s","LinkId:") + String.format("%1$-15s",this.linkId) + 
				 String.format("%1$-10s","FromTaskId:") + String.format("%1$-15s",this.fromTaskId) + 
				 String.format("%1$-10s","ToTaskId:") + String.format("%1$-15s",this.toTaskId);
	}

}
