/**
 * Created by mehdi on 4/14/17.
 */

function showAllAttendance() {

    document.getElementById("checkAttendanceId").innerHTML = "";

    var dailyAttendanceFullList = createDailyAttendance();
    dailyAttendanceFullList = sortAttendanceList(dailyAttendanceFullList);
    var fullJson = createFullJson(dailyAttendanceFullList);

    if (document.getElementById("checkBoxId").checked) {
        let pElement = document.createElement("p");


        let pElement2 = document.createElement("div")
        pElement2.appendChild(pElement);
        document.getElementById("checkAttendanceId").appendChild(pElement2);
    } else {
        let preElement = document.createElement("pre");
        preElement.appendChild(document.createTextNode(JSON.stringify(fullJson, null, 4)));

        let pElement2 = document.createElement("p")
        pElement2.appendChild(preElement);
        document.getElementById("checkAttendanceId").appendChild(pElement2);
    }
}

function createDailyAttendance() {
    let newDate = new Date();
    let year = newDate.getYear();
    let month = newDate.getMonth();
    let day = newDate.getDay();

    let dailyScheduleName = year + "-" + month + "-" + day;


    let dayAttendanceJsonStr = localStorage.getItem(dailyScheduleName);

    if (dayAttendanceJsonStr != null && dayAttendanceJsonStr != undefined) {
        return JSON.parse(dayAttendanceJsonStr);
    }

    //create daily attendance on the fly since it's not yet existing
    let allSchedulesStr = localStorage.getItem("allSchedulesJson");
    let allSchedulesObject = JSON.parse(allSchedulesStr);


    let dayAttendanceJsonObject = JSON.parse('{"attendances": []}');

    for (let index in allSchedulesObject.schedules) {
        let eachSchedule = allSchedulesObject.schedules[index];
        let scheduleDay = getDayNumber(eachSchedule.schedule_day);

        if (scheduleDay == day) {
            let jsonString = "";
            jsonString = jsonString.concat('{"schedule_date": "' + newDate + '",');
            jsonString = jsonString.concat('"schedule_state": "NOT_CHECKED",');
            jsonString = jsonString.concat('"FK_schedule_id": "' + eachSchedule.PK_schedule_code + '"}');
            dayAttendanceJsonObject['attendances'].push(JSON.parse(jsonString));
        }
    }

    let dailyAttendanceStrList = JSON.stringify(dayAttendanceJsonObject, null, 4);
    localStorage.setItem(dailyAttendanceStrList, dayAttendanceJsonObject);

    /*

     json from and to object
     var dateStr = JSON.parse(json);
     console.log(dateStr); // 2014-01-01T23:28:56.782Z

     var date = new Date(dateStr);
     console.log(date);  // Wed Jan 01 2014 13:28:56 GMT-1000 (Hawaiian Standard Time)
     */

    return dayAttendanceJsonObject;


    function getDayNumber(day) {
        let dayLowerCase = day.toLowerCase();
        let dayNumber = -1;
        switch (dayLowerCase) {
            case "sunday":
                dayNumber = 0;
                break;
            case "monday":
                dayNumber = 1;
                break;
            case "tuesday":
                dayNumber = 2;
                break;
            case "wednesday":
                dayNumber = 3;
                break;
            case "thursday":
                dayNumber = 4;
                break;
            case "friday":
                dayNumber = 5;
                break;
            case "saturday":
                dayNumber = 6;
                break;
            default:
                alert("Error: " + dayLowerCase + " is not a correct day in your schedule json file");
        }
        return dayNumber;
    }
}

function sortAttendanceList(attendanceList) {
    //implement later
    return attendanceList;
}

function createFullJson(attendanceJsonObjectList) {
    let attendanceFullList = JSON.parse('{"attendances" : []}');

    for (let index in attendanceJsonObjectList.attendances) {
        let  eachAttendance = attendanceJsonObjectList.attendances[index];
        let scheduleCode = eachAttendance.FK_schedule_id;
        let eachFullAttendanceObject = findSchedulesTree(eachAttendance, scheduleCode);
        attendanceFullList['attendances'].push(eachFullAttendanceObject);
    }


    alert(JSON.stringify(attendanceFullList, null, 4));
    return attendanceFullList;

    function findSchedulesTree(eachAttendanceData, scheduleCode) {
        let scheduleObj = JSON.parse('{"schedule": {"instructor": {}, "class" : {}}}');
        let strAllSchedules = localStorage.getItem('allSchedulesJson');
        let objectAllSchedules = JSON.parse(strAllSchedules);
        for (let index in objectAllSchedules.schedules) {
            let eachSchedule = objectAllSchedules.schedules[index];
            let pkScheduleCode = eachSchedule.PK_schedule_code;
            if (scheduleCode == pkScheduleCode) {
                let instructorId = eachSchedule.FK_instructor_id;
                let classId = eachSchedule.FK_class_id;

                let instructorJsonObject = findInstructor(instructorId);
                let classJsonObject = findClass(classId);

                //constructing full.json
                scheduleObj['schedule'] = eachSchedule;
                scheduleObj['schedule']['instructor'] = instructorJsonObject;
                scheduleObj['schedule']['class'] = classJsonObject;

                let eachAttendance = JSON.parse('{"schedule" : {}}');
                eachAttendance = eachAttendanceData;
                eachAttendance['schedule'] = scheduleObj;

                return eachAttendance;
            }
        }
    }

    function findInstructor(instructorId) {
        let allInstructors = localStorage.getItem('allInstructorsJson');
        let objectAllInstructors = JSON.parse(allInstructors);
        for (let index in objectAllInstructors.instructors) {
            let eachInstructor = objectAllInstructors.instructors[index];
            let insId = eachInstructor.PK_instructor_idNo;

            if (insId == instructorId) {
                return eachInstructor;
            }
        }

        alert("An instructor with id: [" + instructorId + "] is not inside your json file");

    }

    function findClass(classId) {
        let allClasses = localStorage.getItem('allClassesJson');
        let objectAllClasses = JSON.parse(allClasses);
        for (let index in objectAllClasses.classes) {
            let eachClass = objectAllClasses.classes[index];
            let clazzId = eachClass.PK_class_id;
            if (classId == clazzId) {
                return eachClass;
            }
        }
        alert("A class with id: [" + classId + "] is not inside your json file");
    }
}