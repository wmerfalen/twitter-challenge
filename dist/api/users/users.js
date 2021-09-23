const fs = require('fs');

let users = [];

let record = {
    userName: '@userName1234',
    jpg: 'username1234.jpg'
    following: true,
    description: `i am a cool twitter user`,
    following: 318,
    followers: 2144
};


function addEntry(userName,jpg,following,description,following,followers){
    users.push({userName,jpg});
}
function seed(){
    addEntry(
        '@coolaj86',
        'coolaj86.jpg',
        true,
        `6'5 • Father of 2. Technophobic Technologist • Videographer
        Go, Rust, Node / VanillaJS (
            @JSJabber
        ), UX, Security, IoT.
        https://coolaj86.com/authorized_keys`,
        409,
        1853
    );

    addEntry(
        '@BillGates',
        'billgates.jpg',
        false,
        `Sharing things I'm learning through my foundation work and other interests.`,
        318,
        55543123
    );

    addEntry(
        '@CppCon',
        'cppcon.jpg',
        true,
        `I am the conference for the entire C++ community.`,
        108,
        18532
    );

    addEntry(
        '@fiverr',
        'fiverr.jpg',
        false,
        `Freelance services. On demand. 
        Need help? Tweet us at 
        @fiverrsupport`,
        1762,
        358531
    );

    addEntry(
        '@github',
        'github.jpg',
        true,
        `How people build software. 

        Need help? Send us a message at http://git.io/c for support.`,
        352,
        2134231
    );

    addEntry(
        '@LF_Training',
        'lf_training.jpg',
        false,
        `The Linux Foundation’s training program features courses developed and taught by open source experts. Support queries: http://trainingsupport.linuxfoundation.org`,
        353,
        11139
    );

    addEntry(
        '@openjsf',
        'openjsf.jpg',
        true,
        `Innovate Together`,
        217,
        350381
    );

    addEntry(
        '@npmjs',
        'npmjs.jpg',
        true,
        `The package manager for JavaScript.  Problems?  Visit http://npmjs.com/support or http://npm.community.`,
        159,
        126931
    );

}

seed();
fs.writeFileSync('users.json',JSON.stringify(users));
