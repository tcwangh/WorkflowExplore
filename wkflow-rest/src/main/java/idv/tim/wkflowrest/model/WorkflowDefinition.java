package idv.tim.wkflowrest.model;

import java.util.ArrayList;

public class WorkflowDefinition {
	
	private TemplateData templateData;
	private ArrayList<WorkflowInputVariable> inputVariables;
	private ArrayList<WorkflowInputValues> inputValues;

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

	public ArrayList<WorkflowInputValues> getInputValues() {
		return inputValues;
	}

	public void setInputValues(ArrayList<WorkflowInputValues> inputValues) {
		this.inputValues = inputValues;
	}
	
}
