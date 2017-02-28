module.exports.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports.getNodeColourIndex = function(networkLoad) {
    if (networkLoad > 2000000) {
        return 0;
    } else if (networkLoad > 1000000) {
        return 1;
    } else if (networkLoad > 600000) {
        return 2;
    } else if (networkLoad > 280000) {
        return 3;
    } else if (networkLoad > 260000) {
        return 4;
    } else if (networkLoad > 240000) {
        return 5;
    } else if (networkLoad > 200000) {
        return 6;
    } else {
        return 7;
    }
};

module.exports.colourEdge = function(bandwidth, edge) {
    if (bandwidth > 800000) {
        edge.style({ 'line-color':'red' });
    } else if (bandwidth > 240000) {
        edge.style({ 'line-color':'orange' });
    } else {
        edge.style({ 'line-color':'green' });
    }
};

module.exports.updateHighlightedPointOnChart = function(chart, datasetNum, previousIndex, pointIndex) {
    let chartMeta = chart.getDatasetMeta(datasetNum);

    // Reset previous point
    resetPointOnChart(chart, datasetNum, previousIndex);

    //Get point object and change the radius/color
    let newPoint = chartMeta.data[pointIndex];
    newPoint.custom = newPoint.custom || {};
    newPoint.custom.backgroundColor = '#828282';
    newPoint.custom.radius = 7;

    // this function doesn't update the chart so remember to do so after calling it!
};

module.exports.resetPointOnChart = function(chart, datasetNum, index) {
    resetPointOnChart(chart, datasetNum, index);
};

function resetPointOnChart(chart, datasetNum, index) {
    let chartMeta = chart.getDatasetMeta(datasetNum);

    // Reset point
    let point = chartMeta.data[index];
    if (point) {
        point.custom = point.custom || {};
        point.custom.backgroundColor = '#fff';
        point.custom.radius = 3;
    }
}
