// cpu chart
cpuChartStyle = {
    labels: timestampLabels,
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
        spanGaps: false
    }]
};

// network chart
networkChartStyle = {
    labels: timestampLabels,
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
        spanGaps: false
    }]
};

// port charts
portChartStyle1 = {
    datasets: [{}, {}, {}]
};

portChartStyle2 = {
    datasets: [{}, {}, {}]
};

portChartStyle3 = {
    datasets: [{}, {}, {}]
};

portChartStyle4 = {
    datasets: [{}, {}, {}]
};

portChartStyle5 = {
    datasets: [{}, {}, {}]
};

portChartStyle6 = {
    datasets: [{}, {}, {}]
};

portChartStyle7 = {
    datasets: [{}, {}, {}]
};

portChartStyle8 = {
    datasets: [{}, {}, {}]
};

portChartStyle9 = {
    datasets: [{}, {}, {}]
};

portChartStyle10 = {
    datasets: [{}, {}, {}]
};

portChartStyle11 = {
    datasets: [{}, {}, {}]
};

portChartStyle12 = {
    datasets: [{}, {}, {}]
};

portChartStyle13 = {
    datasets: [{}, {}, {}]
};

portChartStyle14 = {
    datasets: [{}, {}, {}]
};

portChartStyle15 = {
    datasets: [{}, {}, {}]
};

portChartStyle16 = {
    datasets: [{}, {}, {}]
};

portChartStyle17 = {
    datasets: [{}, {}, {}]
};

portChartStyle18 = {
    datasets: [{}, {}, {}]
};

portChartStyle19 = {
    datasets: [{}, {}, {}]
};

portChartStyle20 = {
    datasets: [{}, {}, {}]
};

portChartStyle21 = {
    datasets: [{}, {}, {}]
};

portChartStyle22 = {
    datasets: [{}, {}, {}]
};

portChartStyles = [
    portChartStyle1,
    portChartStyle2,
    portChartStyle3,
    portChartStyle4,
    portChartStyle5,
    portChartStyle6,
    portChartStyle7,
    portChartStyle8,
    portChartStyle9,
    portChartStyle10,
    portChartStyle11,
    portChartStyle12,
    portChartStyle13,
    portChartStyle14,
    portChartStyle15,
    portChartStyle16,
    portChartStyle17,
    portChartStyle18,
    portChartStyle19,
    portChartStyle20,
    portChartStyle21,
    portChartStyle22];

// populate portChartStyles
for (i = 0; i < portChartStyles.length; i++) {
    var labels = "labels";
    portChartStyles[i][labels] = timestampLabels;
    var label = "label";
    portChartStyles[i].datasets[0][label] = "Throughput (Gbps)";
    portChartStyles[i].datasets[1][label] = "Latency (ms)";
    portChartStyles[i].datasets[2][label] = "% of Dropped Packets";
    var fill = "fill";
    portChartStyles[i].datasets[0][fill] = false;
    portChartStyles[i].datasets[1][fill] = false;
    portChartStyles[i].datasets[2][fill] = false;
    var yAxisID = "yAxisID";
    portChartStyles[i].datasets[0][yAxisID] = "y-axis-0";
    portChartStyles[i].datasets[1][yAxisID] = "y-axis-0";
    portChartStyles[i].datasets[2][yAxisID] = "y-axis-1";
    var backgroundColor = "backgroundColor";
    portChartStyles[i].datasets[0][backgroundColor] = "rgba(93,195,76,0.4)";
    portChartStyles[i].datasets[1][backgroundColor] = "rgba(220,160,85,0.4)";
    portChartStyles[i].datasets[2][backgroundColor] = "rgba(141,75,193,0.4)";
    var borderColor = "borderColor";
    portChartStyles[i].datasets[0][borderColor] = "rgba(93,195,76,1)";
    portChartStyles[i].datasets[1][borderColor] = "rgba(220,160,85,1)";
    portChartStyles[i].datasets[2][borderColor] = "rgba(141,75,193,1)";
}

portChartScales = {
    yAxes: [{
        position: "left",
        "id": "y-axis-0"
    }, {
        position: "right",
        "id": "y-axis-1"
    }]
};
