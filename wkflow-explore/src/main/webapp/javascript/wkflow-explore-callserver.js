/**
 * 
 */

function S_downloadBPMN_SQL(workflowData){
	
	/*$.ajax({
	    type: "POST",
	    data:JSON.stringify(workflowData),//json序列化 
	    dataType : 'json',
	    contentType : 'application/json; charset=utf-8',
	    url: "/wkflow-explore/hello",
	    //data: search, // Note it is important without stringifying
	    success :function(result) {
	     console.debug(result);
	     R_downloadBPMN_SQL(result);
	    }
	});*/
	var req = {
			"workflowDefinition":workflowData,
			"autoDeployment":"Y"
	}
	console.debug(req);
	$.ajax({
	    type: "POST",
	    data:JSON.stringify(req),//json序列化 
	    dataType : 'json',
	    contentType : 'application/json; charset=utf-8',
	    url: "/wkflow-rest/restapi/workflow-model",
	    //data: search, // Note it is important without stringifying
	    success :function(result) {
	     console.debug(result);
	     R_downloadBPMN_SQL(result);
	    }
	});
	
}

function R_downloadBPMN_SQL(result){
	console.debug(result);
	_theAppContext.downloadBPMNDone(result);
}