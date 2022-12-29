/// The core methods for a basic non-fungible token. Extension standards may be
/// added in addition to this macro.
#[macro_export]
macro_rules! impl_non_fungible_token_core {
    ($contract: ident, $token: ident) => {
        use $crate::non_fungible_token::core::NonFungibleTokenCore;        

        #[near_bindgen]
        impl NonFungibleTokenCore for $contract {        
            fn nft_token(&self, token_id: TokenId) -> Option<Token> {
                self.$token.nft_token(token_id)
            }
        }        
    };
}

/// Non-fungible token approval management allows for an escrow system where
/// multiple approvals per token exist.
#[macro_export]
macro_rules! impl_non_fungible_token_approval {
    ($contract: ident, $token: ident) => {
        use $crate::non_fungible_token::approval::NonFungibleTokenApproval;

        #[near_bindgen]
        impl NonFungibleTokenApproval for $contract {
            #[payable]
            fn nft_approve(
                &mut self,
                token_id: TokenId,
                account_id: AccountId,
                msg: Option<String>,
            ) -> Option<Promise> {
                self.$token.nft_approve(token_id, account_id, msg)
            }

            #[payable]
            fn nft_revoke(&mut self, token_id: TokenId, account_id: AccountId) {
                self.$token.nft_revoke(token_id, account_id)
            }

            #[payable]
            fn nft_revoke_all(&mut self, token_id: TokenId) {
                self.$token.nft_revoke_all(token_id)
            }

            fn nft_is_approved(
                &self,
                token_id: TokenId,
                approved_account_id: AccountId,
                approval_id: Option<u64>,
            ) -> bool {
                self.$token.nft_is_approved(token_id, approved_account_id, approval_id)
            }
        }
    };
}

/// Non-fungible enumeration adds the extension standard offering several
/// view-only methods to get token supply, tokens per owner, etc.
#[macro_export]
macro_rules! impl_non_fungible_token_enumeration {
    ($contract: ident, $token: ident) => {
        use $crate::non_fungible_token::enumeration::NonFungibleTokenEnumeration;

        #[near_bindgen]
        impl NonFungibleTokenEnumeration for $contract {
            fn nft_total_supply(&self) -> near_sdk::json_types::U128 {
                self.$token.nft_total_supply()
            }

            fn nft_tokens(
                &self,
                from_index: Option<near_sdk::json_types::U128>,
                limit: Option<u64>,
            ) -> Vec<Token> {
                self.$token.nft_tokens(from_index, limit)
            }

            fn nft_supply_for_owner(&self, account_id: AccountId) -> near_sdk::json_types::U128 {
                self.$token.nft_supply_for_owner(account_id)
            }

            fn nft_tokens_for_owner(
                &self,
                account_id: AccountId,
                from_index: Option<near_sdk::json_types::U128>,
                limit: Option<u64>,
            ) -> Vec<Token> {
                self.$token.nft_tokens_for_owner(account_id, from_index, limit)
            }
        }
    };
}
