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
const numOfPortCharts = 2;

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


// network load color array for use in order of 10
// order is from red to green for modulo purpose
const colorArray = [
'#fb000c',
'#c92901',
'#C05439',
'#A76139',
'#8D6E38',
'#747A38',
'#5B8737',
'#92e151'
];

// const colorArray = [
// '#CC3333',
// '#FF9933',
// '#66CC33'
// ]

// const colorArray = [
// 'red',
// 'orange',
// 'green'
// ];

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
        highlightNetworkLoad();
    } else {
        highlightOverallNetworkLoad();
    }
}

function highlightPointOnCharts(isNode) {
    // let cpuMeta = cpuChart.getDatasetMeta(0);
    let networkMeta = networkChart.getDatasetMeta(0);

    // Reset previous point
    // let cpuOldPoint = cpuMeta.data[previousIndex];
    // cpuOldPoint.custom = cpuOldPoint.custom || {};
    // cpuOldPoint.custom.backgroundColor = '#fff';
    // cpuOldPoint.custom.radius = 3;
    let networkOldPoint = networkMeta.data[previousIndex];
    networkOldPoint.custom = networkOldPoint.custom || {};
    networkOldPoint.custom.backgroundColor = '#fff';
    networkOldPoint.custom.radius = 3;

    //Get point object and change the radius/color
    // let cpuPoint = cpuMeta.data[pointIndex];
    // cpuPoint.custom = cpuPoint.custom || {};
    // cpuPoint.custom.backgroundColor = '#828282';
    // cpuPoint.custom.radius = 7;
    let networkPoint = networkMeta.data[pointIndex];
    networkPoint.custom = networkPoint.custom || {};
    networkPoint.custom.backgroundColor = '#828282';
    networkPoint.custom.radius = 7;

    // first parameter to update is the animation duration.
    // if none is specified, the config animation duration
    // is used. Using 0 here will do the draw immediately.
    // cpuChart.update();

    if (isNode) {
        networkChart.update();
        for (i = 0; i < nodeMap.get(currentNode).get('numOfPorts'); i++) {
            let portMeta1 = portCharts[i].getDatasetMeta(0);
            let portMeta2 = portCharts[i].getDatasetMeta(1);

            // Reset previous point
            let portOldPoint1 = portMeta1.data[previousIndex];
            let portOldPoint2 = portMeta2.data[previousIndex];
            portOldPoint1.custom = portOldPoint1.custom || {};
            portOldPoint2.custom = portOldPoint2.custom || {};
            portOldPoint1.custom.backgroundColor = '#fff';
            portOldPoint2.custom.backgroundColor = '#fff';
            portOldPoint1.custom.radius = 3;
            portOldPoint2.custom.radius = 3;

            //Get point object and change the radius/color
            let portPoint1 = portMeta1.data[pointIndex];
            let portPoint2 = portMeta2.data[pointIndex];
            portPoint1.custom = portPoint1.custom || {};
            portPoint2.custom = portPoint2.custom || {};
            portPoint1.custom.backgroundColor = '#828282';
            portPoint2.custom.backgroundColor = '#828282';
            portPoint1.custom.radius = 7;
            portPoint2.custom.radius = 7;

            portCharts[i].update();
        }
    } else {
        networkChart.update(0);
    }

    previousIndex = pointIndex;
}

function highlightNetworkLoad() {
    // colour nodes based on cpu load
    // if (cpuData[currentNode][pointIndex] > 70) {
    //     cy.nodes('#' + nodes[currentNode]).style({ 'background-color':'red' });
    // } else if (cpuData[currentNode][pointIndex] > 40) {
    //     cy.nodes('#' + nodes[currentNode]).style({ 'background-color':'orange' });
    // } else {
    //     cy.nodes('#' + nodes[currentNode]).style({ 'background-color':'green' });
    // }

    // colour nodes based on network load
    let node = nodeMap.get(currentNode);
    let networkLoad = node.get('total')[pointIndex];
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
    let portsMap = node.get('ports');
    let portNum = 0;
    portsMap.forEach(function (value, key) {
        let bandwidth = value.get('total')[pointIndex];
        if (bandwidth > 800000) {
            cy.elements('edge[source = "' + node.get('name') + '"][sPort = ' + portNum + ']').style({ 'line-color':'red' });
        } else if (bandwidth > 240000) {
            cy.elements('edge[source = "' + node.get('name') + '"][sPort = ' + portNum + ']').style({ 'line-color':'orange' });
        } else {
            cy.elements('edge[source = "' + node.get('name') + '"][sPort = ' + portNum + ']').style({ 'line-color':'green' });
        }
        portNum++;
    });
}

function highlightOverallNetworkLoad() {
    let nodes = data_logs.getNodes();
    for (i = 0; i < nodes.length; i++) {
        // color nodes based on network data
        let node = nodeMap.get(nodes[i]);
        let networkLoad = node.get('total')[pointIndex];
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

        let portsMap = node.get('ports');
        let portNum = 0;
        portsMap.forEach(function (value, key) {
            let bandwidth = value.get('total')[pointIndex];
            if (bandwidth > 800000) {
                cy.elements('edge[source = "' + node.get('name') + '"][sPort = ' + portNum + ']').style({ 'line-color':'red' });
            } else if (bandwidth > 240000) {
                cy.elements('edge[source = "' + node.get('name') + '"][sPort = ' + portNum + ']').style({ 'line-color':'orange' });
            } else {
                cy.elements('edge[source = "' + node.get('name') + '"][sPort = ' + portNum + ']').style({ 'line-color':'green' });
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

// reset nodes and edges colors for mouse click on cy container
function resetNodesAndEdgesColors() {
    cy.nodes().style({ 'background-color':'gray' });
    cy.edges().style({ 'line-color':'gray' });
}

function showHideCharts(isNode) {
    if (isNode) {
        let numOfPorts = nodeMap.get(currentNode).get('numOfPorts');
        for (i = 1; i <= portCharts.length; i++) {
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
        for (i = 1; i <= portCharts.length; i++) {
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
let isPlaying = false;
let playbackSpeed = 100;
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
