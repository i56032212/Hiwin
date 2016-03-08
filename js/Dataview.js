function showData(dtshowbt, dtbox, actid, dtsed, type, finish) {
    dtshowbt.empty();
    dtshowbt.append("-");
    /*dtbox.animate({
        height: listboxJQ.height() - separate * 2
    }, 300);*/


    dtsed.css({ "height": listboxJQ.height() - separate * 2 - 6 - dtshowbt.height() * 2 + "px" });

    var dttitle = $("#dttitle" + actid);
    if (dttitle.attr('id') == undefined) {
        dtsed.append("<div id='dttitle" + actid + "'>" +
                        "<img src='img/dttitle_icon.png' style='height:" + dtbox.height() / 4 + "px; margin-right:10px;'/>" +
                        DataviewStr["record" + language] +
                     "</div>");
        dttitle = $("#dttitle" + actid);
        dttitle.css({
            "height": dtbox.height() / 4 + "px",
            "margin-top": separate + "px",
            "margin-left": separate + "px",
            "margin-right": separate + "px",
            "font-size": dtbox.height() / 6 + "px",
            "vertical-align": "top",
        });

        dtsed.append("<div id='dtgraph" + actid + "'></div>");
        var dtgraph = $("#dtgraph" + actid);
        dtgraph.css({
            "height": dtbox.height() * 2 - dttitle.height() - separate + "px",
            "margin-top": separate + "px",
            "margin-left": separate + "px",
            "margin-right": separate + "px",
            "border-style": "solid",
            "border-color": "rgba(255, 255, 255, 0.0)",
            "border-width": "3px",
            "overflow": "hidden"
            //"opacity": "0"
        });
        createGraphLoadEvent(dtgraph, actid, type, finish);

        dtsed.append("<div id='dtmsg" + actid + "'></div>");
        var dtmsg = $("#dtmsg" + actid);
        dtmsg.css({
            "height": separate + dtbox.height() + "px",
            "margin-top": separate + "px",
            "margin-left": separate + "px",
            "margin-right": separate + "px",
            "border-style": "solid",
            "border-color": "rgba(255, 255, 255, 0.0)",
            "border-width": "3px",
            "overflow": "auto"
            //"opacity": "0"
        });
        //dtgraph.animate({ opacity: 1 }, 300);
        //dtmsg.animate({ opacity: 1 }, 300);
        createMsgLoadEvent(dtmsg, actid);
    } else {
        var dtmsg = $("#dtmsg" + actid);
        var dtgraph = $("#dtgraph" + actid);
        var dttitle = $("#dttitle" + actid);
        dtmsg.show();
        dtgraph.show();
        dttitle.show();
        //dtgraph.animate({ opacity: 1 }, 300);
        //dtmsg.animate({ opacity: 1 }, 300);
    }
    dtbox.css({ "height": listboxJQ.height() - separate * 2 - 6 + "px" });

}

function createGraphLoadEvent(dtgraph, actid, type, finish) {

    dtgraph.append("<img id='dtgraph_loading" + actid + "' src='img/loading.gif' />");
    dtgraph.append("<img id='dtgraph_reload" + actid + "' src='img/reload.png' />");
    var dtgphlding = $("#dtgraph_loading" + actid);
    var dtgphreld = $("#dtgraph_reload" + actid);
    var dtgph_size = {
        "z-index": "3",
        "height": dtgraph.width() / 10 + "px",
        "width": dtgraph.width() / 10 + "px",
    };
    dtgphlding.css(dtgph_size);
    dtgphreld.css(dtgph_size);
    dtgphlding.css({
        "margin-left": dtgraph.width() / 2 - dtgphlding.width() / 2 + "px",
        "margin-top": dtgraph.height() / 2 - dtgphlding.height() / 2 + "px"
    });
    dtgphreld.css({
        "margin-left": dtgraph.width() / 2 - dtgphreld.width() / 2 + "px",
        "margin-top": dtgraph.height() / 2 - dtgphreld.height() / 2 + "px"
    });
    dtgphreld.hide();
    dtgphreld.click(function () {
        google.setOnLoadCallback(getChart(dtgraph, actid, dtgphlding, dtgphreld, type, finish));
    });
    google.setOnLoadCallback(getChart(dtgraph, actid, dtgphlding, dtgphreld, type, finish));
}

function createMsgLoadEvent(dtmsg, actid) {
    dtmsg.append("<img id='dtmsg_loading" + actid + "' src='img/loading.gif' />");
    dtmsg.append("<img id='dtmsg_reload" + actid + "' src='img/reload.png' />");
    var dtmsghlding = $("#dtmsg_loading" + actid);
    var dtmsgreld = $("#dtmsg_reload" + actid);
    var dtmsg_size = {
        "z-index": "3",
        "height": dtmsg.width() / 10 + "px",
        "width": dtmsg.width() / 10 + "px",
    };
    dtmsghlding.css(dtmsg_size);
    dtmsgreld.css(dtmsg_size);
    dtmsghlding.css({
        "margin-left": dtmsg.width() / 2 - dtmsghlding.width() / 2 + "px",
        "margin-top": dtmsg.height() / 2 - dtmsghlding.height() / 2 + "px"
    });
    dtmsgreld.css({
        "margin-left": dtmsg.width() / 2 - dtmsgreld.width() / 2 + "px",
        "margin-top": dtmsg.height() / 2 - dtmsgreld.height() / 2 + "px"
    });
    dtmsgreld.hide();
    dtmsgreld.click(function () {
        getAdvice(dtmsg, actid, dtmsghlding, dtmsgreld);
    });
    getAdvice(dtmsg, actid, dtmsghlding, dtmsgreld);
}


function getAdvice(dtmsg, actid, dtmsghlding, dtmsgreld) {
    dtmsghlding.show();
    dtmsgreld.hide();
    $.post(serverURL, { Hiwin: "getAdvice," + AccountID + "," + actid })
     .fail(function () {
         dtmsghlding.hide();
         dtmsgreld.show();
         Android.Toast(DataviewStr["advicerr" + language]);
     })
     .done(function (data) {
         var lines = data.split(';');
         for (var i = 0; i < lines.length - 1; i++) {
             var datas = lines[i].split(',');
             dtmsg.append("<div id='dtmsg" + actid + i + "'></div>");
             var dtmsgdiv = $("#dtmsg" + actid + i);
             dtmsgdiv.css({
                 "height": htmlJQ.height() / 30 + "px",
                 "font-size": htmlJQ.height() / 50 + "px",
                 "line-height": htmlJQ.height() / 30 + "px",
                 "font-family": "微軟正黑體",
                 "font-weight": "800",
                 "border-style": "solid",
                 "border-width": "0 0 " + (htmlJQ.height() / 30) / 8 + "px 0",
                 "border-color": "#FFFFFF",
                 "margin-top": "1%",
                 "position": "relative"
             });
             dtmsgdiv.append("<div class='dtMsgLine' style='border-width:0px 0px " +
                            (htmlJQ.height() / 30) / 8 + "px " +
                            (htmlJQ.height() / 30) / 8 + "px; height:" +
                            (htmlJQ.height() / 30) / 4 + "px;'></div>" +
                             "<img src='img/dtmsg_icon.png' class='dtMsgIcon'/>" +
                             "<div class='dtMsgDate'>" + datas[1] + "</div>" +
                             "<div class='dtMsgData'>" + datas[0] + "</div>"
              );
         }
         dtmsghlding.hide();
     });
}

function getChart(dtgraph, actid, dtgphlding, dtgphreld, type, finish) {
    //2015/07/02,10;2015/07/04,15;2015/07/06,30;2015/07/09,50;
    dtgphlding.show();
    dtgphreld.hide();
    var direct;
    var xyz;
    if (type == 4 && finish == "True") {
        direct = "getRehabilitationXYZD," + actid;
        xyz = true;
    } else {
        direct = "getRehabilitationData," + AccountID + "," + actid;
    }

    $.post(serverURL, { Hiwin: direct })
     .fail(function () {
         dtgphlding.hide();
         dtgphreld.show();
         Android.Toast(DataviewStr["charterr" + language]);
     })
     .done(function (data) {
         dtgraph.append("<div id='chart" + actid + "'></div>");

         var title = DataviewStr["record" + language];
         var name = DataviewStr["minute" + language];
         var xtext = DataviewStr["date" + language];
         var ytext = DataviewStr["time" + language];
         var aa = [];
         var count = 0;
         var bb = [];
         var head;
         var detail;
         var line1;

         if (xyz) {
             var lines = data.split("#");
             var xs = [];
             head = [name, "X", "Y", "Z"];
             xs.push(head);
             for (var i = 0; i < lines.length; i++) {
                 var strs = lines[i].split(";");
                 xs.push([i, parseInt(strs[0], 10),
                             parseInt(strs[1], 10),
                             parseInt(strs[2], 10)]);

             }
             line1 = google.visualization.arrayToDataTable(xs);
         } else {
             head = [name, "minute"];
             aa.push(head);
             detail = data.substring(0, data.length - 1).split(";");
             for (var i = 0; i < detail.length; i++) {
                 bb = [];
                 var ee = detail[i].split(",");
                 bb[0] = ee[0];
                 bb[1] = parseInt(ee[1]);
                 aa.push(bb);
             }
             line1 = google.visualization.arrayToDataTable(aa);
         }




         var options = {
             title: title,
             titleTextStyle: { color: "#FFFFFF" },
             legend: { position: 'bottom' },
             legendTextStyle:{color:"#FFFFFF"},
             colors: ["#FF8800", "#00DD00", "#00FFFF"],
             lineWidth: 2,
             backgroundColor: "#404040",
             showRowNumber: true,
             isStacked: true,
             logScale: false,
             hAxis: {
                 title: xtext,
                 titleTextStyle: { color: "#FFFFFF" },
                 baseLineColor: { color: "#FFFFFF" },
                 gridlines: { color: "#FFFFFF" },
                 textStyle: {
                     color: "#FFFFFF",
                     fontSize: 10
                 },
                 //slantedTextAngle: 90
             },
             vAxis: {
                 title: ytext,
                 titleTextStyle: { color: "#FFFFFF" },
                 baseLineColor: { color: "#FFFFFF" },
                 gridlines: { color: "#FFFFFF" },
                 textStyle: {
                     color: "#FFFFFF",
                     fontSize: 10
                 },
             },

         };

         var chartJQ = $("#chart" + actid);
         chartJQ.css({
             "margin-left": -separate + "px",
             "height": dtgraph.height() + "px",
             "width": dtgraph.width() + separate * 3 + "px",
         });

         var chart = new google.visualization.LineChart(chartJQ[0]);

         chart.draw(line1, options);

         dtgphlding.hide();
     });
}

function closeData(dtshowbt, dtbox, actid, dtsed) {
    var dtmsg = $("#dtmsg" + actid);
    var dtgraph = $("#dtgraph" + actid);
    var dttitle = $("#dttitle" + actid);

    dtmsg.hide();
    dtgraph.hide();
    dttitle.hide();
    //dtgraph.animate({ opacity: 0 }, 300);
    //dtmsg.animate({ opacity: 0 }, 300);
    dtshowbt.empty();
    dtshowbt.append("+");
    /*dtbox.animate({
        height: ((listboxJQ.height() - separate * 2) / 5 - separate)
    }, 300);*/

    dtbox.css({ "height": ((listboxJQ.height() - separate) / 4 - separate - 6) + "px" });

    dtsed.css({ "height": (dtbox.height() / 6) * 4 + "px" });
}