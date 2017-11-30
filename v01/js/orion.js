
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
                    sideMenu.append('<li><a href="#" onClick=setProjectHeader('+project+')>'+ project +'</a></li>');
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
});

function getActualDate(){
     var today = new Date();
     var dd = today.getDate();
     var mm = today.getMonth()+1; //January is 0!
     var yyyy = today.getFullYear();

     if(dd<10) {
         dd = '0'+dd;
     } 

     if(mm<10) {
         mm = '0'+mm;
     } 

     today = mm + '/' + dd + '/' + yyyy;

     return today;
}

function setProjectHeader(){

}