use near_sdk_sim::{call, view};
use crate::utils::init;

#[test]
fn simulate_some_view_function() {
    let (root, contract, _alice) = init();

    let actual: String = view!(
        contract.view_something("some_value".to_string()),
    ).unwrap_json();

    assert_eq!("expected", actual);
}

#[test]
fn simulate_some_change_method() {
    let (root, contract, _alice) = init();

    // uses default gas amount
    let result = call!(
        root,
        contract.change_something("some_value".to_string()),
        deposit = 1,
    );

    assert!(result.is_ok());
}