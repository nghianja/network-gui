const {ipcRenderer} = require('electron');
const utils = require('./utils');
const data_logs = require('./data_logs');
data_logs.loadLogs();
require('./chart_styles');
require('./data_topology');

// vars
const nodeMap = data_logs.getLogsMap();
const nodes = data_logs.getNodes();
const numOfNodes = nodes.length;
let previousIndex = 0;
let pointIndex = 0;
let currentNode = '';
const networkCapacity = 798.2461;
const numOfPortCharts = 2;
let isPlaying = false;
let playbackSpeed = 100;

// elements
let sliderId = $('#ex1');
let currentNodeLabel = $('#currentNodeLabel');
let currentTimeLabel = $('#currentTimeLabel');
let cyId = $('#cy');
let startButton = $('#startButton');
let endButton = $('#endButton');
let playPauseButton = $('#playPauseButton');
let playPauseIcon = $('#playPauseIcon');
let portChartPlaceholders = [numOfPortCharts];
for (i = 1; i <= numOfPortCharts; i++) {
    portChartPlaceholders[i - 1] = $('#placeholder-row' + i);
}
let cyNodesMap = new Map(); // will be populated after creating cy below
let cyEdgesMap = new Map(); // will be populated after creating cy below


// network load colour array for use in order of 10
// order is from red to green for modulo purpose
const colourArray = [
'#fb000c',
'#c92901',
'#C05439',
'#A76139',
'#8D6E38',
'#747A38',
'#5B8737',
'#92e151'
];

// update and highlight functions
$(document).ready(function() {
    updateCurrentNode('overall');
    // print to our console
    // data_logs.getLogsMap().forEach(function(value, key) {
    //     // ipcRenderer.send('main', key + ': ' + value);
    //     ipcRenderer.send('main', 'name: ' + value.get('name'));
    //     ipcRenderer.send('main', 'numOfPorts: ' + value.get('numOfPorts'));
    //     let portNames = value.get('portNames');
    //     ipcRenderer.send('main', 'portNames: ' + portNames);
    //     portNames.forEach(function(currentValue, index, array) {
    //         ipcRenderer.send('main', 'port: ' + currentValue);
    //         ipcRenderer.send('main', 'input: ' + value.get('ports').get(currentValue).get('input'));
    //         ipcRenderer.send('main', 'output: ' + value.get('ports').get(currentValue).get('output'));
    //         ipcRenderer.send('main', 'port total: ' + value.get('ports').get(currentValue).get('total'));
    //     });
    //     ipcRenderer.send('main', 'total: ' + value.get('total'));
    // });

    // display total network capacity
    document.getElementById('networkCapacity').innerHTML = networkCapacity;
});

function updateCurrentNode(node) {
    currentNodeLabel.text(node);
    currentNode = node;
    let isNode = nodeMap.has(currentNode);
    updateDataSources(isNode);
    update();
    showHideCharts(isNode);
}

function updateDataSources(isNode) {
    if (isNode) {
        let node = nodeMap.get(currentNode);
        networkChart.data.datasets[0].data = node.get('total');

        // round to nearest 50000
        let networkChartScale = Math.ceil(Math.max.apply(Math, networkChart.data.datasets[0].data)/50000)*50000;
        let numOfPorts = node.get('numOfPorts');
        networkChart.options.scales.yAxes[0].ticks.max = networkChartScale;

        for (i = 0; i < numOfPorts; i++) {
            let portName = nodeMap.get(currentNode).get('portNames')[i];
            portCharts[i].options.title.text = portName;
            portCharts[i].data.datasets[0].data = node.get('ports').get(portName).get('input');
            portCharts[i].data.datasets[1].data = node.get('ports').get(portName).get('output');

            // dynamic scale the y-axis for the port graph to nearest 50000
            let portMaxInput = Math.max.apply(Math, portCharts[i].data.datasets[0].data);
            let portMaxOutput = Math.max.apply(Math, portCharts[i].data.datasets[1].data);
            let portCombinedMax = Math.max(portMaxInput, portMaxOutput);
            portCharts[i].options.scales.yAxes[0].ticks.max = Math.ceil(portCombinedMax/50000)*50000;

            portCharts[i].update(0);
        }
    } else {
        // let networkChartScale = Math.ceil(Math.max.apply(Math, networkData_overall)/100000)*100000;
        networkChart.data.datasets[0].data = networkData_overall;
        networkChart.options.scales.yAxes[0].ticks.max = 100000000;
    }
    networkChart.update(0);
    // cpuChart.data.datasets[0].data = cpuData_overall;
    // cpuChart.update(0);
}

function update() {
    updateHighlights();
    currentTimeLabel.text(pointIndex);
}

function updateHighlights() {
    let isNode = nodeMap.has(currentNode);
    highlightPointOnCharts(isNode);
    if (isNode) {
        highlightNetworkLoadForNode(currentNode);
    } else {
        highlightOverallNetworkLoad();
    }
}

function highlightPointOnCharts(isNode) {
    // utils.updateHighlightedPointOnChart(cpuChart, 0, previousIndex, pointIndex);
    utils.updateHighlightedPointOnChart(networkChart, 0, previousIndex, pointIndex);
    let networkMeta = networkChart.getDatasetMeta(0);

    // first parameter to update is the animation duration.
    // if none is specified, the config animation duration
    // is used. Using 0 here will do the draw immediately.
    // cpuChart.update();

    if (isNode) {
        networkChart.update();
        for (i = 0; i < nodeMap.get(currentNode).get('numOfPorts'); i++) {
            utils.updateHighlightedPointOnChart(portCharts[i], 0, previousIndex, pointIndex);
            utils.updateHighlightedPointOnChart(portCharts[i], 1, previousIndex, pointIndex);
            portCharts[i].update();
        }
    } else {
        networkChart.update(0);
    }

    previousIndex = pointIndex;
}

function highlightNetworkLoadForNode(nodeName) {
    let node = nodeMap.get(nodeName);
    let networkLoad = node.get('total')[pointIndex];
    let nodeColourIndex = utils.getNodeColourIndex(networkLoad);
    cyNodesMap.get(nodeName).style({'background-color': colourArray[nodeColourIndex]});

    let portsMap = node.get('ports');
    let portNum = 0;
    portsMap.forEach(function (value, key) {
        let edgeName = 'edge[source = "' + nodeName + '"][sPort = ' + portNum + ']';
        let edge = cyEdgesMap.get(edgeName);
        utils.colourEdge(value.get('total')[pointIndex], edge);
        portNum++;
    });
}

function highlightOverallNetworkLoad() {
    for (i = 0; i < numOfNodes; i++) {
        let nodeName = nodes[i];
        highlightNetworkLoadForNode(nodeName);
    }
}

// reset nodes and edges colors for mouse click on cy container
function resetNodesAndEdgesColors() {
    cy.nodes().style({ 'background-color':'gray' });
    cy.edges().style({ 'line-color':'gray' });
}

function showHideCharts(isNode) {
    if (isNode) {
        let numOfPorts = nodeMap.get(currentNode).get('numOfPorts');
        for (i = 1; i <= numOfPortCharts; i++) {
            let placeHolder = portChartPlaceholders[i - 1];
            if (i <= numOfPorts) {
                if (placeHolder.hasClass('no-visibility')) {
                    placeHolder.removeClass('no-visibility');
                }
            } else {
                if (!placeHolder.hasClass('no-visibility')) {
                    placeHolder.addClass('no-visibility');
                }
            }
        }
    } else {
        for (i = 1; i <= numOfPortCharts; i++) {
            let placeHolder = portChartPlaceholders[i - 1];
            if (!placeHolder.hasClass('no-visibility')) {
                placeHolder.addClass('no-visibility');
            }
        }
    }
}

// button functions
startButton.on('click', function () {
    pointIndex = sliderId.slider('getAttribute', 'min');
    sliderId.slider('setValue', pointIndex);
    update();
});
endButton.on('click', function () {
    pointIndex = sliderId.slider('getAttribute', 'max');
    sliderId.slider('setValue', pointIndex);
    update();
});
playPauseButton.on('click', function () {
    if (isPlaying) {
        isPlaying = false;
        playPauseIcon.removeClass('glyphicon-pause').addClass('glyphicon-play');
    } else {
        isPlaying = true;
        playPauseIcon.removeClass('glyphicon-play').addClass('glyphicon-pause');
        if (pointIndex == sliderId.slider('getAttribute', 'max')) {
            pointIndex = sliderId.slider('getAttribute', 'min');
            sliderId.slider('setValue', pointIndex);
            update();
            window.setTimeout(playbackTicker, playbackSpeed);
        } else {
            playbackTicker();
        }
    }
});
function playbackTicker() {
    let maxPoint = sliderId.slider('getAttribute', 'max');
    if (isPlaying && pointIndex < maxPoint) {
        pointIndex++;
    } else if (isPlaying && pointIndex >= maxPoint) {
        // isPlaying = false;
        // playPauseIcon.removeClass('glyphicon-pause').addClass('glyphicon-play');
        pointIndex = 0;
    }
    sliderId.slider('setValue', pointIndex);
    update();
    window.setTimeout(playbackTicker, playbackSpeed);
}

// slider
sliderId.slider({
    formatter: function(value) {
        return 'Current time: ' + value;
    }
});
sliderId.on('slide', function(slideEvt) {
    pointIndex = slideEvt.value;
    update();
});
sliderId.on('slideStop', function(slideEvt) {
    pointIndex = slideEvt.value;
    update();
});

// topology
let cy = cytoscape({
    container: cyId,
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
// populating cy maps
for (i = 0; i < numOfNodes; i++) {
    let nodeName = nodes[i];
    cyNodesMap.set(nodeName, cy.nodes('#' + nodes[i]));
    let node = nodeMap.get(nodeName);
    let portsMap = node.get('ports');
    let portNum = 0;
    portsMap.forEach(function (value, key) {
        let edgeName = 'edge[source = "' + nodeName + '"][sPort = ' + portNum + ']';
        cyEdgesMap.set(edgeName, cy.elements(edgeName));
        portNum++;
    });
}
//cy.on('mouseover', 'node', function(event) {
//    let node = event.cyTarget;
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
    let node = event.cyTarget;
    if (node === cy) {
        updateCurrentNode('overall');
        playbackSpeed = 100;
    } else {
        resetNodesAndEdgesColors();
        updateCurrentNode(node.id());
        playbackSpeed = 800;
    }
});

// cpu chart
// let cpuCanvas = document.getElementById('cpu-chart');
// let well1 = $('#well1');
// cpuCanvas.width = parseInt(well1.css('width'), 10);
// cpuCanvas.height = parseInt(well1.css('height'), 10);
// let cpuChart = new Chart(cpuCanvas, {
//     type: 'line',
//     data: cpuChartStyle,
//     options: {}
// });

// network chart
let networkCanvas = document.getElementById('network-chart');
let well2 = $('#well2');
networkCanvas.width = parseInt(well2.css('width'), 10);
networkCanvas.height = parseInt(well2.css('height'), 10);
let networkChart = new Chart(networkCanvas, {
    type: 'line',
    data: networkChartStyle,
    options: networkChartOptions
});

// port charts
let portCanvas1 = document.getElementById('port-chart1');
let well3 = $('#well3');
portCanvas1.width = parseInt(well3.css('width'), 10);
portCanvas1.height = parseInt(well3.css('height'), 10);
let portChart1 = new Chart(portCanvas1, {
    type: 'line',
    data: portChartStyle1,
    options: {
        title: {
            display: true,
            text: 'Port [0]'
        },
        scales: portChartScales,
        maintainAspectRatio: false
    }
});

let portCanvas2 = document.getElementById('port-chart2');
let well4 = $('#well4');
portCanvas2.width = parseInt(well4.css('width'), 10);
portCanvas2.height = parseInt(well4.css('height'), 10);
let portChart2 = new Chart(portCanvas2, {
    type: 'line',
    data: portChartStyle2,
    options: {
        title: {
            display: true,
            text: 'Port [1]'
        },
        scales: portChartScales,
        maintainAspectRatio: false
    }
});

portCharts = [
    portChart1,
    portChart2];
