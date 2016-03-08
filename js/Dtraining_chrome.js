var serverURL = "http://140.127.22.36/Search.aspx";
var actionURL = "http://140.127.22.36/pic/Action/";
var boxJQ, htmlJQ, idJQ, loadingJQ, reloadJQ, logoutJQ, nameJQ;
var listlength, myVar;
var AccountID, Account, Name, Sex, Finished;
var separate;
var language = 0;

window.onload = function init() {
    htmlJQ = $("#Html");
    boxJQ = $("#Listbox");
    loadingJQ = $("#Loading");
    reloadJQ = $("#Reload");
    logoutJQ = $("#Logout");
    nameJQ = $("#Name");
    separate = htmlJQ.height() / 70;

    setCssinit();
    setEventinit();

    htmlJQ.css({ "opacity": "1" });

    boxJQ.append("<div id='TRID'>" + getCookie("TRID") + "</div>");
    boxJQ.append("<div id='PulseChart'></div>");
    boxJQ.append("<div id='SBPChart'></div>");
    boxJQ.append("<div id='LeftAngChart'></div>");
    boxJQ.append("<div id='RightAngChart'></div>");

    loadingJQ.show();
    reloadJQ.hide();
    getList();
    nameJQ.val(getCookie("Name"));
}

function setCssinit() {
    boxJQ.css({
        "margin-left": (0 - (boxJQ.width() / 2) - 5) + "px",
        "border-style": "solid",
        "border-color": "rgba(102, 102, 102, 0.0)",
        "border-width": "3px",
    });
}

function setEventinit() {
    reloadJQ.click(function () {
        getList();
    });
    logoutJQ.click(function () {
        window.location = "Login_chrome.html";
    })
}

function setTextLan(lan) {
    language = lan;
}

function FullScreen() {
    Android.setUIOptions();
}

function getList() {
    loadingJQ.show();
    reloadJQ.hide();
    $.post(serverURL, { Hiwin: "SelectDTraining," + getCookie("UserID") + "," + getCookie("TRID") })
     .fail(function () {
         loadingJQ.hide();
         reloadJQ.show();
     })
     .done(function (data) {
         //alert(data);
         var lines = data.split(';');

         var TRTIME = [lines.length];
         var LEFTAngX = [lines.length];
         var LEFTAngY = [lines.length];
         var RIGHTAngX = [lines.length];
         var RIGHTAngY = [lines.length];
         var PULSE = [lines.length];
         var SBP = [lines.length];
         var DBP = [lines.length];
         var OXYGEN = [lines.length];
         for (var i = 0; i < lines.length; i++) {
             var datas = lines[i].split(',');
             TRTIME[i] = datas[0];
             LEFTAngX[i] = datas[1];
             LEFTAngY[i] = datas[2];
             RIGHTAngX[i] = datas[3];
             RIGHTAngY[i] = datas[4];
             PULSE[i] = datas[5];
             SBP[i] = datas[6];
             DBP[i] = datas[7];
             OXYGEN[i] = datas[8];
         }
         drawPULSEChart(TRTIME, PULSE);
         drawSBPChart(TRTIME, SBP);
         drawLEFTAngChart(LEFTAngX, LEFTAngY);
         drawRightAngChart(RIGHTAngX, RIGHTAngY);
         loadingJQ.hide();
     });
}

function drawPULSEChart(TRTIME, PULSE) {

    var pulseline;
    var head = ["Second", "Pulse"];
    var pulse = [];
    pulse.push(head);
    for (var i = 0; i < TRTIME.length; i++) {
        pulse.push([parseFloat(TRTIME[i], 10), parseInt(PULSE[i], 10)]);
    }
    pulseline = google.visualization.arrayToDataTable(pulse);

    var options = {
        title: "Pulse Data",
        titleTextStyle: { color: "#FFFFFF" },
        legend: { position: 'none' },
        legendTextStyle: { color: "#FFFFFF" },
        colors: ["#ff4698"],
        lineWidth: 3,
        backgroundColor: "#404040",
        showRowNumber: true,
        isStacked: true,
        logScale: false,
        hAxis: {
            title: "Second",
            titleTextStyle: { color: "#FFFFFF" },
            baseLineColor: { color: "#FFFFFF" },
            gridlines: { color: "#FFFFFF" },
            textStyle: {
                color: "#FFFFFF",
                fontSize: 9
            },
            //slantedTextAngle: 90
        },
        vAxis: {
            title: "Pulse",
            titleTextStyle: { color: "#FFFFFF" },
            baseLineColor: { color: "#FFFFFF" },
            gridlines: { color: "#FFFFFF" },
            textStyle: {
                color: "#FFFFFF",
                fontSize: 9
            },
        },

    };


    var pulseChartJQ = $("#PulseChart");
    pulseChartJQ.append("<div id='pulse_'></div>");
    var pulse_ = $("#pulse_");
    pulse_.css({
        "margin-left": "20px",
        "height": pulseChartJQ.height() + "px",
        "width": pulseChartJQ.width() + "px",
    });
    var pulseChart = new google.visualization.LineChart(pulse_[0]);
    pulseChart.draw(pulseline, options);
}
    
function drawSBPChart(TRTIME, SBP) {

    var sbpline;
    var head = ["Second", "SBP"];
    var sbp = [];
    sbp.push(head);
    for (var i = 0; i < TRTIME.length; i++) {
        sbp.push([parseFloat(TRTIME[i], 10), parseInt(SBP[i], 10)]);
    }
    sbpline = google.visualization.arrayToDataTable(sbp);

    var options = {
        title: "SBP Data",
        titleTextStyle: { color: "#FFFFFF" },
        legend: { position: 'none' },
        legendTextStyle: { color: "#FFFFFF" },
        colors: ["#ff5040"],
        lineWidth: 3,
        backgroundColor: "#404040",
        showRowNumber: true,
        isStacked: true,
        logScale: false,
        hAxis: {
            title: "Second",
            titleTextStyle: { color: "#FFFFFF" },
            baseLineColor: { color: "#FFFFFF" },
            gridlines: { color: "#FFFFFF" },
            textStyle: {
                color: "#FFFFFF",
                fontSize: 9
            },
            //slantedTextAngle: 90
        },
        vAxis: {
            title: "SBP",
            titleTextStyle: { color: "#FFFFFF" },
            baseLineColor: { color: "#FFFFFF" },
            gridlines: { color: "#FFFFFF" },
            textStyle: {
                color: "#FFFFFF",
                fontSize: 9
            },
        },

    };


    var sbpChartJQ = $("#SBPChart");
    sbpChartJQ.append("<div id='sbp_'></div>");
    var sbp_ = $("#sbp_");
    sbp_.css({
        "margin-left": "20px",
        "height": sbpChartJQ.height() + "px",
        "width": sbpChartJQ.width() + "px",
    });
    var sbpChart = new google.visualization.LineChart(sbp_[0]);
    sbpChart.draw(sbpline, options);
}

function drawLEFTAngChart(LEFTAngX, LEFTAngY) {

    var leftangline;
    var head = ["LEFTAngX", "LEFTAngY"];
    var leftang = [];
    leftang.push(head);
    for (var i = 0; i < LEFTAngX.length; i++) {
        leftang.push([parseFloat(LEFTAngX[i], 10), parseFloat(LEFTAngY[i], 10)]);
    }
    leftangline = google.visualization.arrayToDataTable(leftang);

    var options = {
        title: "LEFTAng Data",
        titleTextStyle: { color: "#FFFFFF" },
        legend: { position: 'none' },
        legendTextStyle: { color: "#FFFFFF" },
        colors: ["#2f8ef6"],
        lineWidth: 2,
        backgroundColor: "#404040",
        showRowNumber: true,
        isStacked: true,
        logScale: false,
        hAxis: {
            //title: "LEFTAngX",
            titleTextStyle: { color: "#FFFFFF" },
            baseLineColor: { color: "#FFFFFF" },
            gridlines: { color: "#FFFFFF" },
            textStyle: {
                color: "#FFFFFF",
                fontSize: 7
            },
            //slantedTextAngle: 90
        },
        vAxis: {
            // title: "LEFTAngY",
            titleTextStyle: { color: "#FFFFFF" },
            baseLineColor: { color: "#FFFFFF" },
            gridlines: { color: "#FFFFFF" },
            textStyle: {
                color: "#FFFFFF",
                fontSize: 7
            },
        },

    };

    var leftangChartJQ = $("#LeftAngChart");
    leftangChartJQ.append("<div id='leftang_'></div>");
    var leftang_ = $("#leftang_");
    leftang_.css({
        "margin-left": "10px",
        "height": leftangChartJQ.height() + "px",
        "width": leftangChartJQ.width() + "px",
    });
    var leftangChart = new google.visualization.LineChart(leftang_[0]);
    leftangChart.draw(leftangline, options);
}

function drawRightAngChart(RIGHTAngX, RIGHTAngY) {

    var rightangline;
    var head = ["RIGHTAngX", "RIGHTAngY"];
    var rightang = [];
    rightang.push(head);
    for (var i = 0; i < RIGHTAngX.length; i++) {
        rightang.push([parseFloat(RIGHTAngX[i], 10), parseFloat(RIGHTAngY[i], 10)]);
    }
    rightangline = google.visualization.arrayToDataTable(rightang);

    var options = {
        title: "RIGHTAng Data",
        titleTextStyle: { color: "#FFFFFF" },
        legend: { position: 'none' },
        legendTextStyle: { color: "#FFFFFF" },
        colors: ["#2f8ef6"],
        lineWidth: 2,
        backgroundColor: "#404040",
        showRowNumber: true,
        isStacked: true,
        logScale: false,
        hAxis: {
            //title: "RIGHTAngX",
            titleTextStyle: { color: "#FFFFFF" },
            baseLineColor: { color: "#FFFFFF" },
            gridlines: { color: "#FFFFFF" },
            textStyle: {
                color: "#FFFFFF",
                fontSize: 7
            },
            //slantedTextAngle: 90
        },
        vAxis: {
            // title: "RIGHTAngY",
            titleTextStyle: { color: "#FFFFFF" },
            baseLineColor: { color: "#FFFFFF" },
            gridlines: { color: "#FFFFFF" },
            textStyle: {
                color: "#FFFFFF",
                fontSize: 7
            },
        },

    };

    var rightangChartJQ = $("#RightAngChart");
    rightangChartJQ.append("<div id='rightang_'></div>");
    var rightang_ = $("#rightang_");
    rightang_.css({
        "margin-left": "10px",
        "height": rightangChartJQ.height() + "px",
        "width": rightangChartJQ.width() + "px",
    });
    var rightangChart = new google.visualization.LineChart(rightang_[0]);
    rightangChart.draw(rightangline, options);
}