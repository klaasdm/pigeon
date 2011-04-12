/**
 * @author kd322
 */
Ti.include('../model/s_days.js');
Ti.include('../data/DataAccess.js');
Ti.include('../windows/pdf_list.js');

var window = Titanium.UI.currentWindow;
var setDate = new Date();
var rowData = [];
var selectedDate;
var today = true;
var nextVisible = false;

var coursesView = Ti.UI.createView({
		top:365,
		left:0,
		width: "100%",
		bottom: 0
});
window.add(coursesView);

var sidebarTitleHeader = Ti.UI.createView({
		top:0,
		left:0,
		height:48,
		width:320,
		backgroundImage: '../images/sidebar_title.png'
});

var sidebarTitle = Titanium.UI.createLabel({
	text: "Courses",
	left: 0,
	right: 0,
	width: 320,
	top: 15,
	height: 16,
	font:{fontSize:16,fontWeight:'bold'},
	color:'#fefefe',
	textAlign: "center",
    shadowColor: '#1d2226', 
    shadowOffset: { x: 0, y: 2 }
});

sidebarTitleHeader.add(sidebarTitle);

a = setDate.getFullYear();
b = setDate.getMonth() + 1;
c = setDate.getDate();
d = setDate.getDay();

if (b < 10) {
    b = "0" + b;
};


if (c < 10) {
    c = "0" + c;
};
var da = new DALists();
var lists = [];




function dayname(){

	var name = "";
	switch (d) {
		case 1:
			name = "Monday";
			break;
		case 2:
			name = "Tuesday";
			break;
		case 3:
			name = "Wednesday";
			break;
		case 4:
			name = "Thursday";
			break;
		case 5:
			name = "Friday";
			break;
		case 6:
			name = "Saturday";
			break;
		case 0:
			name = "Sunday";
			break;
	}
	selectedDate = name;
}

dayname();



    
var courseTable = Titanium.UI.createTableView({
    top: 48,
    left: 5,
    width: "310",
    backgroundColor: 'transparent',
    bottom: 0,
    separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE
});
courseTable.addEventListener('click', function(e){
    /*Ti.App.fireEvent('PdfList', {
        id: e.row.listId
    });*/
	Ti.App.fireEvent('courseClicked', {courseId:e.row.listId});
});
var btnTextnote = Titanium.UI.createButton({
    title: 'TextNote',
    height: 35,
    bottom: 10,
    left: 100,
    width: 150

});
btnTextnote.addEventListener('click', function(){
 Ti.App.fireEvent('textView', {
         
            });
});

coursesView.add(sidebarTitleHeader, courseTable,btnTextnote);

LoadList(selectedDate);
Ti.App.addEventListener('datePicked', function(data){
	today = data.isToday;
    selectedDate = (data.date);
    LoadList(selectedDate);
});




function LoadList(day){
	nextVisible = false;
    rowData = [];
    lists = da.getLists(day);
    
    for (var i = 0; i < lists.length; i++) {
    	
        var S_days = lists[i];
		
		courseTable.opacity = 1;
        
        var listRow = Titanium.UI.createTableViewRow({
            height: 65,
            hasChild: false,
			backgroundImage: '../images/course_item.png',
			selectedBackgroundImage: '../images/course_item_hover.png',
            listId: S_days.getS_id(),
            listStart: S_days.getStart(),
            listEnd: S_days.getEnd(),
            color: '#fff',
            borderColor: '#000',
        
        });
        //List title
        var title = Ti.UI.createLabel({
            color: '#323639',
            font: {
                fontSize: 20,
                fontWeight: 'bold'
            },
			shadowColor: '#fff', 
    		shadowOffset: { x: 0, y: 2 },
            top: 13,
            left: 10,
            height: 24,
            width: 250,
            text: S_days.getLesson()
        
        });
        var go = Ti.UI.createLabel({
            color: '#323639',
            font: {
                fontSize: 14,
                fontWeight: 'light'
            },
            top: 40,
            left: 10,
            width: 100,
            height: 14,
            text: S_days.getStart(),
        
        });
        var leave = Ti.UI.createLabel({
            color: '#323639',
            font: {
                fontSize: 14,
                fontWeight: 'light'
            },
            top: 40,
            left: 50,
            width: 100,
            height: 14,
            text: "- " + S_days.getEnd(),
        
        });        
		
		var isStarted = false;
		var isBusy = false;
		
		if ((S_days.getStart()).substring(0, 2) <= setDate.getHours()){
			if((S_days.getStart()).substring(0, 2) == setDate.getHours()){
				if((S_days.getStart()).substring(3, 5) <= setDate.getMinutes()){
					isStarted = true;
				}else{
					isStarted = false;
				};
			}else{
				isStarted = true;
			};
		};
		
		if ((S_days.getEnd()).substring(0, 2) >= setDate.getHours()){
			if((S_days.getEnd()).substring(0, 2) == setDate.getHours()){
				if((S_days.getEnd()).substring(3, 5) > setDate.getMinutes()){
					isBusy = true;
				}else{
					isBusy = false;
				};
			}else{
				isBusy = true;
			};
		};
		
		if(isStarted && isBusy  && today == true){
			var nowRibbon = Ti.UI.createImageView({
                top: 5,
                right: 0,
                height: 45,
                width: 45,
                image: "../images/now_ribbon.png"
            });
			listRow.add(nowRibbon);
		};
		
		if(isStarted == false && nextVisible == false && today == true){
			var nextRibbon = Ti.UI.createImageView({
                top: 5,
                right: 0,
                height: 45,
                width: 45,
                image: "../images/next_ribbon.png"
            });
			listRow.add(nextRibbon);
			nextVisible = true;
		};
        
        listRow.add(title, go, leave);
        rowData.push(listRow);
		courseTable.setData(rowData);
    };
	courseTable.setData(rowData);
};