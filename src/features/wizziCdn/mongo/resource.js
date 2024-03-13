"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WizziCdnResourceModelBuilder = exports.GetWizziCdnResourceModel = void 0;
/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: wizzi.plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.heroku-1010\.wizzi-override\src\features\wizziCdn\mongo\resource.ts.ittf
    utc time: Wed, 13 Mar 2024 05:41:15 GMT
*/
const mongoose_1 = require("mongoose");
const WizziCdnResourceSchema = new mongoose_1.Schema({
    owner: String,
    name: String,
    contents: String,
    created_at: Date,
    updated_at: Date
});
WizziCdnResourceSchema.index({
    owner: 1,
    name: 1
}, {
    unique: true
});
// mongoose models creation is centralized
// the mongodb service calls buildModel() when starting, after connection has been established
// controllers call GetWizziCdnResourceModel() when initialized, after buildModel() has benn called
let WizziCdnResourceModel;
function GetWizziCdnResourceModel() {
    if (!WizziCdnResourceModel) {
        WizziCdnResourceModel = (0, mongoose_1.model)("WizziCdnResource");
    }
    return WizziCdnResourceModel;
}
exports.GetWizziCdnResourceModel = GetWizziCdnResourceModel;
exports.WizziCdnResourceModelBuilder = {
    buildModel: (options) => WizziCdnResourceModel = (0, mongoose_1.model)("WizziCdnResource", WizziCdnResourceSchema),
    applyExtraSetup: (options) => {
    }
};
//# sourceMappingURL=resource.js.map