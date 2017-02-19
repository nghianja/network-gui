const {ipcRenderer} = require('electron');
const data_logs = require('./data_logs');
data_logs.loadLogs();
let nodeMap = data_logs.getLogsMap();
require('./chart_styles');

// vars
let previousIndex = 0;
let pointIndex = 0;
let currentNode = '';
let networkCapacity = 798.2461;

// network load color array for use in order of 10
// order is from red to green for modulo purpose
var colorArray = [
"#fb000c", 
"#c92901", 
"#C05439", 
"#A76139", 
"#8D6E38",
"#747A38",
"#5B8737",
"#92e151"
]

// var colorArray = [
// "#CC3333", 
// "#FF9933", 
// "#66CC33"
// ]

// var colorArray = [
// "red", 
// "orange", 
// "green"
// ];

// update and highlight functions
$(document).ready(function() {
    updateCurrentNode('overall');
    // print to our console
    data_logs.getLogsMap().forEach(function(value, key) {
        // ipcRenderer.send('main', key + ': ' + value);
        ipcRenderer.send('main', 'name: ' + value.get('name'));
        ipcRenderer.send('main', 'numOfPorts: ' + value.get('numOfPorts'));
        let portNames = value.get('portNames');
        ipcRenderer.send('main', 'portNames: ' + portNames);
        portNames.forEach(function(currentValue, index, array) {
            ipcRenderer.send('main', 'port: ' + currentValue);
            ipcRenderer.send('main', 'input: ' + value.get('ports').get(currentValue).get('input'));
            ipcRenderer.send('main', 'output: ' + value.get('ports').get(currentValue).get('output'));
            ipcRenderer.send('main', 'port total: ' + value.get('ports').get(currentValue).get('total'));
        });
        ipcRenderer.send('main', 'total: ' + value.get('total'));
    });

    // display total network capacity
    document.getElementById("networkCapacity").innerHTML = networkCapacity;
});

function updateCurrentNode(node) {
    $("#currentNodeLabel").text(node);
    currentNode = node;
    updateDataSources();
    update();
    showHideCharts();
}

function updateDataSources() {
    if (nodeMap.has(currentNode)) {
        networkChart.data.datasets[0].data = nodeMap.get(currentNode).get('total');

        // round to nearest 50000
        var networkChartScale = Math.ceil(Math.max.apply(Math, networkChart.data.datasets[0].data)/50000)*50000;
        let numOfPorts = nodeMap.get(currentNode).get('numOfPorts');
        networkChart.options.scales.yAxes[0].ticks.max = networkChartScale;

        for (i = 0; i < numOfPorts; i++) {
            let portName = nodeMap.get(currentNode).get('portNames')[i];
            portCharts[i].options.title.text = portName;
            portCharts[i].data.datasets[0].data = nodeMap.get(currentNode).get('ports').get(portName).get('input');
            portCharts[i].data.datasets[1].data = nodeMap.get(currentNode).get('ports').get(portName).get('output');
            portCharts[i].update();

            // dynamic scale the y-axis for the port graph to nearest 50000
            var portMaxInput = Math.max.apply(Math, portCharts[i].data.datasets[0].data);
            var portMaxOutput = Math.max.apply(Math, portCharts[i].data.datasets[1].data);
            var portCombinedMax = Math.max(portMaxInput, portMaxOutput);
            portCharts[i].options.scales.yAxes[0].ticks.max = Math.ceil(portCombinedMax/50000)*50000;
        }

    } else {
        networkChart.data.datasets[0].data = networkData_overall;
        networkChart.options.scales.yAxes[0].ticks.max = 25000000;
    }
    networkChart.update();
    cpuChart.data.datasets[0].data = cpuData_overall;
    cpuChart.update();
}

function update() {
    updateHighlights();
    $("#currentTimeLabel").text(pointIndex);
}

function updateHighlights() {
    highlightPointOnCharts();
    highlightOverallNetworkLoad();
    highlightNetworkLoad();
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
    cpuPoint.custom.radius = 7;
    var networkPoint = networkMeta.data[pointIndex];
    networkPoint.custom = networkPoint.custom || {};
    networkPoint.custom.backgroundColor = "#828282";
    networkPoint.custom.radius = 7;

    // first parameter to update is the animation duration.
    // if none is specified, the config animation duration
    // is used. Using 0 here will do the draw immediately.
    cpuChart.update();
    networkChart.update();

    if (nodeMap.has(currentNode)) {
        for (i = 0; i < nodeMap.get(currentNode).get('numOfPorts'); i++) {
            var portMeta1 = portCharts[i].getDatasetMeta(0);
            var portMeta2 = portCharts[i].getDatasetMeta(1);

            // Reset previous point
            var portOldPoint1 = portMeta1.data[previousIndex];
            var portOldPoint2 = portMeta2.data[previousIndex];
            portOldPoint1.custom = portOldPoint1.custom || {};
            portOldPoint2.custom = portOldPoint2.custom || {};
            portOldPoint1.custom.backgroundColor = "#fff";
            portOldPoint2.custom.backgroundColor = "#fff";
            portOldPoint1.custom.radius = 3;
            portOldPoint2.custom.radius = 3;

            //Get point object and change the radius/color
            var portPoint1 = portMeta1.data[pointIndex];
            var portPoint2 = portMeta2.data[pointIndex];
            portPoint1.custom = portPoint1.custom || {};
            portPoint2.custom = portPoint2.custom || {};
            portPoint1.custom.backgroundColor = "#828282";
            portPoint2.custom.backgroundColor = "#828282";
            portPoint1.custom.radius = 7;
            portPoint2.custom.radius = 7;

            portCharts[i].update();
        }
    }

    previousIndex = pointIndex;
}

function highlightNetworkLoad() {
    if (nodeMap.has(currentNode)) {
        cy.nodes().style({ 'background-color':'gray' });

        // colour nodes based on cpu load
        // if (cpuData[currentNode][pointIndex] > 70) {
        //     cy.nodes('#' + nodes[currentNode]).style({ 'background-color':'red' });
        // } else if (cpuData[currentNode][pointIndex] > 40) {
        //     cy.nodes('#' + nodes[currentNode]).style({ 'background-color':'orange' });
        // } else {
        //     cy.nodes('#' + nodes[currentNode]).style({ 'background-color':'green' });
        // }

        // colour nodes based on network load
        let networkLoad = nodeMap.get(currentNode).get('total')[pointIndex];
        let nodeColorIndex = 7;
        if (networkLoad > 2000000) {
            nodeColorIndex = 0;
        } else if (networkLoad > 1000000) {
            nodeColorIndex = 1;
        } else if (networkLoad > 600000) {
            nodeColorIndex = 2;
        } else if (networkLoad > 280000) {
            nodeColorIndex = 3;
        } else if (networkLoad > 260000) {
            nodeColorIndex = 4;
        } else if (networkLoad > 240000) {
            nodeColorIndex = 5;
        } else if (networkLoad > 220000) {
            nodeColorIndex = 6;
        }
        cy.nodes('#' + currentNode).style({'background-color': colorArray[nodeColorIndex]});

        cy.edges().style({ 'line-color':'gray' });
        let portsMap = nodeMap.get(currentNode).get('ports');
        let portNum = 0;
        portsMap.forEach(function (value, key) {
            let bandwidth = value.get('total')[pointIndex];
            if (bandwidth > 800000) {
                cy.elements('edge[source = "' + nodeMap.get(currentNode).get('name') + '"][sPort = ' + portNum + ']').style({ 'line-color':'red' });
            } else if (bandwidth > 240000) {
                cy.elements('edge[source = "' + nodeMap.get(currentNode).get('name') + '"][sPort = ' + portNum + ']').style({ 'line-color':'orange' });
            } else {
                cy.elements('edge[source = "' + nodeMap.get(currentNode).get('name') + '"][sPort = ' + portNum + ']').style({ 'line-color':'green' });
            }
            portNum++;
        });
    }
}

function highlightOverallNetworkLoad() {
    if (!nodeMap.has(currentNode)) {
        let nodes = data_logs.getNodes();
        for (i = 0; i < nodes.length; i++) {
            // color nodes based on network data
            let node = nodes[i];
            let networkLoad = nodeMap.get(node).get('total')[pointIndex];
            let nodeColorIndex = 7;

            if (networkLoad > 2000000) {
                nodeColorIndex = 0;
            } else if (networkLoad > 1000000) {
                nodeColorIndex = 1;
            } else if (networkLoad > 600000) {
                nodeColorIndex = 2;
            } else if (networkLoad > 280000) {
                nodeColorIndex = 3;
            } else if (networkLoad > 260000) {
                nodeColorIndex = 4;
            } else if (networkLoad > 240000) {
                nodeColorIndex = 5;
            } else if (networkLoad > 220000) {
                nodeColorIndex = 6;
            }
            cy.nodes('#' + nodes[i]).style({'background-color': colorArray[nodeColorIndex]});

            let portsMap = nodeMap.get(node).get('ports');
            let portNum = 0;
            portsMap.forEach(function (value, key) {
                let bandwidth = value.get('total')[pointIndex];
                if (bandwidth > 800000) {
                    cy.elements('edge[source = "' + nodeMap.get(node).get('name') + '"][sPort = ' + portNum + ']').style({ 'line-color':'red' });
                } else if (bandwidth > 240000) {
                    cy.elements('edge[source = "' + nodeMap.get(node).get('name') + '"][sPort = ' + portNum + ']').style({ 'line-color':'orange' });
                } else {
                    cy.elements('edge[source = "' + nodeMap.get(node).get('name') + '"][sPort = ' + portNum + ']').style({ 'line-color':'green' });
                }
                portNum++;
            });
/*
            let edgeColorIndex = 7;
            portsMap.forEach(function (value, key) {
                let bandwidth = value.get('total')[pointIndex];
                if (bandwidth > 2000000) {
                   edgeColorIndex = 0;
                } else if (bandwidth > 1000000) {
                    edgeColorIndex = 1;
                } else if (bandwidth > 600000) {
                    edgeColorIndex = 2;
                } else if (bandwidth > 280000) {
                    edgeColorIndex = 3;
                } else if (bandwidth > 260000) {
                    edgeColorIndex = 4;
                } else if (bandwidth > 240000) {
                    edgeColorIndex = 5;
                } else if (bandwidth > 220000) {
                    edgeColorIndex = 6;
                }

                cy.elements('edge[source = "' + nodeMap.get(node).get('name') + '"][sPort = ' + portNum + ']').style({ 'line-color': colorArray[edgeColorIndex] });
                portNum++;
            });
*/
        }
    }
}

// reset nodes and edges colors for mouse click on cy container
function resetNodesAndEdgesColors() {
    cy.nodes().style({ 'background-color':'gray' });
    cy.edges().style({ 'line-color':'gray' });
}

function showHideCharts() {
    if (nodeMap.has(currentNode)) {
        for (i = 1; i <= portCharts.length; i++) {
            if (i <= nodeMap.get(currentNode).get('numOfPorts')) {
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
        for (i = 1; i <= portCharts.length; i++) {
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
var playbackSpeed = 100;
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
            window.setTimeout(playbackTicker, playbackSpeed);
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
        window.setTimeout(playbackTicker, playbackSpeed);
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
        name: 'cose-bilkent',
        randomize: true,
        nodeRepulsion: 400000
    },
    style: cyStyle
});
//cy.on('mouseover', 'node', function(event) {
//    var node = event.cyTarget;
//     node.qtip({
//         content: this.data('label'),
//         show: {
//             event: event.type,
//             ready: true
//         },
//         hide: {
//             event: 'mouseout unfocus'
//         }
//     }, event);
//});
cy.on('click', function(event) {
    var node = event.cyTarget;
    if (node === cy) {
        updateCurrentNode('overall');
        resetNodesAndEdgesColors();
        playbackSpeed = 100;
    } else {
        updateCurrentNode(node.id());
        playbackSpeed = 800;
    }
});

// cpu chart
var cpuCanvas = document.getElementById("cpu-chart");
cpuCanvas.width = parseInt($('#well1').css('width'), 10);
cpuCanvas.height = parseInt($('#well1').css('height'), 10);
var cpuChart = new Chart(cpuCanvas, {
    type: 'line',
    data: cpuChartStyle,
    options: {}
});

// network chart
var networkCanvas = document.getElementById("network-chart");
networkCanvas.width = parseInt($('#well2').css('width'), 10);
networkCanvas.height = parseInt($('#well2').css('height'), 10);
var networkChart = new Chart(networkCanvas, {
    type: 'line',
    data: networkChartStyle,
    options: networkChartOptions
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

portCharts = [
    portChart1,
    portChart2];
