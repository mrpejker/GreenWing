// in utils.rs
use near_sdk_sim::{deploy, init_simulator, to_yocto, STORAGE_AMOUNT};
use pow::Contract;

const CONTRACT_ID: &str = "contract";

pub fn init() -> (UserAccount, ContractAccount<Contract>, UserAccount) {
    let root = init_simulator(None);

    let contract = deploy!(
        contract: Contract,
        contract_id: CONTRACT_ID,
        bytes: &CONTRACT_WASM_BYTES,
        signer_account: root
    );

    let alice = root.create_user(
        "alice".parse().unwrap(),
        to_yocto("100") // initial balance
    );

    (root, contract, alice)
}