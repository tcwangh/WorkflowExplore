package idv.tim.wkflowrest.model;

public class WorkflowInputVariable {
	
	private String name;
	private String type;
	private String memo;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	@Override
	public String toString() {
		
		return "[name:"+this.name+"],[type:" + this.type + "],[memo:" + this.memo+"]"; 
	}
	
	
}
