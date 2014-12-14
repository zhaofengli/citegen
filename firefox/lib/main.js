var { ToggleButton } = require( "sdk/ui/button/toggle" );
var panels = require( "sdk/panel" );
var self = require( "sdk/self" );
var tabs = require( "sdk/tabs" );

var button = ToggleButton({
	id: "citegen-button",
	label: "Generate citation",
	icon: {
		"32": "./icon.png",
	},
	onChange: handleChange
});

var panel = panels.Panel( {
	contentURL: self.data.url( "popup.html" ),
	width: 363,
	height: 500,
	onHide: handleHide
} );

function handleChange( state ) {
	if ( state.checked ) {
		panel.show( { position: button } );
		panel.port.emit( "cgUrl", tabs.activeTab.url );
	}
}

function handleHide() {
	button.state( "window", { checked: false } );
}
