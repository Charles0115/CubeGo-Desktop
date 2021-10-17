let body, width, height, rightEdge, leftEdge, heightLength;


function startCalibration() {
    body = document.querySelector("body");
    width = body.offsetWidth;
    height = body.offsetHeight;
    rightEdge = 0;
    leftEdge = convertPixelsToRems(-1*width)+10;
    heightLength = convertPixelsToRems(height)-10;

    upEdge = 0;
    bottomEdge = convertPixelsToRems(height)-10;
    widthLength = convertPixelsToRems(width)-10;

    document.getElementById('camid').style.display = 'none';
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

let calibrationCircleCoordinate = [];
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function calculateCoordinate() {
    calibrationCircleCoordinate.push([0, convertPixelsToRems(width)/2-5]);
    calibrationCircleCoordinate.push([0, 0]);
    calibrationCircleCoordinate.push([0, convertPixelsToRems(width)-10]);

    calibrationCircleCoordinate.push([convertPixelsToRems(height)/2-5, 0]);
    calibrationCircleCoordinate.push([convertPixelsToRems(height)/2-5, convertPixelsToRems(width)/2-5]);
    calibrationCircleCoordinate.push([convertPixelsToRems(height)/2-5, convertPixelsToRems(width)-10]);

    calibrationCircleCoordinate.push([convertPixelsToRems(height-1)-10, 0]);
    calibrationCircleCoordinate.push([convertPixelsToRems(height-1)-10, convertPixelsToRems(width)/2-5]);
    calibrationCircleCoordinate.push([convertPixelsToRems(height-1)-10, convertPixelsToRems(width)-10]);

    shuffle(calibrationCircleCoordinate);
}

function startSecondCalibration() {
    body = document.querySelector("body");
    width = body.offsetWidth;
    height = body.offsetHeight;

    document.getElementById('second-calibration-video').style.display = 'none';
    document.getElementById('second-calibration-circle').style.display = 'block';
    document.body.style.background = "#FFFFFF";
    document.getElementById('GO-BACK').style.display = 'none';

    calculateCoordinate();

    calibrationCircleCoordinate.forEach((coordinate, index) => {
        setTimeout( function () {
            document.getElementById('second-calibration-circle').style.top = coordinate[0] + 'rem';
            document.getElementById('second-calibration-circle').style.left = coordinate[1] + 'rem';
            $('#second-calibration-circle').css('transform', 'scale('+1+')');

            setTimeout( function () {
                $('#second-calibration-circle').css('transform', 'scale('+0.1+')');
            }, 2500);
        }, index*5000);
    });

    setTimeout(function () {
        document.body.style.background = "#E5E5E5";
        document.getElementById("GO-BACK").style.display = 'block';
        gotoNextPage('second-calibration-circle', 'Task');
    }, 45000);
}
