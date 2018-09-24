package idv.tim.wkflow.persistence.entity;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class WorkflowTemplateEntyId implements Serializable{
	
	@Column(name="WKFLW_KEY")
	private String key;
	@Column(name="WKFLW_NAME")
	private String name;
	@Column(name="WKFLW_VAL")
	private String value;
	
	public WorkflowTemplateEntyId() {
	}

	public WorkflowTemplateEntyId(String key, String name, String value) {
		this.key = key;
		this.name = name;
		this.value = value;
	}
	
	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	@Override
	public int hashCode() {
		return Objects.hash(getKey(),getName(),getValue());
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) return true;
        if (!(obj instanceof WorkflowTemplateEntyId)) return false;
        WorkflowTemplateEntyId that = (WorkflowTemplateEntyId) obj;
        return Objects.equals(getKey(), that.getKey()) &&
               Objects.equals(getName(), that.getName()) && 
               Objects.equals(getValue(), that.getValue());
	}
}
