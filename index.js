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
        currentNode = nodes.length;
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
    cpuChart.update(0);
    networkChart.update(0);
    if (currentNode < throughputData.length) {
        portChart1.data.datasets[0].data = throughputData[currentNode][0];
        portChart1.data.datasets[1].data = latencyData[currentNode][0];
        portChart1.data.datasets[2].data = dropPacketData[currentNode][0];
        portChart2.data.datasets[0].data = throughputData[currentNode][1];
        portChart2.data.datasets[1].data = latencyData[currentNode][1];
        portChart2.data.datasets[2].data = dropPacketData[currentNode][1];
        portChart1.update(0);
        portChart2.update(0);
    }
}

function update() {
    updateHighlights();
    updateLabels();
}

function updateHighlights() {
    highlightPointOnCharts();
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
    cpuChart.update(0);
    networkChart.update(0);

    previousIndex = pointIndex;
}

function highlightNetworkLoad() {
    if (cpuData[currentNode][pointIndex] > 50) {
        if (currentNode == nodes.length) {
            cy.nodes().style({ 'background-color':'red' });
        } else {
            cy.nodes().style({ 'background-color':'gray' });
            cy.nodes('#' + nodes[currentNode]).style({ 'background-color':'red' });
        }
    } else {
        if (currentNode == nodes.length) {
            cy.nodes().style({ 'background-color':'green' });
        } else {
            cy.nodes().style({ 'background-color':'gray' });
            cy.nodes('#' + nodes[currentNode]).style({ 'background-color':'green' });
        }
    }
    if (networkData[currentNode][pointIndex] > 50) {
        if (currentNode == nodes.length) {
            cy.edges().style({ 'line-color':'red' });
        } else {
            cy.edges().style({ 'line-color':'gray' });
            cy.edges('[source = "' + nodes[currentNode] + '"]').style({ 'line-color':'red' });
            cy.edges('[target = "' + nodes[currentNode] + '"]').style({ 'line-color':'red' });
        }
    } else {
        if (currentNode == nodes.length) {
            cy.edges().style({ 'line-color':'green' });
        } else {
            cy.edges().style({ 'line-color':'gray' });
            cy.edges('[source = "' + nodes[currentNode] + '"]').style({ 'line-color':'green' });
            cy.edges('[target = "' + nodes[currentNode] + '"]').style({ 'line-color':'green' });
        }
    }
}

function showPortCharts() {
    if (currentNode == 0 || currentNode == 1) {
        for (i = 1; i <= 4; i++) {
            if (i <= throughputData[currentNode].length) {
                $('#placeholder-row' + i).removeClass("no-visibility");
            } else {
                $('#placeholder-row' + i).addClass("no-visibility");
            }
        }
    } else {
        for (i = 1; i <= 4; i++) {
            $('#placeholder-row' + i).addClass("no-visibility");
        }
    }
}

// button functions
$('#startButton').on('click', function () {
    pointIndex = 0;
    $('#ex1').slider('setValue', pointIndex);
    update();
});
$('#endButton').on('click', function () {
    pointIndex = 9;
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
        if (pointIndex == 9) {
            pointIndex = 0;
            $('#ex1').slider('setValue', pointIndex);
            update();
            window.setTimeout(playbackTicker, 500);
        } else {
            playbackTicker();
        }
    }
});
function playbackTicker() {
    if (isPlaying && pointIndex < 9) {
        pointIndex++;
        $('#ex1').slider('setValue', pointIndex);
        update();
        window.setTimeout(playbackTicker, 500);
    } else if (isPlaying && pointIndex >= 9) {
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
    layout: { name: "random", avoidOverlap: true },
    style: [
        {
            selector: 'node',
            style: { 'label': 'data(label)' }
        },
        {
            selector: '.bottom-center',
            style: { 'text-valign': 'bottom', 'text-halign': 'center' }
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
    } else {
        updateCurrentNode(node.id());
    }
});

// cpu chart
var cpuCanvas = document.getElementById("cpu-chart");
cpuCanvas.width = parseInt($('#well1').css('width'), 10);
cpuCanvas.height = parseInt($('#well1').css('height'), 10);
var cpuChart = new Chart(cpuCanvas, {
    type: 'line',
    data: {
        labels: cpuLabels,
        datasets: [{
            label: "CPU Usage",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: cpuData[currentNode],
            spanGaps: false
        }]
    }
});

// network chart
var networkCanvas = document.getElementById("network-chart");
networkCanvas.width = parseInt($('#well2').css('width'), 10);
networkCanvas.height = parseInt($('#well2').css('height'), 10);
var networkChart = new Chart(networkCanvas, {
    type: 'line',
    data: {
        labels: networkLabels,
        datasets: [{
            label: "Network Usage",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(214,83,92,0.4)",
            borderColor: "rgba(214,83,92,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(214,83,92,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(214,83,92,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: networkData[currentNode],
            spanGaps: false
        }]
    }
});

// port charts
var portCanvas1 = document.getElementById("port-chart1");
portCanvas1.width = parseInt($('#well3').css('width'), 10);
portCanvas1.height = parseInt($('#well3').css('height'), 10);
var portChart1 = new Chart(portCanvas1, {
    type: "line",
    data: {
        labels: timestampLabels,
        datasets: [
            {
                label: "Throughput (Gbps)",
                fill: false,
                yAxisID: "y-axis-0",
                data: throughputData_a[0],
                backgroundColor: "rgba(93,195,76,0.4)",
                borderColor: "rgba(93,195,76,1)"
            },
            {
                label: "Latency (ms)",
                fill: false,
                yAxisID: "y-axis-0",
                data: latencyData_a[0],
                backgroundColor: "rgba(220,160,85,0.4)",
                borderColor: "rgba(220,160,85,1)"
            },
            {
                label: "% of Dropped Packets",
                fill: false,
                yAxisID: "y-axis-1",
                data: dropPacketData_a[0],
                backgroundColor: "rgba(141,75,193,0.4)",
                borderColor: "rgba(141,75,193,1)"
            }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Port [0]'
        },
        scales: {
            yAxes: [{
                position: "left",
                "id": "y-axis-0"
            }, {
                position: "right",
                "id": "y-axis-1"
            }]
        }
    }
});

var portCanvas2 = document.getElementById("port-chart2");
portCanvas2.width = parseInt($('#well4').css('width'), 10);
portCanvas2.height = parseInt($('#well4').css('height'), 10);
var portChart2 = new Chart(portCanvas2, {
    type: "line",
    data: {
        labels: timestampLabels,
        datasets: [
            {
                label: "Throughput (Gbps)",
                fill: false,
                yAxisID: "y-axis-0",
                data: throughputData_a[1],
                backgroundColor: "rgba(93,195,76,0.4)",
                borderColor: "rgba(93,195,76,1)"
            },
            {
                label: "Latency (ms)",
                fill: false,
                yAxisID: "y-axis-0",
                data: latencyData_a[1],
                backgroundColor: "rgba(220,160,85,0.4)",
                borderColor: "rgba(220,160,85,1)"
            },
            {
                label: "% of Dropped Packets",
                fill: false,
                yAxisID: "y-axis-1",
                data: dropPacketData_a[1],
                backgroundColor: "rgba(141,75,193,0.4)",
                borderColor: "rgba(141,75,193,1)"
            }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Port [1]'
        },
        scales: {
            yAxes: [{
                position: "left",
                "id": "y-axis-0"
            }, {
                position: "right",
                "id": "y-axis-1"
            }]
        }
    }
});
