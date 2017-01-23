$('#ex1').slider({
  formatter: function(value) {
    return 'Current value: ' + value;
  }
});

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

var canvas1 = document.getElementById("chart1");
canvas1.width = parseInt($('#well1').css('width'), 10);
canvas1.height = parseInt($('#well1').css('height'), 10);
var chart1 = new Chart(canvas1, {
  type: 'bar',
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
});

var canvas2 = document.getElementById("chart2");
canvas2.width = parseInt($('#well2').css('width'), 10);
canvas2.height = parseInt($('#well2').css('height'), 10);
var chart2 = new Chart(canvas2, {
  type: 'line',
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
      label: "My First dataset",
      fill: false,
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
      data: [65, 59, 80, 81, 56, 55, 40],
        spanGaps: false,
    }]
  }
});

var data = {
    labels: [
        "Red",
        "Blue",
        "Yellow"
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
        ],
        hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
        ]
    }]
};

var canvas3 = document.getElementById("chart3");
canvas3.width = parseInt($('#well3').css('width'), 10);
canvas3.height = parseInt($('#well3').css('height'), 10);
var chart3 = new Chart(canvas3, {
  type: 'pie',
  data: data
});

var canvas4 = document.getElementById("chart4");
canvas4.width = parseInt($('#well4').css('width'), 10);
canvas4.height = parseInt($('#well4').css('height'), 10);
var chart4 = new Chart(canvas4, {
  type: 'doughnut',
  data: data
});
