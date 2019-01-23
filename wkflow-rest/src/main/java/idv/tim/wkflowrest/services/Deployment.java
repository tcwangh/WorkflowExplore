package idv.tim.wkflowrest.services;

import org.activiti.bpmn.model.BpmnModel;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;
import org.activiti.engine.RepositoryService;
import org.apache.log4j.Logger;
import idv.tim.wkflowrest.model.WorkflowDefinition;

public class Deployment {
	private static final Logger logger = Logger.getLogger(Deployment.class);
	public void deployWorkflow(WorkflowDefinition theWorkflowDefinition,BpmnModel theModel) {
		ProcessEngine theEngine = ProcessEngines.getDefaultProcessEngine();
		RepositoryService repositoryService = theEngine.getRepositoryService();
		String deploymentId = repositoryService.createDeployment().name(theWorkflowDefinition.getTemplateData().getWorkflowCategory())
				.addBpmnModel(theWorkflowDefinition.getTemplateData().getWorkflowActivitiDefFileName(), theModel).deploy().getId();
		logger.info("Deployment id " + deploymentId);
	}

}
