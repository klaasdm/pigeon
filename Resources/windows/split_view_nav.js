SplitViewNav = {};

var startingOrientation = "images/left_background.png";

// WINDOWS
SplitViewNav.masterWindow = Ti.UI.createWindow({title:'Calendar',backgroundColor:'transparent', barColor:'#2d363f', url:'windows/left_view.js'});

SplitViewNav.detailWindow = Ti.UI.createWindow({title:'Course',backgroundColor:'#313b43', barColor:'#2d363f', url:'windows/right_view.js'});

if(Titanium.UI.orientation == Titanium.UI.PORTRAIT || Titanium.UI.orientation == Titanium.UI.UPSIDE_PORTRAIT){
      startingOrientation = "images/left_background.png";
  }
  else if(Titanium.UI.orientation == Titanium.UI.LANDSCAPE_LEFT || Titanium.UI.orientation == Titanium.UI.LANDSCAPE_RIGHT){
      startingOrientation = "images/left_background_short.png";
  }
  else{
 
  };

// MASTER NAV GROUP
SplitViewNav.masterNav = Ti.UI.iPhone.createNavigationGroup({
	window:SplitViewNav.masterWindow,
    backgroundImage: startingOrientation
});

// DETAIL NAV GROUP
SplitViewNav.detailNav = Ti.UI.iPhone.createNavigationGroup({
	window:SplitViewNav.detailWindow
});

// SPLIT VIEW
SplitViewNav.splitView = Titanium.UI.iPad.createSplitWindow({
	masterView:SplitViewNav.masterNav,
	detailView:SplitViewNav.detailNav
});


SplitViewNav.open = function()
{
	Ti.API.info('in open for split view nav');
	SplitViewNav.splitView.open();	
};

SplitViewNav.splitView.addEventListener('visible', function(e) {
	Ti.API.log('View: '+e.view);
	if (e.view == 'detail') {
		e.button.title = "Calendar";
		SplitViewNav.detailWindow.leftNavButton = e.button;
		Ti.API.log('Set button');
        SplitViewNav.masterNav.backgroundImage = 'images/left_background.png';
	}
	else if (e.view == 'master'){
		SplitViewNav.detailWindow.leftNavButton = null;
		Ti.API.log('Removed button');
        SplitViewNav.masterNav.backgroundImage = 'images/left_background_short.png';
	};
});

Ti.App.addEventListener('openFolders', function(e) 
{ 
     var w = Ti.UI.createWindow({backgroundColor:'transparent', url: 'windows/course_list.js'});
     	SplitViewNav.masterNav.open(w,{animated:false});
});

Ti.App.addEventListener('openTimetable', function(e) 
{
     var w = Ti.UI.createWindow({backgroundColor:'transparent', url: 'windows/left_view.js'});
	SplitViewNav.masterNav.open(w,{animated:false});
});

Ti.App.addEventListener('NotesList', function(e) 
{
     var w = Ti.UI.createWindow({data: [{'id':e.id,'name':e.name}], backgroundColor:'transparent', url: 'windows/notes_list.js'});
	SplitViewNav.masterNav.open(w,{animated:false});
});

