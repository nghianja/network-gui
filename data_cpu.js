cpuLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
cpuData_a = [0, 10, 10, 20, 30, 70, 90, 60, 20, 10];
cpuData_b = [10, 65, 59, 80, 20, 81, 56, 55, 30, 40];
cpuData_c = [0, 10, 10, 20, 30, 70, 90, 60, 20, 10];
cpuData_d = [10, 65, 59, 80, 20, 81, 56, 55, 30, 40];
cpuData_e = [0, 10, 10, 20, 30, 70, 90, 60, 20, 10];
cpuData_f = [10, 65, 59, 80, 20, 81, 56, 55, 30, 40];
cpuData_g = [0, 10, 10, 20, 30, 70, 90, 60, 20, 10];
cpuData_h = [10, 65, 59, 80, 20, 81, 56, 55, 30, 40];
cpuData_i = [0, 10, 10, 20, 30, 70, 90, 60, 20, 10];
cpuData_j = [10, 65, 59, 80, 20, 81, 56, 55, 30, 40];
cpuData_k = [0, 10, 10, 20, 30, 70, 90, 60, 20, 10];
cpuData_l = [10, 65, 59, 80, 20, 81, 56, 55, 30, 40];
cpuData_z = [0, 10, 10, 20, 30, 70, 90, 60, 20, 10];
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
