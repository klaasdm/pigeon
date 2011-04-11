/**
 * @author kd322
 */
function Series(id, title, s_part,  locationNotes, termDates_id, s_notes,s_createdBy, s_facdept, s_location,s_year,s_term, additionalinformation,lecturesperweek, start, end,allday,classname){


var id, title, s_part,  locationNotes, termDates_id, s_notes,s_createdBy, s_facdept, s_location,s_year,s_term, additionalinformation,lecturesperweek, start, end,allday,classname;
	
	this.getId = function(){
		return id;
	};
	
	this.getTitle = function(){
		return title;
	};
	this.getPart = function(){
		return s_part;
	};
	this.getTermDates_id = function(){
		return termDates_id;
	};
	this.getLocationNotes = function(){
		return locationNotes;
	};
	this.getNotes = function(){
		return s_notes;
	};
	this.getCreatedBy = function(){
		return s_createdBy;
	};
	this.getFacdept = function(){
		return s_facdept;
	};
	this.getLocation = function(){
		return s_location;
	};
	this.getYear = function(){
		return s_year;
	};
	this.getTerm = function(){
		return s_term;
	};
	this.getAdditionalinformation = function(){
		return s_term;
	};
	this.getLecturesperweerk = function(){
		return lecturesperweek;
	};
	this.getStart = function(){
		return start;
	};
	this.getEnd = function(){
		return end;
	};
	this.getAllday = function(){
		return allday;
	};
	this.getClassname = function(){
		
		return classname;
	};
}
