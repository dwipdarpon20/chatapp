import ENV from '../env.js';
import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";


const aj = arcjet({
  
  key: ENV.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE", 
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    slidingWindow({
        mode: "LIVE",
        max: 100,
        interval: 60 * 1000, // 1 minute
        // Optionally customize the cache key. By default, it's the IP address.
        // key: (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    })
  ],
});

export default aj;
