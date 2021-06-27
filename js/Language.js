function ToEnglish() {
    if (localStorage.getItem("language") === "english") {

    } else {
        localStorage.setItem("language", "english");
        document.getElementsByClassName("selected-lang")[0].textContent = "English";

        $("[translate]").each(function(index, element) {
            $(this).html(arrLang['english'][$(this).attr("key")]);
        });

        $("#StartPage-email").attr("placeholder", "EMAIL");

        $("#Agreement .submit-section .checkbox").css('position', '');
        $("label[key='i_understand_that']").css('margin-left', '0.5rem');
        $("label[key='i_understand_that']").css("position", "");
        $("label[key='i_understand_that']").css("left", "");

        $("img[key='cross']").css("left", "25%");

        $("#PreCustomQuestion1T-answer").attr("placeholder", "Please type your answer here.");
        $("#PreCustomQuestion2T-answer").attr("placeholder", "Please type your answer here.");
        $("#PreCustomQuestion3T-answer").attr("placeholder", "Please type your answer here.");
        $("#PreCustomQuestion4T-answer").attr("placeholder", "Please type your answer here.");
        $("#PreCustomQuestion5T-answer").attr("placeholder", "Please type your answer here.");

        $("#End1 .title").css("width", "100%");
        $("#End1 .title").css("margin", "");
        $("#End1 .title").css("padding-top", "");
        $("#End1 .title h2").css("text-align", "center");
        $("#End1 .title h2").css("line-height", "30rem");

        $("#Demographic-country").attr("placeholder", "Country");
        $("#Demographic-city").attr("placeholder", "City");

        $("#CommentQuestion-comment").attr("placeholder", "Let us know if you encountered any bugs, if the instructions were unclear, or if something went wrong.");

        $("#PostCustomQuestion1T-answer").attr("placeholder", "Please type your answer here.");
        $("#PostCustomQuestion1T-answer").attr("placeholder", "Please type your answer here.");
        $("#PostCustomQuestion1T-answer").attr("placeholder", "Please type your answer here.");
        $("#PostCustomQuestion1T-answer").attr("placeholder", "Please type your answer here.");
        $("#PostCustomQuestion1T-answer").attr("placeholder", "Please type your answer here.");

        $("#Upload .content .progress1").css("width", "90rem");
        $("#Upload .content .progress2").css("width", "90rem");
    }
}

function ToFrench() {
    if (localStorage.getItem("language") === "french") {

    } else {
        localStorage.setItem("language", "french");
        document.getElementsByClassName("selected-lang")[0].textContent = "French";

        $("[translate]").each(function(index, element) {
            $(this).html(arrLang['french'][$(this).attr("key")]);
        });

        $("#StartPage-email").attr("placeholder", "ADRESSE COURRIEL");

        $("#Agreement .submit-section .checkbox").css('position', 'relative');
        $("label[key='i_understand_that']").css('margin-left', '');
        $("label[key='i_understand_that']").css("position", "absolute");
        $("label[key='i_understand_that']").css("left", "3rem");

        $("img[key='cross']").css("left", "30%");

        $("#PreCustomQuestion1T-answer").attr("placeholder", "Veuillez saisir votre r\u00E9ponse ici.");
        $("#PreCustomQuestion2T-answer").attr("placeholder", "Veuillez saisir votre r\u00E9ponse ici.");
        $("#PreCustomQuestion3T-answer").attr("placeholder", "Veuillez saisir votre r\u00E9ponse ici.");
        $("#PreCustomQuestion4T-answer").attr("placeholder", "Veuillez saisir votre r\u00E9ponse ici.");
        $("#PreCustomQuestion5T-answer").attr("placeholder", "Veuillez saisir votre r\u00E9ponse ici.");

        $("#End1 .title").css("width", "80%");
        $("#End1 .title").css("margin", "0 auto");
        $("#End1 .title").css("padding-top", "10rem");
        $("#End1 .title h2").css("text-align", "");
        $("#End1 .title h2").css("line-height", "5rem");

        $("#Demographic-country").attr("placeholder", "Pays");
        $("#Demographic-city").attr("placeholder", "Ville");

        $("#CommentQuestion-comment").attr("placeholder", "Let us know if you encountered any bugs, if the instructions were unclear, or if something went wrong.");

        $("#PostCustomQuestion1T-answer").attr("placeholder", "Veuillez saisir votre r¨¦ponse ici.");
        $("#PostCustomQuestion1T-answer").attr("placeholder", "Veuillez saisir votre r¨¦ponse ici.");
        $("#PostCustomQuestion1T-answer").attr("placeholder", "Veuillez saisir votre r¨¦ponse ici.");
        $("#PostCustomQuestion1T-answer").attr("placeholder", "Veuillez saisir votre r¨¦ponse ici.");
        $("#PostCustomQuestion1T-answer").attr("placeholder", "Veuillez saisir votre r¨¦ponse ici.");

        $("#Upload .content .progress1").css("width", "95rem");
        $("#Upload .content .progress2").css("width", "95rem");
    }
}
