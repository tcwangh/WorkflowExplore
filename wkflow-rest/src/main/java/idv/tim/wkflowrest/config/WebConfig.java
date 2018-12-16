package idv.tim.wkflowrest.config;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;


@Configuration
@EnableWebMvc
@ComponentScan({"idv.tim.wkflowrest.config","idv.tim.wkflowrest.datasource","idv.tim.wkflowrest.persistence"})
@PropertySource(value= {"classpath:application.properties"})
@ImportResource({"classpath:applicationContext-activiti.xml"})
public class WebConfig extends WebMvcConfigurerAdapter implements ApplicationContextAware{
  private ApplicationContext applicationContext;
  
  public void setApplicationContext(ApplicationContext applicationContext) {
  	  this.applicationContext = applicationContext;
  }
     
  @Bean
  public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
	  return new PropertySourcesPlaceholderConfigurer();
  }
    
  @Bean
  public ViewResolver viewResolver() {
    InternalResourceViewResolver resolver = new InternalResourceViewResolver();
    resolver.setPrefix("/WEB-INF/views/");
    resolver.setSuffix(".jsp");
    return resolver;
  }
  
  @Override
  public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
    configurer.enable();
  }
  
}
//https://www.jianshu.com/p/e8fcdedbfabe