networkLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
networkData_overall = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100];
networkData_a = [84, 81, 56, 85, 67, 78, 85, 71, 97, 91];
networkData_b = [59, 56, 66, 95, 55, 58, 84, 93, 64, 64];
networkData_c = [100, 98, 69, 57, 59, 91, 59, 80, 80, 80];
networkData_d = [100, 91, 81, 84, 61, 97, 99, 55, 78, 69];
networkData_e = [63, 88, 51, 95, 76, 100, 70, 73, 66, 88];
networkData_f = [78, 81, 85, 63, 62, 86, 75, 68, 79, 61];
networkData_g = [66, 100, 71, 77, 99, 75, 99, 94, 60, 54];
networkData_h = [88, 70, 100, 66, 50, 87, 51, 68, 96, 82];
networkData_i = [81, 61, 66, 72, 89, 63, 58, 58, 92, 51];
networkData_j = [83, 73, 76, 68, 66, 54, 68, 63, 61, 53];
networkData_k = [100, 63, 80, 90, 87, 64, 65, 50, 86, 64];
networkData_l = [68, 53, 93, 69, 68, 89, 61, 75, 100, 76];
networkData_overall = new Array();
for (i = 0; i < 10; i++) {
    networkData_overall[i] = Math.floor((networkData_a[i] +
                         networkData_b[i] +
                         networkData_c[i] +
                         networkData_d[i] +
                         networkData_e[i] +
                         networkData_f[i] +
                         networkData_g[i] +
                         networkData_h[i] +
                         networkData_i[i] +
                         networkData_j[i] +
                         networkData_k[i] +
                         networkData_l[i]) / 12);
}
