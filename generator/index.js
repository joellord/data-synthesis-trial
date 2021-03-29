const DataGen = require("./generator");

const generator = new DataGen();

async function main() {
  const MAX = 10;
  let start = (new Date()).getTime();
  let people = [];
  for (let i = 0; i < MAX; i++) {
    let p = await generator.generatePerson();
    people.push(p);
  }

  let end = (new Date()).getTime();
  let duration = (end - start) / 1000;
  console.log(`Done generating ${MAX} people in ${duration} seconds`)


}

main();