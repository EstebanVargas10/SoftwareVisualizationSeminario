
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
    
    // DOM element where the Timeline will be attached
     var container = document.getElementById('visualization');

     // Create a DataSet (allows two way data-binding)
     var items = new vis.DataSet([
       {id: 1, content: 'item 1', start: '2017-04-20'},
       {id: 2, content: 'item 2', start: '2017-04-14'},
       {id: 3, content: 'item 3', start: '2017-04-18'},
       {id: 4, content: 'item 4', start: '2017-04-16'},
       {id: 5, content: 'item 5', start: '2017-04-25'},
       {id: 6, content: 'item 6', start: '2018-04-27'}
     ]);

     // Configuration for the Timeline
     var options = {};

     // Create a Timeline
     var timeline = new vis.Timeline(container, items, options);
});