function getStyleAttr(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}

function gotoNextPage(currentId, nextId) {
    if (document.getElementById(currentId) != null && document.getElementById(nextId) != null) {
        document.getElementById(currentId).style.display = 'none';
        document.getElementById(nextId).style.display = 'block';
    } else {
        alert("WRONG ID! " + currentId + " " + nextId);
    }

}

//TODO: implemented this function
function goBack() {
    alert("TODO");
    /*if (localStorage.getItem("currentPage") === "StartPage") {
        alert("This is the first page.\nYou cannot go back. ");
    } else {
        document.getElementById(localStorage.getItem("currentPage")).style.display = 'none';
        document.getElementById(localStorage.getItem("previousPage")).style.display = 'block';
    }*/
}

function AgreementCheckBox() {
    let checkBox = document.getElementById("Agreement-checkbox");
    let btn = document.getElementById("Agreement-nextBtn");

    if (checkBox.checked === true){
        btn.disabled = false;
        btn.style.background = '#5174A6';
        btn.style.color = '#FFFFFF';
    } else {
        btn.disabled = true;
        btn.style.background = '#E0E0E0';
        btn.style.color = '#9A9A9A';
    }
}

