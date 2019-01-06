package idv.tim.wkflowrest.controller;

import java.net.URL;
import java.util.Locale;
import javax.annotation.PostConstruct;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import idv.tim.wkflowrest.model.InstanceCreateResult;
import idv.tim.wkflowrest.model.WorkflowCreateResult;
import idv.tim.wkflowrest.model.WorkflowDefinition;
import idv.tim.wkflowrest.model.WorkflowModelReq;
import idv.tim.wkflowrest.services.WorkflowDataService;

@RestController
@RequestMapping(value="/restapi")
public class WkflowController {
	
	private static final String LOG4j_FILE = "log4j_wkflow-rest.properties";
	
	private static final Logger logger = Logger.getLogger(WkflowController.class);
	
	@PostConstruct
	private void init() {
		try {
			ClassLoader loader = Thread.currentThread().getContextClassLoader();
			URL url = loader.getResource(LOG4j_FILE);
			PropertyConfigurator.configure(url);
		}catch(Exception ex) {
			System.out.println("Exception happen while loading log4j property file [" + LOG4j_FILE + "]:" + ex.toString());
		}
	}
	
	@RequestMapping(value = "/hello", method = RequestMethod.GET)
	public String hello() {
		logger.info("[Hello][wkflow-rest]");
		return "Hello";
	}
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
	
	@RequestMapping(value = "/workflow-model", method = RequestMethod.POST)
	public void getWorkflowModel(@RequestBody WorkflowModelReq req,Locale locale,Model model) {
		logger.info("getWorkflowModel start");
		logger.info("req is " + req.toString());
	}

}
