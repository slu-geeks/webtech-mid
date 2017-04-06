function addInstructor() {
    let instructors = localStorage.getItem("instructorList");

    let elements = document.getElementById("importInstructorId").elements;
    let jsonString = "";
    for (let i = 0; i < elements.length; i++) {
        let item = elements.item(i);
        let name = item.name;

        if (name != undefined && name != "add" && name != "submit") {
            jsonString = jsonString.concat('"' + item.name + '": "' + item.value + '"');
            jsonString = jsonString.concat(name != "cellphoneNo2" ? "," : "");
        }
    }

    let obj;
    if (instructors == undefined || instructors == null) {
        obj = JSON.parse('{"instructors": [{' + jsonString + '}]}');
    } else {
        obj = JSON.parse(instructors);
        var t = JSON.parse('{' + jsonString + '}');
        obj['instructors'].push(t);
    }

    let jsonStr = JSON.stringify(obj, null, 4);
    localStorage.setItem('instructorList', jsonStr);

    //different part for showing inside somewhere

    document.getElementById("dataInstructorID").setAttribute("href", "data:application/json," + JSON.stringify(obj));
    showLatestJson();

}
//CLASSSES MON
function viewRegIns() {
    let ins = JSON.parse(localStorage.getItem("instructorList"));
    if(!ins){
        alert("Create a Instructor First!");
    }
    let length = Object.keys(ins.instructors).length;
    let select = document.getElementById("RegIns");
    for (let i = 0; i < length; i++) {
        let option = document.createElement("option");
        option.text = ins.instructors[i].name;
        select.add(option,select[i]);
    }
}


        /*let op = document.createElement("option");
         op.setAttribute("value", ins.instructors[i].name);
         RegIns.appendChild(op);*/
        /*document.write(
         arr[i].push(ins.instructors[i].name);*/

//var count = Object.keys(ins).length;
    //document.write(count);
    /*let arr = [];
    for (let key in ins.instructors) {
        arr.push(key);
    }
    let str = arr.toString();
    document.write(arr);*/
    /* let arr = [];
    for (let i = 0; i < ins.length; i++) {
        arr[i].push(ins.instructors[i].name);
    }
    let str = arr.toString();
     /!*let arr = document.innerHTML(ins.instructors[i].name);
     let op = document.getElementsByName("RegIns").appendChild(document.createElement("option"));
     *!/
    document.write(str);*/


function addClasses() {
    let classes = localStorage.getItem("classesList");

    let elements = document.getElementById("importClasses").elements;
    let jsonString = "";
    for (let i = 0; i < elements.length; i++) {
        let item = elements.item(i);
        let name = item.name;

        if (name != undefined && name != "add" && name != "submit") {
            jsonString = jsonString.concat('"' + item.name + '": "' + item.value + '"');
            jsonString = jsonString.concat(name != "Day" ? "," : "");
        }
    }

    let obj;
    if (classes == undefined || classes == null) {
        obj = JSON.parse('{"classes": [{' + jsonString + '}]}');
    } else {
        obj = JSON.parse(classes);
        let t = JSON.parse('{' + jsonString + '}');
        obj['classes'].push(t);
    }
    showClassJson();
    let jsonStr = JSON.stringify(obj, null, 4);
    localStorage.setItem('classesList', jsonStr);

    //different part for showing inside somewhere

    document.getElementById("dataCLasses").setAttribute("href", "data:application/json," + JSON.stringify(obj));


}

function showClassJson() {
    let classes = localStorage.getItem("classesList");

    document.getElementById("printClassJson").innerHTML = '';

    if (classes == undefined || classes == null) {
        alert("You haven't yet entered any json content");
    } else {
        let stringClassesJson = JSON.stringify(JSON.parse(classes), null, 4); // Indented with tab
        let textElement = document.createTextNode(stringClassesJson);
        let preElement = document.createElement("pre");
        preElement.appendChild(textElement);
        document.getElementById("printClassJson").appendChild(preElement);
    }


}

function removeClassesLocalStorage() {
    let r = confirm("This will remove all Classes Created, Are you sure about this ?");
    if (r == true) {
        let classes = localStorage.getItem("classesList");
        let stringInstructorJson = JSON.stringify(JSON.parse(classes), null, 4); // Indented with tab
        let textElement = document.createTextNode(stringInstructorJson);
        let preElement = document.createElement("pre");
        preElement.appendChild(textElement);

        let pElement = document.createElement("p");
        let h1Element = document.createElement("h3");
        let textInfo = document.createTextNode("Here is the deleted json :");
        h1Element.appendChild(textInfo);
        pElement.appendChild(h1Element);
        document.getElementById("printClassJson").appendChild(pElement);

        let pElement2= document.createElement("p");
        pElement2.appendChild(preElement);
        document.getElementById("printClassJson").appendChild(pElement2);

        localStorage.removeItem("classesList");
    }
}
//CLASSSES MON

function removeLocalStorage() {
    let r = confirm("This will remove all of your instructors, Are you sure about this ?");
    if (r == true) {
        let instructors = localStorage.getItem("instructorList");
        var stringInstructorJson = JSON.stringify(JSON.parse(instructors), null, 4); // Indented with tab
        let textElement = document.createTextNode(stringInstructorJson);
        let preElement = document.createElement("pre");
        preElement.appendChild(textElement);

        let pElement = document.createElement("p");
        let h1Element = document.createElement("h3");
        let textInfo = document.createTextNode("Here is the deleted json :");
        h1Element.appendChild(textInfo);
        pElement.appendChild(h1Element);
        document.getElementById("printJson").appendChild(pElement);

        let pElement2= document.createElement("p")
        pElement2.appendChild(preElement);
        document.getElementById("printJson").appendChild(pElement2);

        localStorage.removeItem("instructorList");
    }
}

function showLatestJson() {
    let instructors = localStorage.getItem("instructorList");

    document.getElementById("printJson").innerHTML = '';

    if (instructors == undefined || instructors == null) {
        alert("You haven't yet entered any json content");
    } else {
        var stringInstructorJson = JSON.stringify(JSON.parse(instructors), null, 4); // Indented with tab
        let textElement = document.createTextNode(stringInstructorJson);
        let preElement = document.createElement("pre");
        preElement.appendChild(textElement);
        document.getElementById("printJson").appendChild(preElement);
    }


}