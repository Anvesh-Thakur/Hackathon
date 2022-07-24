const hre = require("hardhat");

async function main() {
  const Funder = await hre.ethers.getContractFactory("Funder");
  const funder = await Funder.deploy();

  await funder.deployed();

  console.log("Funder deployed to:", funder.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
