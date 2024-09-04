"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stream = /** @class */ (function () {
    function Stream(apiClient, response) {
        this._apiClient = apiClient;
        this._sessionId = response.sessionId;
        this._sessionPath = response.sessionPath;
        this._state = 'New';
    }
    Stream.prototype.getSessionId = function () {
        return this._sessionId;
    };
    Stream.prototype.getState = function () {
        return this._state;
    };
    Stream.prototype.getSessionPath = function () {
        return '/' + this._sessionPath;
    };
    Stream.prototype.waitForState = function (desiredState) {
        var _this = this;
        this._waitInterval = setInterval(function () {
            _this.refreshState().then(function (state) {
                if (state === desiredState) {
                    clearInterval(_this._waitInterval);
                }
            }).catch(function (error) {
                console.error('Failed to refresh state of stream:', error);
            });
        }, 500);
    };
    Stream.prototype.refreshState = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log('this.getSessionPath() ' + _this.getSessionPath());
            _this._apiClient.get(_this.getSessionPath() + '/state').then(function (response) {
                console.log('response.state ' + response.state);
                console.log(response);
                var fireReadyToConnect = (_this._state !== 'ReadyToConnect' && response.state === 'ReadyToConnect') ? true : false;
                var fireProvisioned = (_this._state !== 'Provisioned' && response.state === 'Provisioned') ? true : false;
                _this._state = response.state;
                resolve(_this.getState());
                if (fireReadyToConnect === true) {
                    _this.onReadyToConnect(_this);
                }
                if (fireProvisioned === true) {
                    _this.onProvisioned(_this);
                }
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    Stream.prototype.onReadyToConnect = function (stream) {
        return stream;
    };
    Stream.prototype.onProvisioned = function (stream) {
        return stream;
    };
    Stream.prototype.onError = function (stream) {
        return stream;
    };
    Stream.prototype.sendSDPOffer = function (sdpOffer) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = JSON.stringify({
                'messageType': 'offer',
                'sdp': sdpOffer.sdp,
                'requestId': '1',
                'configuration': {
                    'chatConfiguration': {
                        'bytesPerSample': 2,
                        'expectedClipDurationMs': 20,
                        'format': {
                            'codec': 'opus',
                            'container': 'webm',
                        },
                        'numChannels': 1,
                        'sampleFrequencyHz': 24000,
                    },
                    'chat': {
                        'minVersion': 1,
                        'maxVersion': 1,
                    },
                    'control': {
                        'minVersion': 1,
                        'maxVersion': 3,
                    },
                    'input': {
                        'minVersion': 1,
                        'maxVersion': 8, // @TODO: Update to 9 + add new channels 'reliableinput' and 'unreliableinput'
                    },
                    'message': {
                        'minVersion': 1,
                        'maxVersion': 1,
                    },
                },
            });
            _this._apiClient.post(_this.getSessionPath() + '/sdp', body, { 'Content-Type': 'application/json', 'Accept': 'application/json' }).then(function () {
                _this.waitForSdpResponse().then(function (sdpResponse) {
                    resolve(sdpResponse);
                }).catch(function (error) {
                    reject(error);
                });
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    Stream.prototype.sendChatSDPOffer = function (sdpOffer) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var body = JSON.stringify({
                'messageType': 'offer',
                'requestId': 2,
                'sdp': sdpOffer.sdp,
                'configuration': {
                    'isMediaStreamsChatRenegotiation': true,
                },
            });
            _this._apiClient.post(_this.getSessionPath() + '/sdp', body, { 'Content-Type': 'application/json', 'Accept': 'application/json' }).then(function () {
                _this.waitForSdpResponse().then(function (sdpResponse) {
                    resolve(sdpResponse);
                }).catch(function (error) {
                    reject(error);
                });
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    Stream.prototype.waitForSdpResponse = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var checkInterval = setInterval(function () {
                _this._apiClient.get(_this.getSessionPath() + '/sdp').then(function (sdpResponse) {
                    if (sdpResponse.status !== 204) {
                        resolve(sdpResponse);
                        clearInterval(checkInterval);
                    }
                }).catch(function () {
                    // Not received yet, lets retry..
                });
            }, 500);
        });
    };
    Stream.prototype.sendIceCandidates = function (candidates) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._apiClient.post(_this.getSessionPath() + '/ice', JSON.stringify({ candidates: candidates }), { 'Content-Type': 'application/json', 'Accept': 'application/json' }).then(function () {
                _this.waitForIceResponse().then(function (iceResponse) {
                    resolve(iceResponse);
                }).catch(function (error) {
                    reject(error);
                });
            }).catch(function (error) {
                reject(error);
            });
        });
    };
    Stream.prototype.waitForIceResponse = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var checkInterval = setInterval(function () {
                _this._apiClient.get(_this.getSessionPath() + '/ice').then(function (iceResponse) {
                    if (iceResponse.status !== 204) {
                        resolve(iceResponse);
                        clearInterval(checkInterval);
                    }
                }).catch(function () {
                    // Not received yet, lets retry..
                });
            }, 1000);
        });
    };
    Stream.prototype.sendKeepalive = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._apiClient.post(_this.getSessionPath() + '/keepalive', '').then(function (keepaliveResponse) {
                resolve(keepaliveResponse);
            }).catch(function (error) {
                reject({ error: error });
            });
        });
    };
    Stream.prototype.sendMSALAuth = function (userToken) {
        return this._apiClient.post(this.getSessionPath() + '/connect', JSON.stringify({
            'userToken': userToken,
        }), { 'Content-Type': 'application/json', 'Accept': 'application/json' });
    };
    return Stream;
}());
exports.default = Stream;
