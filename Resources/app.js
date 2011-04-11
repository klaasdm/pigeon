/**
 * @author kd322
 */
Ti.include('data/JsonDataRetriever.js');
Ti.include('windows/split_view_nav.js');

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group


//
// create base UI tab and root window
//


var win1 = Titanium.UI.createWindow({
    title: 'Tab 1',
    backgroundColor: '#fff'
});


// open tab group
win1.open();
SplitViewNav.open();
