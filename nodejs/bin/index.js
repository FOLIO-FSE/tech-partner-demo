#!/usr/bin/env node
var rp = require("request-promise")
var fcomm = new (new require("../foliocommunicator.js"))()
const yargs = require("yargs");
const { default: FolioCommunicator } = require("../foliocommunicator");
const options = yargs
    .usage("Usage: -l<okapiurl> -t <tenantID> -u <username>, -p <password>")
    .option("l", { alias: "okapiurl", describe: "Your okapi url", type: "string", demandOption: true })
    .option("t", { alias: "tenantID", describe: "Your tenantID", type: "string", demandOption: true })
    .option("u", { alias: "username", describe: "Your username", type: "string", demandOption: true })
    .option("p", { alias: "password", describe: "Your password", type: "string", demandOption: true })
    .argv;
global.okapiUrl = options.okapiurl
global.okapitoken = ""
global.username = options.username
global.password = options.password
global.tenantID = options.tenantID

const greeting = `Hello, your credentials are URL: ${global.okapiUrl} ${options.tenantID} ${options.username} ${options.password}!`;
console.log(greeting)
fcomm.login(options.okapiurl, options.tenantID, options.username, options.password).then(() => {
    const greeting = `Successfully logged in to FOLIO! Your token is:\n ${global.folioToken}!`;
    console.log(greeting)
    const adrType = { "addressType": "Test", "desc": "Test Address" }
    fcomm.post(global.okapiUrl + "/addresstypes", adrType).then(() => {
        console.log("Success")
    });
})