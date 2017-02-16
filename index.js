// load dummy data
require('./data_nodes');

// vars
var previousIndex = 0;
var pointIndex = 0;
var currentNode = 0;
// network load color array for use in order of 10
// order is from red to green for modulo purpose
// var colorArray = [
// "#F33B3B", 
// "#D9473A", 
// "#C05439", 
// "#A76139", 
// "#8D6E38",
// "#747A38",
// "#5B8737",
// "#419437",
// "#28A136",
// "#0FAE36"
// ]

// var colorArray = [
// "#CC3333", 
// "#FF9933", 
// "#66CC33"
// ]

var colorArray = [
"red", 
"orange", 
"green"
]

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
    showHideCharts();
}

function updateDataSources() {
    cpuChart.data.datasets[0].data = cpuData[currentNode];
    cpuChart.update();
    if (currentNode < numberOfNodes) {
        for (i = 0; i < numberOfPorts[currentNode]; i++) {
            portCharts[i].data.datasets[0].data = throughputData[currentNode][i];
            portCharts[i].data.datasets[1].data = latencyData[currentNode][i];
            portCharts[i].data.datasets[2].data = dropPacketData[currentNode][i];
            portCharts[i].update();
        }
    } else {
        networkChart.data.datasets[0].data = networkData_overall;
        networkChart.update();
    }
}

function update() {
    updateHighlights();
    updateLabels();
    updateConsole();
}

function updateHighlights() {
    highlightPointOnCharts();
    highlightOverallNetworkLoad();
    highlightNetworkLoad();
}

function updateLabels() {
    $("#currentTimeLabel").text(pointIndex);
}

const {ipcRenderer} = require('electron')
function updateConsole() {
    if (currentNode != numberOfNodes) {
        ipcRenderer.send('main', "CPU load: " + cpuData[currentNode][pointIndex]);
        for (i = 0; i < numberOfPorts[currentNode]; i++) {
            ipcRenderer.send('main', "Throughput: " + throughputData[currentNode][i][pointIndex]);
            ipcRenderer.send('main', "Latency: " + latencyData[currentNode][i][pointIndex]);
            ipcRenderer.send('main', "Packets Dropped: " + dropPacketData[currentNode][i][pointIndex]);
        }
    }
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

    if (currentNode < numberOfNodes) {
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
    }

    previousIndex = pointIndex;
}

function highlightNetworkLoad() {
    if (currentNode != numberOfNodes) {
        cy.nodes().style({ 'background-color':'gray' });
        if (cpuData[currentNode][pointIndex] > 70) {
            cy.nodes('#' + nodes[currentNode]).style({ 'background-color':'red' });
        } else if (cpuData[currentNode][pointIndex] > 40) {
            cy.nodes('#' + nodes[currentNode]).style({ 'background-color':'orange' });
        } else {
            cy.nodes('#' + nodes[currentNode]).style({ 'background-color':'green' });
        }
        cy.edges().style({ 'line-color':'gray' });
        for (i = 0; i < numberOfPorts[currentNode]; i++) {
            if (throughputData[currentNode][i][pointIndex] > 7) {
                cy.elements('node#' + nodes[currentNode] + ', edge[source = "' + nodes[currentNode] + '"][sPort = ' + i + ']').style({ 'line-color':'red' });
                cy.elements('node#' + nodes[currentNode] + ', edge[target = "' + nodes[currentNode] + '"][tPort = ' + i + ']').style({ 'line-color':'red' });
            } else if (throughputData[currentNode][i][pointIndex] > 4) {
                cy.elements('node#' + nodes[currentNode] + ', edge[source = "' + nodes[currentNode] + '"][sPort = ' + i + ']').style({ 'line-color':'orange' });
                cy.elements('node#' + nodes[currentNode] + ', edge[target = "' + nodes[currentNode] + '"][tPort = ' + i + ']').style({ 'line-color':'orange' });
            } else {
                cy.elements('node#' + nodes[currentNode] + ', edge[source = "' + nodes[currentNode] + '"][sPort = ' + i + ']').style({ 'line-color':'green' });
                cy.elements('node#' + nodes[currentNode] + ', edge[target = "' + nodes[currentNode] + '"][tPort = ' + i + ']').style({ 'line-color':'green' });
            }
        }
    }
}

function highlightOverallNetworkLoad() {
    if (currentNode == numberOfNodes) {
        // overall
        for (i = 0; i < nodes.length; i++) {
            // color nodes based on cpu data
            // lower index equates darker color
            var cpuUsage = cpuData[i][pointIndex];
            var nodeColorIndex = 0;
            if (cpuUsage <= 40) {
                nodeColorIndex = 2;
            } else if (cpuUsage <= 70) {
                nodeColorIndex = 1;
            } else {
                nodeColorIndex = 0;
            }

            cy.nodes('#' + nodes[i]).style({'background-color': colorArray[nodeColorIndex]});

            // color edges based on throughput data
            // edges data should be the same just reverse up/down links; so choose any one direction
            for (k = 0; k < numberOfPorts[i]; k++) {
                var throughputUsage = throughputData[i][k][pointIndex];
                var edgeColorIndex = 0;
                if (throughputUsage <= 4) {
                    edgeColorIndex = 2;
                } else if (throughputUsage <= 7) {
                    edgeColorIndex = 1;
                } else {
                    edgeColorIndex = 0;
                }

                cy.elements('node#' + nodes[i] + ', edge[source = "' + nodes[i] + '"][sPort = ' + k + ']').style({ 'line-color': colorArray[edgeColorIndex] });   
            }

        }
    }
}

// reset nodes and edges colors for mouse click on cy container
function resetNodesAndEdgesColors() {
    cy.nodes().style({ 'background-color':'gray' });
    cy.edges().style({ 'line-color':'gray' });
}

function showHideCharts() {
    if (currentNode < numberOfNodes) {
        if (!$('#placeholder-network').hasClass("no-visibility")) {
            $('#placeholder-network').addClass("no-visibility");
        }
        for (i = 1; i <= portCharts.length; i++) {
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
        if ($('#placeholder-network').hasClass("no-visibility")) {
            $('#placeholder-network').removeClass("no-visibility");
        }
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
                'background-image-opacity': '0.7',
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
                'background-image': 'images/switch2.png'
            }
        },
        {
            selector: '.dashed',
            style: {
                'line-style': 'dashed'
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
        resetNodesAndEdgesColors();
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
    data: portChartStyle1,
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
    data: portChartStyle2,
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
    data: portChartStyle3,
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
    data: portChartStyle4,
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
    data: portChartStyle5,
    options: {
        title: {
            display: true,
            text: 'Port [4]'
        },
        scales: portChartScales
    }
});

var portCanvas6 = document.getElementById("port-chart6");
portCanvas6.width = parseInt($('#well8').css('width'), 10);
portCanvas6.height = parseInt($('#well8').css('height'), 10);
var portChart6 = new Chart(portCanvas6, {
    type: "line",
    data: portChartStyle6,
    options: {
        title: {
            display: true,
            text: 'Port [5]'
        },
        scales: portChartScales
    }
});

var portCanvas7 = document.getElementById("port-chart7");
portCanvas7.width = parseInt($('#well9').css('width'), 10);
portCanvas7.height = parseInt($('#well9').css('height'), 10);
var portChart7 = new Chart(portCanvas7, {
    type: "line",
    data: portChartStyle7,
    options: {
        title: {
            display: true,
            text: 'Port [6]'
        },
        scales: portChartScales
    }
});

var portCanvas8 = document.getElementById("port-chart8");
portCanvas8.width = parseInt($('#well10').css('width'), 10);
portCanvas8.height = parseInt($('#well10').css('height'), 10);
var portChart8 = new Chart(portCanvas8, {
    type: "line",
    data: portChartStyle8,
    options: {
        title: {
            display: true,
            text: 'Port [7]'
        },
        scales: portChartScales
    }
});

var portCanvas9 = document.getElementById("port-chart9");
portCanvas9.width = parseInt($('#well11').css('width'), 10);
portCanvas9.height = parseInt($('#well11').css('height'), 10);
var portChart9 = new Chart(portCanvas9, {
    type: "line",
    data: portChartStyle9,
    options: {
        title: {
            display: true,
            text: 'Port [8]'
        },
        scales: portChartScales
    }
});

var portCanvas10 = document.getElementById("port-chart10");
portCanvas10.width = parseInt($('#well12').css('width'), 10);
portCanvas10.height = parseInt($('#well12').css('height'), 10);
var portChart10 = new Chart(portCanvas10, {
    type: "line",
    data: portChartStyle10,
    options: {
        title: {
            display: true,
            text: 'Port [9]'
        },
        scales: portChartScales
    }
});

var portCanvas11 = document.getElementById("port-chart11");
portCanvas11.width = parseInt($('#well13').css('width'), 10);
portCanvas11.height = parseInt($('#well13').css('height'), 10);
var portChart11 = new Chart(portCanvas11, {
    type: "line",
    data: portChartStyle11,
    options: {
        title: {
            display: true,
            text: 'Port [10]'
        },
        scales: portChartScales
    }
});

var portCanvas12 = document.getElementById("port-chart12");
portCanvas12.width = parseInt($('#well14').css('width'), 10);
portCanvas12.height = parseInt($('#well14').css('height'), 10);
var portChart12 = new Chart(portCanvas12, {
    type: "line",
    data: portChartStyle12,
    options: {
        title: {
            display: true,
            text: 'Port [11]'
        },
        scales: portChartScales
    }
});

var portCanvas13 = document.getElementById("port-chart13");
portCanvas13.width = parseInt($('#well15').css('width'), 10);
portCanvas13.height = parseInt($('#well15').css('height'), 10);
var portChart13 = new Chart(portCanvas13, {
    type: "line",
    data: portChartStyle13,
    options: {
        title: {
            display: true,
            text: 'Port [12]'
        },
        scales: portChartScales
    }
});

var portCanvas14 = document.getElementById("port-chart14");
portCanvas14.width = parseInt($('#well16').css('width'), 10);
portCanvas14.height = parseInt($('#well16').css('height'), 10);
var portChart14 = new Chart(portCanvas14, {
    type: "line",
    data: portChartStyle14,
    options: {
        title: {
            display: true,
            text: 'Port [13]'
        },
        scales: portChartScales
    }
});

var portCanvas15 = document.getElementById("port-chart15");
portCanvas15.width = parseInt($('#well17').css('width'), 10);
portCanvas15.height = parseInt($('#well17').css('height'), 10);
var portChart15 = new Chart(portCanvas15, {
    type: "line",
    data: portChartStyle15,
    options: {
        title: {
            display: true,
            text: 'Port [14]'
        },
        scales: portChartScales
    }
});


var portCanvas16 = document.getElementById("port-chart16");
portCanvas16.width = parseInt($('#well18').css('width'), 10);
portCanvas16.height = parseInt($('#well18').css('height'), 10);
var portChart16 = new Chart(portCanvas16, {
    type: "line",
    data: portChartStyle16,
    options: {
        title: {
            display: true,
            text: 'Port [15]'
        },
        scales: portChartScales
    }
});

var portCanvas17 = document.getElementById("port-chart17");
portCanvas17.width = parseInt($('#well19').css('width'), 10);
portCanvas17.height = parseInt($('#well19').css('height'), 10);
var portChart17 = new Chart(portCanvas17, {
    type: "line",
    data: portChartStyle17,
    options: {
        title: {
            display: true,
            text: 'Port [16]'
        },
        scales: portChartScales
    }
});

var portCanvas18 = document.getElementById("port-chart18");
portCanvas18.width = parseInt($('#well20').css('width'), 10);
portCanvas18.height = parseInt($('#well20').css('height'), 10);
var portChart18 = new Chart(portCanvas18, {
    type: "line",
    data: portChartStyle18,
    options: {
        title: {
            display: true,
            text: 'Port [17]'
        },
        scales: portChartScales
    }
});

var portCanvas19 = document.getElementById("port-chart19");
portCanvas19.width = parseInt($('#well21').css('width'), 10);
portCanvas19.height = parseInt($('#well21').css('height'), 10);
var portChart19 = new Chart(portCanvas19, {
    type: "line",
    data: portChartStyle19,
    options: {
        title: {
            display: true,
            text: 'Port [18]'
        },
        scales: portChartScales
    }
});

var portCanvas20 = document.getElementById("port-chart20");
portCanvas20.width = parseInt($('#well22').css('width'), 10);
portCanvas20.height = parseInt($('#well22').css('height'), 10);
var portChart20 = new Chart(portCanvas20, {
    type: "line",
    data: portChartStyle20,
    options: {
        title: {
            display: true,
            text: 'Port [19]'
        },
        scales: portChartScales
    }
});

var portCanvas21 = document.getElementById("port-chart21");
portCanvas21.width = parseInt($('#well23').css('width'), 10);
portCanvas21.height = parseInt($('#well23').css('height'), 10);
var portChart21 = new Chart(portCanvas21, {
    type: "line",
    data: portChartStyle21,
    options: {
        title: {
            display: true,
            text: 'Port [20]'
        },
        scales: portChartScales
    }
});

var portCanvas22 = document.getElementById("port-chart22");
portCanvas22.width = parseInt($('#well24').css('width'), 10);
portCanvas22.height = parseInt($('#well24').css('height'), 10);
var portChart22 = new Chart(portCanvas22, {
    type: "line",
    data: portChartStyle22,
    options: {
        title: {
            display: true,
            text: 'Port [21]'
        },
        scales: portChartScales
    }
});

portCharts = [
    portChart1,
    portChart2,
    portChart3,
    portChart4,
    portChart5,
    portChart6,
    portChart7,
    portChart8,
    portChart9,
    portChart10,
    portChart11,
    portChart12,
    portChart13,
    portChart14,
    portChart15,
    portChart16,
    portChart17,
    portChart18,
    portChart19,
    portChart20,
    portChart21,
    portChart22];
