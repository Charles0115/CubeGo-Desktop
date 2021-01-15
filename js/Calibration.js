let w = Math.round(window.devicePixelRatio * screen.width);
let h = Math.round(window.devicePixelRatio * screen.height);
let length = (h - 35*10 * (w / 1920)) / 8;
let rightEdge = w - 50*10 * (w / 1920);
let leftEdge = 0.5*10 * (w / 1920);
let currentLength = 0.5*10 * (w / 1920);

function startCalibration() {
    document.getElementById('calibration-video').style.display = 'none';
    document.getElementById('calibration-circle').style.display = 'block';
    document.body.style.background = "#FFFFFF";
    document.getElementById('GO-BACK').style.display = 'none';


    setTimeout(function () {
        document.getElementById('calibration-circle').style.background = '#5174A6';
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

function function1() {
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"px,"+currentLength.toString()+"px)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function2);
}

function function2(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    currentLength+=length;
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"px,"+currentLength.toString()+"px)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function3);
}

function function3(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*leftEdge).toString()+"px,"+currentLength.toString()+"px)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function4);
}

function function4(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    currentLength+=length;
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*leftEdge).toString()+"px,"+currentLength.toString()+"px)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function5);
}

function function5(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"px,"+currentLength.toString()+"px)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function6);
}

function function6(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    currentLength+=length;
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"px,"+currentLength.toString()+"px)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function7);
}

function function7(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*leftEdge).toString()+"px,"+currentLength.toString()+"px)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function8);
}

function function8(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    currentLength+=length;
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*leftEdge).toString()+"px,"+currentLength.toString()+"px)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function9);
}

function function9(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"px,"+currentLength.toString()+"px)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function10);
}

function function10(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    currentLength+=length;
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"px,"+currentLength.toString()+"px)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function11);
}

function function11(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*leftEdge).toString()+"px,"+currentLength.toString()+"px)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function12);
}

function function12(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    currentLength+=length;
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*leftEdge).toString()+"px,"+currentLength.toString()+"px)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function13);
}

function function13(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"px,"+currentLength.toString()+"px)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function14);
}

function function14(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    currentLength+=length;
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"px,"+currentLength.toString()+"px)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function15);
}

function function15(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*leftEdge).toString()+"px,"+currentLength.toString()+"px)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function16);
}
function function16(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    currentLength+=length;
    document.getElementById('calibration-circle').style.transition = "all 0.5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*leftEdge).toString()+"px,"+currentLength.toString()+"px)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function17);
}

function function17(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 10s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"px,"+currentLength.toString()+"px)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function18);
}

function function18(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.background = '#0ffc03';
    document.getElementById('calibration-circle').style.transition = "all 0.05s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(-1*rightEdge).toString()+"px,"+currentLength.toString()+"px)";
}
