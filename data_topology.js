// TODO: refactor to for loop
dataset = [
        // central switch
        { data: { id: 'z', label: 'switch' }, classes: 'switch' },

        // group 1
        { data: { id: 'ispA'}},
        { data: { id: 'a', label: '192.168.1.1', parent: 'ispA'}},
        { data: { id: 'b', label: '192.168.1.2', parent: 'ispA'}},
        { data: { id: 'c', label: '192.168.1.3', parent: 'ispA'}},
        { data: { id: 'd', label: 'switch', parent: 'ispA'}, classes: 'switch'},

        // group 2
        { data: { id: 'ispB'}},
        { data: { id: 'e', label: '192.168.2.1', parent: 'ispB' }},
        { data: { id: 'f', label: '192.168.2.2', parent: 'ispB' }},
        { data: { id: 'g', label: '192.168.2.3', parent: 'ispB' }},
        { data: { id: 'h', label: 'switch', parent: 'ispB' }, classes: 'switch' },

        // group 3
        { data: { id: 'ispC'}},
        { data: { id: 'i', label: '192.168.3.1', parent: 'ispC'  }},
        { data: { id: 'j', label: '192.168.3.2', parent: 'ispC'  }},
        { data: { id: 'k', label: '192.168.3.3', parent: 'ispC'  }},
        { data: { id: 'l', label: 'switch', parent: 'ispC'  }, classes: 'switch' },
        
        // edges for group 1
        { data: { id: 'e00', source: 'a', target: 'd' } },
        { data: { id: 'e01', source: 'b', target: 'd' } },
        { data: { id: 'e02', source: 'c', target: 'd' } },

        // edges for group 2
        { data: { id: 'e03', source: 'e', target: 'h' } },
        { data: { id: 'e04', source: 'f', target: 'h' } },
        { data: { id: 'e05', source: 'g', target: 'h' } },

        // edges for group 3
        { data: { id: 'e06', source: 'i', target: 'l' } },
        { data: { id: 'e07', source: 'j', target: 'l' } },
        { data: { id: 'e08', source: 'k', target: 'l' } },

        // edges connnecting switches to central switch
        { data: { id: 'e09', source: 'd', target: 'z' } },
        { data: { id: 'e10', source: 'h', target: 'z' } },
        { data: { id: 'e11', source: 'l', target: 'z' } }
    ];
