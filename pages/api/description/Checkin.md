## API description: checkin-using-deposit

`checkin-using-deposit` is used to call checkin method of the contracts managing events. To pay for user checkins, the event creator must have a positive balance in an additional [contract](https://github.com/vself-project/vself-dao/tree/deposits_contract/contracts/deposits/src). This contract stores the values of user deposits, allows them to replenish the deposit and withdraw funds from it.

The cost of calling a checkin directly through a contract is approximately 0.01 NEAR (`CHECKIN_COST`). Calling a checkin via api decreases the event creator's deposit values by a fixed amount specified in a [constant CHECKIN_FEE](https://github.com/vself-project/vself-beta/blob/a40dcf1241311d63a4b391ef5a5772501c136568/pages/api/checkin-using-deposit.ts#L9) (now it equals 0.015 NEAR).
Since the checkin method is called from the vSelf account, the cost for the event creator is equal to the `CHECKIN_FEE`, and the difference `CHECKIN_FEE - CHECKIN_COST` is the vSelf fee.  


### Algorithm description

- User calls `checkin-using-deposit` with parameters: `eventid`, `nearid`, `qr`.
- Using `eventid` the event creator is defined.
- The deposits contract is requested for the balance of the event creator.
- If deposit value is less than CHECKIN_FEE, then the server will return a message stating that the balance is not large enough. Otherwise, the value of the deposit of the event creator is decreased by CHECKIN_FEE value. After it the checkin method is called.