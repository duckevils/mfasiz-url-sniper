"use strict";
// bu kod github.com/duckevils tarafından yazılmıştır.
// discord.gg/israil
// duckevils rush zons
import tls from 'tls';
import WebSocket from 'ws';
import extractJsonFromString from 'extract-json-from-string';
import http2 from 'http2';
import http from 'http';
import axios from 'axios';


const config = {
  discordHost: "canary.discord.com",
  webhook: "",
  discordToken: "",
  guildId: "",
  gatewayUrl: "wss://gateway-us-east1-b.discord.gg",
  os: "linux",
  browser: "Maxthon",
  device: "duckevilsxrushxzons"
};

let duckevilsss = '';
let vanity;
const guilds = {};

const tlsSocket = tls.connect({ host: config.discordHost, port: 8443 });

tlsSocket.on("data", async (data) => {
    const ext = extractJsonFromString(data.toString());
    const find = ext.find((e) => e.code) || ext.find((e) => e.message);
    if (find) {
        console.log(find);
    }
});

tlsSocket.on("error", (error) => {
    console.log(`tls error`, error);
    process.exit();
});

tlsSocket.on("end", () => {
    console.log("tls connection closed");
    process.exit();
});

tlsSocket.on("secureConnect", () => {
    const websocket = new WebSocket(config.gatewayUrl);

    websocket.onclose = (event) => {
        console.log(`ws connection closed ${event.reason} ${event.code}`);
        process.exit();
    };

    websocket.onmessage = async (message) => {
        const { d, op, t } = JSON.parse(message.data);
        if (t === "GUILD_UPDATE") {
            const find = guilds[d.guild_id];
            if (find && find !== d.vanity_url_code) {
              vanityUpdate(find);
                notifyWebhook(find);
                vanity = `${find}`;
            }
        } 
        else if (t === "READY") {
            d.guilds.forEach((guild) => {
                if (guild.vanity_url_code) {
                    guilds[guild.id] = guild.vanity_url_code; 
                    console.log(`\x1b[35m1988\x1b[0m || \x1b[31mGUILD => ${guild.id}\x1b[0m || \x1b[34mVANITY => ${guild.vanity_url_code}\x1b[0m`);
                }
            });
            
        console.log(`\x1b[31mduckevils wishes you a good flight!\x1b`);
        }
        
async function notifyWebhook(find) {
  const requestBody = {
    content: `*⌜ code : ' ${find} ' ⌟* ||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||ً @everyone @here https://tenor.com/view/akame-akame-ga-k-ill-anime-fighting-stance-windy-gif-17468654`
  };

  try {
    await axios.post(config.webhook, requestBody);
  } catch (error) {
    console.error('Failed to notify webhook:', error);
  }
}
        if (op === 10) {
            websocket.send(JSON.stringify({
                op: 2,
                d: {
                    token: config.discordToken,
                    intents: 513,
                    properties: {
                        os: config.os,
                        browser: config.browser,
                        device: config.device,
                    },
                },
            }));
            setInterval(() => websocket.send(JSON.stringify({ op: 1, d: {}, s: null, t: "heartbeat" })), d.heartbeat_interval);
        } else if (op === 7) {
            process.exit();
        }
    };

    setInterval(() => {
        tlsSocket.write(["GET / HTTP/1.1", `Host: ${config.discordHost}`, "", ""].join("\r\n"));
    }, 600);
});

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/duckevilsontop') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const { mfaToken: receivedToken } = JSON.parse(body);
        if (receivedToken) {
          duckevilsss = receivedToken;
          console.log('OK');
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'MFA token received and set.' }));
        } else {
          res.statusCode = 400;
          res.end('Missing mfaToken in the request.');
        }
      } catch (error) {
        res.statusCode = 400;
        res.end('Invalid JSON format.');
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(6931, () => {
});


const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) duckevils/1.0.9164 Chrome/124.0.6367.243 Electron/30.2.0 Safari/537.36',
    'X-Debug-Options': 'bugReporterEnabled',
    'Authorization': config.discordToken,
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'X-Audit-Log-Reason': '',
    'X-Context-Properties': 'nosniff',
    'X-Discord-Locale': 'tr',
    'X-Discord-Timezone': 'Europe/Istanbul',
    'X-Super-Properties': 'eyJvcyI6IkFuZHJvaWQiLCJicm93c2VyIjoiQW5kcm9pZCBDaHJvbWUiLCJkZXZpY2UiOiJBbmRyb2lkIiwic3lzdGVtX2xvY2FsZSI6InRyLVRSIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKExpbnV4OyBBbmRyb2lkIDYuMDsgTmV4dXMgNSBCdWlsZC9NUkE1OE4pIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMzEuMC4wLjAgTW9iaWxlIFNhZmFyaS81MzcuMzYiLCJicm93c2VyX3ZlcnNpb24iOiIxMzEuMC4wLjAiLCJvc192ZXJzaW9uIjoiNi4wIiwicmVmZXJyZXIiOiJodHRwczovL2Rpc2NvcmQuY29tL2NoYW5uZWxzL0BtZS8xMzAzMDQ1MDIyNjQzNTIzNjU1IiwicmVmZXJyaW5nX2RvbWFpbiI6ImRpc2NvcmQuY29tIiwicmVmZXJyaW5nX2N1cnJlbnQiOiIiLCJyZWxlYXNlX2NoYW5uZWwiOiJzdGFibGUiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjozNTU2MjQsImNsaWVudF9ldmVudF9zb3VyY2UiOm51bGwsImhhc19jbGllbnRfbW9kcyI6ZmFsc2V9='
};

async function vanityUpdate(find) {
    try {
        const vanityResponse = await http2Request('PATCH', `/api/v9/guilds/${config.guildId}/vanity-url`, {
            ...headers,
            'X-Discord-MFA-Authorization': duckevilsss,
            'Cookie': `__Secure-recent_mfa=${duckevilsss}`,
            'Content-Type': 'application/json'
        }, JSON.stringify({ code: find }));
        const vanityData = JSON.parse(vanityResponse);
        if (vanityData.code === 200) {
            console.log('Vanity URL alındı:', vanityData);
        } else {
            console.error(' UPDATE:', vanityData);
        }
    } catch (error) {
        console.error('Vanity URL isteği hatası:', error);
    }
}

async function http2Request(method, path, customHeaders = {}, body = null) {
    return new Promise((resolve, reject) => {
        const client = http2.connect("https://canary.discord.com");
        const req = client.request({
            ":method": method,
            ":path": path,
            ...customHeaders,
        });
        let data = "";
        req.on("response", (headers, flags) => {
            req.on("data", (chunk) => {
                data += chunk;
            });
            req.on("end", () => {
                resolve(data);
                client.close();
            });
        });
        req.on("error", (err) => {
            reject(err);
            client.close();
        });
        if (body) {
            req.write(body);
        }
        req.end();
    });
}
process.title = "Zafer Allah'ın yanında olanındır.";
// we are allah's soldiers
