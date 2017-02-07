var utils = require('./utils');
require('./data_topology');
require('./data_network');
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

cpuLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
cpuData = [numberOfNodes + 1];
for (i = 0; i < numberOfNodes; i++) {
    cpuData[i] = [numberOfTimes];
    for (j = 0; j < numberOfTimes; j++) {
        cpuData[i][j] = utils.getRandomInt(0, 100);
    }
}
cpuData_overall = [numberOfTimes];
cpuData[numberOfNodes] = cpuData_overall;
for (i = 0; i < numberOfTimes; i++) {
    var total = 0;
    for (j = 0; j < numberOfNodes; j++) {
        total = total + cpuData[j][i];
    }
    cpuData_overall[i] = Math.floor(total / numberOfNodes);
}

networkData = [
    networkData_a,
    networkData_b,
    networkData_c,
    networkData_d,
    networkData_e,
    networkData_f,
    networkData_g,
    networkData_h,
    networkData_i,
    networkData_j,
    networkData_k,
    networkData_l,
    networkData_z,
    networkData_overall];

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
