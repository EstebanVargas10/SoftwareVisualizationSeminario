$(document).ready(function(){
  try {
        $.ajax({
            async: true,
            crossDomain: true,
            url: "http://softwarerepositoryws.gonzalez.cr/api/SoftwareVisualization/GetAllPackageRevision?projectlongId=0002",
            type: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: false
            },
            processData: false,

            success: function (data, status) {

                getYearsFromApi(data);
            },

            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Estado de la conexión: " + textStatus + " ");
                console.log("Error de conexión: " + errorThrown + " ");
            }
        });
    } catch (err) {
        console.log("Ocurrio un error: " + err);
    }// fin catch
});
   

function getYearsFromApi(projectDates){
   var years = [];
   var exist = false;

   for(var i = 0; i<projectDates.resultado.length; i++){
          for(var j = 0; j<years.length; j++){
            if(projectDates.resultado[i].year == years[j]){
              exist = true;
            }
          }if(!exist){
            years.push(projectDates.resultado[i].year);
          }
          exist = false;
   }
   years.sort();
   makeYearsCircles(years[0], years[years.length -1], years);
   makeMonthsCircles();
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
    $("#line").append('<div class="circle" id="circle0" style="left: ' + 0 + '%;"><div class="popupSpan">' + dates[0] + '</div></div>');

    //Loop through middle dates
    for (i = 1; i < dates.length - 1; i++) {
      var thisYear = dates[i];

      //Integer representation of the date
      var thisInt = ((thisYear - first) * 30) + (thisYear - first);

      //Integer relative to the first and last dates
      var relativeInt = thisInt / lastInt;

      //Draw the date circle
      $("#line").append('<div class="circle" id="circle' + i + '" style="left: ' + relativeInt * 100 + '%;"><div class="popupSpan">' + dates[i] + '</div></div>');
    }

    //Draw the last date circle
    $("#line").append('<div class="circle" id="circle' + i + '" style="left: ' + 99 + '%;"><div class="popupSpan">' + dates[dates.length - 1] + '</div></div>');
  }

  $(".circle:first").addClass("active");
}

function makeMonthsCircles() {
  $("#line2").show();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  //Forget the timeline if there's only one date. Who needs it!?
  if (months.length < 2) {
    $("#line2").hide();
    //This is what you really want.
  } else if (months.length >= 2) {
    var relativeInt = 8;

    //Draw first date circle
    $("#line2").append('<div class="circle" id="month0" style="left: ' + 0 + '%;"><div class="popupSpan">' + months[0] + '</div></div>');

    //Loop through middle months
    for (var l = 1; l < months.length - 1; l++) {

      //Integer relative to the first and last months
      relativeInt += 8;

      //Draw the date circle
      $("#line2").append('<div class="circle" id="month' + l + '" style="left: ' + relativeInt * 100 + '%;"><div class="popupSpan">' + months[l] + '</div></div>');
    }

    //Draw the last date circle
    $("#line2").append('<div class="circle" id="month' + l + '" style="left: ' + 99 + '%;"><div class="popupSpan">' + months[months.length - 1] + '</div></div>');
  }

  $(".circle:first").addClass("active");
}

$(".circle").mouseenter(function() {
  $(this).addClass("hover");
});

$(".circle").mouseleave(function() {
  $(this).removeClass("hover");
});

$(".circle").click(function() {
  var spanNum = $(this).attr("id");
  selectDate(spanNum);
});

function selectDate(selector) {
  $selector = "#" + selector;
  $spanSelector = $selector.replace("circle", "span");
  var current = $selector.replace("circle", "");
  
  $(".active").removeClass("active");
  $($selector).addClass("active");
  
  if ($($spanSelector).hasClass("right")) {
    $(".center").removeClass("center").addClass("left")
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("right")
  } else if ($($spanSelector).hasClass("left")) {
    $(".center").removeClass("center").addClass("right");
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("left");
  }; 
};