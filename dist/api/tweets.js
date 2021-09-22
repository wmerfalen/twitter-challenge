const fs = require('fs');

let tweets = [];

let record = {
    from: 'first_name last_name',
    userName: '@userName1234',
    timeStamp: (new Date('09/03/2021')).getTime(),
    body: `If we want to stop Alzheimer’s disease, one of the biggest things we need to develop is a reliable, affordable, and accessible diagnostic. Breakthroughs in testing may someday soon let us substantially alter the course of the disease: https://gatesnot.es/3CwvbcU #WorldAlzheimersDay`,
    replyCount: 18,
    retweets: 126,
    hearts: 802,
    contentType: 'tweet',
};


function addEntry(from, userName, timeStamp, body, replyCount,retweets, hearts,contentType,retweeter){
    let row = {from,userName,body,replyCount,retweets,hearts,contentType,retweeter};
    row.timeStamp = (new Date(timeStamp)).getTime();
    tweets.push(row);
}
function seed(){
    addEntry(
        'Bill Gates',
        '@BillGates',
        '09/21/2021 8:53:03PM',
        `If we want to stop Alzheimer’s disease, one of the biggest things we need to develop is a reliable, affordable, and accessible diagnostic. Breakthroughs in testing may someday soon let us substantially alter the course of the disease: https://gatesnot.es/3CwvbcU #WorldAlzheimersDay`,
        18,
        126,
        802,
        'tweet'
    );

    addEntry(
        'CppCOn',
        '@CppCon',
        '09/21/2021 6:10:33PM',
        `CppCon 2019: Matthew Fleming “The Smart Pointers I Wish I Had”

        https://youtube.com/watch?v=CKCR5eFVrmc

        Register for CppCon 2021 today! https://cppcon.org/registration/

        #cppcon #cplusplus #cpp
        `,
        0,
        1,
        4,
        'tweet'
    );

    addEntry(
        'Fiverr',
        '@fiverr',
        '09/21/2021 01:01:01AM',
        `Build your online business on your budget and see your success pay off. White heavy check mark Collision symbol
        Your online store, ready at the right price
        fiverr.com`,
        17,
        18,
        99,
        'ad'
    );

    addEntry(
        'GitHub',
        '@github',
        '09/21/2021 06:23:45PM',
        `Meet 
        @troyhunt
         - a new member of the GitHub Stars Program ⭐! A security expert and writer who regularly speaks around the world often showing people just how easy it is to break software on the web today. Check out his Stars profile:
        Troy Hunt | GitHub Stars
        Troy is the creator of Have I Been Pwned, the data breach aggregation service. He's also a Microsoft Regional Director and full time Australian.
        stars.github.com`,
        3,
        12,
        85,
        'tweet'
    );

    addEntry(
        'OpenJS Foundation',
        '@LF_Training',
        '09/21/2021 01:41:23PM',
        `Linux Foundation Training & Certification
        @LF_Training
        ·
        5h
        FLASH SALE! Through Sept 24, save 60% on ALL Node.js training and certification offerings from 
        @OpenJSF
        ! Use code NODE60 at checkout: https://bit.ly/2XlOnLJ #learnlinux #nodejs #web #webdev #jsnad #jsnsd
        `,
        1,
        12,
        12,
        'retweet',
        'OpenJS Foundation'
    );


}

seed();
fs.writeFileSync('tweets.json',JSON.stringify(tweets));
