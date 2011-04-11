var calendarWin = Titanium.UI.currentWindow;

var setDate = new Date();
a = setDate.getFullYear();
b = setDate.getMonth() + 1;
c = setDate.getDate();
d = setDate.getDay();

var currentMonth = b;
var currentYear = a;
var currentCalendar;

var selectedDay;
var selectedMonth;
var selectedYear;

var daysArray = [];
var animateTo = 320;
var animateFrom = -320;
var selected = false;

var dayPreview = Ti.UI.createView({height:55, width: 35, top: 0, left: -35, backgroundImage: "../images/day_preview.png", opacity: 0});
var dayPreviewText = Ti.UI.createLabel({
    text: "16", 
    width: 34, 
    height: 16, 
    textAlign: 'center', 
    left: 0, 
    top: 10, 
    font:{fontSize:16,fontWeight:'bold'}, 
    color: "#262c31", 
    shadowColor: '#fff',
    shadowOffset: {
        x: 0,
        y: 1
    },
});
dayPreview.add(dayPreviewText);

monthView = Ti.UI.createView({height: 50, width: 320, left: 0, top: 70, backgroundImage: "../images/sidebar_shadow.png", backgroundTopCap: "../images/date_divider.png", backgroundBottomCap: "../images/date_divider.png"});

var div1 = Ti.UI.createImageView({
		top:0,
		left:0,
		height:2,
		width:320,
		image: "../images/date_divider.png"
});

var div2 = Ti.UI.createImageView({
		bottom:0,
		left:0,
		height:2,
		width:320,
		image: "../images/date_divider.png"
});

function monthName(monthNumber)
{
    var name = "";
        switch(monthNumber){
            case 1: name = "January"; break;
            case 2: name = "February"; break;
            case 3: name = "March"; break;
            case 4: name = "April"; break;
            case 5: name = "May"; break;
            case 6: name = "June"; break;
            case 7: name = "July"; break;
            case 8: name = "August"; break;
            case 9: name = "September"; break;
            case 10: name = "October"; break;
            case 11: name = "November"; break;
            case 12: name = "December"; break;
        }
	return name;
}


function dayName(dayNumber)
{
    var name = "";
        switch(dayNumber){
            case 1: name = "Monday"; break;
            case 2: name = "Tuesday"; break;
            case 3: name = "Wednesday"; break;
            case 4: name = "Thursday"; break;
            case 5: name = "Friday"; break;
            case 6: name = "Saturday"; break;
            case 0: name = "Sunday"; break;
        }
	return name;
}

var prevMonth = Ti.UI.createButton({
	width:40,
	height: 40,
    top: 6,
    left: 35,
	backgroundImage:'../images/month_left.png',
	backgroundSelectedImage: '../images/month_left_hover.png'
});

var nextMonth = Ti.UI.createButton({
	width:40,
	height: 40,
    top: 6,
    right: 36,
	backgroundImage: '../images/month_right.png',
	backgroundSelectedImage: '../images/month_right_hover.png'
});


var monthLabel = Ti.UI.createLabel({
	text: monthName(currentMonth) + " " + currentYear,
	font:{fontSize:16,fontWeight:'bold'},
	color:'#fefefe',
    height: 40,
	left:0,
	top: 5,
    textAlign: "center",
    shadowColor: '#1d2226', 
    shadowOffset: { x: 0, y: 2 }
});

function daysInMonth(month, year)
{
	return 32 - new Date(year, month, 32).getDate();
};



function datePicked(){
	var month;
	var day;
	if(selectedMonth <10){
		month = "0" + selectedMonth;
	}else{
		month = selectedMonth;
	};
	if(selectedDay <10){
		day = "0" + selectedDay;
	}else{
		day = selectedDay;
	};
	var pickedDate = dayName(new Date(selectedYear,selectedMonth - 1,selectedDay).getDay());
	
	var today = false;
	
	var zero = "";
	if(selectedDay <10){
		zero = "0";
	};
	
	if((zero + selectedDay + " / " + selectedMonth + " / " + selectedYear) == (c + " / " + currentMonth + " / " + currentYear)){
		today = true;
	};
	
	
	Ti.App.fireEvent('datePicked', {date:pickedDate, isToday:today,});
};

function showDays(){
	
	var daysBox = Ti.UI.createView({height:180, width: 245, top: 175, left: animateFrom, opacity: 0});
	calendarWin.add(daysBox);
	
	var a = Titanium.UI.createAnimation();
	a.left = 35;
	a.duration = 250;
	a.opacity = 1;
	
	var ypos = 0;
	
	for(i=1;i<daysInMonth(currentMonth - 1,currentYear) + 1;i++){
		   
		   var day = Ti.UI.createButton({
		   		title: i,
				width:35,
				height: 30,
				top: ypos,
				font:{fontSize:12,fontWeight:'regular'},
				backgroundImage:'none',
				backgroundSelectedImage:'../images/day_hover_background.png',
				left: (new Date(currentYear,currentMonth - 1,i).getDay() * 35)
			});
			
			if(selected == false){
				if (i == c) {
					day.backgroundImage = "../images/selected_day.png";
                    day.backgroundSelectedImage = 'none';
					selectedYear = currentYear;
					selectedMonth = currentMonth;
					selectedDay = i;
					selected = true;
				}
			}else{
				if(i == selectedDay && currentMonth == selectedMonth && currentYear == selectedYear){
					day.backgroundImage = "../images/selected_day.png";
				};
			};
			
			
			day.addEventListener('click', function(e) {
			    Titanium.API.info(e.source.title + " " + monthName(currentMonth) + " " + currentYear);
				selectedYear = currentYear;
				selectedMonth = currentMonth;
				selectedDay = e.source.title;
				for (i=0;i<daysArray.length;i++){
					(daysArray[i]).backgroundImage = 'none';				};
				e.source.backgroundImage = "../images/selected_day.png";
				
				datePicked();
			});
            
            day.addEventListener('touchstart',function(e){
                dayPreview.left = e.source.left + 35;
                dayPreview.top = e.source.top + 175 - 55;
                dayPreviewText.text = e.source.title;
                dayPreview.zIndex = e.source.zIndex + 1;
                dayPreview.opacity = 1;
            });
            
            day.addEventListener('touchend',function(e){
                dayPreview.opacity = 0;
                dayPreview.left = -35
            });
			
		   daysBox.add(day);
		   
		   daysArray.push(day);
		   
		   if (new Date(currentYear, currentMonth -1, i).getDay() == 6) {
		   	ypos += 30;
		   };
     };
	 currentCalendar = daysBox;
	 currentCalendar.animate(a);
};

showDays();

function removeDays(){
	
	if(currentCalendar != null){
		var oldCalendar = currentCalendar;
	};
	
	var a = Titanium.UI.createAnimation();
	a.left = animateTo;
	a.duration = 250;
	a.opacity = 0;
	
	a.addEventListener('complete', function(e){
		calendarWin.remove(oldCalendar)
		Ti.API.info("calendar removed");
	});
	
	if (oldCalendar != null) {
		oldCalendar.animate(a);
	};
	
	daysArray = [];
};


function changeCalendar(){
    monthLabel.setText(monthName(currentMonth) + " "  + currentYear);
	showDays();
};

prevMonth.addEventListener('click', function(e) {
	animateTo = 320;
	animateFrom = -320;
    if(currentMonth == 1){
    currentMonth = 12;
    currentYear -= 1;
    }else{
    currentMonth -= 1;
    };
	removeDays();
    changeCalendar();
});

nextMonth.addEventListener('click', function(e) {
	animateTo = -320;
	animateFrom = 320;
    if(currentMonth == 12){
    currentMonth = 1;
    currentYear +=1;
    }else{
    currentMonth += 1;
    };
	removeDays();
    changeCalendar();
});



var su = Ti.UI.createLabel({ text: "Su", font:{fontSize:12,fontWeight:'bold'}, color:'#fefefe', height: 35, width: 35, left:35, top: 130, textAlign: "center", shadowColor: '#1d2226', shadowOffset: { x: 0, y: 2 } });
var mo = Ti.UI.createLabel({ text: "Mo", font:{fontSize:12,fontWeight:'bold'}, color:'#fefefe', height: 35, width: 35, left:70, top: 130, textAlign: "center", shadowColor: '#1d2226', shadowOffset: { x: 0, y: 2 } });
var tu = Ti.UI.createLabel({ text: "Tu", font:{fontSize:12,fontWeight:'bold'}, color:'#fefefe', height: 35, width: 35, left:105, top: 130, textAlign: "center", shadowColor: '#1d2226', shadowOffset: { x: 0, y: 2 } });
var we = Ti.UI.createLabel({ text: "We", font:{fontSize:12,fontWeight:'bold'}, color:'#fefefe', height: 35, width: 35, left:140, top: 130, textAlign: "center", shadowColor: '#1d2226', shadowOffset: { x: 0, y: 2 } });
var th = Ti.UI.createLabel({ text: "Th", font:{fontSize:12,fontWeight:'bold'}, color:'#fefefe', height: 35, width: 35, left:175, top: 130, textAlign: "center", shadowColor: '#1d2226', shadowOffset: { x: 0, y: 2 } });
var fr = Ti.UI.createLabel({ text: "Fr", font:{fontSize:12,fontWeight:'bold'}, color:'#fefefe', height: 35, width: 35, left:210, top: 130, textAlign: "center", shadowColor: '#1d2226', shadowOffset: { x: 0, y: 2 } });
var sa = Ti.UI.createLabel({ text: "Sa", font:{fontSize:12,fontWeight:'bold'}, color:'#fefefe', height: 35, width: 35, left:245, top: 130, textAlign: "center", shadowColor: '#1d2226', shadowOffset: { x: 0, y: 2 } });

monthView.add(div1,div2, prevMonth, nextMonth, monthLabel);
calendarWin.add(su, mo, tu, we, th, fr, sa, monthView, dayPreview);