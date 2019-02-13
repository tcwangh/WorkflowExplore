package idv.tim.wkflowrest.services;

import org.activiti.bpmn.BpmnAutoLayout;
import org.activiti.bpmn.model.BpmnModel;
import org.activiti.bpmn.model.EndEvent;
import org.activiti.bpmn.model.ImplementationType;
import org.activiti.bpmn.model.Process;
import org.activiti.bpmn.model.ScriptTask;
import org.activiti.bpmn.model.SequenceFlow;
import org.activiti.bpmn.model.ServiceTask;
import org.activiti.bpmn.model.StartEvent;
import org.activiti.bpmn.model.SubProcess;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;
import org.activiti.engine.RepositoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import idv.tim.wkflowrest.model.BPMNDeployStatus;
import idv.tim.wkflowrest.model.LinkData;
import idv.tim.wkflowrest.model.TaskData;
import idv.tim.wkflowrest.model.WorkflowDefinition;

@Service
public class BpmnGenerator {
	private static final Logger logger = LoggerFactory.getLogger(BpmnGenerator.class);
	public static final String TASK_TYPE_START = "start";
	public static final String TASK_TYPE_END = "end";
	
	public BpmnModel createBpmnModel(WorkflowDefinition theWorkflowDefinition) {
		BpmnModel model = new BpmnModel();
		Process process = new Process();
		model.addProcess(process);
		process.setId(theWorkflowDefinition.getTemplateData().getWorkflowId());
		process.setName(theWorkflowDefinition.getTemplateData().getWorkflowName());
		for (int i=0;i<theWorkflowDefinition.getTaskList().size();i++) {
			if (TASK_TYPE_START.equals(theWorkflowDefinition.getTaskList().get(i).getTaskType())){
				process.addFlowElement(createStartEvent(theWorkflowDefinition.getTaskList().get(i)));
			}else if (TASK_TYPE_END.equals(theWorkflowDefinition.getTaskList().get(i).getTaskType())){
				process.addFlowElement(createEndEvent(theWorkflowDefinition.getTaskList().get(i)));
			}
		}
		for (int i=0;i<theWorkflowDefinition.getLinkList().size();i++) {
			process.addFlowElement(createSequenceFlow(theWorkflowDefinition.getLinkList().get(i)));
		}
		new BpmnAutoLayout(model).execute();
		return model;
	}
	public BPMNDeployStatus createDynamicProcess(WorkflowDefinition theWorkflowDefinition) {
		BPMNDeployStatus theDeployStatus = new BPMNDeployStatus();
		BpmnModel model = new BpmnModel();
		Process process = new Process();
		model.addProcess(process);
		//process.setId("my-dynamic-process-1");
		process.setId(theWorkflowDefinition.getTemplateData().getWorkflowId());
		process.setName(theWorkflowDefinition.getTemplateData().getWorkflowName());
		process.addFlowElement(createStartEvent("MainStart"));
		process.addFlowElement(createEndEvent("MainEnd"));
		SubProcess subProcess_1 = createSubProcess("TASK_01_PROCESS","HelloSubProcess01");
		subProcess_1.addFlowElement(createStartEvent("TASK_01_PROCESS_START"));
		subProcess_1.addFlowElement(createEndEvent("TASK_01_PROCESS_END"));
		subProcess_1.addFlowElement(createServiceTask("TASK01","HelloServiceTask"));
		subProcess_1.addFlowElement(createSequenceFlow("TASK_01_PROCESS_START","TASK01"));
		subProcess_1.addFlowElement(createSequenceFlow("TASK01","TASK_01_PROCESS_END"));
		process.addFlowElement(createScriptTask("SCRIPT_01","HelloScriptTask"));
		process.addFlowElement(subProcess_1);
		process.addFlowElement(createSequenceFlow("MainStart","SCRIPT_01"));
		process.addFlowElement(createSequenceFlow("SCRIPT_01","TASK_01_PROCESS"));
		process.addFlowElement(createSequenceFlow("TASK_01_PROCESS","MainEnd"));
		
		new BpmnAutoLayout(model).execute();
		ProcessEngine theEngine = ProcessEngines.getDefaultProcessEngine();
		RepositoryService repositoryService = theEngine.getRepositoryService();
		//String deploymentId = repositoryService.createDeployment().name("TestProcesses").addBpmnModel("dynamic-startend.bpmn", model).deploy().getId();
		String deploymentId = repositoryService.createDeployment().name(theWorkflowDefinition.getTemplateData().getWorkflowCategory())
				.addBpmnModel(theWorkflowDefinition.getTemplateData().getWorkflowActivitiDefFileName(), model).deploy().getId();
		logger.info("Deployment id " + deploymentId);
		theDeployStatus.setDeploymentId(deploymentId);
		//RuntimeService runtimeService = theEngine.getRuntimeService();
		//ProcessInstance processInstance =  runtimeService.startProcessInstanceByKey("my-dynamic-process-1");
		//ProcessInstance processInstance =  runtimeService.startProcessInstanceByKey(theWorkflowDefinition.getTemplateData().getWorkflowId());
		return theDeployStatus;
	}
	private String getJavaScriptTaskTestString() {
		//String jsString = ""
		//		+ " var s = new java.util.Scanner(java.lang.Runtime.getRuntime().exec(\"ifconfig\")" 
		//		+ ".getInputStream()).useDelimiter(\"\\A\");";
		//jsString += "var output = s.hasNext() ? s.next() : \"\";";
		String jsString = "java.lang.System.out.println(\"--- Hello script task --- \");";
		return jsString;
	}
	private SubProcess createSubProcess(String id,String name) {
		SubProcess subProcess = new SubProcess();
		subProcess.setId(id);
		subProcess.setName(name);
		subProcess.setAsynchronous(true);
		return subProcess;
	}
	private ServiceTask  createServiceTask(String id,String name) {
		ServiceTask serviceTask = new ServiceTask();
		serviceTask.setId(id);
		serviceTask.setName(name);
		serviceTask.setAsynchronous(true);
		serviceTask.setImplementationType(ImplementationType.IMPLEMENTATION_TYPE_CLASS);
		serviceTask.setImplementation("idv.tim.wkflow.runtime.ServiceTaskExecutor");
		//serviceTask.setType("idv.tim.wkflow.runtime.ServiceTaskExecutor");
		return serviceTask;
	}
	private ScriptTask createScriptTask(String id,String name) {
		ScriptTask scriptTask = new ScriptTask();
		scriptTask.setId(id);
		scriptTask.setName(name);
		scriptTask.setAsynchronous(true);
		scriptTask.setScriptFormat("js");
		scriptTask.setScript(getJavaScriptTaskTestString());
		return scriptTask;
		
	}
	private SequenceFlow createSequenceFlow(String from,String to) {
		SequenceFlow flow = new SequenceFlow();
		flow.setSourceRef(from);
		flow.setTargetRef(to);
		return flow;
	}
	private SequenceFlow createSequenceFlow(LinkData theLink) {
		SequenceFlow flow = new SequenceFlow();
		flow.setId(theLink.getLinkId());
		flow.setSourceRef(theLink.getFromTaskId());
		flow.setTargetRef(theLink.getToTaskId());
		return flow;
	}
	
	private StartEvent createStartEvent(String id) {
		StartEvent startEvent = new StartEvent();
		startEvent.setId(id);
		return startEvent;
	}
	
	private StartEvent createStartEvent(TaskData theTaskData) {
		StartEvent startEvent = new StartEvent();
		startEvent.setId(theTaskData.getTaskId());
		startEvent.setName(theTaskData.getTaskName());
		startEvent.setNotExclusive(false);
		startEvent.setAsynchronous(true);
		return startEvent;
	}
	
	private EndEvent createEndEvent(String id) {
		EndEvent endEvent = new EndEvent();
		endEvent.setId(id);
		return endEvent;
	}
	
	private EndEvent createEndEvent(TaskData theTaskData) {
		EndEvent endEvent = new EndEvent();
		endEvent.setId(theTaskData.getTaskId());
		endEvent.setName(theTaskData.getTaskName());
		endEvent.setNotExclusive(false);
		endEvent.setAsynchronous(true);
		return endEvent;
	}

}
