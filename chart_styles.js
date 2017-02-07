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
portChartStyle = {
    labels: timestampLabels,
        datasets: [
        {
            label: "Throughput (Gbps)",
            fill: false,
            yAxisID: "y-axis-0",
            backgroundColor: "rgba(93,195,76,0.4)",
            borderColor: "rgba(93,195,76,1)"
        },
        {
            label: "Latency (ms)",
            fill: false,
            yAxisID: "y-axis-0",
            backgroundColor: "rgba(220,160,85,0.4)",
            borderColor: "rgba(220,160,85,1)"
        },
        {
            label: "% of Dropped Packets",
            fill: false,
            yAxisID: "y-axis-1",
            backgroundColor: "rgba(141,75,193,0.4)",
            borderColor: "rgba(141,75,193,1)"
        }
    ]
};

portChartScales = {
    yAxes: [{
        position: "left",
        "id": "y-axis-0"
    }, {
        position: "right",
        "id": "y-axis-1"
    }]
};
