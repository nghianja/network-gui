var utils = require('./utils');
require('./data_topology');
require('./data_ports');

numberOfNodes = 13;
numberOfTimes = 10;
timestampLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

nodes = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'z'];

// cpu and network data
cpuData = [numberOfNodes + 1];
networkData = [numberOfNodes + 1];
for (i = 0; i < numberOfNodes; i++) {
    cpuData[i] = [numberOfTimes];
    networkData[i] = [numberOfTimes];
    for (j = 0; j < numberOfTimes; j++) {
        cpuData[i][j] = utils.getRandomInt(0, 100);
        networkData[i][j] = utils.getRandomInt(0, 100);
    }
}
cpuData_overall = [numberOfTimes];
networkData_overall = [numberOfTimes];
cpuData[numberOfNodes] = cpuData_overall;
networkData[numberOfNodes] = networkData_overall;
for (i = 0; i < numberOfTimes; i++) {
    var cpuTotal = 0;
    var networkTotal = 0;
    for (j = 0; j < numberOfNodes; j++) {
        cpuTotal = cpuTotal + cpuData[j][i];
        networkTotal = networkTotal + networkData[j][i];
    }
    cpuData_overall[i] = Math.floor(cpuTotal / numberOfNodes);
    networkData_overall[i] = Math.floor(networkTotal / numberOfNodes);
}

numberOfPorts = [
    1,
    2,
    3];

throughputData = [
    throughputData_a,
    throughputData_b,
    throughputData_c];

latencyData = [
    latencyData_a,
    latencyData_b,
    latencyData_c];

dropPacketData = [
    dropPacketData_a,
    dropPacketData_b,
    dropPacketData_c];
