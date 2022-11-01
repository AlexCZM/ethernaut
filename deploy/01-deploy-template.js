module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts();
    const { deploy, log } = deployments;
    log("Deploy Template contract...");

    console.log("deployer", deployer, "deploy ---------", deploy);
    const template = await deploy("Template", {
        from: deployer,
        args: "",
        log: true,
    });
};

module.exports.tags = ["template"];
