package idv.tim.wkflow.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Value("${spring.datasource.url}")
	private String dataSourceURL;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		String formattedDate = dateFormat.format(date);
		ProcessEngine theEngine = ProcessEngines.getDefaultProcessEngine();
		model.addAttribute("serverTime", formattedDate );
		model.addAttribute("engineName", theEngine.getName());
		model.addAttribute("engineDB", theEngine.getProcessEngineConfiguration().getDatabaseType() );
		return "home";
	}
	@RequestMapping(value = "/designer", method = RequestMethod.GET)
	public String designerPage(Locale locale, Model model) {
		logger.info("Welcome designer Page! The client locale is {}.", locale);
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		String formattedDate = dateFormat.format(date);
		ProcessEngine theEngine = ProcessEngines.getDefaultProcessEngine();
		model.addAttribute("serverTime", formattedDate );
		model.addAttribute("engineName", theEngine.getName());
		model.addAttribute("engineDB", theEngine.getProcessEngineConfiguration().getDatabaseType() );
		return "designer";
	}
}
