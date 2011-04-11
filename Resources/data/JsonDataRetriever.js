/**
 * @author kd322
 */
Titanium.include("data/DataAccess.js");
Titanium.include("model/series.js");
Titanium.include("model/s_days.js");
Titanium.include("model/s_events.js");
Titanium.include("model/pdf.js");

var da = new DALists();
da.initDatabase();

var seriesData = [];
var PdfData = [
{ s_id:'101', name:"Maths1.pdf"},
{ s_id:'101', name:"Maths2.pdf"},
{ s_id:'101', name:"Maths3.pdf" },
{ s_id:'102', name:"Chemistry1.pdf"},
{ s_id:'102', name:"Chemistry2.pdf" },
{ s_id:'103', name:"Physics1.pdf" },
{ s_id:'103', name:"Physics2.pdf" },
{ s_id:'103', name:"Physics3.pdf" },
{ s_id:'103', name:"Physics4.pdf" },
{ s_id:'104', name:"Science1.pdf" },
{ s_id:'104', name:"Science2.pdf" },
{ s_id:'104', name:"Science3.pdf" },
{ s_id:'105', name:"Scomputer1.pdf" },
{ s_id:'105', name:"Scomputer2.pdf" },
{ s_id:'105', name:"Scomputer3.pdf" },
{ s_id:'105', name:"Scomputer4.pdf" },
{ s_id:'105', name:"Scomputer5.pdf" },
{ s_id:'105', name:"Scomputer6.pdf" }
];
var daysInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saterday', 'Sunday'];

function loadSeriesTable(){
    // Empty array "rowData" for our tableview
    // Create our HTTP Client and name it "loader"
    var loader = Titanium.Network.createHTTPClient();
    // Sets the HTTP request method, and the URL to get data from
    loader.open("GET", "https://mercury.caret.cam.ac.uk/students/dataCRUDL.php?oper=read&s_facdept=NST&part=part1a&s_year=2010%20-%202011&s_term=Michaelmas");
    // Runs the function when the data is ready for us to process
    loader.onload = function(){
        seriesData = eval('(' + this.responseText + ')');
        for (var i = 0; i < seriesData.length; i++) {
        
            var series = new Series();
            
            series.id = seriesData[i].id;
            series.title = seriesData[i].title;
            series.s_part = seriesData[i].s_part;
            series.locationNotes = seriesData[i].locationNotes;
            series.termDates_id = seriesData[i].termDates_id;
            series.s_notes = seriesData[i].s_notes;
            series.s_createdBy = seriesData[i].s_createdBy;
            series.s_facdept = seriesData[i].s_facdept;
            series.s_location = seriesData[i].s_location;
            series.s_year = seriesData[i].s_year;
            series.s_term = seriesData[i].s_term;
            series.additionalinformation = seriesData[i].additionalinformation;
            
            da.insertSeriesList(series.id, series.title, series.s_part, series.locationNotes, series.termDates_id, series.s_notes, series.s_createdBy, series.s_facdept, series.s_location, series.s_year, series.s_term, series.additionalinformation);
            
            
            var s_events = new S_events();
            s_events.s_id = seriesData[i].s_events[0].s_id;
            s_events.e_title = seriesData[i].s_events[0].e_title;
            s_events.e_organiser = seriesData[i].s_events[0].e_organiser;
            s_events.e_aggregatedTimes = seriesData[i].s_events[0].e_aggregatedTimes;
            s_events.e_note = seriesData[i].s_events[0].e_note;
            
            da.insertEventList(s_events.s_id, s_events.e_title, s_events.e_organiser, s_events.e_aggregatedTimes, s_events.e_note);
            
            // begin series
            var event_days = seriesData[i].s_days;
            
            for (var j = 0; j < daysInWeek.length; j++) {
            
                var day = event_days[daysInWeek[j]];
                
                if (day) {
                    var sdays = new S_days();
                    
                    sdays.s_id = seriesData[i].id;
                    sdays.day = daysInWeek[j];
                    sdays.start = day[0].start;
                    sdays.end = day[0].end;
                    sdays.lesson = seriesData[i].title;
                    da.insertDayList(sdays.s_id, sdays.day, sdays.start, sdays.end, sdays.lesson);
                }
            }
            
        };
        
            };
    // Send the HTTP request
    loader.send();
	
	  for (var i = 0; i < PdfData.length; i++) {
	  
	  	var pdf = new Pdf();
	  	
	  	pdf.s_id = PdfData[i].s_id;
	  	pdf.name = PdfData[i].name;
	  	pdf.bool = 'false';
	  	da.insertPdfList(pdf.s_id, pdf.name,pdf.bool);
	  	
	  };
    
}

loadSeriesTable();
