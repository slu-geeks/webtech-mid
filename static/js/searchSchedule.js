/**
 * Created by Arvince Neil on 05/04/2017.
 */
function getContent() {
    let file = document.getElementById('importFile');

    if (file.files.length) {
        let reader = new FileReader();

        reader.onload = function (e) {
            let allClasses = e.target.result;
            localStorage.setItem('schedJSON', allClasses);

            let jsonData = JSON.parse(allClasses);
            alert(jsonData);

        };

        reader.readAsBinaryString(file.files[0]);
    }
}
function searchSchedule(){

    let savedInfoLocalStorage = localStorage.getItem('schedJSON');

    if(!savedInfoLocalStorage){
        alert("you have to provide the json file first ~");
        return;
    }

    let textVariable = document.getElementById("searchInput").value;
    let scheduleJson = JSON.parse(savedInfoLocalStorage);

    let codeNomArray  = new Array();

    for(let index in scheduleJson.schedule){
        let eachSched = scheduleJson.schedule[index]
        let codeNo = eachSched.days;
        codeNomArray.push(codeNo);
    }


    let returnSchedule = searchStringInArray(textVariable, codeNomArray);

    console.log(returnSchedule);

}

