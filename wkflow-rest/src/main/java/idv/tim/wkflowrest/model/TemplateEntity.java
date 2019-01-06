package idv.tim.wkflowrest.model;

public class TemplateEntity {
	private String name;
	private String type;
	private String category;
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
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String toString() {
		
		return String.format("%1$-35s","Name:") + String.format("%1$-35s",this.name) + 
			   String.format("%1$-35s","Type:") + String.format("%1$-35s",this.type) +
			   String.format("%1$-35s","Category:") + String.format("%1$-35s",this.category) +
			   String.format("%1$-35s","Memo:") + String.format("%1$-35s",this.memo);
	}
	
}
