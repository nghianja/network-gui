$('#ex1').slider({
    formatter: function(value) {
        return 'Current time: ' + value;
    }
});
var previousIndex = 0;
var pointIndex = 0;
$("#ex1").on("slide", function(slideEvt) {
    $("#ex1SliderVal").text(slideEvt.value);
    pointIndex = slideEvt.value;
    highlightPointOnCharts();
});
function highlightPointOnCharts(){
    var cpuMeta = cpuChart.getDatasetMeta(0);
    var networkMeta = networkChart.getDatasetMeta(0);

    // Reset previous point
    var cpuOldPoint = cpuMeta.data[previousIndex];
    cpuOldPoint.custom = cpuOldPoint.custom || {};
    cpuOldPoint.custom.backgroundColor = "#fff";
    cpuOldPoint.custom.radius = 1;
    var networkOldPoint = networkMeta.data[previousIndex];
    networkOldPoint.custom = networkOldPoint.custom || {};
    networkOldPoint.custom.backgroundColor = "#fff";
    networkOldPoint.custom.radius = 1;

    //Get point object and change the radius/color
    var cpuPoint = cpuMeta.data[pointIndex];
    cpuPoint.custom = cpuPoint.custom || {};
    cpuPoint.custom.backgroundColor = "rgba(0,0,225,1)";
    cpuPoint.custom.radius = 7;
    var networkPoint = networkMeta.data[pointIndex];
    networkPoint.custom = networkPoint.custom || {};
    networkPoint.custom.backgroundColor = "rgba(0,0,225,1)";
    networkPoint.custom.radius = 7;

    // first parameter to update is the animation duration.
    // if none is specified, the config animation duration
    // is used. Using 0 here will do the draw immediately.
    cpuChart.update(0);
    networkChart.update(0);

    previousIndex = pointIndex;
}

var cy = cytoscape({
    container: $('#cy')
});

var eles = cy.add([
    { group: "nodes", data: { id: "n0" }, position: { x: 100, y: 100 } },
    { group: "nodes", data: { id: "n1" }, position: { x: 200, y: 200 } },
    { group: "nodes", data: { id: "n2" }, position: { x: 100, y: 200 } },
    { group: "edges", data: { id: "e0", source: "n0", target: "n1" } },
    { group: "edges", data: { id: "e1", source: "n0", target: "n2" } },
    { group: "edges", data: { id: "e2", source: "n1", target: "n2" } }
]);

// var canvas1 = document.getElementById("chart1");
// canvas1.width = parseInt($('#well1').css('width'), 10);
// canvas1.height = parseInt($('#well1').css('height'), 10);
// var chart1 = new Chart(canvas1, {
//   type: 'bar',
//   data: {
//     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//     datasets: [{
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255,99,132,1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)'
//       ],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero:true
//         }
//       }]
//     }
//   }
// });

var cpuCanvas = document.getElementById("cpu-chart");
cpuCanvas.width = parseInt($('#well1').css('width'), 10);
cpuCanvas.height = parseInt($('#well1').css('height'), 10);
var cpuChart = new Chart(cpuCanvas, {
    type: 'line',
    data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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
            pointRadius: 1,
            pointHitRadius: 10,
            data: [10, 65, 59, 80, 20, 81, 56, 55, 30, 40],
            spanGaps: false,
        }]
    }
});

var networkCanvas = document.getElementById("network-chart");
networkCanvas.width = parseInt($('#well2').css('width'), 10);
networkCanvas.height = parseInt($('#well2').css('height'), 10);
var networkChart = new Chart(networkCanvas, {
    type: 'line',
    data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [50, 50, 50, 50, 40, 30, 70, 90, 100, 100],
            spanGaps: false,
        }]
    }
});

// var data = {
//     labels: [
//         "Red",
//         "Blue",
//         "Yellow"
//     ],
//     datasets: [{
//         data: [300, 50, 100],
//         backgroundColor: [
//             "#FF6384",
//             "#36A2EB",
//             "#FFCE56"
//         ],
//         hoverBackgroundColor: [
//             "#FF6384",
//             "#36A2EB",
//             "#FFCE56"
//         ]
//     }]
// };

// var canvas3 = document.getElementById("chart3");
// canvas3.width = parseInt($('#well3').css('width'), 10);
// canvas3.height = parseInt($('#well3').css('height'), 10);
// var chart3 = new Chart(canvas3, {
//   type: 'pie',
//   data: data
// });
//
// var canvas4 = document.getElementById("chart4");
// canvas4.width = parseInt($('#well4').css('width'), 10);
// canvas4.height = parseInt($('#well4').css('height'), 10);
// var chart4 = new Chart(canvas4, {
//   type: 'doughnut',
//   data: data
// });
