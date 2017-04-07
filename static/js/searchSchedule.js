/**
 * Created by Arvince Neil on 05/04/2017.
 */
function getContent() {
    let file = document.getElementById('importFile');

    if (file.files.length) {
        let reader = new FileReader();

        reader.onload = function (e) {
            let allClasses = e.target.result;
            localStorage.setItem('ourJsonObject', allClasses);

            let jsonData = JSON.parse(allClasses);
            alert(jsonData);
            let nodeP = document.createElement("P");

            for (let index in jsonData.classes) {
                let eachClass = jsonData.classes[index];

                let classUL = document.createElement("UL");
                classUL.setAttribute("class", "schoolClassUL");

                liAppender(eachClass.roomNo, classUL);
                liAppender(eachClass.codeNo, classUL);
                liAppender(eachClass.instructor, classUL);
                liAppender(eachClass.subject, classUL);
                liAppender(eachClass.locX, classUL);
                liAppender(eachClass.locY, classUL);
                liAppender(eachClass.classTime, classUL);
                liAppender(eachClass.day, classUL);

                checkBoxAppender(index, classUL);

                nodeP.appendChild(classUL);
                document.getElementById("currentClassesID").appendChild(nodeP);
            }

            updateChangesAppender("save changes", "saveTheChanges()", nodeP);

        };

        reader.readAsBinaryString(file.files[0]);
    }
}
// function searchSchedule(){
//
//     let savedInfoLocalStorage = localStorage.getItem('scheduleJSON');
//
//     // if(!savedInfoLocalStorage){
//     //     alert("you have to provide the json file first ~");
//     //     return;
//     // }
//
//     let textVariable = document.getElementById("searchInput").value;
//     let classesJson = JSON.parse(savedInfoLocalStorage);
//
//     let codeNomArray  = new Array();
//
//     for(let index in classesJson.instructors){
//         let eachClass = classesJson.instructors[index]
//         let codeNo = eachClass.schedule;
//         codeNomArray.push(schedule);
//     }
//
//
//     let returnSchedule = searchStringInArray(textVariable, codeNomArray);
//
//     console.log(returnSchedule);
//
// }

