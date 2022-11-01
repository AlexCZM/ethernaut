const { ethers, network } = require("hardhat");
const { verify } = require("../utils/verify.js");

async function main() {
    const factory = await ethers.getContractFactory("Template");
    console.log("Deploy template...");
    const template = await factory.deploy();
    await template.deployed();
    console.log(`Deployed contract to: ${template.address}`);

    /**etherscan verification */
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...");
        await template.deployTransaction.wait(6);
        await verify(template.address, []);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
