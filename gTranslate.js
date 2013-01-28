;(function(window) {
	"use strict";
	
	var xmlHttpRequest = function() {
		var httpRequest;

		if (window.XMLHttpRequest) {
			httpRequest = new XMLHttpRequest();			
		} else if (window.ActiveXObject) {
			httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		} else {
			throw "XMLHttpRequest error";
		}

		return httpRequest;
	}


	var httpRequestIsOk = function(httpRequest) {
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
					return true;
			} 
		}	
	}

	var ajax = function(httpRequest, url) {
		httpRequest.open( 
				"GET"
			, url
			, true 
		);
						
		httpRequest.setRequestHeader("Content-Type", "application/javascript; charset=UTF-8");
		httpRequest.send(null);
	};
		
	var GTranslate = function() {
		var 
				SERVICE_URL  = "https://www.googleapis.com/language/translate/"
			, httpRequest = xmlHttpRequest()
		;		

		this.Settings = { 
				TOKEN: "AIzaSyBhweeRDTya3rDGBYGMFNlykaWHSFT0Upg"
			, DEFAULT_LANGUAGE: "en"
		}
		
		this.translate = function(text, from, to, callback) {
			from = from || this.Settings.DEFAULT_LANGUAGE;
			to  = to || this.Settings.DEFAULT_LANGUAGE;
			
			var 
					json
				, url = SERVICE_URL + "v2?key="+  this.Settings.TOKEN +"&source="+ from +"&target="+ to +"&q=" +text
			;

			ajax(httpRequest, url);
			
			httpRequest.onreadystatechange = function() {
				if ( httpRequestIsOk(httpRequest) ) {
				 	json = JSON.parse(httpRequest.responseText).data.translations;					
					callback.call(undefined, json);
				}
			}			
		}

		this.languages = function(callback) {
			var 
					url = SERVICE_URL + "v2/languages?key="+ this.Settings.TOKEN
				, languages = []
				, json
			;
			
			ajax(httpRequest, url);

			httpRequest.onreadystatechange = function() {
				if ( httpRequestIsOk(httpRequest) ) {
				 	json = JSON.parse(httpRequest.responseText).data.languages;
					// .map() > 1.6 
					// Fuck IE. 
					for (var i = 0; i < json.length; i++) {
						languages.push(json[i].language);
					}
					
					return callback.call(undefined, languages);
				}
			}			
		};
		
		this.detect = function(text, callback){
			var 
					url = SERVICE_URL + "v2/detect?key="+ this.Settings.TOKEN + "&q="+ text
				, language 
				, json
			;
			
			ajax(httpRequest, url);

			httpRequest.onreadystatechange = function() {
				if ( httpRequestIsOk(httpRequest) ) {
				 	json = JSON.parse(httpRequest.responseText).data.detections;					
					language = json[0].language; 

					return callback.call(undefined, language);
				}
			}
		}
	}
	
	window.gTranslate = new GTranslate();

	String.prototype.translate = function(from, to, callback) {
		window.gTranslate.translate(this, from, to, callback);		
	} 
	
})(window);