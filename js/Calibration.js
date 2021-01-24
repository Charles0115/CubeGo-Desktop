let w = Math.round(window.devicePixelRatio * screen.width);
let h = Math.round(window.devicePixelRatio * screen.height);
let leftEdge = 0.5;
let currentLength = 0.5;

function startCalibration() {
    document.getElementById('calibration-video').style.display = 'none';
    document.getElementById('calibration-circle').style.display = 'block';
    document.body.style.background = "#FFFFFF";
    document.getElementById('GO-BACK').style.display = 'none';

    //console.log(getComputedStyle(document.documentElement).fontSize);
    //console.log(convertPixelsToRems(w));

    setTimeout(function () {
        document.getElementById('calibration-circle').style.background = '#FFFF00';
        setTimeout( function () {
            function1();
            setTimeout( function () {
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
    let rightEdge = convertPixelsToRems(w) - 10 - 1;

    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"rem,"+currentLength.toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function2);
}

function function2(e) {
    let rightEdge = convertPixelsToRems(w) - 10 - 1;
    let length = (convertPixelsToRems(h) - 10 - 1.5) / 8;
    e.target.removeEventListener(e.type, arguments.callee);
    currentLength+=length;
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"rem,"+currentLength.toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function3);
}

function function3(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*leftEdge).toString()+"rem,"+currentLength.toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function4);
}

function function4(e) {
    let length = (convertPixelsToRems(h) - 10 - 1.5) / 8;
    e.target.removeEventListener(e.type, arguments.callee);
    currentLength+=length;
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*leftEdge).toString()+"rem,"+currentLength.toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function5);
}

function function5(e) {
    let rightEdge = convertPixelsToRems(w) - 10 - 1;
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"rem,"+currentLength.toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function6);
}

function function6(e) {
    let rightEdge = convertPixelsToRems(w) - 10 - 1;
    let length = (convertPixelsToRems(h) - 10 - 1.5) / 8;
    e.target.removeEventListener(e.type, arguments.callee);
    currentLength+=length;
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"rem,"+currentLength.toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function7);
}

function function7(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*leftEdge).toString()+"rem,"+currentLength.toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function8);
}

function function8(e) {
    let length = (convertPixelsToRems(h) - 10 - 1.5) / 8;
    e.target.removeEventListener(e.type, arguments.callee);
    currentLength+=length;
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*leftEdge).toString()+"rem,"+currentLength.toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function9);
}

function function9(e) {
    let rightEdge = convertPixelsToRems(w) - 10 - 1;
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"rem,"+currentLength.toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function10);
}

function function10(e) {
    let rightEdge = convertPixelsToRems(w) - 10 - 1;
    let length = (convertPixelsToRems(h) - 10 - 1.5) / 8;
    e.target.removeEventListener(e.type, arguments.callee);
    currentLength+=length;
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"rem,"+currentLength.toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function11);
}

function function11(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*leftEdge).toString()+"rem,"+currentLength.toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function12);
}

function function12(e) {
    let length = (convertPixelsToRems(h) - 10 - 1.5) / 8;
    e.target.removeEventListener(e.type, arguments.callee);
    currentLength+=length;
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*leftEdge).toString()+"rem,"+currentLength.toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function13);
}

function function13(e) {
    let rightEdge = convertPixelsToRems(w) - 10 - 1;
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"rem,"+currentLength.toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function14);
}

function function14(e) {
    let rightEdge = convertPixelsToRems(w) - 10 - 1;
    let length = (convertPixelsToRems(h) - 10 - 1.5) / 8;
    e.target.removeEventListener(e.type, arguments.callee);
    currentLength+=length;
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"rem,"+currentLength.toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function15);
}

function function15(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*leftEdge).toString()+"rem,"+currentLength.toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function16);
}
function function16(e) {
    let length = (convertPixelsToRems(h) - 10 - 1.5) / 8;
    e.target.removeEventListener(e.type, arguments.callee);
    currentLength+=length;
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*leftEdge).toString()+"rem,"+currentLength.toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function17);
}

function function17(e) {
    let rightEdge = convertPixelsToRems(w) - 10 - 1;
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"rem,"+currentLength.toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function18);
}

function function18(e) {
    let rightEdge = convertPixelsToRems(w) - 10 - 1;
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.background = '#0ffc03';
    document.getElementById('calibration-circle').style.transition = "all 0.05s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"rem,"+currentLength.toString()+"rem)";
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

