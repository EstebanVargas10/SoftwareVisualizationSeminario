
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
                    sideMenu.append('<li><a href="#" class="projects" id="project'+ data.resultado[i].projectId+'">'+ project +'</a></li>');
                }
                $('.projects').click(function() {
                    var spanNum = $(this).text();
                    $("#projectHeader").text(spanNum);
                    selectedProject = parseInt($(this).attr("id").replace('project',''));
                    getApi();
                    getApi2();
                });
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