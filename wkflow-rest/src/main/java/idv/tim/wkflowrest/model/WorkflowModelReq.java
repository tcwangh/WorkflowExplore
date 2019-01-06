package idv.tim.wkflowrest.model;

import org.apache.log4j.Logger;

public class WorkflowModelReq {
	private static final Logger logger = Logger.getLogger(WorkflowModelReq.class);
	private WorkflowDefinition workflowDefinition;

	public WorkflowDefinition getWorkflowDefinition() {
		return workflowDefinition;
	}

	public void setWorkflowDefinition(WorkflowDefinition workflowDefinition) {
		this.workflowDefinition = workflowDefinition;
	}
	public String toString() {
		String templateEntity = "\nTemplate Entities:\n";
		logger.info(workflowDefinition.getTemplateEntities());
		if (workflowDefinition.getTemplateEntities()!=null) {
			logger.info(workflowDefinition.getTemplateEntities().size());
			if (workflowDefinition.getTemplateEntities().size() > 0) {
				for (int i=0;i<workflowDefinition.getTemplateEntities().size();i++) {
					templateEntity += "[" + String.format("%02d",i) + "]:" + 
							workflowDefinition.getTemplateEntities().get(i).toString() + "\n";
				}
			}
		}
		return templateEntity;
	}
}
