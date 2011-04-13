/**
 * @author kd322
 */
var win = Titanium.UI.currentWindow;
var textView = Ti.UI.createView({
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
});


var ta1 = Titanium.UI.createTextArea({
    value: 'I am a textarea',
    height: 300,
    width: '100%',
    top: 60,
    font: {
        fontSize: 20,
        fontFamily: 'Marker Felt',
        fontWeight: 'bold'
    },
    color: '#888',
    textAlign: 'left',
    appearance: Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
    keyboardType: Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION,
    returnKeyType: Titanium.UI.RETURNKEY_EMERGENCY_CALL,
    borderWidth: 2,
    borderColor: '#bbb',
    borderRadius: 5,
	
});
textView.add(ta1);
