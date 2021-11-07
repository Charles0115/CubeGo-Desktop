function PINPostRequest(email, token) {
    let header = new Headers();
    header.append("Charset", "UTF-8");
    header.append("Content-Type", "application/json");
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('EMAIL', email.split("@")[0].replaceAll(".", "").replaceAll("-", ""));

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

let previousCustomQuestionsList = [];
let postCustomQuestionsList = [];

function compare( a, b ) {
    if ( a.order < b.order ){
        return -1;
    }
    if ( a.order > b.order ){
        return 1;
    }
    return 0;
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
            localStorage.setItem("NPS", jsonData["NPS"]);
            localStorage.setItem("npsInput", jsonData['npsInput']);
            localStorage.setItem("SEQ", jsonData["SEQ"]);
            localStorage.setItem("SUS", jsonData["SUS"]);
            localStorage.setItem("NASA", jsonData["NASA"]);
            localStorage.setItem("invitation", jsonData["invitation"]);
            localStorage.setItem("instruction", jsonData["instruction"]);

            let element = document.createElement("p");
            element.innerHTML = localStorage.getItem("instruction");
            document.getElementById('Task').getElementsByClassName("instructions")[0].appendChild(element);

            let questionList = jsonData["customQuestions"];
            questionList.sort(compare);

            for (let i=0; i<questionList.length; i++) {
                if (questionList[i]['before']) {
                    localStorage.setItem("hasPreviousQuestion", "true");
                    previousCustomQuestionsList.push(questionList[i]);

                    let PreCustomQuestions = document.getElementById('PreCustomQuestions');
                    let question = document.createElement('div');
                    question.className = 'question' + questionList[i]['id'];
                    question.style.marginBottom = '10rem';

                    let question_text = document.createElement('p');
                    question_text.className = 'question';
                    question_text.textContent = questionList[i]['body'];
                    question.appendChild(question_text);

                    if (questionList[i]['responseType'] === 'Likert') {
                        let radioGroup = document.createElement('div');
                        radioGroup.className = 'radioGroup';
                        question.appendChild((radioGroup));

                        let radioButtons = document.createElement('div');
                        radioButtons.className = 'radioButtons';
                        radioGroup.appendChild(radioButtons);

                        for (let j=0; j<questionList[i]['numericMax']; j++) {
                            let wrap = document.createElement('div');
                            wrap.className = 'wrap';
                            let label = document.createElement('label');
                            label.textContent = (j+1).toString();
                            let input = document.createElement('input');
                            input.name = 'rate' + (questionList[i]['id']).toString();
                            input.type = 'radio';
                            input.value = (j+1).toString();
                            wrap.appendChild(label);
                            wrap.appendChild(input);
                            radioButtons.appendChild(wrap);
                        }

                        let left_text = document.createElement('p');
                        left_text.className = 'left-text';
                        left_text.setAttribute('translate', '');
                        left_text.setAttribute('key', 'extremely_unlikely');
                        left_text.textContent = questionList[i]['numericMinLabel'];
                        radioGroup.appendChild(left_text);

                        let right_text = document.createElement('p');
                        right_text.className = 'right-text';
                        right_text.setAttribute('translate', '');
                        right_text.setAttribute('key', 'extremely_likely');
                        right_text.textContent = questionList[i]['numericMaxLabel'];
                        radioGroup.appendChild(right_text);

                    } else if (questionList[i]['responseType'] === 'Text') {
                        let textures = document.createElement('form');
                        textures.className = 'textures';
                        question.appendChild(textures);

                        let PreCustomQuestionText_answer = document.createElement('input');
                        PreCustomQuestionText_answer.id = 'PreCustomQuestionText-'+questionList[i]['id']+'-answer';
                        PreCustomQuestionText_answer.className = 'PreCustomQuestionText-answer';
                        PreCustomQuestionText_answer.type = 'text';
                        PreCustomQuestionText_answer.name = 'answer';
                        PreCustomQuestionText_answer.placeholder = 'Please type your answer here.';
                        textures.appendChild(PreCustomQuestionText_answer);
                        textures.appendChild(document.createElement("br"));
                    } else if (questionList[i]['responseType'] === 'Scale') {
                        let sliderContainer = document.createElement('div');
                        sliderContainer.className = 'customQuestionSliderContainer';
                        question.appendChild(sliderContainer);

                        let PreCustomQuestionSlider = document.createElement('input');
                        PreCustomQuestionSlider.id = 'PreCustomQuestionSlider-'+questionList[i]['id'];
                        PreCustomQuestionSlider.className = 'PreCustomQuestionSlider';
                        PreCustomQuestionSlider.type = 'range';
                        PreCustomQuestionSlider.max = questionList[i]['numericMax'].toString();
                        PreCustomQuestionSlider.min = '1';
                        PreCustomQuestionSlider.value = ((1+questionList[i]['numericMax'])/2).toString();
                        sliderContainer.appendChild(PreCustomQuestionSlider);

                        let PreCustomQuestionSliderValue = document.createElement('output');
                        PreCustomQuestionSliderValue.id = 'PreCustomQuestionSliderValue-'+questionList[i]['id'];
                        PreCustomQuestionSliderValue.className = 'PreCustomQuestionSliderValue';
                        PreCustomQuestionSliderValue.value = PreCustomQuestionSlider.value;

                        sliderContainer.appendChild(PreCustomQuestionSliderValue);
                        PreCustomQuestionSlider.oninput = function(){
                            PreCustomQuestionSliderValue.value = PreCustomQuestionSlider.value;
                        };

                        let left_text = document.createElement('p');
                        left_text.className = 'left-text';
                        left_text.setAttribute('translate', '');
                        left_text.setAttribute('key', 'extremely_unlikely');
                        left_text.textContent = questionList[i]['numericMinLabel'];
                        sliderContainer.appendChild(left_text);

                        let right_text = document.createElement('p');
                        right_text.className = 'right-text';
                        right_text.setAttribute('translate', '');
                        right_text.setAttribute('key', 'extremely_likely');
                        right_text.textContent = questionList[i]['numericMaxLabel'];
                        sliderContainer.appendChild(right_text);
                    }


                    let button = document.getElementById('PreCustomQuestions-nextBtn');

                    PreCustomQuestions.insertBefore(question, button);
                }

                if (questionList[i]['after']) {
                    localStorage.setItem("hasPostQuestion", "true");
                    postCustomQuestionsList.push(questionList[i]);

                    let PostCustomQuestions = document.getElementById('PostCustomQuestions');
                    let question = document.createElement('div');
                    question.className = 'question' + questionList[i]['id'];
                    question.style.marginBottom = '10rem';

                    let question_text = document.createElement('p');
                    question_text.className = 'question';
                    question_text.textContent = questionList[i]['body'];
                    question.appendChild(question_text);

                    if (questionList[i]['responseType'] === 'Likert') {
                        let radioGroup = document.createElement('div');
                        radioGroup.className = 'radioGroup';
                        question.appendChild((radioGroup));

                        let radioButtons = document.createElement('div');
                        radioButtons.className = 'radioButtons';
                        radioGroup.appendChild(radioButtons);

                        for (let j=0; j<questionList[i]['numericMax']; j++) {
                            let wrap = document.createElement('div');
                            wrap.className = 'wrap';
                            let label = document.createElement('label');
                            label.textContent = (j+1).toString();
                            let input = document.createElement('input');
                            input.name = 'rate' + (questionList[i]['id']).toString();
                            input.type = 'radio';
                            input.value = (j+1).toString();
                            wrap.appendChild(label);
                            wrap.appendChild(input);
                            radioButtons.appendChild(wrap);
                        }

                        let left_text = document.createElement('p');
                        left_text.className = 'left-text';
                        left_text.setAttribute('translate', '');
                        left_text.setAttribute('key', 'extremely_unlikely');
                        left_text.textContent = questionList[i]['numericMinLabel'];
                        radioGroup.appendChild(left_text);

                        let right_text = document.createElement('p');
                        right_text.className = 'right-text';
                        right_text.setAttribute('translate', '');
                        right_text.setAttribute('key', 'extremely_likely');
                        right_text.textContent = questionList[i]['numericMaxLabel'];
                        radioGroup.appendChild(right_text);

                    } else if (questionList[i]['responseType'] === 'Text') {
                        let textures = document.createElement('form');
                        textures.className = 'textures';
                        question.appendChild(textures);

                        let PreCustomQuestionText_answer = document.createElement('input');
                        PreCustomQuestionText_answer.id = 'PostCustomQuestionText-'+questionList[i]['id']+'-answer';
                        PreCustomQuestionText_answer.className = 'PostCustomQuestionText-answer';
                        PreCustomQuestionText_answer.type = 'text';
                        PreCustomQuestionText_answer.name = 'answer';
                        PreCustomQuestionText_answer.placeholder = 'Please type your answer here.';
                        textures.appendChild(PreCustomQuestionText_answer);
                        textures.appendChild(document.createElement("br"));

                    } else if (questionList[i]['responseType'] === 'Scale') {
                        let sliderContainer = document.createElement('div');
                        sliderContainer.className = 'customQuestionSliderContainer';
                        question.appendChild(sliderContainer);

                        let PreCustomQuestionSlider = document.createElement('input');
                        PreCustomQuestionSlider.id = 'PostCustomQuestionSlider-'+questionList[i]['id'];
                        PreCustomQuestionSlider.className = 'PostCustomQuestionSlider';
                        PreCustomQuestionSlider.type = 'range';
                        PreCustomQuestionSlider.value = 'answer';
                        PreCustomQuestionSlider.max = questionList[i]['numericMax'].toString();
                        PreCustomQuestionSlider.min = '1';
                        PreCustomQuestionSlider.value = ((1+questionList[i]['numericMax'])/2).toString();
                        sliderContainer.appendChild(PreCustomQuestionSlider);

                        let PreCustomQuestionSliderValue = document.createElement('output');
                        PreCustomQuestionSliderValue.style.display = 'block';
                        PreCustomQuestionSliderValue.id = 'PostCustomQuestionSliderValue-'+questionList[i]['id'];
                        PreCustomQuestionSliderValue.className = 'PostCustomQuestionSliderValue';
                        PreCustomQuestionSliderValue.value = PreCustomQuestionSlider.value;

                        sliderContainer.appendChild(PreCustomQuestionSliderValue);
                        PreCustomQuestionSlider.oninput = function(){
                            PreCustomQuestionSliderValue.value = PreCustomQuestionSlider.value;
                        };

                        let left_text = document.createElement('p');
                        left_text.className = 'left-text';
                        left_text.setAttribute('translate', '');
                        left_text.setAttribute('key', 'extremely_unlikely');
                        left_text.textContent = questionList[i]['numericMinLabel'];
                        sliderContainer.appendChild(left_text);

                        let right_text = document.createElement('p');
                        right_text.className = 'right-text';
                        right_text.setAttribute('translate', '');
                        right_text.setAttribute('key', 'extremely_likely');
                        right_text.textContent = questionList[i]['numericMaxLabel'];
                        sliderContainer.appendChild(right_text);
                    }


                    let button = document.getElementById('PostCustomQuestions-nextBtn');

                    PostCustomQuestions.insertBefore(question, button);
                }

            }
        }).then( function () {
            let CURRENT_PAGE = 0;
            let PAGES = ["StartPage", "Agreement"];

            if (localStorage.getItem("NPS") === "true") {
                PAGES.push("PreTestQuestion");
            }

            if (localStorage.getItem("hasPreviousQuestion") === "true") {
                PAGES.push("PreCustomQuestions");
            }

            PAGES.push("Instruction1","Instruction2","Instruction3", "Instruction4", "Instruction5",
                "calibration-video", "PreTask", "second-calibration-video", "Task", "End1", "Demographic");

            if (localStorage.getItem("NPS") === "true") {
                PAGES.push("PostTestQuestion");
            }

            if (localStorage.getItem("SEQ") === "true") {
                PAGES.push("SEQQuestion");
            }
            if (localStorage.getItem("SUS") === "true") {
                PAGES.push("SUSQuestion");
            }
            if (localStorage.getItem("NASA") === "true") {
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
        "customAnswers": previousCustomanswersList.concat(postCustomanswersList),
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
