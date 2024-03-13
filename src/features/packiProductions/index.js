"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productionApi = exports.tFolderApi = exports.metaApi = exports.pluginApi = exports.packageApi = exports.artifactApi = exports.packiProductionsControllers = exports.packiProductionsModelBuilders = exports.packiProductionsModelGetters = exports.packiProductionsTypes = void 0;
const tslib_1 = require("tslib");
const packiProductionsTypes = tslib_1.__importStar(require("./types"));
exports.packiProductionsTypes = packiProductionsTypes;
const artifact_1 = require("./mongo/artifact");
const package_1 = require("./mongo/package");
const plugin_1 = require("./mongo/plugin");
const meta_1 = require("./mongo/meta");
const tfolder_1 = require("./mongo/tfolder");
const artifact_2 = require("./controllers/artifact");
const apiv1artifact_1 = require("./controllers/apiv1artifact");
const package_2 = require("./controllers/package");
const apiv1package_1 = require("./controllers/apiv1package");
const plugin_2 = require("./controllers/plugin");
const apiv1plugin_1 = require("./controllers/apiv1plugin");
const meta_2 = require("./controllers/meta");
const apiv1meta_1 = require("./controllers/apiv1meta");
const tfolder_2 = require("./controllers/tfolder");
const apiv1tfolder_1 = require("./controllers/apiv1tfolder");
const apiv1generations_1 = require("./controllers/apiv1generations");
const artifactApi = tslib_1.__importStar(require("./api/artifact"));
exports.artifactApi = artifactApi;
const packageApi = tslib_1.__importStar(require("./api/package"));
exports.packageApi = packageApi;
const pluginApi = tslib_1.__importStar(require("./api/plugin"));
exports.pluginApi = pluginApi;
const metaApi = tslib_1.__importStar(require("./api/meta"));
exports.metaApi = metaApi;
const tFolderApi = tslib_1.__importStar(require("./api/tfolder"));
exports.tFolderApi = tFolderApi;
const productionApi = tslib_1.__importStar(require("./api/production"));
exports.productionApi = productionApi;
const packiProductionsModelGetters = {
    GetArtifactProductionModel: artifact_1.GetArtifactProductionModel,
    GetPackageProductionModel: package_1.GetPackageProductionModel,
    GetPluginProductionModel: plugin_1.GetPluginProductionModel,
    GetMetaProductionModel: meta_1.GetMetaProductionModel,
    GetTFolderModel: tfolder_1.GetTFolderModel
};
exports.packiProductionsModelGetters = packiProductionsModelGetters;
const packiProductionsModelBuilders = [
    artifact_1.ArtifactProductionModelBuilder,
    package_1.PackageProductionModelBuilder,
    plugin_1.PluginProductionModelBuilder,
    meta_1.MetaProductionModelBuilder,
    tfolder_1.TFolderModelBuilder
];
exports.packiProductionsModelBuilders = packiProductionsModelBuilders;
const packiProductionsControllers = [
    new artifact_2.ArtifactProductionController(),
    new apiv1artifact_1.ApiV1ArtifactProductionController(),
    new package_2.PackageProductionController(),
    new apiv1package_1.ApiV1PackageProductionController(),
    new plugin_2.PluginProductionController(),
    new apiv1plugin_1.ApiV1PluginProductionController(),
    new meta_2.MetaProductionController(),
    new apiv1meta_1.ApiV1MetaProductionController(),
    new tfolder_2.TFolderController(),
    new apiv1tfolder_1.ApiV1TFolderController(),
    new apiv1generations_1.ApiV1GenerationsController()
];
exports.packiProductionsControllers = packiProductionsControllers;
//# sourceMappingURL=index.js.map