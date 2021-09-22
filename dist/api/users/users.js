const fs = require('fs');

let users = [];

let record = {
    userName: '@userName1234',
    jpg: 'username1234.jpg'
};


function addEntry(userName,jpg){
    users.push({userName,jpg});
}
function seed(){
    addEntry(
        '@BillGates',
        'billgates.jpg'
    );

    addEntry(
        '@CppCon',
        'cppcon.jpg'
    );

    addEntry(
        '@fiverr',
        'fiverr.jpg'
    );

    addEntry(
        '@github',
        'github.jpg'
    );

    addEntry(
        '@LF_Training',
        'lf_training.jpg'
    );


}

seed();
fs.writeFileSync('users.json',JSON.stringify(users));
