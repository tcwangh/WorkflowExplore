package idv.tim.wkflowrest.controller;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import idv.tim.wkflowrest.exception.WorkflowDeployException;
import idv.tim.wkflowrest.exception.WorkflowError;

@ControllerAdvice
public class GlobalExceptionHandler {
	private static final Logger logger = Logger.getLogger(GlobalExceptionHandler.class);
	
	//@ExceptionHandler(value 
	//	      = { WorkflowDeployException.class, IllegalStateException.class })
	@ExceptionHandler( WorkflowDeployException.class)
	public ResponseEntity<WorkflowError> WorkflowdeployFail(WorkflowDeployException e) {
		String workflowKey = e.getWorkflowKey();
		WorkflowError error = new WorkflowError(workflowKey,1,"Workflow [" + workflowKey + "] deploy fail,Reason:" + e.getMessage());
		return new ResponseEntity<WorkflowError> (error,HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
