use near_contract_standards::non_fungible_token::metadata::{
    NFTContractMetadata, NonFungibleTokenMetadataProvider, TokenMetadata, NFT_METADATA_SPEC,
  };
use near_contract_standards::non_fungible_token::{Token, TokenId};
use near_contract_standards::non_fungible_token::NonFungibleToken;
use near_sdk::json_types::Base64VecU8;
use near_sdk::serde_json::json;
use near_sdk::Balance;
use near_sdk::Gas;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{
    env, log, near_bindgen, PanicOnDefault, AccountId, BorshStorageKey, Promise, PromiseResult, PromiseOrValue
};
use near_sdk::collections::{ UnorderedMap, LazyOption};
use std::convert::{TryInto, TryFrom};

#[derive(Serialize)]
#[serde(crate = "near_sdk::serde")]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct RewardData {    
    pub reward: u8,
    pub timestamp: u64,
    pub token_id: String,    
}

#[derive(Serialize)]
#[serde(crate = "near_sdk::serde")]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct CheckInData {
    pub username: String,        
    pub timestamp: u64,    
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    owner_id: AccountId,
    // NFT implementation
    tokens: NonFungibleToken,
    metadata: LazyOption<NFTContractMetadata>,
    // Current event data
    event_active: bool,
    event_name: String,
    event_description: String,
    rewards: UnorderedMap<String, Vec<RewardData>>, // Tokens different users got

    // Event statistics    
    checkins: UnorderedMap<String, Vec<CheckInData>>, // Total list of checkins        
}

const BASE_URI: &str = "https://vself-dev.web.app";

#[derive(BorshSerialize, BorshStorageKey)]
enum StorageKey {
    Rewards,
    Checkins,
    NonFungibleToken,
    Metadata,
    TokenMetadata,
    Enumeration,
    Approval,
}

// Prepaid gas for making a single simple call.
const SINGLE_CALL_GAS: Gas = Gas(200000000000000);
const ONE_YOCTO: Balance = 1;
// Converted with https://yoksel.github.io/url-encoder/
const DATA_IMAGE_SVG_NEAR_ICON: &str = "data:image/svg+xml,%3Csvg version='1.0' xmlns='http://www.w3.org/2000/svg' width='600.000000pt' height='600.000000pt' viewBox='0 0 600.000000 600.000000' preserveAspectRatio='xMidYMid meet'%3E%3Cg transform='translate(0.000000,600.000000) scale(0.100000,-0.100000)'%0Afill='%23000000' stroke='none'%3E%3Cpath d='M1300 5760 l0 -241 -112 -73 c-62 -40 -126 -81 -143 -90 -16 -9 -52%0A-31 -80 -48 -27 -17 -90 -53 -140 -81 -49 -27 -108 -60 -130 -72 -76 -42 -380%0A-224 -392 -235 -7 -5 -14 -10 -17 -10 -2 0 -45 -27 -94 -59 -49 -33 -113 -72%0A-141 -86 -28 -15 -51 -33 -51 -41 0 -8 3 -14 6 -14 11 0 117 62 204 120 71 48%0A169 107 311 190 14 8 90 51 168 95 176 99 489 286 545 325 22 16 122 79 221%0A141 99 62 216 135 260 162 70 44 180 110 282 168 62 35 111 68 118 79 4 7%0A-123 10 -404 10 l-411 0 0 -240z'/%3E%3Cpath d='M2975 5926 c-58 -25 -120 -97 -148 -172 -14 -38 -28 -83 -32 -101 -3%0A-17 -13 -37 -20 -43 -8 -6 -22 -32 -31 -56 -16 -41 -20 -45 -48 -42 -27 3 -31%0A7 -37 42 -7 45 -30 66 -72 66 -40 0 -64 -15 -72 -47 -3 -15 -12 -31 -18 -35%0A-7 -4 -50 -8 -96 -8 -46 0 -82 -3 -78 -6 5 -6 94 -13 397 -34 74 -5 209 -14%0A300 -20 91 -6 244 -15 340 -21 96 -5 202 -13 235 -17 l60 -7 -1 -55 c-2 -63%0A-20 -312 -34 -480 -6 -63 -15 -182 -20 -265 -6 -82 -14 -190 -19 -240 -5 -49%0A-14 -139 -19 -200 -6 -60 -14 -125 -18 -144 l-7 -34 -86 7 c-47 3 -135 11%0A-196 17 -356 34 -768 67 -967 77 -75 4 -141 12 -147 17 -5 6 -6 51 0 120 5 61%0A13 171 18 245 11 154 26 357 41 540 6 69 14 200 19 292 6 93 12 177 16 188 4%0A14 15 20 36 20 18 0 28 4 24 10 -3 6 -21 10 -39 10 l-33 0 -12 -102 c-10 -91%0A-18 -186 -40 -458 l-6 -75 -45 -5 c-58 -7 -64 -11 -89 -65 -40 -84 -22 -194%0A40 -245 27 -23 32 -35 41 -105 13 -94 14 -145 3 -281 l-8 -100 33 -31 c32 -30%0A33 -33 55 -204 l23 -174 -24 -47 c-33 -64 -34 -170 -3 -223 l21 -36 -17 -412%0Ac-9 -227 -21 -417 -26 -423 -16 -19 -48 -342 -41 -406 3 -29 35 -49 95 -62 15%0A-3 39 -9 55 -12 15 -3 36 -9 47 -14 51 -20 110 -31 184 -32 90 -1 111 9 111%0A52 0 29 -25 43 -155 90 -98 35 -110 43 -113 76 -4 39 13 84 32 84 16 0 20 17%0A37 130 6 41 15 102 20 135 5 33 14 90 19 128 6 37 14 97 20 135 5 37 15 96 20%0A132 6 36 15 94 20 130 31 216 41 263 60 290 11 15 25 51 32 79 14 64 -2 144%0A-36 181 -20 21 -24 38 -28 108 -3 46 -2 85 1 87 4 2 33 -11 66 -30 39 -21 62%0A-41 66 -56 4 -13 7 -73 8 -134 1 -60 8 -155 16 -209 8 -55 15 -114 15 -131 0%0A-41 7 -46 110 -79 47 -15 90 -30 96 -34 7 -5 13 -116 18 -341 6 -299 9 -339%0A26 -378 17 -38 19 -65 17 -243 -1 -172 -4 -200 -17 -200 -8 0 -53 12 -100 26%0A-131 40 -135 40 -191 5 -28 -17 -52 -31 -53 -31 -2 0 -86 -50 -187 -111 -178%0A-107 -212 -128 -281 -168 -18 -10 -57 -32 -86 -50 -29 -17 -55 -31 -58 -31 -3%0A0 -18 -8 -32 -19 -15 -10 -63 -38 -107 -61 -175 -95 -168 -89 -194 -165 -42%0A-127 -45 -346 -5 -384 25 -24 376 -141 422 -141 23 0 44 8 59 22 l23 21 342%0A-112 c189 -62 349 -116 357 -120 19 -9 27 -26 38 -76 6 -32 15 -43 43 -57 75%0A-37 342 -128 375 -128 31 0 57 19 232 173 182 159 300 265 550 495 102 93 116%0A119 146 262 23 112 29 191 16 227 -10 29 -19 35 -92 58 -230 71 -306 90 -321%0A75 -13 -13 -93 -13 -101 0 -3 5 -16 10 -27 10 -23 0 -81 17 -110 31 -10 5 -29%0A9 -42 9 -14 0 -28 5 -31 10 -3 6 -18 10 -33 10 -15 1 -43 9 -62 18 l-35 17 -3%0A265 c-2 226 0 270 14 305 13 31 18 98 25 295 5 140 11 264 13 275 2 11 5 48 5%0A82 l1 63 45 11 c48 12 61 28 77 89 9 35 40 174 58 260 25 123 31 145 43 156%0A15 15 251 4 267 -12 9 -9 7 -22 -8 -50 -26 -52 -36 -132 -22 -183 11 -40 6%0A-157 -21 -516 -5 -71 -14 -195 -19 -275 -5 -80 -13 -186 -16 -236 l-7 -90 50%0A-32 c27 -18 60 -32 72 -32 20 0 22 -4 19 -57 l-3 -58 -45 -7 c-25 -3 -97 -7%0A-160 -8 -86 -1 -124 -5 -150 -18 -40 -20 -52 -55 -23 -70 10 -5 107 -12 216%0A-14 196 -5 198 -5 233 18 19 13 37 24 40 24 2 0 22 12 43 26 l39 25 -5 127%0Ac-5 150 -8 178 -28 215 -11 21 -12 39 -5 75 5 26 13 76 19 112 5 36 15 94 20%0A130 6 36 20 126 31 200 54 345 57 357 87 397 35 45 53 96 53 147 0 38 -23 94%0A-47 111 -9 7 -16 56 -23 165 -16 251 -29 436 -42 572 -11 121 -10 129 10 177%0A36 83 23 200 -26 237 -9 7 -41 14 -71 14 l-54 0 7 85 7 85 -161 162 c-155 155%0A-161 163 -155 194 4 26 1 37 -17 53 -12 12 -28 21 -35 21 -7 0 -13 4 -13 9 0%0A5 -8 11 -17 15 -10 3 -33 17 -52 31 -27 20 -46 25 -91 25 -46 0 -60 4 -78 23%0A-12 13 -22 35 -22 49 0 52 -65 77 -98 37 -75 -93 -68 -89 -147 -89 -46 0 -76%0A5 -83 13 -5 6 -12 80 -15 162 -5 170 -20 229 -69 270 -33 28 -67 31 -113 11z%0Am83 -77 c11 -11 22 -37 26 -57 11 -65 19 -248 12 -276 -6 -25 -9 -26 -82 -26%0A-87 0 -114 11 -114 45 0 14 -8 38 -18 55 -16 26 -17 36 -7 73 20 72 42 113 89%0A161 50 51 66 56 94 25z m662 -464 c7 -8 17 -15 23 -15 18 0 78 -51 71 -61 -9%0A-15 -30 -217 -43 -404 -12 -173 -26 -342 -41 -500 -9 -89 -25 -281 -34 -405%0A-4 -55 -19 -60 -78 -28 -52 28 -60 37 -53 63 10 34 36 303 54 570 6 77 15 187%0A20 245 6 58 13 146 16 195 3 50 11 150 17 223 12 133 19 151 48 117z m258%0A-310 l144 -144 -7 -51 c-9 -69 -20 -105 -31 -104 -5 1 -41 5 -79 8 -63 6 -73%0A4 -93 -14 -53 -49 -68 -120 -52 -241 6 -46 16 -115 21 -154 5 -38 13 -106 19%0A-150 5 -44 14 -114 20 -155 10 -77 24 -181 36 -282 9 -76 -2 -75 -86 3 -36 33%0A-84 75 -107 92 l-42 32 -1 74 c0 40 4 101 10 135 5 33 14 122 20 196 6 74 15%0A176 20 225 5 50 12 131 15 180 3 50 10 140 15 200 5 61 12 152 16 203 4 50 10%0A92 13 92 3 0 71 -65 149 -145z m-1824 -230 c0 -22 -2 -77 -5 -123 -4 -75 -6%0A-83 -26 -88 -38 -10 -55 0 -69 41 -37 108 6 222 81 213 16 -3 20 -10 19 -43z%0Am1989 -102 c4 -3 1 -16 -7 -29 -9 -13 -16 -32 -16 -43 0 -11 -5 -23 -11 -27%0A-7 -4 -10 -29 -7 -66 l4 -60 -105 7 c-58 4 -107 8 -109 9 -8 8 -9 142 -1 164%0A23 60 34 64 144 56 55 -3 104 -9 108 -11z m-1523 -682 c80 -6 192 -15 250 -21%0A110 -11 231 -22 440 -39 234 -20 290 -30 290 -53 0 -11 -174 -3 -375 18 -224%0A24 -340 34 -505 44 -416 25 -449 29 -492 49 l-43 20 145 -3 c80 -2 210 -9 290%0A-15z m-75 -71 c66 -5 194 -14 285 -20 91 -6 199 -15 240 -20 98 -12 256 -26%0A460 -41 164 -12 165 -12 210 -46 25 -19 67 -56 94 -81 27 -26 63 -57 80 -69%0Al30 -23 -102 0 c-90 0 -104 2 -123 21 -11 11 -46 34 -77 51 -31 17 -75 43 -97%0A58 -99 67 -175 83 -463 96 -81 3 -203 9 -272 14 -69 4 -128 5 -132 3 -5 -2 -8%0A-20 -8 -39 0 -19 -3 -34 -6 -34 -6 0 -254 129 -263 136 -7 6 14 5 144 -6z%0Am225 -108 c0 -4 73 -8 163 -10 89 -1 182 -4 207 -7 92 -11 117 -13 183 -14%0Al68 -1 -3 -61 c-1 -33 -6 -63 -10 -65 -4 -3 -8 -59 -8 -124 0 -76 -4 -120 -11%0A-122 -12 -4 -15 -35 -18 -146 -1 -51 -4 -71 -12 -66 -6 3 -14 2 -18 -3 -3 -5%0A-46 -7 -95 -5 -49 2 -84 7 -78 11 5 3 -42 7 -105 8 -63 2 -120 6 -126 10 -6 4%0A-37 7 -68 7 -32 1 -61 4 -65 9 -4 4 1 7 12 7 12 0 15 3 7 8 -6 4 -13 32 -16%0A62 l-3 55 -2 -57 c-1 -32 -6 -58 -11 -58 -11 0 -23 156 -26 341 -1 81 -6 159%0A-10 175 -15 53 -14 54 16 54 16 0 29 -3 29 -8z m-456 -246 c39 3 85 6 102 9%0A31 3 32 3 21 -28 -5 -18 -15 -42 -20 -55 -8 -16 -7 -36 1 -68 7 -24 12 -49 12%0A-54 0 -6 -42 -10 -104 -10 l-104 0 -11 31 c-25 72 -8 210 22 180 5 -5 42 -8%0A81 -5z m1851 -70 c11 -3 23 -5 28 -5 11 -1 9 -45 -3 -57 -6 -6 -12 -35 -14%0A-65 l-2 -54 -84 4 c-129 5 -130 6 -130 94 0 45 5 78 13 86 9 10 33 12 92 7 44%0A-3 89 -8 100 -10z m-1984 -1262 c-9 -153 -17 -133 71 -176 10 -4 33 -8 52 -8%0A19 0 38 -4 41 -10 3 -5 21 -10 40 -10 19 0 37 -4 40 -10 3 -5 42 -10 86 -10%0A46 0 79 -4 79 -10 0 -12 -167 -14 -174 -1 -3 5 -22 12 -41 15 -19 3 -51 9 -70%0A12 -19 3 -38 10 -41 15 -3 5 -21 9 -40 9 -48 0 -89 40 -80 78 4 15 9 64 13%0A110 4 54 10 81 17 79 7 -3 10 -30 7 -83z m1983 45 c2 -2 7 -56 11 -120 l6%0A-117 -29 -21 c-61 -43 -58 -57 -52 265 0 4 61 -3 64 -7z m-1878 -19 l34 0 0%0A-64 0 -65 53 -19 c28 -10 80 -29 115 -42 34 -12 62 -26 62 -30 0 -13 -83 -4%0A-160 18 -41 11 -100 27 -130 34 l-55 13 2 59 c2 81 10 109 29 102 9 -3 31 -6%0A50 -6z m700 -557 c-4 -90 -5 -89 108 -123 55 -17 118 -36 139 -42 39 -12 44%0A-10 112 29 79 47 80 49 79 114 l-1 61 46 -7 c25 -4 53 -11 61 -15 8 -4 67 -22%0A130 -40 63 -17 119 -35 124 -40 9 -9 -212 -177 -579 -440 -71 -51 -147 -106%0A-167 -122 -39 -29 -62 -34 -100 -19 -13 5 -57 19 -98 31 -41 12 -83 26 -92 31%0A-10 5 -27 9 -38 9 -11 0 -28 4 -38 9 -16 8 -96 34 -187 59 -22 7 -82 25 -134%0A42 -51 16 -100 30 -107 30 -39 0 -1 33 124 109 75 47 178 110 227 141 50 31%0A146 92 215 135 69 43 132 84 140 92 30 27 39 15 36 -44z m-676 -483 c41 -12%0A100 -29 130 -39 30 -10 73 -23 95 -30 44 -12 177 -53 331 -101 l101 -32 -22%0A-59 c-11 -32 -25 -63 -30 -68 -7 -7 -52 3 -125 25 -63 20 -153 47 -200 61 -47%0A14 -105 31 -130 38 -25 8 -94 28 -155 46 -60 17 -113 37 -118 43 -4 6 -5 29%0A-2 51 13 86 16 96 33 91 10 -3 51 -14 92 -26z'/%3E%3Cpath d='M2670 5271 c-125 -26 -273 -164 -308 -286 -65 -230 -31 -424 98 -552%0A98 -98 194 -133 370 -133 204 0 264 28 377 176 55 72 93 183 93 272 -1 69 -30%0A207 -56 259 -44 92 -192 203 -269 203 -13 0 -54 14 -91 30 -69 32 -153 44%0A-214 31z m-72 -255 c3 -20 -4 -36 -22 -55 -27 -28 -56 -107 -56 -151 0 -32%0A-17 -50 -45 -50 -33 0 -45 20 -45 75 0 65 21 107 83 168 55 53 80 57 85 13z%0Am327 -156 c38 -40 47 -128 16 -177 -33 -53 -116 -56 -162 -7 -20 22 -24 35%0A-23 90 0 57 4 68 29 94 41 42 99 42 140 0z'/%3E%3Cpath d='M5216 3497 c-11 -7 -45 -27 -75 -46 -86 -53 -170 -138 -197 -199 -26%0A-56 -30 -107 -15 -175 5 -23 15 -82 22 -130 7 -48 16 -90 21 -93 4 -3 8 -15 8%0A-28 0 -25 78 -104 146 -150 37 -24 42 -32 47 -78 4 -27 11 -56 17 -63 14 -17%0A130 -74 290 -142 64 -28 75 -32 115 -44 22 -7 44 -17 49 -21 6 -4 19 -8 31 -8%0A12 0 25 -4 31 -8 5 -5 29 -14 54 -21 25 -7 54 -17 65 -21 11 -4 40 -13 65 -20%0A25 -7 55 -16 68 -21 29 -11 42 -11 42 -1 0 5 -19 15 -42 22 -24 7 -52 16 -63%0A20 -11 4 -65 22 -120 39 -111 35 -201 68 -227 82 -10 5 -22 9 -28 9 -26 0%0A-284 127 -304 149 -18 21 -28 68 -17 76 11 6 91 -26 91 -37 0 -5 6 -8 14 -8 7%0A0 40 -13 72 -29 32 -16 86 -39 119 -51 33 -12 69 -26 80 -31 17 -7 160 -53%0A251 -80 17 -5 39 -9 50 -9 11 0 24 -4 30 -9 5 -5 28 -11 52 -14 36 -4 41 -3%0A31 9 -6 8 -29 14 -50 14 -21 0 -40 4 -43 9 -3 5 -20 11 -38 14 -55 9 -92 18%0A-113 27 -11 5 -63 23 -115 40 -52 17 -114 40 -137 51 -24 10 -46 19 -49 19%0A-18 0 -230 111 -299 156 -95 62 -118 86 -141 139 -30 72 -56 225 -38 225 4 0%0A29 -23 56 -51 27 -28 52 -48 55 -45 4 4 -16 30 -43 59 -55 58 -78 96 -87 145%0A-17 86 103 220 266 299 26 13 47 28 47 33 0 13 -20 12 -44 -3z'/%3E%3Cpath d='M5205 3383 c-48 -32 -55 -40 -55 -76 0 -39 21 -75 72 -123 96 -92%0A234 -167 503 -275 29 -11 132 -44 185 -59 25 -7 55 -16 68 -21 18 -7 22 -5 22%0A11 0 11 -9 21 -22 25 -101 27 -205 59 -243 75 -11 4 -47 18 -80 31 -58 21%0A-129 55 -283 134 -52 27 -90 57 -132 103 -77 84 -78 118 -5 161 20 11 33 26%0A30 31 -9 14 -15 12 -60 -17z'/%3E%3Cpath d='M5954 1470 c-11 -4 -70 -37 -130 -73 -60 -35 -134 -78 -165 -94 -73%0A-40 -249 -154 -319 -207 -130 -97 -230 -198 -296 -296 -26 -40 -55 -74 -64%0A-77 -90 -28 -299 -138 -420 -222 -187 -128 -420 -326 -519 -441 -92 -105 -31%0A-62 127 90 146 140 315 275 472 375 89 57 310 166 322 159 4 -3 -3 -27 -17%0A-55 -14 -27 -22 -49 -17 -49 5 0 14 12 21 28 36 76 48 95 118 192 105 145 291%0A304 483 412 125 71 239 137 275 160 23 14 68 40 102 57 61 30 87 52 61 50 -7%0A0 -22 -4 -34 -9z'/%3E%3C/g%3E%3C/svg%3E%0A";

#[near_bindgen]
impl Contract {
    /// Initializes the contract owned by `owner_id` with
    /// default metadata (for example purposes only).    
    #[init]
    pub fn new() -> Self {        
        assert!(!env::state_exists(), "Already initialized");
        let owner_id = env::current_account_id(); // Who deployed owns

        let metadata = NFTContractMetadata {
            spec: NFT_METADATA_SPEC.to_string(),
            name: "vSelf NEAR NFT checkins".to_string(),
            symbol: "VSLF".to_string(),
            icon: Some(DATA_IMAGE_SVG_NEAR_ICON.to_string()),
            base_uri: Some(BASE_URI.to_string()),
            reference: None,
            reference_hash: None,
        };
        metadata.assert_valid();        

        Self {
            owner_id: owner_id.clone().into(),
            event_active: false,
            event_name: "Test Event".to_string(),
            event_description: "Test Event Description".to_string(),            
            rewards: UnorderedMap::new(StorageKey::Rewards),
            checkins: UnorderedMap::new(StorageKey::Checkins),
            tokens: NonFungibleToken::new(
                StorageKey::NonFungibleToken,
                owner_id,
                Some(StorageKey::TokenMetadata),
                Some(StorageKey::Enumeration),
                Some(StorageKey::Approval),
            ),
            metadata: LazyOption::new(StorageKey::Metadata, Some(&metadata)),            
        }                
    }
      
    pub fn toss(&mut self) -> u8 {        
        // Toss the dice (minimal logic for now)
        let rand: u8 = *env::random_seed().get(0).unwrap();              
        return rand;
    }
    
    pub fn start(&mut self) {
        self.event_active = true;
    }

    pub fn abort(&mut self) {
        self.event_active = false;
    }

    #[payable]
    pub fn checkin(&mut self, username: String, request: String) -> u8 {
        // Register checkin data        
        let timestamp: u64 = env::block_timestamp();

        let checkin_data = CheckInData {
            username: username.clone(),
            timestamp: timestamp,
        };

        let mut checkins = self.checkins.get(&request).unwrap_or(vec![]);
        checkins.push(checkin_data);
        self.checkins.insert(&request, &checkins);
        
        // Decide what to transfer for the player
        return 0;
    }

    /// Mint a new token with ID=`token_id` belonging to `receiver_id`.
    ///
    /// Since this example implements metadata, it also requires per-token metadata to be provided
    /// in this call. `self.tokens.mint` will also require it to be Some, since
    /// `StorageKey::TokenMetadata` was provided at initialization.
    ///
    /// `self.tokens.mint` will enforce `predecessor_account_id` to equal the `owner_id` given in
    /// initialization call to `new`.
    #[payable]
    pub fn nft_mint(
        &mut self,
        token_id: TokenId,
        receiver_id: AccountId,
        token_metadata: TokenMetadata,
    ) -> Token {
        self.tokens.internal_mint(token_id, receiver_id, Some(token_metadata))
    }    

    /// Views

    // Event general status
    pub fn is_active(&self) -> bool {
        self.event_active
    }

    // Get personal balance of a player
    pub fn get_balance(&self, account_id: AccountId) -> Vec<RewardData> {
        self.rewards.get(&account_id.to_string()).unwrap_or(vec![])
    }

    // Get records for specific QR request
    pub fn get_checkins(&self, request: String) -> Vec<CheckInData> {  
        self.checkins.get(&request).unwrap_or(vec![])
    }
}

// Implement NFT standart
near_contract_standards::impl_non_fungible_token_core!(Contract, tokens);
near_contract_standards::impl_non_fungible_token_approval!(Contract, tokens);
near_contract_standards::impl_non_fungible_token_enumeration!(Contract, tokens);

#[near_bindgen]
impl NonFungibleTokenMetadataProvider for Contract {
  fn nft_metadata(&self) -> NFTContractMetadata {
      self.metadata.get().unwrap()
  }
}

// Tests TO DO