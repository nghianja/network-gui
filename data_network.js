networkLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
networkData_a = [50, 50, 50, 50, 40, 30, 70, 90, 100, 100];
networkData_b = [0, 0, 0, 0, 0, 50, 100, 50, 0, 0];
networkData_c = [50, 50, 50, 50, 40, 30, 70, 90, 100, 100];
networkData_d = [0, 0, 0, 0, 0, 50, 100, 50, 0, 0];
networkData_e = [50, 50, 50, 50, 40, 30, 70, 90, 100, 100];
networkData_f = [0, 0, 0, 0, 0, 50, 100, 50, 0, 0];
networkData_g = [50, 50, 50, 50, 40, 30, 70, 90, 100, 100];
networkData_h = [0, 0, 0, 0, 0, 50, 100, 50, 0, 0];
networkData_i = [50, 50, 50, 50, 40, 30, 70, 90, 100, 100];
networkData_j = [0, 0, 0, 0, 0, 50, 100, 50, 0, 0];
networkData_k = [50, 50, 50, 50, 40, 30, 70, 90, 100, 100];
networkData_l = [0, 0, 0, 0, 0, 50, 100, 50, 0, 0];
networkData_z = [50, 50, 50, 50, 40, 30, 70, 90, 100, 100];
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
