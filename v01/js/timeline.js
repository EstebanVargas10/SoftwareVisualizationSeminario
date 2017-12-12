var originalApiInfo;
function getApi(){
  try {
        $.ajax({
            async: true,
            crossDomain: true,
            url: "http://softwarerepositoryws.gonzalez.cr/api/SoftwareVisualization/GetAllPackageRevision?projectlongId=" +selectedProject,
            type: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: false
            },
            processData: false,

            success: function (data, status) {

                 originalApiInfo = data; 
                 var years = [];
                 var exist = false;

                 for(var i = 0; i<data.resultado.length; i++){
                        for(var j = 0; j<years.length; j++){
                          if(data.resultado[i].year == years[j]){
                            exist = true;
                          }
                        }if(!exist){
                          years.push(data.resultado[i].year);
                        }
                        exist = false;
                 }
                 years.sort(function(a, b){return a-b;});
                 makeYearsCircles(years[0], years[years.length -1], years);
                 makeYearsCircles2(years[0], years[years.length -1], years);
            },

            error: function (jqXHR, textStatus, errorThrown) {
              alert("No existen fechas para ese paquete");
                console.log("Estado de la conexión: " + textStatus + " ");
                console.log("Error de conexión: " + errorThrown + " ");
            }
        });
    } catch (err) {
        console.log("Ocurrio un error: " + err);
    }// fin catch
}

//Main function. Draw your circles.
function makeYearsCircles(first, last, dates) {

  //Forget the timeline if there's only one date. Who needs it!?
  if (dates.length < 2) {
    $("#line").hide();
    //This is what you really want.
  } else if (dates.length >= 2) {

    //Integer representation of the last day. The first day is represnted as 0
    var lastInt = ((last - first) * 30) + (last - first);

    //Draw first date circle
    $("#line").append('<div class="circle circle1" id="circle0" style="left: ' + 0 + '%;"><div class="popupSpan">' + dates[0] + '</div></div>');

    //Loop through middle dates
    for (i = 1; i < dates.length - 1; i++) {
      var thisYear = dates[i];

      //Integer representation of the date
      var thisInt = ((thisYear - first) * 30) + (thisYear - first);

      //Integer relative to the first and last dates
      var relativeInt = thisInt / lastInt;

      //Draw the date circle
      $("#line").append('<div class="circle circle1" id="circle' + i + '" style="left: ' + relativeInt * 100 + '%;"><div class="popupSpan">' + dates[i] + '</div></div>');
    }

    //Draw the last date circle
    $("#line").append('<div class="circle circle1" id="circle' + (dates.length - 1) + '" style="left: ' + 99 + '%;"><div class="popupSpan">' + dates[dates.length - 1] + '</div></div>');
  }

  $(".circle:first").addClass("active");

  $(".circle").mouseenter(function() {
    $(this).addClass("hover");
  });

  $(".circle").mouseleave(function() {
    $(this).removeClass("hover");
  });

  $('.circle1').click(function() {
    var spanNum = $(this).attr('id');
    selectedYear = $(this).text();
    $("#dateSelected").text("Fecha seleccionada: "+selectedYear);
    selectDate(spanNum);
    makeMonthsCircles();
  });
}

function makeMonthsCircles() {
  $("#line2").show();
  var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  //Forget the timeline if there's only one date. Who needs it!?
  if (months.length < 2) {
    $("#line2").hide();
    //This is what you really want.
  } else if (months.length >= 2) {
    var relativeInt = 8;

    //Draw first date circle
    $("#line2").append('<div class="circle circle2" id="month0" style="left: ' + 0 + '%;"><div class="popupSpan">' + months[0] + '</div></div>');

    //Loop through middle months
    for (var l = 1; l < months.length - 1; l++) {

      //Draw the date circle
      $("#line2").append('<div class="circle circle2" id="month' + l + '" style="left: ' + l * 9 + '%;"><div class="popupSpan">' + months[l] + '</div></div>');
    }

    //Draw the last date circle
    $("#line2").append('<div class="circle circle2" id="month' + (months.length - 1) + '" style="left: ' + 99 + '%;"><div class="popupSpan">' + months[months.length - 1] + '</div></div>');
  }

  $(".circle:first").addClass("active");

  $(".circle").mouseenter(function() {
    $(this).addClass("hover");
  });

  $(".circle").mouseleave(function() {
    $(this).removeClass("hover");
  });

  $(".circle2").click(function() {
    var spanNum = $(this).attr("id");
    selectedMonth = parseInt($(this).attr("id").replace('month',''));
    selectedMonth = selectedMonth + 1;
    $("#dateSelected").text("Fecha seleccionada: "+selectedMonth+"/"+selectedYear);
    selectDate(spanNum);
    getApiDays();
  });
}

function getApiDays(){
  $("#line3").show();
   var days = [];
   var exist = false;

   for(var i = 0; i<originalApiInfo.resultado.length; i++){
    if(originalApiInfo.resultado[i].year == selectedYear && originalApiInfo.resultado[i].month == selectedMonth){
      for(var j = 0; j<days.length; j++){
            if(originalApiInfo.resultado[i].day == days[j]){
              exist = true;
            }
          }if(!exist){
            days.push(originalApiInfo.resultado[i].day);
          }
          exist = false;
    }
   }
   days.sort(function(a, b){return a-b;});
   makeDaysCircles(days[0], days[days.length -1], days);
}

function makeDaysCircles(firstDay, lastDay, days){
  //Forget the timeline if there's only one date. Who needs it!?
  if (days.length < 2) {
    $("#line3").hide();
    //This is what you really want.
  } else if (days.length >= 2) {

    //Integer representation of the last day. The first day is represnted as 0
    var lastInt = ((lastDay - firstDay) * 30) + (lastDay - firstDay);

    //Draw first date circle
    $("#line3").append('<div class="circle circle3" id="day"'+days[0]+ ' style="left: ' + 0 + '%;"><div class="popupSpan">' + days[0] + '</div></div>');

    //Loop through middle dates
    for (i = 1; i < days.length - 1; i++) {
      var thisDay = days[i];

      //Integer representation of the date
      var thisInt = ((thisDay - firstDay) * 30) + (thisDay - firstDay);

      //Integer relative to the first and last dates
      var relativeInt = thisInt / lastInt;

      //Draw the date circle
      $("#line3").append('<div class="circle circle3" id="day' + days[i] + '" style="left: ' + relativeInt * 100 + '%;"><div class="popupSpan">' + days[i] + '</div></div>');
    }

    //Draw the last date circle
    $("#line3").append('<div class="circle circle3" id="day' + days[days.length - 1] + '" style="left: ' + 99 + '%;"><div class="popupSpan">' + days[days.length - 1] + '</div></div>');
  }

  $(".circle:first").addClass("active");

  $(".circle").mouseenter(function() {
    $(this).addClass("hover");
  });

  $(".circle").mouseleave(function() {
    $(this).removeClass("hover");
  });

  $(".circle3").click(function() {
    var spanNum = $(this).attr("id");
    selectedDay = parseInt($(this).attr("id").replace('day',''));
    $("#dateSelected").text("Fecha seleccionada: "+selectedDay+"/"+selectedMonth+"/"+selectedYear);
    selectDate(spanNum);
    $("#overview1").text("Vista General | "+selectedDay + "/"+selectedMonth +"/"+selectedYear);
    $("#details1").text("Vista Detallada | "+selectedDay + "/"+selectedMonth +"/"+selectedYear);
    getApiRevisions();
  });
}

function getApiRevisions(){
  $("#line4").show();
   var revisions = [];
   var exist = false;

   for(var i = 0; i<originalApiInfo.resultado.length; i++){
    if(originalApiInfo.resultado[i].year == selectedYear && originalApiInfo.resultado[i].month == selectedMonth && originalApiInfo.resultado[i].day == selectedDay){
      for(var j = 0; j<revisions.length; j++){
            if(originalApiInfo.resultado[i].revision == revisions[j]){
              exist = true;
            }
          }if(!exist){
            revisions.push(originalApiInfo.resultado[i].revision);
          }
          exist = false;
    }
   }
   makeRevisionsCircles(revisions);
}

function makeRevisionsCircles(revisions){
  //Forget the timeline if there's only one date. Who needs it!?
  if (revisions.length < 2) {
    $("#line4").hide();
    //This is what you really want.
  } else if (revisions.length >= 2) {

    //Integer representation of the last day. The first day is represnted as 0
    var firstDay = 1;
    var lastDay = revisions.length;
    var lastInt = ((lastDay - firstDay) * 30) + (lastDay - firstDay);

    //Draw first date circle
    $("#line4").append('<div class="circle circle4" id="revision0" style="left: ' + 0 + '%;"><div class="popupSpan">' + revisions[0] + '</div></div>');

    //Loop through middle dates
    for (i = 1; i < revisions.length - 1; i++) {
      var thisDay = i;

      //Integer representation of the date
      var thisInt = ((thisDay - firstDay) * 30) + (thisDay - firstDay);

      //Integer relative to the first and last dates
      var relativeInt = thisInt / lastInt;

      //Draw the date circle
      $("#line4").append('<div class="circle circle4" id="revision' + i + '" style="left: ' + relativeInt * 100 + '%;"><div class="popupSpan">' + revisions[i] + '</div></div>');
    }

    //Draw the last date circle
    $("#line4").append('<div class="circle circle4" id="revision' + (revisions.length - 1) + '" style="left: ' + 99 + '%;"><div class="popupSpan">' + revisions[revisions.length - 1] + '</div></div>');
  }

  $(".circle:first").addClass("active");

  $(".circle").mouseenter(function() {
    $(this).addClass("hover");
  });

  $(".circle").mouseleave(function() {
    $(this).removeClass("hover");
  });

  $(".circle4").click(function() {
    var spanNum = $(this).attr("id");
    selectedRevision = parseInt($(this).text());
    getTreemapPackagesApi();
    selectDate(spanNum);
  });
}

function selectDate(selector) {
  $selector = "#" + selector;
  $spanSelector = $selector.replace("circle", "span");
  var current = $selector.replace("circle", "");
  
  $(".active").removeClass("active");
  $($selector).addClass("active");
  
  if ($($spanSelector).hasClass("right")) {
    $(".center").removeClass("center").addClass("left");
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("right");
  } else if ($($spanSelector).hasClass("left")) {
    $(".center").removeClass("center").addClass("right");
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("left");
  } 
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Main function. Draw your circles.
function makeYearsCircles2(first, last, dates) {

  //Forget the timeline if there's only one date. Who needs it!?
  if (dates.length < 2) {
    $("#lineB").hide();
    //This is what you really want.
  } else if (dates.length >= 2) {

    //Integer representation of the last day. The first day is represnted as 0
    var lastInt = ((last - first) * 30) + (last - first);

    //Draw first date circle
    $("#lineB").append('<div class="circle2b circleb1" id="circleb0" style="left: ' + 0 + '%;"><div class="popupSpan2">' + dates[0] + '</div></div>');

    //Loop through middle dates
    for (i = 1; i < dates.length - 1; i++) {
      var thisYear = dates[i];

      //Integer representation of the date
      var thisInt = ((thisYear - first) * 30) + (thisYear - first);

      //Integer relative to the first and last dates
      var relativeInt = thisInt / lastInt;

      //Draw the date circle
      $("#lineB").append('<div class="circle2b circleb1" id="circleb' + i + '" style="left: ' + relativeInt * 100 + '%;"><div class="popupSpan2">' + dates[i] + '</div></div>');
    }

    //Draw the last date circle
    $("#lineB").append('<div class="circle2b circleb1" id="circleb' + (dates.length - 1) + '" style="left: ' + 99 + '%;"><div class="popupSpan2">' + dates[dates.length - 1] + '</div></div>');
  }

  $(".circle2b:first").addClass("active");

  $(".circle2b").mouseenter(function() {
    $(this).addClass("hover");
  });

  $(".circle2b").mouseleave(function() {
    $(this).removeClass("hover");
  });

  $('.circleb1').click(function() {
    var spanNum = $(this).attr('id');
    selectedYear2 = $(this).text();
    $("#dateSelectedB").text("Fecha seleccionada: "+selectedYear2);
    selectDate2(spanNum);
    makeMonthsCircles2();
  });
}

function makeMonthsCircles2() {
  $("#lineB2").show();
  var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  //Forget the timeline if there's only one date. Who needs it!?
  if (months.length < 2) {
    $("#lineB2").hide();
    //This is what you really want.
  } else if (months.length >= 2) {
    var relativeInt = 8;

    //Draw first date circle
    $("#lineB2").append('<div class="circle2b circleb2" id="monthb0" style="left: ' + 0 + '%;"><div class="popupSpan2">' + months[0] + '</div></div>');

    //Loop through middle months
    for (var l = 1; l < months.length - 1; l++) {

      //Draw the date circle
      $("#lineB2").append('<div class="circle2b circleb2" id="monthb' + l + '" style="left: ' + l * 9 + '%;"><div class="popupSpan2">' + months[l] + '</div></div>');
    }

    //Draw the last date circle
    $("#lineB2").append('<div class="circle2b circleb2" id="monthb' + (months.length - 1) + '" style="left: ' + 99 + '%;"><div class="popupSpan2">' + months[months.length - 1] + '</div></div>');
  }

  $(".circle2b:first").addClass("active");

  $(".circle2b").mouseenter(function() {
    $(this).addClass("hover");
  });

  $(".circle2b").mouseleave(function() {
    $(this).removeClass("hover");
  });

  $(".circleb2").click(function() {
    var spanNum = $(this).attr("id");
    selectedMonth2 = parseInt($(this).attr("id").replace('monthb',''));
    selectedMonth2 = selectedMonth2 + 1;
    $("#dateSelectedB").text("Fecha seleccionada: "+selectedMonth2+"/"+selectedYear2);
    selectDate2(spanNum);
    getApiDays2();
  });
}

function getApiDays2(){
  $("#lineB3").show();
   var days = [];
   var exist = false;

   for(var i = 0; i<originalApiInfo.resultado.length; i++){
    if(originalApiInfo.resultado[i].year == selectedYear2 && originalApiInfo.resultado[i].month == selectedMonth2){
      for(var j = 0; j<days.length; j++){
            if(originalApiInfo.resultado[i].day == days[j]){
              exist = true;
            }
          }if(!exist){
            days.push(originalApiInfo.resultado[i].day);
          }
          exist = false;
    }
   }
   days.sort(function(a, b){return a-b;});
   makeDaysCircles2(days[0], days[days.length -1], days);
}

function makeDaysCircles2(firstDay, lastDay, days){
  //Forget the timelineB if there's only one date. Who needs it!?
  if (days.length < 2) {
    $("#lineB3").hide();
    //This is what you really want.
  } else if (days.length >= 2) {

    //Integer representation of the last day. The first day is represnted as 0
    var lastInt = ((lastDay - firstDay) * 30) + (lastDay - firstDay);

    //Draw first date circle
    $("#lineB3").append('<div class="circle2b circleb3" id="dayb"'+days[0]+' style="left: ' + 0 + '%;"><div class="popupSpan2">' + days[0] + '</div></div>');

    //Loop through middle dates
    for (i = 1; i < days.length - 1; i++) {
      var thisDay = days[i];

      //Integer representation of the date
      var thisInt = ((thisDay - firstDay) * 30) + (thisDay - firstDay);

      //Integer relative to the first and last dates
      var relativeInt = thisInt / lastInt;

      //Draw the date circle
      $("#lineB3").append('<div class="circle2b circleb3" id="dayb' + days[i] + '" style="left: ' + relativeInt * 100 + '%;"><div class="popupSpan2">' + days[i] + '</div></div>');
    }

    //Draw the last date circle
    $("#lineB3").append('<div class="circle2b circleb3" id="dayb' + days[days.length - 1] + '" style="left: ' + 99 + '%;"><div class="popupSpan2">' + days[days.length - 1] + '</div></div>');
  }

  $(".circle2b:first").addClass("active");

  $(".circle2b").mouseenter(function() {
    $(this).addClass("hover");
  });

  $(".circle2b").mouseleave(function() {
    $(this).removeClass("hover");
  });

  $(".circleb3").click(function() {
    var spanNum = $(this).attr("id");
    selectedDay2 = parseInt($(this).attr("id").replace('dayb',''));
    selectedDay2 = selectedDay2 + 1;
    $("#dateSelectedB").text("Fecha seleccionada: "+selectedDay2+"/"+selectedMonth2+"/"+selectedYear2);
    selectDate2(spanNum);
    $("#overview2").text("Vista General B | "+selectedDay2 + "/"+selectedMonth2 +"/"+selectedYear2);
    $("#details2").text("Vista Detallada B | "+selectedDay2 + "/"+selectedMonth2 +"/"+selectedYear2);
    getApiRevisions2();
  });
}

function getApiRevisions2(){
  $("#lineB4").show();
   var revisions = [];
   var exist = false;

   for(var i = 0; i<originalApiInfo.resultado.length; i++){
    if(originalApiInfo.resultado[i].year == selectedYear2 && originalApiInfo.resultado[i].month == selectedMonth2 && originalApiInfo.resultado[i].day == selectedDay2){
      for(var j = 0; j<revisions.length; j++){
            if(originalApiInfo.resultado[i].revision == revisions[j]){
              exist = true;
            }
          }if(!exist){
            revisions.push(originalApiInfo.resultado[i].revision);
          }
          exist = false;
    }
   }
   makeRevisionsCircles2(revisions);
}

function makeRevisionsCircles2(revisions){
  //Forget the timelineB if there's only one date. Who needs it!?
  if (revisions.length < 2) {
    $("#lineB4").hide();
    //This is what you really want.
  } else if (revisions.length >= 2) {

    //Integer representation of the last day. The first day is represnted as 0
    var firstDay = 1;
    var lastDay = revisions.length;
    var lastInt = ((lastDay - firstDay) * 30) + (lastDay - firstDay);

    //Draw first date circle
    $("#lineB4").append('<div class="circle2b circleb4" id="revisionb0" style="left: ' + 0 + '%;"><div class="popupSpan2">' + revisions[0] + '</div></div>');

    //Loop through middle dates
    for (i = 1; i < revisions.length - 1; i++) {
      var thisDay = i;

      //Integer representation of the date
      var thisInt = ((thisDay - firstDay) * 30) + (thisDay - firstDay);

      //Integer relative to the first and last dates
      var relativeInt = thisInt / lastInt;

      //Draw the date circle
      $("#lineB4").append('<div class="circle2b circleb4" id="revisionb' + i + '" style="left: ' + relativeInt * 100 + '%;"><div class="popupSpan2">' + revisions[i] + '</div></div>');
    }

    //Draw the last date circle
    $("#lineB4").append('<div class="circle2b circleb4" id="revisionb' + (revisions.length - 1) + '" style="left: ' + 99 + '%;"><div class="popupSpan2">' + revisions[revisions.length - 1] + '</div></div>');
  }

  $(".circle2b:first").addClass("active");

  $(".circle2b").mouseenter(function() {
    $(this).addClass("hover");
  });

  $(".circle2b").mouseleave(function() {
    $(this).removeClass("hover");
  });

  $(".circleb4").click(function() {
    var spanNum = $(this).attr("id");
    selectedRevision2 = parseInt($(this).text());
    getTreemapPackagesApi2();
    selectDate2(spanNum);
  });
}

function selectDate2(selector) {
  $selector = "#" + selector;
  $spanSelector = $selector.replace("circle2b", "span");
  var current = $selector.replace("circle2b", "");
  
  $(".active").removeClass("active");
  $($selector).addClass("active");
  
  if ($($spanSelector).hasClass("right")) {
    $(".center").removeClass("center").addClass("left");
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("right");
  } else if ($($spanSelector).hasClass("left")) {
    $(".center").removeClass("center").addClass("right");
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("left");
  } 
}