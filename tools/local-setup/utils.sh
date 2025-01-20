start_docker() {
    docker compose up -d
    
    while ! curl -s http://localhost:8000/health > /dev/null; do
        echo "Waiting for Graph Node to be ready..."
        sleep 5
    done
    echo "Docker services are ready!"
}

deploy_contract() {
    pnpm deployContract
}

update_subgraph() {
    SCRIPT_PATH=$(realpath "$0")

    YAML_FILE="../../apps/subgraph/subgraph.yaml"
    JSON_FILE="../deploy/deployments/contracts.json"

    NEW_ACCESS_MANAGER_ADDRESS=$(jq -r '.AccessManagerV2.address' "$JSON_FILE")
    NEW_START_BLOCK=$(jq -r '.AccessManagerV2.startBlock' "$JSON_FILE")

    sed -i "s/address: .*/address: \"$NEW_ACCESS_MANAGER_ADDRESS\"/g" $YAML_FILE
    sed -i "s/startBlock: .*/startBlock: $NEW_START_BLOCK /g" $YAML_FILE
}

deploy_subgraph() {
    pnpm graph:codegen
    pnpm graph:build
    pnpm graph:create-local
    pnpm graph:deploy-local
}
