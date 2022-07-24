require("@nomiclabs/hardhat-waffle");
require('hardhat-abi-exporter');

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.0",
  
  abiExporter: {
	  path: "./frontend/src/Components/abi",
	  clear: false,
	  flat: true,
    runOnCompile: true,
	  // only: [],
	  // except: []
  },

  networks:{
    localhost:{
       //chainId:1337,
     },

     ropsten: {
       url: "https://eth-ropsten.alchemyapi.io/v2/3ANZS5xHguG6R4EYhqygdyDPqhTHziDD",
       accounts: ["275d8fe016b836bea5d1e454521d43b05fc34c901c123d9fa35fc533079f2a90"],
     },
   }
};
