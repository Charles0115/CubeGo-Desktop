function getStyleAttr(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}

function gotoNextPage(currentId, nextId) {
    if (document.getElementById(currentId) != null && document.getElementById(nextId) != null) {
        localStorage.setItem("CURRENT_PAGE", (parseInt(localStorage.getItem("CURRENT_PAGE"))+1).toString());
        document.getElementById(currentId).style.display = 'none';
        document.getElementById(nextId).style.display = 'block';
    } else {
        alert("WRONG ID! " + currentId + " " + nextId);
    }

}

//TODO: implemented this function
function goBack() {
    if (localStorage.getItem("CURRENT_PAGE") === null) {
        alert("This is the first page.\nYou cannot go back. ");
    } else {
        let PAGES = JSON.parse(localStorage.getItem("PAGES"));
        let index = parseInt(localStorage.getItem("CURRENT_PAGE"));

        if (PAGES[index] === "Instruction5") {
            alert("Recording has started. You cannot go back!");
        } else if (PAGES[index] === "PreTask") {
            alert("Calibration has completed. You cannot go back!");
        } else if (PAGES[index] === "End1") {
            alert("Test has ended. You cannot go back!");
        } else {
            let realIndex = index - 1;
            localStorage.setItem("CURRENT_PAGE", realIndex.toString());

            if (PAGES[realIndex] === "Agreement") {
                document.body.style.background = "#726B6B";
            }
            if (PAGES[index] === "Agreement") {
                document.body.style.background = "#E5E5E5";
            }


            if (document.getElementById(PAGES[index]) != null && document.getElementById(PAGES[realIndex]) != null) {
                document.getElementById(PAGES[index]).style.display = 'none';
                document.getElementById(PAGES[realIndex]).style.display = 'block';
            } else {
                alert("WRONG ID! " + PAGES[index] + " " + PAGES[realIndex]);
            }
        }
    }
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

