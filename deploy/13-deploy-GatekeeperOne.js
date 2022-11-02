const { network } = require("hardhat");

module.exports = async ({ deployments, getNamedAccounts }) => {
    // @dev: add YOUR gatekeeper instance address
    const gatekeeperInstanceAddress =
        "0x3a23b9e62280915d2f3f8c631654a2b3c7ee2a30";
    const { deployer } = await getNamedAccounts();
    const { deploy, log } = deployments;
    const chainId = network.config.chainId;
    let gatekeeperOne;
    if (chainId === 31337) {
        log("Deploy GatekeeperOne contract...");
        gatekeeperOne = await deploy("GatekeeperOne", {
            from: deployer,
            args: "",
            log: true,
        });
    }

    log("Deploy BrakeTheGate contract...");

    const args = [
        gatekeeperOne !== undefined
            ? gatekeeperOne.address
            : gatekeeperInstanceAddress,
    ];
    const brakeTheGate = await deploy("BrakeTheGate", {
        from: deployer,
        args: args,
        log: true,
    });
};

module.exports.tags = ["GatekeeperOne"];
