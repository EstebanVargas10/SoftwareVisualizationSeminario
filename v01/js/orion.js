
$(document).ready(function(){
    var sideMenu = $("#sidebar-nav");
    var project;
     try {
        $.ajax({
            async: true,
            crossDomain: true,
            url: "http://softwarerepositoryws.gonzalez.cr/api/SoftwareVisualization/GetAllProjects",
            type: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: false
            },
            processData: false,

            success: function (data, status) {

                for(var i=0; i<data.resultado.length; i++){
                    project = JSON.stringify(data.resultado[i].project).replace(/"/g, '');
                    sideMenu.append('<li><a href="#">'+ project +'</a></li>');
                }
            },

            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Estado de la conexión: " + textStatus + " ");
                console.log("Error de conexión: " + errorThrown + " ");
            }
        });
    } catch (err) {
        console.log("Ocurrio un error: " + err);
    }// fin catch

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
                fillTimelineItems(data);
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

function fillTimelineItems(itemData){
    // DOM element where the Timeline will be attached
     var container = document.getElementById('visualization');

     // Create a DataSet (allows two way data-binding)
     var items = new vis.DataSet({
        type: {start: 'ISODate', end: 'ISODate' }
      });

     var dates =[];

     for(var i=0; i<200; i++){
        var apiYear = JSON.stringify(itemData.resultado[i].year);
        var apiMonth = JSON.stringify(itemData.resultado[i].month);
        var apiDay = JSON.stringify(itemData.resultado[i].day);
        dates.push({id: i, content: "item " +i, start: apiYear+"-"+apiMonth +"-"+apiDay});
     }

    items.clear();
    items.add(dates);

     // Configuration for the Timeline
     var options = {};

     // Create a Timeline
     var timeline = new vis.Timeline(container, items, options);
}