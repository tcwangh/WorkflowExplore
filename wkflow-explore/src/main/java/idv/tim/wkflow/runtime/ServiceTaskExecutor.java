package idv.tim.wkflow.runtime;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.JavaDelegate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ServiceTaskExecutor implements JavaDelegate{
	
	private static final Logger logger = LoggerFactory.getLogger(ServiceTaskExecutor.class);

	@Override
	public void execute(DelegateExecution execution) throws Exception {
		// TODO Auto-generated method stub
		logger.info("Implement JavaDelegate's JavaServiceTask: " + this);
		logger.info("Executed process with key " + execution.getProcessBusinessKey() + 
				" with process definition id " +  execution.getProcessDefinitionId() + 
				" with process instance id " + execution.getProcessInstanceId() + 
				" and current task name is " + execution.getCurrentActivityName() + 
				" and current task id is " + execution.getCurrentActivityId());
		
	}
	
	

}
