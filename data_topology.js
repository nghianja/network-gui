// TODO: refactor to for loop
dataset = [
        // central switch
        { data: { id: 'z', label: 'switch' }, classes: 'bottom-center switch' },
        // group 1
        { data: { id: 'a', label: '192.168.1.1' }, classes: 'bottom-center' },
        { data: { id: 'b', label: '192.168.1.2' }, classes: 'bottom-center' },
        { data: { id: 'c', label: '192.168.1.3' }, classes: 'bottom-center' },
        { data: { id: 'd', label: 'switch' }, classes: 'bottom-center switch' },
        // group 2
        { data: { id: 'e', label: '192.168.2.1' }, classes: 'bottom-center' },
        { data: { id: 'f', label: '192.168.2.2' }, classes: 'bottom-center' },
        { data: { id: 'g', label: '192.168.2.3' }, classes: 'bottom-center' },
        { data: { id: 'h', label: 'switch' }, classes: 'bottom-center switch' },
        // group 3
        { data: { id: 'i', label: '192.168.3.1' }, classes: 'bottom-center' },
        { data: { id: 'j', label: '192.168.3.2' }, classes: 'bottom-center' },
        { data: { id: 'k', label: '192.168.3.3' }, classes: 'bottom-center' },
        { data: { id: 'l', label: 'switch' }, classes: 'bottom-center switch' },
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
