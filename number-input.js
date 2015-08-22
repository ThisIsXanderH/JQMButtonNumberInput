// Add/Subtract Number Input v1.4.2
// Created by Xander, TurtleEmpire.com
// Released under MIT License
/* USAGE:
Attributes - 
<div id="demoDiv" class="numberInput" data-min="0" data-max="10" data-init="3"></div>
id			-	The id is used for creating ids to child element. Can be anything.
class		-	Set to numberInput to signal this code should run for it
data-min	-	Minimum number allowed for display
data-max	-	Maximum number allowed for display (Must be larger than data-min)
data-init	-	Initial number shown on display (Must be within min and max). 
data-val	-	Current number shown on display (Assigned through code). 

HTML Output Structure (Formatted for readability)-
<div id="demoDiv" class="numberInput" data-min="0" data-max="10" data-init="3">
	<button id="demoDivMinus" class="numberInputMinus ui-btn ui-icon-minus ui-btn-icon-notext ui-btn-inline ui-corner-all" data-display="demoDivDisplay"></button>
	<button id="demoDivPlus" class="numberInputPlus ui-btn ui-icon-plus ui-btn-icon-notext ui-btn-inline ui-corner-all" data-display="demoDivDisplay"></button>
	<div id="demoDivDisplay" class="numberInputDisplay">5</div>
</div>

ids (NOTE - ### represents the id of the parent div) -
###Minus		- This is the id to the minus button.
###Plus			- This is the id to the plus button.
###Display		- Is where the current number is shown

classes -
numberInputMinus	- This is the class of the minus button
numberInputPlus		- This is the class of the plus button
numberInputDisplay	- This is the class of the display area
ui-btn ui-icon-minus ui-btn-icon-notext ui-btn-inline ui-corner-all		- These are all jQuery Mobile classes

Attributes - 
data-display	- This is for internal purposes of referencing where to send changes on the button presses
data-hasLimit	- This is for if the button has a max or min to adhere to
</div>
*/
$(document).ready(function(e) {
    $('.numberInput').each(function() {
		var divID = $(this).attr('id'),
		numInit = parseInt($(this).data('init')),
		/* TODO: Add increment */
		numMin,numMax,
		btnMinus,btnPlus,display;
		
		if (typeof $(this).data('min') !== 'undefined') {
			numMin = parseInt($(this).data('min'));	
			hasMin = true;		
		} else {
			numMin = 0;
			hasMin = false;
		}
		
		if (typeof $(this).data('max') !== 'undefined') {
			numMax = parseInt($(this).data('max'));
			hasMax = true;
		} else {
			numMax = 0;
			hasMax = false;
		}
		
		btnMinus = '<button id="'.concat(divID,'Minus" class="ui-btn ui-corner-all ui-icon-minus ui-btn-icon-notext ui-btn-inline numberInputMinus" data-display="',divID,'Display" data-limited="',hasMin,'"></button>');
		btnPlus = '<button id="'.concat(divID,'Plus" class="ui-btn ui-corner-all ui-icon-plus ui-btn-icon-notext ui-btn-inline numberInputPlus" data-display="',divID,'Display" data-limited="',hasMax,'"></button>');
		display = '<div id="'.concat(divID,'Display" class="numberInputDisplay">',numInit.toString(),'</span>');
		$(this).html(btnMinus.concat(btnPlus,display));
		$(this).data('val',numInit);
	});
	/* TODO: Fine more elegant way to retrieve value. Perhaps hidden <input>? */
});

$(document).on('click','.numberInputMinus',function() {
	//Check current against minimum, subtract 1 and update display if bigger. Triggers change() for parent div.
	var display = '#'.concat($(this).data('display')),
	parent = '#'.concat($(this).parent().attr('id')),
	current = parseInt($(display).text()),
	hasLimit = $(this).data('limited'),
	numMin = parseInt($(this).parent().data('min'));
	if(current > numMin || !hasLimit) {
		current -= 1;
		$(display).text(current.toString());
		$(parent).data('val',current);
		$(parent).trigger('change');
	}
	return false; //This prevent it from sending forms
});

$(document).on('click','.numberInputPlus',function() {
	//Check current against maximum, add 1 and update display if smaller. Triggers change() for parent div.
	var display = '#'.concat($(this).data('display')),
	parent = '#'.concat($(this).parent().attr('id')),
	current = parseInt($(display).text()),
	hasLimit = $(this).data('limited'),
	numMax = parseInt($(this).parent().data('max'));
	if(current < numMax || !hasLimit) {
		current += 1;
		$(display).text(current.toString());
		$(parent).data('val',current);
		$(parent).trigger('change');
	}
	return false; //This prevent it from sending forms
});

/* TODO: Condense both down to one function */