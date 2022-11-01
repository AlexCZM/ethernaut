1. yarn add --dev hardhat-deploy 
    ->  allows you to write deploy scripts in the deploy folder
    -> furthermore you can also ensure these scripts are executed in test too by calling await deployments.fixture(['contractTAG']) in your test.[]
This is optimized, so if multiple tests use the same contract, the deployment will be executed once and each test will start with the exact same state.
    -> allows you to name your accounts and extract them with await getNamedAccounts

2. yarn add --dev  @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers
    ->  Since hardhat-deploy-ethers is a fork of @nomiclabs/hardhat-ethers and that other plugin might have an hardcoded dependency on @nomiclabs/hardhat-ethers the best way to install hardhat-deploy-ethers and ensure compatibility is the following: see above