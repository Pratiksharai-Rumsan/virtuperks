import { Injectable } from '@nestjs/common';
import { Client } from "@urql/core";
import { AppCreated } from '../queries';

@Injectable()
export class SubgraphService {
    private subgraphQuery: Client;

    constructor(client: Client) {
        this.subgraphQuery = client
    }

    async getAppCreated() {
        const { data, error } = await this.subgraphQuery.query(AppCreated, {})
        return { data, error }
    }
}

