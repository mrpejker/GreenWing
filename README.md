### vSelf Metabuild Event Management Frontend

Current repository contains frontend source code and tooling which was developed during NEAR Metabuild Hackathon.

### Web App

Next.js + Tailwind CSS + NEAR.js.SDK hosted on Firebase

### Git Flow

The basic Git Flow consists of Main branch, Dev branch and Staging branch.

For developing new feature for the web application one should create a feature branch out of Dev and after completing development merge it back into Dev. After all the sprint requirements are done all the features into Dev one creates a pull-request to the Staging branch.

This will start running tests, after they are passed Dev can be merged into Staging and deployment wll start. Deployment stage will build web app and distribute it to Firebase hosting locatetd [here](https://vself-dev.firebaseapp.com/).

After product testing is over Staging branch can be merged into Main branch. Next step is to test and deploy from Main branch to production environment.

### Mobile app

Built with Unity availible for download [here](https://vself-dev.web.app/vself.apk), please use it to go through the quest at [vSelf website](https://vself.app/quest) and obtain some rewards for your NEAR testnet account.
