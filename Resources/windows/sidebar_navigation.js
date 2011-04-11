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
	backgroundImage:'../images/timetable_active.png',
	backgroundSelectedImage: '../images/timetable_disabled.png',
    backgroundDisabledImage: '../images/timetable_disabled.png'
});

var foldersButton = Ti.UI.createButton({
	width:141,
	height: 45,
    top: 13,
    right: 15,
    enabled: false,
	backgroundImage:'../images/folders_active.png',
	backgroundSelectedImage: '../images/folders_disabled.png',
    backgroundDisabledImage: '../images/folders_disabled.png'
});

sidebarHeader.add(timetableButton, foldersButton);
win.add(sidebarHeader);

timetableButton.addEventListener('click', function(e) {
	Ti.App.fireEvent('openTimetable',{});
});


//Ti.include('course_list.js')

//Ti.App.fireEvent('CourseList', {name:'openen'});

