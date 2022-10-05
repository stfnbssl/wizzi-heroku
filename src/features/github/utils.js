"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRepositoryToMeta = void 0;
function apiRepositoryToMeta(apirepo) {
    // TODO implement branches
    return {
        owner: apirepo.owner.login,
        name: apirepo.name,
        description: apirepo.description,
        branches: [
            'master'
        ]
    };
}
exports.apiRepositoryToMeta = apiRepositoryToMeta;
//# sourceMappingURL=utils.js.map