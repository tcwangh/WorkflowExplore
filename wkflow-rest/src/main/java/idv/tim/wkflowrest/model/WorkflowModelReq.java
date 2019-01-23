package idv.tim.wkflowrest.model;

import org.apache.log4j.Logger;

public class WorkflowModelReq {
	private static final Logger logger = Logger.getLogger(WorkflowModelReq.class);
	private WorkflowDefinition workflowDefinition;
	private String autoDeployment = "Y";
	

	public WorkflowDefinition getWorkflowDefinition() {
		return workflowDefinition;
	}
	
	public String getAutoDeployment() {
		return autoDeployment;
	}


	public void setAutoDeployment(String autoDeployment) {
		this.autoDeployment = autoDeployment;
	}


	public void setWorkflowDefinition(WorkflowDefinition workflowDefinition) {
		this.workflowDefinition = workflowDefinition;
	}
	public String toString() {
		String templateInfo = "\nTemplate Infos:\n";
		templateInfo += workflowDefinition.getTemplateData().toString();
		templateInfo += "\n";
		templateInfo += "Template Entities:\n";
		//logger.info(workflowDefinition.getTemplateEntities());
		if (workflowDefinition.getTemplateEntities()!=null) {
			//logger.info(workflowDefinition.getTemplateEntities().size());
			if (workflowDefinition.getTemplateEntities().size() > 0) {
				for (int i=0;i<workflowDefinition.getTemplateEntities().size();i++) {
					templateInfo += "[" + String.format("%02d",i) + "]:" + 
							workflowDefinition.getTemplateEntities().get(i).toString() + "\n";
				}
			}
		}
		templateInfo += "Task List:\n";
		if (workflowDefinition.getTaskList() != null) {
			for (int i=0;i<workflowDefinition.getTaskList().size(); i++) {
				templateInfo += workflowDefinition.getTaskList().get(i).toString() + "\n";
			}
		}
		templateInfo += "Link List:\n";
		if (workflowDefinition.getLinkList() != null) {
			for (int i=0;i<workflowDefinition.getLinkList().size(); i++) {
				templateInfo += workflowDefinition.getLinkList().get(i).toString() + "\n";
			}
		}
		return templateInfo;
	}
}
