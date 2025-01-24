/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.ts\lib\artifacts\ts\module\gen\main.js
    package: @wizzi/plugin.ts@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.apps\packages\wizzi.hub.backend\.wizzi-override\src\features\wizziHubProductions\index.ts.ittf
    utc time: Fri, 24 Jan 2025 15:11:51 GMT
*/
import {ModelBuilderType, ControllerType} from '#/src/features/app/types';
import * as wizziHubProductionsTypes from './types';
import {ArtifactProductionModelBuilder, GetArtifactProductionModel} from './mongo/artifact';
import {PackageProductionModelBuilder, GetPackageProductionModel} from './mongo/package';
import {PluginProductionModelBuilder, GetPluginProductionModel} from './mongo/plugin';
import {MetaProductionModelBuilder, GetMetaProductionModel} from './mongo/meta';
import {TFolderProductionModelBuilder, GetTFolderProductionModel} from './mongo/tfolder';
import {JobProductionModelBuilder, GetJobProductionModel} from './mongo/job';
import {ArtifactProductionController} from './controllers/artifact';
import {ApiV1ArtifactProductionController} from './controllers/apiv1artifact';
import {PackageProductionController} from './controllers/package';
import {ApiV1PackageProductionController} from './controllers/apiv1package';
import {PluginProductionController} from './controllers/plugin';
import {ApiV1PluginProductionController} from './controllers/apiv1plugin';
import {MetaProductionController} from './controllers/meta';
import {ApiV1MetaProductionController} from './controllers/apiv1meta';
import {TFolderProductionController} from './controllers/tfolder';
import {ApiV1TFolderProductionController} from './controllers/apiv1tfolder';
import {JobProductionController} from './controllers/job';
import {ApiV1JobProductionController} from './controllers/apiv1job';
import {ApiV1GenerationsController} from './controllers/apiv1generations';
import * as artifactApi from './api/artifact';
import * as packageApi from './api/package';
import * as pluginApi from './api/plugin';
import * as metaApi from './api/meta';
import * as tFolderApi from './api/tfolder';
import * as jobApi from './api/job';
import * as productionApi from './api/production';

const wizziHubProductionsModelGetters = {
    GetArtifactProductionModel, 
    GetPackageProductionModel, 
    GetPluginProductionModel, 
    GetMetaProductionModel, 
    GetTFolderProductionModel, 
    GetJobProductionModel
 };

const wizziHubProductionsModelBuilders: ModelBuilderType[] = [
    ArtifactProductionModelBuilder, 
    PackageProductionModelBuilder, 
    PluginProductionModelBuilder, 
    MetaProductionModelBuilder, 
    TFolderProductionModelBuilder, 
    JobProductionModelBuilder
];

const wizziHubProductionsControllers: ControllerType[] = [
    new ArtifactProductionController(), 
    new ApiV1ArtifactProductionController(), 
    new PackageProductionController(), 
    new ApiV1PackageProductionController(), 
    new PluginProductionController(), 
    new ApiV1PluginProductionController(), 
    new MetaProductionController(), 
    new ApiV1MetaProductionController(), 
    new TFolderProductionController(), 
    new ApiV1TFolderProductionController(), 
    new JobProductionController(), 
    new ApiV1JobProductionController(), 
    new ApiV1GenerationsController()
];
export {wizziHubProductionsTypes, wizziHubProductionsModelGetters, wizziHubProductionsModelBuilders, wizziHubProductionsControllers, artifactApi, packageApi, pluginApi, metaApi, tFolderApi, jobApi, productionApi};