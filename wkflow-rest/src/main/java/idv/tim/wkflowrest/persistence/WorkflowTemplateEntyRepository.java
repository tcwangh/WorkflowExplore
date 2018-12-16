package idv.tim.wkflowrest.persistence;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import idv.tim.wkflowrest.persistence.entity.WorkflowTemplateEntyEntity;
import idv.tim.wkflowrest.persistence.entity.WorkflowTemplateEntyId;

@Repository
public interface WorkflowTemplateEntyRepository 
	extends JpaRepository<WorkflowTemplateEntyEntity,WorkflowTemplateEntyId> {
	
	//public List<WorkflowTemplateEntyEntity> save(List<WorkflowTemplateEntyEntity> entities);
	public WorkflowTemplateEntyEntity save(WorkflowTemplateEntyEntity entity);

}
