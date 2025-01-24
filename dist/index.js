"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  close: () => close
});
module.exports = __toCommonJS(src_exports);

// src/features/config/env.ts
var import_path = __toESM(require("path"));
var import_dotenv = __toESM(require("dotenv"));
var import_envalid = require("envalid");
function validateEnv() {
  import_dotenv.default.config();
  let checkedEnv = (0, import_envalid.cleanEnv)(process.env, {
    NOCACHE: (0, import_envalid.bool)(),
    SESSION_SECRET: (0, import_envalid.str)(),
    MONGO_HOST: (0, import_envalid.str)(),
    MONGO_USER: (0, import_envalid.str)(),
    MONGO_PASSWORD: (0, import_envalid.str)(),
    MONGO_PATH: (0, import_envalid.str)(),
    PACKI_CONFIG_PATH: (0, import_envalid.str)(),
    IS_WIZZI_DEV: (0, import_envalid.bool)(),
    PORT: (0, import_envalid.port)()
  });
  return checkedEnv;
}
var config;
function create() {
  if (config == null) {
    const checkedEnv = validateEnv();
    const __rootPath = import_path.default.join(__dirname, "..");
    const __ittfPath = import_path.default.join(__rootPath, "ittf");
    const __dataPath = import_path.default.join(__rootPath, "data");
    config = {
      noCache: checkedEnv.NOCACHE,
      sessionSecret: checkedEnv.SESSION_SECRET,
      mongoHost: checkedEnv.MONGO_HOST,
      mongoUser: checkedEnv.MONGO_USER,
      mongoPassword: checkedEnv.MONGO_PASSWORD,
      mongoPath: checkedEnv.MONGO_PATH,
      packiConfigPath: checkedEnv.PACKI_CONFIG_PATH,
      isWizziDev: checkedEnv.IS_WIZZI_DEV,
      port: checkedEnv.PORT,
      userUserName: "stfnbssl",
      userDisplayName: "Stefano Bassoli",
      userAvatarUrl: "https://avatars.githubusercontent.com/u/728956?v=4",
      ittfPath: __ittfPath,
      dataPath: __dataPath,
      metaHtmlIttfPath: import_path.default.join(__ittfPath, "meta", "document", "index.html.ittf"),
      metaFolderIttfPath: import_path.default.join(__ittfPath, "meta", "folder", "index.html.ittf"),
      metaHtmlTextPath: import_path.default.join(__ittfPath, "meta", "text", "index.html.ittf")
    };
    Object.keys(config).forEach(
      (element) => {
        if (element.toLowerCase().indexOf("pass") < 0 && element.indexOf("secr") < 0) {
          console.log("Created config", element, config[element]);
        }
      }
    );
  }
  return config;
}

// src/features/config/index.ts
var config2 = create();

// src/services/mongodb.ts
var import_mongoose = __toESM(require("mongoose"));
function mongodbStart(config3, modelBuilders) {
  let connectUrl;
  const { mongoHost, mongoUser, mongoPassword, mongoPath } = config3;
  if (mongoUser && mongoUser.length > 0 && mongoPassword && mongoPassword.length > 0 && mongoHost && mongoHost.length > 0) {
    connectUrl = `${mongoHost}://${mongoUser}:${mongoPassword}${mongoPath}`;
  } else {
    connectUrl = `${mongoPath}`;
  }
  return import_mongoose.default.connect(connectUrl).then(
    () => {
      console.log("\x1B[32m%s\x1B[0m", "Mongodb. Connected to", mongoPath);
      modelBuilders.forEach(
        (builder) => builder.buildModel()
      );
      return "Connected";
    },
    (err) => {
      throw new Error('\n\nMongodb. \nCannot connect to \n"' + connectUrl + '". \n\n' + err.message + "\n\n");
    }
  );
}

// src/site/controllers/home.ts
var import_express = require("express");

// src/utils/error.ts
var MISSING_REQUIRED_FIELDS = 1e3;
var MISSING_EMAIL = 1002;
var MISSING_FULLNAME = 1003;
var MISSING_USER_ID = 1004;
var USER_NOT_FOUND = 2001;
var LOGIN_REQUIRED = 3001;
var USERNAME_EXISTS = 3002;
var EMAIL_EXISTS = 3003;
var EMAIL_USERNAME_PASSWORD_INVALID = 3006;
var LOGOUT_REQUIRED = 3007;
var OTP_INVALID = 3008;
var OTP_EXPIRED = 3009;
var CONTEST_NOT_FOUND = 3103;
var NOT_REGISTERED_YET = 3201;
var SYSTEM_ERROR = 4002;
var SEND_EMAIL_ERROR = 4003;
var errorMap = {};
errorMap[MISSING_REQUIRED_FIELDS] = "Missing required field(s)";
errorMap[MISSING_EMAIL] = "Missing email";
errorMap[MISSING_FULLNAME] = "Missing fullname";
errorMap[MISSING_USER_ID] = "Missing user ID";
errorMap[USERNAME_EXISTS] = "Username already exists";
errorMap[EMAIL_EXISTS] = "Email already exists";
errorMap[USER_NOT_FOUND] = "User not found";
errorMap[EMAIL_USERNAME_PASSWORD_INVALID] = "Email/Username or password is invalid";
errorMap[LOGOUT_REQUIRED] = "Logout required";
errorMap[SYSTEM_ERROR] = "System Error";
errorMap[LOGIN_REQUIRED] = "Login required";
errorMap[OTP_INVALID] = "OTP is invalid";
errorMap[OTP_EXPIRED] = "OTP is expired";
errorMap[SEND_EMAIL_ERROR] = "Send email Error";
errorMap[CONTEST_NOT_FOUND] = "Contest not found";
errorMap[NOT_REGISTERED_YET] = "Not registered yet";
var FcError = class extends Error {
  constructor(errCode, data = null) {
    super(errorMap[errCode]);
    this.code = errCode;
    this.message = errorMap[errCode];
    this.data = data;
  }
  code;
  message;
  data;
};

// src/utils/index.ts
var statusCode = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404
};

// src/site/controllers/home.ts
function makeHandlerAwareOfAsyncErrors(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var HomeController = class {
  path = "";
  router = (0, import_express.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering HomeController.initialize");
    this.router.get("/", makeHandlerAwareOfAsyncErrors(this.home));
  };
  home = async (request, response) => response.render("home/index.html.ittf", {
    title: "wizzi.hub.backend"
  });
};

// src/site/controllers/demoHome.ts
var import_express2 = require("express");
var DemoHomeController = class {
  path = "/demo/home";
  router = (0, import_express2.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering DemoHomeController.initialize");
    this.router.get(`/`, this.home);
  };
  home = async (request, response) => response.render("demoHome/index.html.ittf", {
    title: "Hello demo home"
  });
};

// src/site/controllers/wizziDocs.ts
var import_express5 = require("express");

// src/utils/sendResponse.ts
var import_json_stringify_safe = __toESM(require("json-stringify-safe"));
function sendContent(res, contentType, content) {
  res.writeHead(200, {
    "Content-Type": contentType,
    "Content-Length": content ? content.length : 0
  });
  res.end(content);
}
var sendHtml = (res, content) => sendContent(res, "text/html", content);
var sendError = (res, error) => {
  console.log("\x1B[31m%s\x1B[0m", "utils.sendResponse.sendError", error);
  res.status(200);
  res.type("application/json");
  res.send({
    err: JSON.parse((0, import_json_stringify_safe.default)(error)),
    message: error && error.message,
    stack: error && error.stack
  });
};
var sendFailure = (res, error, status) => {
  console.log("\x1B[31m%s\x1B[0m", "utils.sendResponse.sendFailure", error);
  res.status(error && error.status ? error.status : status);
  res.type("application/json");
  res.send(error);
};
var sendSuccess = (res, message) => {
  res.status(200);
  res.type("application/json");
  res.send(message);
};

// src/features/wizziDocs/api/cheatsheet.ts
var cheatsheet_exports = {};
__export(cheatsheet_exports, {
  getCheatsheet: () => getCheatsheet2,
  getCheatsheetList: () => getCheatsheetList2
});

// src/features/wizziProductions/factory.ts
var factory_exports = {};
__export(factory_exports, {
  createFilesystemFactory: () => createFilesystemFactory,
  createFilesystemFactoryWithParameters: () => createFilesystemFactoryWithParameters,
  createJsonFs: () => createJsonFs,
  createJsonFsAndFactory: () => createJsonFsAndFactory,
  ensurePackiFilePrefix: () => ensurePackiFilePrefix,
  extractGeneratedFiles: () => extractGeneratedFiles,
  packiFilesToJsonDocuments: () => packiFilesToJsonDocuments
});
var import_factory = __toESM(require("@wizzi/factory"));
var import_repo = require("@wizzi/repo");
var myname = "features/wizzi/factory";
function getWzCtxFactoryPlugins() {
  return {
    items: [
      "@wizzi/plugin.ai",
      "@wizzi/plugin.css",
      "@wizzi/plugin.html",
      "@wizzi/plugin.ittf",
      "@wizzi/plugin.js",
      "@wizzi/plugin.json",
      "@wizzi/plugin.logbot",
      "@wizzi/plugin.md",
      "@wizzi/plugin.svg",
      "@wizzi/plugin.text",
      "@wizzi/plugin.ts",
      "@wizzi/plugin.wzjob",
      "@wizzi/plugin.wzschema",
      "@wizzi/plugin.xml",
      "@wizzi/plugin.yaml"
    ]
  };
}
function getWzCtxMetaPlugins() {
  return {
    items: [
      "./wizzi.meta.cloud/index",
      "./wizzi.meta.commons/index",
      "./wizzi.meta.demo/index",
      "./wizzi.meta.docs/index",
      "./wizzi.meta.documents/index",
      "./wizzi.meta.js/index",
      "./wizzi.meta.js.db/index",
      "./wizzi.meta.js.node/index",
      "./wizzi.meta.js.vanilla/index",
      "./wizzi.meta.js.react/index",
      "./wizzi.meta.starter/index",
      "./wizzi.meta.ts/index",
      "./wizzi.meta.ts.express/index",
      "./wizzi.meta.ts.react/index",
      "./wizzi.meta.ts.db/index",
      "./wizzi.meta.web/index",
      "./wizzi.meta.wizzi/index",
      "./wizzi.meta.wizzi.dev/index"
    ],
    metaPluginsBaseFolder: "C:/My/wizzi/stfnbssl/wizzi.metas/packages"
  };
}
async function createFilesystemFactoryWithParameters(pluginsBaseFolder, plugins, globalContext) {
  return new Promise(
    (resolve2, reject) => import_factory.default.fsFactory({
      repo: {
        storeKind: "filesystem"
      },
      plugins: {
        items: plugins,
        pluginsBaseFolder
      },
      globalContext
    }, function(err, wf) {
      if (err) {
        return reject(err);
      }
      return resolve2(wf);
    })
  );
}
async function createFilesystemFactory(factoryPlugins, metaPlugins, globalContext) {
  const gc = {};
  if (config2.isWizziDev) {
    gc["isWizziStudio"] = true;
  }
  return new Promise(
    (resolve2, reject) => import_factory.default.fsFactory({
      repo: {
        storeKind: "filesystem"
      },
      plugins: factoryPlugins ? factoryPlugins : getWzCtxFactoryPlugins(),
      metaPlugins: metaPlugins ? metaPlugins : getWzCtxMetaPlugins(),
      globalContext: Object.assign({}, gc, globalContext || {})
    }, function(err, wf) {
      if (err) {
        return reject(err);
      }
      resolve2(wf);
    })
  );
}
function packiFilesToJsonDocuments(files) {
  const jsonDocuments = [];
  Object.keys(files).map(
    (value) => {
      const file3 = files[value];
      if (file3 && file3.type === "CODE") {
        const filePath = ensurePackiFilePrefix(value);
        jsonDocuments.push({
          path: filePath,
          content: file3.contents
        });
      }
    }
  );
  return jsonDocuments;
}
async function createJsonFsAndFactory(files, factoryPlugins, metaPlugins, globalContext) {
  const jsonDocuments = [];
  Object.keys(files).map(
    (value) => {
      const file3 = files[value];
      if (file3) {
        if (file3.type === "CODE" && file3.contents && file3.contents.length > 0) {
          const filePath = ensurePackiFilePrefix(value);
          jsonDocuments.push({
            path: filePath,
            content: file3.contents
          });
        }
      }
    }
  );
  const metaPluginsDef = Object.assign({}, getWzCtxMetaPlugins(), metaPlugins || {});
  return new Promise(
    (resolve2, reject) => import_repo.JsonComponents.createJsonFs(
      jsonDocuments,
      // error myname, 'factoryPlugins', factoryPlugins, getWzCtxFactoryPlugins()
      // error myname, 'metaPlugins', metaPlugins
      (err, jsonFs) => {
        if (err) {
          console.log("\x1B[31m%s\x1B[0m", myname, "createJsonFsAndFactory.createJsonFs", err);
          return reject(err);
        }
        import_factory.default.jsonFactory({
          jsonFs,
          plugins: factoryPlugins ? factoryPlugins : getWzCtxFactoryPlugins(),
          metaPlugins: metaPluginsDef,
          globalContext: Object.assign({}, globalContext || {})
        }, function(err2, wf) {
          if (err2) {
            console.log("\x1B[31m%s\x1B[0m", myname, "createJsonFsAndFactory.jsonFactory", err2);
            return reject(err2);
          }
          resolve2({
            wf,
            jsonFs
          });
        });
      }
    )
  );
}
async function createJsonFs(files) {
  const jsonDocuments = [];
  Object.keys(files).map(
    (value) => {
      const file3 = files[value];
      if (file3 && file3.type === "CODE") {
        const filePath = ensurePackiFilePrefix(value);
        jsonDocuments.push({
          path: filePath,
          content: file3.contents
        });
      }
    }
  );
  return new Promise(
    (resolve2, reject) => import_repo.JsonComponents.createJsonFs(
      jsonDocuments,
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve2(result);
      }
    )
  );
}
async function extractGeneratedFiles(jsonFs) {
  const files = {};
  return new Promise(
    (resolve2, reject) => jsonFs.toFiles(
      {
        removeRoot: import_factory.constants.packiFilePrefix
      },
      (err, result) => {
        if (err) {
          reject(err);
        }
        result.forEach(
          (value) => {
            if (value.relPath.endsWith(".ittf") == false) {
              files[value.relPath] = {
                type: "CODE",
                contents: value.content,
                generated: true
              };
            }
          }
        );
        resolve2(files);
      }
    )
  );
}
function ensurePackiFilePrefix(filePath) {
  var newFilePath = normalizePath(filePath);
  return newFilePath.startsWith(import_factory.constants.packiFilePrefix) ? newFilePath : import_factory.constants.packiFilePrefix + newFilePath;
}
function normalizePath(filePath) {
  return filePath.replace(/\\/g, "/");
}

// src/features/wizziProductions/productions.ts
var productions_exports = {};
__export(productions_exports, {
  executeJob: () => executeJob,
  executeJobFs: () => executeJobFs,
  executeJobs: () => executeJobs,
  executeMetaProduction: () => executeMetaProduction,
  folderBrowseToPackiFiles: () => folderBrowseToPackiFiles,
  folderFsToPackiFiles: () => folderFsToPackiFiles,
  generateArtifact: () => generateArtifact,
  generateArtifactDb: () => generateArtifactDb,
  generateArtifactFs: () => generateArtifactFs,
  generateFolderArtifacts: () => generateFolderArtifacts,
  generateFolderArtifactsFs: () => generateFolderArtifactsFs,
  generateWizziModelTypes: () => generateWizziModelTypes,
  getCheatsheet: () => getCheatsheet,
  getCheatsheetList: () => getCheatsheetList,
  getCodeAST: () => getCodeAST,
  getCodeASTFs: () => getCodeASTFs,
  inferAndLoadContextFs: () => inferAndLoadContextFs,
  inferAndLoadContextJson: () => inferAndLoadContextJson,
  loadAndTransformModel: () => loadAndTransformModel,
  loadAndTransformModelFs: () => loadAndTransformModelFs,
  loadModel: () => loadModel,
  loadModelFs: () => loadModelFs,
  loadSiteJsonModel: () => loadSiteJsonModel,
  mTree: () => mTree,
  mTreeBuildUpScript: () => mTreeBuildUpScript,
  mTreeBuildUpScriptDb: () => mTreeBuildUpScriptDb,
  mTreeBuildUpScriptFs: () => mTreeBuildUpScriptFs,
  mTreeDb: () => mTreeDb,
  mTreeFs: () => mTreeFs,
  metaGenerate: () => metaGenerate,
  packiFilesToFolderFs: () => packiFilesToFolderFs,
  scanIttfDocument: () => scanIttfDocument,
  scanIttfDocumentDb: () => scanIttfDocumentDb,
  scanIttfDocumentFs: () => scanIttfDocumentFs,
  scanIttfFolder: () => scanIttfFolder,
  transformModel: () => transformModel,
  wizzify: () => wizzify,
  wizzifyFs: () => wizzifyFs,
  wrapIttfText: () => wrapIttfText
});
var import_path2 = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
var import_json_stringify_safe2 = __toESM(require("json-stringify-safe"));
var import_factory2 = __toESM(require("@wizzi/factory"));
var import_utils2 = require("@wizzi/utils");
var myname2 = "features/wizziProductions/productions";
async function getCheatsheetList() {
  return new Promise(
    async (resolve2, reject) => {
      var files = {};
      let jsonwf = {};
      jsonwf = await createJsonFsAndFactory(files);
      ;
      return resolve2(jsonwf.wf.getCheatsheetList());
    }
  );
}
async function getCheatsheet(schemaName) {
  return new Promise(
    async (resolve2, reject) => {
      var files = {};
      let jsonwf = {};
      jsonwf = await createJsonFsAndFactory(files);
      ;
      jsonwf.wf.getCheatsheet(
        schemaName,
        (err, result) => {
          if (err) {
            return reject(err);
          }
          return resolve2(result);
        }
      );
    }
  );
}
async function loadModel(filePath, files, context) {
  return new Promise(
    // TODO catch error
    async (resolve2, reject) => {
      if (!import_utils2.verify.isObject(files)) {
        return reject({
          action: "wizzi.productions.loadModel",
          message: "files parameter must be an object of type PackiFiles",
          files
        });
      }
      let jsonwf = {};
      const ittfDocumentUri = ensurePackiFilePrefix(filePath);
      jsonwf = await createJsonFsAndFactory(files);
      ;
      jsonwf.wf.loadModel(
        ittfDocumentUri,
        {
          mTreeBuildUpContext: context
        },
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve2(result);
        }
      );
    }
  );
}
async function loadModelFs(filePath, context, options) {
  const _options = options || {};
  return new Promise(
    // TODO catch error
    async (resolve2, reject) => {
      const schemaName = null;
      const plugins = _options.pluginsBaseFolder && _options.plugins ? {
        pluginsBaseFolder: _options.pluginsBaseFolder,
        items: _options.plugins
      } : null;
      const wf = await createFilesystemFactory(plugins, null, {});
      wf.loadModel(
        schemaName,
        filePath,
        {
          mTreeBuildUpContext: context
        },
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve2(result);
        }
      );
    }
  );
}
async function loadModelInternal(wf, filePath, context) {
  return new Promise(
    async (resolve2, reject) => {
      const schemaName = null;
      wf.loadModel(
        schemaName,
        filePath,
        {
          mTreeBuildUpContext: context
        },
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve2(result);
        }
      );
    }
  );
}
async function mTreeBuildUpScript(filePath, files, context) {
  return new Promise(
    // TODO catch error
    async (resolve2, reject) => {
      if (!import_utils2.verify.isObject(files)) {
        return reject({
          action: "wizzi.productions.mTreeBuildUpScript",
          message: "files parameter must be an object of type PackiFiles",
          files
        });
      }
      const ittfDocumentUri = ensurePackiFilePrefix(filePath);
      let jsonwf = {};
      jsonwf = await createJsonFsAndFactory(files);
      ;
      jsonwf.wf.loadMTreeBuildUpScript(
        ittfDocumentUri,
        context,
        (err, buildUpScript) => {
          if (err) {
            return reject(err);
          }
          resolve2(buildUpScript);
        }
      );
    }
  );
}
async function mTreeBuildUpScriptFs(filePath, context) {
  throw new Error(myname2 + ".mTreeBuildUpScriptFs not yet implemented");
}
async function mTreeBuildUpScriptDb(owner, name2, context) {
  throw new Error(myname2 + ".mTreeBuildUpScriptDB not yet implemented");
}
async function mTree(filePath, files, context) {
  return new Promise(
    // TODO catch error
    async (resolve2, reject) => {
      if (!import_utils2.verify.isObject(files)) {
        return reject({
          action: "wizzi.productions.mTree",
          message: "files parameter must be an object of type PackiFiles",
          files
        });
      }
      const ittfDocumentUri = ensurePackiFilePrefix(filePath);
      let jsonwf = {};
      jsonwf = await createJsonFsAndFactory(files);
      ;
      jsonwf.wf.loadMTree(
        ittfDocumentUri,
        context,
        (err, mTree2) => {
          if (err) {
            return reject(err);
          }
          resolve2({
            mTree: mTree2,
            mTreeIttf: mTree2.toIttf()
          });
        }
      );
    }
  );
}
async function mTreeFs(ittfDocumentUri, context) {
  context = context || {};
  return new Promise(
    async (resolve2, reject) => {
      const wf = await createFilesystemFactory();
      wf.loadMTree(
        ittfDocumentUri,
        context,
        (err, mTree2) => {
          if (err) {
            return reject(err);
          }
          resolve2({
            mTree: mTree2,
            mTreeIttf: mTree2.toIttf()
          });
        }
      );
    }
  );
}
async function mTreeDb(owner, name2, context) {
  throw new Error(myname2 + ".mTreeDb not yet implemented");
}
async function wrapIttfText(schema, ittftext, context) {
  context = context || {};
  return new Promise(
    async (resolve2, reject) => {
      const mainIttf = "index." + schema + ".ittf";
      const packiFiles = {
        [mainIttf]: {
          type: "CODE",
          contents: ittftext
        }
      };
      mTree(mainIttf, packiFiles, context).then(
        (result) => {
          throw new Error("Function `wrapIttfText` not implemented");
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "features.wizzi.productions.wrapIttfText.mTree.error", err);
          return reject(err);
        }
      );
    }
  );
}
async function generateArtifact(filePath, files, context, options) {
  const _options = options || {};
  return new Promise(
    async (resolve2, reject) => {
      if (!import_utils2.verify.isObject(files)) {
        return reject({
          action: "wizzi.productions.generateArtifact",
          message: "files parameter must be an object of type PackiFiles",
          files
        });
      }
      let artifactName = _options.generator ? _options.generator : null;
      let jsonwf = {};
      let generationContext = {};
      const ittfDocumentUri = ensurePackiFilePrefix(filePath);
      const siteDocumentUri = Object.keys(files).find(
        (k) => k.endsWith("site.json.ittf")
      );
      try {
        jsonwf = await createJsonFsAndFactory(files);
        ;
        generationContext = Object.assign(context || {}, {
          site: siteDocumentUri ? await loadModelInternal(jsonwf.wf, ensurePackiFilePrefix(siteDocumentUri), {}) : null,
          ...await inferAndLoadContextJson(jsonwf.wf, files, ittfDocumentUri, "twin")
        });
        const ittfSchema = jsonwf.wf.mapIttfDocumentPathToSchema(filePath);
        if (!artifactName) {
          artifactName = jsonwf.wf.mapSchemaToDefaultArtifact(ittfSchema);
        }
        const contentType = jsonwf.wf.mapArtifactToContentType(artifactName);
        console.log(myname2, "generateArtifact", ittfDocumentUri, artifactName, __filename);
        jsonwf.wf.loadModelAndGenerateArtifact(
          ittfDocumentUri,
          {
            modelRequestContext: generationContext || {},
            artifactRequestContext: _options.artifactContext || {}
          },
          artifactName,
          (err, result) => {
            if (err) {
              console.log(myname2, "generateArtifact", "err", err, __filename);
              return reject(err);
            }
            resolve2({
              artifactContent: result,
              sourcePath: filePath,
              artifactGenerator: artifactName,
              contentType
            });
          }
        );
      } catch (ex) {
        return reject(ex);
      }
    }
  );
}
async function generateArtifactFs(filePath, context, options) {
  const _options = options || {};
  return new Promise(
    // TODO catch error
    async (resolve2, reject) => {
      let artifactName = _options.generator ? _options.generator : null;
      const plugins = _options.pluginsBaseFolder && _options.plugins ? {
        pluginsBaseFolder: _options.pluginsBaseFolder,
        items: _options.plugins
      } : null;
      const wf = await createFilesystemFactory(plugins, null, {});
      try {
        const ittfSchema = wf.mapIttfDocumentPathToSchema(filePath);
        if (!artifactName) {
          artifactName = wf.mapSchemaToDefaultArtifact(ittfSchema);
        }
        const contentType = wf.mapArtifactToContentType(artifactName);
        wf.loadModelAndGenerateArtifact(
          filePath,
          {
            modelRequestContext: context || {},
            artifactRequestContext: context || {}
          },
          artifactName,
          (err, result) => {
            if (err) {
              return reject(err);
            }
            resolve2({
              artifactContent: result,
              sourcePath: filePath,
              artifactGenerator: artifactName,
              contentType
            });
          }
        );
      } catch (ex) {
        return reject(ex);
      }
    }
  );
}
async function generateArtifactDb(owner, name2, context) {
  throw new Error(myname2 + ".generateArtifactDb not yet implemented");
}
async function generateFolderArtifacts(sourceFolderUri, destFolderUri, files, context, options) {
  return new Promise(
    async (resolve2, reject) => {
      if (!import_utils2.verify.isObject(files)) {
        return reject({
          action: "wizzi.productions.generateFolderArtifacts",
          message: "files parameter must be an object of type PackiFiles",
          files
        });
      }
      let jsonwf = {};
      try {
        jsonwf = await createJsonFsAndFactory(files);
        ;
        jsonwf.wf.generateFolderArtifacts(
          import_factory2.constants.packiFilePrefix + sourceFolderUri,
          {
            modelRequestContext: context,
            artifactRequestContext: context
          },
          {
            destFolder: import_factory2.constants.packiFilePrefix + destFolderUri,
            deep: true,
            generateFragments: options && options.generateFragments,
            copyInclude: options.copyInclude || ["*"],
            copyExclude: options.copyExclude || []
          },
          (err, result) => {
            if (err) {
              console.log("\x1B[31m%s\x1B[0m", myname2, "generateFolderArtifacts", "error", err);
              return reject(err);
            }
            jsonwf.wf.fileService.getFiles(
              import_factory2.constants.packiFilePrefix + destFolderUri,
              {
                deep: true,
                documentContent: true
              },
              (err2, files2) => {
                if (err2) {
                  return reject(err2);
                }
                const packiFiles = {};
                var i, i_items = files2, i_len = files2.length, file3;
                for (i = 0; i < i_len; i++) {
                  file3 = files2[i];
                  packiFiles[file3.relPath] = {
                    type: "CODE",
                    contents: file3.content
                  };
                }
                resolve2(packiFiles);
              }
            );
          }
        );
      } catch (ex) {
        return reject(ex);
      }
    }
  );
}
async function generateFolderArtifactsFs(sourceFolderUri, destFolderUri, context) {
  return new Promise(
    async (resolve2, reject) => {
      try {
        const wf = await createFilesystemFactory();
        wf.generateFolderArtifacts(
          sourceFolderUri,
          {
            modelRequestContext: context,
            artifactRequestContext: context
          },
          {
            destFolder: destFolderUri
          },
          (err, result) => {
            if (err) {
              return reject(err);
            }
            resolve2("Generated folder artifacts");
          }
        );
      } catch (ex) {
        return reject(ex);
      }
    }
  );
}
async function generateWizziModelTypes(request) {
  return new Promise(
    async (resolve2, reject) => {
      const storeKind = request.storeKind || "filesystem";
      const mTreeBuildUpContext = Object.assign({}, request.mTreeBuildUpContext);
      const globalContext = Object.assign({}, request.globalContext);
      var plugins = [];
      if (request.plugins) {
        var i, i_items = request.plugins, i_len = request.plugins.length, item;
        for (i = 0; i < i_len; i++) {
          item = request.plugins[i];
          if (item) {
            if (plugins.indexOf(item) < 0) {
              plugins.push(item);
            }
          }
        }
      } else {
        plugins.push("@wizzi/plugin.wzschema");
        plugins.push("@wizzi/plugin.html");
        plugins.push("@wizzi/plugin.json");
        plugins.push("@wizzi/plugin.js");
      }
      console.log("wizziProds.generateWizziModelTypes.plugins", plugins);
      for (var k in mTreeBuildUpContext) {
        console.log("- mTreeBuildUpContext property", k, mTreeBuildUpContext[k]);
      }
      for (var k in globalContext) {
        console.log("- globalContext property", k, globalContext[k]);
      }
      try {
        const wf = await createFilesystemFactoryWithParameters(request.pluginsBaseFolder, plugins, globalContext);
        console.log("STARTING WIZZI MODEL TYPES GENERATION FOR SCHEMA " + request.wfschemaName);
        wf.generateModelDoms(
          request.wfschemaIttfDocumentUri,
          request.wfschemaOutputPackageFolder,
          request.wfschemaName,
          mTreeBuildUpContext,
          (err, result) => {
            if (err) {
              return reject({
                message: "wizziProds.generateWizziModelTypes.generateModelDoms.error",
                err: {}
              });
            }
            console.log("\x1B[32m%s\x1B[0m", "WIZZI MODEL TYPES GENERATED FOR SCHEMA " + request.wfschemaName);
            return resolve2(request.wfschemaName);
          }
        );
      } catch (ex) {
        console.log("\x1B[31m%s\x1B[0m", "wizziProds.generateWizziModelTypes.error", ex);
        return reject({
          message: "wizziProds.generateWizziModelTypes.error",
          err: ex
        });
      }
    }
  );
}
async function loadAndTransformModel(filePath, files, context, options) {
  return new Promise(
    async (resolve2, reject) => {
      if (!import_utils2.verify.isObject(files)) {
        return reject({
          action: "wizzi.productions.transformModel",
          message: "files parameter must be an object of type PackiFiles",
          files
        });
      }
      const transformer = options && options.transformer ? options.transformer : null;
      let jsonwf = {};
      let transformationContext = {};
      const ittfDocumentUri = ensurePackiFilePrefix(filePath);
      const siteDocumentUri = Object.keys(files).find(
        (k) => k.endsWith("site.json.ittf")
      );
      try {
        jsonwf = await createJsonFsAndFactory(files);
        ;
        transformationContext = {
          site: siteDocumentUri ? await loadModelInternal(jsonwf.wf, ensurePackiFilePrefix(siteDocumentUri), {}) : null,
          ...await inferAndLoadContextJson(jsonwf.wf, files, ittfDocumentUri, "twin")
        };
        jsonwf.wf.loadAndTransformModel(
          ittfDocumentUri,
          {
            modelRequestContext: transformationContext
          },
          transformer,
          (err, result) => {
            if (err) {
              return reject(err);
            }
            resolve2({
              transformResult: result,
              sourcePath: filePath,
              modelTransformer: transformer
            });
          }
        );
      } catch (ex) {
        return reject(ex);
      }
    }
  );
}
async function transformModel(object, context, options) {
  const _options = options || {};
  return new Promise(
    async (resolve2, reject) => {
      const transformer = _options.transformer;
      if (transformer) {
        const plugins = _options.pluginsBaseFolder && _options.plugins ? {
          pluginsBaseFolder: _options.pluginsBaseFolder,
          items: _options.plugins
        } : null;
        const wf = await createFilesystemFactory(plugins, null, {});
        const transformationContext = {
          modelRequestContext: context || {}
        };
        wf.transformModel(
          object,
          transformer,
          {
            modelRequestContext: transformationContext
          },
          (err, result) => {
            if (err) {
              return reject(err);
            }
            resolve2({
              transformResult: result,
              sourcePath: object,
              modelTransformer: transformer
            });
          }
        );
      } else {
        reject("No model transformer in options");
      }
    }
  );
}
async function loadAndTransformModelFs(filePath, context, options) {
  const _options = options || {};
  return new Promise(
    // TODO catch error
    async (resolve2, reject) => {
      const transformer = _options.transformer ? _options.transformer : null;
      const plugins = _options.pluginsBaseFolder && _options.plugins ? {
        pluginsBaseFolder: _options.pluginsBaseFolder,
        items: _options.plugins
      } : null;
      const wf = await createFilesystemFactory(plugins, null, {});
      const transformationContext = {
        modelRequestContext: context || {}
      };
      wf.loadAndTransformModel(
        filePath,
        {
          modelRequestContext: transformationContext
        },
        transformer,
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve2({
            transformResult: result,
            sourcePath: filePath,
            modelTransformer: transformer
          });
        }
      );
    }
  );
}
async function executeMetaProduction(metaCtx, tempFolder, wizziFolder, globalContext, metaPlugins) {
  tempFolder = tempFolder || "___template";
  wizziFolder = wizziFolder || ".wizzi";
  globalContext = globalContext || {};
  metaPlugins = metaPlugins || {};
  return new Promise(
    async (resolve2, reject) => {
      console.log(myname2, "metaGenerate.metaCtx", Object.keys(metaCtx), __filename);
      let jsonwf = {};
      try {
        jsonwf = await createJsonFsAndFactory({}, null, metaPlugins, {});
        ;
        metaCtx.__wz_fsc = new import_factory2.default.FactoryServiceContext();
        jsonwf.wf.executeMetaProduction(
          {
            metaCtx,
            paths: {
              metaProductionTempFolder: tempFolder,
              metaProductionWizziFolder: wizziFolder
            },
            globalContext
          },
          (err, wizziPackiFiles) => {
            if (err) {
              metaCtx.__wz_fsc.dumpDebugObjects({
                kind: "packi",
                destFolder: import_path2.default.join(__dirname, "..", "..", "..", "dumps", "packi")
              });
              return reject(err);
            }
            metaCtx.__wz_fsc.dumpDebugObjects({
              kind: "packi",
              destFolder: import_path2.default.join(__dirname, "..", "..", "..", "dumps", "packi")
            });
            resolve2(wizziPackiFiles);
          }
        );
      } catch (ex) {
        return reject(ex);
      }
    }
  );
}
async function metaGenerate(metaCtx, factoryPlugins, metaPlugins, globalContext) {
  return new Promise(
    async (resolve2, reject) => {
      console.log(myname2, "metaGenerate.metaCtx", Object.keys(metaCtx), __filename);
      let jsonwf = {};
      try {
        jsonwf = await createJsonFsAndFactory({}, factoryPlugins, metaPlugins);
        ;
        jsonwf.wf.metaGenerate(
          {
            metaCtx,
            paths: {
              metaProductionTempFolder: "___template",
              metaProductionWizziFolder: ".wizzi"
            },
            globalContext: {}
          },
          (err, wizziPackiFiles) => {
            if (err) {
              return reject(err);
            }
            resolve2(wizziPackiFiles);
          }
        );
      } catch (ex) {
        return reject(ex);
      }
    }
  );
}
async function executeJob(wzjobFilePath, packiFiles, context) {
  return new Promise(
    async (resolve2, reject) => {
      if (!import_utils2.verify.isObject(packiFiles)) {
        return reject({
          action: "wizzi.productions.executeJob",
          message: "packiFiles parameter must be an object of type PackiFiles",
          packiFiles
        });
      }
      wzjobFilePath = ensurePackiFilePrefix(wzjobFilePath);
      const jsonwf = await createJsonFsAndFactory(packiFiles);
      jsonwf.wf.executeJob(
        {
          name: "",
          path: wzjobFilePath,
          productionOptions: {},
          globalContext: context || {}
        },
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve2(jsonwf.jsonFs);
        }
      );
    }
  );
}
async function executeJobs(packiFiles, context) {
  return new Promise(
    // TODO catch error
    async (resolve2, reject) => {
      const wzjobFilePaths = Object.keys(packiFiles).filter(
        (k) => k.endsWith(".wzjob.ittf")
      );
      const jsonwf = await createJsonFsAndFactory(packiFiles);
      const execJob = (index) => {
        let wzjobFilePath = wzjobFilePaths[index];
        if (!wzjobFilePath) {
          return resolve2(jsonwf.jsonFs);
        }
        jsonwf.wf.executeJob(
          {
            name: "job: " + wzjobFilePath,
            path: ensurePackiFilePrefix(wzjobFilePath),
            productionOptions: {},
            globalContext: context || {}
          },
          (err, result) => {
            if (err) {
              return reject(err);
            }
            execJob(index + 1);
          }
        );
      };
      execJob(0);
    }
  );
}
async function executeJobFs(request) {
  return new Promise(
    async (resolve2, reject) => {
      try {
        const globalContext = Object.assign({}, request.globalContext);
        var plugins = [];
        if (request.plugins) {
          var i, i_items = request.plugins, i_len = request.plugins.length, item;
          for (i = 0; i < i_len; i++) {
            item = request.plugins[i];
            if (item && plugins.indexOf(item) < 0) {
              plugins.push(item);
            }
          }
        } else {
          plugins.push("wizzi-core");
        }
        const wf = await createFilesystemFactoryWithParameters(request.pluginsBaseFolder, plugins, globalContext);
        console.log("STARTING WIZZI JOB", request.wzjobIttfDocumentUri);
        wf.executeJob(
          {
            name: request.wzjobName || import_path2.default.basename(request.wzjobIttfDocumentUri),
            path: request.wzjobIttfDocumentUri,
            productionOptions: {},
            globalContext
          },
          (err, result) => {
            if (err) {
              return reject({
                message: "wizziProds.executeJobFs.wf.executeJob.error",
                err: {}
              });
            }
            console.log("\x1B[32m%s\x1B[0m", "WIZZI JOB Executed", request.wzjobIttfDocumentUri);
            return resolve2(result);
          }
        );
      } catch (ex) {
        console.log("\x1B[31m%s\x1B[0m", "wizziProds.executeJobFs.error", ex);
        return reject({
          message: "wizziProds.executeJobFs.error",
          err: ex
        });
      }
    }
  );
}
async function inferAndLoadContextJson(wf, files, filePath, exportName) {
  return new Promise(
    (resolve2, reject) => {
      if (!import_utils2.verify.isObject(files)) {
        return reject({
          action: "wizzi.productions.inferAndLoadContextJson",
          message: "files parameter must be an object of type PackiFiles",
          files
        });
      }
      const pf = import_utils2.fSystem.fileInfoByPath(filePath);
      if (pf.isIttfDocument && pf.schema !== "json") {
        var twinJsonBaseName = pf.seedName + ".json.ittf";
        const twinDocumentUri = Object.keys(files).find(
          (k) => k.endsWith("/" + twinJsonBaseName)
        );
        if (twinDocumentUri) {
          loadModelInternal(wf, ensurePackiFilePrefix(twinDocumentUri), {}).then(
            (model7) => resolve2({
              [exportName]: model7
            })
          ).catch(
            (err) => reject(err)
          );
        } else {
          resolve2({});
        }
      } else {
        resolve2({});
      }
    }
  );
}
async function inferAndLoadContextFs(filePath, exportName) {
  return new Promise(
    (resolve2, reject) => {
      const pf = import_utils2.fSystem.fileInfoByPath(filePath);
      if (pf.isIttfDocument && pf.schema !== "json") {
        var twinJsonPath = import_path2.default.join(import_path2.default.dirname(filePath), pf.seedName + ".json.ittf");
        if (import_fs.default.existsSync(twinJsonPath)) {
          loadModelFs(twinJsonPath, {}).then(
            (model7) => resolve2({
              [exportName]: model7
            })
          ).catch(
            (err) => reject(err)
          );
        } else {
          resolve2({});
        }
      } else {
        resolve2({});
      }
    }
  );
}
async function scanIttfDocument(mainIttf, packiFiles, rootFolder) {
  throw new Error(myname2 + ".scanIttfDocument not yet implemented");
}
async function scanIttfDocumentFs(filePath, rootFolder) {
  return new Promise(
    (resolve2, reject) => import_utils2.ittfScanner.scanIttfDocument(
      filePath,
      {
        rootFolder
      },
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve2(result);
      }
    )
  );
}
async function scanIttfFolder(filePath, rootFolder) {
  return new Promise(
    (resolve2, reject) => import_utils2.ittfScanner.browseFolder(
      filePath,
      {
        rootFolder
      },
      (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve2(result);
      }
    )
  );
}
async function scanIttfDocumentDb(owner, name2, rootFolder) {
  throw new Error(myname2 + ".scanIttfDocumentDb not yet implemented");
}
async function folderBrowseToPackiFiles(folderBrowse) {
  return new Promise(
    (resolve2, reject) => {
      const packiFiles = {};
      folderBrowse.fsitems.map(
        (fsitem) => {
          if (fsitem.isFolder == false) {
            packiFiles[fsitem.uri] = {
              type: "CODE",
              contents: fsitem.content || ""
            };
          }
        }
      );
      resolve2(packiFiles);
    }
  );
}
async function folderFsToPackiFiles(folderPath) {
  return new Promise(
    (resolve2, reject) => {
      const fsfile = import_utils2.fSystem.vfile();
      const packiFiles = {};
      try {
        fsfile.getFiles(
          folderPath,
          {
            deep: true,
            documentContent: true
          },
          (err, result) => {
            if (err) {
              console.log("\x1B[31m%s\x1B[0m", "wizzi.productions.folderFsToPackiFiles", err);
              return reject({
                message: "wizzi.productions.folderFsToPackiFiles",
                err
              });
            }
            result.map(
              (fsitem) => packiFiles[fsitem.relPath] = {
                type: "CODE",
                contents: fsitem.content || ""
              }
            );
            return resolve2(packiFiles);
          }
        );
      } catch (ex) {
        return reject({
          message: "wizzi.productions.folderFsToPackiFiles",
          err: ex
        });
      }
    }
  );
}
async function packiFilesToFolderFs(folderPath, files) {
  return new Promise(
    (resolve2, reject) => {
      try {
        const fsfile = import_utils2.fSystem.vfile();
        fsfile.deleteFolder(
          folderPath,
          (err, result) => {
            if (err) {
              console.log("\x1B[31m%s\x1B[0m", "wizzi.productions.packiFilesTofolderFs.fsfile.deleteFolder", err);
              return reject({
                message: "wizzi.productions.packiFilesTofolderFs.fsfile.deleteFolder",
                err
              });
            }
            for (var k in files) {
              const file3 = files[k];
              if (file3) {
                var contents = file3.contents;
                fsfile.write(import_path2.default.join(folderPath, k), contents);
              }
            }
            return resolve2({
              message: "Folder replaced"
            });
          }
        );
      } catch (ex) {
        console.log("\x1B[31m%s\x1B[0m", "Exception. wizzi.productions.packiFilesTofolderFs");
        return reject({
          message: "Exception. wizzi.productions.packiFilesTofolderFs",
          err: ex
        });
      }
    }
  );
}
async function wizzifyFs(filePath) {
  return new Promise(
    async (resolve2, reject) => {
      var extension = import_path2.default.extname(filePath);
      const wf = await createFilesystemFactory();
      wf.getWizziIttf(
        filePath,
        extension,
        (err, ittfDocument) => {
          if (err) {
            reject(err);
          }
          return resolve2(ittfDocument);
        }
      );
    }
  );
}
async function wizzify(files) {
  return new Promise(
    async (resolve2, reject) => {
      var result = {};
      const jsonwf = await createJsonFsAndFactory(files);
      for (const k in files) {
        const file3 = files[k];
        if (file3) {
          var extension = import_path2.default.extname(k);
          try {
            const ittfResult = await handleWizzify(jsonwf.wf, extension, file3.contents);
            result[k + ".ittf"] = {
              type: "CODE",
              contents: ittfResult
            };
          } catch (ex) {
            result[k + ".ittf"] = {
              type: "CODE",
              contents: (0, import_json_stringify_safe2.default)(ex, null, 2)
            };
          }
        }
      }
      return resolve2(result);
    }
  );
}
function handleWizzify(wf, schemaOrExtension, codeSnippet) {
  return new Promise(
    async (resolve2, reject) => wf.getWizziIttfFromText(
      codeSnippet,
      schemaOrExtension,
      (err, ittfDocument) => {
        if (err) {
          reject(err);
        }
        return resolve2(ittfDocument);
      }
    )
  );
}
async function getCodeASTFs(filePath) {
  return new Promise(
    async (resolve2, reject) => {
      var extension = import_path2.default.extname(filePath);
      const wf = await createFilesystemFactory();
      wf.getCodeAST(
        filePath,
        extension,
        (err, ast) => {
          if (err) {
            reject(err);
          }
          return resolve2(ast);
        }
      );
    }
  );
}
async function getCodeAST(files) {
  return new Promise(
    async (resolve2, reject) => {
      var result = {};
      let jsonwf = {};
      jsonwf = await createJsonFsAndFactory(files);
      ;
      for (const k in files) {
        const file3 = files[k];
        if (file3) {
          var extension = import_path2.default.extname(k);
          try {
            const astResult = await handleGetCodeAST(jsonwf.wf, extension, file3.contents);
            result[k + ".ast"] = {
              type: "CODE",
              contents: (0, import_json_stringify_safe2.default)(astResult, null, 2)
            };
          } catch (ex) {
            result[k + ".ast"] = {
              type: "CODE",
              contents: (0, import_json_stringify_safe2.default)(ex, null, 2)
            };
          }
        }
      }
      return resolve2(result);
    }
  );
}
function handleGetCodeAST(wf, schemaOrExtension, codeSnippet) {
  return new Promise(
    async (resolve2, reject) => wf.getCodeASTFromText(codeSnippet, schemaOrExtension, function(err, astResult) {
      if (err) {
        reject(err);
      }
      resolve2(astResult);
    })
  );
}
async function loadSiteJsonModel(relPath, context) {
  context = Object.assign({}, {
    isWizziStudio: true
  }, context || {});
  return new Promise(
    (resolve2, reject) => loadModelFs(import_path2.default.join(config2.ittfPath, "models", relPath), context).then(
      (model7) => resolve2(model7)
    ).catch(
      (err) => reject(err)
    )
  );
}

// src/features/wizziProductions/controllers/production.ts
var import_express3 = require("express");
var import_path4 = __toESM(require("path"));

// src/features/wizziProductions/api/context.ts
var import_path3 = __toESM(require("path"));
var import_factory4 = require("@wizzi/factory");
async function resolveContexts(contextItems) {
  return new Promise(
    (resolve2, reject) => {
      if (contextItems.length == 0) {
        return resolve2({});
      }
      const promises = [];
      contextItems.map(
        (contextItem) => promises.push(new Promise(
          (resolve3, reject2) => resolveContext(contextItem).then(
            (context) => resolve3({
              name: contextItem.name,
              value: context
            })
          ).catch(
            (err) => {
              if (typeof err === "object" && err !== null) {
              }
              console.log("\x1B[31m%s\x1B[0m", "features.wizzi.api.context.resolveContexts.resolveContext.error", err);
              return reject2(err);
            }
          )
        ))
      );
      Promise.all(promises).then(
        (items) => {
          var context = {};
          items.map(
            (value) => {
              if (value.name && value.name.length > 0) {
                context[value.name] = value.value;
              } else {
                context = Object.assign({}, context, value.value);
              }
            }
          );
          resolve2(context);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "features.wizzi.api.context.resolveContexts.Promise.all.error", err);
          return reject(err);
        }
      );
    }
  );
}
function resolveContext(contextItem) {
  if (contextItem.source == "json-fsIttf") {
    return new Promise(
      // TODO check contextItem.path.endsWith('.json.ittf')
      (resolve2, reject) => generateArtifactFs(import_path3.default.join(config2.ittfPath, contextItem.path)).then(
        (value) => resolve2(value)
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "features.wizzi.api.context.resolveContext.wizziProds.generateArtifactFs.error", err);
          return reject(err);
        }
      )
    );
  } else if (contextItem.source == "json-packiIttf") {
    return new Promise(
      (resolve2, reject) => generateArtifact(contextItem.mainIttf, contextItem.packiFiles).then(
        (value) => resolve2(value)
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "features.wizzi.api.context.resolveContext.wizziProds.generateArtifact.error", err);
          return reject(err);
        }
      )
    );
  } else if (contextItem.source == "json-dbIttf") {
    throw new Error("ContextItem source not yet implemented: " + contextItem.source);
  } else if (contextItem.source == "json-fsFile") {
    return new Promise(
      (resolve2, reject) => {
        const json2 = import_factory4.file.readJSON(contextItem.path);
        resolve2(json2);
      }
    );
  } else if (contextItem.source == "json-value") {
    return new Promise(
      (resolve2) => resolve2(contextItem.value)
    );
  } else if (contextItem.source == "model-fsIttf") {
    return new Promise(
      (resolve2, reject) => loadModelFs(import_path3.default.join(config2.ittfPath, contextItem.path), {}).then(
        (value) => resolve2(value)
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "features.wizzi.api.context.resolveContext.wizziProds.loadModelFs.error", err);
          return reject(err);
        }
      )
    );
  } else if (contextItem.source == "model-packiIttf") {
    return new Promise(
      (resolve2, reject) => loadModel(contextItem.mainIttf, contextItem.packiFiles).then(
        (value) => resolve2(value)
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "features.wizzi.api.context.resolveContext.wizziProds.loadModel.error", err);
          return reject(err);
        }
      )
    );
  } else if (contextItem.source == "model-dbIttf") {
    throw new Error("ContextItem source not yet implemented: " + contextItem.source);
  } else {
    throw new Error("Invalid contextItem source: " + contextItem.source);
  }
}

// src/features/wizziProductions/controllers/production.ts
function makeHandlerAwareOfAsyncErrors2(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var ProductionController = class {
  path = "/api/v1/wizzi/production";
  router = (0, import_express3.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering ProductionController.initialize");
    this.router.post("/artifact", makeHandlerAwareOfAsyncErrors2(this.artifact));
    this.router.post("/folder/artifacts", makeHandlerAwareOfAsyncErrors2(this.folderArtifacts));
    this.router.post("/mtree", makeHandlerAwareOfAsyncErrors2(this.mTree));
    this.router.post("/mtreescript", makeHandlerAwareOfAsyncErrors2(this.mTreeBuildUpScript));
    this.router.post("/wizzify", makeHandlerAwareOfAsyncErrors2(this.wizzify));
    this.router.post("/mtreescan", makeHandlerAwareOfAsyncErrors2(this.mTreeScan));
    this.router.post("/meta/execute", makeHandlerAwareOfAsyncErrors2(this.metaExecute));
    this.router.post("/wrapittf", makeHandlerAwareOfAsyncErrors2(this.wrapIttfText));
  };
  artifact = async (request, response) => {
    const artifactRequest = request.body;
    resolveContexts(artifactRequest.contextItems || []).then(
      (context) => {
        if (artifactRequest.ittfDocument) {
          if (artifactRequest.ittfDocument.source == "fs") {
            generateArtifactFs(import_path4.default.join(config2.ittfPath, artifactRequest.ittfDocument.path), context).then(
              (generatedArtifact) => sendSuccess(response, generatedArtifact)
            ).catch(
              (err) => {
                if (typeof err === "object" && err !== null) {
                }
                console.log("\x1B[31m%s\x1B[0m", "features/wizzi/controller/productions.handler.artifact.wizziProds.generateArtifactFs.error", err);
                sendError(response, err);
              }
            );
          } else if (artifactRequest.ittfDocument.source == "packi") {
            generateArtifact(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.packiFiles, context).then(
              (generatedArtifact) => sendSuccess(response, generatedArtifact)
            ).catch(
              (err) => {
                if (typeof err === "object" && err !== null) {
                }
                console.log("\x1B[31m%s\x1B[0m", "features/wizzi/controller/productions.handler.artifact.wizziProds.generateArtifact.error", err);
                sendError(response, err);
              }
            );
          } else if (artifactRequest.ittfDocument.source == "db") {
            generateArtifactDb(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.path, context).then(
              (generatedArtifact) => sendSuccess(response, generatedArtifact)
            ).catch(
              (err) => {
                if (typeof err === "object" && err !== null) {
                }
                console.log("\x1B[31m%s\x1B[0m", "features/wizzi/controller/productions.handler.artifact.wizziProds.generateArtifact.error", err);
                sendError(response, err);
              }
            );
          } else {
            sendError(response, {
              err: {
                message: "Invalid artifactRequest.ittfDocument.source: " + artifactRequest.ittfDocument.source
              }
            });
          }
        } else {
          sendError(response, {
            err: {
              message: "Invalid artifactRequest"
            }
          });
        }
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features/wizzi/controller/productions.handler.artifact.resolveContexts.error", err);
        sendError(response, err);
      }
    );
  };
  folderArtifacts = async (request, response) => {
    const artifactRequest = request.body;
    resolveContexts(artifactRequest.contextItems || []).then(
      (context) => {
        if (artifactRequest.ittfFolder) {
          const sourceError = {
            err: {
              message: "Invalid artifactRequest.ittfFolder.source: " + artifactRequest.ittfFolder.source
            }
          };
          if (artifactRequest.ittfFolder.source == "packi") {
            if (artifactRequest.ittfFolder.sourceFolderUri && artifactRequest.ittfFolder.destFolderUri && artifactRequest.ittfFolder.packiFiles) {
              generateFolderArtifacts(artifactRequest.ittfFolder.sourceFolderUri, artifactRequest.ittfFolder.destFolderUri, artifactRequest.ittfFolder.packiFiles, context, {
                generateFragments: artifactRequest.ittfFolder.generateFragments
              }).then(
                (packiFiles) => {
                  console.log("features/wizzi/controller/productions.handler.folderArtifacts.generateFolderArtifacts.result", Object.keys(packiFiles), __filename);
                  sendSuccess(response, packiFiles);
                }
              ).catch(
                (err) => {
                  if (typeof err === "object" && err !== null) {
                  }
                  console.log("\x1B[31m%s\x1B[0m", "features/wizzi/controller/productions.handler.folderArtifacts.generateFolderArtifacts.error", err);
                  sendError(response, err);
                }
              );
            } else {
              sendError(response, {
                err: {
                  message: "Invalid artifactRequest.ittfFolder.sourceFolderUri: missing"
                }
              });
            }
          } else {
            sendError(response, {
              err: {
                message: "Invalid artifactRequest.ittfFolder.source: " + artifactRequest.ittfFolder.source
              }
            });
          }
        } else {
          sendError(response, {
            err: {
              message: "Invalid artifactRequest"
            }
          });
        }
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "} features/wizzi/controller/productions.handler.folderArtifacts.resolveContexts.error", err);
        sendError(response, err);
      }
    );
  };
  mTree = async (request, response) => {
    const artifactRequest = request.body;
    resolveContexts(artifactRequest.contextItems || []).then(
      (context) => {
        if (artifactRequest.ittfDocument) {
          if (artifactRequest.ittfDocument.source == "fs") {
            mTreeFs(import_path4.default.join(config2.ittfPath, artifactRequest.ittfDocument.path), context).then(
              (mTree2) => sendSuccess(response, {
                mTree: mTree2.mTreeIttf
              })
            ).catch(
              (err) => {
                if (typeof err === "object" && err !== null) {
                }
                console.log("\x1B[31m%s\x1B[0m", "features/wizzi/controller/productions.handler.mTree.wizziProds.mTreeFs.error", err);
                sendError(response, err);
              }
            );
          } else if (artifactRequest.ittfDocument.source == "packi") {
            mTree(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.packiFiles, context).then(
              (mTree2) => sendSuccess(response, {
                mTree: mTree2.mTreeIttf
              })
            ).catch(
              (err) => {
                if (typeof err === "object" && err !== null) {
                }
                console.log("\x1B[31m%s\x1B[0m", "features/wizzi/controller/productions.handler.mTree.wizziProds.mTree.error", err);
                sendError(response, err);
              }
            );
          } else if (artifactRequest.ittfDocument.source == "db") {
            mTreeDb(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.path, context).then(
              (mTree2) => sendSuccess(response, {
                mTree: mTree2.mTreeIttf
              })
            ).catch(
              (err) => {
                if (typeof err === "object" && err !== null) {
                }
                console.log("\x1B[31m%s\x1B[0m", "features/wizzi/controller/productions.handler.mTree.wizziProds.mTreeDb.error", err);
                sendError(response, err);
              }
            );
          } else {
            sendError(response, {
              err: {
                message: "Invalid artifactRequest.ittfDocument.source: " + artifactRequest.ittfDocument.source
              }
            });
          }
        } else {
          sendError(response, {
            err: {
              message: "Invalid artifactRequest"
            }
          });
        }
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "} features/wizzi/controller/productions.handler.mTree.resolveContexts.error", err);
        sendError(response, err);
      }
    );
  };
  mTreeBuildUpScript = async (request, response) => {
    const artifactRequest = request.body;
    resolveContexts(artifactRequest.contextItems || []).then(
      (context) => {
        if (artifactRequest.ittfDocument) {
          if (artifactRequest.ittfDocument.source == "fs") {
            mTreeBuildUpScriptFs(import_path4.default.join(config2.ittfPath, artifactRequest.ittfDocument.path), context).then(
              (mTreeBuildUpScript2) => sendSuccess(response, mTreeBuildUpScript2)
            ).catch(
              (err) => {
                if (typeof err === "object" && err !== null) {
                }
                console.log("\x1B[31m%s\x1B[0m", "features/wizzi/controller/productions.handler.mTreeBuildUpScript.wizziProds.mTreeBuildUpScriptFs.error", err);
                sendError(response, err);
              }
            );
          } else if (artifactRequest.ittfDocument.source == "packi") {
            mTreeBuildUpScript(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.packiFiles, context).then(
              (mTreeBuildUpScript2) => sendSuccess(response, mTreeBuildUpScript2)
            ).catch(
              (err) => {
                if (typeof err === "object" && err !== null) {
                }
                console.log("\x1B[31m%s\x1B[0m", "features/wizzi/controller/productions.handler.mTreeBuildUpScript.wizziProds.mTreeBuildUpScript.error", err);
                sendError(response, err);
              }
            );
          } else if (artifactRequest.ittfDocument.source == "db") {
            mTreeBuildUpScriptDb(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.path, context).then(
              (mTreeBuildUpScript2) => sendSuccess(response, mTreeBuildUpScript2)
            ).catch(
              (err) => {
                if (typeof err === "object" && err !== null) {
                }
                console.log("\x1B[31m%s\x1B[0m", "features/wizzi/controller/productions.handler.mTreeBuildUpScript.wizziProds.mTreeBuildUpScriptDb.error", err);
                sendError(response, err);
              }
            );
          } else {
            sendError(response, {
              err: {
                message: "Invalid artifactRequest.ittfDocument.source: " + artifactRequest.ittfDocument.source
              }
            });
          }
        } else {
          sendError(response, {
            err: {
              message: "Invalid artifactRequest"
            }
          });
        }
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features/wizzi/controller/productions.handler.mTreeBuildUpScript.resolveContexts.error", err);
        sendError(response, err);
      }
    );
  };
  wizzify = async (request, response) => {
    const artifactRequest = request.body;
    if (artifactRequest.wizzifiable) {
      if (artifactRequest.wizzifiable.source == "fs") {
        wizzifyFs(artifactRequest.wizzifiable.filePath).then(
          (wizzifiedContents) => sendSuccess(response, {
            wizzified: wizzifiedContents
          })
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features/wizzi/controller/productions.handler.wizzify.wizziProds.wizzifyFs.error", err);
            sendError(response, err);
          }
        );
      } else if (artifactRequest.wizzifiable.source == "packi") {
        wizzify(artifactRequest.wizzifiable.packiFiles).then(
          (wizzifiedPackiFiles) => sendSuccess(response, {
            wizzifiedPackiFiles
          })
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features/wizzi/controller/productions.handler.wizzify.wizziProds.wizzify.error", err);
            sendError(response, err);
          }
        );
      } else {
        sendError(response, {
          err: {
            message: "Invalid artifactRequest.wizzifiable.source: " + artifactRequest.wizzifiable.source
          }
        });
      }
    } else {
      sendError(response, {
        err: {
          message: "Invalid artifactRequest. Missing `wizzifiable` parameter"
        }
      });
    }
  };
  mTreeScan = async (request, response) => {
    const artifactRequest = request.body;
    if (artifactRequest.ittfDocument) {
      var rootFolder = artifactRequest.ittfDocument.rootFolder || "";
      if (artifactRequest.ittfDocument.source == "fs") {
        scanIttfDocumentFs(import_path4.default.join(config2.ittfPath, artifactRequest.ittfDocument.path), rootFolder).then(
          (mTreeScan) => sendSuccess(response, {
            mTreeScan
          })
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features/wizzi/controller/productions.handler.mTreeScan.wizziProds.mTreeScanFs.error", err);
            sendError(response, err);
          }
        );
      } else if (artifactRequest.ittfDocument.source == "packi") {
        var rootFolder = artifactRequest.ittfDocument.rootFolder || "";
        scanIttfDocument(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.packiFiles, rootFolder).then(
          (mTreeScan) => sendSuccess(response, {
            mTreeScan
          })
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features/wizzi/controller/productions.handler.mTreeScan.wizziProds.mTreeScan.error", err);
            sendError(response, err);
          }
        );
      } else if (artifactRequest.ittfDocument.source == "db") {
        var rootFolder = artifactRequest.ittfDocument.rootFolder || "";
        scanIttfDocumentDb(artifactRequest.ittfDocument.mainIttf, artifactRequest.ittfDocument.path, rootFolder).then(
          (mTreeScan) => sendSuccess(response, {
            mTreeScan
          })
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features/wizzi/controller/productions.handler.mTreeScan.wizziProds.mTreeScanDb.error", err);
            sendError(response, err);
          }
        );
      } else {
        sendFailure(response, {
          err: {
            message: "Invalid artifactRequest.ittfDocument.source " + artifactRequest.ittfDocument.source
          }
        }, 501);
      }
    } else {
      sendError(response, {
        err: {
          message: "Invalid artifactRequest. Missing `ittfDocument` parameter"
        }
      });
    }
  };
  wrapIttfText = async (request, response) => wrapIttfText(request.body.schema, request.body.ittfText).then(
    (wrappedIttfText) => sendSuccess(response, {
      wrappedIttfText
    })
  ).catch(
    (err) => {
      if (typeof err === "object" && err !== null) {
      }
      console.log("\x1B[31m%s\x1B[0m", "features/wizzi/controller/productions.handler.mTreeScan.wizziProds.wrapIttfText.error", err);
      sendError(response, err);
    }
  );
  metaExecute = async (request, response) => {
    throw new Error("features/wizzi/controller/productions.handler.metaExecute not implemented");
  };
};

// src/features/wizziProductions/index.ts
var wizziProductionsControllers = [
  new ProductionController()
];

// src/features/wizziDocs/api/cheatsheet.ts
async function getCheatsheetList2() {
  return new Promise(
    (resolve2, reject) => productions_exports.getCheatsheetList().then(
      (cheatsheets) => {
        return resolve2(cheatsheets);
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "cheatsheetApi.getCheatsheetList.error", err);
        return reject(err);
      }
    )
  );
}
async function getCheatsheet2(schemaName) {
  return new Promise(
    (resolve2, reject) => productions_exports.getCheatsheet(schemaName).then(
      (cheatsheet) => {
        return resolve2(cheatsheet);
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "cheatsheetApi.getCheatsheet.error", err);
        return reject(err);
      }
    )
  );
}

// src/features/wizziDocs/controllers/apiv1cheatsheet.ts
var import_express4 = require("express");
var ApiV1CheatsheetController = class {
  path = "/api/v1/docs/cheatsheet";
  router = (0, import_express4.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering ApiV1CheatsheetController.initialize");
    this.router.get("/", this.getCheatsheetList);
    this.router.get("/:name", this.getCheatsheet);
  };
  getCheatsheetList = async (request, response) => getCheatsheetList2().then(
    (result) => sendSuccess(response, result)
  ).catch(
    (err) => {
      if (typeof err === "object" && err !== null) {
      }
      sendFailure(response, {
        err
      }, 501);
    }
  );
  getCheatsheet = async (request, response) => getCheatsheet2(request.params.name).then(
    (result) => sendSuccess(response, result)
  ).catch(
    (err) => {
      if (typeof err === "object" && err !== null) {
      }
      sendFailure(response, {
        err
      }, 501);
    }
  );
};

// src/features/wizziDocs/index.ts
var wizziDocsControllers = [
  new ApiV1CheatsheetController()
];

// src/site/controllers/wizziDocs.ts
function makeHandlerAwareOfAsyncErrors3(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var DocsController = class {
  path = "/wizzi/docs";
  router = (0, import_express5.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering DocsController.initialize");
    this.router.get("/cheatsheet/:name", makeHandlerAwareOfAsyncErrors3(this.cheatsheet));
  };
  cheatsheet = (
    // loog '*** calling cheatsheetApi.getCheatsheetList'
    async (request, response) => cheatsheet_exports.getCheatsheetList().then(
      // loog '*** csList', csList
      // loog '*** exists', exists
      (csList) => {
        const exists = csList.filter(
          (item) => item.name == request.params.name
        );
        if (exists.length > 0) {
          cheatsheet_exports.getCheatsheet(request.params.name).then(
            // loog '*** 0 result', result
            (result) => response.render("wizzi/docs/cheatsheet.html.ittf", {
              csList,
              cs: result,
              csStatus: 0
            })
          ).catch(
            (err) => {
              console.log("\x1B[31m%s\x1B[0m", "docs.cheatsheet.error", err);
              var content = err;
              if (typeof err === "object" && err !== null) {
                content = "<html><body><pre><code>" + err.message + "</code></pre></body></html>";
              }
              sendHtml(response, content);
            }
          );
        } else if (csList.length > 0) {
          cheatsheet_exports.getCheatsheet(csList[0].name).then(
            // loog '*** 1 result', result
            (result) => response.render("wizzi/docs/cheatsheet.html.ittf", {
              csList,
              cs: result,
              csStatus: 1,
              csMessage: "Cheatsheet for schema " + request.params.name + " unavailable"
            })
          ).catch(
            (err) => {
              console.log("\x1B[31m%s\x1B[0m", "docs.cheatsheet.error", err);
              var content = err;
              if (typeof err === "object" && err !== null) {
                content = "<html><body><pre><code>" + err.message + "</code></pre></body></html>";
              }
              sendHtml(response, content);
            }
          );
        } else {
          response.render("wizzi/docs/cheatsheet.html.ittf", {
            csList: [],
            cs: {
              elements: []
            },
            csStatus: 2,
            csMessage: "No available cheatsheet"
          });
        }
      }
    )
  );
};

// src/site/controllers/wizziHubProductions.ts
var import_express22 = require("express");
var import_jsesc3 = __toESM(require("jsesc"));

// src/features/wizziHubProductions/mongo/artifact.ts
var import_mongoose2 = require("mongoose");
var ArtifactProductionSchema = new import_mongoose2.Schema({
  owner: String,
  name: String,
  description: String,
  wizziSchema: String,
  mainIttf: String,
  packiFiles: String,
  created_at: Date,
  updated_at: Date
});
ArtifactProductionSchema.index({
  owner: 1,
  name: 1
}, {
  unique: true
});
var ArtifactProductionModel;
function GetArtifactProductionModel() {
  if (!ArtifactProductionModel) {
    ArtifactProductionModel = (0, import_mongoose2.model)("ArtifactProduction", ArtifactProductionSchema);
  }
  return ArtifactProductionModel;
}
var ArtifactProductionModelBuilder = {
  buildModel: (options) => ArtifactProductionModel = (0, import_mongoose2.model)("ArtifactProduction", ArtifactProductionSchema),
  applyExtraSetup: (options) => {
  }
};

// src/features/wizziHubProductions/mongo/package.ts
var import_mongoose3 = require("mongoose");
var PackageProductionSchema = new import_mongoose3.Schema({
  owner: String,
  name: String,
  description: String,
  packiFiles: String,
  created_at: Date,
  updated_at: Date
});
PackageProductionSchema.index({
  owner: 1,
  name: 1
}, {
  unique: true
});
var PackageProductionModel;
function GetPackageProductionModel() {
  if (!PackageProductionModel) {
    PackageProductionModel = (0, import_mongoose3.model)("PackageProduction", PackageProductionSchema);
  }
  return PackageProductionModel;
}
var PackageProductionModelBuilder = {
  buildModel: (options) => PackageProductionModel = (0, import_mongoose3.model)("PackageProduction", PackageProductionSchema),
  applyExtraSetup: (options) => {
  }
};

// src/features/wizziHubProductions/mongo/plugin.ts
var import_mongoose4 = require("mongoose");
var PluginProductionSchema = new import_mongoose4.Schema({
  owner: String,
  name: String,
  description: String,
  packiFiles: String,
  created_at: Date,
  updated_at: Date
});
PluginProductionSchema.index({
  owner: 1,
  name: 1
}, {
  unique: true
});
var PluginProductionModel;
function GetPluginProductionModel() {
  if (!PluginProductionModel) {
    PluginProductionModel = (0, import_mongoose4.model)("PluginProduction", PluginProductionSchema);
  }
  return PluginProductionModel;
}
var PluginProductionModelBuilder = {
  buildModel: (options) => PluginProductionModel = (0, import_mongoose4.model)("PluginProduction", PluginProductionSchema),
  applyExtraSetup: (options) => {
  }
};

// src/features/wizziHubProductions/mongo/meta.ts
var import_mongoose5 = require("mongoose");
var MetaProductionSchema = new import_mongoose5.Schema({
  owner: String,
  name: String,
  description: String,
  packiFiles: String,
  created_at: Date,
  updated_at: Date
});
MetaProductionSchema.index({
  owner: 1,
  name: 1
}, {
  unique: true
});
var MetaProductionModel;
function GetMetaProductionModel() {
  if (!MetaProductionModel) {
    MetaProductionModel = (0, import_mongoose5.model)("MetaProduction", MetaProductionSchema);
  }
  return MetaProductionModel;
}
var MetaProductionModelBuilder = {
  buildModel: (options) => MetaProductionModel = (0, import_mongoose5.model)("MetaProduction", MetaProductionSchema),
  applyExtraSetup: (options) => {
  }
};

// src/features/wizziHubProductions/mongo/tfolder.ts
var import_mongoose6 = require("mongoose");
var TFolderProductionSchema = new import_mongoose6.Schema({
  owner: String,
  name: String,
  description: String,
  packiFiles: String,
  created_at: Date,
  updated_at: Date
});
TFolderProductionSchema.index({
  owner: 1,
  name: 1
}, {
  unique: true
});
var TFolderProductionModel;
function GetTFolderProductionModel() {
  if (!TFolderProductionModel) {
    TFolderProductionModel = (0, import_mongoose6.model)("TFolder", TFolderProductionSchema);
  }
  return TFolderProductionModel;
}
var TFolderProductionModelBuilder = {
  buildModel: (options) => TFolderProductionModel = (0, import_mongoose6.model)("TFolder", TFolderProductionSchema),
  applyExtraSetup: (options) => {
  }
};

// src/features/wizziHubProductions/mongo/job.ts
var import_mongoose7 = require("mongoose");
var JobProductionSchema = new import_mongoose7.Schema({
  owner: String,
  name: String,
  description: String,
  packiFiles: String,
  created_at: Date,
  updated_at: Date
});
JobProductionSchema.index({
  owner: 1,
  name: 1
}, {
  unique: true
});
var JobProductionModel;
function GetJobProductionModel() {
  if (!JobProductionModel) {
    JobProductionModel = (0, import_mongoose7.model)("Job", JobProductionSchema);
  }
  return JobProductionModel;
}
var JobProductionModelBuilder = {
  buildModel: (options) => JobProductionModel = (0, import_mongoose7.model)("Job", JobProductionSchema),
  applyExtraSetup: (options) => {
  }
};

// src/features/wizziHubProductions/controllers/artifact.tsx
var import_express9 = require("express");

// src/utils/rest.ts
var import_utils5 = require("@wizzi/utils");
var restParamsCheck = (request) => {
  return new ParamsCheck(request);
};
var ParamsCheck = class {
  constructor(request) {
    this.request = request;
    this.errors = [];
  }
  request;
  errors;
  notUndefined(qb, name2) {
    var value = this.optional(qb, name2);
    if (import_utils5.verify.isUndefined(value)) {
      this.error('Parameter: "' + name2 + '" must have a value.');
    }
    return value;
  }
  notEmpty(qb, name2) {
    var value = this.optional(qb, name2);
    if (import_utils5.verify.isEmpty(value)) {
      this.error('String parameter: "' + name2 + '" must have a value.');
    }
    return value;
  }
  notEmptyBody() {
    var value = this.optionalBody();
    if (import_utils5.verify.isEmpty(value)) {
      this.error("The body must be not empty.");
    }
    return value;
  }
  optional(qb, name2) {
    let value = null;
    if (qb === "query") {
      value = this.request.query[name2];
    } else if (qb === "params") {
      value = this.request.params[name2];
    } else {
      value = this.request.body[name2];
    }
    return value;
  }
  optionalBody() {
    return this.request.body;
  }
  assert(value, message) {
    if (!value) {
      this.error(message);
    }
  }
  error(message) {
    this.errors.push(message);
  }
  hasErrors() {
    return this.errors.length > 0;
  }
  sendErrors(response) {
    sendFailure(response, {
      err: this.errors
    }, 501);
  }
};

// src/features/wizziHubProductions/controllers/artifact.tsx
var import_react5 = __toESM(require("react"));
var import_server3 = __toESM(require("react-dom/server"));

// src/pages/PageFormDocument.tsx
var import_jsesc = __toESM(require("jsesc"));
var import_react = __toESM(require("react"));
var css = String.raw;
var PageCss = css`
              :root {
                --font-normal: -apple-system, BlinkMacSystemFont, system-ui, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                --font-monospace: 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New',
                  monospace;
              }

              html {
                box-sizing: border-box;
              }

              *,
              *:before,
              *:after {
                box-sizing: inherit;
              }

              *:focus {
                outline: none;
              }

              *:focus-visible {
                outline: auto;
              }


              body {
                font-family: var(--font-normal);
                font-size: 14px;
                line-height: 1.42857143;
                overscroll-behavior: none;
              }

              div {
                scrollbar-width: thin;
                scrollbar-color: var(--color-disabled) var(--color-background);
              }

              @media (hover) {
                ::-webkit-scrollbar {
                  width: 12px;
                  height: 12px;
                  background: var(--color-background);
                }
                ::-webkit-scrollbar-thumb {
                  background: var(--color-disabled);
                  border-radius: 10px;
                  border: 3px var(--color-background) solid;
                }
              }

              button,
              input,
              select,
              textarea {
                font: inherit;
                color: inherit;
                line-height: inherit;
              }

              button {
                cursor: pointer;
              }

              button[disabled] {
                cursor: default;
              }

              a {
                color: #4099ff;
              }
            `;
function PageFormDocument(props) {
  const {
    data,
    queryParams,
    content
  } = props;
  return /* @__PURE__ */ import_react.default.createElement("html", null, /* @__PURE__ */ import_react.default.createElement("head", null, /* @__PURE__ */ import_react.default.createElement("meta", { charSet: "utf-8" }), /* @__PURE__ */ import_react.default.createElement("meta", { httpEquiv: "X-UA-Compatible", content: "IE=edge" }), /* @__PURE__ */ import_react.default.createElement("meta", { name: "viewport", content: "width=device-width,minimum-scale=1,initial-scale=1" }), /* @__PURE__ */ import_react.default.createElement("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,500,600" }), /* @__PURE__ */ import_react.default.createElement("link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css" }), /* @__PURE__ */ import_react.default.createElement("link", { rel: "stylesheet", href: "/ittf/css/main.css.ittf" }), /* @__PURE__ */ import_react.default.createElement("script", { src: "https://bundle.run/buffer@6.0.3" }), /* @__PURE__ */ import_react.default.createElement("style", { type: "text/css", dangerouslySetInnerHTML: {
    __html: PageCss
  } }), /* @__PURE__ */ import_react.default.createElement("script", { dangerouslySetInnerHTML: {
    __html: `  window.__INITIAL_DATA__ = ${(0, import_jsesc.default)({
      data,
      queryParams
    }, {
      quotes: "double",
      isScriptContext: true
    })}`
  } })), /* @__PURE__ */ import_react.default.createElement("body", null, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-row space-between bg-color-header color-header align-items-center", id: "__main_navbar" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-row" }, /* @__PURE__ */ import_react.default.createElement("a", { className: "color-header font-x font-w-s", href: "/" }, /* @__PURE__ */ import_react.default.createElement("div", { style: { width: "80px", marginTop: "5px", marginLeft: "20px" } }))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-row" }, /* @__PURE__ */ import_react.default.createElement("a", { className: "m-s color-header font-l font-w-xxl", href: "/ittf/site/starter.html.ittf" }, "Starter"), /* @__PURE__ */ import_react.default.createElement("a", { className: "m-s color-header font-l font-w-xxl", href: "/ittf/site/lab.html.ittf" }, "Lab"), /* @__PURE__ */ import_react.default.createElement("div", { className: "m-s p-s color-header-inverse bg-color-header-inverse font-l font-w-xxl" }, "Productions"), /* @__PURE__ */ import_react.default.createElement("a", { className: "m-s color-header font-l font-w-xxl", href: "/ittf/site/project.html.ittf" }, "Project")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-row" }, /* @__PURE__ */ import_react.default.createElement("a", { className: "m-s color-header font-l font-w-xxl", href: "/ittf/site/docs.html.ittf" }, "Docs")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-row m-r-x" }, /* @__PURE__ */ import_react.default.createElement("a", { className: "m-s color-header font-l font-w-xxl", href: "/profile" }, "Profile"), /* @__PURE__ */ import_react.default.createElement("a", { className: "m-s color-header font-l font-w-xxl", href: "/logout" }, "Log Out"))), /* @__PURE__ */ import_react.default.createElement("section", { id: "root" }), /* @__PURE__ */ import_react.default.createElement("script", { src: "/public/pageforms/main.bundle.js" })));
}

// src/features/wizziHubProductions/api/meta.ts
var meta_exports = {};
__export(meta_exports, {
  createMetaProduction: () => createMetaProduction,
  deleteMetaProduction: () => deleteMetaProduction,
  generateMetaProduction: () => generateMetaProduction,
  generateMetaProductionById: () => generateMetaProductionById,
  getInMemoryMetaPlugins: () => getInMemoryMetaPlugins,
  getMetaProduction: () => getMetaProduction,
  getMetaProductionById: () => getMetaProductionById,
  getMetaProductionList: () => getMetaProductionList,
  getMetaProductionObject: () => getMetaProductionObject,
  getMetaProductionObjectById: () => getMetaProductionObjectById,
  getMetaProduction_withCache: () => getMetaProduction_withCache,
  getTemplatePackiFiles: () => getTemplatePackiFiles,
  invalidateCache: () => invalidateCache,
  mergeMetaProductionFiles: () => mergeMetaProductionFiles,
  updateMetaProduction: () => updateMetaProduction,
  validateMetaProduction: () => validateMetaProduction
});

// src/features/packi/constants.ts
var constants_default = {
  packiConfigPath: ".packi/config.json.ittf"
};

// src/features/packi/api/PackiBuilder.ts
var import_diff_match_patch = __toESM(require("diff-match-patch"));
var PackiBuilder = class {
  constructor(packiFiles) {
    this.packiFiles = packiFiles || {};
    this.dmp = new import_diff_match_patch.default();
    console.log("PackiBuilder.ctor.packiFiles", packiFiles, __filename);
  }
  packiFiles = {};
  dmp;
  getFileContent(filePath) {
    const file3 = this.packiFiles[filePath];
    return file3 ? file3.contents : null;
  }
  putFile(filePath, type, contents) {
    this.packiFiles[filePath] = {
      type,
      contents
    };
  }
  putCodeFile(filePath, contents) {
    this.putFile(filePath, "CODE", contents);
  }
  deleteFile(filePath) {
    delete this.packiFiles[filePath];
  }
  getFileDiffs(filePath, newContent) {
    const tpf = this.packiFiles[filePath];
    if (tpf) {
      return this._diffLineMode(tpf.contents, newContent);
    } else {
      throw new Error("Filepath not found " + filePath);
    }
  }
  // loog 'applyFileDiffs.filePath', filePath
  // loog 'applyFileDiffs.diffs', diffs
  // loog 'applyFileDiffs.this.packiFiles[filePath]', this.packiFiles[filePath]
  applyFileDiffs(filePath, diffs) {
    const tpf = this.packiFiles[filePath];
    if (tpf) {
      const textToPatch = tpf.contents;
      const patches = this.dmp.patch_make(textToPatch, diffs);
      const [patchedText, results] = this.dmp.patch_apply(patches, textToPatch);
      tpf.contents = patchedText;
    } else {
      throw new Error("Filepath not found " + filePath);
    }
  }
  getPackiFilesDiffs(packiFiles) {
    const matches = {};
    for (var key in packiFiles) {
      const pf = packiFiles[key];
      const tpf = this.packiFiles[key];
      if (pf) {
        if (tpf) {
          matches[key] = {
            d: 0,
            diffs: this._diffLineMode(tpf.contents, pf.contents)
          };
        } else {
          matches[key] = {
            d: 1,
            type: pf.type,
            contents: pf.contents
          };
        }
      }
    }
    for (var key in this.packiFiles) {
      if (!packiFiles[key]) {
        matches[key] = {
          d: -1
        };
      }
    }
    return matches;
  }
  applyPatch(packiDiffs) {
    const patchedFiles = {};
    for (var key in packiDiffs) {
      const pd = packiDiffs[key];
      if (pd) {
        if (pd.d == 1) {
          patchedFiles[key] = {
            type: pd.type,
            contents: pd.contents
          };
        } else if (pd.d == 0) {
          const tpf = this.packiFiles[key];
          if (tpf) {
            const textToPatch = tpf.contents;
            const patches = this.dmp.patch_make(textToPatch, pd.diffs);
            const [patchedText, results] = this.dmp.patch_apply(patches, textToPatch);
            patchedFiles[key] = {
              type: tpf.type,
              contents: patchedText
            };
          }
        }
      }
    }
    this.packiFiles = patchedFiles;
  }
  applyPatch_ChangesOnly(packiChanges) {
    for (var key in packiChanges) {
      const pc = packiChanges[key];
      const tpf = this.packiFiles[key];
      if (pc) {
        if (pc.d == 1) {
          this.putCodeFile(key, pc.contents);
        } else if (pc.d == 0) {
          if (tpf) {
            const textToPatch = tpf.contents;
            const patches = this.dmp.patch_make(textToPatch, pc.diffs);
            const [patchedText, results] = this.dmp.patch_apply(patches, textToPatch);
            this.putCodeFile(key, patchedText);
          } else {
            throw new Error("Filepath not found " + key);
          }
        } else if (pc.d == -1) {
          this.deleteFile(key);
        }
      }
    }
  }
  equals(packiFiles) {
    for (var key in packiFiles) {
      const pf = packiFiles[key];
      const tpf = this.packiFiles[key];
      if (pf && tpf) {
        if (tpf.type != pf.type) {
          return false;
        }
        if (tpf.contents != pf.contents) {
          return false;
        }
      } else {
        return false;
      }
    }
    for (var key in this.packiFiles) {
      if (!packiFiles[key]) {
        return false;
      }
    }
    return true;
  }
  _diffLineMode(text1, text2) {
    var a = this.dmp.diff_linesToChars_(text1, text2);
    var lineText1 = a.chars1;
    var lineText2 = a.chars2;
    var lineArray = a.lineArray;
    var diffs = this.dmp.diff_main(lineText1, lineText2, false);
    this.dmp.diff_charsToLines_(diffs, lineArray);
    return diffs;
  }
};

// src/features/packi/api/fs-extra.ts
var import_fs_extra = __toESM(require("fs-extra"));

// src/features/packi/api/utils.ts
var import_node_path = __toESM(require("node:path"));
var import_utils6 = require("@wizzi/utils");
var PACKI_META_DEMO_FOLDER = "C:/My/wizzi/stfnbssl/packi-meta-demo";
function clonePackiFiles(packiFiles, filters) {
  filters = filters || [];
  function isOk(filename) {
    if (filters.length == 0) {
      return true;
    }
    var i, i_items = filters, i_len = filters.length, filter;
    for (i = 0; i < i_len; i++) {
      filter = filters[i];
      if (filter && filename.startsWith(filter)) {
        return true;
      }
    }
    return false;
  }
  const retval = {};
  for (var k in packiFiles) {
    const pf = packiFiles[k];
    if (pf && isOk(k)) {
      retval[k] = pf;
    }
  }
  return retval;
}
function extractPackiFileContent(packiFiles, filePath, options) {
  const pf = extractPackiFile(packiFiles, filePath);
  const retval = {
    text: pf && pf.contents || (options.json ? "{}" : ""),
    json: null
  };
  if (options.json) {
    try {
      retval.json = pf && JSON.parse(pf.contents) || {};
    } catch (err) {
      console.log("\x1B[31m%s\x1B[0m", "Error in extractPackiFileContent parsing packiFile contents", err);
      retval.json = {};
    }
  }
  return retval;
}
function extractPackiFile(packiFiles, filePath) {
  const pfs = packiFilesToObject(packiFiles);
  return pfs[filePath];
}
function packiFilesToObject(packiFiles) {
  if (typeof packiFiles === "string") {
    try {
      return JSON.parse(packiFiles);
    } catch (err) {
      console.log("\x1B[31m%s\x1B[0m", "packiFilesToObject", err);
      return {};
    }
  } else {
    return packiFiles;
  }
}
async function removeFolder(folderPath) {
  return new Promise(
    async (resolve2, reject) => {
      try {
        const fullPath = import_node_path.default.resolve(folderPath);
        const exists = await import_fs_extra.default.pathExists(fullPath);
        if (!exists) {
          console.log(`features.packi.utils.removeFolder-> Folder does not exist: ${fullPath}`);
          return resolve2();
        }
        await import_fs_extra.default.remove(fullPath);
        console.log(`features.packi.utils.removeFolder-> Successfully removed folder: ${fullPath}`);
        return resolve2();
      } catch (error) {
        console.error(`features.packi.utils.removeFolder-> Error removing folder: ${error.message}`);
        return reject(error);
      }
    }
  );
}
function writePackiFilesToFolder(packiFiles, folderPath) {
  return new Promise(
    async (resolve2, reject) => {
      for (const [filePath, fileData] of Object.entries(packiFiles)) {
        if (typeof fileData !== "object" || !fileData.hasOwnProperty("contents")) {
          console.warn(`features.packi.utils.writePackiFilesToFolder-> Skipping invalid entry for path: ${filePath}`);
          continue;
        }
        const fullPath = import_node_path.default.resolve(folderPath, filePath);
        const directory = import_node_path.default.dirname(fullPath);
        try {
          import_utils6.fSystem.file.write(fullPath, fileData.contents);
          console.log(`features.packi.utils.writePackiFilesToFolder-> Successfully wrote file: ${fullPath}`);
        } catch (error) {
          console.error(`features.packi.utils.writePackiFilesToFolder-> Error writing file ${fullPath}: ${error.message}`);
          return reject(error);
        }
      }
      return resolve2();
    }
  );
}
async function installPackiMetaDemo(packageName, packiFiles) {
  return new Promise(
    async (resolve2, reject) => {
      const folderPath = import_node_path.default.resolve(PACKI_META_DEMO_FOLDER, "packages", packageName);
      await removeFolder(folderPath);
      await writePackiFilesToFolder(packiFiles, folderPath);
      return resolve2();
    }
  );
}

// src/features/packi/api/packiManager.ts
var import_factory5 = __toESM(require("@wizzi/factory"));
function prettify(packiFiles) {
  return new Promise(
    (resolve2, reject) => import_factory5.default.packiManager(
      {},
      (err, packiManager) => {
        if (err) {
          console.log("\x1B[31m%s\x1B[0m", err);
          return reject(err);
        }
        packiManager.prettify(
          packiFiles,
          (err2, result) => {
            if (err2) {
              console.log("\x1B[31m%s\x1B[0m", err2);
              return reject(err2);
            }
            console.log("api.PackiManager.prettify.result", result);
            resolve2(result);
          }
        );
      }
    )
  );
}
function generate(packiFiles, plugins, options) {
  return new Promise(
    (resolve2, reject) => import_factory5.default.packiManager(
      {},
      (err, packiManager) => {
        if (err) {
          console.log("\x1B[31m%s\x1B[0m", err);
          return reject(err);
        }
        packiManager.generate(
          packiFiles,
          plugins ? plugins : getWzCtxFactoryPlugins2(),
          {
            modelRequestContext: options.modelRequestContext || {},
            artifactRequestContext: options.artifactRequestContext || {},
            globalContext: options.globalContext || {}
          },
          (err2, result) => {
            if (err2) {
              console.log("\x1B[31m%s\x1B[0m", err2);
              return reject(err2);
            }
            console.log("api.PackiManager.Generate.result", result);
            resolve2(result);
          }
        );
      }
    )
  );
}
function installDemoPackage(packiFiles, context) {
  return installPackiMetaDemo(context.name, packiFiles);
}
function getWzCtxFactoryPlugins2() {
  return {
    items: [
      "@wizzi/plugin.ai",
      "@wizzi/plugin.css",
      "@wizzi/plugin.html",
      "@wizzi/plugin.ittf",
      "@wizzi/plugin.js",
      "@wizzi/plugin.json",
      "@wizzi/plugin.logbot",
      "@wizzi/plugin.md",
      "@wizzi/plugin.svg",
      "@wizzi/plugin.text",
      "@wizzi/plugin.ts",
      "@wizzi/plugin.wzjob",
      "@wizzi/plugin.wzschema",
      "@wizzi/plugin.xml",
      "@wizzi/plugin.yaml"
    ]
  };
}

// src/features/packi/controllers/packiEditing.tsx
var import_express6 = require("express");
var import_react3 = __toESM(require("react"));
var import_server = __toESM(require("react-dom/server"));

// src/pages/EditorDocument.tsx
var import_jsesc2 = __toESM(require("jsesc"));
var import_react2 = __toESM(require("react"));
var css2 = String.raw;
var PageCss2 = css2`
              :root {
                --font-normal: -apple-system, BlinkMacSystemFont, system-ui, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                --font-monospace: 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New',
                  monospace;
              }

              html {
                box-sizing: border-box;
              }

              *,
              *:before,
              *:after {
                box-sizing: inherit;
              }

              *:focus {
                outline: none;
              }

              *:focus-visible {
                outline: auto;
              }

              html,
              body {
                height: 100%;
                width: 100%;
                overflow: hidden;
              }

              body {
                font-family: var(--font-normal);
                font-size: 14px;
                line-height: 1.42857143;
                overscroll-behavior: none;
              }

              div {
                scrollbar-width: thin;
                scrollbar-color: var(--color-disabled) var(--color-background);
              }

              @media (hover) {
                ::-webkit-scrollbar {
                  width: 12px;
                  height: 12px;
                  background: var(--color-background);
                }
                ::-webkit-scrollbar-thumb {
                  background: var(--color-disabled);
                  border-radius: 10px;
                  border: 3px var(--color-background) solid;
                }
              }

              button,
              input,
              select,
              textarea {
                font: inherit;
                color: inherit;
                line-height: inherit;
              }

              button {
                cursor: pointer;
              }

              button[disabled] {
                cursor: default;
              }

              #root {
                height: 100vh;
              }

              a {
                color: #4099ff;
              }
            `;
function EditorDocument(props) {
  const {
    data,
    loggedUser,
    queryParams,
    content
  } = props;
  return /* @__PURE__ */ import_react2.default.createElement("html", null, /* @__PURE__ */ import_react2.default.createElement("head", null, /* @__PURE__ */ import_react2.default.createElement("meta", { charSet: "utf-8" }), /* @__PURE__ */ import_react2.default.createElement("meta", { httpEquiv: "X-UA-Compatible", content: "IE=edge" }), /* @__PURE__ */ import_react2.default.createElement("meta", { name: "viewport", content: "width=device-width,minimum-scale=1,initial-scale=1" }), /* @__PURE__ */ import_react2.default.createElement("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,500,600" }), /* @__PURE__ */ import_react2.default.createElement("link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css" }), /* @__PURE__ */ import_react2.default.createElement("style", { type: "text/css", dangerouslySetInnerHTML: {
    __html: PageCss2
  } }), /* @__PURE__ */ import_react2.default.createElement("script", { dangerouslySetInnerHTML: {
    __html: `  window.__INITIAL_DATA__ = ${(0, import_jsesc2.default)({
      data,
      loggedUser,
      queryParams
    }, {
      quotes: "double",
      isScriptContext: true
    })}
 console.log(window.__INITIAL_DATA__) 
`
  } })), /* @__PURE__ */ import_react2.default.createElement("body", null, /* @__PURE__ */ import_react2.default.createElement("section", { id: "root" }), /* @__PURE__ */ import_react2.default.createElement("script", { defer: true, src: "/public/packi/app.bundle.js" }), /* @__PURE__ */ import_react2.default.createElement("script", { defer: true, src: "/public/packi/editor.worker.bundle.js" }), /* @__PURE__ */ import_react2.default.createElement("script", { defer: true, src: "/public/packi/json.worker.bundle.js" }), /* @__PURE__ */ import_react2.default.createElement("script", { defer: true, src: "/public/packi/css.worker.bundle.js" }), /* @__PURE__ */ import_react2.default.createElement("script", { defer: true, src: "/public/packi/html.worker.bundle.js" }), /* @__PURE__ */ import_react2.default.createElement("script", { defer: true, src: "/public/packi/ts.worker.bundle.js" })));
}

// src/features/packi/controllers/packiEditing.tsx
function renderPackiEditor(req, res, packiItemObject, loggedUser, queryParams) {
  const index = "<!DOCTYPE html>" + import_server.default.renderToStaticMarkup(
    /* @__PURE__ */ import_react3.default.createElement(EditorDocument, { data: packiItemObject, queryParams, loggedUser })
  );
  res.set("Content-Type", "text/html");
  res.set("Content-Length", index.length.toString());
  res.send(index);
}
function makeHandlerAwareOfAsyncErrors4(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var PackiEditingController = class {
  path = "/~~";
  router = (0, import_express6.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering PackiEditingController.initialize");
    this.router.get("/:owner", makeHandlerAwareOfAsyncErrors4(this.getPackiItemList));
    this.router.get("/a/:owner/:name", makeHandlerAwareOfAsyncErrors4(this.getPackiArtifactProductionByUsername_Name));
    this.router.get("/a/:owner/:name/*", makeHandlerAwareOfAsyncErrors4(this.getPackiArtifactProductionByUsername_Name));
    this.router.get("/p/:owner/:name", makeHandlerAwareOfAsyncErrors4(this.getPackiPackageProductionByUsername_Name));
    this.router.get("/p/:owner/:name/*", makeHandlerAwareOfAsyncErrors4(this.getPackiPackageProductionByUsername_Name));
    this.router.get("/m/:owner/:name", makeHandlerAwareOfAsyncErrors4(this.getPackiMetaProductionByUsername_Name));
    this.router.get("/m/:owner/:name/*", makeHandlerAwareOfAsyncErrors4(this.getPackiMetaProductionByUsername_Name));
    this.router.get("/j/:owner/:name", makeHandlerAwareOfAsyncErrors4(this.getPackiJobProductionByUsername_Name));
    this.router.get("/j/:owner/:name/*", makeHandlerAwareOfAsyncErrors4(this.getPackiJobProductionByUsername_Name));
    this.router.get("/l/:owner/:name", makeHandlerAwareOfAsyncErrors4(this.getPackiPluginProductionByUsername_Name));
    this.router.get("/l/:owner/:name/*", makeHandlerAwareOfAsyncErrors4(this.getPackiPluginProductionByUsername_Name));
    this.router.get("/t/:owner/:name", makeHandlerAwareOfAsyncErrors4(this.getPackiTFolderByUsername_Name));
    this.router.get("/t/:owner/:name/*", makeHandlerAwareOfAsyncErrors4(this.getPackiTFolderByUsername_Name));
  };
  getPackiItemList = async (request, response) => {
    return response.redirect("/packi/productions/artifacts");
  };
  getPackiArtifactProductionByUsername_Name = (
    // TODO
    async (request, response) => {
      const queryParams = {};
      const parts = request.path.split("/");
      artifact_exports.getArtifactProductionObject(parts[2], parts.slice(3).join("/")).then(
        (result) => {
          const loggedUser = {
            id: "local_" + config2.userUserName,
            username: config2.userUserName,
            displayName: config2.userDisplayName,
            picture: config2.userAvatarUrl
          };
          renderPackiEditor(request, response, {
            type: "success",
            packi: {
              _id: result._id,
              owner: result.owner,
              name: result.name,
              description: result.description,
              mainIttf: result.mainIttf,
              wizziSchema: result.wizziSchema,
              packiFiles: result.packiFiles,
              packiProduction: "artifact"
            }
          }, loggedUser, queryParams);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          sendFailure(response, {
            err
          }, 501);
        }
      );
    }
  );
  getPackiPackageProductionByUsername_Name = (
    // TODO
    async (request, response) => {
      const queryParams = {};
      const parts = request.path.split("/");
      package_exports.getPackageProductionObject(parts[2], parts.slice(3).join("/")).then(
        (result) => {
          const loggedUser = {
            id: "local_" + config2.userUserName,
            username: config2.userUserName,
            displayName: config2.userDisplayName,
            picture: config2.userAvatarUrl
          };
          renderPackiEditor(request, response, {
            type: "success",
            packi: {
              _id: result._id,
              owner: result.owner,
              name: result.name,
              description: result.description,
              packiFiles: result.packiFiles,
              packiProduction: "package"
            }
          }, loggedUser, queryParams);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          sendFailure(response, {
            err
          }, 501);
        }
      );
    }
  );
  getPackiMetaProductionByUsername_Name = (
    // TODO
    async (request, response) => {
      const queryParams = {};
      const parts = request.path.split("/");
      meta_exports.getMetaProductionObject(parts[2], parts.slice(3).join("/")).then(
        (result) => {
          const loggedUser = {
            id: "local_" + config2.userUserName,
            username: config2.userUserName,
            displayName: config2.userDisplayName,
            picture: config2.userAvatarUrl
          };
          renderPackiEditor(request, response, {
            type: "success",
            packi: {
              _id: result._id,
              owner: result.owner,
              name: result.name,
              description: result.description,
              packiFiles: result.packiFiles,
              packiProduction: "meta"
            }
          }, loggedUser, queryParams);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          sendFailure(response, {
            err
          }, 501);
        }
      );
    }
  );
  getPackiJobProductionByUsername_Name = (
    // TODO
    async (request, response) => {
      const queryParams = {};
      const parts = request.path.split("/");
      job_exports.getJobProductionObject(parts[2], parts.slice(3).join("/")).then(
        (result) => {
          const loggedUser = {
            id: "local_" + config2.userUserName,
            username: config2.userUserName,
            displayName: config2.userDisplayName,
            picture: config2.userAvatarUrl
          };
          renderPackiEditor(request, response, {
            type: "success",
            packi: {
              _id: result._id,
              owner: result.owner,
              name: result.name,
              description: result.description,
              packiFiles: result.packiFiles,
              packiProduction: "job"
            }
          }, loggedUser, queryParams);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          sendFailure(response, {
            err
          }, 501);
        }
      );
    }
  );
  getPackiPluginProductionByUsername_Name = (
    // TODO
    async (request, response) => {
      const queryParams = {};
      const parts = request.path.split("/");
      plugin_exports.getPluginProductionObject(parts[2], parts.slice(3).join("/")).then(
        (result) => {
          const loggedUser = {
            id: "local_" + config2.userUserName,
            username: config2.userUserName,
            displayName: config2.userDisplayName,
            picture: config2.userAvatarUrl
          };
          renderPackiEditor(request, response, {
            type: "success",
            packi: {
              _id: result._id,
              owner: result.owner,
              name: result.name,
              description: result.description,
              packiFiles: result.packiFiles,
              packiProduction: "plugin"
            }
          }, loggedUser, queryParams);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          sendFailure(response, {
            err
          }, 501);
        }
      );
    }
  );
  getPackiTFolderByUsername_Name = (
    // TODO
    async (request, response) => {
      const queryParams = {};
      const parts = request.path.split("/");
      tfolder_exports.getTFolderProductionObject(parts[2], parts.slice(3).join("/")).then(
        (result) => {
          const loggedUser = {
            id: "local_" + config2.userUserName,
            username: config2.userUserName,
            displayName: config2.userDisplayName,
            picture: config2.userAvatarUrl
          };
          renderPackiEditor(request, response, {
            type: "success",
            packi: {
              _id: result._id,
              owner: result.owner,
              name: result.name,
              description: result.description,
              packiFiles: result.packiFiles,
              packiProduction: "tfolder"
            }
          }, loggedUser, queryParams);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          sendFailure(response, {
            err
          }, 501);
        }
      );
    }
  );
};

// src/features/packi/controllers/packiGenerating.tsx
var import_express7 = require("express");
var import_react4 = __toESM(require("react"));
var import_server2 = __toESM(require("react-dom/server"));
function renderPackiEditor2(req, res, packiItemObject, loggedUser, queryParams) {
  const index = "<!DOCTYPE html>" + import_server2.default.renderToStaticMarkup(
    /* @__PURE__ */ import_react4.default.createElement(EditorDocument, { data: packiItemObject, queryParams, loggedUser })
  );
  res.set("Content-Type", "text/html");
  res.set("Content-Length", index.length.toString());
  res.send(index);
}
function makeHandlerAwareOfAsyncErrors5(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var PackiGeneratingController = class {
  path = "/~=";
  router = (0, import_express7.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering PackiGeneratingController.initialize");
    this.router.get("/p/:owner/:name", makeHandlerAwareOfAsyncErrors5(this.getPackiPackageGeneration));
    this.router.get("/p/:owner/:name/*", makeHandlerAwareOfAsyncErrors5(this.getPackiPackageGeneration));
    this.router.get("/m/:owner/:name", makeHandlerAwareOfAsyncErrors5(this.getPackiMetaGeneration));
    this.router.get("/m/:owner/:name/*", makeHandlerAwareOfAsyncErrors5(this.getPackiMetaGeneration));
    this.router.get("/l/:owner/:name", makeHandlerAwareOfAsyncErrors5(this.getPackiPluginGeneration));
    this.router.get("/l/:owner/:name/*", makeHandlerAwareOfAsyncErrors5(this.getPackiPluginGeneration));
  };
  getPackiPackageGeneration = async (request, response) => {
    const queryParams = {};
    const parts = request.path.split("/");
    production_exports.prepareProduction("package", parts[2], parts.slice(3).join("/"), "", {}).then(
      (packageProductionSet) => productions_exports.executeJobs(packageProductionSet.packiFiles, packageProductionSet.context).then(
        (fsJson) => {
          factory_exports.extractGeneratedFiles(fsJson).then(
            (packiFiles) => {
              const user = request.session.user;
              const loggedUser = {
                id: user._id,
                username: user.username,
                displayName: user.name,
                picture: user.avatar_url
              };
              renderPackiEditor2(request, response, {
                type: "success",
                packi: {
                  _id: packageProductionSet._id,
                  owner: packageProductionSet.owner,
                  name: packageProductionSet.name,
                  description: packageProductionSet.description,
                  packiFiles,
                  packiProduction: "package",
                  readOnly: true,
                  generation: true
                }
              }, loggedUser, queryParams);
            }
          ).catch(
            (err) => {
              if (typeof err === "object" && err !== null) {
              }
              sendFailure(response, {
                err
              }, 501);
            }
          );
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          sendFailure(response, {
            err
          }, 501);
        }
      )
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        sendFailure(response, {
          err
        }, 501);
      }
    );
  };
  getPackiMetaGeneration = async (request, response) => {
    const queryParams = {};
    const parts = request.path.split("/");
  };
  getPackiPluginGeneration = async (request, response) => {
    const queryParams = {};
    const parts = request.path.split("/");
    production_exports.prepareProduction("plugin", parts[2], parts.slice(3).join("/"), "", {}).then(
      (packageProductionSet) => productions_exports.executeJobs(packageProductionSet.packiFiles, packageProductionSet.context).then(
        (fsJson) => {
          factory_exports.extractGeneratedFiles(fsJson).then(
            (packiFiles) => {
              const user = request.session.user;
              const loggedUser = {
                id: user._id,
                username: user.username,
                displayName: user.name,
                picture: user.avatar_url
              };
              renderPackiEditor2(request, response, {
                type: "success",
                packi: {
                  _id: packageProductionSet._id,
                  owner: packageProductionSet.owner,
                  name: packageProductionSet.name,
                  description: packageProductionSet.description,
                  packiFiles,
                  packiProduction: "plugin",
                  readOnly: true,
                  generation: true
                }
              }, loggedUser, queryParams);
            }
          ).catch(
            (err) => {
              if (typeof err === "object" && err !== null) {
              }
              sendFailure(response, {
                err
              }, 501);
            }
          );
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          sendFailure(response, {
            err
          }, 501);
        }
      )
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        sendFailure(response, {
          err
        }, 501);
      }
    );
  };
};

// src/features/packi/controllers/apiv1packiManager.ts
var import_express8 = require("express");
var ApiV1PackiManagerController = class {
  path = "/api/v1/packimanager";
  router = (0, import_express8.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering ApiV1PackiManagerController.initialize");
    this.router.post("/prettify", this.executePrettify);
    this.router.post("/generate", this.executeGenerate);
    this.router.post("/install", this.executeInstall);
  };
  executePrettify = async (request, response) => {
    const requestData = request.body;
    prettify(requestData.packiFiles).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        sendFailure(response, {
          err
        }, 501);
      }
    );
  };
  executeGenerate = async (request, response) => {
    const requestData = request.body;
    generate(requestData.packiFiles, null, requestData.context).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        sendFailure(response, {
          err
        }, 501);
      }
    );
  };
  executeInstall = async (request, response) => {
    const requestData = request.body;
    installDemoPackage(requestData.packiFiles, requestData.context).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        sendFailure(response, {
          err
        }, 501);
      }
    );
  };
};

// src/features/packi/index.ts
var packiControllers = [
  new PackiEditingController(),
  new PackiGeneratingController(),
  new ApiV1PackiManagerController()
];
var packiApi = {
  PackiBuilder,
  clonePackiFiles,
  extractPackiFileContent,
  extractPackiFile,
  packiFilesToObject,
  prettify,
  generate
};

// src/features/wizziHubProductions/api/meta.ts
var import_node_cache = __toESM(require("node-cache"));

// src/features/wizziHubProductions/utils.ts
function mergePackiFiles(current, toadd, options) {
  options = options || {};
  var ret = {};
  for (var k in current) {
    const c = current[k];
    if (c) {
      ret[k] = c;
    }
  }
  for (var k in toadd) {
    const a = toadd[k];
    if (a) {
      const filePath = options.mergeToFolder ? stripStartSlash(stripEndSlash(options.mergeToFolder)) + "/" + stripStartSlash(k) : k;
      ret[filePath] = a;
    }
  }
  return ret;
}
function stripEndSlash(path10) {
  return path10.endsWith("/") ? path10.substring(0, path10.length - 1) : path10;
}
function stripStartSlash(path10) {
  return path10.startsWith("/") ? path10.substring(1) : path10;
}

// src/features/wizziHubProductions/api/meta.ts
var myname3 = "features.wizziHubProductions.api.MetaProduction";
var metaProductionCache = new import_node_cache.default({
  stdTTL: 120,
  checkperiod: 60
});
async function validateMetaProduction(owner, name2) {
  const MetaProduction = GetMetaProductionModel();
  return new Promise(
    (resolve2, reject) => {
      let query = { owner, name: name2 };
      MetaProduction.find(
        query,
        (err, result) => {
          if (err) {
            return reject(err);
          }
          if (result.length == 1) {
            return resolve2({
              isValid: false,
              message: "meta production already exists"
            });
          }
          resolve2({
            isValid: true
          });
        }
      );
    }
  );
}
async function getMetaProductionList(options) {
  options = options || {};
  const MetaProduction = GetMetaProductionModel();
  return new Promise(
    (resolve2, reject) => {
      const query = MetaProduction.find(options.query);
      if (options.limit) {
        query.limit(options.limit);
      }
      if (options.sort) {
        query.sort(options.sort);
      }
      query.find(
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname3, "getMetaProductionList", "MetaProduction.find", "error", err);
            return reject(err);
          }
          const resultItem = [];
          var i, i_items = result, i_len = result.length, item;
          for (i = 0; i < i_len; i++) {
            item = result[i];
            const item_obj = {
              _id: item._id,
              id: item.id,
              owner: item.owner,
              name: item.name,
              description: item.description,
              packiFiles: item.packiFiles
            };
            resultItem.push(item_obj);
          }
          resolve2({
            oper: "getMetaProductionList",
            ok: true,
            item: resultItem
          });
        }
      );
    }
  );
}
async function getMetaProduction(owner, name2) {
  const MetaProduction = GetMetaProductionModel();
  return new Promise(
    (resolve2, reject) => {
      let query = {
        owner,
        name: name2
      };
      MetaProduction.find(
        query,
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname3, "getMetaProduction", "MetaProduction.find", "error", err);
            return reject(err);
          }
          if (result.length == 1) {
            return resolve2({
              oper: "get",
              ok: true,
              item: result[0]
            });
          }
          resolve2({
            oper: "get",
            ok: false,
            message: "meta production not found"
          });
        }
      );
    }
  );
}
async function getMetaProductionById(id) {
  const MetaProduction = GetMetaProductionModel();
  return new Promise(
    (resolve2, reject) => {
      MetaProduction.find(
        {
          _id: id
        },
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname3, "getMetaProduction", "MetaProduction.find", "error", err);
            return reject(err);
          }
          if (result.length == 1) {
            return resolve2({
              oper: "get",
              ok: true,
              item: result[0]
            });
          }
          resolve2({
            oper: "getMetaProduction",
            ok: false,
            message: "meta production not found"
          });
        }
      );
    }
  );
}
async function getMetaProductionObject(owner, name2, loadPackiConfig) {
  return new Promise(
    (resolve2, reject) => getMetaProduction(owner, name2).then(
      (result) => {
        if (!result.ok) {
          return reject(result);
        }
        const mp = result.item;
        return resolve2(_createMetaProductionObject(mp, loadPackiConfig));
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.metaProduction.getMetaProductionObject.getMetaProduction.error", err);
        return reject(err);
      }
    )
  );
}
async function getMetaProductionObjectById(id, loadPackiConfig) {
  return new Promise(
    (resolve2, reject) => getMetaProductionById(id).then(
      (result) => {
        if (!result.ok) {
          return reject(result);
        }
        const mp = result.item;
        return resolve2(_createMetaProductionObject(mp, loadPackiConfig));
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.metaProduction.getMetaProductionObjectById.getMetaProductionById.error", err);
        return reject(err);
      }
    )
  );
}
async function _createMetaProductionObject(mp, loadPackiConfig) {
  return new Promise(
    (resolve2, reject) => {
      const mp_packiFiles_object = JSON.parse(mp.packiFiles);
      const obj = {
        ...mp._doc,
        packiFiles: mp_packiFiles_object,
        _id: mp._id.toString(),
        packiProduction: "MetaProduction",
        configPackiFile: mp_packiFiles_object[constants_default.packiConfigPath],
        packiConfigJsonObj: null
      };
      if (loadPackiConfig) {
        if (!obj.configPackiFile) {
          return reject({
            message: "Missing file " + constants_default.packiConfigPath + " in MetaProduction"
          });
        }
        productions_exports.generateArtifact(constants_default.packiConfigPath, {
          [constants_default.packiConfigPath]: {
            type: obj.configPackiFile.type,
            contents: obj.configPackiFile.contents
          }
        }, {}).then(
          (generationResult) => {
            obj.packiConfigJsonObj = JSON.parse(generationResult.artifactContent);
            return resolve2(obj);
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.metaProduction.getMetaProductionObject._createMetaProductionObject.error", err);
            return reject(err);
          }
        );
      } else {
        return resolve2(obj);
      }
    }
  );
}
async function createMetaProduction(owner, name2, description, packiFiles) {
  const MetaProduction = GetMetaProductionModel();
  return new Promise(
    (resolve2, reject) => {
      let query = {
        owner,
        name: name2
      };
      MetaProduction.find(
        query,
        // loog myname, 'getMetaProduction', 'MetaProduction.find', 'result', result
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname3, "getMetaProduction", "MetaProduction.find", "error", err);
            return reject(err);
          }
          if (result.length > 0) {
            return resolve2({
              oper: "create",
              ok: false,
              message: "meta production already exists"
            });
          }
          const newMetaProduction = new MetaProduction({
            owner,
            name: name2,
            description,
            packiFiles,
            created_at: /* @__PURE__ */ new Date(),
            updated_at: /* @__PURE__ */ new Date()
          });
          newMetaProduction.save(function(err2, doc) {
            if (err2) {
              console.log("\x1B[31m%s\x1B[0m", myname3, "createMetaProduction", "newMetaProduction.save", "error", err2);
              return reject(err2);
            }
            return resolve2({
              oper: "createMetaProduction",
              ok: true,
              item: doc._doc,
              message: "meta production created"
            });
          });
        }
      );
    }
  );
}
async function updateMetaProduction(id, owner, name2, description, packiFiles) {
  const MetaProduction = GetMetaProductionModel();
  return new Promise(
    (resolve2, reject) => {
      var query;
      if (id && id.length > 0) {
        query = {
          _id: id
        };
      } else {
        query = {
          owner,
          name: name2
        };
      }
      const update = {};
      if (typeof owner !== "undefined") {
        update["owner"] = owner;
      }
      if (typeof name2 !== "undefined") {
        update["name"] = name2;
      }
      if (typeof description !== "undefined") {
        update["description"] = description;
      }
      if (typeof packiFiles !== "undefined") {
        update["packiFiles"] = packiFiles;
      }
      update["updated_at"] = /* @__PURE__ */ new Date();
      MetaProduction.findOneAndUpdate(
        query,
        update,
        {},
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname3, "updateMetaProduction", "MetaProduction.findOneAndUpdate", "error", err);
            return reject(err);
          }
          if (!result) {
            console.log("\x1B[31m%s\x1B[0m", myname3, "updateMetaProduction", "MetaProduction.findOneAndUpdate", "error", "document not found");
            return reject({
              oper: "updateMetaProduction",
              ok: false,
              message: "meta production document not found: " + id
            });
          }
          return resolve2({
            oper: "updateMetaProduction",
            ok: true,
            message: "meta production updated"
          });
        }
      );
    }
  );
}
async function deleteMetaProduction(id, owner, name2) {
  const MetaProduction = GetMetaProductionModel();
  return new Promise(
    (resolve2, reject) => {
      var query;
      if (id && id.length > 0) {
        query = {
          _id: id
        };
      } else {
        query = {
          owner,
          name: name2
        };
      }
      MetaProduction.deleteOne(
        query,
        (err) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname3, "deleteMetaProduction", "MetaProduction.deleteOne", "error", err);
            return reject(err);
          }
          resolve2({
            oper: "deleteMetaProduction",
            ok: true,
            message: "meta production"
          });
        }
      );
    }
  );
}
async function mergeMetaProductionFiles(owner, name2, tobeMergedPackiFiles, options) {
  return new Promise(
    (resolve2, reject) => getMetaProductionObject(owner, name2, false).then(
      (itemObject) => {
        const newPackiFiles = mergePackiFiles(itemObject.packiFiles, tobeMergedPackiFiles, options);
        updateMetaProduction(itemObject._id, itemObject.owner, itemObject.name, itemObject.description, JSON.stringify(newPackiFiles)).then(
          (result) => resolve2(result)
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.metaProduction.mergeMetaProductionFiles.updateMetaProduction.error", err);
            return reject(err);
          }
        );
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.metaProduction.mergeMetaProductionFiles.getMetaProductionObject.error", err);
        return reject(err);
      }
    )
  );
}
async function getMetaProduction_withCache(owner, name2) {
  var cacheKey = owner + "|" + name2;
  return new Promise(
    (resolve2, reject) => {
      let mpValue = {
        packiFiles: {}
      };
      getMetaProduction(owner, name2).then(
        (result) => {
          if (!result.ok) {
            return reject(result);
          }
          const tf = result.item;
          const tf_packiFiles_object = JSON.parse(tf.packiFiles);
          mpValue = {
            packiFiles: tf_packiFiles_object
          };
          return resolve2(mpValue);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "getMetaProduction_withCache.getMetaProduction.error", err);
          return reject(err);
        }
      );
    }
  );
}
function invalidateCache(owner, name2) {
  var cacheKey = owner + "|" + name2;
  metaProductionCache.del(cacheKey);
}
async function getTemplatePackiFiles(metaId, metaCtx, queryString, rootContext, options) {
  function getPackiFiles(wizziSchema, mainIttf) {
    const ret = {};
    if (wizziSchema && mainIttf) {
      ret[mainIttf] = {
        type: "CODE",
        contents: wizziSchema
      };
    }
    return ret;
  }
  return new Promise(
    (resolve2, reject) => {
      if (!metaId || metaId.length < 1) {
        return resolve2(getPackiFiles(options.wizziSchema, options.mainIttf));
      }
      production_exports.prepareProductionById("meta", metaId, queryString, rootContext).then(
        (metaProductionSet) => {
          const context = Object.assign({}, metaProductionSet.context, {
            metaCtx
          });
          productions_exports.generateFolderArtifacts("template", "output", metaProductionSet.packiFiles, context).then(
            (packiFiles) => resolve2(packiFiles)
          ).catch(
            (err) => {
              if (typeof err === "object" && err !== null) {
              }
              console.log("\x1B[31m%s\x1B[0m", "getTemplatePackiFiles.generateFolderArtifacts.error", err);
              return reject(err);
            }
          );
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "getTemplatePackiFiles.prepareProduction.error", err);
          return reject(err);
        }
      );
    }
  );
}
async function generateMetaProduction(owner, name2, metaCtx) {
  return getMetaProduction(owner, name2).then(
    (metaProduction) => {
      return generateMetaProductionById(metaProduction.item.id, metaCtx);
    }
  );
}
async function generateMetaProductionById(metaId, metaCtx) {
  return new Promise(
    (resolve2, reject) => production_exports.prepareProductionById("meta", metaId, "", {}).then(
      (metaProductionSet) => {
        console.log("generateMetaProductionById.metaProductionSet", "packiFiles", Object.keys(metaProductionSet.packiFiles), "context", Object.keys(metaProductionSet.context), __filename);
        const metaContext = Object.assign({}, metaProductionSet.context, {
          metaCtx
        });
        productions_exports.metaGenerate(metaProductionSet.packiFiles, metaContext).then(
          (packiFiles) => resolve2(packiFiles)
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "generateMetaProductionById.metaGenerate.error", err);
            return reject(err);
          }
        );
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "generateMetaProductionById.prepareProductionById.error", err);
        return reject(err);
      }
    )
  );
}
async function getInMemoryMetaPlugins(inMemoryMetas) {
  console.log("getInMemoryMetaPlugins.inMemoryMetas", JSON.stringify(inMemoryMetas), __filename);
  return new Promise(
    (resolve2, reject) => {
      const result = [];
      function doBuildInMemoryPlugin(ndx) {
        const inMemoryRef = inMemoryMetas[ndx];
        if (!inMemoryRef) {
          return resolve2(result);
        }
        getMetaProduction(inMemoryRef.owner, inMemoryRef.name).then(
          (metaResult) => {
            let inMemoryPlugin = packiApi.extractPackiFileContent(metaResult.item.packiFiles, ".db/meta.provides.json", {
              json: true
            });
            inMemoryPlugin = inMemoryPlugin.json;
            inMemoryPlugin.metaPackiFiles = packiApi.packiFilesToObject(metaResult.item.packiFiles);
            result.push(inMemoryPlugin);
            doBuildInMemoryPlugin(ndx + 1);
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "wizziMeta.executeMetaProductionWithInMemoryPlugins.getMetaProduction.error", err);
            return reject(err);
          }
        );
      }
      doBuildInMemoryPlugin(0);
    }
  );
}

// src/features/wizziHubProductions/api/artifact.ts
var artifact_exports = {};
__export(artifact_exports, {
  createArtifactProduction: () => createArtifactProduction,
  deleteArtifactProduction: () => deleteArtifactProduction,
  getArtifactContext: () => getArtifactContext,
  getArtifactContextItem: () => getArtifactContextItem,
  getArtifactGeneration: () => getArtifactGeneration,
  getArtifactGeneration_withPrepare: () => getArtifactGeneration_withPrepare,
  getArtifactMTree: () => getArtifactMTree,
  getArtifactMTreeBuildUpScript: () => getArtifactMTreeBuildUpScript,
  getArtifactMTreeBuildUpScript_withPrepare: () => getArtifactMTreeBuildUpScript_withPrepare,
  getArtifactMTree_withPrepare: () => getArtifactMTree_withPrepare,
  getArtifactProduction: () => getArtifactProduction,
  getArtifactProductionById: () => getArtifactProductionById,
  getArtifactProductionList: () => getArtifactProductionList,
  getArtifactProductionObject: () => getArtifactProductionObject,
  getArtifactProductionObjectById: () => getArtifactProductionObjectById,
  getArtifactProduction_withCache: () => getArtifactProduction_withCache,
  getArtifactTransformation: () => getArtifactTransformation,
  getArtifactTransformation_withPrepare: () => getArtifactTransformation_withPrepare,
  getContextFromWizziJson: () => getContextFromWizziJson,
  getDefaultContext_withCache: () => getDefaultContext_withCache,
  getFragmentsFromWizziJson: () => getFragmentsFromWizziJson,
  invalidateCache: () => invalidateCache2,
  mergeArtifactProductionFiles: () => mergeArtifactProductionFiles,
  prepareGenerationFromWizziJson: () => prepareGenerationFromWizziJson,
  updateArtifactProduction: () => updateArtifactProduction,
  validateArtifactProduction: () => validateArtifactProduction
});
var import_node_cache2 = __toESM(require("node-cache"));
var myname4 = "features.wizziHubProductions.api.ArtifactProduction";
var artifactProductionCache = new import_node_cache2.default({
  stdTTL: 120,
  checkperiod: 60
});
async function validateArtifactProduction(owner, name2) {
  const ArtifactProduction = GetArtifactProductionModel();
  return new Promise(
    (resolve2, reject) => {
      let query = { owner, name: name2 };
      ArtifactProduction.find(
        query,
        (err, result) => {
          if (err) {
            return reject(err);
          }
          if (result.length == 1) {
            return resolve2({
              isValid: false,
              message: "artifact production already exists"
            });
          }
          resolve2({
            isValid: true
          });
        }
      );
    }
  );
}
async function getArtifactProductionList(options) {
  options = options || {};
  const ArtifactProduction = GetArtifactProductionModel();
  return new Promise(
    (resolve2, reject) => {
      const query = ArtifactProduction.find(options.query);
      if (options.limit) {
        query.limit(options.limit);
      }
      if (options.sort) {
        query.sort(options.sort);
      }
      query.find(
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname4, "getArtifactProductionList", "ArtifactProduction.find", "error", err);
            return reject(err);
          }
          const resultItem = [];
          var i, i_items = result, i_len = result.length, item;
          for (i = 0; i < i_len; i++) {
            item = result[i];
            const item_obj = {
              _id: item._id,
              id: item.id,
              owner: item.owner,
              name: item.name,
              description: item.description,
              mainIttf: item.mainIttf,
              wizziSchema: item.wizziSchema,
              packiFiles: item.packiFiles
            };
            resultItem.push(item_obj);
          }
          resolve2({
            oper: "getArtifactProductionList",
            ok: true,
            item: resultItem
          });
        }
      );
    }
  );
}
async function getArtifactProduction(owner, name2) {
  const ArtifactProduction = GetArtifactProductionModel();
  return new Promise(
    (resolve2, reject) => {
      let query = {
        owner,
        name: name2
      };
      ArtifactProduction.find(
        query,
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname4, "getArtifactProduction", "ArtifactProduction.find", "error", err);
            return reject(err);
          }
          if (result.length == 1) {
            return resolve2({
              oper: "get",
              ok: true,
              item: result[0]
            });
          }
          resolve2({
            oper: "get",
            ok: false,
            message: "artifact production not found"
          });
        }
      );
    }
  );
}
async function getArtifactProductionById(id) {
  const ArtifactProduction = GetArtifactProductionModel();
  return new Promise(
    (resolve2, reject) => {
      ArtifactProduction.find(
        {
          _id: id
        },
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname4, "getArtifactProduction", "ArtifactProduction.find", "error", err);
            return reject(err);
          }
          if (result.length == 1) {
            return resolve2({
              oper: "get",
              ok: true,
              item: result[0]
            });
          }
          resolve2({
            oper: "getArtifactProduction",
            ok: false,
            message: "artifact production not found"
          });
        }
      );
    }
  );
}
async function getArtifactProductionObject(owner, name2, loadPackiConfig) {
  return new Promise(
    (resolve2, reject) => getArtifactProduction(owner, name2).then(
      (result) => {
        if (!result.ok) {
          return reject(result);
        }
        const ap = result.item;
        return resolve2(_createArtifactProductionObject(ap, loadPackiConfig));
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.artifactProduction.getArtifactProductionObject.getArtifactProduction.error", err);
        return reject(err);
      }
    )
  );
}
async function getArtifactProductionObjectById(id, loadPackiConfig) {
  return new Promise(
    (resolve2, reject) => getArtifactProductionById(id).then(
      (result) => {
        if (!result.ok) {
          return reject(result);
        }
        const ap = result.item;
        return resolve2(_createArtifactProductionObject(ap, loadPackiConfig));
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.artifactProduction.getArtifactProductionObjectById.getArtifactProductionById.error", err);
        return reject(err);
      }
    )
  );
}
async function _createArtifactProductionObject(ap, loadPackiConfig) {
  return new Promise(
    (resolve2, reject) => {
      const ap_packiFiles_object = JSON.parse(ap.packiFiles);
      const obj = {
        ...ap._doc,
        packiFiles: ap_packiFiles_object,
        _id: ap._id.toString(),
        packiProduction: "ArtifactProduction",
        configPackiFile: ap_packiFiles_object[constants_default.packiConfigPath],
        packiConfigJsonObj: null
      };
      if (loadPackiConfig) {
        if (!obj.configPackiFile) {
          return reject({
            message: "Missing file " + constants_default.packiConfigPath + " in ArtifactProduction"
          });
        }
        productions_exports.generateArtifact(constants_default.packiConfigPath, {
          [constants_default.packiConfigPath]: {
            type: obj.configPackiFile.type,
            contents: obj.configPackiFile.contents
          }
        }, {}).then(
          (generationResult) => {
            obj.packiConfigJsonObj = JSON.parse(generationResult.artifactContent);
            return resolve2(obj);
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.artifactProduction.getArtifactProductionObject._createArtifactProductionObject.error", err);
            return reject(err);
          }
        );
      } else {
        return resolve2(obj);
      }
    }
  );
}
async function createArtifactProduction(owner, name2, description, mainIttf, wizziSchema, packiFiles) {
  const ArtifactProduction = GetArtifactProductionModel();
  return new Promise(
    (resolve2, reject) => {
      let query = {
        owner,
        name: name2
      };
      ArtifactProduction.find(
        query,
        // loog myname, 'getArtifactProduction', 'ArtifactProduction.find', 'result', result
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname4, "getArtifactProduction", "ArtifactProduction.find", "error", err);
            return reject(err);
          }
          if (result.length > 0) {
            return resolve2({
              oper: "create",
              ok: false,
              message: "artifact production already exists"
            });
          }
          const newArtifactProduction = new ArtifactProduction({
            owner,
            name: name2,
            description,
            mainIttf,
            wizziSchema,
            packiFiles,
            created_at: /* @__PURE__ */ new Date(),
            updated_at: /* @__PURE__ */ new Date()
          });
          newArtifactProduction.save(function(err2, doc) {
            if (err2) {
              console.log("\x1B[31m%s\x1B[0m", myname4, "createArtifactProduction", "newArtifactProduction.save", "error", err2);
              return reject(err2);
            }
            return resolve2({
              oper: "createArtifactProduction",
              ok: true,
              item: doc._doc,
              message: "artifact production created"
            });
          });
        }
      );
    }
  );
}
async function updateArtifactProduction(id, owner, name2, description, mainIttf, wizziSchema, packiFiles) {
  const ArtifactProduction = GetArtifactProductionModel();
  return new Promise(
    (resolve2, reject) => {
      var query;
      if (id && id.length > 0) {
        query = {
          _id: id
        };
      } else {
        query = {
          owner,
          name: name2
        };
      }
      const update = {};
      if (typeof owner !== "undefined") {
        update["owner"] = owner;
      }
      if (typeof name2 !== "undefined") {
        update["name"] = name2;
      }
      if (typeof description !== "undefined") {
        update["description"] = description;
      }
      if (typeof mainIttf !== "undefined") {
        update["mainIttf"] = mainIttf;
      }
      if (typeof wizziSchema !== "undefined") {
        update["wizziSchema"] = wizziSchema;
      }
      if (typeof packiFiles !== "undefined") {
        update["packiFiles"] = packiFiles;
      }
      update["updated_at"] = /* @__PURE__ */ new Date();
      ArtifactProduction.findOneAndUpdate(
        query,
        update,
        {},
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname4, "updateArtifactProduction", "ArtifactProduction.findOneAndUpdate", "error", err);
            return reject(err);
          }
          if (!result) {
            console.log("\x1B[31m%s\x1B[0m", myname4, "updateArtifactProduction", "ArtifactProduction.findOneAndUpdate", "error", "document not found");
            return reject({
              oper: "updateArtifactProduction",
              ok: false,
              message: "artifact production document not found: " + id
            });
          }
          return resolve2({
            oper: "updateArtifactProduction",
            ok: true,
            message: "artifact production updated"
          });
        }
      );
    }
  );
}
async function deleteArtifactProduction(id, owner, name2) {
  const ArtifactProduction = GetArtifactProductionModel();
  return new Promise(
    (resolve2, reject) => {
      var query;
      if (id && id.length > 0) {
        query = {
          _id: id
        };
      } else {
        query = {
          owner,
          name: name2
        };
      }
      ArtifactProduction.deleteOne(
        query,
        (err) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname4, "deleteArtifactProduction", "ArtifactProduction.deleteOne", "error", err);
            return reject(err);
          }
          resolve2({
            oper: "deleteArtifactProduction",
            ok: true,
            message: "artifact production"
          });
        }
      );
    }
  );
}
async function mergeArtifactProductionFiles(owner, name2, tobeMergedPackiFiles, options) {
  return new Promise(
    (resolve2, reject) => getArtifactProductionObject(owner, name2, false).then(
      (itemObject) => {
        const newPackiFiles = mergePackiFiles(itemObject.packiFiles, tobeMergedPackiFiles, options);
        updateArtifactProduction(itemObject._id, itemObject.owner, itemObject.name, itemObject.description, itemObject.mainIttf, itemObject.wizziSchema, JSON.stringify(newPackiFiles)).then(
          (result) => resolve2(result)
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.artifactProduction.mergeArtifactProductionFiles.updateArtifactProduction.error", err);
            return reject(err);
          }
        );
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.artifactProduction.mergeArtifactProductionFiles.getArtifactProductionObject.error", err);
        return reject(err);
      }
    )
  );
}
async function getArtifactProduction_withCache(owner, name2) {
  var cacheKey = owner + "|" + name2;
  return new Promise(
    (resolve2, reject) => {
      let apValue = {
        mainIttf: "",
        packiFiles: {}
      };
      getArtifactProduction(owner, name2).then(
        (result) => {
          if (!result.ok) {
            return reject(result);
          }
          const ap = result.item;
          const ap_packiFiles_object = JSON.parse(ap.packiFiles);
          if (ap.wizziSchema && ap.wizziSchema.length > 0) {
            tfolder_exports.getTFolderProduction(owner, ap.wizziSchema).then(
              (result2) => {
                if (!result2.ok) {
                  apValue = {
                    mainIttf: ap.mainIttf,
                    packiFiles: ap_packiFiles_object
                  };
                  return resolve2(apValue);
                }
                const tf = result2.item;
                const tf_packiFiles_object = JSON.parse(tf.packiFiles);
                apValue = {
                  mainIttf: ap.mainIttf,
                  packiFiles: mergePackiFiles(ap_packiFiles_object, tf_packiFiles_object)
                };
                return resolve2(apValue);
              }
            ).catch(
              (err) => {
                if (typeof err === "object" && err !== null) {
                }
                console.log("\x1B[31m%s\x1B[0m", "getArtifactProduction_withCache.getTFolderProduction.error", err);
                return reject(err);
              }
            );
          } else {
            apValue = {
              mainIttf: ap.mainIttf,
              packiFiles: ap_packiFiles_object
            };
            return resolve2(apValue);
          }
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "getArtifactProduction_withCache.getArtifactProduction.error", err);
          return reject(err);
        }
      );
    }
  );
}
function invalidateCache2(owner, name2) {
  var cacheKey = owner + "|" + name2;
  artifactProductionCache.del(cacheKey);
}
async function getDefaultContext_withCache(owner, progressiveContext) {
  progressiveContext = progressiveContext || {};
  return new Promise(
    (resolve2, reject) => getArtifactContextItem(owner, "wzCtx;wzctx", {}).then(
      (resultItemContext) => {
        const defaultContext = Object.assign({}, progressiveContext, resultItemContext);
        resolve2(defaultContext);
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "getDefaultContext_withCache.getArtifactContextItem.error", err);
        return reject(err);
      }
    )
  );
}
async function getArtifactContext(owner, requestQueryContextParamString, progressiveContext) {
  progressiveContext = progressiveContext || {};
  return new Promise(
    (resolve2, reject) => {
      if (requestQueryContextParamString && requestQueryContextParamString.length > 0) {
        const contextItems = requestQueryContextParamString.split("|");
        var j = 0;
        let resultContext = progressiveContext;
        (function next() {
          var contextItem = contextItems[j++];
          if (!contextItem) {
            return resolve2(resultContext);
          }
          getArtifactContextItem(owner, contextItem, progressiveContext).then(
            (resultItemContext) => {
              resultContext = Object.assign({}, resultContext, resultItemContext);
              next();
            }
          ).catch(
            (err) => {
              if (typeof err === "object" && err !== null) {
              }
              console.log("\x1B[31m%s\x1B[0m", "getArtifactContext.getArtifactContextItem.error", err);
              return reject(err);
            }
          );
        })();
      } else {
        resolve2(progressiveContext);
      }
    }
  );
}
async function getArtifactContextItem(owner, requestQueryContextParamString, progressiveContext) {
  progressiveContext = progressiveContext || {};
  return new Promise(
    (resolve2, reject) => {
      if (requestQueryContextParamString && requestQueryContextParamString.length > 0) {
        const parts = requestQueryContextParamString.split(";");
        const contextName = parts[0];
        const contextArtifactName = parts[1];
        const contextTransformation = parts.length > 2 ? parts[2] : null;
        if (contextName && contextArtifactName) {
          if (contextTransformation) {
            getArtifactTransformation(owner, contextArtifactName, progressiveContext, contextTransformation).then(
              (result) => resolve2(Object.assign({}, progressiveContext, {
                [contextName]: result.transformResult
              }))
            ).catch(
              (err) => {
                if (typeof err === "object" && err !== null) {
                }
                console.log("\x1B[31m%s\x1B[0m", "getArtifactContextItem.getArtifactTransformation.error", err);
                return reject(err);
              }
            );
          } else {
            getArtifactGeneration(owner, contextArtifactName, progressiveContext).then(
              (result) => {
                const contextObject = JSON.parse(result.content);
                resolve2(Object.assign({}, progressiveContext, {
                  [contextName]: contextObject
                }));
              }
            ).catch(
              (err) => {
                if (typeof err === "object" && err !== null) {
                }
                console.log("\x1B[31m%s\x1B[0m", "getArtifactContextItem.getArtifactGeneration.error", err);
                return reject(err);
              }
            );
          }
        } else {
          resolve2(progressiveContext);
        }
      } else {
        resolve2(progressiveContext);
      }
    }
  );
}
async function getArtifactTransformation(owner, name2, context, transformerName) {
  return new Promise(
    (resolve2, reject) => getArtifactProduction(owner, name2).then(
      (ap) => productions_exports.loadAndTransformModel(ap.mainIttf, ap.packiFiles, context, {
        transformer: transformerName
      }).then(
        (result) => {
          return resolve2(result);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
            err.parameter = {
              artifactOwner: owner,
              artifactName: name2,
              mainIttf: ap.mainIttf,
              transformerName
            };
          }
          console.log("\x1B[31m%s\x1B[0m", "getArtifactTransformation.transformModel.error", err);
          return reject(err);
        }
      )
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
          err.parameter = {
            artifactOwner: owner,
            artifactName: name2
          };
        }
        console.log("\x1B[31m%s\x1B[0m", "getArtifactTransformation.getArtifactProduction.error", err);
        return reject(err);
      }
    )
  );
}
async function getArtifactTransformation_withPrepare(owner, productionName, requestQueryContextParam, rootContext, transformerName) {
  return new Promise(
    (resolve2, reject) => production_exports.prepareProduction("artifact", owner, productionName, requestQueryContextParam, rootContext).then(
      (productionObj) => productions_exports.loadAndTransformModel(productionObj.mainIttf, productionObj.packiFiles, productionObj.context, {
        transformer: transformerName
      }).then(
        (result) => {
          return resolve2(result);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
            err.parameter = {
              artifactOwner: owner,
              artifactName: productionName,
              mainIttf: productionObj.mainIttf,
              transformerName
            };
          }
          console.log("\x1B[31m%s\x1B[0m", "getArtifactTransformation_withPrepare.transformModel.error", err);
          return reject(err);
        }
      )
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
          err.parameter = {
            artifactOwner: owner,
            artifactName: productionName
          };
        }
        console.log("\x1B[31m%s\x1B[0m", "getArtifactTransformation_withPrepare.getArtifactProduction.error", err);
        return reject(err);
      }
    )
  );
}
async function getArtifactGeneration(owner, name2, context) {
  return new Promise(
    (resolve2, reject) => {
      var artifactName = name2;
      var filePathTobeGenerated;
      const ss = name2.split("!");
      if (ss.length == 2 && ss[0] && ss[1]) {
        artifactName = ss[0];
        filePathTobeGenerated = ss[1];
      }
      console.log("wizziHubProductions.api.artifact.getArtifactGeneration", "artifactName", artifactName, "filePathTobeGenerated", filePathTobeGenerated, __filename);
      getArtifactProduction_withCache(owner, artifactName).then(
        (ap) => productions_exports.generateArtifact(filePathTobeGenerated || ap.mainIttf, ap.packiFiles, context).then(
          (result) => {
            const response = {
              content: result.artifactContent,
              contentLength: result.artifactContent.length,
              contentType: result.contentType
            };
            return resolve2(response);
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
              err.parameter = {
                artifactOwner: owner,
                requestArtifactName: name2,
                artifactName,
                mainIttf: filePathTobeGenerated || ap.mainIttf
              };
            }
            console.log("\x1B[31m%s\x1B[0m", "getArtifactGeneration.generateArtifact.error", err);
            return reject(err);
          }
        )
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
            err.parameter = {
              artifactOwner: owner,
              requestArtifactName: name2,
              artifactName
            };
          }
          console.log("\x1B[31m%s\x1B[0m", "getArtifactGeneration.getArtifactProduction.error", err);
          return reject(err);
        }
      );
    }
  );
}
async function getArtifactGeneration_withPrepare(owner, productionName, filePath, requestQueryContextParam, rootContext) {
  return new Promise(
    (resolve2, reject) => production_exports.prepareProduction("artifact", owner, productionName, requestQueryContextParam, rootContext).then(
      (productionObj) => productions_exports.generateArtifact(filePath || productionObj.mainIttf, productionObj.packiFiles, productionObj.context).then(
        (result) => {
          const response = {
            content: result.artifactContent,
            contentLength: result.artifactContent.length,
            contentType: result.contentType
          };
          return resolve2(response);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
            err.parameter = {
              artifactOwner: owner,
              artifactName: productionName,
              mainIttf: filePath || productionObj.mainIttf
            };
          }
          console.log("\x1B[31m%s\x1B[0m", "getArtifactGeneration_withPrepare.generateArtifact.error", err);
          return reject(err);
        }
      )
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
          err.parameter = {
            artifactOwner: owner,
            artifactName: productionName
          };
        }
        console.log("\x1B[31m%s\x1B[0m", "getArtifactGeneration_withPrepare.prepareProduction.error", err);
        return reject(err);
      }
    )
  );
}
async function getArtifactMTree(owner, productionName, rootContext) {
  return new Promise(
    (resolve2, reject) => getArtifactProduction_withCache(owner, productionName).then(
      (ap) => productions_exports.mTree(ap.mainIttf, ap.packiFiles, rootContext).then(
        (result) => {
          const response = {
            content: result.mTreeIttf,
            contentLength: result.mTreeIttf.length,
            contentType: "text/plain"
          };
          return resolve2(response);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
            err.parameter = {
              artifactOwner: owner,
              artifactName: productionName
            };
          }
          console.log("\x1B[31m%s\x1B[0m", "getArtifactMTree.mTree.error", err);
          return reject(err);
        }
      )
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
          err.parameter = {
            artifactOwner: owner,
            artifactName: productionName
          };
        }
        console.log("\x1B[31m%s\x1B[0m", "getArtifactMTree.getArtifactProduction.error", err);
        return reject(err);
      }
    )
  );
}
async function getArtifactMTree_withPrepare(owner, productionName, filePath, requestQueryContextParam, rootContext) {
  return new Promise(
    (resolve2, reject) => production_exports.prepareProduction("artifact", owner, productionName, requestQueryContextParam, rootContext).then(
      (productionObj) => productions_exports.mTree(filePath && filePath.length > 0 ? filePath : productionObj.mainIttf, productionObj.packiFiles, productionObj.context).then(
        (result) => {
          const response = {
            content: result.mTreeIttf,
            contentLength: result.mTreeIttf.length,
            contentType: "text/plain"
          };
          return resolve2(response);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
            err.parameter = {
              artifactOwner: owner,
              artifactName: productionName
            };
          }
          console.log("\x1B[31m%s\x1B[0m", "getArtifactMTree.mTree.error", err);
          return reject(err);
        }
      )
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
          err.parameter = {
            artifactOwner: owner,
            artifactName: productionName
          };
        }
        console.log("\x1B[31m%s\x1B[0m", "getArtifactMTree.getArtifactProduction.error", err);
        return reject(err);
      }
    )
  );
}
async function getArtifactMTreeBuildUpScript(owner, productionName, filePath, rootContext) {
  return new Promise(
    (resolve2, reject) => getArtifactProduction_withCache(owner, productionName).then(
      (ap) => productions_exports.mTreeBuildUpScript(filePath && filePath.length > 0 ? filePath : ap.mainIttf, ap.packiFiles, rootContext).then(
        (result) => {
          const response = {
            content: result.mTreeBuildUpScript,
            contentLength: result.mTreeBuildUpScript.length,
            contentType: "text/plain"
          };
          return resolve2(response);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
            err.parameter = {
              artifactOwner: owner,
              artifactName: productionName
            };
          }
          console.log("\x1B[31m%s\x1B[0m", "getArtifactMTreeBuildUpScript.mTree.error", err);
          return reject(err);
        }
      )
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
          err.parameter = {
            artifactOwner: owner,
            artifactName: productionName
          };
        }
        console.log("\x1B[31m%s\x1B[0m", "getArtifactMTreeBuildUpScript.getArtifactProduction.error", err);
        return reject(err);
      }
    )
  );
}
async function getArtifactMTreeBuildUpScript_withPrepare(owner, productionName, filePath, requestQueryContextParam, rootContext) {
  return new Promise(
    (resolve2, reject) => production_exports.prepareProduction("artifact", owner, productionName, requestQueryContextParam, rootContext).then(
      (productionObj) => productions_exports.mTreeBuildUpScript(filePath && filePath.length > 0 ? filePath : productionObj.mainIttf, productionObj.packiFiles, productionObj.context).then(
        (result) => {
          const response = {
            content: result.mTreeBuildUpScript,
            contentLength: result.mTreeBuildUpScript.length,
            contentType: "text/plain"
          };
          return resolve2(response);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
            err.parameter = {
              artifactOwner: owner,
              artifactName: productionName
            };
          }
          console.log("\x1B[31m%s\x1B[0m", "getArtifactMTreeBuildUpScript.mTree.error", err);
          return reject(err);
        }
      )
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
          err.parameter = {
            artifactOwner: owner,
            artifactName: productionName
          };
        }
        console.log("\x1B[31m%s\x1B[0m", "getArtifactMTreeBuildUpScript.getArtifactProduction.error", err);
        return reject(err);
      }
    )
  );
}
async function prepareGenerationFromWizziJson(req_files) {
  return new Promise(
    (resolve2, reject) => {
      let retPackiFiles = req_files;
      const wizziJson = req_files["wizzi.json.ittf"];
      if (wizziJson) {
        productions_exports.generateArtifact("wizzi.json.ittf", {
          "wizzi.json.ittf": {
            type: wizziJson.type,
            contents: wizziJson.contents
          }
        }, {}).then(
          (result) => {
            const wizziJsonObj = JSON.parse(result.artifactContent);
            getFragmentsFromWizziJson(wizziJsonObj).then(
              (resultPackiFiles) => {
                retPackiFiles = mergePackiFiles(retPackiFiles, resultPackiFiles);
                getContextFromWizziJson(wizziJsonObj).then(
                  (resultContext) => {
                    return resolve2({
                      packiFiles: retPackiFiles,
                      context: resultContext
                    });
                  }
                );
              }
            ).catch(
              (err) => {
                if (typeof err === "object" && err !== null) {
                }
                console.log("\x1B[31m%s\x1B[0m", "getArtifactGeneration.getFragmentsFromWizziJson.error", err);
                return reject(err);
              }
            );
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "getArtifactGeneration.generateArtifact.error", err);
            return reject(err);
          }
        );
      } else {
        resolve2({
          packiFiles: req_files,
          context: {}
        });
      }
    }
  );
}
async function getFragmentsFromWizziJson(wizziJsonObj) {
  return new Promise(
    (resolve2, reject) => {
      let retPackiFiles = {};
      if (!!(wizziJsonObj && wizziJsonObj.fragments && wizziJsonObj.fragments.length > 0) == false) {
        return resolve2(retPackiFiles);
      }
      var j = 0;
      (function next() {
        var tfolder = wizziJsonObj.fragments[j++];
        if (!tfolder) {
          return resolve2(retPackiFiles);
        }
        const parts = tfolder.path.split("/");
        tfolder_exports.getTFolderProduction(parts[0], parts.slice(1).join("/")).then(
          (result) => {
            const tf = result.item;
            const tf_packiFiles_object = JSON.parse(tf.packiFiles);
            retPackiFiles = mergePackiFiles(retPackiFiles, tf_packiFiles_object);
            next();
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "getFragmentsFromWizziJson.getTFolderProduction.error", err);
            return reject(err);
          }
        );
      })();
    }
  );
}
async function getContextFromWizziJson(wizziJsonObj) {
  return new Promise(
    (resolve2, reject) => {
      let retContext = {};
      if (!!(wizziJsonObj && wizziJsonObj.fragments && wizziJsonObj.fragments.length > 0) == false) {
        return resolve2(retContext);
      }
      var j = 0;
      (function next() {
        var contextDef = wizziJsonObj.contexts[j++];
        if (!contextDef) {
          return resolve2(retContext);
        }
        const parts = contextDef.path.split("/");
        getArtifactContextItem(parts[0], contextDef.name + ";" + parts.slice(1).join("/")).then(
          (contextObject) => {
            retContext = Object.assign({}, retContext, contextObject);
            next();
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "getContextFromWizziJson.getArtifactContextItem.error", err);
            return reject(err);
          }
        );
      })();
    }
  );
}

// src/features/wizziHubProductions/controllers/artifact.tsx
function renderPageForm(req, res, data, queryParams) {
  const index = "<!DOCTYPE html>" + import_server3.default.renderToStaticMarkup(
    /* @__PURE__ */ import_react5.default.createElement(PageFormDocument, { data, queryParams })
  );
  res.set("Content-Type", "text/html");
  res.set("Content-Length", index.length.toString());
  res.send(index);
}
function getPackiConfigFile() {
  return {
    [".packi/config.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    { meta",
        '        $$ name "..name.."',
        '        { metaCtx"',
        '            kind "artifact" $$ file|artifact',
        '            $$ filePath ".packi/metaCtx.json.ittf" $$ when kind = "file"',
        "            { artifact",
        '                $$ name "..name.." $$ when kind = "artifact"',
        "            [ contexts",
        "                {",
        '                    $$ propertyName "..name.."',
        '                    $$ artifactName "..name.."',
        "    [ tfolders",
        "        {",
        '            $$ name "..name.."',
        "    [ contexts",
        "        {",
        '            $$ propertyName "..name.."',
        '            $$ artifactName "..name.."'
      ].join("\n")
    }
  };
}
function makeHandlerAwareOfAsyncErrors6(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var ArtifactProductionController = class {
  path = "/artifact";
  router = (0, import_express9.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering ArtifactProductionController.initialize");
    this.router.get("/new", makeHandlerAwareOfAsyncErrors6(this.getNewArtifactForm));
    this.router.post("/new", makeHandlerAwareOfAsyncErrors6(this.postArtifact));
    this.router.get("/update/:id", makeHandlerAwareOfAsyncErrors6(this.getUpdateArtifactForm));
    this.router.post("/update", makeHandlerAwareOfAsyncErrors6(this.putArtifact));
    this.router.get("/delete/:id", makeHandlerAwareOfAsyncErrors6(this.getDeleteArtifactForm));
    this.router.post("/delete", makeHandlerAwareOfAsyncErrors6(this.deleteArtifact));
  };
  getNewArtifactForm = async (request, response) => renderPageForm(request, response, {
    type: "success",
    formName: "CreateArtifactProduction",
    formData: {
      owner: request.session.user.username,
      name: request.query.name,
      mainIttf: request.query.mainIttf,
      schema: request.query.schema
    }
  }, {});
  postArtifact = async (request, response) => {
    const wizziSchema = request.body.ap_wizzi_schema || "html";
    const mainIttf = request.body.ap_main_ittf || "index." + wizziSchema + ".ittf";
    const contexts = request.body.ap_contexts || "[]";
    const tfolders = request.body.ap_tfolders || "[]";
    getTemplatePackiFiles(request.body.meta_id, request.body.meta_propsValues ? JSON.parse(request.body.meta_propsValues) : {}, request.query.context, request.body.context ? JSON.parse(request.body.context) : {}, {
      wizziSchema,
      mainIttf
    }).then(
      (packiFiles) => createArtifactProduction(request.session.user.username, request.body.ap_name, request.body.ap_description, mainIttf, wizziSchema, JSON.stringify(mergePackiFiles(packiFiles, getPackiConfigFile()))).then(
        (result) => {
          if (result.ok) {
            response.redirect("/~~/a/" + request.session.user.username + "/" + request.body.ap_name);
          } else {
            response.render("error.html.ittf", {
              message: "creating a new artifact production",
              error: result
            });
          }
        }
      ).catch(
        (err) => response.render("error.html.ittf", {
          message: "creating a new artifact production",
          error: err
        })
      )
    );
  };
  getUpdateArtifactForm = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getArtifactProductionObjectById(id).then(
      (result) => renderPageForm(request, response, {
        type: "success",
        formName: "UpdateArtifactProduction",
        formData: {
          _id: id,
          owner: result.owner,
          name: result.name,
          description: result.description,
          mainIttf: result.mainIttf,
          wizziSchema: result.wizziSchema
        }
      }, {})
    );
  };
  putArtifact = async (request, response) => {
    const obj = request.body;
    updateArtifactProduction(obj.ap_id, obj.ap_owner, obj.ap_name, obj.ap_description, obj.ap_mainIttf, obj.ap_wizziSchema).then(
      (result) => {
        if (result.ok) {
          response.redirect("/packi/productions/artifacts");
        } else {
          response.render("error.html.ittf", {
            message: "updating a artifact production",
            error: result
          });
        }
      }
    );
  };
  getDeleteArtifactForm = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getArtifactProductionObjectById(id).then(
      (result) => renderPageForm(request, response, {
        type: "success",
        formName: "DeleteArtifactProduction",
        formData: {
          _id: result._id,
          owner: result.owner,
          name: result.name,
          description: result.description,
          mainIttf: result.mainIttf,
          wizziSchema: result.wizziSchema
        }
      }, {})
    );
  };
  deleteArtifact = async (request, response) => {
    const obj = request.body;
    deleteArtifactProduction(obj.ap_id, obj.ap_owner, obj.ap_name).then(
      (result) => {
        if (result.ok) {
          response.redirect("/packi/productions/artifacts");
        } else {
          response.render("error.html.ittf", {
            message: "deleting a artifact production",
            error: result
          });
        }
      }
    );
  };
};

// src/features/wizziHubProductions/controllers/apiv1artifact.tsx
var import_express10 = require("express");
function makeHandlerAwareOfAsyncErrors7(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var ApiV1ArtifactProductionController = class {
  path = "/api/v1/production/artifact";
  router = (0, import_express10.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering ApiV1ArtifactProductionController.initialize");
    this.router.get("/:owner", makeHandlerAwareOfAsyncErrors7(this.getArtifacts));
    this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors7(this.getCheckArtifactName));
    this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors7(this.getArtifact));
    this.router.put("/:id", makeHandlerAwareOfAsyncErrors7(this.putArtifact));
    this.router.put("/packidiffs/:id", makeHandlerAwareOfAsyncErrors7(this.putArtifactPackiDiffs));
    this.router.post("/:owner/:name", makeHandlerAwareOfAsyncErrors7(this.postArtifact));
  };
  getArtifacts = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getArtifactProductionList({
      query: {
        owner
      }
    }).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "getArtifacts.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  getCheckArtifactName = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    validateArtifactProduction(owner, name2).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        sendFailure(response, {
          err
        }, 501);
      }
    );
  };
  getArtifact = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getArtifactProduction(owner, name2).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "getArtifact.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  postArtifact = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    var description = __check.notEmpty("body", "description");
    var mainIttf = __check.notEmpty("body", "mainIttf");
    var wizziSchema = __check.notEmpty("body", "wizziSchema");
    var packiFiles = __check.notUndefined("body", "packiFiles");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    createArtifactProduction(owner, name2, description, mainIttf, wizziSchema, JSON.stringify(packiFiles)).then(
      (result) => {
        invalidateCache2(owner, name2);
        sendSuccess(response, result);
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "postArtifact.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  putArtifact = async (request, response) => {
    console.log("putArtifact.request.params", request.params, __filename);
    console.log("putArtifact.request.body", Object.keys(request.body), __filename);
    var __check = restParamsCheck(request);
    var packiFiles = __check.notUndefined("body", "packiFiles");
    var options = __check.optional("body", "options");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    console.log("putArtifact.request.body.packiFiles", Object.keys(packiFiles), __filename);
    if (options && options.wizzify) {
      productions_exports.wizzify(packiFiles).then(
        (resultPackiFiles) => {
          console.log("putArtifact.wizzify.resultPackiFiles", Object.keys(resultPackiFiles), __filename);
          return exec_updateArtifactProduction(request, response, resultPackiFiles);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "putArtifact.wizzify.error", err);
          sendFailure(response, {
            err: err && err.message
          }, 501);
        }
      );
    } else if (options && options.merge) {
      var __check = restParamsCheck(request);
      var id = __check.notUndefined("params", "id");
      if (__check.hasErrors()) {
        return __check.sendErrors(response);
      }
      getArtifactProductionObjectById(id).then(
        (prevArtifact) => {
          const resultPackiFiles = mergePackiFiles(prevArtifact.packiFiles, packiFiles);
          console.log("putArtifact.merge.resultPackiFiles", Object.keys(resultPackiFiles), __filename);
          return exec_updateArtifactProduction(request, response, resultPackiFiles);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "putArtifact.merge.getArtifactProductionById.error", err);
          sendFailure(response, {
            err: err && err.message
          }, 501);
        }
      );
    } else {
      exec_updateArtifactProduction(request, response, packiFiles);
    }
  };
  putArtifactPackiDiffs = async (request, response) => {
    console.log("putArtifactPackiDiffs.request.params", request.params, __filename);
    console.log("putArtifactPackiDiffs.request.body.packiDiffs", Object.keys(request.body.packiDiffs), __filename);
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getArtifactProductionObjectById(id).then(
      (prevArtifact) => {
        console.log("putArtifactPackiDiffs.prevPackiFiles", Object.keys(prevArtifact.packiFiles), __filename);
        const pm = new PackiBuilder(prevArtifact.packiFiles);
        pm.applyPatch_ChangesOnly(request.body.packiDiffs);
        return exec_updateArtifactProduction(request, response, pm.packiFiles);
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "putArtifactPackiDiffs.getArtifactProductionObjectById.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
};
function exec_updateArtifactProduction(request, response, packiFiles) {
  var __check = restParamsCheck(request);
  var id = __check.optional("params", "id");
  var owner = __check.optional("body", "owner");
  var name2 = __check.optional("body", "name");
  var description = __check.optional("body", "description");
  var mainIttf = __check.optional("body", "mainIttf");
  var wizziSchema = __check.optional("body", "wizziSchema");
  if (__check.hasErrors()) {
    return __check.sendErrors(response);
  }
  updateArtifactProduction(id, owner, name2, description, mainIttf, wizziSchema, JSON.stringify(packiFiles)).then(
    (result) => {
      invalidateCache2(id);
      sendSuccess(response, result);
    }
  ).catch(
    (err) => {
      if (typeof err === "object" && err !== null) {
      }
      console.log("\x1B[31m%s\x1B[0m", "exec_updateArtifactProduction.updateArtifactProduction.error", err);
      sendFailure(response, {
        err: err && err.message
      }, 501);
    }
  );
}

// src/features/wizziHubProductions/controllers/package.tsx
var import_express11 = require("express");
var import_react6 = __toESM(require("react"));
var import_server4 = __toESM(require("react-dom/server"));

// src/features/wizziHubProductions/api/package.ts
var package_exports = {};
__export(package_exports, {
  createPackageProduction: () => createPackageProduction,
  deletePackageProduction: () => deletePackageProduction,
  getArtifactGeneration_withPrepare: () => getArtifactGeneration_withPrepare2,
  getPackageProduction: () => getPackageProduction,
  getPackageProductionById: () => getPackageProductionById,
  getPackageProductionList: () => getPackageProductionList,
  getPackageProductionObject: () => getPackageProductionObject,
  getPackageProductionObjectById: () => getPackageProductionObjectById,
  getPackageProduction_withCache: () => getPackageProduction_withCache,
  getWizziMetaFolder: () => getWizziMetaFolder,
  getWizziMetaFolderById: () => getWizziMetaFolderById,
  invalidateCache: () => invalidateCache3,
  mergePackageProductionFiles: () => mergePackageProductionFiles,
  updatePackageProduction: () => updatePackageProduction,
  validatePackageProduction: () => validatePackageProduction
});
var import_node_cache3 = __toESM(require("node-cache"));
var myname5 = "features.wizziHubProductions.api.PackageProduction";
var packageProductionCache = new import_node_cache3.default({
  stdTTL: 120,
  checkperiod: 60
});
async function validatePackageProduction(owner, name2) {
  const PackageProduction = GetPackageProductionModel();
  return new Promise(
    (resolve2, reject) => {
      let query = { owner, name: name2 };
      PackageProduction.find(
        query,
        (err, result) => {
          if (err) {
            return reject(err);
          }
          if (result.length == 1) {
            return resolve2({
              isValid: false,
              message: "package production already exists"
            });
          }
          resolve2({
            isValid: true
          });
        }
      );
    }
  );
}
async function getPackageProductionList(options) {
  options = options || {};
  const PackageProduction = GetPackageProductionModel();
  return new Promise(
    (resolve2, reject) => {
      const query = PackageProduction.find(options.query);
      if (options.limit) {
        query.limit(options.limit);
      }
      if (options.sort) {
        query.sort(options.sort);
      }
      query.find(
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname5, "getPackageProductionList", "PackageProduction.find", "error", err);
            return reject(err);
          }
          const resultItem = [];
          var i, i_items = result, i_len = result.length, item;
          for (i = 0; i < i_len; i++) {
            item = result[i];
            const item_obj = {
              _id: item._id,
              id: item.id,
              owner: item.owner,
              name: item.name,
              description: item.description,
              packiFiles: item.packiFiles
            };
            resultItem.push(item_obj);
          }
          resolve2({
            oper: "getPackageProductionList",
            ok: true,
            item: resultItem
          });
        }
      );
    }
  );
}
async function getPackageProduction(owner, name2) {
  const PackageProduction = GetPackageProductionModel();
  return new Promise(
    (resolve2, reject) => {
      let query = {
        owner,
        name: name2
      };
      PackageProduction.find(
        query,
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname5, "getPackageProduction", "PackageProduction.find", "error", err);
            return reject(err);
          }
          if (result.length == 1) {
            return resolve2({
              oper: "get",
              ok: true,
              item: result[0]
            });
          }
          resolve2({
            oper: "get",
            ok: false,
            message: "package production not found"
          });
        }
      );
    }
  );
}
async function getPackageProductionById(id) {
  const PackageProduction = GetPackageProductionModel();
  return new Promise(
    (resolve2, reject) => {
      PackageProduction.find(
        {
          _id: id
        },
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname5, "getPackageProduction", "PackageProduction.find", "error", err);
            return reject(err);
          }
          if (result.length == 1) {
            return resolve2({
              oper: "get",
              ok: true,
              item: result[0]
            });
          }
          resolve2({
            oper: "getPackageProduction",
            ok: false,
            message: "package production not found"
          });
        }
      );
    }
  );
}
async function getPackageProductionObject(owner, name2, loadPackiConfig) {
  return new Promise(
    (resolve2, reject) => getPackageProduction(owner, name2).then(
      (result) => {
        if (!result.ok) {
          return reject(result);
        }
        const pp = result.item;
        return resolve2(_createPackageProductionObject(pp, loadPackiConfig));
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.packageProduction.getPackageProductionObject.getPackageProduction.error", err);
        return reject(err);
      }
    )
  );
}
async function getPackageProductionObjectById(id, loadPackiConfig) {
  return new Promise(
    (resolve2, reject) => getPackageProductionById(id).then(
      (result) => {
        if (!result.ok) {
          return reject(result);
        }
        const pp = result.item;
        return resolve2(_createPackageProductionObject(pp, loadPackiConfig));
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.packageProduction.getPackageProductionObjectById.getPackageProductionById.error", err);
        return reject(err);
      }
    )
  );
}
async function _createPackageProductionObject(pp, loadPackiConfig) {
  return new Promise(
    (resolve2, reject) => {
      const pp_packiFiles_object = JSON.parse(pp.packiFiles);
      const obj = {
        ...pp._doc,
        packiFiles: pp_packiFiles_object,
        _id: pp._id.toString(),
        packiProduction: "PackageProduction",
        configPackiFile: pp_packiFiles_object[constants_default.packiConfigPath],
        packiConfigJsonObj: null
      };
      if (loadPackiConfig) {
        if (!obj.configPackiFile) {
          return reject({
            message: "Missing file " + constants_default.packiConfigPath + " in PackageProduction"
          });
        }
        productions_exports.generateArtifact(constants_default.packiConfigPath, {
          [constants_default.packiConfigPath]: {
            type: obj.configPackiFile.type,
            contents: obj.configPackiFile.contents
          }
        }, {}).then(
          (generationResult) => {
            obj.packiConfigJsonObj = JSON.parse(generationResult.artifactContent);
            return resolve2(obj);
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.packageProduction.getPackageProductionObject._createPackageProductionObject.error", err);
            return reject(err);
          }
        );
      } else {
        return resolve2(obj);
      }
    }
  );
}
async function createPackageProduction(owner, name2, description, packiFiles) {
  const PackageProduction = GetPackageProductionModel();
  return new Promise(
    (resolve2, reject) => {
      let query = {
        owner,
        name: name2
      };
      PackageProduction.find(
        query,
        // loog myname, 'getPackageProduction', 'PackageProduction.find', 'result', result
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname5, "getPackageProduction", "PackageProduction.find", "error", err);
            return reject(err);
          }
          if (result.length > 0) {
            return resolve2({
              oper: "create",
              ok: false,
              message: "package production already exists"
            });
          }
          const newPackageProduction = new PackageProduction({
            owner,
            name: name2,
            description,
            packiFiles,
            created_at: /* @__PURE__ */ new Date(),
            updated_at: /* @__PURE__ */ new Date()
          });
          newPackageProduction.save(function(err2, doc) {
            if (err2) {
              console.log("\x1B[31m%s\x1B[0m", myname5, "createPackageProduction", "newPackageProduction.save", "error", err2);
              return reject(err2);
            }
            return resolve2({
              oper: "createPackageProduction",
              ok: true,
              item: doc._doc,
              message: "package production created"
            });
          });
        }
      );
    }
  );
}
async function updatePackageProduction(id, owner, name2, description, packiFiles) {
  const PackageProduction = GetPackageProductionModel();
  return new Promise(
    (resolve2, reject) => {
      var query;
      if (id && id.length > 0) {
        query = {
          _id: id
        };
      } else {
        query = {
          owner,
          name: name2
        };
      }
      const update = {};
      if (typeof owner !== "undefined") {
        update["owner"] = owner;
      }
      if (typeof name2 !== "undefined") {
        update["name"] = name2;
      }
      if (typeof description !== "undefined") {
        update["description"] = description;
      }
      if (typeof packiFiles !== "undefined") {
        update["packiFiles"] = packiFiles;
      }
      update["updated_at"] = /* @__PURE__ */ new Date();
      PackageProduction.findOneAndUpdate(
        query,
        update,
        {},
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname5, "updatePackageProduction", "PackageProduction.findOneAndUpdate", "error", err);
            return reject(err);
          }
          if (!result) {
            console.log("\x1B[31m%s\x1B[0m", myname5, "updatePackageProduction", "PackageProduction.findOneAndUpdate", "error", "document not found");
            return reject({
              oper: "updatePackageProduction",
              ok: false,
              message: "package production document not found: " + id
            });
          }
          return resolve2({
            oper: "updatePackageProduction",
            ok: true,
            message: "package production updated"
          });
        }
      );
    }
  );
}
async function deletePackageProduction(id, owner, name2) {
  const PackageProduction = GetPackageProductionModel();
  return new Promise(
    (resolve2, reject) => {
      var query;
      if (id && id.length > 0) {
        query = {
          _id: id
        };
      } else {
        query = {
          owner,
          name: name2
        };
      }
      PackageProduction.deleteOne(
        query,
        (err) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname5, "deletePackageProduction", "PackageProduction.deleteOne", "error", err);
            return reject(err);
          }
          resolve2({
            oper: "deletePackageProduction",
            ok: true,
            message: "package production"
          });
        }
      );
    }
  );
}
async function mergePackageProductionFiles(owner, name2, tobeMergedPackiFiles, options) {
  return new Promise(
    (resolve2, reject) => getPackageProductionObject(owner, name2, false).then(
      (itemObject) => {
        const newPackiFiles = mergePackiFiles(itemObject.packiFiles, tobeMergedPackiFiles, options);
        updatePackageProduction(itemObject._id, itemObject.owner, itemObject.name, itemObject.description, JSON.stringify(newPackiFiles)).then(
          (result) => resolve2(result)
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.packageProduction.mergePackageProductionFiles.updatePackageProduction.error", err);
            return reject(err);
          }
        );
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.packageProduction.mergePackageProductionFiles.getPackageProductionObject.error", err);
        return reject(err);
      }
    )
  );
}
async function getPackageProduction_withCache(owner, name2) {
  var cacheKey = owner + "|" + name2;
  return new Promise(
    (resolve2, reject) => {
      let ppValue = {
        packiFiles: {}
      };
      getPackageProduction(owner, name2).then(
        (result) => {
          if (!result.ok) {
            return reject(result);
          }
          const tf = result.item;
          const tf_packiFiles_object = JSON.parse(tf.packiFiles);
          ppValue = {
            packiFiles: tf_packiFiles_object
          };
          return resolve2(ppValue);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "getPackageProduction_withCache.getPackageProduction.error", err);
          return reject(err);
        }
      );
    }
  );
}
function invalidateCache3(owner, name2) {
  var cacheKey = owner + "|" + name2;
  packageProductionCache.del(cacheKey);
}
async function getWizziMetaFolder(owner, name2, progressiveContext) {
  return getPackageProductionObject(owner, name2, true).then(
    (packageProductionObject) => {
      return getWizziMetaFolderByPackageProductionObject(packageProductionObject, progressiveContext);
    }
  );
}
async function getWizziMetaFolderById(packageId, progressiveContext) {
  return getPackageProductionObjectById(packageId, true).then(
    (packageProductionObject) => {
      return getWizziMetaFolderByPackageProductionObject(packageProductionObject, progressiveContext);
    }
  );
}
async function getWizziMetaFolderByPackageProductionObject(packageProductionObject, progressiveContext) {
  return new Promise(
    (resolve2, reject) => production_exports.getCliCtxFromPackiConfig(packageProductionObject.owner, packageProductionObject.packiConfigJsonObj, packageProductionObject.packiFiles, progressiveContext).then(
      (metaCtx) => meta_exports.generateMetaProduction(packageProductionObject.owner, packageProductionObject.packiConfigJsonObj.meta.name, metaCtx).then(
        (wizziPackiFiles) => {
          return resolve2(wizziPackiFiles);
        }
      )
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "api.production.getWizziMetaFolderByPackageProductionObject.getCliCtxFromPackiConfig.error", err);
        return reject(err);
      }
    )
  );
}
async function getArtifactGeneration_withPrepare2(owner, productionName, filePath, requestQueryContextParam, rootContext) {
  return new Promise(
    (resolve2, reject) => production_exports.prepareProduction("package", owner, productionName, requestQueryContextParam, rootContext).then(
      (productionObj) => productions_exports.generateArtifact(filePath, productionObj.packiFiles, productionObj.context).then(
        (result) => {
          const response = {
            content: result.artifactContent,
            contentLength: result.artifactContent.length,
            contentType: result.contentType
          };
          return resolve2(response);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "" + myname5 + "getArtifactGeneration_withPrepare.generateArtifact.error", err);
          return reject(err);
        }
      )
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "" + myname5 + "getArtifactGeneration_withPrepare.prepareProduction.error", err);
        return reject(err);
      }
    )
  );
}

// src/features/wizziHubProductions/controllers/package.tsx
function renderPageForm2(req, res, data, queryParams) {
  const index = "<!DOCTYPE html>" + import_server4.default.renderToStaticMarkup(
    /* @__PURE__ */ import_react6.default.createElement(PageFormDocument, { data, queryParams })
  );
  res.set("Content-Type", "text/html");
  res.set("Content-Length", index.length.toString());
  res.send(index);
}
function getPackiConfigFile2() {
  return {
    [".packi/config.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    { meta",
        '        $$ name "..name.."',
        '        { metaCtx"',
        '            kind "artifact" $$ file|artifact',
        '            $$ filePath ".packi/metaCtx.json.ittf" $$ when kind = "file"',
        "            { artifact",
        '                $$ name "..name.." $$ when kind = "artifact"',
        "            [ contexts",
        "                {",
        '                    $$ propertyName "..name.."',
        '                    $$ artifactName "..name.."',
        "    [ tfolders",
        "        {",
        '            $$ name "..name.."',
        "    [ contexts",
        "        {",
        '            $$ propertyName "..name.."',
        '            $$ artifactName "..name.."'
      ].join("\n")
    },
    [".packi/parameters/index.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    [ parameters",
        "        {",
        '            name "name"',
        '            type "string"',
        "        string$( kind )"
      ].join("\n")
    },
    [".packi/parameters/t/string.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "string"',
        "    $hook"
      ].join("\n")
    },
    [".packi/parameters/t/boolean.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "boolean"',
        "    $hook"
      ].join("\n")
    },
    [".packi/parameters/t/integer.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "integer"',
        "    $hook"
      ].join("\n")
    },
    [".packi/parameters/t/object.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "object"',
        "    [ parameters",
        "        $hook"
      ].join("\n")
    },
    [".packi/parameters/t/array.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "array"',
        "    { item",
        "        [ parameters",
        "            $hook"
      ].join("\n")
    }
  };
}
function makeHandlerAwareOfAsyncErrors8(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var PackageProductionController = class {
  path = "/package";
  router = (0, import_express11.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering PackageProductionController.initialize");
    this.router.get("/new", makeHandlerAwareOfAsyncErrors8(this.getNewPackageForm));
    this.router.post("/new", makeHandlerAwareOfAsyncErrors8(this.postPackage));
    this.router.get("/update/:id", makeHandlerAwareOfAsyncErrors8(this.getUpdatePackageForm));
    this.router.post("/update", makeHandlerAwareOfAsyncErrors8(this.putPackage));
    this.router.get("/delete/:id", makeHandlerAwareOfAsyncErrors8(this.getDeletePackageForm));
    this.router.post("/delete", makeHandlerAwareOfAsyncErrors8(this.deletePackage));
    this.router.get("/props/:owner/:name", makeHandlerAwareOfAsyncErrors8(this.getPackageProperties));
    this.router.get("/meta/:owner/:name", makeHandlerAwareOfAsyncErrors8(this.getWizziMetaFolderByName));
  };
  getNewPackageForm = async (request, response) => renderPageForm2(request, response, {
    type: "success",
    formName: "CreatePackageProduction",
    formData: {
      owner: request.session.user.username
    }
  }, {});
  postPackage = async (request, response) => {
    var __check = restParamsCheck(request);
    var meta_id = __check.notEmpty("body", "meta_id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getTemplatePackiFiles(meta_id, request.body.meta_propsValues ? JSON.parse(request.body.meta_propsValues) : {}, request.query.context, request.body.context ? JSON.parse(request.body.context) : {}, {
      wizziSchema: null,
      mainIttf: null
    }).then(
      (packiFiles) => createPackageProduction(request.session.user.username, request.body.pp_name, request.body.pp_description, JSON.stringify(mergePackiFiles(packiFiles, getPackiConfigFile2()))).then(
        (result) => {
          if (result.ok) {
            response.redirect("/~~/p/" + request.session.user.username + "/" + request.body.pp_name);
          } else {
            response.render("error.html.ittf", {
              message: "creating a new package production",
              error: result
            });
          }
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          response.render("error.html.ittf", {
            message: "creating a new package production",
            error: err
          });
        }
      )
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        response.render("error.html.ittf", {
          message: "getting template packi files while creating a new package production",
          error: err
        });
      }
    );
  };
  getUpdatePackageForm = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getPackageProductionObjectById(id).then(
      (result) => renderPageForm2(request, response, {
        type: "success",
        formName: "UpdatePackageProduction",
        formData: {
          _id: id,
          owner: result.owner,
          name: result.name,
          description: result.description
        }
      }, {})
    );
  };
  putPackage = async (request, response) => {
    const obj = request.body;
    updatePackageProduction(obj.pp_id, obj.pp_owner, obj.pp_name, obj.pp_description).then(
      (result) => {
        if (result.ok) {
          response.redirect("/productions/packages");
        } else {
          response.render("error.html.ittf", {
            message: "updating a package production",
            error: result
          });
        }
      }
    );
  };
  getDeletePackageForm = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getPackageProductionObjectById(id).then(
      (result) => renderPageForm2(request, response, {
        type: "success",
        formName: "DeletePackageProduction",
        formData: {
          _id: result._id,
          owner: result.owner,
          name: result.name,
          description: result.description
        }
      }, {})
    );
  };
  deletePackage = async (request, response) => {
    const obj = request.body;
    deletePackageProduction(obj.pp_id, obj.pp_owner, obj.pp_name).then(
      (result) => {
        if (result.ok) {
          response.redirect("/productions/packages");
        } else {
          response.render("error.html.ittf", {
            message: "deleting a package production",
            error: result
          });
        }
      }
    );
  };
  getPackageProperties = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("query", "owner");
    var name2 = __check.notEmpty("query", "name");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    renderPageForm2(request, response, {
      type: "success",
      formName: "PropertyEditor",
      formData: {
        owner,
        name: name2,
        schema: {
          properties: [
            {
              name: "name",
              type: "string"
            },
            {
              name: "age",
              type: "number"
            },
            {
              name: "jobs",
              type: "array",
              properties: [
                {
                  name: "title",
                  type: "string"
                },
                {
                  name: "year",
                  type: "number"
                }
              ]
            },
            {
              name: "react",
              type: "object",
              properties: [
                {
                  name: "useReact",
                  type: "boolean",
                  isCondition: true
                },
                {
                  name: "useRouter",
                  type: "boolean"
                },
                {
                  name: "useRedux",
                  type: "boolean"
                }
              ]
            }
          ]
        }
      }
    }, {});
  };
  getWizziMetaFolderByName = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getWizziMetaFolder(owner, name2, {}).then(
      (packiFiles) => sendSuccess(response, packiFiles)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        response.render("error.html.ittf", {
          message: "getting wizzi meta folder",
          error: err
        });
      }
    );
  };
};

// src/features/wizziHubProductions/controllers/apiv1package.tsx
var import_express12 = require("express");
function makeHandlerAwareOfAsyncErrors9(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var ApiV1PackageProductionController = class {
  path = "/api/v1/production/package";
  router = (0, import_express12.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering ApiV1PackageProductionController.initialize");
    this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors9(this.getCheckPackageName));
    this.router.get("/meta/:id", makeHandlerAwareOfAsyncErrors9(this.getWizziMetaFolder));
    this.router.get("/:owner", makeHandlerAwareOfAsyncErrors9(this.getPackages));
    this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors9(this.getPackage));
    this.router.put("/:id", makeHandlerAwareOfAsyncErrors9(this.putPackage));
    this.router.put("/packidiffs/:id", makeHandlerAwareOfAsyncErrors9(this.putPackagePackiDiffs));
    this.router.post("/:owner/:name", makeHandlerAwareOfAsyncErrors9(this.postPackage));
  };
  getPackages = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getPackageProductionList({
      query: {
        owner
      }
    }).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "getPackages.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  getCheckPackageName = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    validatePackageProduction(owner, name2).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        sendFailure(response, {
          err
        }, 501);
      }
    );
  };
  getPackage = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getPackageProduction(owner, name2).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "getPackage.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  postPackage = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    var description = __check.notEmpty("body", "description");
    var packiFiles = __check.notEmpty("body", "packiFiles");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    createPackageProduction(owner, name2, description, JSON.stringify(packiFiles)).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "postPackage.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  putPackage = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    var owner = __check.notEmpty("body", "owner");
    var name2 = __check.notEmpty("body", "name");
    var description = __check.notEmpty("body", "description");
    var packiFiles = __check.notEmpty("body", "packiFiles");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    updatePackageProduction(id, owner, name2, description, JSON.stringify(packiFiles)).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "putPackage.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  putPackagePackiDiffs = async (request, response) => {
    console.log("putPackagePackiDiffs.request.params", request.params, __filename);
    console.log("putPackagePackiDiffs.request.body.packiDiffs", Object.keys(request.body.packiDiffs), __filename);
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getPackageProductionObjectById(id).then(
      (prevPackage) => {
        console.log("putPackagePackiDiffs.prevPackiFiles", Object.keys(prevPackage.packiFiles), __filename);
        const pm = new PackiBuilder(prevPackage.packiFiles);
        pm.applyPatch_ChangesOnly(request.body.packiDiffs);
        return exec_updatePackageProduction(request, response, pm.packiFiles);
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "putPackagePackiDiffs.getPackageProductionObjectById.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  getWizziMetaFolder = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getWizziMetaFolderById(id, {}).then(
      (packiFiles) => sendSuccess(response, packiFiles)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "getWizziMetaFolder.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
};
function exec_updatePackageProduction(request, response, packiFiles) {
  var __check = restParamsCheck(request);
  var id = __check.optional("params", "id");
  var owner = __check.optional("body", "owner");
  var name2 = __check.optional("body", "name");
  var description = __check.optional("body", "description");
  if (__check.hasErrors()) {
    return __check.sendErrors(response);
  }
  updatePackageProduction(id, owner, name2, description, JSON.stringify(packiFiles)).then(
    (result) => {
      invalidateCache3(id);
      sendSuccess(response, result);
    }
  ).catch(
    (err) => {
      if (typeof err === "object" && err !== null) {
      }
      console.log("\x1B[31m%s\x1B[0m", "exec_updatePackageProduction.updatePackageProduction.error", err);
      sendFailure(response, {
        err: err && err.message
      }, 501);
    }
  );
}

// src/features/wizziHubProductions/controllers/plugin.tsx
var import_express13 = require("express");
var import_react7 = __toESM(require("react"));
var import_server5 = __toESM(require("react-dom/server"));

// src/features/wizziHubProductions/api/plugin.ts
var plugin_exports = {};
__export(plugin_exports, {
  createPluginProduction: () => createPluginProduction,
  deletePluginProduction: () => deletePluginProduction,
  getPluginProduction: () => getPluginProduction,
  getPluginProductionById: () => getPluginProductionById,
  getPluginProductionList: () => getPluginProductionList,
  getPluginProductionObject: () => getPluginProductionObject,
  getPluginProductionObjectById: () => getPluginProductionObjectById,
  getPluginProduction_withCache: () => getPluginProduction_withCache,
  invalidateCache: () => invalidateCache4,
  mergePluginProductionFiles: () => mergePluginProductionFiles,
  updatePluginProduction: () => updatePluginProduction,
  validatePluginProduction: () => validatePluginProduction
});
var import_node_cache4 = __toESM(require("node-cache"));
var myname6 = "features.wizziHubProductions.api.PluginProduction";
var pluginProductionCache = new import_node_cache4.default({
  stdTTL: 120,
  checkperiod: 60
});
async function validatePluginProduction(owner, name2) {
  const PluginProduction = GetPluginProductionModel();
  return new Promise(
    (resolve2, reject) => {
      let query = { owner, name: name2 };
      PluginProduction.find(
        query,
        (err, result) => {
          if (err) {
            return reject(err);
          }
          if (result.length == 1) {
            return resolve2({
              isValid: false,
              message: "plugin production already exists"
            });
          }
          resolve2({
            isValid: true
          });
        }
      );
    }
  );
}
async function getPluginProductionList(options) {
  options = options || {};
  const PluginProduction = GetPluginProductionModel();
  return new Promise(
    (resolve2, reject) => {
      const query = PluginProduction.find(options.query);
      if (options.limit) {
        query.limit(options.limit);
      }
      if (options.sort) {
        query.sort(options.sort);
      }
      query.find(
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname6, "getPluginProductionList", "PluginProduction.find", "error", err);
            return reject(err);
          }
          const resultItem = [];
          var i, i_items = result, i_len = result.length, item;
          for (i = 0; i < i_len; i++) {
            item = result[i];
            const item_obj = {
              _id: item._id,
              id: item.id,
              owner: item.owner,
              name: item.name,
              description: item.description,
              packiFiles: item.packiFiles
            };
            resultItem.push(item_obj);
          }
          resolve2({
            oper: "getPluginProductionList",
            ok: true,
            item: resultItem
          });
        }
      );
    }
  );
}
async function getPluginProduction(owner, name2) {
  const PluginProduction = GetPluginProductionModel();
  return new Promise(
    (resolve2, reject) => {
      let query = {
        owner,
        name: name2
      };
      PluginProduction.find(
        query,
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname6, "getPluginProduction", "PluginProduction.find", "error", err);
            return reject(err);
          }
          if (result.length == 1) {
            return resolve2({
              oper: "get",
              ok: true,
              item: result[0]
            });
          }
          resolve2({
            oper: "get",
            ok: false,
            message: "plugin production not found"
          });
        }
      );
    }
  );
}
async function getPluginProductionById(id) {
  const PluginProduction = GetPluginProductionModel();
  return new Promise(
    (resolve2, reject) => {
      PluginProduction.find(
        {
          _id: id
        },
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname6, "getPluginProduction", "PluginProduction.find", "error", err);
            return reject(err);
          }
          if (result.length == 1) {
            return resolve2({
              oper: "get",
              ok: true,
              item: result[0]
            });
          }
          resolve2({
            oper: "getPluginProduction",
            ok: false,
            message: "plugin production not found"
          });
        }
      );
    }
  );
}
async function getPluginProductionObject(owner, name2, loadPackiConfig) {
  return new Promise(
    (resolve2, reject) => getPluginProduction(owner, name2).then(
      (result) => {
        if (!result.ok) {
          return reject(result);
        }
        const lp = result.item;
        return resolve2(_createPluginProductionObject(lp, loadPackiConfig));
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.pluginProduction.getPluginProductionObject.getPluginProduction.error", err);
        return reject(err);
      }
    )
  );
}
async function getPluginProductionObjectById(id, loadPackiConfig) {
  return new Promise(
    (resolve2, reject) => getPluginProductionById(id).then(
      (result) => {
        if (!result.ok) {
          return reject(result);
        }
        const lp = result.item;
        return resolve2(_createPluginProductionObject(lp, loadPackiConfig));
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.pluginProduction.getPluginProductionObjectById.getPluginProductionById.error", err);
        return reject(err);
      }
    )
  );
}
async function _createPluginProductionObject(lp, loadPackiConfig) {
  return new Promise(
    (resolve2, reject) => {
      const lp_packiFiles_object = JSON.parse(lp.packiFiles);
      const obj = {
        ...lp._doc,
        packiFiles: lp_packiFiles_object,
        _id: lp._id.toString(),
        packiProduction: "PluginProduction",
        configPackiFile: lp_packiFiles_object[constants_default.packiConfigPath],
        packiConfigJsonObj: null
      };
      if (loadPackiConfig) {
        if (!obj.configPackiFile) {
          return reject({
            message: "Missing file " + constants_default.packiConfigPath + " in PluginProduction"
          });
        }
        productions_exports.generateArtifact(constants_default.packiConfigPath, {
          [constants_default.packiConfigPath]: {
            type: obj.configPackiFile.type,
            contents: obj.configPackiFile.contents
          }
        }, {}).then(
          (generationResult) => {
            obj.packiConfigJsonObj = JSON.parse(generationResult.artifactContent);
            return resolve2(obj);
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.pluginProduction.getPluginProductionObject._createPluginProductionObject.error", err);
            return reject(err);
          }
        );
      } else {
        return resolve2(obj);
      }
    }
  );
}
async function createPluginProduction(owner, name2, description, packiFiles) {
  const PluginProduction = GetPluginProductionModel();
  return new Promise(
    (resolve2, reject) => {
      let query = {
        owner,
        name: name2
      };
      PluginProduction.find(
        query,
        // loog myname, 'getPluginProduction', 'PluginProduction.find', 'result', result
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname6, "getPluginProduction", "PluginProduction.find", "error", err);
            return reject(err);
          }
          if (result.length > 0) {
            return resolve2({
              oper: "create",
              ok: false,
              message: "plugin production already exists"
            });
          }
          const newPluginProduction = new PluginProduction({
            owner,
            name: name2,
            description,
            packiFiles,
            created_at: /* @__PURE__ */ new Date(),
            updated_at: /* @__PURE__ */ new Date()
          });
          newPluginProduction.save(function(err2, doc) {
            if (err2) {
              console.log("\x1B[31m%s\x1B[0m", myname6, "createPluginProduction", "newPluginProduction.save", "error", err2);
              return reject(err2);
            }
            return resolve2({
              oper: "createPluginProduction",
              ok: true,
              item: doc._doc,
              message: "plugin production created"
            });
          });
        }
      );
    }
  );
}
async function updatePluginProduction(id, owner, name2, description, packiFiles) {
  const PluginProduction = GetPluginProductionModel();
  return new Promise(
    (resolve2, reject) => {
      var query;
      if (id && id.length > 0) {
        query = {
          _id: id
        };
      } else {
        query = {
          owner,
          name: name2
        };
      }
      const update = {};
      if (typeof owner !== "undefined") {
        update["owner"] = owner;
      }
      if (typeof name2 !== "undefined") {
        update["name"] = name2;
      }
      if (typeof description !== "undefined") {
        update["description"] = description;
      }
      if (typeof packiFiles !== "undefined") {
        update["packiFiles"] = packiFiles;
      }
      update["updated_at"] = /* @__PURE__ */ new Date();
      PluginProduction.findOneAndUpdate(
        query,
        update,
        {},
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname6, "updatePluginProduction", "PluginProduction.findOneAndUpdate", "error", err);
            return reject(err);
          }
          if (!result) {
            console.log("\x1B[31m%s\x1B[0m", myname6, "updatePluginProduction", "PluginProduction.findOneAndUpdate", "error", "document not found");
            return reject({
              oper: "updatePluginProduction",
              ok: false,
              message: "plugin production document not found: " + id
            });
          }
          return resolve2({
            oper: "updatePluginProduction",
            ok: true,
            message: "plugin production updated"
          });
        }
      );
    }
  );
}
async function deletePluginProduction(id, owner, name2) {
  const PluginProduction = GetPluginProductionModel();
  return new Promise(
    (resolve2, reject) => {
      var query;
      if (id && id.length > 0) {
        query = {
          _id: id
        };
      } else {
        query = {
          owner,
          name: name2
        };
      }
      PluginProduction.deleteOne(
        query,
        (err) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname6, "deletePluginProduction", "PluginProduction.deleteOne", "error", err);
            return reject(err);
          }
          resolve2({
            oper: "deletePluginProduction",
            ok: true,
            message: "plugin production"
          });
        }
      );
    }
  );
}
async function mergePluginProductionFiles(owner, name2, tobeMergedPackiFiles, options) {
  return new Promise(
    (resolve2, reject) => getPluginProductionObject(owner, name2, false).then(
      (itemObject) => {
        const newPackiFiles = mergePackiFiles(itemObject.packiFiles, tobeMergedPackiFiles, options);
        updatePluginProduction(itemObject._id, itemObject.owner, itemObject.name, itemObject.description, JSON.stringify(newPackiFiles)).then(
          (result) => resolve2(result)
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.pluginProduction.mergePluginProductionFiles.updatePluginProduction.error", err);
            return reject(err);
          }
        );
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.pluginProduction.mergePluginProductionFiles.getPluginProductionObject.error", err);
        return reject(err);
      }
    )
  );
}
async function getPluginProduction_withCache(owner, name2) {
  var cacheKey = owner + "|" + name2;
  return new Promise(
    (resolve2, reject) => {
      let ppValue = {
        packiFiles: {}
      };
      getPluginProduction(owner, name2).then(
        (result) => {
          if (!result.ok) {
            return reject(result);
          }
          const tf = result.item;
          const tf_packiFiles_object = JSON.parse(tf.packiFiles);
          ppValue = {
            packiFiles: tf_packiFiles_object
          };
          return resolve2(ppValue);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "getPluginProduction_withCache.getArtifactProduction.error", err);
          return reject(err);
        }
      );
    }
  );
}
function invalidateCache4(owner, name2) {
  var cacheKey = owner + "|" + name2;
  pluginProductionCache.del(cacheKey);
}

// src/features/wizziHubProductions/controllers/plugin.tsx
function renderPageForm3(req, res, data, queryParams) {
  const index = "<!DOCTYPE html>" + import_server5.default.renderToStaticMarkup(
    /* @__PURE__ */ import_react7.default.createElement(PageFormDocument, { data, queryParams })
  );
  res.set("Content-Type", "text/html");
  res.set("Content-Length", index.length.toString());
  res.send(index);
}
function getPackiConfigFile3() {
  return {
    [".packi/config.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    { meta",
        '        $$ name "..name.."',
        '        { metaCtx"',
        '            kind "artifact" $$ file|artifact',
        '            $$ filePath ".packi/metaCtx.json.ittf" $$ when kind = "file"',
        "            { artifact",
        '                $$ name "..name.." $$ when kind = "artifact"',
        "            [ contexts",
        "                {",
        '                    $$ propertyName "..name.."',
        '                    $$ artifactName "..name.."',
        "    [ tfolders",
        "        {",
        '            $$ name "..name.."',
        "    [ contexts",
        "        {",
        '            $$ propertyName "..name.."',
        '            $$ aartifactName "..name.."'
      ].join("\n")
    },
    [".packi/parameters/index.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    [ parameters",
        "        {",
        '            name "name"',
        '            type "string"',
        "        string$( kind )"
      ].join("\n")
    },
    [".packi/parameters/t/string.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "string"',
        "    $hook"
      ].join("\n")
    },
    [".packi/parameters/t/boolean.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "boolean"',
        "    $hook"
      ].join("\n")
    },
    [".packi/parameters/t/integer.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "integer"',
        "    $hook"
      ].join("\n")
    },
    [".packi/parameters/t/object.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "object"',
        "    [ parameters",
        "        $hook"
      ].join("\n")
    },
    [".packi/parameters/t/array.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "array"',
        "    { item",
        "        [ parameters",
        "            $hook"
      ].join("\n")
    }
  };
}
function makeHandlerAwareOfAsyncErrors10(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var PluginProductionController = class {
  path = "/plugin";
  router = (0, import_express13.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering PluginProductionController.initialize");
    this.router.get("/new", makeHandlerAwareOfAsyncErrors10(this.getNewPluginForm));
    this.router.post("/new", makeHandlerAwareOfAsyncErrors10(this.postPlugin));
    this.router.get("/update/:id", makeHandlerAwareOfAsyncErrors10(this.getUpdatePluginForm));
    this.router.post("/update", makeHandlerAwareOfAsyncErrors10(this.putPlugin));
    this.router.get("/delete/:id", makeHandlerAwareOfAsyncErrors10(this.getDeletePluginForm));
    this.router.post("/delete", makeHandlerAwareOfAsyncErrors10(this.deletePlugin));
    this.router.get("/props", makeHandlerAwareOfAsyncErrors10(this.getPluginProperties));
  };
  getNewPluginForm = async (request, response) => renderPageForm3(request, response, {
    type: "success",
    formName: "CreatePluginProduction",
    formData: {
      owner: request.session.user.username
    }
  }, {});
  postPlugin = async (request, response) => getTemplatePackiFiles(request.body.meta_id, request.body.meta_propsValues ? JSON.parse(request.body.meta_propsValues) : {}, request.query.context, request.body.context ? JSON.parse(request.body.context) : {}, {
    wizziSchema: "js",
    mainIttf: "index.js.ittf"
  }).then(
    (packiFiles) => createPluginProduction(request.session.user.username, request.body.pl_name, request.body.pl_description, JSON.stringify(mergePackiFiles(packiFiles, getPackiConfigFile3()))).then(
      (result) => {
        if (result.ok) {
          response.redirect("/~~/l/" + request.session.user.username + "/" + request.body.pl_name);
        } else {
          response.render("error.html.ittf", {
            message: "creating a new plugin production",
            error: result
          });
        }
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        response.render("error.html.ittf", {
          message: "creating a new plugin production",
          error: err
        });
      }
    )
  ).catch(
    (err) => {
      if (typeof err === "object" && err !== null) {
      }
      response.render("error.html.ittf", {
        message: "getting template packi files while creating a new plugin production",
        error: err
      });
    }
  );
  getUpdatePluginForm = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getPluginProductionObjectById(id).then(
      (result) => renderPageForm3(request, response, {
        type: "success",
        formName: "UpdatePluginProduction",
        formData: {
          _id: id,
          owner: result.owner,
          name: result.name,
          description: result.description
        }
      }, {})
    );
  };
  putPlugin = async (request, response) => {
    const obj = request.body;
    updatePluginProduction(obj.pl_id, obj.pl_owner, obj.pl_name, obj.pl_description).then(
      (result) => {
        if (result.ok) {
          response.redirect("/productions/plugins");
        } else {
          response.render("error.html.ittf", {
            message: "updating a plugin production",
            error: result
          });
        }
      }
    );
  };
  getDeletePluginForm = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getPluginProductionObjectById(id).then(
      (result) => renderPageForm3(request, response, {
        type: "success",
        formName: "DeletePluginProduction",
        formData: {
          _id: result._id,
          owner: result.owner,
          name: result.name,
          description: result.description
        }
      }, {})
    );
  };
  deletePlugin = async (request, response) => {
    const obj = request.body;
    deletePluginProduction(obj.pl_id, obj.pl_owner, obj.pl_name).then(
      (result) => {
        if (result.ok) {
          response.redirect("/productions/plugins");
        } else {
          response.render("error.html.ittf", {
            message: "deleting a plugin production",
            error: result
          });
        }
      }
    );
  };
  getPluginProperties = async (request, response) => renderPageForm3(request, response, {
    type: "success",
    formName: "PropertyEditor",
    formData: {
      owner: request.query.owner,
      name: request.query.name,
      schema: {
        properties: [
          {
            name: "name",
            type: "string"
          },
          {
            name: "age",
            type: "number"
          },
          {
            name: "jobs",
            type: "array",
            properties: [
              {
                name: "title",
                type: "string"
              },
              {
                name: "year",
                type: "number"
              }
            ]
          },
          {
            name: "react",
            type: "object",
            properties: [
              {
                name: "useReact",
                type: "boolean",
                isCondition: true
              },
              {
                name: "useRouter",
                type: "boolean"
              },
              {
                name: "useRedux",
                type: "boolean"
              }
            ]
          }
        ]
      }
    }
  }, {});
};

// src/features/wizziHubProductions/controllers/apiv1plugin.tsx
var import_express14 = require("express");
function makeHandlerAwareOfAsyncErrors11(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var ApiV1PluginProductionController = class {
  path = "/api/v1/production/plugin";
  router = (0, import_express14.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering ApiV1PluginProductionController.initialize");
    this.router.get("/:owner", makeHandlerAwareOfAsyncErrors11(this.getPlugins));
    this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors11(this.getCheckPluginName));
    this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors11(this.getPlugin));
    this.router.put("/:id", makeHandlerAwareOfAsyncErrors11(this.putPlugin));
    this.router.put("/packidiffs/:id", makeHandlerAwareOfAsyncErrors11(this.putPluginPackiDiffs));
    this.router.post("/:post", makeHandlerAwareOfAsyncErrors11(this.postPlugin));
  };
  getPlugins = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getPluginProductionList({
      query: {
        owner
      }
    }).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "getPlugins.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  getCheckPluginName = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    validatePluginProduction(owner, name2).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        sendFailure(response, {
          err
        }, 501);
      }
    );
  };
  getPlugin = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getPluginProduction(owner, name2).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "getPlugin.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  postPlugin = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    var description = __check.notEmpty("body", "description");
    var packiFiles = __check.notEmpty("body", "packiFiles");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    createPluginProduction(owner, name2, description, JSON.stringify(packiFiles)).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "postPlugin.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  putPlugin = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    var owner = __check.notEmpty("body", "owner");
    var name2 = __check.notEmpty("body", "name");
    var description = __check.notEmpty("body", "description");
    var packiFiles = __check.notEmpty("body", "packiFiles");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    updatePluginProduction(id, owner, name2, description, JSON.stringify(packiFiles)).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "putPlugin.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  putPluginPackiDiffs = async (request, response) => {
    console.log("putPluginPackiDiffs.request.params", request.params, __filename);
    console.log("putPluginPackiDiffs.request.body.packiDiffs", Object.keys(request.body.packiDiffs), __filename);
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getPluginProductionObjectById(id).then(
      (prevPlugin) => {
        console.log("putPluginPackiDiffs.prevPackiFiles", Object.keys(prevPlugin.packiFiles), __filename);
        const pm = new PackiBuilder(prevPlugin.packiFiles);
        pm.applyPatch_ChangesOnly(request.body.packiDiffs);
        return exec_updatePluginProduction(request, response, pm.packiFiles);
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "putPluginPackiDiffs.getPluginProductionObjectById.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
};
function exec_updatePluginProduction(request, response, packiFiles) {
  var __check = restParamsCheck(request);
  var id = __check.optional("params", "id");
  var owner = __check.optional("body", "owner");
  var name2 = __check.optional("body", "name");
  var description = __check.optional("body", "description");
  if (__check.hasErrors()) {
    return __check.sendErrors(response);
  }
  updatePluginProduction(id, owner, name2, description, JSON.stringify(packiFiles)).then(
    (result) => {
      invalidateCache4(id);
      sendSuccess(response, result);
    }
  ).catch(
    (err) => {
      if (typeof err === "object" && err !== null) {
      }
      console.log("\x1B[31m%s\x1B[0m", "exec_updatePluginProduction.updatePluginProduction.error", err);
      sendFailure(response, {
        err: err && err.message
      }, 501);
    }
  );
}

// src/features/wizziHubProductions/controllers/meta.tsx
var import_express15 = require("express");
var import_react8 = __toESM(require("react"));
var import_server6 = __toESM(require("react-dom/server"));
function renderPageForm4(req, res, data, queryParams) {
  const index = "<!DOCTYPE html>" + import_server6.default.renderToStaticMarkup(
    /* @__PURE__ */ import_react8.default.createElement(PageFormDocument, { data, queryParams })
  );
  res.set("Content-Type", "text/html");
  res.set("Content-Length", index.length.toString());
  res.send(index);
}
function getPackiConfigFile4() {
  return {
    [".packi/config.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    [ tfolders",
        "        {",
        '            $$ name "..."',
        "    [ contexts",
        "        {",
        '            $$ propertyName "..."',
        '            $$ artifactName "..."'
      ].join("\n")
    },
    [".packi/parameters/index.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    [ parameters",
        "        {",
        '            name "name"',
        '            type "string"',
        "        string$( kind )"
      ].join("\n")
    },
    [".packi/parameters/t/string.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "string"',
        "    $hook"
      ].join("\n")
    },
    [".packi/parameters/t/boolean.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "boolean"',
        "    $hook"
      ].join("\n")
    },
    [".packi/parameters/t/integer.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "integer"',
        "    $hook"
      ].join("\n")
    },
    [".packi/parameters/t/object.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "object"',
        "    [ parameters",
        "        $hook"
      ].join("\n")
    },
    [".packi/parameters/t/array.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "array"',
        "    { item",
        "        [ parameters",
        "            $hook"
      ].join("\n")
    }
  };
}
function makeHandlerAwareOfAsyncErrors12(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var MetaProductionController = class {
  path = "/meta";
  router = (0, import_express15.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering MetaProductionController.initialize");
    this.router.get("/new", makeHandlerAwareOfAsyncErrors12(this.getNewMetaForm));
    this.router.post("/new", makeHandlerAwareOfAsyncErrors12(this.postMeta));
    this.router.get("/update/:id", makeHandlerAwareOfAsyncErrors12(this.getUpdateMetaForm));
    this.router.post("/update", makeHandlerAwareOfAsyncErrors12(this.putMeta));
    this.router.get("/delete/:id", makeHandlerAwareOfAsyncErrors12(this.getDeleteMetaForm));
    this.router.post("/delete", makeHandlerAwareOfAsyncErrors12(this.deleteMeta));
    this.router.post("/generate", makeHandlerAwareOfAsyncErrors12(this.generateMeta));
  };
  getNewMetaForm = async (request, response) => renderPageForm4(request, response, {
    type: "success",
    formName: "CreateMetaProduction",
    formData: {
      owner: request.session.user.username
    }
  }, {});
  postMeta = async (request, response) => createMetaProduction(request.session.user.username, request.body.mp_name, request.body.mp_description, JSON.stringify(getPackiConfigFile4())).then(
    (result) => {
      if (result.ok) {
        response.redirect("/~~/m/" + request.session.user.username + "/" + request.body.mp_name);
      } else {
        response.render("error.html.ittf", {
          message: "creating a new meta production",
          error: result
        });
      }
    }
  ).catch(
    (err) => response.render("error.html.ittf", {
      message: "creating a new meta production",
      error: err
    })
  );
  getUpdateMetaForm = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getMetaProductionObjectById(id).then(
      (result) => renderPageForm4(request, response, {
        type: "success",
        formName: "UpdateMetaProduction",
        formData: {
          _id: id,
          owner: result.owner,
          name: result.name,
          description: result.description
        }
      }, {})
    );
  };
  putMeta = async (request, response) => {
    const obj = request.body;
    updateMetaProduction(obj.mp_id, obj.mp_owner, obj.mp_name, obj.mp_description).then(
      (result) => {
        if (result.ok) {
          response.redirect("/productions/metas");
        } else {
          response.render("error.html.ittf", {
            message: "updating a meta production",
            error: result
          });
        }
      }
    );
  };
  getDeleteMetaForm = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getMetaProductionObjectById(id).then(
      (result) => renderPageForm4(request, response, {
        type: "success",
        formName: "DeleteMetaProduction",
        formData: {
          _id: result._id,
          owner: result.owner,
          name: result.name,
          description: result.description
        }
      }, {})
    );
  };
  deleteMeta = async (request, response) => {
    const obj = request.body;
    deleteMetaProduction(obj.mp_id, obj.mp_owner, obj.mp_name).then(
      (result) => {
        if (result.ok) {
          response.redirect("/productions/metas");
        } else {
          response.render("error.html.ittf", {
            message: "deleting a meta production",
            error: result
          });
        }
      }
    );
  };
  generateMeta = async (request, response) => {
    generateMetaProduction(request.body.owner, request.body.name, request.body.metaCtx).then(
      (wizziPackiFiles) => sendSuccess(response, wizziPackiFiles)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        response.render("error.html.ittf", {
          message: "MetaProductionController.generateMeta",
          error: err
        });
      }
    );
  };
};

// src/features/wizziHubProductions/controllers/apiv1meta.tsx
var import_express16 = require("express");
function makeHandlerAwareOfAsyncErrors13(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var ApiV1MetaProductionController = class {
  path = "/api/v1/production/meta";
  router = (0, import_express16.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering ApiV1MetaProductionController.initialize");
    this.router.get("/:owner", makeHandlerAwareOfAsyncErrors13(this.getMetas));
    this.router.get("/props/:id", makeHandlerAwareOfAsyncErrors13(this.getMetaProperties));
    this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors13(this.getCheckMetaName));
    this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors13(this.getMeta));
    this.router.put("/:id", makeHandlerAwareOfAsyncErrors13(this.putMeta));
    this.router.put("/packidiffs/:id", makeHandlerAwareOfAsyncErrors13(this.putMetaPackiDiffs));
    this.router.post("'/:owner/:name", makeHandlerAwareOfAsyncErrors13(this.postMeta));
    this.router.post("'/generate/:owner/:name", makeHandlerAwareOfAsyncErrors13(this.generateMetaByName));
  };
  getMetas = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getMetaProductionList({
      query: {
        owner
      }
    }).then(
      (result) => {
        if (result.ok) {
          sendSuccess(response, result);
        } else {
          console.log("\x1B[31m%s\x1B[0m", "getMetas.error", result);
          sendFailure(response, {
            err: result
          }, 501);
        }
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "getMetas.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  getMetaProperties = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    production_exports.prepareProductionById("meta", id, "", {}).then(
      (metaProductionSet) => productions_exports.generateArtifact("properties/index.json.ittf", metaProductionSet.packiFiles, metaProductionSet.context).then(
        (value) => sendSuccess(response, {
          meta: JSON.parse(value.artifactContent)
        })
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "features.packi.controllers.production.generateArtifact.error", err);
          sendFailure(response, {
            err: err && err.message
          }, 501);
        }
      )
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "getMetaProperties.prepareProductionById.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  getCheckMetaName = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    validateMetaProduction(owner, name2).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        sendFailure(response, {
          err
        }, 501);
      }
    );
  };
  getMeta = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getMetaProduction(owner, name2).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "getMeta.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  postMeta = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    createMetaProduction(owner, name2, request.body.description, JSON.stringify(request.body.packiFiles)).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "postMeta.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  putMeta = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    var packiFiles = __check.notUndefined("body", "packiFiles");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    exec_updateMetaProduction(request, response, packiFiles);
  };
  putMetaPackiDiffs = async (request, response) => {
    console.log("putMetaPackiDiffs.request.params", request.params, __filename);
    console.log("putMetaPackiDiffs.request.body.packiDiffs", Object.keys(request.body.packiDiffs), __filename);
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getMetaProductionObjectById(id).then(
      (prevMeta) => {
        console.log("putMetaPackiDiffs.prevPackiFiles", Object.keys(prevMeta.packiFiles), __filename);
        const pm = new PackiBuilder(prevMeta.packiFiles);
        pm.applyPatch_ChangesOnly(request.body.packiDiffs);
        return exec_updateMetaProduction(request, response, pm.packiFiles);
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "putMetaPackiDiffs.getMetaProductionObjectById.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  generateMetaByName = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    var owner = __check.notEmpty("params", "owner");
    var metaCtx = __check.notEmpty("body", "metaCtx");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    generateMetaProduction(owner, name, metaCtx).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "generateMetaByName.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
};
function exec_updateMetaProduction(request, response, packiFiles) {
  var __check = restParamsCheck(request);
  var id = __check.optional("params", "id");
  var owner = __check.optional("body", "owner");
  var name2 = __check.optional("body", "name");
  var description = __check.optional("body", "description");
  if (__check.hasErrors()) {
    return __check.sendErrors(response);
  }
  updateMetaProduction(id, owner, name2, description, JSON.stringify(packiFiles)).then(
    (result) => {
      invalidateCache(id);
      sendSuccess(response, result);
    }
  ).catch(
    (err) => {
      if (typeof err === "object" && err !== null) {
      }
      console.log("\x1B[31m%s\x1B[0m", "exec_updateMetaProduction.updateMetaProduction.error", err);
      sendFailure(response, {
        err: err && err.message
      }, 501);
    }
  );
}

// src/features/wizziHubProductions/controllers/tfolder.tsx
var import_express17 = require("express");
var import_react9 = __toESM(require("react"));
var import_server7 = __toESM(require("react-dom/server"));

// src/features/wizziHubProductions/api/tfolder.ts
var tfolder_exports = {};
__export(tfolder_exports, {
  createTFolderProduction: () => createTFolderProduction,
  deleteTFolderProduction: () => deleteTFolderProduction,
  getTFolderProduction: () => getTFolderProduction,
  getTFolderProductionById: () => getTFolderProductionById,
  getTFolderProductionList: () => getTFolderProductionList,
  getTFolderProductionObject: () => getTFolderProductionObject,
  getTFolderProductionObjectById: () => getTFolderProductionObjectById,
  getTFolderProduction_withCache: () => getTFolderProduction_withCache,
  invalidateCache: () => invalidateCache5,
  mergeTFolderProductionFiles: () => mergeTFolderProductionFiles,
  updateTFolderProduction: () => updateTFolderProduction,
  validateTFolderProduction: () => validateTFolderProduction
});
var import_node_cache5 = __toESM(require("node-cache"));
var myname7 = "features.wizziHubProductions.api.TFolderProduction";
var tFolderProductionCache = new import_node_cache5.default({
  stdTTL: 120,
  checkperiod: 60
});
async function validateTFolderProduction(owner, name2) {
  const TFolderProduction = GetTFolderProductionModel();
  return new Promise(
    (resolve2, reject) => {
      let query = { owner, name: name2 };
      TFolderProduction.find(
        query,
        (err, result) => {
          if (err) {
            return reject(err);
          }
          if (result.length == 1) {
            return resolve2({
              isValid: false,
              message: "A tFolder contains ITTF Fragments that Wizzi productions can mix/include. already exists"
            });
          }
          resolve2({
            isValid: true
          });
        }
      );
    }
  );
}
async function getTFolderProductionList(options) {
  options = options || {};
  const TFolderProduction = GetTFolderProductionModel();
  return new Promise(
    (resolve2, reject) => {
      const query = TFolderProduction.find(options.query);
      if (options.limit) {
        query.limit(options.limit);
      }
      if (options.sort) {
        query.sort(options.sort);
      }
      query.find(
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname7, "getTFolderProductionList", "TFolderProduction.find", "error", err);
            return reject(err);
          }
          const resultItem = [];
          var i, i_items = result, i_len = result.length, item;
          for (i = 0; i < i_len; i++) {
            item = result[i];
            const item_obj = {
              _id: item._id,
              id: item.id,
              owner: item.owner,
              name: item.name,
              description: item.description,
              packiFiles: item.packiFiles
            };
            resultItem.push(item_obj);
          }
          resolve2({
            oper: "getTFolderProductionList",
            ok: true,
            item: resultItem
          });
        }
      );
    }
  );
}
async function getTFolderProduction(owner, name2) {
  const TFolderProduction = GetTFolderProductionModel();
  return new Promise(
    (resolve2, reject) => {
      let query = {
        owner,
        name: name2
      };
      TFolderProduction.find(
        query,
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname7, "getTFolderProduction", "TFolderProduction.find", "error", err);
            return reject(err);
          }
          if (result.length == 1) {
            return resolve2({
              oper: "get",
              ok: true,
              item: result[0]
            });
          }
          resolve2({
            oper: "get",
            ok: false,
            message: "A tFolder contains ITTF Fragments that Wizzi productions can mix/include. not found"
          });
        }
      );
    }
  );
}
async function getTFolderProductionById(id) {
  const TFolderProduction = GetTFolderProductionModel();
  return new Promise(
    (resolve2, reject) => {
      TFolderProduction.find(
        {
          _id: id
        },
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname7, "getTFolderProduction", "TFolderProduction.find", "error", err);
            return reject(err);
          }
          if (result.length == 1) {
            return resolve2({
              oper: "get",
              ok: true,
              item: result[0]
            });
          }
          resolve2({
            oper: "getTFolderProduction",
            ok: false,
            message: "A tFolder contains ITTF Fragments that Wizzi productions can mix/include. not found"
          });
        }
      );
    }
  );
}
async function getTFolderProductionObject(owner, name2, loadPackiConfig) {
  return new Promise(
    (resolve2, reject) => getTFolderProduction(owner, name2).then(
      (result) => {
        if (!result.ok) {
          return reject(result);
        }
        const tf = result.item;
        return resolve2(_createTFolderProductionObject(tf, loadPackiConfig));
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.tFolderProduction.getTFolderProductionObject.getTFolderProduction.error", err);
        return reject(err);
      }
    )
  );
}
async function getTFolderProductionObjectById(id, loadPackiConfig) {
  return new Promise(
    (resolve2, reject) => getTFolderProductionById(id).then(
      (result) => {
        if (!result.ok) {
          return reject(result);
        }
        const tf = result.item;
        return resolve2(_createTFolderProductionObject(tf, loadPackiConfig));
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.tFolderProduction.getTFolderProductionObjectById.getTFolderProductionById.error", err);
        return reject(err);
      }
    )
  );
}
async function _createTFolderProductionObject(tf, loadPackiConfig) {
  return new Promise(
    (resolve2, reject) => {
      const tf_packiFiles_object = JSON.parse(tf.packiFiles);
      const obj = {
        ...tf._doc,
        packiFiles: tf_packiFiles_object,
        _id: tf._id.toString(),
        packiProduction: "TFolderProduction",
        configPackiFile: tf_packiFiles_object[constants_default.packiConfigPath],
        packiConfigJsonObj: null
      };
      if (loadPackiConfig) {
        if (!obj.configPackiFile) {
          return reject({
            message: "Missing file " + constants_default.packiConfigPath + " in TFolderProduction"
          });
        }
        productions_exports.generateArtifact(constants_default.packiConfigPath, {
          [constants_default.packiConfigPath]: {
            type: obj.configPackiFile.type,
            contents: obj.configPackiFile.contents
          }
        }, {}).then(
          (generationResult) => {
            obj.packiConfigJsonObj = JSON.parse(generationResult.artifactContent);
            return resolve2(obj);
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.tFolderProduction.getTFolderProductionObject._createTFolderProductionObject.error", err);
            return reject(err);
          }
        );
      } else {
        return resolve2(obj);
      }
    }
  );
}
async function createTFolderProduction(owner, name2, description, packiFiles) {
  const TFolderProduction = GetTFolderProductionModel();
  return new Promise(
    (resolve2, reject) => {
      let query = {
        owner,
        name: name2
      };
      TFolderProduction.find(
        query,
        // loog myname, 'getTFolderProduction', 'TFolderProduction.find', 'result', result
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname7, "getTFolderProduction", "TFolderProduction.find", "error", err);
            return reject(err);
          }
          if (result.length > 0) {
            return resolve2({
              oper: "create",
              ok: false,
              message: "A tFolder contains ITTF Fragments that Wizzi productions can mix/include. already exists"
            });
          }
          const newTFolderProduction = new TFolderProduction({
            owner,
            name: name2,
            description,
            packiFiles,
            created_at: /* @__PURE__ */ new Date(),
            updated_at: /* @__PURE__ */ new Date()
          });
          newTFolderProduction.save(function(err2, doc) {
            if (err2) {
              console.log("\x1B[31m%s\x1B[0m", myname7, "createTFolderProduction", "newTFolderProduction.save", "error", err2);
              return reject(err2);
            }
            return resolve2({
              oper: "createTFolderProduction",
              ok: true,
              item: doc._doc,
              message: "A tFolder contains ITTF Fragments that Wizzi productions can mix/include. created"
            });
          });
        }
      );
    }
  );
}
async function updateTFolderProduction(id, owner, name2, description, packiFiles) {
  const TFolderProduction = GetTFolderProductionModel();
  return new Promise(
    (resolve2, reject) => {
      var query;
      if (id && id.length > 0) {
        query = {
          _id: id
        };
      } else {
        query = {
          owner,
          name: name2
        };
      }
      const update = {};
      if (typeof owner !== "undefined") {
        update["owner"] = owner;
      }
      if (typeof name2 !== "undefined") {
        update["name"] = name2;
      }
      if (typeof description !== "undefined") {
        update["description"] = description;
      }
      if (typeof packiFiles !== "undefined") {
        update["packiFiles"] = packiFiles;
      }
      update["updated_at"] = /* @__PURE__ */ new Date();
      TFolderProduction.findOneAndUpdate(
        query,
        update,
        {},
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname7, "updateTFolderProduction", "TFolderProduction.findOneAndUpdate", "error", err);
            return reject(err);
          }
          if (!result) {
            console.log("\x1B[31m%s\x1B[0m", myname7, "updateTFolderProduction", "TFolderProduction.findOneAndUpdate", "error", "document not found");
            return reject({
              oper: "updateTFolderProduction",
              ok: false,
              message: "A tFolder contains ITTF Fragments that Wizzi productions can mix/include. document not found: " + id
            });
          }
          return resolve2({
            oper: "updateTFolderProduction",
            ok: true,
            message: "A tFolder contains ITTF Fragments that Wizzi productions can mix/include. updated"
          });
        }
      );
    }
  );
}
async function deleteTFolderProduction(id, owner, name2) {
  const TFolderProduction = GetTFolderProductionModel();
  return new Promise(
    (resolve2, reject) => {
      var query;
      if (id && id.length > 0) {
        query = {
          _id: id
        };
      } else {
        query = {
          owner,
          name: name2
        };
      }
      TFolderProduction.deleteOne(
        query,
        (err) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname7, "deleteTFolderProduction", "TFolderProduction.deleteOne", "error", err);
            return reject(err);
          }
          resolve2({
            oper: "deleteTFolderProduction",
            ok: true,
            message: "A tFolder contains ITTF Fragments that Wizzi productions can mix/include."
          });
        }
      );
    }
  );
}
async function mergeTFolderProductionFiles(owner, name2, tobeMergedPackiFiles, options) {
  return new Promise(
    (resolve2, reject) => getTFolderProductionObject(owner, name2, false).then(
      (itemObject) => {
        const newPackiFiles = mergePackiFiles(itemObject.packiFiles, tobeMergedPackiFiles, options);
        updateTFolderProduction(itemObject._id, itemObject.owner, itemObject.name, itemObject.description, JSON.stringify(newPackiFiles)).then(
          (result) => resolve2(result)
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.tFolderProduction.mergeTFolderProductionFiles.updateTFolderProduction.error", err);
            return reject(err);
          }
        );
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.tFolderProduction.mergeTFolderProductionFiles.getTFolderProductionObject.error", err);
        return reject(err);
      }
    )
  );
}
async function getTFolderProduction_withCache(owner, name2) {
  var cacheKey = owner + "|" + name2;
  return new Promise(
    (resolve2, reject) => {
      let tfValue = {
        packiFiles: {}
      };
      getTFolderProduction(owner, name2).then(
        (result) => {
          if (!result.ok) {
            return reject(result);
          }
          const tf = result.item;
          const tf_packiFiles_object = JSON.parse(tf.packiFiles);
          tfValue = {
            packiFiles: tf_packiFiles_object
          };
          return resolve2(tfValue);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "getTFolderProduction_withCache.getArtifactProduction.error", err);
          return reject(err);
        }
      );
    }
  );
}
function invalidateCache5(owner, name2) {
  var cacheKey = owner + "|" + name2;
  tFolderProductionCache.del(cacheKey);
}

// src/features/wizziHubProductions/controllers/tfolder.tsx
function renderPageForm5(req, res, data, queryParams) {
  const index = "<!DOCTYPE html>" + import_server7.default.renderToStaticMarkup(
    /* @__PURE__ */ import_react9.default.createElement(PageFormDocument, { data, queryParams })
  );
  res.set("Content-Type", "text/html");
  res.set("Content-Length", index.length.toString());
  res.send(index);
}
function getPackiConfigFile5() {
  return {
    [".packi/config.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    { meta",
        '        $$ name "..name.."',
        '        { metaCtx"',
        '            kind "artifact" $$ file|artifact',
        '            $$ filePath ".packi/metaCtx.json.ittf" $$ when kind = "file"',
        "            { artifact",
        '                $$ name "..name.." $$ when kind = "artifact"',
        "            [ contexts",
        "                {",
        '                    $$ propertyName "..name.."',
        '                    $$ artifactName "..name.."',
        "    [ tfolders",
        "        {",
        '            $$ name "..name.."',
        "    [ contexts",
        "        {",
        '            $$ propertyName "..name.."',
        '            $$ artifactName "..name.."'
      ].join("\n")
    }
  };
}
function makeHandlerAwareOfAsyncErrors14(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var TFolderProductionController = class {
  path = "/tfolder";
  router = (0, import_express17.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering TFolderProductionController.initialize");
    this.router.get("/new", makeHandlerAwareOfAsyncErrors14(this.getNewTFolderForm));
    this.router.post("/new", makeHandlerAwareOfAsyncErrors14(this.postTFolder));
    this.router.get("/update/:id", makeHandlerAwareOfAsyncErrors14(this.getUpdateTFolderForm));
    this.router.post("/update", makeHandlerAwareOfAsyncErrors14(this.putTFolder));
    this.router.get("/delete/:id", makeHandlerAwareOfAsyncErrors14(this.getDeleteTFolderForm));
    this.router.post("/delete", makeHandlerAwareOfAsyncErrors14(this.deleteTFolder));
  };
  getNewTFolderForm = async (request, response) => renderPageForm5(request, response, {
    type: "success",
    formName: "CreateTFolder",
    formData: {
      owner: request.session.user.username
    }
  }, {});
  postTFolder = async (request, response) => getTemplatePackiFiles(request.body.meta_id, request.body.meta_propsValues ? JSON.parse(request.body.meta_propsValues) : {}, request.query.context, request.body.context ? JSON.parse(request.body.context) : {}, {
    wizziSchema: null,
    mainIttf: null
  }).then(
    (packiFiles) => createTFolderProduction(request.session.user.username, request.body.tf_name, request.body.tf_description, JSON.stringify(mergePackiFiles(packiFiles, getPackiConfigFile5()))).then(
      (result) => {
        if (result.ok) {
          response.redirect("/~~/t/" + request.session.user.username + "/" + request.body.mp_name);
        } else {
          response.render("error.html.ittf", {
            message: "creating a new tfolder",
            error: result
          });
        }
      }
    ).catch(
      (err) => response.render("error.html.ittf", {
        message: "creating a new tfolder",
        error: err
      })
    )
  );
  getUpdateTFolderForm = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getTFolderProductionObjectById(id).then(
      (result) => renderPageForm5(request, response, {
        type: "success",
        formName: "UpdateTFolderProduction",
        formData: {
          _id: id,
          owner: result.owner,
          name: result.name,
          description: result.description
        }
      }, {})
    );
  };
  putTFolder = async (request, response) => {
    const obj = request.body;
    updateTFolderProduction(obj.tf_id, obj.tf_owner, obj.tf_name, obj.tf_description).then(
      (result) => {
        if (result.ok) {
          response.redirect("/productions/tfolders");
        } else {
          response.render("error.html.ittf", {
            message: "updating a tFolder production",
            error: result
          });
        }
      }
    );
  };
  getDeleteTFolderForm = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getTFolderProductionObjectById(id).then(
      (result) => renderPageForm5(request, response, {
        type: "success",
        formName: "DeleteTFolderProduction",
        formData: {
          _id: result._id,
          owner: result.owner,
          name: result.name,
          description: result.description
        }
      }, {})
    );
  };
  deleteTFolder = async (request, response) => {
    const obj = request.body;
    deleteTFolderProduction(obj.tf_id, obj.tf_owner, obj.tf_name).then(
      (result) => {
        if (result.ok) {
          response.redirect("/productions/tfolders");
        } else {
          response.render("error.html.ittf", {
            message: "deleting a tFolder production",
            error: result
          });
        }
      }
    );
  };
};

// src/features/wizziHubProductions/controllers/apiv1tfolder.tsx
var import_express18 = require("express");
function makeHandlerAwareOfAsyncErrors15(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var ApiV1TFolderProductionController = class {
  path = "/api/v1/production/tfolder";
  router = (0, import_express18.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering ApiV1TFolderProductionController.initialize");
    this.router.get("/:owner", makeHandlerAwareOfAsyncErrors15(this.getTFolders));
    this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors15(this.getCheckTFolderName));
    this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors15(this.getTFolder));
    this.router.put("/:id", makeHandlerAwareOfAsyncErrors15(this.putTFolder));
    this.router.put("/packidiffs/:id", makeHandlerAwareOfAsyncErrors15(this.putTFolderPackiDiffs));
    this.router.post("/:owner/:name", makeHandlerAwareOfAsyncErrors15(this.postTFolder));
  };
  getTFolders = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getTFolderProductionList({
      query: {
        owner
      }
    }).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "getTFolders.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  getCheckTFolderName = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    validateTFolderProduction(owner, name2).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        sendFailure(response, {
          err
        }, 501);
      }
    );
  };
  getTFolder = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getTFolderProduction(owner, name2).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "getTFolder.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  postTFolder = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    var description = __check.notEmpty("body", "description");
    var packiFiles = __check.notEmpty("body", "packiFiles");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    createTFolderProduction(owner, name2, description, JSON.stringify(packiFiles)).then(
      (result) => {
        invalidateCache5(owner, name2);
        sendSuccess(response, result);
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "postTFolder.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  putTFolder = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    var owner = __check.notEmpty("body", "owner");
    var name2 = __check.notEmpty("body", "name");
    var description = __check.notEmpty("body", "description");
    var packiFiles = __check.notEmpty("body", "packiFiles");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    updateTFolderProduction(id, owner, name2, description, JSON.stringify(packiFiles)).then(
      (result) => {
        invalidateCache5(owner, name2);
        sendSuccess(response, result);
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "putTFolder.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  putTFolderPackiDiffs = async (request, response) => {
    console.log("putTFolderPackiDiffs.request.params", request.params, __filename);
    console.log("putTFolderPackiDiffs.request.body.packiDiffs", Object.keys(request.body.packiDiffs), __filename);
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getTFolderProductionObjectById(id).then(
      (prevTFolder) => {
        console.log("putTFolderPackiDiffs.prevPackiFiles", Object.keys(prevTFolder.packiFiles), __filename);
        const pm = new PackiBuilder(prevTFolder.packiFiles);
        pm.applyPatch_ChangesOnly(request.body.packiDiffs);
        return exec_updateTFolderProduction(request, response, pm.packiFiles);
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "putTFolderPackiDiffs.getTFolderProductionObjectById.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
};
function exec_updateTFolderProduction(request, response, packiFiles) {
  var __check = restParamsCheck(request);
  var id = __check.optional("params", "id");
  var owner = __check.optional("body", "owner");
  var name2 = __check.optional("body", "name");
  var description = __check.optional("body", "description");
  if (__check.hasErrors()) {
    return __check.sendErrors(response);
  }
  updateTFolderProduction(id, owner, name2, description, JSON.stringify(packiFiles)).then(
    (result) => {
      invalidateCache5(id);
      sendSuccess(response, result);
    }
  ).catch(
    (err) => {
      if (typeof err === "object" && err !== null) {
      }
      console.log("\x1B[31m%s\x1B[0m", "exec_updateTFolderProduction.updateTFolderProduction.error", err);
      sendFailure(response, {
        err: err && err.message
      }, 501);
    }
  );
}

// src/features/wizziHubProductions/controllers/job.tsx
var import_express19 = require("express");
var import_react10 = __toESM(require("react"));
var import_server8 = __toESM(require("react-dom/server"));

// src/features/wizziHubProductions/api/job.ts
var job_exports = {};
__export(job_exports, {
  createJobProduction: () => createJobProduction,
  deleteJobProduction: () => deleteJobProduction,
  getJobProduction: () => getJobProduction,
  getJobProductionById: () => getJobProductionById,
  getJobProductionList: () => getJobProductionList,
  getJobProductionObject: () => getJobProductionObject,
  getJobProductionObjectById: () => getJobProductionObjectById,
  getJobProduction_withCache: () => getJobProduction_withCache,
  invalidateCache: () => invalidateCache6,
  mergeJobProductionFiles: () => mergeJobProductionFiles,
  updateJobProduction: () => updateJobProduction,
  validateJobProduction: () => validateJobProduction
});
var import_node_cache6 = __toESM(require("node-cache"));
var myname8 = "features.wizziHubProductions.api.JobProduction";
var jobProductionCache = new import_node_cache6.default({
  stdTTL: 120,
  checkperiod: 60
});
async function validateJobProduction(owner, name2) {
  const JobProduction = GetJobProductionModel();
  return new Promise(
    (resolve2, reject) => {
      let query = { owner, name: name2 };
      JobProduction.find(
        query,
        (err, result) => {
          if (err) {
            return reject(err);
          }
          if (result.length == 1) {
            return resolve2({
              isValid: false,
              message: "A Job defines a folder template for generating the tasks that execute a Wizzi production already exists"
            });
          }
          resolve2({
            isValid: true
          });
        }
      );
    }
  );
}
async function getJobProductionList(options) {
  options = options || {};
  const JobProduction = GetJobProductionModel();
  return new Promise(
    (resolve2, reject) => {
      const query = JobProduction.find(options.query);
      if (options.limit) {
        query.limit(options.limit);
      }
      if (options.sort) {
        query.sort(options.sort);
      }
      query.find(
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname8, "getJobProductionList", "JobProduction.find", "error", err);
            return reject(err);
          }
          const resultItem = [];
          var i, i_items = result, i_len = result.length, item;
          for (i = 0; i < i_len; i++) {
            item = result[i];
            const item_obj = {
              _id: item._id,
              id: item.id,
              owner: item.owner,
              name: item.name,
              description: item.description,
              packiFiles: item.packiFiles
            };
            resultItem.push(item_obj);
          }
          resolve2({
            oper: "getJobProductionList",
            ok: true,
            item: resultItem
          });
        }
      );
    }
  );
}
async function getJobProduction(owner, name2) {
  const JobProduction = GetJobProductionModel();
  return new Promise(
    (resolve2, reject) => {
      let query = {
        owner,
        name: name2
      };
      JobProduction.find(
        query,
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname8, "getJobProduction", "JobProduction.find", "error", err);
            return reject(err);
          }
          if (result.length == 1) {
            return resolve2({
              oper: "get",
              ok: true,
              item: result[0]
            });
          }
          resolve2({
            oper: "get",
            ok: false,
            message: "A Job defines a folder template for generating the tasks that execute a Wizzi production not found"
          });
        }
      );
    }
  );
}
async function getJobProductionById(id) {
  const JobProduction = GetJobProductionModel();
  return new Promise(
    (resolve2, reject) => {
      JobProduction.find(
        {
          _id: id
        },
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname8, "getJobProduction", "JobProduction.find", "error", err);
            return reject(err);
          }
          if (result.length == 1) {
            return resolve2({
              oper: "get",
              ok: true,
              item: result[0]
            });
          }
          resolve2({
            oper: "getJobProduction",
            ok: false,
            message: "A Job defines a folder template for generating the tasks that execute a Wizzi production not found"
          });
        }
      );
    }
  );
}
async function getJobProductionObject(owner, name2, loadPackiConfig) {
  return new Promise(
    (resolve2, reject) => getJobProduction(owner, name2).then(
      (result) => {
        if (!result.ok) {
          return reject(result);
        }
        const job = result.item;
        return resolve2(_createJobProductionObject(job, loadPackiConfig));
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.jobProduction.getJobProductionObject.getJobProduction.error", err);
        return reject(err);
      }
    )
  );
}
async function getJobProductionObjectById(id, loadPackiConfig) {
  return new Promise(
    (resolve2, reject) => getJobProductionById(id).then(
      (result) => {
        if (!result.ok) {
          return reject(result);
        }
        const job = result.item;
        return resolve2(_createJobProductionObject(job, loadPackiConfig));
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.jobProduction.getJobProductionObjectById.getJobProductionById.error", err);
        return reject(err);
      }
    )
  );
}
async function _createJobProductionObject(job, loadPackiConfig) {
  return new Promise(
    (resolve2, reject) => {
      const job_packiFiles_object = JSON.parse(job.packiFiles);
      const obj = {
        ...job._doc,
        packiFiles: job_packiFiles_object,
        _id: job._id.toString(),
        packiProduction: "JobProduction",
        configPackiFile: job_packiFiles_object[constants_default.packiConfigPath],
        packiConfigJsonObj: null
      };
      if (loadPackiConfig) {
        if (!obj.configPackiFile) {
          return reject({
            message: "Missing file " + constants_default.packiConfigPath + " in JobProduction"
          });
        }
        productions_exports.generateArtifact(constants_default.packiConfigPath, {
          [constants_default.packiConfigPath]: {
            type: obj.configPackiFile.type,
            contents: obj.configPackiFile.contents
          }
        }, {}).then(
          (generationResult) => {
            obj.packiConfigJsonObj = JSON.parse(generationResult.artifactContent);
            return resolve2(obj);
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.jobProduction.getJobProductionObject._createJobProductionObject.error", err);
            return reject(err);
          }
        );
      } else {
        return resolve2(obj);
      }
    }
  );
}
async function createJobProduction(owner, name2, description, packiFiles) {
  const JobProduction = GetJobProductionModel();
  return new Promise(
    (resolve2, reject) => {
      let query = {
        owner,
        name: name2
      };
      JobProduction.find(
        query,
        // loog myname, 'getJobProduction', 'JobProduction.find', 'result', result
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname8, "getJobProduction", "JobProduction.find", "error", err);
            return reject(err);
          }
          if (result.length > 0) {
            return resolve2({
              oper: "create",
              ok: false,
              message: "A Job defines a folder template for generating the tasks that execute a Wizzi production already exists"
            });
          }
          const newJobProduction = new JobProduction({
            owner,
            name: name2,
            description,
            packiFiles,
            created_at: /* @__PURE__ */ new Date(),
            updated_at: /* @__PURE__ */ new Date()
          });
          newJobProduction.save(function(err2, doc) {
            if (err2) {
              console.log("\x1B[31m%s\x1B[0m", myname8, "createJobProduction", "newJobProduction.save", "error", err2);
              return reject(err2);
            }
            return resolve2({
              oper: "createJobProduction",
              ok: true,
              item: doc._doc,
              message: "A Job defines a folder template for generating the tasks that execute a Wizzi production created"
            });
          });
        }
      );
    }
  );
}
async function updateJobProduction(id, owner, name2, description, packiFiles) {
  const JobProduction = GetJobProductionModel();
  return new Promise(
    (resolve2, reject) => {
      var query;
      if (id && id.length > 0) {
        query = {
          _id: id
        };
      } else {
        query = {
          owner,
          name: name2
        };
      }
      const update = {};
      if (typeof owner !== "undefined") {
        update["owner"] = owner;
      }
      if (typeof name2 !== "undefined") {
        update["name"] = name2;
      }
      if (typeof description !== "undefined") {
        update["description"] = description;
      }
      if (typeof packiFiles !== "undefined") {
        update["packiFiles"] = packiFiles;
      }
      update["updated_at"] = /* @__PURE__ */ new Date();
      JobProduction.findOneAndUpdate(
        query,
        update,
        {},
        (err, result) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname8, "updateJobProduction", "JobProduction.findOneAndUpdate", "error", err);
            return reject(err);
          }
          if (!result) {
            console.log("\x1B[31m%s\x1B[0m", myname8, "updateJobProduction", "JobProduction.findOneAndUpdate", "error", "document not found");
            return reject({
              oper: "updateJobProduction",
              ok: false,
              message: "A Job defines a folder template for generating the tasks that execute a Wizzi production document not found: " + id
            });
          }
          return resolve2({
            oper: "updateJobProduction",
            ok: true,
            message: "A Job defines a folder template for generating the tasks that execute a Wizzi production updated"
          });
        }
      );
    }
  );
}
async function deleteJobProduction(id, owner, name2) {
  const JobProduction = GetJobProductionModel();
  return new Promise(
    (resolve2, reject) => {
      var query;
      if (id && id.length > 0) {
        query = {
          _id: id
        };
      } else {
        query = {
          owner,
          name: name2
        };
      }
      JobProduction.deleteOne(
        query,
        (err) => {
          if (err) {
            console.log("\x1B[31m%s\x1B[0m", myname8, "deleteJobProduction", "JobProduction.deleteOne", "error", err);
            return reject(err);
          }
          resolve2({
            oper: "deleteJobProduction",
            ok: true,
            message: "A Job defines a folder template for generating the tasks that execute a Wizzi production"
          });
        }
      );
    }
  );
}
async function mergeJobProductionFiles(owner, name2, tobeMergedPackiFiles, options) {
  return new Promise(
    (resolve2, reject) => getJobProductionObject(owner, name2, false).then(
      (itemObject) => {
        const newPackiFiles = mergePackiFiles(itemObject.packiFiles, tobeMergedPackiFiles, options);
        updateJobProduction(itemObject._id, itemObject.owner, itemObject.name, itemObject.description, JSON.stringify(newPackiFiles)).then(
          (result) => resolve2(result)
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.jobProduction.mergeJobProductionFiles.updateJobProduction.error", err);
            return reject(err);
          }
        );
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.jobProduction.mergeJobProductionFiles.getJobProductionObject.error", err);
        return reject(err);
      }
    )
  );
}
async function getJobProduction_withCache(owner, name2) {
  var cacheKey = owner + "|" + name2;
  return new Promise(
    (resolve2, reject) => {
      let jpValue = {
        packiFiles: {}
      };
      getJobProduction(owner, name2).then(
        (result) => {
          if (!result.ok) {
            return reject(result);
          }
          const jp = result.item;
          const jp_packiFiles_object = JSON.parse(jp.packiFiles);
          jpValue = {
            packiFiles: jp_packiFiles_object
          };
          return resolve2(jpValue);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "getJobProduction_withCache.getJobProduction.error", err);
          return reject(err);
        }
      );
    }
  );
}
function invalidateCache6(owner, name2) {
  var cacheKey = owner + "|" + name2;
  jobProductionCache.del(cacheKey);
}

// src/features/wizziHubProductions/controllers/job.tsx
function renderPageForm6(req, res, data, queryParams) {
  const index = "<!DOCTYPE html>" + import_server8.default.renderToStaticMarkup(
    /* @__PURE__ */ import_react10.default.createElement(PageFormDocument, { data, queryParams })
  );
  res.set("Content-Type", "text/html");
  res.set("Content-Length", index.length.toString());
  res.send(index);
}
function getPackiConfigFile6() {
  return {
    [".packi/config.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    { meta",
        '        $$ name "..name.."',
        '        { metaCtx"',
        '            kind "artifact" $$ file|artifact',
        '            $$ filePath ".packi/metaCtx.json.ittf" $$ when kind = "file"',
        "            { artifact",
        '                $$ name "..name.." $$ when kind = "artifact"',
        "            [ contexts",
        "                {",
        '                    $$ propertyName "..name.."',
        '                    $$ artifactName "..name.."',
        "    [ tfolders",
        "        {",
        '            $$ name "..name.."',
        "    [ contexts",
        "        {",
        '            $$ propertyName "..name.."',
        '            $$ artifactName "..name.."'
      ].join("\n")
    },
    [".packi/parameters/index.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    [ parameters",
        "        {",
        '            name "name"',
        '            type "string"',
        "        string$( kind )"
      ].join("\n")
    },
    [".packi/parameters/t/string.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "string"',
        "    $hook"
      ].join("\n")
    },
    [".packi/parameters/t/boolean.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "boolean"',
        "    $hook"
      ].join("\n")
    },
    [".packi/parameters/t/integer.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "integer"',
        "    $hook"
      ].join("\n")
    },
    [".packi/parameters/t/object.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "object"',
        "    [ parameters",
        "        $hook"
      ].join("\n")
    },
    [".packi/parameters/t/array.json.ittf"]: {
      type: "CODE",
      contents: [
        "{",
        "    $params name",
        '    name "${name}"',
        '    type "array"',
        "    { item",
        "        [ parameters",
        "            $hook"
      ].join("\n")
    },
    [".db/metaProductionSelections.json"]: {
      type: "CODE",
      contents: [
        "{",
        '    "metaCategories": [',
        "       {",
        '          "name": "..."',
        "       }",
        "    ],",
        '    "metaProductions": [',
        "       {",
        '          "name": "..."',
        "       }",
        "    ]",
        "}"
      ].join("\n")
    }
  };
}
function makeHandlerAwareOfAsyncErrors16(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var JobProductionController = class {
  path = "/job";
  router = (0, import_express19.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering JobProductionController.initialize");
    this.router.get("/new", makeHandlerAwareOfAsyncErrors16(this.getNewJobForm));
    this.router.post("/new", makeHandlerAwareOfAsyncErrors16(this.postJob));
    this.router.get("/update/:id", makeHandlerAwareOfAsyncErrors16(this.getUpdateJobForm));
    this.router.post("/update", makeHandlerAwareOfAsyncErrors16(this.putJob));
    this.router.get("/delete/:id", makeHandlerAwareOfAsyncErrors16(this.getDeleteJobForm));
    this.router.post("/delete", makeHandlerAwareOfAsyncErrors16(this.deleteJob));
  };
  getNewJobForm = async (request, response) => renderPageForm6(request, response, {
    type: "success",
    formName: "CreateJob",
    formData: {
      owner: request.session.user.username
    }
  }, {});
  postJob = async (request, response) => getTemplatePackiFiles(request.body.meta_id, request.body.meta_propsValues ? JSON.parse(request.body.meta_propsValues) : {}, request.query.context, request.body.context ? JSON.parse(request.body.context) : {}, {
    wizziSchema: "js",
    mainIttf: "index.js.ittf"
  }).then(
    (packiFiles) => createJobProduction(request.session.user.username, request.body.job_name, request.body.job_description, JSON.stringify(mergePackiFiles(packiFiles, getPackiConfigFile6()))).then(
      (result) => {
        if (result.ok) {
          response.redirect("/~~/j/" + request.session.user.username + "/" + request.body.job_name);
        } else {
          response.render("error.html.ittf", {
            message: "creating a new job production",
            error: result
          });
        }
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        response.render("error.html.ittf", {
          message: "creating a new job production",
          error: err
        });
      }
    )
  ).catch(
    (err) => {
      if (typeof err === "object" && err !== null) {
      }
      response.render("error.html.ittf", {
        message: "getting template packi files while creating a new job production",
        error: err
      });
    }
  );
  getUpdateJobForm = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getJobProductionObjectById(id).then(
      (result) => renderPageForm6(request, response, {
        type: "success",
        formName: "UpdateJobProduction",
        formData: {
          _id: id,
          owner: result.owner,
          name: result.name,
          description: result.description
        }
      }, {})
    );
  };
  putJob = async (request, response) => {
    const obj = request.body;
    updateJobProduction(obj.job_id, obj.job_owner, obj.job_name, obj.job_description).then(
      (result) => {
        if (result.ok) {
          response.redirect("/productions/job");
        } else {
          response.render("error.html.ittf", {
            message: "updating a job production",
            error: result
          });
        }
      }
    );
  };
  getDeleteJobForm = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getJobProductionObjectById(id).then(
      (result) => renderPageForm6(request, response, {
        type: "success",
        formName: "DeleteJobProduction",
        formData: {
          _id: result._id,
          owner: result.owner,
          name: result.name,
          description: result.description
        }
      }, {})
    );
  };
  deleteJob = async (request, response) => {
    const obj = request.body;
    deleteJobProduction(obj.job_id, obj.job_owner, obj.job_name).then(
      (result) => {
        if (result.ok) {
          response.redirect("/productions/job");
        } else {
          response.render("error.html.ittf", {
            message: "deleting a job production",
            error: result
          });
        }
      }
    );
  };
};

// src/features/wizziHubProductions/controllers/apiv1job.tsx
var import_express20 = require("express");
function makeHandlerAwareOfAsyncErrors17(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var ApiV1JobProductionController = class {
  path = "/api/v1/production/job";
  router = (0, import_express20.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering ApiV1JobProductionController.initialize");
    this.router.get("/:owner", makeHandlerAwareOfAsyncErrors17(this.getJobs));
    this.router.get("/checkname/:owner/:name", makeHandlerAwareOfAsyncErrors17(this.getCheckJobName));
    this.router.get("/:owner/:name", makeHandlerAwareOfAsyncErrors17(this.getJob));
    this.router.put("/:id", makeHandlerAwareOfAsyncErrors17(this.putJob));
    this.router.put("/packidiffs/:id", makeHandlerAwareOfAsyncErrors17(this.putJobPackiDiffs));
    this.router.post("/:post", makeHandlerAwareOfAsyncErrors17(this.postJob));
  };
  getJobs = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getJobProductionList({
      query: {
        owner
      }
    }).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "getJobs.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  getCheckJobName = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    validateJobProduction(owner, name2).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        sendFailure(response, {
          err
        }, 501);
      }
    );
  };
  getJob = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getJobProduction(owner, name2).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "getJob.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  postJob = async (request, response) => {
    var __check = restParamsCheck(request);
    var owner = __check.notEmpty("params", "owner");
    var name2 = __check.notEmpty("params", "name");
    var description = __check.notEmpty("body", "description");
    var packiFiles = __check.notEmpty("body", "packiFiles");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    createJobProduction(owner, name2, description, JSON.stringify(packiFiles)).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "postJob.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  putJob = async (request, response) => {
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    var owner = __check.notEmpty("body", "owner");
    var name2 = __check.notEmpty("body", "name");
    var description = __check.notEmpty("body", "description");
    var packiFiles = __check.notEmpty("body", "packiFiles");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    updateJobProduction(id, owner, name2, description, JSON.stringify(packiFiles)).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "putJob.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  putJobPackiDiffs = async (request, response) => {
    console.log("putJobPackiDiffs.request.params", request.params, __filename);
    console.log("putJobPackiDiffs.request.body.packiDiffs", Object.keys(request.body.packiDiffs), __filename);
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    getJobProductionObjectById(id).then(
      (prevJob) => {
        console.log("putJobPackiDiffs.prevPackiFiles", Object.keys(prevJob.packiFiles), __filename);
        const pm = new PackiBuilder(prevJob.packiFiles);
        pm.applyPatch_ChangesOnly(request.body.packiDiffs);
        return exec_updateJobProduction(request, response, pm.packiFiles);
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "putJobPackiDiffs.getJobProductionObjectById.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
};
function exec_updateJobProduction(request, response, packiFiles) {
  var __check = restParamsCheck(request);
  var id = __check.optional("params", "id");
  var owner = __check.optional("body", "owner");
  var name2 = __check.optional("body", "name");
  var description = __check.optional("body", "description");
  if (__check.hasErrors()) {
    return __check.sendErrors(response);
  }
  updateJobProduction(id, owner, name2, description, JSON.stringify(packiFiles)).then(
    (result) => {
      invalidateCache6(id);
      sendSuccess(response, result);
    }
  ).catch(
    (err) => {
      if (typeof err === "object" && err !== null) {
      }
      console.log("\x1B[31m%s\x1B[0m", "exec_updateJobProduction.updateJobProduction.error", err);
      sendFailure(response, {
        err: err && err.message
      }, 501);
    }
  );
}

// src/features/wizziHubProductions/controllers/apiv1generations.ts
var import_express21 = require("express");
var myname9 = "features/wizziHubProductions/controllers/apiv1generations";
function makeHandlerAwareOfAsyncErrors18(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var ApiV1GenerationsController = class {
  path = "/api/v1/production/generations";
  router = (0, import_express21.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering ApiV1GenerationsController.initialize");
    this.router.post("/mtree/:id", makeHandlerAwareOfAsyncErrors18(this.mTree));
    this.router.post("/mtreescript/:id", makeHandlerAwareOfAsyncErrors18(this.mTreeBuildUpScript));
    this.router.post("/artifact/:id", makeHandlerAwareOfAsyncErrors18(this.generateArtifact));
    this.router.post("/transform/:id/:transformer", makeHandlerAwareOfAsyncErrors18(this.transformModel));
    this.router.post("/job", makeHandlerAwareOfAsyncErrors18(this.executeJob));
    this.router.post("/wizzify", makeHandlerAwareOfAsyncErrors18(this.wizzify));
    this.router.post("/codeast", makeHandlerAwareOfAsyncErrors18(this.codeAST));
  };
  mTree = async (request, response) => {
    const owner = request.session.user.username;
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    const req_files = request.body.packiFiles;
    const productionKind = request.body.productionKind;
    const productionName = request.body.productionName;
    production_exports.prepareProduction(productionKind, owner, productionName, "", {}).then(
      (packageProductionSet) => productions_exports.mTree(id, packageProductionSet.packiFiles, packageProductionSet.context).then(
        (result) => sendSuccess(response, {
          mTreeIttf: result.mTreeIttf
        })
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.controllers.apiv1generationss.mTree.execute.error", err);
          sendFailure(response, {
            err: err && err.message
          }, 501);
        }
      )
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.controllers.apiv1generations.mTree.prepareProduction.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  mTreeBuildUpScript = async (request, response) => {
    const owner = request.session.user.username;
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    const req_files = request.body.packiFiles;
    const productionKind = request.body.productionKind;
    const productionName = request.body.productionName;
    production_exports.prepareProduction(productionKind, owner, productionName, "", {}).then(
      (packageProductionSet) => productions_exports.mTreeBuildUpScript(id, packageProductionSet.packiFiles, packageProductionSet.context).then(
        (result) => sendSuccess(response, result)
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.controllers.apiv1generations.mTreeBuildUpScript.execute.error", err);
          sendFailure(response, {
            err: err && err.message
          }, 501);
        }
      )
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.controllers.apiv1generations.mTreeBuildUpScript.prepareProduction.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  generateArtifact = async (request, response) => {
    const owner = request.session.user.username;
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    const req_files = request.body.packiFiles;
    const productionKind = request.body.productionKind;
    const productionName = request.body.productionName;
    console.log(myname9, "generateArtifact.id, productionKind,  productionName, files", id, productionKind, productionName, Object.keys(req_files), __filename);
    production_exports.prepareProduction(productionKind, owner, productionName, "", {}).then(
      (packageProductionSet) => {
        console.log(myname9, "generateArtifact.prepareProduction.context", packageProductionSet.context, __filename);
        productions_exports.generateArtifact(id, packageProductionSet.packiFiles, packageProductionSet.context).then(
          (value) => {
            console.log(myname9, "generateArtifact.result", value, __filename);
            sendSuccess(response, {
              generatedArtifact: value
            });
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.controllers.apiv1generations.generateArtifact.execute.error", err);
            sendFailure(response, {
              err: err && err.message
            }, 501);
          }
        );
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.controllers.apiv1generations.generateArtifact.prepareProduction.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  transformModel = async (request, response) => {
    const owner = request.session.user.username;
    var __check = restParamsCheck(request);
    var id = __check.notEmpty("params", "id");
    var transformer = __check.notEmpty("params", "transformer");
    if (__check.hasErrors()) {
      return __check.sendErrors(response);
    }
    const req_files = request.body.packiFiles;
    const productionKind = request.body.productionKind;
    const productionName = request.body.productionName;
    production_exports.prepareProduction(productionKind, owner, productionName, "", {}).then(
      (packageProductionSet) => productions_exports.loadAndTransformModel(id, packageProductionSet.packiFiles, packageProductionSet.context, {
        transformer
      }).then(
        (value) => sendSuccess(response, {
          transformedModel: value.transformResult
        })
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.controllers.apiv1generations.transformModel.execute.error", err);
          sendFailure(response, {
            err: err && err.message
          }, 501);
        }
      )
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.controllers.apiv1generations.transformModel.prepareProduction.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  executeJob = async (request, response) => {
    const owner = request.session.user.username;
    const req_files = request.body.packiFiles;
    const productionKind = request.body.productionKind;
    const productionName = request.body.productionName;
    production_exports.prepareProduction(productionKind, owner, productionName, "", {}).then(
      (packageProductionSet) => productions_exports.executeJobs(packageProductionSet.packiFiles, packageProductionSet.context).then(
        async (fsJson) => {
          const files = await factory_exports.extractGeneratedFiles(fsJson);
          sendSuccess(response, {
            generatedArtifacts: files
          });
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.controllers.apiv1generations.executeJob.execute.error", err);
          sendFailure(response, {
            err: err && err.message
          }, 501);
        }
      )
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.controllers.apiv1generations.executeJob.prepareProduction.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  wizzify = async (request, response) => {
    const files = request.body.packiFiles;
    if (files) {
    }
    productions_exports.wizzify(files).then(
      async (result) => sendSuccess(response, {
        wizzifiedPackiFiles: result
      })
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.controllers.apiv1generations.wizzify.execute.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
  codeAST = async (request, response) => {
    const files = request.body.packiFiles;
    if (files) {
    }
    productions_exports.getCodeAST(files).then(
      async (result) => sendSuccess(response, {
        codeASTPackiFiles: result
      })
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.controllers.apiv1generations.codeAST.execute.error", err);
        sendFailure(response, {
          err: err && err.message
        }, 501);
      }
    );
  };
};

// src/features/wizziHubProductions/api/production.ts
var production_exports = {};
__export(production_exports, {
  getCliCtxFromPackiConfig: () => getCliCtxFromPackiConfig,
  getCliCtxFromPackiFile: () => getCliCtxFromPackiFile,
  getProductionById: () => getProductionById,
  getProductionObject: () => getProductionObject,
  getTFoldersPackiFilesFromPackiConfigJson: () => getTFoldersPackiFilesFromPackiConfigJson,
  prepareProduction: () => prepareProduction,
  prepareProductionById: () => prepareProductionById
});
var myname10 = "features.wizziHubProductions.api.production";
function setupProductionObject(productionType, productionObject) {
  productionObject.packiProduction = productionType;
  productionObject.configPackiFile = productionObject.packiFiles[constants_default.packiConfigPath];
  if (!productionObject.configPackiFile) {
    productionObject.configPackiFile = {
      tfolders: [],
      contexts: []
    };
  }
  return productionObject;
}
async function getProductionById(productionType, id) {
  return new Promise(
    (resolve2, reject) => {
      if (productionType == "artifact") {
        getArtifactProductionById(id).then(
          (result) => {
            if (result.ok) {
              resolve2(result.item);
            } else {
              reject(result);
            }
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.production.getProductionById.getArtifactProductionById.error", err);
            return reject(err);
          }
        );
      } else if (productionType == "package") {
        getPackageProductionById(id).then(
          (result) => {
            if (result.ok) {
              resolve2(result.item);
            } else {
              reject(result);
            }
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.production.getProductionById.getPackageProductionById.error", err);
            return reject(err);
          }
        );
      } else if (productionType == "meta") {
        getMetaProductionById(id).then(
          (result) => {
            if (result.ok) {
              resolve2(result.item);
            } else {
              reject(result);
            }
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.production.getProductionById.getMetaProductionById.error", err);
            return reject(err);
          }
        );
      } else if (productionType == "plugin") {
        getPluginProductionById(id).then(
          (result) => {
            if (result.ok) {
              resolve2(result.item);
            } else {
              reject(result);
            }
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.production.getProductionById.getPluginProductionById.error", err);
            return reject(err);
          }
        );
      } else if (productionType == "tfolder") {
        getTFolderProductionById(id).then(
          (result) => {
            if (result.ok) {
              resolve2(result.item);
            } else {
              reject(result);
            }
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.production.getProductionById.getTFolderProductionById.error", err);
            return reject(err);
          }
        );
      } else {
        throw new Error("features.wizziHubProductions.api.production.getProductionById: productionType " + productionType + " not implemented");
      }
    }
  );
}
async function getProductionObject(productionType, owner, name2) {
  return new Promise(
    (resolve2, reject) => {
      if (productionType == "artifact") {
        getArtifactProductionObject(owner, name2).then(
          (productionObject) => resolve2(setupProductionObject(productionType, productionObject))
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.production.getProductionObject.getArtifactProductionObject.error", err);
            return reject(err);
          }
        );
      } else if (productionType == "package") {
        getPackageProductionObject(owner, name2).then(
          (productionObject) => resolve2(setupProductionObject(productionType, productionObject))
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.production.getProductionObject.getPackageProductionObject.error", err);
            return reject(err);
          }
        );
      } else if (productionType == "meta") {
        getMetaProductionObject(owner, name2).then(
          (productionObject) => resolve2(setupProductionObject(productionType, productionObject))
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.production.getProductionObject.getMetaProductionObject.error", err);
            return reject(err);
          }
        );
      } else if (productionType == "plugin") {
        getPluginProductionObject(owner, name2).then(
          (productionObject) => resolve2(setupProductionObject(productionType, productionObject))
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.production.getProductionObject.getPluginProductionObject.error", err);
            return reject(err);
          }
        );
      } else if (productionType == "tfolder") {
        getTFolderProductionObject(owner, name2).then(
          (productionObject) => resolve2(setupProductionObject(productionType, productionObject))
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.production.getProductionObject.getTFolderObject.error", err);
            return reject(err);
          }
        );
      } else {
        throw new Error("features.wizziHubProductions.api.production.getProductionObject: productionType " + productionType + " not implemented");
      }
    }
  );
}
async function prepareProductionById(productionType, id, requestQueryContextParam, rootContext) {
  return new Promise(
    (resolve2, reject) => getProductionById(productionType, id).then(
      (productionItem) => prepareProduction(productionType, productionItem.owner, productionItem.name, requestQueryContextParam, rootContext).then(
        (result) => resolve2(result)
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.production.prepareProductionById.prepareProduction.error", err);
          return reject(err);
        }
      )
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.production.prepareProductionById.getProductionById.error", err);
        return reject(err);
      }
    )
  );
}
async function prepareProduction(productionType, owner, productionName, requestQueryContextParam, rootContext) {
  console.log(myname10 + "prepareProduction entered", owner, productionName, __filename);
  return new Promise(
    (resolve2, reject) => getDefaultContext_withCache(owner, rootContext).then(
      (defaultContext) => {
        console.log(myname10 + "prepareProduction.getDefaultContext_withCache completed", Object.keys(defaultContext), __filename);
        getProductionObject(productionType, owner, productionName).then(
          (productionObject) => {
            if (productionObject.configPackiFile) {
              getProductionSetFromProductionObject(owner, productionName, productionObject.configPackiFile, productionObject.packiFiles, defaultContext).then(
                (productionSet) => {
                  productionObject.packiFiles = productionSet.packiFiles;
                  productionObject.context = productionSet.context;
                  getProductionSetByQueryContext(owner, productionName, requestQueryContextParam, productionObject.packiFiles, productionObject.context).then(
                    (queryProductionSet) => {
                      productionObject.packiFiles = queryProductionSet.packiFiles;
                      productionObject.context = queryProductionSet.context;
                      resolve2(productionObject);
                    }
                  ).catch(
                    (err) => {
                      if (typeof err === "object" && err !== null) {
                      }
                      console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.production.prepareProduction.getContextByQueryContext.error", err);
                      return reject(err);
                    }
                  );
                }
              ).catch(
                (err) => {
                  if (typeof err === "object" && err !== null) {
                  }
                  console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.production.prepareProduction.getContextByProductionObject.error", err);
                  return reject(err);
                }
              );
            } else {
              getProductionSetByQueryContext(owner, productionName, requestQueryContextParam, productionObject.packiFiles, defaultContext).then(
                (queryProductionSet) => {
                  productionObject.packiFiles = queryProductionSet.packiFiles;
                  productionObject.context = queryProductionSet.context;
                  resolve2(productionObject);
                }
              ).catch(
                (err) => {
                  if (typeof err === "object" && err !== null) {
                  }
                  console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.production.prepareProduction.getContextByQueryContext.error", err);
                  return reject(err);
                }
              );
            }
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.production.prepareProduction.getProductionObject.error", err);
            return reject(err);
          }
        );
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "features.wizziHubProductions.api.production.prepareProduction.getDefaultContext_withCache.error", err);
        return reject(err);
      }
    )
  );
}
async function getProductionSetFromProductionObject(owner, productionName, configPackiFile, progressivePackiFiles, progressiveContext) {
  progressiveContext = Object.assign({}, progressiveContext, {
    ctxByProductionObject: "Hello by ProductionObject"
  });
  return new Promise(
    (resolve2, reject) => {
      if (configPackiFile) {
        productions_exports.generateArtifact(constants_default.packiConfigPath, {
          [constants_default.packiConfigPath]: {
            type: configPackiFile.type,
            contents: configPackiFile.contents
          }
        }, progressiveContext).then(
          (generationResult) => {
            const packiConfigJsonObj = JSON.parse(generationResult.artifactContent);
            getTFoldersPackiFilesFromPackiConfigJson(owner, packiConfigJsonObj).then(
              // if packiConfigJsonObj does not contain tfolders an empty object is returned
              (tFoldersPackiFiles) => {
                progressivePackiFiles = mergePackiFiles(progressivePackiFiles, tFoldersPackiFiles);
                addContextPropertiesFromPackiConfigJson(owner, packiConfigJsonObj, progressiveContext).then(
                  (resultProductionContext) => {
                    return resolve2({
                      packiFiles: progressivePackiFiles,
                      context: resultProductionContext
                    });
                  }
                ).catch(
                  (err) => {
                    if (typeof err === "object" && err !== null) {
                    }
                    console.log("\x1B[31m%s\x1B[0m", "getArtifactGeneration.addContextPropertiesFromPackiConfigJson.error", err);
                    return reject(err);
                  }
                );
              }
            ).catch(
              (err) => {
                if (typeof err === "object" && err !== null) {
                }
                console.log("\x1B[31m%s\x1B[0m", "getArtifactGeneration.getTFoldersPackiFilesFromPackiConfigJson.error", err);
                return reject(err);
              }
            );
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "getArtifactGeneration.generateArtifact.error", err);
            return reject(err);
          }
        );
      } else {
        resolve2({
          packiFiles: progressivePackiFiles,
          context: progressiveContext
        });
      }
    }
  );
}
async function getTFoldersPackiFilesFromPackiConfigJson(owner, packiConfigJsonObj) {
  return new Promise(
    (resolve2, reject) => {
      var tFoldersPackiFiles = {};
      const hasTFolders = packiConfigJsonObj && packiConfigJsonObj.tfolders && packiConfigJsonObj.tfolders.length > 0;
      if (!hasTFolders) {
        return resolve2(tFoldersPackiFiles);
      }
      var j = 0;
      (function next() {
        var tfolder = packiConfigJsonObj.tfolders[j++];
        if (!tfolder) {
          return resolve2(tFoldersPackiFiles);
        }
        if (!tfolder.name) {
          return next();
        }
        getTFolderProduction(owner, tfolder.name).then(
          (result) => {
            const tf = result.item;
            const tf_packiFiles_object = JSON.parse(tf.packiFiles);
            tFoldersPackiFiles = mergePackiFiles(tFoldersPackiFiles, tf_packiFiles_object);
            next();
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "getTFoldersPackiFilesFromPackiConfigJson.getTFolder.error", err);
            return reject(err);
          }
        );
      })();
    }
  );
}
async function addContextPropertiesFromPackiConfigJson(owner, packiConfigJsonObj, progressiveContext) {
  return new Promise(
    (resolve2, reject) => {
      if (!!(packiConfigJsonObj && packiConfigJsonObj.contexts && packiConfigJsonObj.contexts.length > 0) == false) {
        return resolve2(progressiveContext);
      }
      var j = 0;
      (function next() {
        var contextConfig = packiConfigJsonObj.contexts[j++];
        if (!contextConfig) {
          return resolve2(progressiveContext);
        }
        if (!contextConfig.propertyName || !contextConfig.artifactName) {
          return next();
        }
        getArtifactContextItem(owner, contextConfig.propertyName + ";" + contextConfig.artifactName + (contextConfig.transformationName ? ";" + contextConfig.transformationName : ""), progressiveContext).then(
          (resultContextItem) => {
            progressiveContext = Object.assign({}, progressiveContext, resultContextItem);
            next();
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "addContextPropertiesFromPackiConfigJson.getArtifactContextItem.error", err);
            return reject(err);
          }
        );
      })();
    }
  );
}
async function getProductionSetByQueryContext(owner, productionName, requestQueryContextParamString, progressivePackiFiles, progressiveContext) {
  progressiveContext = Object.assign({}, progressiveContext, {
    ctxByQueryContext: "Hello by QueryContext"
  });
  return new Promise(
    (resolve2, reject) => {
      if (requestQueryContextParamString && requestQueryContextParamString.length > 0) {
        const requestQueryContextParamItems = requestQueryContextParamString.split("|");
        var j = 0;
        (function next() {
          var requestQueryContextParamItem = requestQueryContextParamItems[j++];
          if (!requestQueryContextParamItem) {
            return resolve2({
              packiFiles: progressivePackiFiles,
              context: progressiveContext
            });
          }
          getArtifactContextItem(owner, requestQueryContextParamItem, progressiveContext).then(
            (resultItemContext) => {
              progressiveContext = Object.assign({}, progressiveContext, resultItemContext);
              next();
            }
          ).catch(
            (err) => {
              if (typeof err === "object" && err !== null) {
              }
              console.log("\x1B[31m%s\x1B[0m", "getProductionSetByQueryContext.getArtifactContextItem.error", err);
              return reject(err);
            }
          );
        })();
      } else {
        resolve2({
          packiFiles: progressivePackiFiles,
          context: progressiveContext
        });
      }
    }
  );
}
async function getCliCtxFromPackiConfig(owner, packiConfigJsonObj, packiFiles, progressiveContext) {
  return new Promise(
    (resolve2, reject) => {
      if (!packiConfigJsonObj.meta || !packiConfigJsonObj.meta.metaCtx) {
        return resolve2({});
      }
      const kind = packiConfigJsonObj.meta.metaCtx.kind;
      let filePath;
      let artifact;
      if (kind == "file") {
        filePath = packiConfigJsonObj.meta.metaCtx.filePath;
        return resolve2(getCliCtxFromPackiFile(filePath, packiFiles, progressiveContext));
      } else if (kind == "artifact") {
        artifact = packiConfigJsonObj.meta.metaCtx.artifact;
        getArtifactGeneration_withPrepare(owner, packiConfigJsonObj.meta.metaCtx.artifact.name, "", progressiveContext, "").then(
          (generationResult) => resolve2(JSON.parse(generationResult.content))
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "api.production.getCliCtxFromPackiConfig.getArtifactGeneration_withPrepare.error", err);
            return reject(err);
          }
        );
      } else {
        return resolve2({});
      }
    }
  );
}
async function getCliCtxFromPackiFile(filePath, packiFiles, progressiveContext) {
  return new Promise(
    (resolve2, reject) => productions_exports.generateArtifact(filePath, packiFiles, progressiveContext).then(
      (generationResult) => resolve2(JSON.parse(generationResult.artifactContent))
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "api.production.getCliCtxFromPackiFile.generateArtifact.error", err);
        return reject(err);
      }
    )
  );
}

// src/features/wizziHubProductions/index.ts
var wizziHubProductionsModelBuilders = [
  ArtifactProductionModelBuilder,
  PackageProductionModelBuilder,
  PluginProductionModelBuilder,
  MetaProductionModelBuilder,
  TFolderProductionModelBuilder,
  JobProductionModelBuilder
];
var wizziHubProductionsControllers = [
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

// src/site/controllers/wizziHubProductions.ts
function makeHandlerAwareOfAsyncErrors19(handler) {
  return async function(request, response, next) {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (error instanceof FcError) {
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: error.code,
            message: error.message,
            data: error.data || {}
          }
        });
      } else {
        const fcError = new FcError(SYSTEM_ERROR);
        response.status(statusCode.BAD_REQUEST).send({
          error: {
            code: fcError.code,
            message: error.message,
            data: fcError.data || {}
          }
        });
      }
    }
  };
}
var WizziHubProductionsController = class {
  path = "/packi/productions";
  router = (0, import_express22.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering WizziHubProductionsController.initialize");
    this.router.get("/artifacts", makeHandlerAwareOfAsyncErrors19(this.artifacts));
    this.router.get("/packages", makeHandlerAwareOfAsyncErrors19(this.packages));
    this.router.get("/plugins", makeHandlerAwareOfAsyncErrors19(this.plugins));
    this.router.get("/metas", makeHandlerAwareOfAsyncErrors19(this.metas));
    this.router.get("/tfolders", makeHandlerAwareOfAsyncErrors19(this.tfolders));
    this.router.get("/jobs", makeHandlerAwareOfAsyncErrors19(this.jobs));
  };
  artifacts = async (request, response) => artifact_exports.getArtifactProductionList().then(
    (result) => response.render("wizziHub/productions/artifacts.html.ittf", {
      title: "Artifact productions \xB7 Wizzi",
      artifacts: result.item,
      __INITIAL_DATA__: `  window.__INITIAL_DATA__ = ${(0, import_jsesc3.default)({
        data: {
          type: "success",
          formName: "ListArtifactProduction",
          formData: {
            artifacts: result.item
          }
        },
        queryParams: {}
      }, {
        quotes: "double",
        isScriptContext: true
      })}`
    })
  ).catch(
    (err) => {
      console.log("\x1B[31m%s\x1B[0m", "artifact productions.error", err);
      var content = err;
      if (typeof err === "object" && err !== null) {
        content = "<html><body><pre><code>" + err.message + "</code></pre></body></html>";
      }
      sendHtml(response, content);
    }
  );
  packages = async (request, response) => package_exports.getPackageProductionList().then(
    (result) => response.render("wizziHub/productions/packages.html.ittf", {
      title: "Package productions \xB7 Wizzi",
      packages: result.item,
      __INITIAL_DATA__: `  window.__INITIAL_DATA__ = ${(0, import_jsesc3.default)({
        data: {
          type: "success",
          formName: "ListPackageProduction",
          formData: {
            packages: result.item
          }
        },
        queryParams: {}
      }, {
        quotes: "double",
        isScriptContext: true
      })}`
    })
  ).catch(
    (err) => {
      console.log("\x1B[31m%s\x1B[0m", "package productions.error", err);
      var content = err;
      if (typeof err === "object" && err !== null) {
        content = "<html><body><pre><code>" + err.message + "</code></pre></body></html>";
      }
      sendHtml(response, content);
    }
  );
  plugins = async (request, response) => plugin_exports.getPluginProductionList().then(
    (result) => response.render("wizziHub/productions/plugins.html.ittf", {
      title: "Plugin productions \xB7 Wizzi",
      plugins: result.item,
      __INITIAL_DATA__: `  window.__INITIAL_DATA__ = ${(0, import_jsesc3.default)({
        data: {
          type: "success",
          formName: "ListPluginProduction",
          formData: {
            plugins: result.item
          }
        },
        queryParams: {}
      }, {
        quotes: "double",
        isScriptContext: true
      })}`
    })
  ).catch(
    (err) => {
      console.log("\x1B[31m%s\x1B[0m", "plugin productions.error", err);
      var content = err;
      if (typeof err === "object" && err !== null) {
        content = "<html><body><pre><code>" + err.message + "</code></pre></body></html>";
      }
      sendHtml(response, content);
    }
  );
  metas = async (request, response) => meta_exports.getMetaProductionList().then(
    (result) => response.render("wizziHub/productions/metas.html.ittf", {
      title: "Meta productions \xB7 Wizzi",
      metas: result.item,
      __INITIAL_DATA__: `  window.__INITIAL_DATA__ = ${(0, import_jsesc3.default)({
        data: {
          type: "success",
          formName: "ListMetaProduction",
          formData: {
            metas: result.item
          }
        },
        queryParams: {}
      }, {
        quotes: "double",
        isScriptContext: true
      })}`
    })
  ).catch(
    (err) => {
      console.log("\x1B[31m%s\x1B[0m", "meta productions.error", err);
      var content = err;
      if (typeof err === "object" && err !== null) {
        content = "<html><body><pre><code>" + err.message + "</code></pre></body></html>";
      }
      sendHtml(response, content);
    }
  );
  tfolders = async (request, response) => tfolder_exports.getTFolderProductionList().then(
    (result) => response.render("wizziHub/productions/tfolders.html.ittf", {
      title: "tFolder \xB7 Wizzi",
      tfolders: result.item,
      __INITIAL_DATA__: `  window.__INITIAL_DATA__ = ${(0, import_jsesc3.default)({
        data: {
          type: "success",
          formName: "ListTFolder",
          formData: {
            tfolders: result.item
          }
        },
        queryParams: {}
      }, {
        quotes: "double",
        isScriptContext: true
      })}`
    })
  ).catch(
    (err) => {
      console.log("\x1B[31m%s\x1B[0m", "tFolders.error", err);
      var content = err;
      if (typeof err === "object" && err !== null) {
        content = "<html><body><pre><code>" + err.message + "</code></pre></body></html>";
      }
      sendHtml(response, content);
    }
  );
  jobs = async (request, response) => job_exports.getJobProductionList().then(
    (result) => response.render("wizziHub/productions/jobs.html.ittf", {
      title: "job \xB7 Wizzi",
      jobs: result.item,
      __INITIAL_DATA__: `  window.__INITIAL_DATA__ = ${(0, import_jsesc3.default)({
        data: {
          type: "success",
          formName: "ListJob",
          formData: {
            jobs: result.item
          }
        },
        queryParams: {}
      }, {
        quotes: "double",
        isScriptContext: true
      })}`
    })
  ).catch(
    (err) => {
      console.log("\x1B[31m%s\x1B[0m", "jobs.error", err);
      var content = err;
      if (typeof err === "object" && err !== null) {
        content = "<html><body><pre><code>" + err.message + "</code></pre></body></html>";
      }
      sendHtml(response, content);
    }
  );
};

// src/site/index.ts
var siteControllers = [
  new HomeController(),
  new DemoHomeController(),
  new DocsController(),
  new WizziHubProductionsController()
];

// src/features/wizziMeta/api/wizziMeta.ts
var import_utils38 = require("@wizzi/utils");
var file2 = import_utils38.fSystem.vfile();
async function getMetaParameters(options) {
  return new Promise(
    (resolve2, reject) => {
      const inMemoryMetas = options.inMemoryMetas || [];
      meta_exports.getInMemoryMetaPlugins(inMemoryMetas).then(
        // log 'wizziMeta.getMetaParameters.options', options
        async (inMemoryItems) => {
          console.log("wizziMeta.getMetaParameters.inMemoryItems", Object.keys(inMemoryItems), __filename);
          let jsonwf = await factory_exports.createJsonFsAndFactory({}, null, {
            inMemoryItems
          }, {});
          const mpOptions = {};
          if (options.metaProductions) {
            mpOptions.metaCtx = {};
            var i, i_items = options.metaProductions, i_len = options.metaProductions.length, prod;
            for (i = 0; i < i_len; i++) {
              prod = options.metaProductions[i];
              if (prod && prod.name && prod.name[0]) {
                const useProductionVar = "use" + prod.name[0].toUpperCase() + prod.name.substring(1);
                mpOptions.metaCtx[useProductionVar] = true;
              }
            }
          }
          jsonwf.wf.getMetaParameters(
            mpOptions,
            async (err, metaParameters) => {
              if (err) {
                return reject(err);
              }
              const metaParametersObj = {};
              for (var k in metaParameters) {
                const parts = k.split("/");
                if (parts.length == 3 && parts[2] == "index.json.ittf") {
                  const mpName = parts[1];
                  if (mpName) {
                    let mpObj = metaParametersObj[mpName];
                    if (!mpObj) {
                      mpObj = metaParametersObj[mpName] = {};
                    }
                    mpObj.index = k;
                    mpObj.metaProductionName = mpName;
                  }
                }
                if (parts.length == 3 && parts[2] == "globals.json.ittf") {
                  const mpName = parts[1];
                  if (mpName) {
                    let mpObj = metaParametersObj[mpName];
                    if (!mpObj) {
                      mpObj = metaParametersObj[mpName] = {};
                    }
                    mpObj.globals = k;
                    mpObj.metaProductionName = mpName;
                  }
                }
              }
              const metaParametersObjArray = Object.values(metaParametersObj);
              const jsonwf2 = await factory_exports.createJsonFsAndFactory(metaParameters, null, null, {});
              function generateJson(count) {
                const mpObj = metaParametersObjArray[count];
                if (!mpObj) {
                  const result = {
                    metaParametersObj,
                    packiFiles: metaParameters
                  };
                  return resolve2(result);
                }
                if (mpObj.index) {
                  jsonwf2.wf.loadModelAndGenerateArtifact(
                    factory_exports.ensurePackiFilePrefix(mpObj.index),
                    {
                      modelRequestContext: {},
                      artifactRequestContext: {}
                    },
                    "json/document",
                    (err2, result) => {
                      if (err2) {
                        return reject(err2);
                      }
                      mpObj.parametersIndexObj = JSON.parse(result);
                      if (mpObj.globals) {
                        jsonwf2.wf.loadModelAndGenerateArtifact(
                          factory_exports.ensurePackiFilePrefix(mpObj.globals),
                          {
                            modelRequestContext: {},
                            artifactRequestContext: {}
                          },
                          "json/document",
                          (err3, result2) => {
                            if (err3) {
                              return reject(err3);
                            }
                            mpObj.parametersGlobalsObj = JSON.parse(result2);
                            generateJson(count + 1);
                          }
                        );
                      } else {
                        generateJson(count + 1);
                      }
                    }
                  );
                } else {
                  if (mpObj.globals) {
                    jsonwf2.wf.loadModelAndGenerateArtifact(
                      factory_exports.ensurePackiFilePrefix(mpObj.globals),
                      {
                        modelRequestContext: {},
                        artifactRequestContext: {}
                      },
                      "json/document",
                      (err2, result) => {
                        if (err2) {
                          return reject(err2);
                        }
                        mpObj.parametersGlobalsObj = JSON.parse(result);
                        generateJson(count + 1);
                      }
                    );
                  } else {
                    generateJson(count + 1);
                  }
                }
              }
              generateJson(0);
            }
          );
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "wizziMeta.getMetaParameters.error", err);
          return reject(err);
        }
      );
    }
  );
}
async function getProvidedMetas(options) {
  const jsonwf = await factory_exports.createJsonFsAndFactory({}, null, null, {});
  return new Promise(
    (resolve2, reject) => {
      console.log("wizziMeta.getMetaProvides.options", options, __filename);
      jsonwf.wf.getProvidedMetas(
        (err, providedMetas) => {
          if (err) {
            return reject(err);
          }
          return resolve2(providedMetas);
        }
      );
    }
  );
}
async function executeMetaProduction2(options) {
  return new Promise(
    // log 'wizziMeta.executeMetaProduction.options', options
    (resolve2, reject) => createMetaCtx(options).then(
      // log 'wizziMeta.createWizziPackage.metaCtx', metaCtx
      (metaCtx) => {
        var pluginsBaseFolder = "C:/My/wizzi/stfnbssl/wizzi.plugins/packages";
        var metaPluginsBaseFolder = "C:/My/wizzi/stfnbssl/wizzi.metas/packages";
        var globalContext = {};
        productions_exports.executeMetaProduction(metaCtx, void 0, void 0, {}).then(
          (packiFiles) => {
            persistPackageFiles(packiFiles, options).then(
              (packiFiles2) => {
                return resolve2(packiFiles2);
              }
            ).catch(
              (err) => {
                if (typeof err === "object" && err !== null) {
                }
                console.log("\x1B[31m%s\x1B[0m", "wizziMeta.executeMetaProduction.persistPackageFiles.error", err);
                return reject(err);
              }
            );
          }
        ).catch(
          (err) => {
            if (typeof err === "object" && err !== null) {
            }
            console.log("\x1B[31m%s\x1B[0m", "wizziMeta.executeMetaProduction.executeMetaProduction.error", err);
            return reject(err);
          }
        );
      }
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        console.log("\x1B[31m%s\x1B[0m", "wizziMeta.executeMetaProduction.createMetaCtx.error", err);
        return reject(err);
      }
    )
  );
}
async function executeMetaProductionWithInMemoryPlugins(options) {
  return new Promise(
    (resolve2, reject) => {
      const inMemoryMetas = options.inMemoryMetas || [];
      meta_exports.getInMemoryMetaPlugins(inMemoryMetas).then(
        (inMemoryItems) => {
          console.log("wizziMeta.executeMetaProductionWithInMemoryPlugins.inMemoryItems", Object.keys(inMemoryItems), __filename);
          createMetaCtx(options).then(
            // log 'wizziMeta.createWizziPackage.metaCtx', metaCtx
            (metaCtx) => {
              var pluginsBaseFolder = "C:/My/wizzi/stfnbssl/wizzi.plugins/packages";
              var metaPluginsBaseFolder = "C:/My/wizzi/stfnbssl/wizzi.metas/packages";
              var globalContext = {};
              productions_exports.executeMetaProduction(metaCtx, void 0, void 0, {}, {
                inMemoryItems
              }).then(
                (packiFiles) => {
                  persistPackageFiles(packiFiles, options).then(
                    (packiFiles2) => {
                      return resolve2(packiFiles2);
                    }
                  ).catch(
                    (err) => {
                      if (typeof err === "object" && err !== null) {
                      }
                      console.log("\x1B[31m%s\x1B[0m", "wizziMeta.executeMetaProduction.persistPackageFiles.error", err);
                      return reject(err);
                    }
                  );
                }
              ).catch(
                (err) => {
                  if (typeof err === "object" && err !== null) {
                  }
                  console.log("\x1B[31m%s\x1B[0m", "wizziMeta.executeMetaProduction.executeMetaProduction.error", err);
                  return reject(err);
                }
              );
            }
          ).catch(
            (err) => {
              if (typeof err === "object" && err !== null) {
              }
              console.log("\x1B[31m%s\x1B[0m", "wizziMeta.executeMetaProduction.createMetaCtx.error", err);
              return reject(err);
            }
          );
        }
      );
    }
  );
}
async function createMetaCtx(options) {
  return new Promise(
    // log 'createMetaCtx.options.metaCtxFilepath', options.metaCtxFilepath
    (resolve2, reject) => {
      if (options.metaCtx) {
        return resolve2(options.metaCtx);
      }
      if (import_utils38.verify.isEmpty(options.metaCtxFilepath)) {
        return reject("wizziMeta.createMetaCtx. Missing both metaCtx and metaCtxFilepath: " + options.metaCtxFilepath);
      }
      productions_exports.loadModelFs(options.metaCtxFilepath, {
        metaCtx: {
          pkgName: options.outputPackageName,
          description: options.description || options.outputPackageName
        }
      }).then(
        (metaCtx) => {
          return resolve2(metaCtx);
        }
      ).catch(
        (err) => {
          if (typeof err === "object" && err !== null) {
          }
          console.log("\x1B[31m%s\x1B[0m", "wizziMeta.createMetaCtx.error", err);
          return reject(err);
        }
      );
    }
  );
}
async function persistPackageFiles(packiFiles, options) {
  return new Promise(
    (resolve2, reject) => {
      if (options.persist) {
        if (options.persist.type == "filesystem") {
          return resolve2(packiFiles);
        } else {
          return reject("wizziMeta.persistPackageFiles. Unknown persist type: " + options.persist.type);
        }
      } else {
        return resolve2(packiFiles);
      }
    }
  );
}

// src/features/wizziMeta/controllers/apiv1wizzimeta.ts
var import_express23 = require("express");
var ApiV1WizziMetaController = class {
  path = "/api/v1/meta";
  router = (0, import_express23.Router)();
  initialize = (app2, initValues) => {
    console.log("\x1B[33m%s\x1B[0m", "Entering ApiV1WizziMetaController.initialize");
    this.router.get("/provides", this.provides);
    this.router.post("/parameters", this.metaParameters);
    this.router.post("/execute", this.execute);
    this.router.post("/executeinmemory", this.executeinmemory);
  };
  provides = async (request, response) => getProvidedMetas({}).then(
    (result) => sendSuccess(response, result)
  ).catch(
    (err) => {
      if (typeof err === "object" && err !== null) {
      }
      sendFailure(response, {
        err
      }, 501);
    }
  );
  metaParameters = async (request, response) => {
    const metaRequest = request.body;
    getMetaParameters(metaRequest).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        sendFailure(response, {
          err
        }, 501);
      }
    );
  };
  execute = async (request, response) => {
    const metaRequest = request.body;
    executeMetaProduction2(metaRequest).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        sendFailure(response, {
          err
        }, 501);
      }
    );
  };
  executeinmemory = async (request, response) => {
    const metaRequest = request.body;
    executeMetaProductionWithInMemoryPlugins(metaRequest).then(
      (result) => sendSuccess(response, result)
    ).catch(
      (err) => {
        if (typeof err === "object" && err !== null) {
        }
        sendFailure(response, {
          err
        }, 501);
      }
    );
  };
};

// src/features/wizziMeta/index.ts
var wizziMetaControllers = [
  new ApiV1WizziMetaController()
];

// src/middlewares/cors.ts
var import_cors = __toESM(require("cors"));
var CorsMiddleware = (app2) => {
  app2.options("*", (0, import_cors.default)());
  app2.use((0, import_cors.default)());
  console.log("\x1B[32m%s\x1B[0m", "CorsMiddleware installed.");
};

// src/middlewares/session.ts
var import_express_session = __toESM(require("express-session"));
var SessionMiddleware = (app2) => {
  console.log("SessionMiddleware process.env.NODE_ENV: " + process.env.NODE_ENV);
  const cookieOptions = {
    // serve secure cookies, requires https
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: false,
    sameSite: "none",
    // expires in 14 days
    maxAge: 14 * 24 * 60 * 60 * 1e3
  };
  const sessionOptions = {
    name: "wizzi.hub.backend.sid",
    secret: config2.sessionSecret,
    resave: false,
    saveUninitialized: false
  };
  if (process.env.NODE_ENV == "production") {
    app2.set("trust proxy", 1);
  }
  app2.use((0, import_express_session.default)(sessionOptions));
  console.log("SessionMiddleware installed");
};

// src/middlewares/ittfStatic.ts
var import_util = __toESM(require("util"));
var import_path5 = __toESM(require("path"));
var import_fs2 = __toESM(require("fs"));
var import_json_stringify_safe3 = __toESM(require("json-stringify-safe"));
var import_parseurl = __toESM(require("parseurl"));
var IttfStaticMiddleware = (app2) => {
  console.log("IttfStaticMiddleware. Folder served from ", import_path5.default.resolve(__dirname, "..", "ittf"));
  app2.use("/ittf", ittfMiddleware(import_path5.default.resolve(__dirname, "..", "ittf"), "/ittf"));
};
function ittfMiddleware(basePath, routePath) {
  let store_siteCtx = null;
  function ittfContext(request, data) {
    const ctx = Object.assign({}, {
      baseUrl: "http://localhost:3003",
      request,
      locals: {
        user: request.session.user
      },
      siteCtx: store_siteCtx,
      isWizziStudio: true
    }, data || {});
    ctx.ittfCtx = ctx;
    return ctx;
  }
  return async (request, response, next) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return next();
    }
    const parsedUrl = (0, import_parseurl.default)(request);
    if (!parsedUrl || !parsedUrl.pathname) {
      return next();
    }
    const urlPathName = decodeURIComponent(parsedUrl.pathname);
    const pathname = urlPathName;
    const filePath = import_path5.default.join(basePath, pathname);
    const extname = import_path5.default.extname(filePath);
    var queryMeta = request.query.meta;
    var queryTransform = request.query.transform;
    if (import_fs2.default.existsSync(filePath) === false) {
      return next();
    }
    if (import_fs2.default.statSync(filePath).isDirectory()) {
      return sendFolderScan(filePath, basePath, queryMeta, request, response);
    }
    if (queryTransform && queryTransform.indexOf("/") > 0) {
      return sendTransform(filePath, queryTransform, response);
    }
    productions_exports.loadSiteJsonModel("sitectx.json.ittf").then(
      async (siteCtx) => {
        store_siteCtx = siteCtx;
        if (queryMeta && queryMeta === "html") {
          try {
            const documentState = await productions_exports.scanIttfDocumentFs(filePath, import_path5.default.dirname(basePath));
            const generated = await productions_exports.generateArtifactFs(config2.metaHtmlIttfPath, ittfContext(request, {
              wizzischema: "html",
              path: filePath,
              ds: documentState
            }));
            response.writeHead(200, {
              "Content-Type": "text/html",
              "Content-Length": generated.artifactContent.length
            });
            response.end(generated.artifactContent);
          } catch (ex) {
            sendError18(response, ex, {
              format: "json"
            });
          }
        } else {
          return contextLoader(filePath, request, function(err, modelContext) {
            if (err) {
              return sendError18(response, err, {
                format: "json"
              });
            }
            productions_exports.generateArtifactFs(filePath, Object.assign({}, modelContext, ittfContext(request))).then(
              (generated) => {
                response.writeHead(200, {
                  "Content-Type": generated.contentType,
                  "Content-Length": generated.artifactContent.length
                });
                response.end(generated.artifactContent);
              }
            ).catch(
              (err2) => {
                if (typeof err2 === "object" && err2 !== null) {
                }
                console.log("\x1B[31m%s\x1B[0m", "ittfStatic.wizziProds.generateArtifactFs.error", err2);
                sendFailure(response, {
                  err: err2
                }, 501);
              }
            );
          });
        }
      }
    );
  };
}
async function contextLoader(resourceFilePath, request, callback) {
  const contextRequest = request.query._context;
  if (contextRequest && contextRequest.length > 0) {
    const ss = contextRequest.split(";");
    const ctxRequests = [];
    ss.forEach(
      (element) => {
        const ctxRequest = {
          exportName: element,
          fullPath: void 0,
          relPath: void 0
        };
        const type_path = request.query["_" + element];
        if (!type_path) {
          return callback({
            requestedResource: resourceFilePath,
            message: "Missing query param for requested context model: " + element
          });
        }
        const tp = type_path.split(";");
        ctxRequest.type = tp[0];
        if (tp.length < 2) {
          ctxRequest.relPath = "./index." + tp[0] + ".ittf";
        } else {
          ctxRequest.relPath = tp[1];
        }
        if (ctxRequest.type === "cheatsheet") {
          ctxRequest.name = ctxRequest.relPath;
          ctxRequests.push(ctxRequest);
        } else {
          ctxRequest.fullPath = import_path5.default.join(import_path5.default.dirname(resourceFilePath), ctxRequest.relPath);
          ctxRequests.push(ctxRequest);
        }
      }
    );
    const resultContext = {};
    const repeatCount = ctxRequests.length;
    const repeat = (index) => {
      if (index == repeatCount) {
        return callback(null, resultContext);
      }
      const ctxRequest = ctxRequests[index];
      if (ctxRequest.type === "cheatsheet") {
        return callback("Context loader for cheatsheet type not implemented.");
      } else {
        productions_exports.loadModelFs(ctxRequest.fullPath, {
          isWizziStudio: true
        }).then(
          (model7) => {
            resultContext[ctxRequest.exportName] = model7;
            repeat(index + 1);
          }
        ).catch(
          (err) => callback(err)
        );
      }
    };
    repeat(0);
  } else {
    try {
      const twinJsonContext = await productions_exports.inferAndLoadContextFs(resourceFilePath, "wzCtx");
      return callback(null, twinJsonContext);
    } catch (ex) {
      return callback(ex);
    }
  }
}
async function sendFolderScan(folderPath, root, meta, request, response) {
  try {
    const folderState = await productions_exports.scanIttfFolder(folderPath, import_path5.default.dirname(root));
    const siteCtx = await productions_exports.loadSiteJsonModel("sitectx.json.ittf");
    if (meta === "json") {
      return sendJSONStringified(response, folderState);
    } else {
      const generated = await productions_exports.generateArtifactFs(config2.metaFolderIttfPath, {
        wizzischema: "html",
        path: folderPath,
        fs: folderState,
        locals: {
          user: request.session.user
        },
        siteCtx,
        isWizziStudio: true
      });
      response.writeHead(200, {
        "Content-Type": "text/html",
        "Content-Length": generated.artifactContent.length
      });
      response.end(generated.artifactContent);
    }
  } catch (ex) {
    console.log("\x1B[31m%s\x1B[0m", "sendFolderScan.exception", ex);
    sendError18(response, ex, {
      format: "json"
    });
  }
}
function sendTransform(filePath, transformer, response) {
  productions_exports.loadAndTransformModelFs(filePath, {
    isWizziStudio: true
  }, {
    transformer
  }).then(
    (model7) => response.send((0, import_json_stringify_safe3.default)(model7, null, 2))
  ).catch(
    (err) => sendError18(response, err, {
      format: "json"
    })
  );
}
function sendJSONStringified(response, wizziModelInstance) {
  response.send("<pre>" + (0, import_json_stringify_safe3.default)(cleanCircular(wizziModelInstance, []), null, 2) + "</pre>");
}
function cleanCircular(obj, stock) {
  if (!obj) {
    return;
  }
  if (stock.indexOf(obj) >= 0) {
    return;
  } else {
    stock.push(obj);
  }
  if (typeof obj === "object") {
    if (obj.length) {
      obj.forEach(
        (element) => cleanCircular(element, stock)
      );
      return;
    }
    if (obj.parent) {
      delete obj.parent;
    }
    if (obj.wzParent) {
      delete obj.wzParent;
    }
    if (obj.nodes) {
      delete obj.nodes;
    }
    if (obj.evalContext) {
      delete obj.evalContext;
    }
    if (obj.loadContext && obj.sourceKey) {
      delete obj.loadContext;
    }
    for (var k in obj) {
      var item = obj[k];
      if (!item) {
        delete obj[k];
      } else {
        if (typeof item === "object" && item.length && item.length == 0) {
          delete obj[k];
        } else {
          cleanCircular(item, stock);
        }
      }
    }
  }
  return obj;
}
function sendError18(response, err, options) {
  options = options || {};
  const code = options.code || 999;
  let errEmit = err;
  delete errEmit.__is_error;
  if (options.format === "string") {
    if (typeof err !== "string") {
      err = import_util.default.inspect(err, {
        depth: null
      });
    }
    errEmit = err.replace(RegExp("\n", "g"), "<br>");
  } else {
    if (err.stack && err.stack.split) {
      const stackArray = [];
      err.stack.split("\n").forEach(
        (element) => stackArray.push("    " + element)
      );
      errEmit.stack = stackArray;
    }
  }
  response.setHeader("Content-Type", "application/json");
  response.send((0, import_json_stringify_safe3.default)({
    code,
    error: errEmit
  }, null, 4));
}

// src/middlewares/packiBrowse.ts
var import_parseurl2 = __toESM(require("parseurl"));
var myname11 = "express.middleware.packiBrowse";
var packiSiteBrowsePackageItemPath = "/~p";
var packiSiteBrowsePluginItemPath = "/~l";
var packiSiteBrowsePath = "/~-";
var packiUserBrowsePath = "/~";
var PackiBrowseMiddleware = (app2) => {
  app2.use(packiSiteBrowsePackageItemPath, packiBrowseMiddleware("package", false));
  app2.use(packiSiteBrowsePluginItemPath, packiBrowseMiddleware("plugin", false));
  app2.use(packiSiteBrowsePath, packiBrowseMiddleware("artifact", true));
  app2.use(packiUserBrowsePath, packiBrowseMiddleware("artifact", false));
  console.log("PackiBrowseMiddleware. Browse package", packiSiteBrowsePackageItemPath);
  console.log("PackiBrowseMiddleware. Browse plugin", packiSiteBrowsePluginItemPath);
  console.log("PackiBrowseMiddleware. Browse artifact site Level", packiSiteBrowsePath);
  console.log("PackiBrowseMiddleware. Browse artifact", packiUserBrowsePath);
};
function getPackiBrowseContext(request) {
  return Object.assign({}, request.query, {
    isWizziStudio: false,
    locals: {
      user: request.session.user
    }
  });
}
function packiBrowseMiddleware(packiProduction, isSiteLevel) {
  return async (request, response, next) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return next();
    }
    const parsedUrl = (0, import_parseurl2.default)(request);
    if (!parsedUrl || !parsedUrl.pathname) {
      return next();
    }
    const pathname = decodeURIComponent(parsedUrl.pathname);
    const parts = pathname.split("/");
    let owner, productionName;
    if (isSiteLevel) {
      owner = "stfnbssl";
      productionName = parts.slice(1).join("/");
    } else {
      owner = parts[1];
      productionName = parts.slice(2).join("/");
    }
    _executeBrowse(packiProduction, owner, productionName, request, response);
  };
}
function _executeBrowse(packiProduction, owner, productionName, request, response) {
  let productionApi;
  if (packiProduction == "package") {
    productionApi = package_exports;
  } else if (packiProduction == "plugin") {
    productionApi = plugin_exports;
  } else {
    productionApi = artifact_exports;
  }
  if (request.query.meta && request.query.meta.toLowerCase() == "mtree") {
    productionApi.getArtifactMTree_withPrepare(owner, productionName, request.query.filepath, request.query.context, getPackiBrowseContext(request)).then(
      (result) => {
        response.status(200);
        response.set("Content-Type", result.contentType);
        response.set("Content-Length", result.contentLength.toString());
        response.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
        response.set("Expires", "-1");
        response.set("Pragma", "no-cache");
        response.send(result.content);
      }
    ).catch(
      (err) => {
        console.log("\x1B[31m%s\x1B[0m", "" + myname11 + "_executeBrowse.artifactApi.getArtifactMTree.error", err);
        var content = err;
        if (typeof err === "object" && err !== null) {
          content = "<html><body><pre><code>" + err.message + "</code></pre></body></html>";
        }
        sendHtml(response, content);
      }
    );
  } else if (request.query.meta && request.query.meta.toLowerCase() == "script") {
    productionApi.getArtifactMTreeBuildUpScript_withPrepare(owner, productionName, request.query.filepath, request.query.context, getPackiBrowseContext(request)).then(
      (result) => {
        response.status(200);
        response.set("Content-Type", result.contentType);
        response.set("Content-Length", result.contentLength.toString());
        response.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
        response.set("Expires", "-1");
        response.set("Pragma", "no-cache");
        response.send(result.content);
      }
    ).catch(
      (err) => {
        console.log("\x1B[31m%s\x1B[0m", "" + myname11 + "_executeBrowse.artifactApi.getArtifactMTree.error", err);
        var content = err;
        if (typeof err === "object" && err !== null) {
          content = "<html><body><pre><code>" + err.message + "</code></pre></body></html>";
        }
        sendHtml(response, content);
      }
    );
  } else if (request.query.meta && request.query.meta.toLowerCase() == "raw") {
    productionApi.getArtifactGeneration_withPrepare(owner, productionName, request.query.filepath, request.query.context, getPackiBrowseContext(request)).then(
      (result) => {
        response.status(200);
        response.set("Content-Type", "text/plain");
        response.set("Content-Length", result.contentLength.toString());
        response.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
        response.set("Expires", "-1");
        response.set("Pragma", "no-cache");
        response.send(result.content);
      }
    ).catch(
      (err) => {
        console.log("\x1B[31m%s\x1B[0m", "" + myname11 + "_executeBrowse.artifactApi.getArtifactGeneration.error", err);
        var content = err;
        if (typeof err === "object" && err !== null) {
          content = "<html><body><pre><code>" + err.message + "</code></pre></body></html>";
        }
        sendHtml(response, content);
      }
    );
  } else {
    productionApi.getArtifactGeneration_withPrepare(owner, productionName, request.query.filepath, request.query.context, getPackiBrowseContext(request)).then(
      (result) => {
        response.status(200);
        response.set("Content-Type", result.contentType);
        response.set("Content-Length", result.contentLength.toString());
        response.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
        response.set("Expires", "-1");
        response.set("Pragma", "no-cache");
        response.send(result.content);
      }
    ).catch(
      (err) => {
        console.log("\x1B[31m%s\x1B[0m", "" + myname11 + "_executeBrowse.artifactApi.getArtifactGeneration.error", err);
        var content = err;
        if (typeof err === "object" && err !== null) {
          content = "<html><body><pre><code>" + err.message + "</code></pre></body></html>";
        }
        sendHtml(response, content);
      }
    );
  }
}

// src/middlewares/bodyParser.ts
var bodyParser = __toESM(require("body-parser"));
var BodyParserMiddleware = (app2) => {
  app2.use(bodyParser.json({
    limit: "50mb"
  }));
  app2.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true
  }));
  console.log("\x1B[32m%s\x1B[0m", "BodyParserMiddleware installed");
};

// src/middlewares/cacheControl.ts
var CacheControlMiddleware = (app2) => {
  if (config2.noCache) {
    app2.use(
      (request, response, next) => {
        response.set("Cache-Control", "no-store");
        next();
      }
    );
    console.log("\x1B[32m%s\x1B[0m", "CacheControlMiddleware installed");
  }
};

// src/middlewares/userInViews.ts
var UserInViewMiddleware = (app2) => app2.use(
  (request, response, next) => {
    request.session.user = {
      id: "local_" + config2.userUserName,
      username: config2.userUserName,
      displayName: config2.userDisplayName,
      picture: config2.userAvatarUrl
    };
    response.locals.user = request.session.user;
    next();
  }
);

// src/middlewares/static.ts
var path7 = __toESM(require("path"));
var import_express24 = require("express");
var StaticFilesMiddleware = (app2) => {
  console.log("\x1B[32m%s\x1B[0m", "StaticFilesMiddleware. Folder served from ", path7.resolve(__dirname, "..", "public"));
  app2.use("/public", (0, import_express24.static)(path7.resolve(__dirname, "..", "public")));
};

// src/middlewares/domRoutes.ts
var import_path6 = __toESM(require("path"));
var DomRoutesMiddleware = (app2) => {
  app2.get(
    "/public/play/*",
    (req, res) => res.sendFile(import_path6.default.join(__dirname, "..", "public/play/index.html"))
  );
  console.log("\x1B[32m%s\x1B[0m", "DomRoutesMiddleware installed");
};

// src/middlewares/wizziViewEngine.ts
var import_path7 = __toESM(require("path"));
var import_json_stringify_safe4 = __toESM(require("json-stringify-safe"));
var WizziViewEngineMiddleware = (app2) => {
  app2.engine("ittf", async function(filePath, options, callback) {
    try {
      const twinJsonContext = await productions_exports.inferAndLoadContextFs(filePath, "wzCtx");
      var optionsLocals = Object.assign({}, options._locals, {
        user: {
          avatar_url: config2.userAvatarUrl,
          name: config2.userDisplayName,
          username: config2.userUserName
        }
      });
      const context = {
        ...options,
        locals: optionsLocals,
        ...twinJsonContext,
        isWizziStudio: true
      };
      const siteCtx = await productions_exports.loadSiteJsonModel("sitectx.json.ittf", context);
      context.siteCtx = siteCtx;
      console.log("WizziViewEngineMiddleware.filePath", filePath);
      console.log("WizziViewEngineMiddleware.options", Object.keys(options));
      productions_exports.generateArtifactFs(filePath, context).then(
        (generated) => {
          return callback(null, generated.artifactContent);
        }
      ).catch(
        (err) => {
          console.log("\x1B[31m%s\x1B[0m", "WizziViewEngineMiddleware. wizziProds.generateArtifactFs error", err);
          return callback((0, import_json_stringify_safe4.default)(err, null, 4));
        }
      );
    } catch (ex) {
      console.log("\x1B[31m%s\x1B[0m", "WizziViewEngineMiddleware. Exception", ex);
      callback(ex);
    }
  });
  const viewsFolder = import_path7.default.resolve(__dirname, "..", "src", "site", "views");
  app2.set("views", viewsFolder);
  app2.set("view engine", "ittf");
  console.log("WizziViewEngineMiddleware installed, on folder", viewsFolder);
};

// src/middlewares/promise.ts
var handleResponse = (res, data) => res.status(200).send(data);
var handleError = (res, err = {}) => res.status(err.status || 500).send({
  error: err.message
});
var PromiseMiddleware = (app2) => {
  app2.use(promiseMiddleware());
  console.log("\x1B[32m%s\x1B[0m", "PromiseMiddleware installed.");
};
function promiseMiddleware() {
  return (req, res, next) => {
    res.promise = (p) => {
      let promiseToResolve;
      if (p.then && p.catch) {
        promiseToResolve = p;
      } else {
        if (typeof p === "function") {
          promiseToResolve = Promise.resolve().then(
            () => p()
          );
        } else {
          promiseToResolve = Promise.resolve(p);
        }
      }
      return promiseToResolve.then(
        (data) => handleResponse(res, data)
      ).catch(
        (e) => handleError(res, e)
      );
    };
    return next();
  };
}

// src/middlewares/index.ts
var appMiddlewaresPre = [
  CorsMiddleware,
  SessionMiddleware,
  IttfStaticMiddleware,
  PackiBrowseMiddleware,
  BodyParserMiddleware,
  CacheControlMiddleware,
  UserInViewMiddleware,
  StaticFilesMiddleware,
  DomRoutesMiddleware,
  WizziViewEngineMiddleware,
  PromiseMiddleware
];
var appMiddlewaresPost = [];

// src/App.ts
var import_express25 = __toESM(require("express"));
function normalizePort(val) {
  var port2 = parseInt(val, 10);
  if (isNaN(port2)) {
    return val;
  }
  if (port2 >= 0) {
    return port2;
  }
  return false;
}
function initializeApp(app2, initValues) {
  initValues.middlewaresPre.forEach(
    (middleware) => middleware(app2)
  );
  initValues.apis.forEach(
    (api) => {
      console.log("\x1B[33m%s\x1B[0m", "installing api: ", api.name);
      api.initialize(app2, initValues);
      initValues.globalApi[api.name] = api;
    }
  );
  initValues.controllers.forEach(
    (controller) => {
      console.log("\x1B[33m%s\x1B[0m", "installing router on path: ", controller.path);
      controller.initialize(app2, initValues);
      app2.use(controller.path, controller.router);
    }
  );
  initValues.middlewaresPost.forEach(
    (middleware) => middleware(app2)
  );
}
var App = class {
  constructor(initValues) {
    this.config = initValues.config;
    this.port = normalizePort(process.env.PORT || this.config.port) || "3000";
    this.app = (0, import_express25.default)();
    ;
    this.app.set("port", this.port);
    initializeApp(this.app, initValues);
  }
  app;
  config;
  port;
  server;
  listen(port2) {
    this.server = this.app.listen(
      this.port,
      () => console.log(`App listening at http://localhost:${this.port}`)
    );
  }
  close(done) {
    console.log(`Server closing. App listening at http://localhost:${this.port}`);
    this.server.close(
      () => {
        console.log(`Server stopped. App was listening at http://localhost:${this.port}`);
        done();
      }
    );
  }
};
var App_default = App;

// src/index.ts
var app = {
  instance: null
};
async function start() {
  let modelBuilders = [
    ...wizziHubProductionsModelBuilders
  ];
  await mongodbStart(config2, modelBuilders);
  let middlewaresPre = [
    ...appMiddlewaresPre
  ];
  let middlewaresPost = [
    ...appMiddlewaresPost
  ];
  let apis = [];
  let controllers = [
    ...siteControllers,
    ...wizziProductionsControllers,
    ...wizziMetaControllers,
    ...wizziHubProductionsControllers,
    ...wizziDocsControllers,
    ...packiControllers
  ];
  console.log("\x1B[33m%s\x1B[0m", "Starting app. Config:", config2);
  const appInitializer = {
    config: config2,
    middlewaresPre,
    globalApi: {},
    apis,
    controllers,
    middlewaresPost
  };
  app.instance = new App_default(appInitializer);
  app.instance.listen();
}
try {
  start();
} catch (ex) {
  console.log("\x1B[31m%s\x1B[0m", ex);
}
function close(done) {
  try {
    console.log(`Index closing.`);
    console.log(`app.instance.close:${app.instance.close}`);
    app.instance.close(
      () => done()
    );
  } catch (ex) {
    console.log("\x1B[31m%s\x1B[0m", "index.close. Exception:", ex);
    done();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  close
});
