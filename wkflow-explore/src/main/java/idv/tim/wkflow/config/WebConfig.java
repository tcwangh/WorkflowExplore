package idv.tim.wkflow.config;

import javax.naming.NamingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.spring4.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring4.view.ThymeleafViewResolver;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ITemplateResolver;
import javax.sql.DataSource;


@Configuration
@EnableWebMvc
@ComponentScan({"idv.tim.wkflow.config","idv.tim.wkflow.datasource","idv.tim.wkflow.persistence"})
@PropertySource(value= {"classpath:application.properties"})
@ImportResource({"classpath:applicationContext-activiti.xml"})
public class WebConfig extends WebMvcConfigurerAdapter implements ApplicationContextAware{
  private ApplicationContext applicationContext;
  
  @Autowired
  private DataSource dataSource;
  
  public void setApplicationContext(ApplicationContext applicationContext) {
  	  this.applicationContext = applicationContext;
  }
     
  @Bean
  public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
	  return new PropertySourcesPlaceholderConfigurer();
  }
  
  @Bean
  public ITemplateResolver templateResolver() {
	  SpringResourceTemplateResolver resolver = new SpringResourceTemplateResolver();
	  resolver.setApplicationContext(applicationContext);
	  resolver.setPrefix("/WEB-INF/views/");
	  resolver.setSuffix(".html");
	  resolver.setCharacterEncoding("UTF-8");
	  resolver.setTemplateMode(TemplateMode.HTML);
	  //resolver.setTemplateMode("HTML5");
	  return resolver;
  }
  
    
  @Bean
  public TemplateEngine templateEngine() {
    SpringTemplateEngine engine = new SpringTemplateEngine();
    //engine.setEnableSpringELCompiler(true);
    engine.setTemplateResolver(templateResolver());
    return engine;
  }
  
  @Bean
  public ViewResolver viewResolver() {
    ThymeleafViewResolver resolver = new ThymeleafViewResolver();
    resolver.setTemplateEngine(templateEngine());
    resolver.setCharacterEncoding("UTF-8");
    resolver.setOrder( 1 );
    return resolver;
  }
      
  @Bean
  public JdbcTemplate jdbcTemplate() throws IllegalArgumentException, NamingException {
      //JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSourceConfig.getDataSource());
      JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
      jdbcTemplate.setResultsMapCaseInsensitive(true);
      return jdbcTemplate;
  }
    
  
  @Override
  public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
    configurer.enable();
  }
  
}
//https://www.jianshu.com/p/e8fcdedbfabe