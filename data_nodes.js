var utils = require('./utils');
require('./data_topology');

numberOfNodes = 70; // (22*3 + central switch)
numberOfTimes = 10;
timestampLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

nodes = [
    'a01',
    'a02',
    'a03',
    'a04',
    'a05',
    'a06',
    'a07',
    'a08',
    'a09',
    'a10',
    'a11',
    'a12',
    'a13',
    'a14',
    'a15',
    'a16',
    'a17',
    'a18',
    'a19',
    'a20',
    'a21',
    'a22',
    'b01',
    'b02',
    'b03',
    'b04',
    'b05',
    'b06',
    'b07',
    'b08',
    'b09',
    'b10',
    'b11',
    'b12',
    'b13',
    'b14',
    'b15',
    'b16',
    'b17',
    'b18',
    'b19',
    'b20',
    'b21',
    'b22',
    'c01',
    'c02',
    'c03',
    'c04',
    'c05',
    'c06',
    'c07',
    'c08',
    'c09',
    'c10',
    'c11',
    'c12',
    'c13',
    'c14',
    'c15',
    'c16',
    'c17',
    'c18',
    'c19',
    'c20',
    'c21',
    'c22',
    'aSwitch',
    'bSwitch',
    'cSwitch',
    'centralSwitch'];

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

// port data
numberOfPorts = [1, 1, 1, 22, 1, 1, 1, 22, 1, 1, 1, 22, 3];
// for (i = 0; i < numberOfNodes; i++) {
//     numberOfPorts[i] = utils.getRandomInt(0, 5);
// }
throughputData = [numberOfNodes];
latencyData = [numberOfNodes];
dropPacketData = [numberOfNodes];
for (i = 0; i < numberOfNodes; i++) {
    throughputData[i] = [numberOfPorts[i]];
    dropPacketData[i] = [numberOfPorts[i]];
    latencyData[i] = [numberOfPorts[i]];
    for (j = 0; j < numberOfPorts[i]; j++) {
        throughputData[i][j] = [numberOfTimes];
        dropPacketData[i][j] = [numberOfTimes];
        latencyData[i][j] = [numberOfTimes];
        for (k = 0; k < numberOfTimes; k++) {
            throughputData[i][j][k] = utils.getRandomInt(0, 10000) / 1000;
            dropPacketData[i][j][k] = utils.getRandomInt(0, 10000) / 1000;
            latencyData[i][j][k] = utils.getRandomInt(0, 10000) / 1000;
        }
    }
}
