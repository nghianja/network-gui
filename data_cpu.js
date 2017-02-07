cpuLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
cpuData_a = [23, 31, 75, 78, 64, 60, 76, 75, 55, 24];
cpuData_b = [38, 30, 44, 52, 64, 86, 69, 60, 36, 30];
cpuData_c = [36, 36, 40, 63, 80, 80, 74, 80, 33, 35];
cpuData_d = [54, 26, 51, 61, 74, 93, 53, 48, 52, 45];
cpuData_e = [43, 53, 69, 47, 71, 83, 77, 63, 25, 44];
cpuData_f = [29, 60, 71, 66, 95, 67, 74, 80, 44, 42];
cpuData_g = [52, 23, 49, 56, 69, 88, 56, 52, 55, 37];
cpuData_h = [49, 56, 57, 61, 60, 99, 49, 67, 29, 33];
cpuData_i = [33, 32, 64, 56, 68, 82, 71, 43, 37, 60];
cpuData_j = [25, 28, 63, 44, 94, 82, 52, 52, 46, 60];
cpuData_k = [23, 31, 40, 63, 71, 83, 56, 52, 37, 60];
cpuData_l = [38, 30, 51, 61, 95, 67, 49, 67, 46, 60];
cpuData_overall = new Array();
for (i = 0; i < 10; i++) {
    cpuData_overall[i] = Math.floor((cpuData_a[i] +
                         cpuData_b[i] +
                         cpuData_c[i] +
                         cpuData_d[i] +
                         cpuData_e[i] +
                         cpuData_f[i] +
                         cpuData_g[i] +
                         cpuData_h[i] +
                         cpuData_i[i] +
                         cpuData_j[i] +
                         cpuData_k[i] +
                         cpuData_l[i]) / 12);
}
