[![Tests](https://github.com/vself-project/vself-beta/actions/workflows/pre-deploy-test.yml/badge.svg)](https://github.com/vself-project/vself-beta/actions)[![Deployment](https://github.com/vself-project/vself-beta/actions/workflows/firebase-hosting-deploy.yml/badge.svg)](https://github.com/vself-project/vself-beta/actions)

# GreenWing
![](https://github.com/mrpejker/GreenWing/blob/main/public/greenwing.png)

GreenWing is a revolutionary digital solution for sustainable aviation fuels (SAF) supply chain management

### Deployment status
- [GreenWing web application](https://green-wing.vercel.app/)
- [GreenWing smart-contract](https://explorer.testnet.near.org/accounts/events.greenwingadmin.testnet) deployed to events.greenwingadmin.testnet

### Functionality 

GreenWing allows user to create SAF collection with non-transferable NEAR NFTs and mint SAF NFTs directly or using claim link. The SAF dashboard provides all the information about mined SAF NFTs.

- [NEAR onboarding](https://green-wing.vercel.app/onboard) 
- [Create collection](https://green-wing.vercel.app/add) 
- [SAF dashboard](https://green-wing.vercel.app/dashboard) 

Current repository contains frontend source code & smart contacts source code

### Vision

GreenWing is a revolutionary digital solution for sustainable aviation fuels (SAF) supply chain management

The SAF market will need to develop rapidly in the coming years to meet ambitious climate targets. There is a risk that if countries develop these markets in isolation, a patchwork of systems and certification standards will evolve, creating additional complexities, costs, and delays for industry participants in production, distribution, compliance, and monitoring.

The creation of a national or global SAF platform could expand the typical bilateral relationship between producers and buyers, providing better information and competitive prices to end customers. Standardization of credentials and automation of the supply chain management allows for more independent actors to use the same IT environment.  Improved supply-chain transparency could allow off-takers to source volumes and their virtual attributes from their more economically advantageous points, in turn stimulating SAF production from the most efficient technological pathways, most sustainable feedstocks, and most socioeconomically responsible processes.

### Tech Stack

Next.js + Tailwind CSS + Redux + NEAR.js.SDK hosted on Firebase

- GCloud based services: Firebase Hosting as CDN, Cloud Run for dockerized API backend.
- T3 (Typescript/Tailwind CSS/tRPC) Next.js web application.
- Business logic and contracts are written in Rust and deployed on NEAR.
- Wallet Selector for authorization and integration with NEAR contacts.
