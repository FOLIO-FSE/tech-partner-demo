var rp = require("request-promise");

module.exports = class FolioCommunicator {
    // Logs in to FOLIO to acquire a X-OKAPI-TOKEN
    login(url, tenantId, username, password) {
        //console.log("Logging in");
        return new Promise((resolve, reject) => {
            if (global.folioToken && global.folioToken.length > 5) {
                resolve();
            } else {
                // console.log("Logging in " + process.env.folioUsername);
                let path = "/authn/login";
                let data = {
                    username: username,
                    password: password
                };
                var options = {
                    method: "POST",
                    uri: url + path,
                    body: data,
                    resolveWithFullResponse: true,
                    headers: {
                        "Content-Type": "application/json",
                        "x-okapi-tenant": tenantId
                    },
                    json: true
                };
                rp(options)
                    .then(function (response) {
                        // console.log(`Headers: ${JSON.stringify(response.headers)}`);
                        global.folioToken = response.headers["x-okapi-token"];
                        resolve();
                    })
                    .catch(function (reason) {
                        console.log("REASON login: " + reason);
                        reject(reason);
                    });
            }
        });
    }

    // PUTs (updates a FOLIO record)
    put(path, data) {
        // console.log("PUT to " + path);
        let self = this;
        return new Promise((resolve, reject) => {
            let options = {
                url: path,
                method: "PUT",
                headers: {
                    "x-okapi-token": global.folioToken,
                    "x-okapi-tenant": process.env.tenantId,
                    Accept: "text/plain",
                    "Content-type": "application/json"
                },
                json: true,
                body: data
            };
            rp(options)
                .then(response => {
                    resolve();
                })
                .catch(reason => {
                    console.log("REASON4: " + reason);
                    reject(reason);
                });
        });
    }

    // POSTs (creates a FOLIO record)
    post(path, data) {
        console.log("POST to " + path + " Data: " + JSON.stringify(data));
        return new Promise((resolve, reject) => {
            let options = {
                url: path,
                method: "POST",
                headers: {
                    "x-okapi-token": global.folioToken,
                    "x-okapi-tenant": process.env.tenantId,
                    Accept: "application/json",
                    "Content-type": "application/json"
                },
                json: true,
                body: data,
                resolveWithFullResponse: true
            };
            rp(options)
                .then(response => {
                    resolve();
                })
                .catch(reason => {
                    console.log("REASON: " + reason);
                    reject(reason);
                });
        });
    }


};