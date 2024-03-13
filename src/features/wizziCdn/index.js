"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceApi = exports.wizziCdnControllers = exports.wizziCdnModelBuilders = exports.wizziCdnModelGetters = exports.wizziCdnTypes = void 0;
const tslib_1 = require("tslib");
const wizziCdnTypes = tslib_1.__importStar(require("./types"));
exports.wizziCdnTypes = wizziCdnTypes;
const resource_1 = require("./mongo/resource");
const apiv1resource_1 = require("./controllers/apiv1resource");
const resourceApi = tslib_1.__importStar(require("./api/resource"));
exports.resourceApi = resourceApi;
const wizziCdnModelGetters = {
    GetWizziCdnResourceModel: resource_1.GetWizziCdnResourceModel
};
exports.wizziCdnModelGetters = wizziCdnModelGetters;
const wizziCdnModelBuilders = [
    resource_1.WizziCdnResourceModelBuilder
];
exports.wizziCdnModelBuilders = wizziCdnModelBuilders;
const wizziCdnControllers = [
    new apiv1resource_1.ApiV1WizziCdnResourceController()
];
exports.wizziCdnControllers = wizziCdnControllers;
//# sourceMappingURL=index.js.map