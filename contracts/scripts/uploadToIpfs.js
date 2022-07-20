const { uploadImageToIpfs } = require('./ifpsHelper');

const main = async () => {
  let soyjak0URI = await uploadImageToIpfs('soyjak0.png');
  let soyjak1URI = await uploadImageToIpfs('soyjak1.png');
  let soyjak2URI = await uploadImageToIpfs('soyjak2.png');
  let soyjak3URI = await uploadImageToIpfs('soyjak3.png');
  let soyjak4URI = await uploadImageToIpfs('soyjak4.png');

  console.log(soyjak0URI);
  console.log(soyjak1URI);
  console.log(soyjak2URI);
  console.log(soyjak3URI);
  console.log(soyjak4URI);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
