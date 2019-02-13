package idv.tim.wkflowrest.persistence;

import java.util.ArrayList;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.apache.log4j.Logger;
import idv.tim.wkflowrest.exception.WorkflowDeployException;


public class WorkflowTemplateRepositoryImpl {
	private static final Logger logger = Logger.getLogger(WorkflowTemplateRepositoryImpl.class);
	@PersistenceContext
	private EntityManager em;
	
	public ArrayList<String> saveTemplate(String workflowKey,String sql) {
		String[] sqls = sql.split(";");
		int tmpResult = 0;
		ArrayList<String> deployedSQLs = new ArrayList<String>();
		logger.info("Begin to save template definitions, sql count is " + sqls.length);
		for (int i=0;i<sqls.length;i++) {
			try {
				tmpResult = em.createNativeQuery(sqls[i]).executeUpdate();
				logger.info("[" + i + "][" + tmpResult + "]" + sqls[i]);
				if (tmpResult > 0) {
					deployedSQLs.add(sqls[i]);
				}
			}catch(Exception e) {
				logger.error("Exception happen while save workflow template:" + workflowKey);
				logger.error(e.toString());
				throw new WorkflowDeployException(workflowKey,e.toString());
			}
		}
		return deployedSQLs;
	}

}
