package idv.tim.wkflow.model;

import java.util.ArrayList;

public class WorkflowDefinition {
	
	private TemplateData templateData;
	private ArrayList<WorkflowInputVariable> inputVariables;

	public TemplateData getTemplateData() {
		return templateData;
	}

	public void setTemplateData(TemplateData templateData) {
		this.templateData = templateData;
	}

	public ArrayList<WorkflowInputVariable> getInputVariables() {
		return inputVariables;
	}

	public void setInputVariables(ArrayList<WorkflowInputVariable> inputVariables) {
		this.inputVariables = inputVariables;
	}
}
