import Stream from "./stream.js";
import tunnel from 'tunnel';

export interface StartStreamReponse {
    sessionId: string;
    sessionPath: string;
    state: string;
}

export default class xCloudApiClient {
    private token: string;
    private proxyUrl: string;

    constructor(token: string, proxyUrl: string) {
        this.token = token;
        this.proxyUrl = proxyUrl;
    }
    
    async startStream(): Promise<Stream> {        
        try {
            const response = await this.post('/v5/sessions/home/play', JSON.stringify({
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
            }));
            const stream = new Stream(this, response as StartStreamReponse);
            return stream;
        } catch (error) {
            throw error;
        }
    }

    async post(url: string, body: any, headers = {}): Promise<any> {
        const fetch = (await import('node-fetch')).default;
        const [proxyHost, proxyPort] = this.proxyUrl.split(':');
        const agent = tunnel.httpsOverHttp({
            proxy: {
                host: proxyHost,
                port: parseInt(proxyPort, 10),
            },
            rejectUnauthorized: false // 忽略 SSL 证书验证
        });

        const response = await fetch(this.getBaseHost() + url, {
            method: 'POST',
            body: body,
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json',
                ...headers
            },
            agent: agent
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    }

    async get(url: string, headers = {}): Promise<any> {
        const fetch = (await import('node-fetch')).default;
        const [proxyHost, proxyPort] = this.proxyUrl.split(':');
        const agent = tunnel.httpsOverHttp({
            proxy: {
                host: proxyHost,
                port: parseInt(proxyPort, 10),
            },
            rejectUnauthorized: false // 忽略 SSL 证书验证
        });

        const response = await fetch(this.getBaseHost() + url, {
            headers: {
                'Authorization': 'Bearer ' + this.token,
                ...headers
            },
            agent: agent
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();
    }

    private getBaseHost(): string {
        // Assuming this method returns the base URL for the API
        return 'https://uks.core.gssv-play-prodxhome.xboxlive.com';
    }
}