/**
 * Created by mehdi on 3/21/17.
 */


function parseFile() {


    var file = document.getElementById('importFile');

    if (file.files.length) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var jsonRow = e.target.result;
            var jsonData = JSON.parse(jsonRow);
            var nodeP = document.createElement("P");

            for (var i = 0; i < jsonData.classes.length; i++) {
                var jiji = jsonData.classes[i];

                var unOrderedList = document.createElement("UL");
                unOrderedList.setAttribute("class", "jsonElement");

                var roomNoLi = document.createElement("LI");
                var roomNoText = document.createTextNode(jiji.roomNo + "");
                roomNoLi.appendChild(roomNoText);

                var codeLi = document.createElement("LI");
                codeLi.appendChild(document.createTextNode(jiji.codeNo));

                var instructorLi = document.createElement("LI");
                instructorLi.appendChild(document.createTextNode(jiji.instructor + ""));


                var subjectLi = document.createElement("LI");
                subjectLi.appendChild(document.createTextNode(jiji.subject + ""));


                var locationXLi = document.createElement("LI");
                locationXLi.appendChild(document.createTextNode(jiji.locX));

                var locationYLi = document.createElement("LI");
                locationYLi.appendChild(document.createTextNode(jiji.locY));

                var timeLi = document.createElement("LI");
                timeLi.appendChild(document.createTextNode(jiji.classTime + ""));

                var dayLi = document.createElement("LI");
                dayLi.appendChild(document.createTextNode(jiji.day + ""));


                unOrderedList.appendChild(roomNoLi);
                unOrderedList.appendChild(codeLi);
                unOrderedList.appendChild(instructorLi);
                unOrderedList.appendChild(subjectLi);
                unOrderedList.appendChild(locationXLi);
                unOrderedList.appendChild(locationYLi);
                unOrderedList.appendChild(timeLi);
                unOrderedList.appendChild(dayLi);


                var chkbox1 = document.createElement("input");
                chkbox1.setAttribute("id", "chkBox1-" + i);
                chkbox1.setAttribute("type", "checkbox");

                var chkbox2 = document.createElement("input");
                chkbox2.setAttribute("id", "chkBox2-" + i);
                chkbox2.setAttribute("type", "checkbox");


                unOrderedList.appendChild(chkbox1);
                unOrderedList.appendChild(chkbox2);


                nodeP.appendChild(unOrderedList);
                document.getElementById("XXX").appendChild(nodeP);
            }

            var submitButton = document.createElement("input");
            submitButton.setAttribute("type", "button");
            submitButton.setAttribute("onclick", "saveTheChanges()");
            submitButton.setAttribute("value", "save changes");

            document.getElementById("hiddenJson").innerText = jsonRow;
            nodeP.appendChild(submitButton);
        };

        reader.readAsBinaryString(file.files[0]);
    }
}

function saveTheChanges() {
    var jsonFile = document.getElementById("hiddenJson").innerText;
    localStorage.setItem('ourJsonObject', jsonFile);

    var sss = localStorage.getItem('ourJsonObject');

    var uls = document.getElementsByClassName("jsonElement");

    for (var i = 0; i < uls.length; i++) {
        var chkBox1 = document.getElementById("chkBox1-" + i);
        var chkBox2 = document.getElementById("chkBox2-" + i);


        if (chkBox1.checked) {
            alert("checkbox1 in" + (i + 1) + "row is checked");
        } else {
            // alert("checkbox1 in" + i + "row is not checked");
        }

        if (chkBox2.checked) {
            alert("checkbox2 in" + (i + 1) + "row is checked");
        } else {
            // alert("checkbox2 in" + i + "row is not checked");
        }
    }

}


function changeCoordinatorColor(e) {

    var isTeacherAvailable = confirm("is this room full ????");

    if (isTeacherAvailable) {

        var element = e.target;
        var coordinate = element.getAttribute("coords");

        alert(coordinate);
        var pos = coordinate.split(',');

        var left = pos[0];
        var top = pos[1];
        var width = pos[2];
        var height = pos[3];


        // document.getElementById("floor1Id").setAttribute("style", "position:absolute;top:"+ top+"px;left:"+ left+ "px;width:"+ width+ "px;height:"+ height+"px; background:#f00;");

        element.setAttribute("style", "position:absolute;top:" + top + "px;left:" + left + "px;width:" + width + "px;height:" + height + "px; background:#f00;");
    }

}