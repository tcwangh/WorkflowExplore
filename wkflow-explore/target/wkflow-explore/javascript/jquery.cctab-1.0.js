;(function(d,$){
	var ccwtab_defaults = {
		tabContentsContainer:'.tabContentsContainer',
		tabEventAction:'click',
		currentSelector:'current',
		tabCreatDoneEvent:'ccwtab.TabCreateComplete',
		tabDeleteDoneEvent:'ccwtab.TabDeleteComplete',
		tabChangeEvent:'ccwtab.TabChangeComplete',
		triggerTabCreateAfterEvent:'OnTabCreateDone',
		componentSettings:'ccwtab_settings'
	};
	
	var ccwtab_methods = {
			init: function(options) {
				//console.debug("jQdmtab begin");
				//console.debug($(this));
				var defaults=ccwtab_defaults;
				var _setting = $.extend(defaults,options);
				$(this).data(ccwtab_defaults.componentSettings,_setting);
				//console.debug($(this).get(0).id);
				$(this).attr('tabGroup',$(this).get(0).id);
				$(this).attr('tabCreateDoneEvent',options.triggerTabCreateAfterEvent);
				$(this).attr('tabChangeEvent',options.triggerTabChangeEvent);
				//console.debug($(this).find('.tabContentsContainer'));
				//$(this).find('.tabContentsContainer').first().attr('tabGroup',$(this).get(0).id);
				console.debug($(this).find('.' + options.contentsContainerClass));
				$(this).find('.' + options.contentsContainerClass).first().attr('tabGroup',$(this).get(0).id);
				console.debug($(this).children('ul'));
				$(this).children('ul').attr('contentContainerClass', options.contentsContainerClass);
				//$.data(globalId,setting);
				//var _$obj=$(this.get(0)),
				//_s = $.data($(this),setting),		
				//_p = {
				//	tabObj:_$obj,
				//	tabs:_$obj.find('ul'),
				//	tabCn:_$obj.find(_s.tabContentsContainer),
				//	isAnimate:false
				//};
			},
			addtab:function(options) {
				//console.debug(options);
				//console.debug(options);
				var _settings = $(this).data(ccwtab_defaults.componentSettings);
				var firstTab = false;
				var currentTabIdx = -1;
				//find current index
				var _$obj=$(this.get(0));
				console.debug(_$obj);
				var tabGroup=_$obj.get(0).id;
				var _p = {
						tabObj:_$obj,
						isAnimate:false
				};
				var newTabIdx = $(this).find("li[tabGroup='" + tabGroup + "']").length;
				if (newTabIdx==0) {
					console.debug("first tab");
					firstTab=true;
				}else {
					currentTabIdx = $(this).find("li[tabGroup='" + tabGroup + "'][class='current']").index();
				}
				var tabName = "tab_" + options.newTabId;
				var tabDisplayName=options.newTabId;
				if (options.displayName!=undefined){
					tabDisplayName = options.displayName;
				}
				var newTabControl ="";
				if (options.closeTab!=undefined && options.closeTab == 'enabled') {
					newTabControl = "<li tabGroup='" + tabGroup + "'>" +
										"<a href='#tab_" + options.newTabId + "' id='" + options.newTabId + "' tabGroup='" + tabGroup + "'>" + tabDisplayName + "</a>"+
										"<img id='closeTabImg_" + options.newTabId + "' tabGroup='" + tabGroup + "' class='closeTabIcon', src='images/close-icon.png' title='Close'>" + 
									"</li>";
				}else {
					var textLength = tabDisplayName.length;
					var textCenterClassId="";
					if (textLength==3){
						textCenterClassId = "textCenter_3"; //SQL
					}else if (textLength==4){
						textCenterClassId = "textCenter_4"; //BPMN
					}else {
						textCenterClassId="textCenter_Default";
					}
					newTabControl = "<li tabGroup='" + tabGroup + "'>" +
										"<a href='#tab_" + options.newTabId + "' id='" + options.newTabId + "' tabGroup='" + tabGroup + "' class='" + textCenterClassId + "'>" + tabDisplayName + "</a>"+
									"</li>";
				}				
				$(this).find('ul').first().append(newTabControl);
				var theTabContentContainerClass=$(this).find('ul').first().attr('contentContainerClass');
				console.debug("theTabContentContainerClass is " + theTabContentContainerClass);
				var newTabContent = "<div id='tab_" + options.newTabId + "' class='tab_content' tabGroup='" + tabGroup + "'></div>" ;
				//$(this).find('.tabContentsContainer').first().append(newTabContent);
				$(this).find('.'+theTabContentContainerClass).first().append(newTabContent);
				
				if (firstTab) {
					tabChangeCurrent(newTabIdx,tabGroup);
				}else {
					hideTabContent(currentTabIdx,tabGroup,theTabContentContainerClass);
					tabChangeCurrent(newTabIdx,tabGroup);
				}
				console.debug($(this).find("a[id=" + options.newTabId + "]").closest('li'));
				$(this).find("a[id=" + options.newTabId + "]").closest('li').on('click',function(e){
					if (typeof e.preventDefault === 'function') {
						e.preventDefault();
					}
					var currentTabIdx=$(this).closest('ul').find("li[class='current']").index();
					var thePreviousTabId = $(this).closest('ul').find("li[class='current']").children('a').eq(0).attr('id'); //20181020
					var theTabGroup = $(this).attr('tabGroup');
					var theTabContentContainerClass = $(this).closest('ul').attr('contentContainerClass');
					console.debug("tabGroup[" + theTabGroup + "]-index[" + currentTabIdx + "] a on click");
					var newClickTabIdx = $(this).index();
					var theActivateTabId=$(this).children('a').eq(0).attr('id'); //20181020
					if (newClickTabIdx != currentTabIdx && !_p.isAnimate) {
						hideTabContent(currentTabIdx,theTabGroup,theTabContentContainerClass);
						showTabContent(newClickTabIdx,theTabGroup,theTabContentContainerClass);
						var tabSourceSectionDivId = '#' + theTabGroup; //20181020
						var bTriggerTabChangeEvent = $(tabSourceSectionDivId).attr('tabChangeEvent'); //20181020
						if (bTriggerTabChangeEvent == 'true') { //20181020
							$(tabSourceSectionDivId).trigger(ccwtab_defaults.tabChangeEvent,[{activateTabId:theActivateTabId,previousTabid:thePreviousTabId}]); //20181020
						}
					}
				});
				if (options.closeTab!=undefined && options.closeTab == 'enabled') {
					$(this).find("img[id='closeTabImg_" + options.newTabId + "']").data('tabId',{tabId:options.newTabId,srcSecDiv:_$obj.get(0).id});
					$(this).find("img[id='closeTabImg_" + options.newTabId + "']").on('mouseover',function(e){
						$(this).attr("src","images/close-icon-on.png");
					});
					//$(this).find('img').attr('id', "closeTabImg_" + options.newTabId).on('mouseleave',function(e){
					$(this).find("img[id='closeTabImg_" + options.newTabId + "']").on('mouseleave',function(e){
						$(this).attr("src","images/close-icon.png");
					});
					//$(this).find('img').attr('id', "closeTabImg_" + options.newTabId).on('click',function(e){
					$(this).find("img[id='closeTabImg_" + options.newTabId + "']").on('click',function(e){
						console.debug(e);
						var currentulobj = $(this).closest('ul');
						var currentTabIdx=$(this).closest('ul').find("li[class='current']").index();
						var closeEventIdx =  $(this).closest('ul').find($(this).closest('li')).index();
						var lastTabIdx = $(this).closest('ul').find("li").length-1;
						var theTabGroup = $(this).attr('tabGroup');
						var theTabContentContainerClass = $(this).closest('ul').attr('contentContainerClass');
						console.debug("theTabGroup:" + theTabGroup);
						//console.debug(currentTabIdx);
						//console.debug("event on li index " + $(this).closest('ul').find($(this).closest('li')).index());
						//console.debug("li length " + $(this).closest('ul').find('li').length);
						//console.debug($(this).data('tabId') + " click event");
						//console.debug($(this).closest('li'));
						//console.debug($('#tab_'+$(this).data('tabId')));
						var removedTabInfo = $(this).data('tabId');
						console.debug(removedTabInfo)
						//var removedTabDivName='#tab_'+$(this).data('tabId');
						var removedTabDivName='#tab_'+removedTabInfo.tabId;
						var tabSourceSectionDivId = '#' + removedTabInfo.srcSecDiv;
						$(removedTabDivName).remove();
						$(this).closest('li').remove();
						if (currentTabIdx==closeEventIdx && lastTabIdx >currentTabIdx) {
							//console.debug('tab change to current index-'+currentTabIdx);
							showTabContent(currentTabIdx,theTabGroup,theTabContentContainerClass);
						}else if (currentTabIdx==closeEventIdx && lastTabIdx > 0 && lastTabIdx == currentTabIdx) {
							var activateIndex=currentTabIdx-1;
							//console.debug('tab change to current index-'+activateIndex);
							showTabContent(activateIndex,theTabGroup,theTabContentContainerClass);
						}
						//console.debug("After delete:" + currentulobj.find('li').length);
						var theNewTabId = "";
						var theNewTabDivName = "";
						if (currentulobj.find('li').length > 0) {
							//console.debug(currentulobj.find("li[class='current']").children('a').attr('id'));
							theNewTabId = currentulobj.find("li[class='current']").children('a').attr('id');
							theNewTabDivName='#tab_'+theNewTabId;
						}
						$(tabSourceSectionDivId).trigger(ccwtab_defaults.tabDeleteDoneEvent,[{removedTabId:removedTabInfo.tabId,removedTabDivName:removedTabDivName,newTabId:theNewTabId,newTabDivName:theNewTabDivName}]);
					});
				}
				console.debug($('#'+tabGroup).attr('tabCreateDoneEvent'));
				var bTriggerCreateDoneEvent = $('#'+tabGroup).attr('tabCreateDoneEvent')
				//if (_settings.triggerTabCreateAfterEvent==true) {
				if (bTriggerCreateDoneEvent=='true') {
					$(this).trigger(ccwtab_defaults.tabCreatDoneEvent,[{tabDivName:tabName,newTabId:options.newTabId}]);
				}
				
				function tabChangeCurrent(_t,tabGroup) {
					console.debug("tabChangeCurrent");
					_p.tabObj.find("li[tabGroup='" + tabGroup + "']").eq(_t).toggleClass('current');
					console.debug(_p.tabObj.find("li[tabGroup='" + tabGroup + "']"));
					console.debug(_p.tabObj);
				}
				function hideTabContent(_current,tabGroup,tabContentsContainerClass) {
					//var _$target =_p.tabObj.find(".tabContentsContainer[tabGroup='" + tabGroup + "']").children().eq(_current);
					var _$target =_p.tabObj.find("." + tabContentsContainerClass+"[tabGroup='" + tabGroup + "']").children().eq(_current);
					
					_p.isAnimate=false;
					tabChangeCurrent(_current,tabGroup);
					
					_$target.css({
						left:0,
						opacity:0,
						display:'none',
						position:'relative'
					});
				}
				function showTabContent(_t,tabGroup,tabContentsContainerClass) {
					//var _$target=_p.tabObj.find(".tabContentsContainer[tabGroup='" + tabGroup + "']").children().eq(_t);
					var _$target=_p.tabObj.find("." + tabContentsContainerClass + "[tabGroup='" + tabGroup + "']").children().eq(_t);
					_p.isAnimate=true;
					tabChangeCurrent(_t,tabGroup);
					_$target.css({
						display:'block',
						position:'relative'
					}).animate({opacity:1},{duration:500,
						complete:function(){
							showComplete(_$target);
						}});
				}
				function showComplete(_$target){
					_p.isAnimate=false;
					_$target.css({
						display:'block',
						position:'relative',
						opacity:1
					});
				}
			},
			getActiveTab:function(options){
				var currentTabIdx=$(this).children('ul').find("li[class='current']").index();
				console.debug($(this).children('ul'));
				var currentTabId = $(this).children('ul').find("li[class='current']").children('a').eq(0).attr('id'); //20181020
				var theTabGroup = $(this).attr('tabGroup');
				return {
					"currentTabIdx":currentTabIdx,
					"currentTabId":currentTabId,
					"tabGroup":theTabGroup
				};
			}
	}
	$.fn.ccwtab=function(method) {
		if (ccwtab_methods[method]) {
			return ccwtab_methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		}else {
			$.error('The method :' + method + " isn't exist in ccwtab");
		}
	}
}(document,jQuery));