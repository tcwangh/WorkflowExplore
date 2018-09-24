package idv.tim.wkflow.designer;

import org.activiti.bpmn.BpmnAutoLayout;
import org.activiti.bpmn.model.BpmnModel;
import org.activiti.bpmn.model.EndEvent;
import org.activiti.bpmn.model.Process;
import org.activiti.bpmn.model.SequenceFlow;
import org.activiti.bpmn.model.StartEvent;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.runtime.ProcessInstance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import idv.tim.wkflow.model.WorkflowDefinition;

@Component
public class BpmnGenerator {
	private static final Logger logger = LoggerFactory.getLogger(BpmnGenerator.class);
	
	public void createDynamicProcess(WorkflowDefinition theWorkflowDefinition) {
		BpmnModel model = new BpmnModel();
		Process process = new Process();
		model.addProcess(process);
		//process.setId("my-dynamic-process-1");
		process.setId(theWorkflowDefinition.getTemplateData().getWorkflowId());
		process.setName(theWorkflowDefinition.getTemplateData().getWorkflowName());
		process.addFlowElement(createStartEvent());
		process.addFlowElement(createEndEvent());
		process.addFlowElement(createSequenceFlow("start","end"));
		new BpmnAutoLayout(model).execute();
		ProcessEngine theEngine = ProcessEngines.getDefaultProcessEngine();
		RepositoryService repositoryService = theEngine.getRepositoryService();
		//String deploymentId = repositoryService.createDeployment().name("TestProcesses").addBpmnModel("dynamic-startend.bpmn", model).deploy().getId();
		String deploymentId = repositoryService.createDeployment().name(theWorkflowDefinition.getTemplateData().getWorkflowCategory())
				.addBpmnModel(theWorkflowDefinition.getTemplateData().getWorkflowActivitiDefFileName(), model).deploy().getId();
		logger.info("Deployment id " + deploymentId);
		RuntimeService runtimeService = theEngine.getRuntimeService();
		//ProcessInstance processInstance =  runtimeService.startProcessInstanceByKey("my-dynamic-process-1");
		ProcessInstance processInstance =  runtimeService.startProcessInstanceByKey(theWorkflowDefinition.getTemplateData().getWorkflowId());
	}
	
	private SequenceFlow createSequenceFlow(String from,String to) {
		SequenceFlow flow = new SequenceFlow();
		flow.setSourceRef(from);
		flow.setTargetRef(to);
		return flow;
	}
	
	private StartEvent createStartEvent() {
		StartEvent startEvent = new StartEvent();
		startEvent.setId("start");
		return startEvent;
	}
	
	private EndEvent createEndEvent() {
		EndEvent endEvent = new EndEvent();
		endEvent.setId("end");
		return endEvent;
	}

}
