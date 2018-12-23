package idv.tim.wkflow.controller;

import java.net.URL;
import java.text.DateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import javax.annotation.PostConstruct;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import idv.tim.wkflow.model.WorkflowCreateResult;
import idv.tim.wkflow.model.WorkflowDefinition;



/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	private static final String LOG4j_FILE = "log4j_wkflow-explore.properties";
	private static final Logger logger = Logger.getLogger(HomeController.class);
	
	@Value("${spring.datasource.url}")
	private String dataSourceURL;
	
	@Value("${wkflow.rest.url}")
	private String wkflowRestURL;
	
	@PostConstruct
	private void init() {
		try {
			ClassLoader loader = Thread.currentThread().getContextClassLoader();
			URL url = loader.getResource(LOG4j_FILE);
			PropertyConfigurator.configure(url);
		}catch(Exception ex) {
			System.out.println("Exception happen while loading log4j property file [" + LOG4j_FILE + "]:" + ex.toString());
		}
	}
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is "+ locale);
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		String formattedDate = dateFormat.format(date);
		//ProcessEngine theEngine = ProcessEngines.getDefaultProcessEngine();
		model.addAttribute("serverTime", formattedDate );
		//model.addAttribute("engineName", theEngine.getName());
		//model.addAttribute("engineDB", theEngine.getProcessEngineConfiguration().getDatabaseType() );
		return "home";
	}
	@RequestMapping(value = "/designer", method = RequestMethod.GET)
	public String designerPage(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is "+ locale);
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		String formattedDate = dateFormat.format(date);
		//ProcessEngine theEngine = ProcessEngines.getDefaultProcessEngine();
		model.addAttribute("serverTime", formattedDate );
		//model.addAttribute("engineName", theEngine.getName());
		//model.addAttribute("engineDB", theEngine.getProcessEngineConfiguration().getDatabaseType() );
		return "designer";
	}
	
	//@PostMapping(value = "/hello", produces = "application/json" )
	@RequestMapping(value = "/hello", method = RequestMethod.POST,consumes="application/json")
	@ResponseBody
	public  HashMap<String,String> sayHello(@RequestBody WorkflowDefinition workflowDef,Locale locale,Model model) {
		HashMap<String,String> myMap = new HashMap<String, String>();
        myMap.put("a", "1");
        myMap.put("b", "2");
        logger.info("result map is " + myMap);
        logger.info("[wkflow.rest.url] is " + wkflowRestURL);
        //String bpmnEndPoint = wkflowRestURL + "/workflow"  ;
        RestTemplate rest = new RestTemplate();
        ResponseEntity<WorkflowCreateResult> response =  rest.postForEntity(wkflowRestURL, workflowDef, WorkflowCreateResult.class);
        logger.info(response);
        return myMap;
	
	}
}
