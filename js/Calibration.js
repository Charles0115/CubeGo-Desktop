let body, width, height, rightEdge, leftEdge, heightLength;


function startCalibration() {
    body = document.querySelector("body");
    width = body.offsetWidth;
    height = body.offsetHeight;
    rightEdge = -0.5;
    leftEdge = convertPixelsToRems(-1*width)+10.5;
    heightLength = convertPixelsToRems(height)-11;

    document.getElementById('calibration-video').style.display = 'none';
    document.getElementById('calibration-circle').style.display = 'block';
    document.body.style.background = "#FFFFFF";
    document.getElementById('GO-BACK').style.display = 'none';
    localStorage.setItem("CalibrationStart", (new Date().getTime()).toString());

    setTimeout(function () {
        document.getElementById('calibration-circle').style.background = '#FFFF00';
        setTimeout( function () {
            function1();
            setTimeout( function () {
                localStorage.setItem("CalibrationEnd", (new Date().getTime()).toString());
                document.body.style.background = "#E5E5E5";
                document.getElementById("GO-BACK").style.display = 'block';
                closeFullscreen();
                gotoNextPage('calibration-circle', 'PreTask');
            }, 95000);
        }, 50);
    }, 1000);
}

function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function convertPixelsToRems(pixel) {
    return pixel / parseFloat(getComputedStyle(document.documentElement).fontSize);
}


function function1() {
    console.log(leftEdge);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem" + ")";
    document.getElementById('calibration-circle').addEventListener("transitionend", function2);
}

function function2(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+ leftEdge +"rem, " + (heightLength/8).toString() + "rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function3);
}

function function3(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(heightLength/8).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function4);
}

function function4(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(2*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function5);
}

function function5(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(2*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function6);
}

function function6(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(3*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function7);
}

function function7(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(3*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function8);
}

function function8(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(4*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function9);
}

function function9(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(4*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function10);
}

function function10(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(5*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function11);
}

function function11(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(5*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function12);
}

function function12(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(6*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function13);
}

function function13(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(6*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function14);
}

function function14(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(7*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function15);
}

function function15(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(7*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function16);
}
function function16(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(8*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function17);
}

function function17(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(8*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function18);
}

function function18(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.background = '#0ffc03';
    document.getElementById('calibration-circle').style.transition = "all 0.05s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(8*(heightLength/8)).toString()+"rem)";
}

function openFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
        document.documentElement.msRequestFullscreen();
    }
}

