package idv.tim.wkflow.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import idv.tim.wkflow.model.BPMNDeployStatus;
import idv.tim.wkflow.model.WorkflowCreateResult;
import idv.tim.wkflow.model.WorkflowDefinition;
import idv.tim.wkflow.persistence.WorkflowTemplateEntyRepository;
import idv.tim.wkflow.persistence.WorkflowTemplateRepository;
import idv.tim.wkflow.persistence.entity.WorkflowTemplateEntity;
import idv.tim.wkflow.persistence.entity.WorkflowTemplateEntyEntity;
import idv.tim.wkflow.persistence.entity.WorkflowTemplateEntyId;

@Service
public class WorkflowDataService {
	
	private static final Logger logger = LoggerFactory.getLogger(WorkflowDataService.class);
	private static final String WKFLW_TEMP_ENTYNAME_ACT_PARM_NAME = "ACT_PARM_NAME";
	
	@Autowired
	private WorkflowTemplateRepository theWorkflowTemplateRepository;
	@Autowired
	private WorkflowTemplateEntyRepository theWorkflowTemplateEntyRepository;
	@Autowired
	private BpmnGenerator bpmnGenerator;
	
	@Transactional
	public WorkflowCreateResult createWorkflowDefinitionData(WorkflowDefinition theWorkflowDefinition) {
		Calendar calendar = Calendar.getInstance();
		java.sql.Timestamp currentTimestamp = new java.sql.Timestamp(calendar.getTime().getTime());
		WorkflowCreateResult theCreateResult = new WorkflowCreateResult();
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
		ArrayList<WorkflowTemplateEntyEntity> tempEntyList = new ArrayList<WorkflowTemplateEntyEntity>();
		if (theWorkflowDefinition.getInputVariables().size() > 0) {
			for (int i=0;i<theWorkflowDefinition.getInputVariables().size();i++) {
				logger.info("InputVariable["+ i + "] is " + theWorkflowDefinition.getInputVariables().get(i).toString());
				WorkflowTemplateEntyId tempEntyId = 
						new WorkflowTemplateEntyId(theWorkflowDefinition.getTemplateData().getWorkflowKey(),
								WKFLW_TEMP_ENTYNAME_ACT_PARM_NAME,
								theWorkflowDefinition.getInputVariables().get(i).getName());
				WorkflowTemplateEntyEntity tempEnty = 
						new WorkflowTemplateEntyEntity (tempEntyId,
								theWorkflowDefinition.getInputVariables().get(i).getType(),
								theWorkflowDefinition.getInputVariables().get(i).getMemo(),
								theWorkflowDefinition.getTemplateData().getClaimUser(),
								currentTimestamp);
				tempEntyList.add(tempEnty);
			}
		}
		
		WorkflowTemplateEntity theResult = theWorkflowTemplateRepository.save(theWorkflowTempEntity);
		if (tempEntyList.size()>0) {
			//List<WorkflowTemplateEntyEntity> tempEntyResultList = theWorkflowTemplateEntyRepository.save(tempEntyList); //I don't know why it doesn't work.
			for (int i=0;i<tempEntyList.size();i++) {
				WorkflowTemplateEntyEntity tempEntyResultList = theWorkflowTemplateEntyRepository.save(tempEntyList.get(i));
			}
		}
		
		BPMNDeployStatus bpmnDeployStatus = bpmnGenerator.createDynamicProcess(theWorkflowDefinition);
		theCreateResult.setBpmnDeployStatus(bpmnDeployStatus);
		return theCreateResult;
	}

}
