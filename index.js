// load dummy data
require('./data_nodes');

// vars
var previousIndex = 0;
var pointIndex = 0;
var currentNode = 0;

// update and highlight functions
$(document).ready(function() {
    updateCurrentNode('overall');
});

function updateCurrentNode(id) {
    var index = nodes.indexOf(id);
    if (index < 0) {
        currentNode = numberOfNodes;
    } else {
        currentNode = index;
    }
    $("#currentNodeLabel").text(id);
    updateDataSources();
    update();
    showPortCharts();
}

function updateDataSources() {
    cpuChart.data.datasets[0].data = cpuData[currentNode];
    networkChart.data.datasets[0].data = networkData[currentNode];
    cpuChart.update();
    networkChart.update();
    if (currentNode < numberOfNodes) {
        for (i = 0; i < portCharts.length; i++) {
            if (numberOfPorts[currentNode] > i) {
                portCharts[i].data.datasets[0].data = throughputData[currentNode][i];
                portCharts[i].data.datasets[1].data = latencyData[currentNode][i];
                portCharts[i].data.datasets[2].data = dropPacketData[currentNode][i];
                portCharts[i].update();
            }
        }
    }
}

function update() {
    updateHighlights();
    updateLabels();
}

function updateHighlights() {
    highlightPointOnCharts();
    highlightOverallNetworkLoad();
    highlightNetworkLoad();
}

function updateLabels() {
    $("#currentTimeLabel").text(pointIndex);
}

function highlightPointOnCharts() {
    var cpuMeta = cpuChart.getDatasetMeta(0);
    var networkMeta = networkChart.getDatasetMeta(0);

    // Reset previous point
    var cpuOldPoint = cpuMeta.data[previousIndex];
    cpuOldPoint.custom = cpuOldPoint.custom || {};
    cpuOldPoint.custom.backgroundColor = "#fff";
    cpuOldPoint.custom.radius = 3;
    var networkOldPoint = networkMeta.data[previousIndex];
    networkOldPoint.custom = networkOldPoint.custom || {};
    networkOldPoint.custom.backgroundColor = "#fff";
    networkOldPoint.custom.radius = 3;

    //Get point object and change the radius/color
    var cpuPoint = cpuMeta.data[pointIndex];
    cpuPoint.custom = cpuPoint.custom || {};
    cpuPoint.custom.backgroundColor = "#828282";
    cpuPoint.custom.radius = 5;
    var networkPoint = networkMeta.data[pointIndex];
    networkPoint.custom = networkPoint.custom || {};
    networkPoint.custom.backgroundColor = "#828282";
    networkPoint.custom.radius = 5;

    // first parameter to update is the animation duration.
    // if none is specified, the config animation duration
    // is used. Using 0 here will do the draw immediately.
    cpuChart.update();
    networkChart.update();

    for (i = 0; i < numberOfPorts[currentNode]; i++) {
        var portMeta1 = portCharts[i].getDatasetMeta(0);
        var portMeta2 = portCharts[i].getDatasetMeta(1);
        var portMeta3 = portCharts[i].getDatasetMeta(2);

        // Reset previous point
        var portOldPoint1 = portMeta1.data[previousIndex];
        var portOldPoint2 = portMeta2.data[previousIndex];
        var portOldPoint3 = portMeta3.data[previousIndex];
        portOldPoint1.custom = portOldPoint1.custom || {};
        portOldPoint2.custom = portOldPoint2.custom || {};
        portOldPoint3.custom = portOldPoint3.custom || {};
        portOldPoint1.custom.backgroundColor = "#fff";
        portOldPoint2.custom.backgroundColor = "#fff";
        portOldPoint3.custom.backgroundColor = "#fff";
        portOldPoint1.custom.radius = 3;
        portOldPoint2.custom.radius = 3;
        portOldPoint3.custom.radius = 3;

        //Get point object and change the radius/color
        var portPoint1 = portMeta1.data[pointIndex];
        var portPoint2 = portMeta2.data[pointIndex];
        var portPoint3 = portMeta3.data[pointIndex];
        portPoint1.custom = portPoint1.custom || {};
        portPoint2.custom = portPoint2.custom || {};
        portPoint3.custom = portPoint3.custom || {};
        portPoint1.custom.backgroundColor = "#828282";
        portPoint2.custom.backgroundColor = "#828282";
        portPoint3.custom.backgroundColor = "#828282";
        portPoint1.custom.radius = 5;
        portPoint2.custom.radius = 5;
        portPoint3.custom.radius = 5;

        portCharts[i].update();
    }

    previousIndex = pointIndex;
}

function highlightNetworkLoad() {
    if (currentNode != numberOfNodes) {
        if (cpuData[currentNode][pointIndex] > 50) {
            cy.nodes().style({ 'background-color':'gray' });
            cy.nodes('#' + nodes[currentNode]).style({ 'background-color':'red' });
        } else {
            cy.nodes().style({ 'background-color':'gray' });
            cy.nodes('#' + nodes[currentNode]).style({ 'background-color':'green' });
        }
        if (networkData[currentNode][pointIndex] > 50) {
            cy.edges().style({ 'line-color':'gray' });
            cy.edges('[source = "' + nodes[currentNode] + '"]').style({ 'line-color':'red' });
            cy.edges('[target = "' + nodes[currentNode] + '"]').style({ 'line-color':'red' });
        } else {
            cy.edges().style({ 'line-color':'gray' });
            cy.edges('[source = "' + nodes[currentNode] + '"]').style({ 'line-color':'green' });
            cy.edges('[target = "' + nodes[currentNode] + '"]').style({ 'line-color':'green' });
        }
    }
}

function highlightOverallNetworkLoad() {
    for (i = 0; i < nodes.length; i++) {
        if (cpuData[i][pointIndex] > 50) {
            cy.nodes('#' + nodes[i]).style({ 'background-color':'red' });
        } else {
            cy.nodes('#' + nodes[i]).style({ 'background-color':'green' });
        }
    }
    // cy.nodes().forEach(function( ele, i) {
    //     if (ele.id().lastIndexOf("isp", 0) == -1) {
    //         // search for nodes whose id is not a 'ispXXX' which is a parent node holding the cluster
    //         // lastIndexOf returns -1 if does not match
    //         // we want to color all other nodes instead
    //         console.log(i + ":" + ele.id());
    //     }
    // });
    // console.log(cpuData[currentNode][pointIndex])
    // console.log(ele.id)
    /*
    cy.nodes().forEach(function( ele, i ){
        console.log("index is " + i)
        console.log("it works" + currentNode)
    });*/
}

// reset nodes and edges colors for mouse click on cy container
function resetNodesAndEdgesColors() {
    cy.nodes().style({ 'background-color':'gray' });
    cy.edges().style({ 'line-color':'gray' });
}

function showPortCharts() {
    if (currentNode < numberOfNodes) {
        for (i = 1; i <= 5; i++) {
            if (i <= numberOfPorts[currentNode]) {
                if ($('#placeholder-row' + i).hasClass("no-visibility")) {
                    $('#placeholder-row' + i).removeClass("no-visibility");
                }
            } else {
                if (!$('#placeholder-row' + i).hasClass("no-visibility")) {
                    $('#placeholder-row' + i).addClass("no-visibility");
                }
            }
        }
    } else {
        for (i = 1; i <= 5; i++) {
            if (!$('#placeholder-row' + i).hasClass("no-visibility")) {
                $('#placeholder-row' + i).addClass("no-visibility");
            }
        }
    }
}

// button functions
$('#startButton').on('click', function () {
    pointIndex = $('#ex1').slider('getAttribute', 'min');
    $('#ex1').slider('setValue', pointIndex);
    update();
});
$('#endButton').on('click', function () {
    pointIndex = $('#ex1').slider('getAttribute', 'max');
    $('#ex1').slider('setValue', pointIndex);
    update();
});
var isPlaying = false;
$('#playPauseButton').on('click', function () {
    if (isPlaying) {
        isPlaying = false;
        $('#playPauseIcon').removeClass('glyphicon-pause').addClass('glyphicon-play');
    } else {
        isPlaying = true;
        $('#playPauseIcon').removeClass('glyphicon-play').addClass('glyphicon-pause');
        if (pointIndex == $('#ex1').slider('getAttribute', 'max')) {
            pointIndex = $('#ex1').slider('getAttribute', 'min');
            $('#ex1').slider('setValue', pointIndex);
            update();
            window.setTimeout(playbackTicker, 500);
        } else {
            playbackTicker();
        }
    }
});
function playbackTicker() {
    if (isPlaying && pointIndex < $('#ex1').slider('getAttribute', 'max')) {
        pointIndex++;
        $('#ex1').slider('setValue', pointIndex);
        update();
        window.setTimeout(playbackTicker, 500);
    } else if (isPlaying && pointIndex >= $('#ex1').slider('getAttribute', 'max')) {
        isPlaying = false;
        $('#playPauseIcon').removeClass('glyphicon-pause').addClass('glyphicon-play');
    }
}

// slider
$('#ex1').slider({
    formatter: function(value) {
        return 'Current time: ' + value;
    }
});
$("#ex1").on("slide", function(slideEvt) {
    pointIndex = slideEvt.value;
    update();
});
$("#ex1").on("slideStop", function(slideEvt) {
    pointIndex = slideEvt.value;
    update();
});

// topology
var cy = cytoscape({
    container: $('#cy'),
    elements: dataset,

    boxSelectionEnabled: false,
    autounselectify: true,

    layout: { 
        name: 'cose-bilkent'
    },
    style: [
        {
            selector: 'node',
            style: { 
                'label': 'data(label)',
                'text-valign': 'bottom', 
                'text-halign': 'center'
            }
        },
        {
            selector: ':parent',
            style: {
                'background-opacity': '0.0',
                'background-fit': 'contain',
                'background-image': 'images/cloud.png',
                'background-image-opacity': '0.333',
                'border-width': 0
            }
        },
        {
            // add background image, class should be same as the one define in data_topology
            selector: '.switch',
            style: {
                'height': 30,
                'width': 50,
                'background-opacity': '0.0',
                'background-fit': 'contain',
                'background-image': 'images/switch.png'
            }
        }
    ]
});
cy.on('mouseover', 'node', function(event) {
    var node = event.cyTarget;
    node.qtip({
         content: 'id: ' + this.id(),
         show: {
            event: event.type,
            ready: true
         },
         hide: {
            event: 'mouseout unfocus'
         }
    }, event);
});
cy.on('click', function(event) {
    var node = event.cyTarget;
    if (node === cy) {
        updateCurrentNode('overall');
        // resetNodesAndEdgesColors();
    } else {
        updateCurrentNode(node.id());
    }
});

require('./chart_styles');

// cpu chart
var cpuCanvas = document.getElementById("cpu-chart");
cpuCanvas.width = parseInt($('#well1').css('width'), 10);
cpuCanvas.height = parseInt($('#well1').css('height'), 10);
var cpuChart = new Chart(cpuCanvas, {
    type: 'line',
    data: cpuChartStyle
});

// network chart
var networkCanvas = document.getElementById("network-chart");
networkCanvas.width = parseInt($('#well2').css('width'), 10);
networkCanvas.height = parseInt($('#well2').css('height'), 10);
var networkChart = new Chart(networkCanvas, {
    type: 'line',
    data: networkChartStyle
});

// port charts
var portCanvas1 = document.getElementById("port-chart1");
portCanvas1.width = parseInt($('#well3').css('width'), 10);
portCanvas1.height = parseInt($('#well3').css('height'), 10);
var portChart1 = new Chart(portCanvas1, {
    type: "line",
    data: portChartStyle,
    options: {
        title: {
            display: true,
            text: 'Port [0]'
        },
        scales: portChartScales
    }
});

var portCanvas2 = document.getElementById("port-chart2");
portCanvas2.width = parseInt($('#well4').css('width'), 10);
portCanvas2.height = parseInt($('#well4').css('height'), 10);
var portChart2 = new Chart(portCanvas2, {
    type: "line",
    data: portChartStyle,
    options: {
        title: {
            display: true,
            text: 'Port [1]'
        },
        scales: portChartScales
    }
});

var portCanvas3 = document.getElementById("port-chart3");
portCanvas3.width = parseInt($('#well5').css('width'), 10);
portCanvas3.height = parseInt($('#well5').css('height'), 10);
var portChart3 = new Chart(portCanvas3, {
    type: "line",
    data: portChartStyle,
    options: {
        title: {
            display: true,
            text: 'Port [2]'
        },
        scales: portChartScales
    }
});

var portCanvas4 = document.getElementById("port-chart4");
portCanvas4.width = parseInt($('#well6').css('width'), 10);
portCanvas4.height = parseInt($('#well6').css('height'), 10);
var portChart4 = new Chart(portCanvas4, {
    type: "line",
    data: portChartStyle,
    options: {
        title: {
            display: true,
            text: 'Port [3]'
        },
        scales: portChartScales
    }
});

var portCanvas5 = document.getElementById("port-chart5");
portCanvas5.width = parseInt($('#well7').css('width'), 10);
portCanvas5.height = parseInt($('#well7').css('height'), 10);
var portChart5 = new Chart(portCanvas5, {
    type: "line",
    data: portChartStyle,
    options: {
        title: {
            display: true,
            text: 'Port [4]'
        },
        scales: portChartScales
    }
});

portCharts = [
    portChart1,
    portChart2,
    portChart3,
    portChart4,
    portChart5];
