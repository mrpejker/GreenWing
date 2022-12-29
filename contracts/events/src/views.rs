use crate::*;

/// This is format of output via JSON for the user balance.
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct UserBalanceOutput {
    index: usize,
    got: bool,
    title: String,
    description: String,
}

#[near_bindgen]
impl Contract {
    /// Returns semver of this contract.
    pub fn version(&self) -> String {
        env!("CARGO_PKG_VERSION").to_string()
    }

    /// Get all ongoing events (with pagination)
    pub fn get_ongoing_events(&self, from_index: u64, limit: u64) -> Vec<(u32, EventData, EventStats)> {
        let timestamp: u64 = env::block_timestamp();
        let ids = self.public_events.as_vector();
        let mut index = from_index;
        let mut result = vec![];
        while index < ids.len() && result.len() < limit.try_into().unwrap() {
            let event_id = ids.get(index).unwrap();
            let event = self.events.get(&event_id).unwrap();
            if timestamp < event.data.finish_time {
                result.push((event_id, event.data, event.stats));
            }
            index = index + 1;
        }
        result
    }

    /// Get ongoing events for specific user
    pub fn get_ongoing_user_events(&self, account_id: AccountId) -> Vec<(u32, EventData, EventStats)> {
        let ids = self.ongoing_events.get(&account_id).unwrap_or(HashSet::new());
        let mut user_events = vec![];
        for id in ids {
            let event = self.events.get(&id).unwrap();
            user_events.push((id, event.data, event.stats));
        }
        user_events
    }
    
    /// Return event data
    pub fn get_event_data(self, event_id: u32) -> Option<EventData> {        
        let data = self.events.get(&event_id);
        match data {
            Some(event) => Some(event.data),
            None => None
        }
    }

    /// Return event stats
    pub fn get_event_stats(self, event_id: u32) -> Option<EventStats> {        
        let data = self.events.get(&event_id);
        match data {
            Some(event) => Some(event.stats),
            None => None
        }
    }

    /// Return user balance (for specific event)
    pub fn get_user_balance(&self, event_id: u32, account_id: AccountId) -> Option<UserBalance> {
        let balances = self.balances.get(&event_id).unwrap();
        balances.get(&account_id)
    }

    /// Returns history of user actions for event (supports pagination)
    /// - `from_index` is the index to start from.
    /// - `limit` is the maximum number of elements to return.
    pub fn get_event_actions(&self, event_id: u32, from_index: u64, limit: u64) -> Vec<ActionData> {
        let actions = self.actions.get(&event_id).unwrap();
        (from_index..std::cmp::min(from_index + limit, actions.len()))
            .map(|index| actions.get(index).unwrap())
            .collect()
    }
}
