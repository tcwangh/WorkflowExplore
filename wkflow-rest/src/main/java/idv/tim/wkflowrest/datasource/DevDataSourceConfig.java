package idv.tim.wkflowrest.datasource;

import java.sql.SQLException;
import java.util.Properties;
import javax.naming.NamingException;
import javax.sql.DataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.orm.jpa.JpaDialect;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.EclipseLinkJpaDialect;
import org.springframework.orm.jpa.vendor.EclipseLinkJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@Profile("development")
@EnableTransactionManagement
@EnableJpaRepositories(basePackages="idv.tim.wkflowrest.persistence", entityManagerFactoryRef = "getEntityManagerFactoryBean")
public class DevDataSourceConfig implements DataSourceConfig{
		  
	  @Bean(name = "dataSource")
	  public DataSource getDataSource() {
		  System.out.println("get datasource from development profile");
		  return new EmbeddedDatabaseBuilder()
				  .generateUniqueName(false)
				  .setName("testdb")
				  .setType(EmbeddedDatabaseType.H2)
				  .addScript("classpath:schema_h2.sql")
				  .addScript("classpath:data_h2.sql")
				  .setScriptEncoding("UTF-8")
				  .ignoreFailedDrops(true)
				  .build();
	      	//jdbc:h2:mem:testdb 
	  }
		
	  @Bean(initMethod="start",destroyMethod="stop")
	  public org.h2.tools.Server h2WebServer() throws SQLException {
		  return org.h2.tools.Server.createWebServer("-web", "-webAllowOthers", "-webPort", "8082");
	  }
	  @Bean(initMethod="start", destroyMethod="stop")
	  @DependsOn(value = "h2WebServer")
	  public org.h2.tools.Server h2Server() throws SQLException {
	      return org.h2.tools.Server.createTcpServer("-tcp", "-tcpAllowOthers", "-tcpPort", "9092");
	  }
	  
	  @Bean
	  public EclipseLinkJpaVendorAdapter getEclipseLinkJpaVendorAdapter() {
	      EclipseLinkJpaVendorAdapter vendorAdapter = new EclipseLinkJpaVendorAdapter();
	      //vendorAdapter.setDatabasePlatform("org.eclipse.persistence.platform.database.MySQLPlatform");
	      vendorAdapter.setDatabasePlatform("org.eclipse.persistence.platform.database.H2Platform");
	      vendorAdapter.setGenerateDdl(false);
	      vendorAdapter.setShowSql(true);
	      return vendorAdapter;
	  }
	  @Bean
	  public JpaDialect jpaDialect() {
		  return new EclipseLinkJpaDialect();
	  }
	  @Bean
	  public LocalContainerEntityManagerFactoryBean getEntityManagerFactoryBean() throws IllegalArgumentException, NamingException {
		  LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
	      Properties props = new Properties();
	      props.put("eclipselink.weaving", "static");
	      props.setProperty("eclipselink.logging.level", "FINEST");
	      props.setProperty("eclipselink.logging.parameters", "true");
	      em.setDataSource(getDataSource());
	      em.setJpaDialect(jpaDialect());
	      em.setPackagesToScan("idv.tim.wkflowrest.model");
	      em.setPersistenceUnitName("appDataSourceJPA");
	      em.setJpaProperties(props);
	      //LoadTimeWeaver loadTimeWeaver = new InstrumentationLoadTimeWeaver();
	      //em.setLoadTimeWeaver(loadTimeWeaver);
	      //DatabasePlatform dp = new MySQLPlatform();
	      em.setJpaVendorAdapter(getEclipseLinkJpaVendorAdapter());
	      return em;
	  }
	  
	  @Bean(name="transactionManager")
	  public JpaTransactionManager jpaTransManager() throws IllegalArgumentException, NamingException{
		  JpaTransactionManager jtManager = new JpaTransactionManager(
			getEntityManagerFactoryBean().getObject());
		  return jtManager;
	  }
	  
	  /*
	  @Bean(name = "transactionManager")
	  public PlatformTransactionManager annotationDrivenTransactionManager() {
		  DataSourceTransactionManager transactionManager = new DataSourceTransactionManager();
		  transactionManager.setDataSource(getDataSource());
		  return transactionManager;
	  }
	  */
	  //https://blog.progs.be/727/transaction-spring-activiti
	  
}
