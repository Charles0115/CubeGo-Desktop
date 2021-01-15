function PINPostRequest(email, token) {
    let header = new Headers();
    header.append("Charset", "UTF-8");
    header.append("Content-Type", "application/json");
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('EMAIL', email.split("@")[0].replaceAll(".", ""));

    let json = {
        "strategy":"token",
        "token":token
    };

    let request = new Request('https://authentication.dev.cubehx.com/authentication', {
        method: 'POST',
        headers: header,
        body: JSON.stringify(json)
    });

    fetch(request)
        .then( (response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("BAD HTTP REQUEST");
            }
        }).then( (jsonData)=>{
        localStorage.setItem('accessToken', jsonData['accessToken']);
        localStorage.setItem('projectId', jsonData['payload']['projectId']);
        return true;
    }).then( function () {
        CheckEmail();
        //ProjectGetRequest();
    }).catch( (err)=>{
        console.log('PINPostRequest ERROR:', err.message);
        alert("Wrong PIN!");
    });
}

function CheckEmail() {
    let header = new Headers();
    header.append("Charset", "UTF-8");
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + localStorage.getItem('accessToken'));

    let request = new Request('https://participants.dev.cubehx.com/participants?projectID='+localStorage.getItem('projectId'), {
        method: 'GET',
        headers: header,
    });

    fetch(request)
        .then( (response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("BAD HTTP REQUEST");
            }
        }).then( (jsonData)=> {
            let temp = true;

            for (let i=0; i<jsonData['data'].length; i++) {
                let element = jsonData['data'][i];
                if (element['email'] === localStorage.getItem('email')) {
                    alert("Email already exists. Please try another email. ");
                    temp = false;
                    break;
                }
            }
            return temp;
        }).then(temp => {
            if (temp) {
                ProjectGetRequest();
            }
        }).catch( (err)=>{
            console.log('ParticipantGetRequest ERROR:', err.message);
            alert("Please contact CubeHX. ");
        });

    }

function ProjectGetRequest() {
    let header = new Headers();
    header.append("Charset", "UTF-8");
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + localStorage.getItem('accessToken'));

    let request = new Request('https://projects.dev.cubehx.com/projects/' + localStorage.getItem('projectId'), {
        method: 'GET',
        headers: header,
    });

    fetch(request)
        .then( (response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("BAD HTTP REQUEST");
            }
        }).then( (jsonData)=>{

            console.log(jsonData);

            localStorage.setItem("NPS", jsonData["NPS"]);
            localStorage.setItem("npsInput", jsonData['npsInput']);
            localStorage.setItem("SEQ", jsonData["SEQ"]);
            localStorage.setItem("SUS", jsonData["SUS"]);
            localStorage.setItem("NASA", jsonData["NASA"]);
            localStorage.setItem("invitation", jsonData["invitation"]);
            localStorage.setItem("instruction", jsonData["instruction"]);
            localStorage.setItem("npsInput", jsonData["npsInput"]);

            let element = document.createElement("p");
            element.innerHTML = localStorage.getItem("instruction");
            document.getElementById('Task').getElementsByClassName("instructions")[0].appendChild(element);

            let i;
            for (i=1; i<=5; i++) {
                if (jsonData["customQuestion"+i]==null) {
                    localStorage.setItem("customQuestion"+i, "");
                    break;
                } else {
                    if (parseInt(jsonData["radioResponse"+i]) === 1) {
                        if (parseInt(jsonData["questionBefore"+i]) === 1) {
                            localStorage.setItem("hasPreviousQuestion", "true");
                            document.getElementById("PreCustomQuestions").getElementsByClassName("question"+i)[0]
                                .getElementsByClassName("question")[0].innerHTML = jsonData["customQuestion"+i];
                            document.getElementById("PreCustomQuestions").getElementsByClassName("question"+i)[0]
                                .getElementsByClassName("textures")[0].style.display = 'none';
                        } else {
                            document.getElementById("PreCustomQuestions").getElementsByClassName("question"+i)[0].style.display = 'none';
                        }

                        if (parseInt(jsonData["questionAfter"+i]) === 1) {
                            localStorage.setItem("hasPostQuestion", "true");
                            document.getElementById("PostCustomQuestions").getElementsByClassName("question"+i)[0]
                                .getElementsByClassName("question")[0].innerHTML = jsonData["customQuestion"+i];
                            document.getElementById("PostCustomQuestions").getElementsByClassName("question"+i)[0]
                                .getElementsByClassName("textures")[0].style.display = 'none';
                        } else {
                            document.getElementById("PostCustomQuestions").getElementsByClassName("question"+i)[0].style.display = 'none';
                        }
                    } else {
                        if (parseInt(jsonData["questionBefore"+i]) === 1) {
                            localStorage.setItem("hasPreviousQuestion", "true");
                            document.getElementById("PreCustomQuestions").getElementsByClassName("question"+i)[0]
                                .getElementsByClassName("question")[0].innerHTML = jsonData["customQuestion"+i];
                            document.getElementById("PreCustomQuestions").getElementsByClassName("question"+i)[0]
                                .getElementsByClassName("radioGroup")[0].style.display = 'none';
                        } else {
                            document.getElementById("PreCustomQuestions").getElementsByClassName("question"+i)[0].style.display = 'none';
                        }

                        if (parseInt(jsonData["questionAfter"+i]) === 1) {
                            localStorage.setItem("hasPostQuestion", "true");
                            document.getElementById("PostCustomQuestions").getElementsByClassName("question"+i)[0]
                                .getElementsByClassName("question")[0].innerHTML = jsonData["customQuestion"+i];
                            document.getElementById("PostCustomQuestions").getElementsByClassName("question"+i)[0]
                                .getElementsByClassName("radioGroup")[0].style.display = 'none';
                        } else {
                            document.getElementById("PostCustomQuestions").getElementsByClassName("question"+i)[0].style.display = 'none';
                        }
                    }
                    localStorage.setItem("customQuestion"+i, jsonData["customQuestion"+i]);
                    localStorage.setItem("questionBefore"+i, jsonData["questionBefore"+i]);
                    localStorage.setItem("questionAfter"+i, jsonData["questionAfter"+i]);
                    localStorage.setItem("radioResponse"+i, jsonData["radioResponse"+i]);
                }
            }
            for (i; i<=5; i++) {
                document.getElementById("PreCustomQuestions").getElementsByClassName("question"+i)[0].style.display = 'none';
                document.getElementById("PostCustomQuestions").getElementsByClassName("question"+i)[0].style.display = 'none';
            }


        }).then( function () {
            let CURRENT_PAGE = 0;
            let PAGES = ["StartPage", "Agreement"];

            if (localStorage.getItem("NPS") === "1") {
                PAGES.push("PreTestQuestion");
            }

            if (localStorage.getItem("hasPreviousQuestion") === "true") {
                PAGES.push("PreCustomQuestions");
            }

            PAGES.push("Instruction1","Instruction2","Instruction3","Instruction4", "Instruction5",
                "calibration-video", "PreTask", "Task", "End1", "Demographic");

            if (localStorage.getItem("NPS") === "1") {
                PAGES.push("PostTestQuestion");
            }

            if (localStorage.getItem("SEQ") === "1") {
                PAGES.push("SEQQuestion");
            }
            if (localStorage.getItem("SUS") === "1") {
                PAGES.push("SUSQuestion");
            }
            if (localStorage.getItem("NASA") === "1") {
                PAGES.push("NASAQuestion");
            }
            if (localStorage.getItem("hasPostQuestion") === "true") {
                PAGES.push("PostCustomQuestions");
            }

            PAGES.push("CommentQuestion");

            localStorage.setItem("PAGES", JSON.stringify(PAGES));
            localStorage.setItem("CURRENT_PAGE", CURRENT_PAGE.toString());
        }).then( function () {
            let hash_name = localStorage.getItem('EMAIL') + "-" + localStorage.getItem('token') + "-d-" + RandomAlphaNumeric(16) + "-";
            localStorage.setItem("HASH_NAME", hash_name);
        }).then( function () {
            gotoNextPage('StartPage', 'Agreement');
            document.body.style.background = "#726B6B";
        })
        .catch( (err)=>{
            console.log('ProjectGetRequest ERROR:', err.message);
            alert("Wrong ProjectID!");
        });
}

function AnalysisPostRequest() {
    let header = new Headers();
    header.append("Charset", "UTF-8");
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + localStorage.getItem('accessToken'));


    let json = {
        "projectId": localStorage.getItem('projectId'),
        "media": localStorage.getItem("VIDEO_NAME"),
        "media2": localStorage.getItem("SCREEN_NAME"),
        "timestamps": localStorage.getItem("TIMESTAMPS_NAME"),
        "name": localStorage.getItem('EMAIL')
    };

    let request = new Request('https://analysis.dev.cubehx.com/analysis', {
        method: 'POST',
        headers: header,
        body: JSON.stringify(json)
    });

    fetch(request)
        .then( (response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("BAD HTTP REQUEST");
            }
        }).then( (jsonData)=>{
        localStorage.setItem('analysisId', jsonData['id']);
        return true;
    }).then( function () {
        console.log("Analysis done");
        ParticipantPostRequest();
    }).catch( (err)=>{
        console.log('AnalysisPostRequest ERROR:', err.message);
        alert("AnalysisPostRequest ERROR! Check console. ");
    });
}


function ParticipantPostRequest() {
    let header = new Headers();
    header.append("Charset", "UTF-8");
    header.append("Content-Type", "application/json");
    header.append("Authorization", "Bearer " + localStorage.getItem('accessToken'));


    let json = {
        "email": localStorage.getItem("email"),
        "gender": localStorage.getItem("gender"),
        "age": localStorage.getItem("age"),
        "income": localStorage.getItem("income"),
        "country": localStorage.getItem("country"),
        "city": localStorage.getItem("city"),
        "npsBefore": localStorage.getItem("npsBefore"),
        "npsAfter": localStorage.getItem("npsAfter"),
        "seq": localStorage.getItem("seq"),
        "sus": localStorage.getItem("sus"),
        "nasaMental": localStorage.getItem("nasaMental"),
        "nasaTemporal": localStorage.getItem("nasaTemporal"),
        "nasaPerformance": localStorage.getItem("nasaPerformance"),
        "nasaEffort": localStorage.getItem("nasaEffort"),
        "customBeforeAnswer1": localStorage.getItem("customBeforeAnswer1"),
        "customAfterAnswer1": localStorage.getItem("customAfterAnswer1"),
        "customBeforeAnswer2": localStorage.getItem("customBeforeAnswer2"),
        "customAfterAnswer2": localStorage.getItem("customAfterAnswer2"),
        "customBeforeAnswer3": localStorage.getItem("customBeforeAnswer3"),
        "customAfterAnswer3": localStorage.getItem("customAfterAnswer3"),
        "customBeforeAnswer4": localStorage.getItem("customBeforeAnswer4"),
        "customAfterAnswer4": localStorage.getItem("customAfterAnswer4"),
        "customBeforeAnswer5": localStorage.getItem("customBeforeAnswer5"),
        "customAfterAnswer5": localStorage.getItem("customAfterAnswer5"),
        "screenName": localStorage.getItem("SCREEN_NAME"),
        "videoName": localStorage.getItem("VIDEO_NAME"),
        "projectID": localStorage.getItem('projectId'),
        "comment": localStorage.getItem("comment"),
        "cameraStart": localStorage.getItem("cameraStart"),
        "cameraEnd": localStorage.getItem("cameraEnd"),
        "screenStart": localStorage.getItem("screenStart"),
        "screenEnd": localStorage.getItem("screenEnd"),
        "platform": "desktop",
        "analysisId": localStorage.getItem('analysisId')
    };

    let request = new Request("https://participants.dev.cubehx.com/participants", {
        method: 'POST',
        headers: header,
        body: JSON.stringify(json)
    });

    fetch(request)
        .then( (response) => {
            if (response.ok) {

                return response.json();
            } else {
                throw new Error("BAD HTTP REQUEST");
            }
        }).then( (jsonData)=>{
            console.log("Participants done");
            return true;
        }).catch( (err)=>{
            console.log('ParticipantPostRequest ERROR:', err.message);
            alert("ParticipantPostRequest ERROR! Check console. ");
    });
}

/**
 * @return {string}
 */
function RandomAlphaNumeric(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
