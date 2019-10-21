
// Create a new To-DO item when clicking on the "Add" button
function newElement() {
    var tr = document.createElement("tr");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    tr.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(tr);
    }
    document.getElementById("myInput").value = "";


    // Add date

    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + '-' + today.getMinutes();

    let dateContainer = document.createElement('td');
    let dateTXT = document.createTextNode(date);
    dateContainer.appendChild(dateTXT);
    tr.appendChild(dateContainer);
    dateContainer.className = "date";

    // Add delete button

    var deleteBTN = document.createElement("td");
    var txt = document.createTextNode("Close");
    deleteBTN.appendChild(txt);
    deleteBTN.className = "close";
    tr.appendChild(deleteBTN);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            let row = this.parentElement;
            row.remove();
        }
    }

    // Add edit Button

    var editBTN = document.createElement("td");
    var editTXT = document.createTextNode("Edit");
    editBTN.appendChild(editTXT);
    editBTN.className = "edit";
    tr.appendChild(editBTN);

    for (i = 0; i < close.length; i++) {
        edit[i].onclick = function () {
            let editRow = this.parentElement;

        }
    }

}




// Click on a close button to delete the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        let row = this.parentElement;
        row.remove();
    }
}

// Click on a edit button to edit the current list item
var edit = document.getElementsByClassName('edit');
var j;
for ( j = 0; j < edit.length; j++) {
    edit[j].onclick = function () {
        let editRow = this.parentElement;

    }
}
