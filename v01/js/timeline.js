var originalApiInfo;
function getApi(){
  try {
        $.ajax({
            async: true,
            crossDomain: true,
            url: "http://softwarerepositoryws.gonzalez.cr/api/SoftwareVisualization/GetAllPackageRevision?projectlongId=000" +selectedProject,
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
    $("#line3").append('<div class="circle circle3" id="day0" style="left: ' + 0 + '%;"><div class="popupSpan">' + days[0] + '</div></div>');

    //Loop through middle dates
    for (i = 1; i < days.length - 1; i++) {
      var thisDay = days[i];

      //Integer representation of the date
      var thisInt = ((thisDay - firstDay) * 30) + (thisDay - firstDay);

      //Integer relative to the first and last dates
      var relativeInt = thisInt / lastInt;

      //Draw the date circle
      $("#line3").append('<div class="circle circle3" id="day' + i + '" style="left: ' + relativeInt * 100 + '%;"><div class="popupSpan">' + days[i] + '</div></div>');
    }

    //Draw the last date circle
    $("#line3").append('<div class="circle circle3" id="day' + (days.length - 1) + '" style="left: ' + 99 + '%;"><div class="popupSpan">' + days[days.length - 1] + '</div></div>');
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
    selectedDay = selectedDay + 1;
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
    getTreemapPackagesApi2();
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