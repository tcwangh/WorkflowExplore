package idv.tim.wkflow.designer;

import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import idv.tim.wkflow.model.WorkflowDefinition;
import idv.tim.wkflow.persistence.WorkflowTemplateRepository;
import idv.tim.wkflow.persistence.entity.WorkflowTemplateEntity;

@Component
public class WorkflowGenerator {
	
	@Autowired
	private WorkflowTemplateRepository theWorkflowTemplateRepository;
	@Autowired
	private BpmnGenerator bpmnGenerator;
	
	public void generateWorkflow(WorkflowDefinition theWorkflowDefinition) {
		Calendar calendar = Calendar.getInstance();
		java.sql.Timestamp currentTimestamp = new java.sql.Timestamp(calendar.getTime().getTime());
		theWorkflowDefinition.getTemplateData().setWorkflowActivitiProcessId(theWorkflowDefinition.getTemplateData().getWorkflowId());
		theWorkflowDefinition.getTemplateData().setWorkflowActivitiDefFileName(theWorkflowDefinition.getTemplateData().getWorkflowId()+".bpmn");
		WorkflowTemplateEntity theWorkflowTempEntity = 
				new WorkflowTemplateEntity(theWorkflowDefinition.getTemplateData().getWorkflowKey(),
						theWorkflowDefinition.getTemplateData().getWorkflowId(),
						theWorkflowDefinition.getTemplateData().getWorkflowName(),
						theWorkflowDefinition.getTemplateData().getWorkflowCategory(),
						theWorkflowDefinition.getTemplateData().getWorkflowReason(),
						theWorkflowDefinition.getTemplateData().getWorkflowDescription(),
						theWorkflowDefinition.getTemplateData().getWorkflowStatus(),
						theWorkflowDefinition.getTemplateData().getWorkflowPrivilegeId(),
						theWorkflowDefinition.getTemplateData().getClaimUser(),
						currentTimestamp,
						theWorkflowDefinition.getTemplateData().getWorkflowActivitiProcessId(),
						theWorkflowDefinition.getTemplateData().getWorkflowActivitiDefFileName());
		WorkflowTemplateEntity theResult = theWorkflowTemplateRepository.save(theWorkflowTempEntity);
		
		bpmnGenerator.createDynamicProcess(theWorkflowDefinition);
		
	}

}
