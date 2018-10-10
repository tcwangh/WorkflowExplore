package idv.tim.wkflow.controller;

import java.util.Locale;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import idv.tim.wkflow.model.InstanceCreateResult;
import idv.tim.wkflow.model.WorkflowCreateResult;
import idv.tim.wkflow.model.WorkflowDefinition;
import idv.tim.wkflow.services.WorkflowDataService;

@RestController
@RequestMapping(value="/restapi")
public class WkflowController {
	
	private static final Logger logger = LoggerFactory.getLogger(WkflowController.class);
	
	@Autowired
	private WorkflowDataService theWorkflowDataService;
	
	@RequestMapping(value = "/workflow", method = RequestMethod.POST)
	public WorkflowCreateResult createWorkflow(@RequestBody WorkflowDefinition workflowDef, Locale locale,Model model) {
		logger.info("createWorkflow start");
		logger.info(workflowDef.getTemplateData().getWorkflowKey());
		WorkflowCreateResult theResult = theWorkflowDataService.createWorkflowDefinitionData(workflowDef);
		InstanceCreateResult instanceResult = theWorkflowDataService.createWorkflowInstance(workflowDef.getTemplateData().getWorkflowId(), workflowDef.getInputValues());
		theResult.setInstanceCreationResult(instanceResult);
		logger.info("createWorkflow end");
		return theResult;
	}
	

}
