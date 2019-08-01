//////////////// JS Handler for index.html



/////////////////////////// GLOBALS //////////////////////////

//FromDate Globals
var globalFromDay, globalFromMonth, globalFromYear;

//ToDate Globals
var globalToDay, globalToMonth, globalToYear;

//DayMode Globals
var globalDayMode;

//Test Type Global 
var globalTestType;

//Global Total Number of Days
var totaldays;

//Global Flags
var testCheckFlag = false;
var multipleDaysFlag = false;

//Error Flags 
var validRequestFlag = false;
var validDatesFlag = false;
var validWorkingDaysFlag = true;
var validReasonCategoryFlag = false;
var validReasonSpecificFlag = false;
var validArrearCountFlag = false;
var validAttendanceFlag = false;
var validLeaveHistoryFlag = false;
var validTestTypeFlag = true;
var validDayModeFlag = false;

// Document Ready

$(document).ready(function(){



///////////////////////////////// Initial Validations /////////////////////

    //Initial Validation Leave Form


    //Request Type 
    if(!$("input[name='request-type']:checked").val()){
        $(".request-type-display").html("Please Choose A Request Type");
        $(".request-type-display").css("background-color","#FF9393");
    }

    //Day Mode
    if($("#day-mode").val() == "Choose Day Mode"){
        $(".day-mode-display").html("Please Choose A Day Mode");
        $(".day-mode-display").css("background-color","#FF9393");

        $("#fromdate-box").hide();//Hide FromDate
        $("#todate-box").hide();//Hide ToDate
        $("#days-box").hide();//Hide Days
    }

    //From Date
    if(!$("#fromdate").val()){
        $(".display-fromdate").html("Please Choose A Date");
        $(".display-fromdate").css("background-color","#FF9393");
      
    }

    // To Date
    if(!$("#todate").val()){
        $(".display-todate").html("Please Choose A Date");
        $(".display-todate").css("background-color","#FF9393");

    }

    // Number of Working Days
    if(!$("#days").val()){
        $(".display-days").html("Please Enter Number Of Working Days");
        $(".display-days").css("background-color","#FF9393");
    }

    //Reason Category
    if($("#reason-category").val() == "Choose Reason Category ..."){
        $(".display-reason-category").html("Please Enter Reason Category");
        $(".display-reason-category").css("background-color","#FF9393");
    }

    //Arrear Count
    if(!$("#arrearcount").val()){
        $(".display-arrearcount").html("Please Enter Number of Arrears");
        $(".display-arrearcount").css("background-color","#FF9393");
    }

    //Attendance
    if(!$("#attendance").val()){
        $(".display-attendance").html("Please Enter Your current Attendance Percentage");
        $(".display-attendance").css("background-color","#FF9393");
    }

    //Leave History
    if(!$("#leave-history").val()){
        $(".display-leave-history").html("Please Enter Number of Days leave taken earlier");
        $(".display-leave-history").css("background-color","#FF9393");
    }

    //Reason Specific
    if(!$("#reasonspecific").val()){
        $(".display-reasonspecific").html("Please Specify your Reason");
        $(".display-reasonspecific").css("background-color","#FF9393");
    }

    //Test Type
    if($("#test-type").val() == "Choose Test Type ..."){
        $(".display-test-type").html("Please Specify the Exam");
        $(".display-test-type").css("background-color","#FF9393");
    }

//  Session Handling ////////////////////

if (!localStorage.getItem("registernumber")) {
    window.location.href = 'login.html';
    return false;

} 
else {
   
    //////////////////////////////////// Loading Student Profile ///////////////////////////


    //Add values to Profile Modal 
    $("#profile-register-number").html(localStorage.getItem("registernumber"));
    $("#profile-student-name").html(localStorage.getItem("studentname"));
    $("#profile-dob").html(localStorage.getItem("dob"));
    $("#profile-department").html(localStorage.getItem("department"));
    $("#profile-classandsec").html(localStorage.getItem("classandsec"));
    $("#profile-arrearcount").html(localStorage.getItem("arrearcount"));
    $("#profile-email").html(localStorage.getItem("email"));
    $("#profile-phone").html(localStorage.getItem("phone"));
    $("#profile-leave-history").html(localStorage.getItem("leavehistory"));

}

//////////////////// Functions //////////////////////

//function to reverse a date
function rev(str){
    return str.split("-").reverse().join("-");
}

//function to find the day from the date
function dayofweek(d, m, y) 
{ 
    var t = Array(0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4 ); 
    y = y - (m < 3); 
    var dayNumber = Math.round(( y + y/4 - y/100 + y/400 + t[m-1] + d) % 7); 
    var days = Array("Sunday", "Monday" ,"Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    return days[dayNumber-1];
} 


//function to check the validity of entered date value

function checkDateValidity (date1){
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    if(currentYear - date1 != 0 ){
            return 0;// return false if date Not Valid
       }    
    else{
        return 1;//return true if date Valid
    }
}

/////////////////////////// Event Handlers ////////////////////


//Request Type Handler
$("input[name='request-type']").change(function(){
    var requestType = $("input[name='request-type']:checked").val();
    if(requestType){
        //show request type
        $(".request-type-display").html("Your current Request Type is "+ requestType);
        $(".request-type-display").css("background-color","rgba(0, 0, 255, 0.212)");

        //Switch Error Flag to clear
        validRequestFlag = true; 

    }
    //hide request-type-display 
    else{
        $(".request-type-display").html("Please Choose A Request Type");
        $(".request-type-display").css("background-color","#FF9393");

        //Switch Error Flag to Block
        validRequestFlag = false;
    }

});

//Day Mode Handler 
$("#day-mode").change(function(){

    globalDayMode = $("#day-mode").val();

    //When Day Mode is Not Selected
    if(globalDayMode == "Choose Day Mode"){

        $("#fromdate-box").hide();//Hide fromDate
        $("#todate-box").hide();//Hide toDate
        $("#days-box").hide();//Hide Number of Days

        //Display Error Message
        $(".day-mode-display").html("Please Choose A Day Mode");
        $(".day-mode-display").css("background-color","#FF9393");

        //Set the validDayModeFlag to Block
        validDayModeFlag = false;
    }

    else{

        $("#fromdate-box").show();//Show FromDate

        //Set the validDayModeFlag to Clear
        validDayModeFlag = true;

        //Display the current Day Mode
        $(".day-mode-display").html("Your Selected Day Mode is "+ globalDayMode);
        $(".day-mode-display").css("background-color","rgba(0, 0, 255, 0.212)");

        //When Day Mode is Selected
        if(!(globalDayMode == "More Than a Day")){//When Day Mode is Half Day or Whole Day

            $("#todate-box").hide();//Hide ToDate Box
            $("#days-box").hide();//Hide Days Box
        }

        else{//When Day Mode is More Than A Day

            multipleDaysFlag = true;//Set the multipleDaysFlag to Clear
            $("#todate-box").show();//Hide ToDate Box
            $("#days-box").show();//Hide Days Box
        }
    }



});

//From Date Handler
$("#fromdate").change(function(){
    var fromdate = $("#fromdate").val();//retrieved value is string but in reverse 
    //pass dates to reverse
    fromdate = rev(fromdate);
    var dateElements = fromdate.split("-",3);
    //get dd , mm , yyyy separately
    globalFromDay = parseInt(dateElements[0]);
    globalFromMonth = parseInt(dateElements[1]);
    globalFromYear = parseInt(dateElements[2]);
    //pass to function to check which day it is
    var displayFromDate = dayofweek(globalFromDay, globalFromMonth, globalFromYear);
 
    if(fromdate && //If a Date is selected
       checkDateValidity(globalFromYear)){//If the date Year is Valid
        $(".display-fromdate").html("The Selected Day is "+ displayFromDate);
        $(".display-fromdate").css("background-color","rgba(0, 0, 255, 0.212)");
    
        if(!multipleDaysFlag)
        //Switch Global Flag to set Clear
        validDatesFlag = true;
    }

    if(!fromdate){//If No date is Selected
        $(".display-fromdate").html("Please Choose A Date");
        $(".display-fromdate").css("background-color","#FF9393");

        //Switch Global Flag to set Block
        validDatesFlag = false;
    }

    //check the validity of the entered Date
    if(!checkDateValidity(globalFromYear) && 
       fromdate ){
        //if dates are Invalid
        $(".display-fromdate").html("Invalid Dates Please Check the Dates Again !");
        $(".display-fromdate").css("background-color","#FF9393");
        
        //Set the Global Flag to Block
        validDatesFlag = false;
    }
    
    if(checkDateValidity(globalFromYear) && 
       checkDateValidity(globalToYear) && 
       $("#fromdate").val() &&
       $("#todate").val()){// If the dates are VALID
            totaldays = (globalToDay - globalFromDay) + ((globalToMonth - globalFromMonth) * 30 ) + 1;
            if(totaldays < 2 ){// If ToDate is earlier than FromDate Raise Error
                $(".display-totaldays").html("<br><br>Invalid Dates Please Check the Dates Again !");
                $(".display-totaldays").css("background-color","#FF9393"); 

                //Set the Global Flag to Block
                validDatesFlag = false;
   
                }
                else{// If Dates are Valid
                   $(".display-totaldays").html("<br><br>Total Number of Days are "+ "<strong>"+totaldays +"</strong> (Approx)");
                   $(".display-totaldays").css("background-color","rgba(0, 0, 255, 0.212)"); 

                   //Set the Global Flag to Clear
                   validDatesFlag = true;
                }
        }

    });

//To Date Handler 
$("#todate").change(function(){
    var todate = $("#todate").val();
    //pass dates to reverse
    todate = rev(todate);
    var dateElements = todate.split("-",3);    
    globalToDay = parseInt(dateElements[0]);
    globalToMonth = parseInt(dateElements[1]);
    globalToYear = parseInt(dateElements[2])
    var displayToDate = dayofweek(globalToDay, globalToMonth, globalToYear);
   
    if(todate &&
        checkDateValidity(globalToYear)){//If a Date is selected
        $(".display-todate").html("The Selected Day is "+ displayToDate);
        $(".display-todate").css("background-color","rgba(0, 0, 255, 0.212)");  
        
        if(globalFromYear &&
           multipleDaysFlag)
        //Set the Global Flag to Clear
        validDatesFlag = true;

        else
        validDatesFlag = false;//Set the Global Flag to Block
     }
     if(!todate){//If No date is Selected
        $(".display-todate").html("Please Choose A Date");
        $(".display-todate").css("background-color","#FF9393");

        if(multipleDaysFlag){//If multipleDaysFlag is SET
        //Set the Global Flag to Block 
        validDatesFlag = false;
        }
        
     }
 
     //check the validity of the entered Date
     if(!checkDateValidity(globalToYear) && 
        todate){
        //if dates are Invalid
        $(".display-todate").html("<br><br>Invalid Date please Check the Date !");
        $(".display-todate").css("background-color","#FF9393"); 

        //Set the Global Flag to Block
        validDatesFlag = false;
     }
     
     if(checkDateValidity(globalFromYear) && 
        checkDateValidity(globalToYear) && 
        $("#fromdate").val() &&
        $("#todate").val()){// If the dates are VALID and oneDAY not Checked
             totaldays = (globalToDay - globalFromDay) + ((globalToMonth - globalFromMonth) * 30 ) + 1;
             if(totaldays < 2 ){// If ToDate is earlier than FromDate Raise Error
                $(".display-totaldays").html("<br><br>Invalid Dates Please Check the Dates Again !");
                $(".display-totaldays").css("background-color","#FF9393"); 

                //Set the Global Flag to Block
                validDatesFlag = false;
   
                }
                else{// If Dates are Valid
                   $(".display-totaldays").html("<br><br>Total Number of Days are "+ "<strong>"+totaldays +"</strong> (Approx)");
                   $(".display-totaldays").css("background-color","rgba(0, 0, 255, 0.212)"); 

                   //Set the Global Flag to Clear 
                   validDatesFlag = true;
                }
         }
 
});

//Days Event Handler
$("#days").on('input',function(){

    var days = $("#days").val();
    if (days == ""){
        $(".display-days").html("Please Enter Number of Working Days");
        $(".display-days").css("background-color","#FF9393"); 

        if(multipleDaysFlag){//If multipleDaysFlag is SET
            validWorkingDaysFlag = false;//Set the Global Error Flag to Block
        }
        
    }
    else{
        $(".display-days").html("You are applying for " + days + " Working Days");
        $(".display-days").css("background-color","rgba(0, 0, 255, 0.212)");
        
        validWorkingDaysFlag = true;//Set the Global Error Flag to Clear
    }
});

//Test Check Handler
$("#test-check").change(function(){
    if(!this.checked){
        $("#test-type-box").hide();//Hide Test Type

        //Set the global Flag to Block
        testCheckFlag = false;

        //If Test Check is SET & Test Type is Valid
        if(testCheckFlag &&
           globalTestType){
               //Set the Global Flag to Clear
               validTestTypeFlag = true;
           }

           else
           validTestTypeFlag = false;// Set the global Flag to Block
    }
    if(this.checked){
        $("#test-type-box").show();//Show Test Type

        //Set the global flag to Clear
        testCheckFlag = true;

        //If there is Scheduled Test & Test type is Selected
        if(testCheckFlag &&
           globalTestType){
               //Set the global Flag to Clear
               validTestTypeFlag = true;
        }
        else
        validTestTypeFlag = false;//Set the global Flag to Block
           
    }

});

//Reason Category Handler
$("#reason-category").change(function(){
    if($("#reason-category").val() != "Choose Reason Category ..."){
        $("#reason-specific-box").show();
        var reasonCategory = $("#reason-category").val();
        $(".display-reason-category").html("Your selected Reason Category is " + reasonCategory);
        $(".display-reason-category").css("background-color","rgba(0, 0, 255, 0.212)"); 

        //Set the Global Error flag to Clear
        validReasonCategoryFlag = true;
    }
    else {
        $("#reason-specific-box").hide();
        $(".display-reason-category").html("Please Enter Reason Category");
        $(".display-reason-category").css("background-color","#FF9393"); 
        //Set the Global Error flag to Block
        validReasonCategoryFlag = false;
    }
});

//Arrear Count Handler
$("#arrearcount").on('input', function(){

    var arrearcount = $("#arrearcount").val();
    if(arrearcount == ""){
        $(".display-arrearcount").html("Please Enter Number of Arrears");
        $(".display-arrearcount").css("background-color","#FF9393");
        //Set the Global Error flag to Block
        validArrearCountFlag = false; 
    }
    else{
        $(".display-arrearcount").html("Your current Arrears are " + arrearcount);
        $(".display-arrearcount").css("background-color","rgba(0, 0, 255, 0.212)"); 
        //Set the Global Error flag to Clear
        validArrearCountFlag = true;
    }
});

//Attendance Handler
$("#attendance").on('input', function(){

    var attendance = $("#attendance").val();
    var attendanceLevel = "";

    //Level Normal
    if (attendance >= 75 &&
        attendance <= 90){
        attendanceLevel = "Normal";
    }
    
    //Level High
    if(attendance > 90){
        attendanceLevel = "High";
    }

    //Level Low
    if(attendance <75 &&
        attendance >= 50){
            attendanceLevel = "Low";
    }

    //Level Critical
    if (attendance < 50){
        attendanceLevel = "CRITICAL";
    }

    //Attendance Validation
    if(attendance == ""){
        $(".display-attendance").html("Please Enter Your Attendance Percentage");
        $(".display-attendance").css("background-color","#FF9393"); 
        //Set the Global Error flag to Block
        validAttendanceFlag = false;
    }
    else{
        $(".display-attendance").html("Your Attendance Percentage is " + attendanceLevel);
        $(".display-attendance").css("background-color","rgba(0, 0, 255, 0.212)"); 
        //Set the Global Error flag to Clear
        validAttendanceFlag = true;
    }
});

//Leave History Handler
$("#leave-history").on('input', function(){
    var leaveHistory = $("#leave-history").val();

    if(leaveHistory == ""){
        $(".display-leave-history").html("Please enter Number of Days leave taken earlier");
        $(".display-leave-history").css("background-color","#FF9393"); 
        //Set the Global Error flag to Block
        validLeaveHistoryFlag = false;
    }
    else{
        $(".display-leave-history").html("Your leave history is " + leaveHistory + " days");
        $(".display-leave-history").css("background-color","rgba(0, 0, 255, 0.212)"); 
        //Set the Global Error flag to Clear
        validLeaveHistoryFlag = true;
    }

});

//Reason Specific Handler
$("#reasonspecific").on('input', function(){

    if($.trim($("#reasonspecific").val()).length  < 1){//If the text field is EMPTY
        $(".display-reasonspecific").html("Please Specify your Reason");
        $(".display-reasonspecific").css("background-color","#FF9393"); 
        //Set the Global Error flag to Block
        validReasonSpecificFlag = false;
    }
    else{
        $(".display-reasonspecific").html("");
        $(".display-reasonspecific").css("background-color","rgba(0, 0, 255, 0.212)"); 
        //Set the Global Error flag to Clear
        validReasonSpecificFlag = true;
    }

});

//Test Type Handler
$("#test-type").change(function(){

    var testType = $("#test-type").val();
    globalTestType = testType;
    if(testType != "Choose Test Type ..."){
        $(".display-test-type").html("Your Selected Test Type is " + testType);
        $(".display-test-type").css("background-color","rgba(0, 0, 255, 0.212)"); 
        if(testCheckFlag)//If Test Check is TICKED
        validTestTypeFlag = true;//Set the Global Error flag to Clear
    }
    else{
        $(".display-test-type").html("Please Specify the Exam");
        $(".display-test-type").css("background-color","#FF9393"); 

        if(!testCheckFlag)//If Test Check is NOT TICKED
        validTestTypeFlag = false;//Set the Global Error flag to Block
    }

});

//////////////////////////////////// FORM SUBMISSION HANDLER //////////////////////////////////

$("#leave-form-btn").click(function(){

    debugger;
    if(validDatesFlag &&
       validRequestFlag &&
       validDayModeFlag &&
       validWorkingDaysFlag &&
       validReasonCategoryFlag &&
       validReasonSpecificFlag &&
       validTestTypeFlag &&
       validArrearCountFlag &&
       validAttendanceFlag &&
       validLeaveHistoryFlag){
           alert("All Clear");
    }
    else{
        alert("An Error Occured!");

        return false;
        
    }
});

});