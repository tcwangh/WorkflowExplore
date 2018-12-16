package idv.tim.wkflowrest.persistence.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name="WKFLW_TEMP_ENTY")
@Entity
public class WorkflowTemplateEntyEntity {
	
	@EmbeddedId
	private WorkflowTemplateEntyId id;
	
	@Column(name="ENTITY_DESC")
	private String entityDescription;
	@Column(name="ENTITY_MEMO")
	private String entityMemo;
	@Column(name="CLAIM_USER")
	private String claimUser;
	@Column(name="CLAIM_TIME")
	private Timestamp claimTime;
		
	public WorkflowTemplateEntyEntity() {
	}

	public WorkflowTemplateEntyEntity(WorkflowTemplateEntyId id, String entityDescription, String entityMemo,
			String claimUser, Timestamp claimTime) {
		super();
		this.id = id;
		this.entityDescription = entityDescription;
		this.entityMemo = entityMemo;
		this.claimUser = claimUser;
		this.claimTime = claimTime;
	}
	
	public WorkflowTemplateEntyId getId() {
		return id;
	}
	public void setId(WorkflowTemplateEntyId id) {
		this.id = id;
	}
	public String getEntityDescription() {
		return entityDescription;
	}
	public void setEntityDescription(String entityDescription) {
		this.entityDescription = entityDescription;
	}
	public String getEntityMemo() {
		return entityMemo;
	}
	public void setEntityMemo(String entityMemo) {
		this.entityMemo = entityMemo;
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
}
