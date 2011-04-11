var win = Titanium.UI.currentWindow;

var annotation = Titanium.Map.createAnnotation({
    latitude: 52.2015992,
    longitude: 0.1164893,
    title: "CARET",
    subtitle: 'Centre for Applied Research in Educational Technologies',
    animate: true
});

var cambridge = {
    latitude: 52.2015992,
    longitude: 0.1164893,
    latitudeDelta: 0.010,
    longitudeDelta: 0.018
};

//
// CREATE MAP VIEW
//
var mapview = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: cambridge,
    animate: true,
    regionFit: true,
    userLocation: true,
    annotations: [annotation]
});

var mapview2 = Titanium.Map.createView({
    mapType: Titanium.Map.STANDARD_TYPE,
    region: cambridge,
    animate: true,
    regionFit: true,
    userLocation: true,
	top:420,
	bottom: 0,
	width: "100%",
    annotations: [annotation]
});

var infoWindow = Titanium.UI.createView({
    title: 'Info',
    backgroundColor: '#f7f8f8',
    top: 90,
    bottom: 0,
    width: "100%"
});

infoWindow.add(mapview2);

var mapWindow = Titanium.UI.createView({
    title: 'Info',
    backgroundColor: '#f7f8f8',
    opacity: 0,
    top: 90,
    bottom: 0,
    width: "100%"
});

var notesWindow = Titanium.UI.createView({
    title: 'Info',
    backgroundColor: '#f7f8f8',
    opacity: 0,
    top: 90,
    bottom: 0,
    width: "100%"
});

var lines = Ti.UI.createImageView({
    top: 0,
    left: 0,
    height: 1024,
    width: 768,
    image: "../images/lines.png"
});

notesWindow.add(lines);


var ta1 = Titanium.UI.createTextArea({
    value: 'Notes: ',
    left: 20,
    right: 20,
    top: 23,
    bottom: 50,
    font: {
        fontSize: 27,
        fontFamily: 'Marker Felt',
        fontWeight: 'bold',
        lineSpacing: 30
    },
    color: '#888',
    textAlign: 'left',
    borderWidth: 0,
    backgroundColor: 'transparent',
    suppressReturn: false
});

var notesBar = Titanium.UI.createView({
    title: 'Info',
    backgroundColor: '#f7f8f8',
    height: 55,
    bottom: 0,
    width: "100%"
});

notesWindow.add(ta1, notesBar);

actionButton = Titanium.UI.createButton({
    right: 20,
    bottom: 10,
    enabled: true,
    backgroundImage: '../images/action.png',
    backgroundFocusedImage: '../images/action.png',
    width: 45,
    height: 45
});

var dialog = Titanium.UI.createOptionDialog({
    options: ['Email', 'Save']
});


// build first popover
actionButton.addEventListener('click', function(){
    dialog.show({
        view: actionButton,
        animated: true
    });
});

notesBar.add(actionButton);

mapWindow.add(mapview);

var menu = Titanium.UI.createView({
    title: 'Menu',
    backgroundImage: '../images/header.png',
    top: 0,
    height: 103,
    width: "100%",
    backgroundColor: 'transparent'
});


var CourseTitle = Ti.UI.createLabel({
    text: "Materials Science",
    font: {
        fontSize: 38,
        fontWeight: 'bold'
    },
    height: 42,
    width: 600,
    color: "#323639",
    left: 30,
    top: 25,
    shadowColor: '#eeeff0',
    shadowOffset: {
        x: 0,
        y: 1
    },
    textAlign: "left"
});

menu.add(CourseTitle);

infoButton = Titanium.UI.createButton({
    right: 160,
    top: 25,
    enabled: false,
    backgroundImage: '../images/info_button.png',
    backgroundDisabledImage: '../images/info_button_active.png',
    width: 45,
    height: 45
});

menu.add(infoButton);

infoButton.addEventListener('click', function(e){
    infoButton.enabled = false;
    mapsButton.enabled = true;
    notesButton.enabled = true;
    
    infoWindow.animate(Titanium.UI.createAnimation({
        opacity: 1,
        duration: 200
    }));
    
    mapWindow.animate(Titanium.UI.createAnimation({
        opacity: 0,
        duration: 200
    }));
    
    notesWindow.animate(Titanium.UI.createAnimation({
        opacity: 0,
        duration: 200
    }));
    
    ta1.blur();
});


mapsButton = Titanium.UI.createButton({
    right: 90,
    top: 25,
    enabled: true,
    backgroundImage: '../images/map_button.png',
    backgroundDisabledImage: '../images/map_button_active.png',
    width: 45,
    height: 45
});


menu.add(mapsButton);

mapsButton.addEventListener('click', function(e){
    infoButton.enabled = true;
    mapsButton.enabled = false;
    notesButton.enabled = true;
    
    infoWindow.animate(Titanium.UI.createAnimation({
        opacity: 0,
        duration: 200
    }));
    
    mapWindow.animate(Titanium.UI.createAnimation({
        opacity: 1,
        duration: 200
    }));
    
    notesWindow.animate(Titanium.UI.createAnimation({
        opacity: 0,
        duration: 200
    }));
    
    ta1.blur();
});

notesButton = Titanium.UI.createButton({
    right: 20,
    top: 25,
    enabled: true,
    backgroundImage: '../images/notes_button.png',
    backgroundDisabledImage: '../images/notes_button_active.png',
    width: 45,
    height: 45
});


dialog.addEventListener('click', function(e){
    if(e.index == 0){
		var emailDialog = Titanium.UI.createEmailDialog();
        emailDialog.toRecipients = [];
		emailDialog.subject = CourseTitle.text;
        emailDialog.messageBody = ta1.value;
        emailDialog.open();
	};
})




menu.add(notesButton);

notesButton.addEventListener('click', function(e){
    infoButton.enabled = true;
    mapsButton.enabled = true;
    notesButton.enabled = false;
    
    infoWindow.animate(Titanium.UI.createAnimation({
        opacity: 0,
        duration: 200
    }));
    
    mapWindow.animate(Titanium.UI.createAnimation({
        opacity: 0,
        duration: 200
    }));
    
    notesWindow.animate(Titanium.UI.createAnimation({
        opacity: 1,
        duration: 200
    }));
    
    ta1.focus();
});


Titanium.Gesture.addEventListener('orientationchange', function(e){
    Ti.API.info("rotate");
    menu.width = "100%";
    mapWindow.width = "100%";
    notesWindow.width = "100%";
    infoWindow.width = "100%";
});

	var pola = Titanium.UI.createImageView({
        image: "../images/polaroid.png",
        width: 152,
        height: 152,
        top: 100,
		right: 30
    });
	
	var line = Titanium.UI.createImageView({
        image: "../images/line.png",
        width: "100%",
        height: 1,
        top: 80
    });
	
	var line2 = Titanium.UI.createImageView({
        image: "../images/line.png",
        width: "100%",
        height: 1,
        top: 419
    });
	
	var imageView = Titanium.UI.createImageView({
        image: "../images/prof2.jpg",
        width: 128,
        height: 128,
        top: 110,
		right: 42
    });
    var infoText = Ti.UI.createLabel({
        color: '#323639',
        font: {
            fontSize: 14,
            fontWeight: 'regular'
        },
        top: 50,
        left: 30,
        right:250,
		height: 350,
        text: "Materials science is an interdisciplinary field applying  the properties of matter to various areas of science and engineering. \n \nThis scientific field investigates the relationship between the structure of materials at atomic or molecular scales and their macroscopic properties. It incorporates elements of applied physics and chemistry. With significant media attention focused onnanoscience and nanotechnology in recent years, materials science has been propelled to the forefront at many universities. \n \nIt is also an important part of forensic engineering and failure analysis. Materials science also deals with fundamental properties and characteristics of materials."
    
    });
    var prof = Ti.UI.createLabel({
        color: '#323639',
        font: {
            fontSize: 14,
            fontWeight: 'light'
        },
        top: 270,
        right: 20,
        width: 155,
        height: 30,
        text: "professor"
    
    });
	  var nameText = Ti.UI.createLabel({
        color: '#323639',
        font: {
            fontSize: 20,
            fontWeight: 'bold'
        },
        top: 290,
        right: 20,
        width: 155,
        height: 30,
        text: "Gobbelijn"
    
    });
    var emailText = Ti.UI.createLabel({
        color: '#323639',
        font: {
            fontSize: 20,
            fontWeight: 'bold'
        },
        top: 0,
        left: 0,
        width: 100,
        height: 30,
        text: "prf254@caret.cam.ac.uk"
    
    });
	
	var mailbutton = Ti.UI.createButton({
		title: "Send Email",
		color: "#fefefe",
		width:150,
		height: 40,
	    top: 340,
	    right: 30,
		backgroundImage: '../images/mail_button.png',
		backgroundSelectedImage: '../images/mail_button_hover.png'
	});
	
	mailbutton.addEventListener('click', function(e){
        var emailDialog = Titanium.UI.createEmailDialog();
        emailDialog.toRecipients = [emailText.text];
		emailDialog.subject = CourseTitle.text;
        emailDialog.messageBody = 'Your Message';
        emailDialog.open();
    });
	
	 var whenText = Ti.UI.createLabel({
        color: '#323639',
        font: {
            fontSize: 20,
            fontWeight: 'bold'
        },
        top: 30,
        left: 30,
        width: 300,
        height: 30,
        text: "12:00 - 13:00"
    
    });
	
	infoWindow.add(whenText, mailbutton, line, line2, pola, prof, imageView, infoText, nameText);

Ti.App.addEventListener('changeCourse', function(data){
    CourseTitle.text = (data.course);
    ta1.value = "Note: ";
	
	whenText.text = data.startvalue + " - " + data.endvalue;
    
    if (CourseTitle.text == "Materials Science") {
    
        infoText.text = "Materials science is an interdisciplinary field applying  the properties of matter to various areas of science and engineering. \n \nThis scientific field investigates the relationship between the structure of materials at atomic or molecular scales and their macroscopic properties. It incorporates elements of applied physics and chemistry. With significant media attention focused onnanoscience and nanotechnology in recent years, materials science has been propelled to the forefront at many universities. \n \nIt is also an important part of forensic engineering and failure analysis. Materials science also deals with fundamental properties and characteristics of materials.";
        imageView.image = "../images/prof2.jpg";
        nameText.text = "Gobbelijn";
        emailText.text = "prf254@caret.cam.ac.uk";
    }
    
    if (CourseTitle.text == "Chemistry") {
        infoText.text = "Chemistry (the etymology of the word has been much disputed) is the science of matter and the changes it undergoes. \n \nThe science of matter is also addressed by physics, but while physics takes a more general and fundamental approach, chemistry is more specialized, being concerned with the composition, behavior (or reaction), structure, and properties of matter, as well as the changes it undergoes during chemical reactions. It is a physical science which studies various substances, atoms, molecules, crystals and other aggregates of matter whether in isolation or combination, and which incorporates the concepts of energy and entropy in relation to the spontaneity of chemical processes.";
        imageView.image = "../images/prof1.jpg";
        nameText.text = "Einshouser";
        emailText.text = "prf2568@caret.cam.ac.uk";
    }
    
    if (CourseTitle.text == "Maths") {
        infoText.text = "Mathematics is the study of quantity, structure, space, and change. Mathematicians seek out patterns,formulate new conjectures, and establish truth by rigorous deduction from appropriately chosen axioms and definitions. Through the use of abstraction and logical reasoning, mathematics evolved from counting, calculation, measurement, and the systematic study of the shapes and motions of physical objects. \n\nPractical mathematics has been a human activity for as far back as written records exist. Rigorous arguments first appeared in Greek mathematics, most notably in Euclid's Elements. Mathematics continued to develop, for example in China in 300 BC, in India in AD 100, and in the Muslim world.",
		imageView.image = "../images/prof3.jpg";
        nameText.text = "Burger King";
        emailText.text = "prf269@caret.cam.ac.uk";
    }
    
});

var dottedlines = Ti.UI.createImageView({
    top: 0,
    right: 230,
    height: 94,
    width: 2,
    image: "../images/dottedline.png"
});

menu.add(dottedlines);

notesWindow.add(lines);

win.add(infoWindow, mapWindow, notesWindow, menu);
