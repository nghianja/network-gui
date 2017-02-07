// TODO: refactor to for loop
dataset = [
        // central switch
        { data: { id: 'z', label: 'switch' }, classes: 'switch' },
        // group 1
        { data: { id: 'a', label: '192.168.1.1' }},
        { data: { id: 'b', label: '192.168.1.2' }},
        { data: { id: 'c', label: '192.168.1.3' }},
        { data: { id: 'd', label: 'switch' }, classes: 'switch' },
        // group 2
        { data: { id: 'e', label: '192.168.2.1' }},
        { data: { id: 'f', label: '192.168.2.2' }},
        { data: { id: 'g', label: '192.168.2.3' }},
        { data: { id: 'h', label: 'switch' }, classes: 'switch' },
        // group 3
        { data: { id: 'i', label: '192.168.3.1' }},
        { data: { id: 'j', label: '192.168.3.2' }},
        { data: { id: 'k', label: '192.168.3.3' }},
        { data: { id: 'l', label: 'switch' }, classes: 'switch' },
        // edges for group 1
        { data: { id: 'ad', source: 'a', target: 'd' } },
        { data: { id: 'bd', source: 'b', target: 'd' } },
        { data: { id: 'cd', source: 'c', target: 'd' } },
        // edges for group 2
        { data: { id: 'eh', source: 'e', target: 'h' } },
        { data: { id: 'fh', source: 'f', target: 'h' } },
        { data: { id: 'gh', source: 'g', target: 'h' } },
        // edges for group 3
        { data: { id: 'il', source: 'i', target: 'l' } },
        { data: { id: 'jl', source: 'j', target: 'l' } },
        { data: { id: 'kl', source: 'k', target: 'l' } },
        // edges connnecting switches to central switch
        { data: { id: 'dz', source: 'd', target: 'z' } },
        { data: { id: 'hz', source: 'h', target: 'z' } },
        { data: { id: 'lz', source: 'l', target: 'z' } },
    ];
