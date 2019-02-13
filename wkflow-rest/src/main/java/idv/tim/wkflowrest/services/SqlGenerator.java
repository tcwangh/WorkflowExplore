package idv.tim.wkflowrest.services;

import java.util.ArrayList;

import idv.tim.wkflowrest.model.TemplateData;
import idv.tim.wkflowrest.model.TemplateEntity;
import idv.tim.wkflowrest.model.WorkflowDefinition;

public class SqlGenerator {
	
	public String createSql(WorkflowDefinition theWorkflowDefinition) {
		
		TemplateData theTemplateData = theWorkflowDefinition.getTemplateData();
		String totalSQL = "";
		String deleteWKFLW_TEMP_SQL = "DELETE FROM WKFLW_TEMP WHERE WKFLW_KEY='" +  theTemplateData.getWorkflowKey() + "'" + ";\n";;
		String deleteWKFLW_TEMP_ENTY_SQL = "DELETE FROM WKFLW_TEMP_ENTY WHERE WKFLW_KEY='" +  theTemplateData.getWorkflowKey() + "'" + ";\n";;
		
		String insertWKFLW_TEMP_SQL = "INSERT INTO WKFLW_TEMP (WKFLW_KEY,WKFLW_ID,WKFLW_NAME,WKFLW_CATG,"
				+ "WKFLW_REASON,WKFLW_DESC,WKFLW_STATUS,WKFLW_PRIV_ID,CLAIM_USER,CLAIM_TIME,ACT_PROC_ID,"
				+ "ACT_PROC_DEF_FILE_NAME) VALUES ('" + theTemplateData.getWorkflowKey() + "','"
				+ theTemplateData.getWorkflowId() + "','" + theTemplateData.getWorkflowName() + "','" 
				+ theTemplateData.getWorkflowCategory() + "','" + theTemplateData.getWorkflowReason() + "','" 
				+ theTemplateData.getWorkflowDescription() + "','" + theTemplateData.getWorkflowStatus() + "','"
				+ theTemplateData.getWorkflowPrivilegeId() + "','" + theTemplateData.getClaimUser() + "'," 
				+ "CURRENT_TIMESTAMP,'" + theTemplateData.getWorkflowActivitiProcessId() + "','" 
				+ theTemplateData.getWorkflowActivitiDefFileName() + "');" + "\n";
		
		
		String insertWKFLW_TEMP_ENTY_SQL = "";	
		ArrayList<TemplateEntity> theTemplateEntities =  theWorkflowDefinition.getTemplateEntities();
		for (int i=0;i<theTemplateEntities.size();i++) {
			insertWKFLW_TEMP_ENTY_SQL += "INSERT INTO WKFLW_TEMP_ENTY (WKFLW_KEY,ENTITY_NAME,ENTITY_VAL,"
					+ "ENTITY_DESC,ENTITY_MEMO,CLAIM_USER,CLAIM_TIME) VALUES ('" + theTemplateData.getWorkflowKey() + "','"
					+ theTemplateEntities.get(i).getCategory() + "','" + theTemplateEntities.get(i).getName() + "','"
					+ theTemplateEntities.get(i).getType() + "','" + theTemplateEntities.get(i).getMemo() + "','" 
					+ theTemplateData.getClaimUser() + "',CURRENT_TIMESTAMP);" + "\n";
		}
				
		totalSQL = deleteWKFLW_TEMP_SQL + deleteWKFLW_TEMP_ENTY_SQL +
				insertWKFLW_TEMP_SQL + insertWKFLW_TEMP_ENTY_SQL;
		
		return totalSQL;
		
	}

}
