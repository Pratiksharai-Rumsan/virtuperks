import hre from "hardhat";
export interface TaskManagementFixture {
    accessManagerV2: any;
    rumsanForwarder: any;
    rewardToken: any;
    redEntity: any;
    blueEntity: any;
    redEntityOwner: any; //Entity Admin/Manager - that manages the roles
    blueEntityOwner: any;// Entity Manager - that manages the roles
    redCakeTaskOwner: any; //Task Owner
    blueCakeTaskOwner: any;//Task Owner
    participant1: any;//Task Participant
    participant2: any;//Task Participant
    deployer: any;
    signers: any;
    redEntityAppId: string;
    blueEntityAppId: string;
}
export const deployTaskManagementFixture = async function (): Promise<TaskManagementFixture> {
    console.log("deploying task management fixtures");
    const [deployer, redEntityOwner, blueEntityOwner, redCakeTaskOwner, blueCakeTaskOwner, participant1, participant2, ...signers] = await hre.ethers.getSigners();

    const tokenAppId = hre.ethers.id('TOKEN_APP');
    const redEntityAppId = hre.ethers.id('RedCafe');
    const blueEntityAppId = hre.ethers.id('BlueCafe');

    const rumsanForwarder = await hre.ethers.deployContract("ERC2771Forwarder", ['rumsanForwarder']);
    const accessManagerV2 = await hre.ethers.deployContract("AccessManagerV2", []);
    const rewardToken = await hre.ethers.deployContract("RewardToken",
        [tokenAppId, "Rahat", "RTH", 0, accessManagerV2.target, rumsanForwarder.target]);
    await accessManagerV2.connect(deployer).createApp(tokenAppId, deployer.address);
    await accessManagerV2.connect(redEntityOwner).createApp(redEntityAppId, redEntityOwner.address);
    await accessManagerV2.connect(blueEntityOwner).createApp(blueEntityAppId, blueEntityOwner.address);

    const redEntity = await hre.ethers.deployContract("EntityTaskManager",
        [accessManagerV2.target, redEntityAppId]);
    const blueEntity = await hre.ethers.deployContract("EntityTaskManager",
        [accessManagerV2.target, blueEntityAppId]);

    // access-management
    const taskManagementRole = hre.ethers.id('TASK_MANAGER')
    const participantRole = hre.ethers.id('PARTICIPANT');
    await accessManagerV2.connect(redEntityOwner).grantRole(redEntityAppId, taskManagementRole, redCakeTaskOwner.address);
    await accessManagerV2.connect(redEntityOwner).grantRole(redEntityAppId, participantRole, participant1.address);
    await accessManagerV2.connect(redEntityOwner).grantRole(redEntityAppId, participantRole, participant2.address);


    console.log('fixtures deployed')
    return {
        rumsanForwarder,
        accessManagerV2,
        rewardToken,
        redEntity,
        blueEntity,
        redEntityOwner,
        blueEntityOwner,
        redCakeTaskOwner,
        blueCakeTaskOwner,
        participant1,
        participant2,
        deployer,
        signers,
        redEntityAppId,
        blueEntityAppId
    };
}

export const taskDetails1 = 'https://www.rumsantask.com/task1';
export const taskDetails2 = 'https://www.rumsantask.com/task2';