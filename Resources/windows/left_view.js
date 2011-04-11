var win = Titanium.UI.currentWindow;

win.hideNavBar();

var timetableWin = Ti.UI.createWindow({
    url: 'timetable.js',
    title: 'Timetable'
});

var sidebarHeader = Ti.UI.createView({
		top:0,
		left:0,
		height:70,
		width:320
});

var timetableButton = Ti.UI.createButton({
	width:141,
	height: 45,
    top: 13,
    left: 15,
    enabled: false,
	backgroundImage:'../images/timetable_active.png',
	backgroundSelectedImage: '../images/timetable_disabled.png',
    backgroundDisabledImage: '../images/timetable_disabled.png'
});

var foldersButton = Ti.UI.createButton({
	width:141,
	height: 45,
    top: 13,
    right: 15,
	backgroundImage:'../images/folders_active.png',
	backgroundSelectedImage: '../images/folders_disabled.png',
    backgroundDisabledImage: '../images/folders_disabled.png'
});

sidebarHeader.add(timetableButton, foldersButton);
win.add( sidebarHeader);

Titanium.include("calendar.js");
Titanium.include("list.js");

foldersButton.addEventListener('click', function(e) {
	Ti.App.fireEvent('openFolders',{});
});


