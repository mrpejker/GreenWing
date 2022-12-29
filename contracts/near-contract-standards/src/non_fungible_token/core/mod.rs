mod core_impl;

pub use self::core_impl::*;

use crate::non_fungible_token::token::{Token, TokenId};

/// Used for all non-fungible tokens. The specification for the
/// [core non-fungible token standard] lays out the reasoning for each method.
/// It's important to check out [NonFungibleTokenReceiver](crate::non_fungible_token::core::NonFungibleTokenReceiver)
/// and [NonFungibleTokenResolver](crate::non_fungible_token::core::NonFungibleTokenResolver) to
/// understand how the cross-contract call work.
///
/// [core non-fungible token standard]: <https://nomicon.io/Standards/NonFungibleToken/Core.html>
pub trait NonFungibleTokenCore {
    /// Returns the token with the given `token_id` or `null` if no such token.
    fn nft_token(&self, token_id: TokenId) -> Option<Token>;
}
