var rlServer = "https://tools.wmflabs.org/fengtools/reflinkstest";
var cgUrl = ""; // Current page's URL, used in Firefox

function cgShowPanel( panel ) {
	var panels = [ "confirmation", "loading", "error", "result" ];
	for ( var i = 0; i < panels.length; i++ ) {
		if ( panels[i] != panel ) {
			var id = "#panel-" + panels[i];
			$( id ).hide();
		}
	}
	var id = "#panel-" + panel;
	$( id ).show();
}
function cgRun( url ) {
	cgShowPanel( "loading" );
	var api = rlServer + "/api.php?action=citegen&format=CiteTemplateGenerator&url=" + encodeURIComponent( url ) + "&callback=?";
	$.getJSON( api, function ( result ) {
		if ( result['success'] ) {
			$( "#result" ).html( result['citation'] );
			cgShowPanel( "result" );
		} else {
			$( "#error-description" ).html( result['description'] );
			cgShowPanel( "error" );
		}
	} );
}
function cgDispatch() {
	if ( typeof chrome !== 'undefined' ) {
		// Chrome
		chrome.tabs.query(
			{ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
			function( tabs ) {
				cgRun( tabs[0].url );
			}
		);
	} else {
		// Firefox
		if ( cgUrl.length ) {
			cgRun( cgUrl );
		} else {
			alert( "The tool hasn't fully loaded yet, please wait..." );
		}
	}
}
function cgReceiveUrl( url ) {
	cgUrl = url;
	cgShowPanel( "confirmation" );
}
$( document ).ready( function() {
	cgShowPanel( "confirmation" );
	$( "#run" ).click( function() {
		cgDispatch();
	} );
	$( "#copytoclipboard" ).click( function() {
		$( "#result" ).select();
		document.execCommand( "copy" );
	} );
	if ( typeof chrome === 'undefined' ) {
		// Firefox
		$( "#copytoclipboard" ).html( "Select all" );
		addon.port.on( "cgUrl", cgReceiveUrl );
	}
} );
