const fs = require('fs');
const path = require('path');

dataset = [];

// dataset = [
    // central switch
    // { data: { id: 'mainLan', label: 'switch' }, classes: 'switch' },

    // isps
    // { data: { id: 'ispA'}, classes: 'parent' },
    // { data: { id: 'ispB'}, classes: 'parent' },
    // { data: { id: 'ispC'}, classes: 'parent' },

    // switches
    // { data: { id: 'lanC1', label: 'switch', parent: 'ispA', numPorts: 24}, classes: 'switch'},
    // { data: { id: 'lanC2', label: 'switch', parent: 'ispB', numPorts: 24 }, classes: 'switch' },
    // { data: { id: 'lanC4', label: 'switch', parent: 'ispC', numPorts: 20 }, classes: 'switch' },

    // group 1
    // { data: { id: 'anode-0', label: '172.30.7.4', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-1', label: '172.30.7.5', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-2', label: '172.30.7.6', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-3', label: '172.30.7.7', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-4', label: '172.30.7.8', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-5', label: '172.30.7.9', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-6', label: '172.30.7.10', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-7', label: '172.30.7.11', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-8', label: '172.30.7.12, 172.30.4.2', parent: 'ispA', numPorts: 2}},
    // { data: { id: 'anode-9', label: '172.30.7.13, 172.30.5.2', parent: 'ispA', numPorts: 2}},
    // { data: { id: 'anode-10', label: '172.30.7.14', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-11', label: '172.30.7.15', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-12', label: '172.30.7.16', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-13', label: '172.30.7.17', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-14', label: '172.30.7.18', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-15', label: '172.30.7.19', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-16', label: '172.30.7.20', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-17', label: '172.30.7.21', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-18', label: '172.30.7.22', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-19', label: '172.30.7.23', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-20', label: '172.30.7.24', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'anode-21', label: '172.30.7.25', parent: 'ispA', numPorts: 1}},
    // { data: { id: 'nodeC01', label: '172.30.7.3, 172.30.2.5', parent: 'ispA', numPorts: 2}},
    // { data: { id: 'nodeC1', label: '172.30.7.2, 172.30.2.2', parent: 'ispA', numPorts: 2 }},

    // group 2

    // { data: { id: 'bnode-0', label: '172.30.3.4', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-1', label: '172.30.3.5', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-2', label: '172.30.3.6', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-3', label: '172.30.3.7', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-4', label: '172.30.3.8', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-5', label: '172.30.3.9', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-6', label: '172.30.3.10', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-7', label: '172.30.3.11', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-8', label: '172.30.3.12, 172.30.1.2', parent: 'ispB', numPorts: 2 }},
    // { data: { id: 'bnode-9', label: '172.30.3.13, 172.30.5.3', parent: 'ispB', numPorts: 2 }},
    // { data: { id: 'bnode-10', label: '172.30.3.14', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-11', label: '172.30.3.15', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-12', label: '172.30.3.16', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-13', label: '172.30.3.17', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-14', label: '172.30.3.18', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-15', label: '172.30.3.19', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-16', label: '172.30.3.20', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-17', label: '172.30.3.21', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-18', label: '172.30.3.22', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-19', label: '172.30.3.23', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-20', label: '172.30.3.24', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'bnode-21', label: '172.30.3.25', parent: 'ispB', numPorts: 1 }},
    // { data: { id: 'nodeC02', label: '172.30.3.3, 172.30.2.6', parent: 'ispB', numPorts: 2}},
    // { data: { id: 'nodeC2', label: '172.30.3.2, 172.30.2.3', parent: 'ispB', numPorts: 2}},

    // group 3
    // { data: { id: 'dnode-3', label: '172.30.6.4', parent: 'ispC', numPorts: 1  }},
    // { data: { id: 'dnode-4', label: '172.30.6.5', parent: 'ispC', numPorts: 1  }},
    // { data: { id: 'dnode-5', label: '172.30.6.6', parent: 'ispC', numPorts: 1  }},
    // { data: { id: 'dnode-6', label: '172.30.6.7', parent: 'ispC', numPorts: 1  }},
    // { data: { id: 'dnode-7', label: '172.30.6.8', parent: 'ispC', numPorts: 1  }},
    // { data: { id: 'dnode-8', label: '172.30.6.9, 172.30.1.3', parent: 'ispC', numPorts: 2  }},
    // { data: { id: 'dnode-9', label: '172.30.6.10, 172.30.4.3', parent: 'ispC', numPorts: 2  }},
    // { data: { id: 'dnode-10', label: '172.30.6.11', parent: 'ispC', numPorts: 1  }},
    // { data: { id: 'dnode-12', label: '172.30.6.12', parent: 'ispC', numPorts: 1  }},
    // { data: { id: 'dnode-13', label: '172.30.6.13', parent: 'ispC', numPorts: 1  }},
    // { data: { id: 'dnode-14', label: '172.30.6.14', parent: 'ispC', numPorts: 1  }},
    // { data: { id: 'dnode-15', label: '172.30.6.15', parent: 'ispC', numPorts: 1  }},
    // { data: { id: 'dnode-16', label: '172.30.6.16', parent: 'ispC', numPorts: 1  }},
    // { data: { id: 'dnode-17', label: '172.30.6.17', parent: 'ispC', numPorts: 1  }},
    // { data: { id: 'dnode-18', label: '172.30.6.18', parent: 'ispC', numPorts: 1  }},
    // { data: { id: 'dnode-19', label: '172.30.6.19', parent: 'ispC', numPorts: 1  }},
    // { data: { id: 'dnode-20', label: '172.30.6.20', parent: 'ispC', numPorts: 1  }},
    // { data: { id: 'dnode-21', label: '172.30.6.21', parent: 'ispC', numPorts: 1  }},
    // { data: { id: 'nodeC04', label: '172.30.6.3, 172.30.2.7', parent: 'ispC', numPorts: 2  }},
    // { data: { id: 'nodeC4', label: '172.30.6.2, 172.30.2.4', parent: 'ispC', numPorts: 2  }},

    // edges connnecting two nodes to central switch
    // { data: { id: 'enodeC01Main', source: 'nodeC01', target: 'mainLan', sPort: 1, tPort: 0 } },
    // { data: { id: 'enodeC1Main', source: 'nodeC1', target: 'mainLan', sPort: 1, tPort: 1 } },
    // { data: { id: 'enodeC02Main', source: 'nodeC02', target: 'mainLan', sPort: 1, tPort: 2 } },
    // { data: { id: 'enodeC2Main', source: 'nodeC2', target: 'mainLan', sPort: 1, tPort: 3 } },
    // { data: { id: 'enodeC04Main', source: 'nodeC04', target: 'mainLan', sPort: 1, tPort: 4 } },
    // { data: { id: 'enodeC4Main', source: 'nodeC4', target: 'mainLan', sPort: 1, tPort: 5 } },

    // edges connecting nodes from one cluster to another cluster
    // TODO: identify which is the sPort and tPort
    // { data: { id: 'eanode-9-bnode-9', source: 'anode-9', target: 'bnode-9', sPort: 1, tPort: 1 } },
    // { data: { id: 'eanode-8-dnode-9', source: 'anode-8', target: 'dnode-9', sPort: 1, tPort: 1 } },
    // { data: { id: 'ebnode-8-dnode-8', source: 'bnode-8', target: 'dnode-8', sPort: 1, tPort: 1 } },
// ];

parents = [];

// read topology.json
let p = path.join(__dirname, '/', 'topology.json');
let topologyData = JSON.parse(fs.readFileSync(p, 'utf8'));
// console.log(topologyData);
for (const key of Object.keys(topologyData)) {
    let nodeId = key;
    let type = topologyData[key].type;
    // console.log(nodeId + ': ' + type);

    if (type == 'parent') {
        // parents
        let parent = {
            data: {
                id: nodeId
            },
            classes: 'parent'
        };
        dataset.push(parent);
        parents.push(nodeId);
    } else if (type == 'switch' && topologyData[key].parent) {
        // switches with parent
        let switchNode = {
            data: {
                id: nodeId,
                label: 'switch',
                parent: topologyData[key].parent
            },
            classes: 'switch'
        };
        dataset.push(switchNode);
    } else if (type == 'switch') {
        // switches
        let switchNode = {
            data: {
                id: nodeId,
                label: 'switch'
            },
            classes: 'switch'
        };
        dataset.push(switchNode);
    } else {
        // nodes
        let node = {
            data: {
                id: nodeId,
                label: topologyData[key].label,
                parent: topologyData[key].parent,
                numPorts: topologyData[key].numPorts
            }
        };
        dataset.push(node);
        if (topologyData[key].numPorts > 1) {
            let numPorts = topologyData[key].numPorts;
            for (i = 1; i < numPorts; i++) {
                let connection = topologyData[key].connections[i];
                // console.log(connection);
                let edge = {
                    data: {
                        id: 'e' + nodeId + '-' + connection.target,
                        source: nodeId,
                        target: connection.target,
                        sPort: connection.sourcePort,
                        tPort: connection.targetPort
                    }
                };
                dataset.push(edge);
            }
        }
    }
}

// connecting switches to parents
switchesWithParent = [parents.length];
for (const key of Object.keys(topologyData)) {
    let nodeId = key;
    let type = topologyData[key].type;
    if (type == 'switch' && topologyData[key].parent) {
        for (i = 0; i < parents.length; i++) {
            if (topologyData[key].parent == parents[i]) {
                switchesWithParent[i] = nodeId;
            }
        }
    }
}

// edges for nodes
// assumes every parent only has one switch as its child
for (j = 0; j < parents.length; j++) {
    let parent = parents[j];
    let switchWithParent = switchesWithParent[j];
    let lanPort = 0;
    for (i = 0; i < dataset.length; i++) {
        if (dataset[i].data.parent == parent && dataset[i].classes != 'switch') {
            let nodeId = dataset[i].data.id;
            let edge = {
                data: {
                    id: 'e' + nodeId,
                    source: nodeId,
                    target: switchWithParent,
                    sPort: 0,
                    tPort: lanPort
                },
                classes: 'dashed'
            };
            dataset.push(edge);
            lanPort++;
        }
    }
}
