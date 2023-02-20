[![Tests](https://github.com/vself-project/vself-beta/actions/workflows/pre-deploy-test.yml/badge.svg)](https://github.com/vself-project/vself-beta/actions)[![Deployment](https://github.com/vself-project/vself-beta/actions/workflows/firebase-hosting-deploy.yml/badge.svg)](https://github.com/vself-project/vself-beta/actions)

### GreenWing
![](https://github.com/mrpejker/GreenWing/blob/main/public/greenwing.png)
- [vSelf web application](https://green-wing.vercel.app/)
- [vSelf smart-contract](https://explorer.testnet.near.org/accounts/events_v22.sergantche.testnet) deployed to events_v22.sergantche.testnet

vSelf web application and API endpoints (in Beta) [vself-beta](https://github.com/vself-project/vself-beta)
1. vSelf SDK and npm packkage (with ZKP tools) (proof-of-concept) [vstudio-metabuild](https://github.com/vself-project/vstudio-metabuild)

Current repository contains frontend source code and tooling which was developed during NEAR Metabuild Hackathon.

### Web App

Next.js + Tailwind CSS + Redux + NEAR.js.SDK hosted on Firebase

### Git Flow

The basic Git Flow consists of main, dev and staging branches.

For developing new feature for the web application one should create a feature branch out of dev and after completing development one should merge it back into dev.

After all the sprint requirements are done and all the features are into dev, one creates a pull-request to the staging branch.

This action will start running tests, after they are passed dev branch can be merged into staging. After merge deployment will start.

Deployment stage will build web app and distribute it to the Firebase hosting located [here](https://vself-dev.firebaseapp.com/).

After product testing on staging environment is over staging branch can be merged into main.

Next step is to test and deploy Main branch to production environment.

### Mobile app

Built with Unity availible for download [here](https://vself-dev.web.app/vself.apk), please use it to go through the quest at [vSelf website](https://vself.app/quest) and obtain some rewards for your NEAR testnet account.
