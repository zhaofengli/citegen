/*
	Copyright (c) 2014, Zhaofeng Li
	All rights reserved.
	Redistribution and use in source and binary forms, with or without
	modification, are permitted provided that the following conditions are met:
	* Redistributions of source code must retain the above copyright notice, this
	list of conditions and the following disclaimer.
	* Redistributions in binary form must reproduce the above copyright notice,
	this list of conditions and the following disclaimer in the documentation
	and/or other materials provided with the distribution.
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
	FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
	DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
	SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
	CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
	OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var { ToggleButton } = require( "sdk/ui/button/toggle" );
var panels = require( "sdk/panel" );
var self = require( "sdk/self" );
var tabs = require( "sdk/tabs" );
var { Cc, Ci } = require("chrome");

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

panel.port.on( "cgCopy", function( text ) {
	// Copy the text to clipboard
	var gClipboardHelper = Cc["@mozilla.org/widget/clipboardhelper;1"]
	                           .getService( Ci.nsIClipboardHelper );
	gClipboardHelper.copyString( text );
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
