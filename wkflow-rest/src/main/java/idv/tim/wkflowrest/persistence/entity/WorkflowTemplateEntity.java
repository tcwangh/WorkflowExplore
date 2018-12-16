package idv.tim.wkflowrest.persistence.entity;

import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name="WKFLW_TEMP")
@Entity
public class WorkflowTemplateEntity {
	private static final long serialVersionUID = 1L;
	 
	@Id
	@Column(name="WKFLW_KEY")
	private String key;
	
	@Column(name="WKFLW_ID")
	private String id;
	
	@Column(name="WKFLW_NAME")
	private String name;
	
	@Column(name="WKFLW_CATG")
	private String category;
	
	@Column(name="WKFLW_REASON")
	private String reason;
	
	@Column(name="WKFLW_DESC")
	private String description;
	
	@Column(name="WKFLW_STATUS")
	private String status;
	
	@Column(name="WKFLW_PRIV_ID")
	private String privilegeId;
	
	@Column(name="CLAIM_USER")
	private String claimUser;
	
	@Column(name="CLAIM_TIME", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Timestamp claimTime;
	
	@Column(name="ACT_PROC_ID")
	private String activitiProcessId;
	
	@Column(name="ACT_PROC_DEF_FILE_NAME")
	private String activitiProcessDefinitionFileName;
	
		
	public WorkflowTemplateEntity() {
		
	}
	public WorkflowTemplateEntity(String key, String id, String name, String category, String reason,
			String description, String status, String privilegeId, String claimUser,Timestamp claimTime, String activitiProcessId,
			String activitiProcessDefinitionFileName) {
		super();
		this.key = key;
		this.id = id;
		this.name = name;
		this.category = category;
		this.reason = reason;
		this.description = description;
		this.status = status;
		this.privilegeId = privilegeId;
		this.claimUser = claimUser;
		this.claimTime = claimTime;
		this.activitiProcessId = activitiProcessId;
		this.activitiProcessDefinitionFileName = activitiProcessDefinitionFileName;
		
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPrivilegeId() {
		return privilegeId;
	}
	public void setPrivilegeId(String privilegeId) {
		this.privilegeId = privilegeId;
	}
	public String getClaimUser() {
		return claimUser;
	}
	public void setClaimUser(String claimUser) {
		this.claimUser = claimUser;
	}
	public Timestamp getClaimTime() {
		return claimTime;
	}
	public void setClaimTime(Timestamp claimTime) {
		this.claimTime = claimTime;
	}
	public String getActivitiProcessId() {
		return activitiProcessId;
	}
	public void setActivitiProcessId(String activitiProcessId) {
		this.activitiProcessId = activitiProcessId;
	}
	public String getActivitiProcessDefinitionFileName() {
		return activitiProcessDefinitionFileName;
	}
	public void setActivitiProcessDefinitionFileName(String activitiProcessDefinitionFileName) {
		this.activitiProcessDefinitionFileName = activitiProcessDefinitionFileName;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	
	

}
