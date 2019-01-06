package idv.tim.wkflowrest.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import idv.tim.wkflowrest.persistence.entity.WorkflowTemplateEntity;

@Repository
public interface WorkflowTemplateRepository extends JpaRepository <WorkflowTemplateEntity ,String>{
	
	public WorkflowTemplateEntity save(WorkflowTemplateEntity wkflowTemp);

}