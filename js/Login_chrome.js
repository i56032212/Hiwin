/// <reference path="Dtraining_chrome.js" />
/// <reference path="Dtraining_chrome.js" />
var serverURL = "http://140.127.22.36/Search.aspx";
var idtext, pstext, loginbt;
var idboxJQ, psboxJQ, idtxtJQ, pstxtJQ, loginJQ, boxJQ, loadingJQ, idiconJQ, psiconJQ;
var coverJQ;
var language = 0, lanselect;

window.onload = function init() {

    idtext = $("#idText")[0];
    pstext = $("#psText")[0];
    loginbt = $("#LoginButton")[0];

    idboxJQ = $("#UserID");
    psboxJQ = $("#PassWord");
    idtxtJQ = $("#idText");
    pstxtJQ = $("#psText");
    loginJQ = $("#LoginButton");
    boxJQ = $("#Box");
    loadingJQ = $("#Loading");
    idiconJQ = $("#IdIcon");
    psiconJQ = $("#PsIcon");
    coverJQ = $("#Cover");
    lanselect = $("#Language")
    setCssinit();
    setEventinit();
}

function setCssinit() {

    coverJQ.hide();
    loadingJQ.hide();
    boxJQ.css({
        "margin-left": (0 - (boxJQ.width() / 2)) + "px"
    });
    idboxJQ.css({
        "height": (boxJQ.height() / 10) + "px",
        "top": (boxJQ.height() / 3) + "px",
        "opacity": "1"
    });
    psboxJQ.css({
        "height": (boxJQ.height() / 10) + "px",
        "top": (boxJQ.height() / 3) + idboxJQ.height() * 2.2 + "px",
        "opacity": "1"
    });
    idiconJQ.css({
        "height": (idboxJQ.height() * 2) + "px",
        "top": (boxJQ.height() / 3) - idboxJQ.height() / 2 + "px",
        "opacity": "1"
    });
    psiconJQ.css({
        "height": (idboxJQ.height() * 2) + "px",
        "top": (boxJQ.height() / 3) + idboxJQ.height() * 2.2 - idboxJQ.height() / 2 + "px",
        "opacity": "1"
    });
    var tWid = { "width": boxJQ.width() - idiconJQ.width() / 1.1 };
    idboxJQ.css(tWid);
    psboxJQ.css(tWid);

    var txtS = { "font-size": idboxJQ.height() / 1.8 + "px" };
    idtxtJQ.css(txtS);
    pstxtJQ.css(txtS);
    loginJQ.css(txtS);

    loginJQ.css({
        "height": (boxJQ.height() / 2.5) + "px",
        "margin-left": (0 - (loginJQ.width() / 2)) + "px",
    });

    loadingJQ.css({
        "height": loginJQ.width() + "px",
        "width": loginJQ.width() + "px",
    });

    loadingJQ.css({
        "margin-left": (0 - (loginJQ.width() / 2) + 6) + "px",
        "opacity": "1"
    });

    setTextStr(0);

    lanselect.css({
        "opacity": "1"
    });

}

function setEventinit() {
    idtxtJQ.keydown(function () { Keydown(idtext.id); });
    pstxtJQ.keydown(function () { Keydown(pstext.id); });
    loginJQ.click(function () { Lgn(); });

    idtxtJQ.focus(function () {
        if (idtxtJQ.css("color") == "rgb(172, 172, 172)") {
            idtxtJQ.val("");
            idtxtJQ.css({ "color": "#000000" });
        }
    });

    pstxtJQ.focus(function () {
        if (pstxtJQ.css("color") == "rgb(172, 172, 172)") {
            pstxtJQ.val("");
            pstxtJQ.css({ "color": "#000000" });
            pstext.type = "password";
        }
    });

    idtxtJQ.focusout(function () {
        if (idtxtJQ.val().length == 0) Defaulttx(idtxtJQ, LoginStr["account" + language]);
        //FullScreen();
    });
    pstxtJQ.focusout(function () {
        if (pstxtJQ.val().length == 0) Defaulttx(pstxtJQ, LoginStr["password" + language]);
        if (pstxtJQ.css("color") == "rgb(172, 172, 172)") pstext.type = "text";
        //FullScreen();
    });

    lanselect.change(function () {
        language = $(this).val();
        Android.SavaLanguage(language);
    });
}

function setTextStr(lan) {
    language = lan;
    lanselect.val(lan);
    Defaulttx(idtxtJQ, LoginStr["account" + language]);
    Defaulttx(pstxtJQ, LoginStr["password" + language]);
    loginbt.value = LoginStr["login" + language];
}

function Boxreback() {
    boxJQ.css({
        "top": "50%",
    });
    coverJQ.hide();
}

function BoxupTop() {
    boxJQ.css({
        "top": "10%",
    });
    coverJQ.show();
}

function Lgn() {
    loginJQ.hide();
    loadingJQ.show();
    $.post(serverURL, { Hiwin: "tryLogin," + idtext.value + "," + pstext.value })
     .fail(function () {
         loginJQ.show();
         loadingJQ.hide();
         alert(LoginStr["unable" + language]);
         //Android.AlertDialog(LoginStr["unable" + language]);
     })
    .done(function (data) {
        var check = data.split(",");
        if (check[0] == "Logged" && check[2] == "4") {
            //Android.Logined(check[1], idtext.value, pstext.value, check[3], check[4]);
            setCookie("Account", idtext.value, 1);
            setCookie("ID", check[1], 1);
            setCookie("Permission", check[2], 1);
            setCookie("Name", check[3], 1);
            setCookie("Sex", check[4], 1);
            alert(check);
            window.location = "Listview_chrome.html";
        } else {
            loginJQ.show();
            loadingJQ.hide();
            alert(LoginStr["error" + language]);
            //Android.AlertDialog(LoginStr["error" + language]);
        }
    });
}

function Keydown(id) {
    if (event.keyCode == 13) {
        if (id == idtext.id) pstext.focus();
        if (id == pstext.id) loginbt.focus();
    }
}

function Defaulttx(text, txt) {
    text.val(txt);
    text.css({
        "color": "#acacac"
    });
}

function FullScreen() {
    Android.setUIOptions();
}
