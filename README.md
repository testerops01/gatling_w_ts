# gatling_w_ts

Recently Gatling announced that they are releasing JS/TS SDK for the famed Gatling performance test tool - read the announcement (here)[https://community.gatling.io/t/introducing-our-new-javascript-and-typescript-sdk/9019]

This repo showcases some simple scripts that can be used to get hands on with how Gatling works with TS.

## Prerequisites

As mentioned in the documentation section
- Node 18+ or later (LTS versions)
- NPM 8+ (comes included with Node)

My Set up has
- Node v20.10.0
- NPM 10.8.0

## Use The Repo
- Clone the repo using `git clone`
- Install the dependencies using `npm install`
- To run the simulations
    - Run `npx gatling run --simulation <simulation_name>`


## Other commands
The script section contains different useful commands that can be used in the format
`npm run <commandname>`

e.g - to run the gatling recorder, do `npm run recorder` or `npx gatling recorder`


# Reports
Once the simulation finishes, there is a report generated inside the `target` folder, inside the `gatling` sub folder. A new simulation
directory with name `jssimulation-2024-XXXXXX` is created, which contains the report (`index.html`).