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
            }, 96000);
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
    document.getElementById('calibration-circle').style.transition = "all 5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem" + ")";
    document.getElementById('calibration-circle').addEventListener("transitionend", function2);
}

function function2(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.25s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+ leftEdge +"rem, " + (heightLength/8).toString() + "rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function3);
}

function function3(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(heightLength/8).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function4);
}

function function4(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.25s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(2*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function5);
}

function function5(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(2*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function6);
}

function function6(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.25s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(3*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function7);
}

function function7(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(3*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function8);
}

function function8(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.25s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(4*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function9);
}

function function9(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(4*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function10);
}

function function10(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.25s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(5*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function11);
}

function function11(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(5*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function12);
}

function function12(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.25s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(6*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function13);
}

function function13(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(6*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function14);
}

function function14(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.25s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(7*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function15);
}

function function15(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(7*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function16);
}

function function16(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.25s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(8*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function17);
}

function function17(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(8*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", backward_begin);
}

function upsidedown_begin(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 3s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+upEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function20_1);
}

function backward_begin(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(8*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function20);
}

function function20(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.25s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(7*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function21);
}

function function20_1(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 1s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(leftEdge+(widthLength/8)).toString()+"rem,"+upEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function21_1);
}

function function21(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(7*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function22);
}

function function21_1(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 3s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(leftEdge+(widthLength/8)).toString()+"rem,"+bottomEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function22_1);
}

function function22(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.25s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(6*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function23);
}

function function22_1(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 1s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(leftEdge+2*(widthLength/8)).toString()+"rem,"+bottomEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function23_1);
}

function function23(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(6*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function24);
}

function function23_1(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 3s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(leftEdge+2*(widthLength/8)).toString()+"rem,"+upEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function24_1);
}

function function24(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.25s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(5*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function25);
}

function function24_1(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 1s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(leftEdge+3*(widthLength/8)).toString()+"rem,"+upEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function25_1);
}

function function25(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(5*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function26);
}

function function25_1(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 3s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(leftEdge+3*(widthLength/8)).toString()+"rem,"+bottomEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function26_1);
}

function function26(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.25s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(4*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function27);
}

function function26_1(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 1s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(leftEdge+4*(widthLength/8)).toString()+"rem,"+bottomEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function27_1);
}

function function27(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(4*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function28);
}

function function27_1(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 3s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(leftEdge+4*(widthLength/8)).toString()+"rem,"+upEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function28_1);
}

function function28(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.25s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(3*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function29);
}

function function28_1(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 1s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(leftEdge+5*(widthLength/8)).toString()+"rem,"+upEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function29_1);
}

function function29(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(3*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function30);
}

function function29_1(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 3s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(leftEdge+5*(widthLength/8)).toString()+"rem,"+bottomEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function30_1);
}

function function30(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.25s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+(2*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function31);
}

function function30_1(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 1s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(leftEdge+6*(widthLength/8)).toString()+"rem,"+bottomEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function31_1);
}

function function31(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+(2*(heightLength/8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function32);
}

function function31_1(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 3s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(leftEdge+6*(widthLength/8)).toString()+"rem,"+upEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function32_1);
}

function function32(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.25s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem,"+((heightLength / 8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function33);
}

function function32_1(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 1s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(leftEdge+7*(widthLength/8)).toString()+"rem,"+upEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function33_1);
}

function function33(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem,"+((heightLength / 8)).toString()+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function34);
}

function function33_1(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 3s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(leftEdge+7*(widthLength/8)).toString()+"rem,"+bottomEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function34_1);
}

function function34(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 0.25s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+leftEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function35);
}

function function34_1(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 1s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(leftEdge+8*(widthLength/8)).toString()+"rem,"+bottomEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function35_1);
}

function function35(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 5s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+rightEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function36);
}

function function35_1(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.transition = "all 3s linear";
    document.getElementById('calibration-circle').style.transform = "translate("+(leftEdge+8*(widthLength/8)).toString()+"rem,"+upEdge+"rem)";
    document.getElementById('calibration-circle').addEventListener("transitionend", function36);
}

function function36(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    document.getElementById('calibration-circle').style.background = '#0ffc03';
    document.getElementById('calibration-circle').style.transition = "all 0.01s linear";
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
