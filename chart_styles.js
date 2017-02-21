// cpu chart
cpuChartStyle = {
    labels: timestampLabels,
        datasets: [{
        label: 'CPU Usage',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
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
        label: 'Total Network Usage (KB/s)',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(153,102,255, 0.4)',
        borderColor: 'rgba(153,102,255, 1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(153,102,255, 1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(152,102,255,1)',
        pointHoverBorderColor: 'rgba(152,102,255,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        spanGaps: false
    }]
};

networkChartOptions = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                steps: 5,
                max: 100
            }
        }]
    },
    maintainAspectRatio: false
};

// port charts
portChartStyle1 = {
    datasets: [{}, {}]
};

portChartStyle2 = {
    datasets: [{}, {}]
};

portChartStyles = [
    portChartStyle1,
    portChartStyle2];

// populate portChartStyles
for (i = 0; i < portChartStyles.length; i++) {
    var labels = 'labels';
    portChartStyles[i][labels] = timestampLabels;
    var label = 'label';
    portChartStyles[i].datasets[0][label] = 'Input (KB/s)';
    portChartStyles[i].datasets[1][label] = 'Output (KB/s)';
    var fill = 'fill';
    portChartStyles[i].datasets[0][fill] = false;
    portChartStyles[i].datasets[1][fill] = false;
    var yAxisID = 'yAxisID';
    portChartStyles[i].datasets[0][yAxisID] = 'y-axis-0';
    portChartStyles[i].datasets[1][yAxisID] = 'y-axis-0';
    var backgroundColor = 'backgroundColor';
    portChartStyles[i].datasets[0][backgroundColor] = 'rgba(27,145,215,0.4)';
    portChartStyles[i].datasets[1][backgroundColor] = 'rgba(220,160,85,0.4)';
    var borderColor = 'borderColor';
    portChartStyles[i].datasets[0][borderColor] = 'rgba(27,145,215,1)';
    portChartStyles[i].datasets[1][borderColor] = 'rgba(220,160,85,1)';
}

portChartScales = {
    yAxes: [{
        position: 'left',
        'id': 'y-axis-0',
        ticks: {
            beginAtZero: true,
            steps: 5,
            max: 1250000
        }
    }]
};

// cy style
cyStyle = [
    {
        selector: 'node',
        style: {
            'label': 'data(id)',
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
];
