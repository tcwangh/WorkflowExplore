package idv.tim.wkflowrest.model;

import java.util.ArrayList;

public class WorkflowDeployResult {
	
	private String activitiDeploymentId = "";
	private ArrayList<String> deployedSQLs = new ArrayList<String>();

	public String getActivitiDeploymentId() {
		return activitiDeploymentId;
	}

	public void setActivitiDeploymentId(String activitiDeploymentId) {
		this.activitiDeploymentId = activitiDeploymentId;
	}

	public ArrayList<String> getDeployedSQLs() {
		return deployedSQLs;
	}

	public void setDeployedSQLs(ArrayList<String> deployedSQLs) {
		this.deployedSQLs = deployedSQLs;
	}
	
	

}
