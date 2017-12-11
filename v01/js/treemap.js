
function getTreemapPackagesApi(){
    try {
          $.ajax({
              async: true,
              crossDomain: true,
              url: "http://softwarerepositoryws.gonzalez.cr/api/SoftwareVisualization/GetPackagesByRevision?revisionId=000"+selectedProject+"0000"+selectedRevision,
              type: 'GET',
              dataType: 'json',
              xhrFields: {
                  withCredentials: false
              },
              processData: false,

              success: function (data, status) {

                   for(var i = 0; i<data.resultado.length; i++){
                          delete data.resultado[i].packagelongId;
                   }
                   
                   drawChart(data);
              },

              error: function (jqXHR, textStatus, errorThrown) {
                  alert("No existen paquetes para esa revision");
                  console.log("Estado de la conexión: " + textStatus + " ");
                  console.log("Error de conexión: " + errorThrown + " ");
              }
          });
      } catch (err) {
          console.log("Ocurrio un error: " + err);
      }// fin catch
  }

function drawChart(treemapData) {
var treemap1 = new google.visualization.DataTable();
treemap1.addColumn('string', 'ID');
treemap1.addColumn('string', 'Parent');
treemap1.addColumn('number', 'Number Of Lines');

for(var i = 0; i<treemapData.resultado.length; i++){
  if(i === 0){
      treemap1.addRows([['Revision ' +selectedRevision, null, 0]]);
  }else {
      treemap1.addRows([[treemapData.resultado[i].package, 'Revision ' +selectedRevision, treemapData.resultado[i].children]]);
  }
}
var tree = new google.visualization.TreeMap(document.getElementById('chart_div'));

var options = {
  highlightOnMouseOver: true,
  maxDepth: 1,
  maxPostDepth: 2,
  minHighlightColor: '#8c6bb1',
  midHighlightColor: '#9ebcda',
  maxHighlightColor: '#edf8fb',
  minColor: '#009688',
  midColor: '#f7f7f7',
  maxColor: '#ee8100',
  headerHeight: 15,
  showScale: true,
  height: 500,
  useWeightedAverageForAggregation: true
};

  tree.draw(treemap1, options);
  google.visualization.events.addListener(tree, 'select', findPackageId);
  function findPackageId() {
    var row = tree.getSelection()[0].row;
    selectedPackage = row;
    getTreemapFilesApi();
  }
}

function getTreemapFilesApi(){
    try {
          $.ajax({
              async: true,
              crossDomain: true,
              url: "http://softwarerepositoryws.gonzalez.cr/api/SoftwareVisualization/uspGetFilesByPackage?packagelongId=000"+selectedProject+"0000"+selectedRevision+"0000" + selectedPackage,
              type: 'GET',
              dataType: 'json',
              xhrFields: {
                  withCredentials: false
              },
              processData: false,

              success: function (data, status) {

                   for(var i = 0; i<data.resultado.length; i++){
                          delete data.resultado[i].filelongId;
                          delete data.resultado[i].fileId;
                          delete data.resultado[i].path;
                          delete data.resultado[i].action;
                   }
                   
                   drawChart2(data);
                   
              },

              error: function (jqXHR, textStatus, errorThrown) {
                alert("No existen archivos en ese paquete");
                  console.log("Estado de la conexión: " + textStatus + " ");
                  console.log("Error de conexión: " + errorThrown + " ");
              }
          });
      } catch (err) {
          console.log("Ocurrio un error: " + err);
      }// fin catch
  }

function drawChart2(treemapData) {
var data = new google.visualization.DataTable();
data.addColumn('string', 'ID');
data.addColumn('string', 'Parent');
data.addColumn('number', 'Number Of Lines');

for(var i = 0; i<treemapData.resultado.length; i++){
  if(i === 0){
      data.addRows([['Package '+selectedPackage , null, 0]]);
  }else {
      data.addRows([[treemapData.resultado[i].fileName, 'Package '+selectedPackage, 1]]);
  }
}

var tree = new google.visualization.TreeMap(document.getElementById('chart_div2'));

var options = {
  highlightOnMouseOver: true,
  maxDepth: 1,
  maxPostDepth: 2,
  minHighlightColor: '#8c6bb1',
  midHighlightColor: '#9ebcda',
  maxHighlightColor: '#edf8fb',
  minColor: '#009688',
  midColor: '#f7f7f7',
  maxColor: '#ee8100',
  headerHeight: 15,
  showScale: true,
  height: 500,
  useWeightedAverageForAggregation: true
};

  tree.draw(data, options);
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

function getTreemapPackagesApi2(){
    try {
          $.ajax({
              async: true,
              crossDomain: true,
              url: "http://softwarerepositoryws.gonzalez.cr/api/SoftwareVisualization/GetPackagesByRevision?revisionId=000"+selectedProject+"0000"+selectedRevision,
              type: 'GET',
              dataType: 'json',
              xhrFields: {
                  withCredentials: false
              },
              processData: false,

              success: function (data, status) {

                   for(var i = 0; i<data.resultado.length; i++){
                          delete data.resultado[i].packagelongId;
                   }
                   
                   drawChart3(data);
              },

              error: function (jqXHR, textStatus, errorThrown) {
                  alert("No existen paquetes para esa revision");
                  console.log("Estado de la conexión: " + textStatus + " ");
                  console.log("Error de conexión: " + errorThrown + " ");
              }
          });
      } catch (err) {
          console.log("Ocurrio un error: " + err);
      }// fin catch
  }

function drawChart3(treemapData) {
var treemap1 = new google.visualization.DataTable();
treemap1.addColumn('string', 'ID');
treemap1.addColumn('string', 'Parent');
treemap1.addColumn('number', 'Number Of Lines');

for(var i = 0; i<treemapData.resultado.length; i++){
  if(i === 0){
      treemap1.addRows([['Revision ' +selectedRevision, null, 0]]);
  }else {
      treemap1.addRows([[treemapData.resultado[i].package, 'Revision ' +selectedRevision, treemapData.resultado[i].children]]);
  }
}
var tree = new google.visualization.TreeMap(document.getElementById('chart_div3'));

var options = {
  highlightOnMouseOver: true,
  maxDepth: 1,
  maxPostDepth: 2,
  minHighlightColor: '#8c6bb1',
  midHighlightColor: '#9ebcda',
  maxHighlightColor: '#edf8fb',
  minColor: '#009688',
  midColor: '#f7f7f7',
  maxColor: '#ee8100',
  headerHeight: 15,
  showScale: true,
  height: 500,
  useWeightedAverageForAggregation: true
};

  tree.draw(treemap1, options);
  google.visualization.events.addListener(tree, 'select', findPackageId2);
  function findPackageId2() {
    var row = tree.getSelection()[0].row;
    selectedPackage = row;
    getTreemapFilesApi2();
  }
}

function getTreemapFilesApi2(){
    try {
          $.ajax({
              async: true,
              crossDomain: true,
              url: "http://softwarerepositoryws.gonzalez.cr/api/SoftwareVisualization/uspGetFilesByPackage?packagelongId=000"+selectedProject+"0000"+selectedRevision+"0000" + selectedPackage,
              type: 'GET',
              dataType: 'json',
              xhrFields: {
                  withCredentials: false
              },
              processData: false,

              success: function (data, status) {

                   for(var i = 0; i<data.resultado.length; i++){
                          delete data.resultado[i].filelongId;
                          delete data.resultado[i].fileId;
                          delete data.resultado[i].path;
                          delete data.resultado[i].action;
                   }
                   
                   drawChart4(data);
                   
              },

              error: function (jqXHR, textStatus, errorThrown) {
                alert("No existen archivos en ese paquete");
                  console.log("Estado de la conexión: " + textStatus + " ");
                  console.log("Error de conexión: " + errorThrown + " ");
              }
          });
      } catch (err) {
          console.log("Ocurrio un error: " + err);
      }// fin catch
  }

function drawChart4(treemapData) {
var data = new google.visualization.DataTable();
data.addColumn('string', 'ID');
data.addColumn('string', 'Parent');
data.addColumn('number', 'Number Of Lines');

for(var i = 0; i<treemapData.resultado.length; i++){
  if(i === 0){
      data.addRows([['Package '+selectedPackage , null, 0]]);
  }else {
      data.addRows([[treemapData.resultado[i].fileName, 'Package '+selectedPackage, 1]]);
  }
}

var tree = new google.visualization.TreeMap(document.getElementById('chart_div4'));

var options = {
  highlightOnMouseOver: true,
  maxDepth: 1,
  maxPostDepth: 2,
  minHighlightColor: '#8c6bb1',
  midHighlightColor: '#9ebcda',
  maxHighlightColor: '#edf8fb',
  minColor: '#009688',
  midColor: '#f7f7f7',
  maxColor: '#ee8100',
  headerHeight: 15,
  showScale: true,
  height: 500,
  useWeightedAverageForAggregation: true
};

  tree.draw(data, options);
}

