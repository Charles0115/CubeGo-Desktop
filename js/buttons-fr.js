function StartPageNextPage() {
    let pin = document.getElementById("StartPage-pin").value;
    let email = document.getElementById("StartPage-email").value;
    let regular = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email === "") {
        alert("Email is empty!");
    } else if (email.match(regular) == null) {
        alert("Veuillez saisir la bonne adresse courriel!");
    } else if (pin === "" ) {
        alert("PIN is empty!");
    } else {
        document.getElementsByClassName("lang-menu")[0].style.display = "none";
        PINPostRequest(email, pin);
    }
}

function Instruction5NextPage() {
    document.getElementById("GO-BACK").style.display = 'block';
    openFullscreen();
    gotoNextPage('Instruction5', 'calibration-video');
}

function OpenCameraPreview() {
    let cameraWindow = window.open("", "CameraWindow", "width=160,height=120");

    console.log(cameraWindow.document);
    cameraWindow.document.write("<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "<head>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <title>CubeGO Desktop Camera Preview</title>\n" +
        "    <link rel=\"shortcut icon\" href=\"images/cubego_logo_tab.png\" type=\"image/x-icon\">\n" +
        "    <link rel=\"stylesheet\" href=\"css/CameraPreviewWindow.css\">\n" +
        "</head>\n" +
        "<body>\n" +
        "<video class=\"video\" autoplay playsinline></video>\n" +
        "<img src=\"images/cross.png\" alt=\"\">\n" +
        "</body>\n" +
        "</html>\n");

    let cameraPreview = cameraWindow.document.querySelector('video');

    cameraPreview.srcObject = video.srcObject;
    cameraPreview.muted = true;
    cameraPreview.volume = 0;

}

function AgreementNextPage() {
    if (localStorage.getItem("NPS") === "1") {
        if (document.getElementById('Agreement') != null && document.getElementById('PreTestQuestion') != null) {
            localStorage.setItem("CURRENT_PAGE", (parseInt(localStorage.getItem("CURRENT_PAGE"))+1).toString());
            document.body.style.background = "#E5E5E5";
            document.getElementById('PreTestQuestion').getElementsByClassName('question')[0]
                .getElementsByTagName('p')[0].innerHTML = 'How likely are you to recommend '+localStorage.getItem("npsInput")+' to a friend or colleague?';
            document.getElementById('PostTestQuestion').getElementsByClassName('question')[0]
                .getElementsByTagName('p')[0].innerHTML = "<b>Based on this experience</b>, how likely are you to recommend "+localStorage.getItem("npsInput")+' to a friend or colleague?';

            document.getElementById('Agreement').style.display = 'none';
            document.getElementById('PreTestQuestion').style.display = 'block';
        } else {
            alert("WRONG ID! Agreement + PreTestQuestion");
        }
    } else if (localStorage.getItem("hasPreviousQuestion") === "true") {
        if (document.getElementById('Agreement') != null && document.getElementById('PreCustomQuestions') != null) {
            localStorage.setItem("CURRENT_PAGE", (parseInt(localStorage.getItem("CURRENT_PAGE"))+1).toString());
            document.body.style.background = "#E5E5E5";
            document.getElementById('Agreement').style.display = 'none';
            document.getElementById('PreCustomQuestions').style.display = 'block';
        } else {
            alert("WRONG ID! Agreement + PreCustomQuestions");
        }
    } else {
        if (document.getElementById('Agreement') != null && document.getElementById('Instruction1') != null) {
            localStorage.setItem("CURRENT_PAGE", (parseInt(localStorage.getItem("CURRENT_PAGE"))+1).toString());
            document.body.style.background = "#E5E5E5";
            document.getElementById('Agreement').style.display = 'none';
            document.getElementById('Instruction1').style.display = 'block';
        } else {
            alert("WRONG ID! Agreement + Instruction1");
        }
    }
}

function PreTestQuestionNextPage() {
    let rate = $('#PreTestQuestion .radioButtons input[name=rate]:checked').val();

    if (rate === undefined) {
        alert("Veuillez r¨¦pondre ¨¤ toutes les questions!");
    } else {
        localStorage.setItem("npsBefore", rate);
        if (localStorage.getItem("hasPreviousQuestion") === "true") {
            gotoNextPage('PreTestQuestion', 'PreCustomQuestions');
        } else {
            gotoNextPage('PreTestQuestion', 'Instruction1');
        }
    }
}

function PreCustomQuestionsNextPage(currentId, nextId) {
    let isComplete = true;
    for (let i=1; i<=5; i++) {
        if (localStorage.getItem("customQuestion"+i) !== "") {
            if (localStorage.getItem("questionBefore"+i) === "1") {
                if (localStorage.getItem("radioResponse"+i) === "1") {
                    let rate = $('#PreCustomQuestions .radioButtons input[name=rate'+i+']:checked').val();
                    if (rate === undefined) {
                        isComplete = false;
                    } else {
                        localStorage.setItem("customBeforeAnswer"+i, rate);
                    }
                } else {
                    let answer = document.getElementById("PreCustomQuestion"+i+"T-answer").value;
                    if (answer === "") {
                        isComplete = false;
                    } else {
                        localStorage.setItem("customBeforeAnswer"+i, answer);
                    }
                }
            }
        } else {
            break;
        }
    }

    if (!isComplete) {
        alert("Veuillez r¨¦pondre ¨¤ toutes les questions!");
    } else {
        gotoNextPage(currentId, nextId);
    }
}


function DemographicNextPage() {
    let gender = $('#Demographic .INFOForm input[name=gender]:checked').val();
    let age = document.getElementById("Demographic-age").value;
    let country = document.getElementById("Demographic-country").value;
    let city = document.getElementById("Demographic-city").value;
    let income = document.getElementById("Demographic-income").value;


    if (gender === undefined || age === '' || country ==='' || city === '' || income === 'No Election') {
        alert("Please fill in all information!");
    } else {
        if (gender === 'male') {
            localStorage.setItem("gender", "1");
        } else if (gender === 'female') {
            localStorage.setItem("gender", "0");
        }

        localStorage.setItem("age", age);
        localStorage.setItem("country", country);
        localStorage.setItem("city", city);
        localStorage.setItem("income", income);

        if (localStorage.getItem("NPS") === "1") {
            gotoNextPage("Demographic", "PostTestQuestion");
        } else if (localStorage.getItem("SEQ") === "1") {
            gotoNextPage("Demographic", "SEQQuestion");
        } else if (localStorage.getItem("SUS") === "1") {
            gotoNextPage("Demographic", "SUSQuestion");
        } else if (localStorage.getItem("NASA") === "1") {
            gotoNextPage("Demographic", "NASAQuestion");
        } else if (localStorage.getItem("hasPostQuestion") === "true") {
            gotoNextPage("Demographic", "PostCustomQuestions");
        } else {
            gotoNextPage("Demographic", "CommentQuestion");
        }
    }
}

function PostTestQuestionNextPage() {
    let rate = $('#PostTestQuestion .radioButtons input[name=rate]:checked').val();

    if (rate === undefined) {
        alert("Veuillez r¨¦pondre ¨¤ toutes les questions!");
    } else {
        localStorage.setItem("npsAfter", rate);

        if (localStorage.getItem('SEQ') === '1') {
            gotoNextPage('PostTestQuestion', 'SEQQuestion');
        } else if (localStorage.getItem('SUS') === '1') {
            gotoNextPage('PostTestQuestion', 'SUSQuestion');
        } else if (localStorage.getItem('NASA') === '1') {
            gotoNextPage('PostTestQuestion', 'NASAQuestion');
        } else if (localStorage.getItem("hasPostQuestion") === "true") {
            gotoNextPage('PostTestQuestion', 'PostCustomQuestions');
        } else {
            gotoNextPage('PostTestQuestion', 'CommentQuestion');
        }
    }
}

function SEQQuestionNextPage() {
    let rate = $('#SEQQuestion .radioButtons input[name=rate]:checked').val();

    if (rate === undefined) {
        alert("Veuillez r¨¦pondre ¨¤ toutes les questions!");
    } else {
        localStorage.setItem("seq", rate);

        if (localStorage.getItem('SUS') === '1') {
            gotoNextPage('SEQQuestion', 'SUSQuestion');
        } else if (localStorage.getItem('NASA') === '1') {
            gotoNextPage('SEQQuestion', 'NASAQuestion');
        } else if (localStorage.getItem("hasPostQuestion") === "true") {
            gotoNextPage('SEQQuestion', 'PostCustomQuestions');
        } else {
            gotoNextPage('SEQQuestion', 'CommentQuestion');
        }
    }
}

function SUSQuestionNextPage() {
    let rates = [];
    let bool = true;
    let length = 10; // user defined length

    for(let i = 1; i <= length; i++) {
        let rate = $('#SUSQuestion .radioButtons input[name=rate'+i+']:checked').val();
        if (rate === undefined) {
            alert("Veuillez r¨¦pondre ¨¤ toutes les questions!");
            bool = false;
            break;
        } else {
            if (i % 2 === 1) {
                rates.push(parseInt(rate)-1);
            } else {
                rates.push(5-parseInt(rate));
            }

        }
    }
    if (bool) {
        let total = 0;
        for(let i = 0; i < rates.length; i++) {
            total += rates[i];
        }
        let result = total * 2.5;
        localStorage.setItem("sus", result.toString());

        if (localStorage.getItem('NASA') === '1') {
            gotoNextPage('SUSQuestion', 'NASAQuestion');
        } else if (localStorage.getItem("hasPostQuestion") === "true") {
            gotoNextPage('SUSQuestion', 'PostCustomQuestions');
        } else {
            gotoNextPage('SUSQuestion', 'CommentQuestion');
        }
    }
}

function NASAQuestionNextPage() {
    if (localStorage.getItem("hasPostQuestion") === "true") {
        gotoNextPage('NASAQuestion', 'PostCustomQuestions');
    } else {
        gotoNextPage('NASAQuestion', 'CommentQuestion');
    }
}

function PostCustomQuestionsNextPage(currentId, nextId) {
    let isComplete = true;
    for (let i=1; i<=5; i++) {
        if (localStorage.getItem("customQuestion"+i) !== "") {
            if (localStorage.getItem("questionAfter"+i) === "1") {
                if (localStorage.getItem("radioResponse"+i) === "1") {
                    let rate = $('#PostCustomQuestions .radioButtons input[name=rate'+i+']:checked').val();

                    if (rate === undefined) {
                        isComplete = false;
                    } else {
                        localStorage.setItem("customAfterAnswer"+i, rate);
                    }
                } else {
                    let answer = document.getElementById("PostCustomQuestion"+i+"T-answer").value;
                    if (answer === "") {
                        isComplete = false;
                    } else {
                        localStorage.setItem("customAfterAnswer"+i, answer);
                    }
                }
            }
        } else {
            break;
        }
    }

    if (!isComplete) {
        alert("Veuillez r¨¦pondre ¨¤ toutes les questions!");
    } else {
        gotoNextPage(currentId, nextId);
    }
}

function CommentQuestionNextPage(currentId, nextId) {
    let comment = document.getElementById("CommentQuestion-comment").value;
    localStorage.setItem("comment", comment);
    if (localStorage.getItem("FinishVideoUploading") === "True") {
        SendAnalysisAndParticipantRequests();
        document.getElementById("Upload").getElementsByClassName("title")[0].getElementsByTagName("h2")[0].innerHTML = "Thank you!";
        document.getElementById("Upload").getElementsByClassName("content")[0].getElementsByTagName("p")[0].innerHTML = "All your test data has been sent.";
        document.getElementById("Upload").getElementsByClassName("content")[0].getElementsByTagName("p")[0].style.color = "#2FCC71";
        document.getElementById("Upload").getElementsByClassName("instructions")[0].style.display = 'none';
        document.getElementById("Upload").getElementsByClassName("buttons")[0].style.display = 'none';
        document.getElementById("Upload").getElementsByClassName("finishUploading")[0].style.display = 'block';
    }

    localStorage.setItem("AnalysisAndParticipantRequest", "complete");
    document.getElementById("GO-BACK").style.display = 'none';
    gotoNextPage(currentId, nextId);
}


function downloadVideos() {
    download(screenSeekableBlob, localStorage.getItem("SCREEN_NAME"), "video/webm");
    download(cameraSeekableBlob, localStorage.getItem("VIDEO_NAME"), "video/webm");
    download(localStorage.getItem("TIMESTAMPS_CONTENT"), localStorage.getItem("TIMESTAMPS_NAME"), "application/json")
}

function download(content, fileName, contentType) {
    let a = document.createElement("a");
    let file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function reUploadVideos() {
    document.getElementById("Upload").getElementsByClassName("buttons")[0].style.display = 'none';
    document.getElementById("Upload").getElementsByClassName("error-message")[0].style.display = 'none';
    document.getElementById("ScreenProgress").innerHTML = "0%";
    document.getElementById("ScreenProgress").style.width = "0%";
    let screenProgressPercentage = 0;
    document.getElementById("CameraProgress").innerHTML = "0%";
    document.getElementById("CameraProgress").style.width = "0%";
    let cameraProgressPercentage = 0;

    setTimeout( function () {
        uploadFile(localStorage.getItem("TIMESTAMPS_CONTENT"), localStorage.getItem("TIMESTAMPS_NAME"));

        uploadFile(cameraSeekableBlob, localStorage.getItem("VIDEO_NAME")).on('httpUploadProgress', function(progress) {
            cameraProgressPercentage = Math.round(progress.loaded / progress.total * 100);
            document.getElementById("CameraProgress").innerHTML = cameraProgressPercentage + "%";
            document.getElementById("CameraProgress").style.width = cameraProgressPercentage + "%";
            //console.log(cameraProgressPercentage);

            if (screenProgressPercentage === 100 && cameraProgressPercentage === 100) {
                SendAnalysisAndParticipantRequests();
                document.getElementById("Upload").getElementsByClassName("title")[0].getElementsByTagName("h2")[0].innerHTML = "Thank you!";
                document.getElementById("Upload").getElementsByClassName("content")[0].getElementsByTagName("p")[0].innerHTML = "All your test data has been sent.";
                document.getElementById("Upload").getElementsByClassName("content")[0].getElementsByTagName("p")[0].style.color = "#2FCC71";
                document.getElementById("Upload").getElementsByClassName("instructions")[0].style.display = 'none';
                document.getElementById("Upload").getElementsByClassName("error-message")[0].style.display = 'none';
                document.getElementById("Upload").getElementsByClassName("buttons")[0].style.display = 'none';
                document.getElementById("Upload").getElementsByClassName("finishUploading")[0].style.display = 'block';
            }
        });

        uploadFile(screenSeekableBlob, localStorage.getItem("SCREEN_NAME")).on('httpUploadProgress', function(progress) {
            screenProgressPercentage = Math.round(progress.loaded / progress.total * 100);
            document.getElementById("ScreenProgress").innerHTML =  screenProgressPercentage + "%";
            document.getElementById("ScreenProgress").style.width =  screenProgressPercentage + "%";
            //console.log(screenProgressPercentage);

            if (screenProgressPercentage === 100 && cameraProgressPercentage === 100) {
                SendAnalysisAndParticipantRequests();
                document.getElementById("Upload").getElementsByClassName("title")[0].getElementsByTagName("h2")[0].innerHTML = "Thank you!";
                document.getElementById("Upload").getElementsByClassName("content")[0].getElementsByTagName("p")[0].innerHTML = "All your test data has been sent.";
                document.getElementById("Upload").getElementsByClassName("content")[0].getElementsByTagName("p")[0].style.color = "#2FCC71";
                document.getElementById("Upload").getElementsByClassName("instructions")[0].style.display = 'none';
                document.getElementById("Upload").getElementsByClassName("error-message")[0].style.display = 'none';
                document.getElementById("Upload").getElementsByClassName("buttons")[0].style.display = 'none';
                document.getElementById("Upload").getElementsByClassName("finishUploading")[0].style.display = 'block';
            }
        });
    }, 500);



}
