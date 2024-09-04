"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webrtc_1 = __importDefault(require("./webrtc"));
var token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IkU0NDFEQjA3LTgwODYtNDg0Mi04OTM1LTQyMkJENTREQjUxNSIsInR5cCI6IkpXVCJ9.eyJhcHBpZCI6IjEwMTY4OTg0MzkiLCJjb3VudHJ5IjoiMjAiLCJjb3VudHJ5Y29kZSI6IkNOIiwiZGV2aWNlaWQiOiJGNzAwQ0JFMjY3RjQyM0QxIiwiZGV2aWNldHlwZSI6IkFuZHJvaWQiLCJzYW5kYm94aWQiOiJSRVRBSUwiLCJ1c2VyaWQiOiJ5MjIyMjQzNTMiLCJwdWlkIjoiODQ0NDI2NTgxNDc3MzQ3IiwieHVpZCI6IjI1MzU0MjgyNjYwOTIyMTMiLCJ4dXNGbGlnaHRzIjoiW1wiNDYxMTY4NjAxODU0NzMzMjAwMFwiLFwiYjRlYzI1NGUtY2VjMC00OWRkLTgzMTMtZWY1ZDA1ZmJhZWY1XCIsXCJjMTYzNzMyYS1kZWI2LTQxNDAtYjljNS03Y2ZkM2QwYWI4NzFcIixcIjFjM2Y3OGFiLTlhYmEtNGQ1Yy04MzcwLTg2YTVlNzg5YTk3Y1wiXSIsInBhcnRuZXJpZCI6Ik1JQ1JPU09GVCIsIm9mZmVyaW5naWQiOiJYSE9NRSIsImluc3RhbmNlaWQiOiI2NTBlYjAzZi0wNWMzLTRmYWYtYWUyMS1kZThhYjBiYmVhYWQiLCJ0eXBlIjoiVXNlciIsInZlcnNpb24iOiIyLjAiLCJmbGlnaHRzIjoie30iLCJuYmYiOjE3MjQ5OTUyOTIsImV4cCI6MTcyNTAwOTY5MiwiaWF0IjoxNzI0OTk1MjkyLCJpc3MiOiJodHRwczovL3hob21lLWF1dGgtcHJvZC54Ym94bGl2ZS5jb20iLCJhdWQiOiJodHRwczovL3hob21lLXByb2QueGJveGxpdmUuY29tIn0.dU2NTR4IrBexB2Hi7hsZyd3gSB7-VEz0L0JQbvl28wRI2mDyrMUfbex08_mAY-SVCZCP4PVhld9TRuF8xtZRjBVU1Aw0SXcdp1zcaKMfR7c1CRV9JYmzgzv-bsjZQ8cfQZ5YPp1xUMk6pfWhy2bDis8fTxbNmV-lgCEaifrQZeA';
var client = new webrtc_1.default(token, '127.0.0.1:8888');
client.startStream().then(function (stream) {
    console.log(stream.getState);
    console.log(stream.getSessionId);
    stream.waitForState('Provisioned');
}).catch(function (error) {
    console.error('Failed to start streaming session:', error);
});
