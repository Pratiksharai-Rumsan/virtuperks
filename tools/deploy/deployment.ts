import { randomBytes } from 'crypto';
import { uuidV4, ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { commonLib } from './_common';
dotenv.config();

interface DeployedContract {
  address: string;
  startBlock: number;
}

class SeedProject extends commonLib {
  contracts: Record<string, DeployedContract>;

  constructor() {
    super();
    this.contracts = {};
  }

  static getUUID() {
    return uuidV4(randomBytes(16));
  }

  public sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async deployAccessManagerContract() {

    const AccessManager = await this.deployContract('AccessManagerV2', [])

    this.contracts['AccessManagerV2'] = {
        address: AccessManager.contract.target as string,
        startBlock: AccessManager.blockNumber,
      };

      this.writeToDeploymentFile(
        'contracts',
        this.contracts,
      );
  }


  public async deployTaskManagerContract() {

    const appId = ethers.keccak256(Buffer.from('app1'))

    const AccessManager = await this.deployContract('RewardSystem', [this.contracts['AccessManagerV2'].address, appId])

    this.contracts['RewardSystem'] = {
        address: AccessManager.contract.target as string,
        startBlock: AccessManager.blockNumber,
      };

      this.writeToDeploymentFile(
        'contracts',
        this.contracts,
      );
  }
  
}

async function main() {
  const seedProject = new SeedProject();
  await seedProject.deployAccessManagerContract();
  await seedProject.deployTaskManagerContract();

}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
