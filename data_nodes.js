var utils = require('./utils');
var data_logs = require('./data_logs');
require('./data_topology');

numberOfNodes = 68 // (22*3 + central switch)
numberOfTimes = 88;
timestampLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

nodes = [];
// port data
numberOfPorts = [];

inputData = [numberOfNodes]; // input
outputData = [numberOfNodes];    // output
dropPacketData = [numberOfNodes];

data_logs.readFiles();

for (i = 0 ; i < dataset.length; i++) {
    if (dataset[i].data.id.lastIndexOf("isp", 0) === -1 && dataset[i].data.id.lastIndexOf("e", 0) === -1) {
        nodes.push(dataset[i].data.id);
        // numberOfPorts.push(dataset[i].data.numPorts);

        if (dataset[i].data.id.lastIndexOf("lan", 0) != -1 || dataset[i].data.id.lastIndexOf("mainLan", 0) != -1) {
            // ignore the lan for ports
            numberOfPorts.push(0);

            inputData[i] = 0;
        } else {
           var nodeDataMap = data_logs.getLogsMap().get(dataset[i].data.id);
           var numberOfPortsPerNode = nodeDataMap.get("numOfPorts")
           numberOfPorts.push(numberOfPortsPerNode);
        }
    }
}

// cpu and network data
cpuData = [numberOfNodes + 1];
for (i = 0; i < numberOfNodes; i++) {
    cpuData[i] = [numberOfTimes];
    for (j = 0; j < numberOfTimes; j++) {
        cpuData[i][j] = utils.getRandomInt(0, 100);
    }
}
cpuData_overall = [numberOfTimes];
networkData_overall = [numberOfTimes];
for (i = 0; i < numberOfTimes; i++) {
    networkData_overall[i] = utils.getRandomInt(0, 100);
}
cpuData[numberOfNodes] = cpuData_overall;
for (i = 0; i < numberOfTimes; i++) {
    var cpuTotal = 0;
    for (j = 0; j < numberOfNodes; j++) {
        cpuTotal = cpuTotal + cpuData[j][i];
    }
    cpuData_overall[i] = Math.floor(cpuTotal / numberOfNodes);
}

// for (i = 0; i < numberOfNodes; i++) {
//     numberOfPorts[i] = utils.getRandomInt(0, 5);
// }

for (i = 0; i < numberOfNodes; i++) {
    // throughputData[i] = [numberOfPorts[i]];
    // dropPacketData[i] = [numberOfPorts[i]];
    // latencyData[i] = [numberOfPorts[i]];
    // for (j = 0; j < numberOfPorts[i]; j++) {
    //     throughputData[i][j] = [numberOfTimes];
    //     dropPacketData[i][j] = [numberOfTimes];
    //     latencyData[i][j] = [numberOfTimes];
    //     for (k = 0; k < numberOfTimes; k++) {
    //         throughputData[i][j][k] = utils.getRandomInt(0, 10000) / 1000;
    //         dropPacketData[i][j][k] = utils.getRandomInt(0, 10000) / 1000;
    //         latencyData[i][j][k] = utils.getRandomInt(0, 10000) / 1000;
    //     }
    // }
}
