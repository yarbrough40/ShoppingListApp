	function cb(){}
	var BaseUrl = "http://woodlandshalloween.com/ShoppingList/Service.svc/"
	//var BaseUrl = "http://localhost:60635/ShoppingList/Service.svc/"
/*local storage items:
username

*/
	//$("#testDiv").html("beginmm");
	
	//window.localStorage.setItem('QPname',1);
	//window.localStorage.getItem(key);
	//window.localStorage.removeItem('guessCount');		


		
	function getShoppingList(){
	div = document.getElementById("listDiv");
	console.log(BaseUrl + "GetShoppingList?callback=cb");
	//window.localStorage.setItem('guessCount',0);
		try{
			$.ajax({
				//PRIMKEY  ITEMNAME IDEMDESC USERNAME CREATEDATE ISVISIBLE ISPURCHASED COLOR
				crossDomain: true,
				type:"GET",
				contentType: "application/json; charset=utf-8",
				async:false,
				url: BaseUrl + "GetShoppingList?callback=cb",
				dataType: "jsonp",                
				success: function (response) {	
				
				/* AS LIST ITEMS
					var s = '<ul data-role="listview" data-inset="true"><li style="text-align:center;"data-role="list-divider">Brian and Dyan</li>';
					for(i=0; i< response.GetShoppingListResult.length; i ++){
					s+= '<li data-theme="' + response.GetShoppingListResult[i].COLOR + '"><a onclick="alert(' + response.GetShoppingListResult[i].PRIMKEY + ')">';	
						s+= response.GetShoppingListResult[i].ITEMNAME;
					s+= '</li>';
					}
					s+=  '</ul>'
				*/	
					var bgTheme = "";
					var dcTheme = "";
					var btnElem = "";
					var s = '';
						for(i=0; i< response.GetShoppingListResult.length; i ++){
							
							if(response.GetShoppingListResult[i].ISPURCHASED){bgTheme = "c"; dcTheme="c"; btnElem = "<button onclick = 'updateShopListItem(\"ISPURCHASED\"," + response.GetShoppingListResult[i].PRIMKEY + ",0)'>Reset To Unpurchased</button>";
								}else {bgTheme = response.GetShoppingListResult[i].COLOR;dcTheme="e";
									btnElem = "<button onclick = 'updateShopListItem(\"ISPURCHASED\"," + response.GetShoppingListResult[i].PRIMKEY + ",1)'>Mark as Purchased</button>"
								}
							s+= '<div data-role="collapsible" data-theme="' + bgTheme + '" data-content-theme="' + dcTheme + '" >'
							s+= '<h3>' + response.GetShoppingListResult[i].ITEMNAME + '</h3>';
							//s+= '<p>';
							//s+= response.GetShoppingListResult[i].ITEMNAME;
							s+= '<br />' + response.GetShoppingListResult[i].IDEMDESC;
							s+= '<table class="tablestyle">' + '<tr>';
							s+= '<td>' + btnElem + '</td>' + '';
							s+= '</tr></table>' + '';
							s+= '</p></div>';
						}
					s+=  ''
					div.innerHTML = s;
				$('#listDiv').trigger('create');
				/*
				<ul data-role="listview" data-theme="c" data-dividertheme="e">
					<li data-role="list-divider">Form elements</li>
					<li data-theme="e"><a href="docs-forms.html">Form basics</a></li>
					<li data-theme="e"><a href="forms-all.html">Form element gallery</a></li>
				</ul>
				*/
				
				
			  },
			  error: function (xhr, ajaxOptions, thrownError) {
					div.innerHTML += '<br /> err status:' + xhr.status
					div.innerHTML += '<br />' + thrownError
			  }		
			});
			
		}
		catch(ex){
		div.innerHTML += '<br />begin catch()';
		}
	}
	
	
	function updateShopListItem(colName,primkey, val){
	div = document.getElementById("listDiv");
			$.ajax({
				//PRIMKEY  ITEMNAME IDEMDESC USERNAME CREATEDATE ISVISIBLE ISPURCHASED COLOR
				crossDomain: true,
				type:"GET",
				contentType: "application/json; charset=utf-8",
				async:false,
				url: BaseUrl + "updateItem/ShopList/" + colName + "/" + primkey + "/" + val + "?callback=cb",
				dataType: "jsonp",                
				success: function (response) {	
				
					console.log(response.updateItemResult);							
					$('#listDiv').trigger('create');
					getShoppingList();							
			  },
			  error: function (xhr, ajaxOptions, thrownError) {
					console.log('err status:' + xhr.status);
					console.log(thrownError);
			  }		
			});						
	}

	function clearPurchased(){
	div = document.getElementById("listDiv");
			$.ajax({
				//PRIMKEY  ITEMNAME IDEMDESC USERNAME CREATEDATE ISVISIBLE ISPURCHASED COLOR
				crossDomain: true,
				type:"GET",
				contentType: "application/json; charset=utf-8",
				async:false,
				url: BaseUrl + "clearShoppingList?callback=cb",
				dataType: "jsonp",                
				success: function (response) {										
					$('#listDiv').trigger('create');
					getShoppingList();							
			  },
			  error: function (xhr, ajaxOptions, thrownError) {
					console.log('err status:' + xhr.status);
					console.log(thrownError);
			  }		
			});						
	}	
	function addShopListItem(name,desc){

	name = encodeURIComponent(name);
	desc = encodeURIComponent(desc);
	////////// insertItem?itemname={itemname}&itemdesc={itemdesc}&username={username}
	////////// insertItem/{itemname}/{itemdesc}/{username}
	//name = encodeURI(name);
	//desc = encodeURI(desc);
	
	uri = "itemname=" + name + "&itemdesc=" + desc + "&username=" +window.localStorage.getItem('username');
	//uri = encodeURI(uri);
	//uri += "/" + window.localStorage.getItem('username');
	console.log("name= " + name); console.log("desc= " + desc);
	
	console.log("BaseUrlinsertItem?" + uri + "&callback=cb");
			$.ajax({
				//PRIMKEY  ITEMNAME IDEMDESC USERNAME CREATEDATE ISVISIBLE ISPURCHASED COLOR
				crossDomain: true,
				type:"POST",
				contentType: "application/json; charset=utf-8",
				async:false,
				url: BaseUrl + "insertItem?" + uri + "&callback=cb",
				dataType: "jsonp",                
				success: function (response) {	
				
					console.log(response.updateItemResult);							
					$('#listDiv').trigger('create');
					getShoppingList();							
			  },
			  error: function (xhr, ajaxOptions, thrownError) {
					console.log('err status:' + xhr.status);
					console.log(thrownError);
			  }		
			});		
	}
	
		function getQPList(){
	div = document.getElementById("divQPlist");
	//window.localStorage.setItem('guessCount',0);
		try{
			$.ajax({
				//PRIMKEY_QP  ITEMNAME_QP ITEMDESC_QP
				crossDomain: true,
				type:"GET",
				contentType: "application/json; charset=utf-8",
				async:false,
				url: BaseUrl + "getQuickPicks?callback=cb",
				dataType: "jsonp",                
				success: function (response) {	
				
				/* AS LIST ITEMS					
					<ul data-role="listview" data-theme="b" data-dividertheme="e">
						<li data-theme="e" data-icon="false"><a onclick="QPChoose('salt','salt');">salt</a></li>
						<li data-theme="e" data-icon="false"><a name="has" onclick="QPChoose('Twizlers',this.name);">Twizlers</a></li>
					</ul>
				*/	
					
					var s = '<ul data-role="listview" data-theme="b" data-dividertheme="e">';
					for(i=0; i< response.GetQuickPicksResult.length; i ++){
						var pk = response.GetQuickPicksResult[i].PRIMKEY_QP;
						s+= '<li data-theme="e" data-icon="false"><a name=\"'  + response.GetQuickPicksResult[i].ITEMDESC_QP + '|' + pk + '\" onclick="QPChoose(\'' + response.GetQuickPicksResult[i].ITEMNAME_QP + '\',this.name);">'+ response.GetQuickPicksResult[i].ITEMNAME_QP +'</a></li>'
					}
					s+=  '</ul>'
					//console.log(s)
					div.innerHTML = s;
				$('#divQPlist').trigger('create');
				/*
				*/
				
				
			  },
			  error: function (xhr, ajaxOptions, thrownError) {
					div.innerHTML += '<br /> err status:' + xhr.status
					div.innerHTML += '<br />' + thrownError
			  }		
			});
			
		}
		catch(ex){
		div.innerHTML += '<br />begin catch()';
		}
	}
	
	function InsertDelQuickPick(itemname, desc, pk){
	//insertDeleteQuickPick?itemname={itemname}&itemdesc={itemdesc}&pkIfDelete={pkIfDelete}
	
	console.log("itemname=" + itemname + "|" + "encodeURIComponent(itemname)=" + encodeURIComponent(itemname));
	itemname = encodeURIComponent(itemname);
	desc = encodeURIComponent(desc);
	uri = "itemname=" + itemname + "&itemdesc=" + desc + "&pkIfDelete=" + pk;
		console.log(BaseUrl + "insertDeleteQuickPick?" + uri + "&callback=cb");
			$.ajax({
				
				//PRIMKEY  ITEMNAME IDEMDESC USERNAME CREATEDATE ISVISIBLE ISPURCHASED COLOR
				crossDomain: true,
				type:"GET",
				contentType: "application/json; charset=utf-8",
				async:false,
				url: BaseUrl + "insertDeleteQuickPick?" + uri + "&callback=cb",
				dataType: "jsonp",                
				success: function (response) {	
				
					console.log(response.insertDeleteQuickPickResult);							
					//$('#listDiv').trigger('create');
					getQPList();							
			  },
			  error: function (xhr, ajaxOptions, thrownError) {
					console.log('err status:' + xhr.status);
					console.log(thrownError);
			  }		
			});						
	}
	