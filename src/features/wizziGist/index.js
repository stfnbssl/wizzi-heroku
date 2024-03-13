"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wizziGistApi = exports.wizziGistControllers = exports.wizziGistTypes = void 0;
const tslib_1 = require("tslib");
const wizziGistTypes = tslib_1.__importStar(require("./types"));
exports.wizziGistTypes = wizziGistTypes;
const wizziGistApi = tslib_1.__importStar(require("./api/wizziGist"));
exports.wizziGistApi = wizziGistApi;
const apiv1wizzigist_1 = require("./controllers/apiv1wizzigist");
const wizziGistControllers = [
    new apiv1wizzigist_1.ApiV1WizziGistController()
];
exports.wizziGistControllers = wizziGistControllers;
//# sourceMappingURL=index.js.map