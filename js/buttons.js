function StartPageNextPage() {
    let pin = document.getElementById("StartPage-pin").value;
    let email = document.getElementById("StartPage-email").value;
    let regular = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email === "") {
        alert("Email is empty!");
    } else if (email.match(regular) == null) {
        alert("Please insert correct email!");
    } else if (pin === "" ) {
        alert("PIN is empty!");
    } else {
        PINPostRequest(email, pin);
    }
}

function Instruction5NextPage() {
    document.getElementById("GO-BACK").style.display = 'block';
    gotoNextPage('Instruction5', 'calibration-video');
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
        alert("Please answer all questions!");
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
        alert("Please answer all questions!");
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
        localStorage.setItem("gender", gender);
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
        alert("Please answer all questions!");
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
        alert("Please answer all questions!");
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
            alert("Please answer all questions!");
            bool = false;
            break;
        } else {
            rates.push(parseInt(rate));
        }
    }
    if (bool) {
        let total = 0;
        for(let i = 0; i < rates.length; i++) {
            total += rates[i];
        }
        let avg = total / rates.length;
        console.log(avg);
        localStorage.setItem("sus", avg.toString());

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
        alert("Please answer all questions!");
    } else {
        gotoNextPage(currentId, nextId);
    }
}

function CommentQuestionNextPage(currentId, nextId) {
    let comment = document.getElementById("CommentQuestion-comment").value;
    localStorage.setItem("comment", comment);
    gotoNextPage(currentId, nextId);
}



