"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = __importDefault(require("./stream"));
var https_proxy_agent_1 = require("https-proxy-agent");
var xCloudApiClient = /** @class */ (function () {
    function xCloudApiClient(token, proxyUrl) {
        this.token = token;
        this.proxyUrl = proxyUrl;
    }
    xCloudApiClient.prototype.startStream = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, stream, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.post('/v5/sessions/home/play', JSON.stringify({
                                clientSessionId: '',
                                titleId: '',
                                systemUpdateGroup: '',
                                settings: {
                                    nanoVersion: 'V3;WebrtcTransport.dll',
                                    enableOptionalDataCollection: false,
                                    enableTextToSpeech: false,
                                    highContrast: 0,
                                    locale: 'en-US',
                                    useIceConnection: false,
                                    timezoneOffsetMinutes: 120,
                                    sdkType: 'web',
                                    osName: 'windows',
                                },
                                serverId: 'F4001E14C17E9AA5',
                                fallbackRegionNames: [],
                            }))];
                    case 1:
                        response = _a.sent();
                        stream = new stream_1.default(this, response);
                        return [2 /*return*/, stream];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    xCloudApiClient.prototype.post = function (url_1, body_1) {
        return __awaiter(this, arguments, void 0, function (url, body, headers) {
            var fetch, agent, response;
            if (headers === void 0) { headers = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('node-fetch')); })];
                    case 1:
                        fetch = (_a.sent()).default;
                        agent = new https_proxy_agent_1.HttpsProxyAgent(this.proxyUrl);
                        return [4 /*yield*/, fetch(this.getBaseHost() + url, {
                                method: 'POST',
                                body: body,
                                headers: __assign({ 'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json' }, headers),
                                agent: agent
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    xCloudApiClient.prototype.get = function (url_1) {
        return __awaiter(this, arguments, void 0, function (url, headers) {
            var fetch, agent, response;
            if (headers === void 0) { headers = {}; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('node-fetch')); })];
                    case 1:
                        fetch = (_a.sent()).default;
                        agent = new https_proxy_agent_1.HttpsProxyAgent(this.proxyUrl);
                        return [4 /*yield*/, fetch(this.getBaseHost() + url, {
                                headers: __assign({ 'Authorization': 'Bearer ' + this.token }, headers),
                                agent: agent
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    xCloudApiClient.prototype.getBaseHost = function () {
        // Assuming this method returns the base URL for the API
        return 'https://uks.core.gssv-play-prodxhome.xboxlive.com';
    };
    return xCloudApiClient;
}());
exports.default = xCloudApiClient;
