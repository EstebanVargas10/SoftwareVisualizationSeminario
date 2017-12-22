var firstPackage;
var secondPackage;

function getTreemapPackagesApi() {
    try {
        $.ajax({
            async: true,
            crossDomain: true,
            url: 'http://softwarerepositoryws.gonzalez.cr/api/SoftwareVisualization/GetPackagesByRevision?revisionId=' +
                selectedRevision,
            type: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: false,
            },
            processData: false,

            success: function(data, status) {
                for (var i = 0; i < data.resultado.length; i++) {
                    delete data.resultado[i].packageId;
                }
                firstPackage = data;
                drawChart(data);
            },

            error: function(jqXHR, textStatus, errorThrown) {
                alert('No existen paquetes para esa revision');
                console.log('Estado de la conexión: ' + textStatus + ' ');
                console.log('Error de conexión: ' + errorThrown + ' ');
            },
        });
    } catch (err) {
        console.log('Ocurrio un error: ' + err);
    } // fin catch
}

var options = {
    highlightOnMouseOver: true,
    maxDepth: 100,
    maxPostDepth: 0,
    minHighlightColor: '#8c6bb1',
    midHighlightColor: '#9ebcda',
    maxHighlightColor: '#edf8fb',
    minColor: '#009688',
    midColor: '#e0bcbc',
    maxColor: '#ee8100',
    headerHeight: 15,
    showScale: true,
    height: 500,
    useWeightedAverageForAggregation: true,
};

function drawChart(treemapData) {
    var treemap1 = new google.visualization.DataTable();
    treemap1.addColumn('string', 'ID');
    treemap1.addColumn('string', 'Parent');
    treemap1.addColumn('number', 'Number Of Lines');

    treemap1.addRows([
        ['Revision' + selectedRevision, null, 0]
    ]);

    for (var i = 0; i < treemapData.resultado.length; i++) {
        if (treemapData.resultado[i].package.indexOf('.') == -1) {
            treemap1.addRows([
                [treemapData.resultado[i].package, 'Revision' + selectedRevision, 0],
            ]);
        } else {
            treemap1.addRows([
                [
                    treemapData.resultado[i].package,
                    treemapData.resultado[i].package.slice(
                        0,
                        treemapData.resultado[i].package.lastIndexOf('.'),
                    ),
                    treemapData.resultado[i].children,
                ],
            ]);
        }
    }

    var tree = new google.visualization.TreeMap(
        document.getElementById('chart_div'),
    );

    tree.draw(treemap1, options);
    google.visualization.events.addListener(tree, 'select', findPackageId);

    function findPackageId() {
        var selection = tree.getSelection();
        var nodePackage;
        var message = '';
        for (var i = 0; i < selection.length; i++) {
            var item = selection[i];
            if (item.row != null && item.column != null) {
                nodePackage = treemap1.getFormattedValue(item.row, item.column);
            } else if (item.row != null) {
                nodePackage = treemap1.getFormattedValue(item.row, 0);
            } else if (item.column != null) {
                nodePackage = treemap1.getFormattedValue(0, item.column);
            }
        }
        if (nodePackage == '') {
            alert('no ha seleccionado datos');
        }

        for (var k = 0; k < firstPackage.resultado.length; k++) {
            if (nodePackage == firstPackage.resultado[k].package) {
                selectedPackage = firstPackage.resultado[k].packagelongId;
            }
        }
        /*No se hace zoom*/
        tree.setSelection(null);
        getTreemapFilesApi();
    }
}

function getTreemapFilesApi() {
    try {
        $.ajax({
            async: true,
            crossDomain: true,
            url: 'http://softwarerepositoryws.gonzalez.cr/api/SoftwareVisualization/uspGetFilesByPackage?packagelongId=' +
                selectedPackage,
            type: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: false,
            },
            processData: false,

            success: function(data, status) {
                for (var i = 0; i < data.resultado.length; i++) {
                    delete data.resultado[i].filelongId;
                    delete data.resultado[i].fileId;
                    delete data.resultado[i].path;
                    delete data.resultado[i].action;
                }

                drawChart2(data);
            },

            error: function(jqXHR, textStatus, errorThrown) {
                alert('No existen archivos en ese paquete');
                console.log('Estado de la conexión: ' + textStatus + ' ');
                console.log('Error de conexión: ' + errorThrown + ' ');
            },
        });
    } catch (err) {
        console.log('Ocurrio un error: ' + err);
    } // fin catch
}

function drawChart2(treemapData) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'ID');
    data.addColumn('string', 'Parent');
    data.addColumn('number', 'Number Of Lines');

    data.addRows([
        [
            'Package ' +
            selectedPackage.slice(
                selectedPackage.length - 2,
                selectedPackage.length,
            ),
            null,
            0,
        ],
    ]);

    for (var i = 0; i < treemapData.resultado.length; i++) {
        data.addRows([
            [
                treemapData.resultado[i].fileName,
                'Package ' +
                selectedPackage.slice(
                    selectedPackage.length - 2,
                    selectedPackage.length,
                ),
                treemapData.resultado[i].numberlines,
            ],
        ]);
    }

    var tree = new google.visualization.TreeMap(
        document.getElementById('chart_div2'),
    );

    tree.draw(data, options);
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

function getTreemapPackagesApi2() {
    try {
        $.ajax({
            async: true,
            crossDomain: true,
            url: 'http://softwarerepositoryws.gonzalez.cr/api/SoftwareVisualization/GetPackagesByRevision?revisionId=' +
                selectedRevision2,
            type: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: false,
            },
            processData: false,

            success: function(data, status) {
                for (var i = 0; i < data.resultado.length; i++) {
                    delete data.resultado[i].packageId;
                }
                secondPackage = data;
                drawChart3(data);
            },

            error: function(jqXHR, textStatus, errorThrown) {
                alert('No existen paquetes para esa revision');
                console.log('Estado de la conexión: ' + textStatus + ' ');
                console.log('Error de conexión: ' + errorThrown + ' ');
            },
        });
    } catch (err) {
        console.log('Ocurrio un error: ' + err);
    } // fin catch
}

function drawChart3(treemapData) {
    var treemap1 = new google.visualization.DataTable();
    treemap1.addColumn('string', 'ID');
    treemap1.addColumn('string', 'Parent');
    treemap1.addColumn('number', 'Number Of Lines');

    treemap1.addRows([
        ['Revision' + selectedRevision2, null, 0]
    ]);

    for (var i = 0; i < treemapData.resultado.length; i++) {
        if (treemapData.resultado[i].package.indexOf('.') == -1) {
            treemap1.addRows([
                [treemapData.resultado[i].package, 'Revision' + selectedRevision2, 0],
            ]);
        } else {
            treemap1.addRows([
                [
                    treemapData.resultado[i].package,
                    treemapData.resultado[i].package.slice(
                        0,
                        treemapData.resultado[i].package.lastIndexOf('.'),
                    ),
                    treemapData.resultado[i].children,
                ],
            ]);
        }
    }
    var tree = new google.visualization.TreeMap(
        document.getElementById('chart_div3'),
    );

    tree.draw(treemap1, options);
    google.visualization.events.addListener(tree, 'select', findPackageId2);

    function findPackageId2() {
        var selection = tree.getSelection();
        var nodePackage;
        for (var i = 0; i < selection.length; i++) {
            var item = selection[i];
            if (item.row != null && item.column != null) {
                nodePackage = treemap1.getFormattedValue(item.row, item.column);
            } else if (item.row != null) {
                nodePackage = treemap1.getFormattedValue(item.row, 0);
            } else if (item.column != null) {
                nodePackage = treemap1.getFormattedValue(0, item.column);
            }
        }
        if (nodePackage == '') {
            alert('no ha seleccionado datos');
        }

        for (var k = 0; k < secondPackage.resultado.length; k++) {
            if (nodePackage == secondPackage.resultado[k].package) {
                selectedPackage2 = secondPackage.resultado[k].packagelongId;
            }
        }
        /*No se hace zoom*/
        tree.setSelection(null);
        getTreemapFilesApi2();
    }
}

function getTreemapFilesApi2() {
    try {
        $.ajax({
            async: true,
            crossDomain: true,
            url: 'http://softwarerepositoryws.gonzalez.cr/api/SoftwareVisualization/uspGetFilesByPackage?packagelongId=' +
                selectedPackage2,
            type: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: false,
            },
            processData: false,

            success: function(data, status) {
                for (var i = 0; i < data.resultado.length; i++) {
                    delete data.resultado[i].filelongId;
                    delete data.resultado[i].fileId;
                    delete data.resultado[i].path;
                    delete data.resultado[i].action;
                }

                drawChart4(data);
            },

            error: function(jqXHR, textStatus, errorThrown) {
                alert('No existen archivos en ese paquete');
                console.log('Estado de la conexión: ' + textStatus + ' ');
                console.log('Error de conexión: ' + errorThrown + ' ');
            },
        });
    } catch (err) {
        console.log('Ocurrio un error: ' + err);
    } // fin catch
}

function drawChart4(treemapData) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'ID');
    data.addColumn('string', 'Parent');
    data.addColumn('number', 'Number Of Lines');

    data.addRows([
        [
            'Package ' +
            selectedPackage2.slice(
                selectedPackage2.length - 2,
                selectedPackage2.length,
            ),
            null,
            0,
        ],
    ]);

    for (var i = 0; i < treemapData.resultado.length; i++) {
        data.addRows([
            [
                treemapData.resultado[i].fileName,
                'Package ' +
                selectedPackage2.slice(
                    selectedPackage2.length - 2,
                    selectedPackage2.length,
                ),
                treemapData.resultado[i].numberlines,
            ],
        ]);
    }

    var tree = new google.visualization.TreeMap(
        document.getElementById('chart_div4'),
    );

    tree.draw(data, options);
}