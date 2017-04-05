/**
 * Created by Arvince Neil on 05/04/2017.
 */
function getContent(){
    let file = document.getElementById('importFile');

    if (file.files.length) {
        let reader = new FileReader();

        reader.onload = function (e) {
            let allSchedule = e.target.result;
            localStorage.setItem('InstructorJSON', allSchedule);

            let jsonData = JSON.parse(allSchedule);
        }
    }
}

function searchSchedule(){

    let savedInfoLocalStorage = localStorage.getItem('InstructorJSON');

    // if(!savedInfoLocalStorage){
    //     alert("you have to provide the json file first ~");
    //     return;
    // }

    let textVariable = document.getElementById("searchInput").value;
    let classesJson = JSON.parse(savedInfoLocalStorage);

    let codeNomArray  = new Array();

    for(let index in classesJson.instructors){
        let eachClass = classesJson.instructors[index]
        let codeNo = eachClass.schedule;
        codeNomArray.push(schedule);
    }


    let returnSchedule = searchStringInArray(textVariable, codeNomArray);

    console.log(returnSchedule);

}

