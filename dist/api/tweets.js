const fs = require('fs');

const tweets = [];

function sort() {
  tweets.sort(function (first, second) {
    return parseInt(second.timeStamp) - parseInt(first.timeStamp);
  });
}

let primary_key = 0;
function addEntry(from, userName, timeStamp, body, replyCount, retweets, hearts, contentType, retweeter) {
  const row = { id: ++primary_key,from, userName, timeStamp, body, replyCount, retweets, hearts, contentType, retweeter };
  tweets.push(row);
  sort();
  return row;
}
const WORDS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse elit quam, dapibus et odio at, bibendum tristique lectus. Pellentesque ante tellus, tincidunt ac tempus et, maximus at turpis. Donec vel lacinia libero. Vestibulum viverra ac justo vel convallis. Ut auctor nibh ac dolor pulvinar posuere. Mauris tortor enim, tempor vitae lacus vel, pellentesque luctus ligula. Donec accumsan sit amet dolor in congue. Proin tincidunt, nunc at suscipit iaculis, mauris eros ultrices metus, id tincidunt magna lorem rhoncus eros. Duis condimentum lorem et lectus ullamcorper, congue egestas lectus posuere. Sed eget cursus sapien, eu cursus lorem. Donec imperdiet erat quam, consequat accumsan nunc congue quis. Sed consequat massa eu risus sollicitudin, quis mattis lectus ultricies.`;

function rand_between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function random_time() {
  let f = ['09/', rand_between(12, 23), '/2021 0', rand_between(1, 9), ':', rand_between(10, 59), ':01 PM'].join('');
  return new Date(f).getTime();
}
function randomize() {
  let words = [];
  let content = WORDS.split(' ');
  for (let i = 0; i < 15; i++) {
    words.push(content[Math.floor(Math.random() * content.length) + 1]);
  }
  return words.join(' ');
}
function random_lf() {
  addEntry(
    'OpenJS Foundation',
    '@LF_Training',
    random_time(),
    randomize(),
    rand_between(0, 150),
    rand_between(0, 150),
    rand_between(0, 150),
    'retweet',
    'OpenJS Foundation',
  );
}
function random_cpp() {
  addEntry(
    'CppCon',
    '@CppCon',
    random_time(),
    randomize(),
    rand_between(0, 150),
    rand_between(0, 150),
    rand_between(0, 150),
    'tweet',
  );
}
function random_fiver() {
  addEntry(
    'Fiverr',
    '@fiverr',
    random_time(),
    randomize(),
    rand_between(0, 150),
    rand_between(0, 150),
    rand_between(0, 150),
    'tweet',
  );
}
function random_npm() {
  addEntry(
    'npm',
    '@npmjs',
    random_time(),
    randomize(),
    rand_between(0, 150),
    rand_between(0, 150),
    rand_between(0, 150),
    'tweet',
  );
}
function random_bg() {
  addEntry(
    'Bill Gates',
    '@BillGates',
    random_time(),
    randomize(),
    rand_between(0, 150),
    rand_between(0, 150),
    rand_between(0, 150),
    'tweet',
  );
}

function seed() {
  addEntry(
    'Bill Gates',
    '@BillGates',
    random_time(),
    `If we want to stop Alzheimer’s disease, one of the biggest things we need to develop is a reliable, affordable, and accessible diagnostic. Breakthroughs in testing may someday soon let us substantially alter the course of the disease: https://gatesnot.es/3CwvbcU #WorldAlzheimersDay`,
    18,
    126,
    802,
    'tweet',
  );

  addEntry(
    'CppCon',
    '@CppCon',
    random_time(),
    `CppCon 2019: Matthew Fleming “The Smart Pointers I Wish I Had”

        https://youtube.com/watch?v=CKCR5eFVrmc

        Register for CppCon 2021 today! https://cppcon.org/registration/

        #cppcon #cplusplus #cpp
        `,
    0,
    1,
    4,
    'tweet',
  );

  addEntry(
    'Fiverr',
    '@fiverr',
    random_time(),
    `Build your online business on your budget and see your success pay off. White heavy check mark Collision symbol
        Your online store, ready at the right price
        fiverr.com`,
    17,
    18,
    99,
    'ad',
  );

  addEntry(
    'GitHub',
    '@github',
    random_time(),
    `Meet 
        @troyhunt
         - a new member of the GitHub Stars Program ⭐! A security expert and writer who regularly speaks around the world often showing people just how easy it is to break software on the web today. Check out his Stars profile:
        Troy Hunt | GitHub Stars
        Troy is the creator of Have I Been Pwned, the data breach aggregation service. He's also a Microsoft Regional Director and full time Australian.
        stars.github.com`,
    3,
    12,
    85,
    'tweet',
  );

  addEntry(
    'OpenJS Foundation',
    '@LF_Training',
    random_time(),
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
    'OpenJS Foundation',
  );

  let ajPostTime = random_time();
  let ajEntry = addEntry(
    'AJ ONeal',
    '@coolaj86',
    ajPostTime,
    `Live Coding at Work #21 (#nodejs)

        Still working on those Email Templates...

        https://youtu.be/lZ2bSotvipw
        coolaj86 - Twitch
        6'5 • Technophobic Technologist + Videographer • Go, Rust, Node / VanillaJS ( @JSJabber ), UX, Security, IoT. Canon, 24mm, 50mm.
        `,
    0,
    1,
    0,
    'tweet',
  );
  addEntry(
    'William Merfalen',
    '@lmdbkraft',
    ajPostTime + 60,
    `Heh, nice. I'll be sure to check it out!
        #lurker #nodejs
    `,
    0,
    1,
    1,
    'reply|' + ajEntry.id,
  );


  addEntry(
    'Verizon',
    '@Verizon',
    random_time(),
    `Pre-order #iPhone13 Pro with #Verizon5G — America's most reliable network! http://vz.to/3tNaiqO

        #Hidden13
        `,
    70,
    160,
    1631,
    'tweet',
  );
  addEntry(
    'OpenJS Foundation',
    '@openjsf',
    random_time(),
    `Join us in Austin, TX on June 7-8 for #OpenJSWorld22!! We hope to see you! 🤠🎸 Sign up to stay updated!`,
    0,
    3,
    6,
    'tweet',
  );

  addEntry(
    'npm',
    '@npmjs',
    random_time(),
    `new! we're introducing a new authentication format for access tokens that are working to keep development on npm secure Shield  find out how to reset your existing tokens here:`,
    0,
    5,
    4,
    'tweet',
  );
  for (let i = 0; i < 125; i++) {
    random_bg();
    random_npm();
    random_lf();
    random_cpp();
    random_fiver();
  }
}

seed();
fs.writeFileSync('tweets.json', JSON.stringify(tweets));
