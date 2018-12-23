<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<html>
<head>
	<title>Designer</title>
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/zTreeStyle/zTreeStyle.css" type="text/css">
	<link rel="stylesheet" href="css/style.css">
	
	<script src="javascript/jquery-3.3.1.js"></script>
	<script src="javascript/jquery.ztree-3.5.37.all.min.js"></script>
	<script src="javascript/jquery.cctab-1.0.js"></script>
	<script src="javascript/jquery.ccwform-1.0.js"></script>
	<script src="javascript/jquery.wkflow-dsg-1.0.js"></script>
	<script src="javascript/wkflow-model.js"></script>
	<script src="javascript/wkflow-explore-callserver.js"></script>
	<script src="javascript/wkflow-explore-main.js"></script>
</head>
<body>
	<!-- content -->
	<header class="site-header blue-bg">
		<div class="site-header-inner"></div>
	</header>
	<div class="site-toolbar">
		<div id="toolbarDiv" class="site-toolbar-inner"></div>
	</div>
	<div class="site-main">
		<div class="site-main-inner">
			<div class="site-main-inner-left">
				<div id="disign-block-main" class="design-block-main"></div>
			</div>
			<div class="site-main-inner-right"></div>
		</div>
	</div>
	<footer class="site-footer">
		<div class="site-footer-inner"></div>
	</footer>
</body>
</html>
