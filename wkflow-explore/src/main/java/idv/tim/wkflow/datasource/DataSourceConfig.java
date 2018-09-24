package idv.tim.wkflow.datasource;

import javax.naming.NamingException;
import javax.sql.DataSource;

public interface DataSourceConfig {
	
	public DataSource getDataSource() throws IllegalArgumentException, NamingException ;

}
