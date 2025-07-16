




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0FqN05tV2toT2VMSVUySFhYLzdxLzdyR2FkR1ZiQkFKZWdicE5vWVhYbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNXpOaTFCN2VDbm80TEIwbHNJaWg5MlN6dU1aMkpPekQybzFmR01TcDdBdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2QlBFYWdJcC9QZGR4ZnY1Y1h6bmdjcSszWjhTV25XWXRzTG9TaGgwUldVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZYUhRL3Z1WEFzM1d3VVN0T2k2bkJ3cXk1UVZuVzFQR2YrdHVXM04xUGc4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtNR2lTZDkrWkc2YWFlcE1lNnZmaGVRRVFTUXVCazc0Yi91MW51Q2dTV1U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJwcmI1TjVJREdNQWFGWmViWDY0Mm1ETTk2SVI4QytGTEFpeGpmbkRHV0E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUs1QkpRdGkxQmFmaWVHZUV4TlloQ1lDbGp0bWlKZTlUaStSMW9Ia2FVMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRHY5M1g1dytIcWZlYjIyVTVGT2lDRFVucjNPQk1LalpSOGw1dHhMR1NYYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilp2Qmh5RkZORmU5b1ByTk96UWhrZ3RIaGEzRXNUeWxTMkFoYTUxU2J0N0EzSTNad2VGVHl4Q29aREpIcEE4UW9UdWFrcUZpMEorQk03NDJwN094OUFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDksImFkdlNlY3JldEtleSI6IjhPQVJRdkFQVnk3c3NqTmdoU2x2MnF3MzFRYklzb2dra2JHOXozeE5BL289IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzI3NTg1OTc2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkI1Q0QwN0Q5MDQxNTM4RjAxNEU5M0VEMzFFOUVFNTQyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTI0Mjg5OTN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcyNzU4NTk3NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxNThDQTA3Mjg2MzgwMzQ5MzEwNEZGRDRGMUNBQjZCQyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUyNDI5MDAyfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJKUkdZR1hQWiIsIm1lIjp7ImlkIjoiMjU0NzI3NTg1OTc2OjQ5QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTMxNjQwOTk5MzMzOTE4OjQ5QGxpZCIsIm5hbWUiOiLgvbPgvoHgvbPgvoHgvbPgvoHgvbPgvoHgvbPwnZaZ8J2WlPCdlpjwnZSl4L2z4L6B4L2z4L6B4L2z4L6B4L2z4L6BIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNdTJvdklERUszano4TUdHQXdnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJwOTNudlZJMjBvWlZXSzhTb05oZTlwa0pVUFZLQzVta0tXVEVGWTl5M1NvPSIsImFjY291bnRTaWduYXR1cmUiOiIwNG9UNU5qT3NtcHk4VytFRXlkb1AweUYydUNpRjIzVm5FZHRtMklieU1scmc5YnhRVFE4T3hObVQyNk9CY0V4UmlOQ2Uyc1NoSDJGa010VkhZSDJCdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRTU5L2NEakJyTENIUzZkaGRJazFMRTN2MXp1YU42OTh0WWJpUzlVUDBwWVV4WDNKQTBKakg2OE5oMmJIbWxVV2ZmZVBDOTg1QXhQNjRWT0dWT01NQlE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3Mjc1ODU5NzY6NDlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYWZkNTcxU050S0dWVml2RXFEWVh2YVpDVkQxU2d1WnBDbGt4QldQY3QwcSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUyNDI4OTg2LCJsYXN0UHJvcEhhc2giOiIxSzRoSDQiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5jUCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "254727585976",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Tosh",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Tosh-AI',
    URL : process.env.BOT_MENU_LINKS || 'https://github.com/pkdriller0/NEXUS-XMD-DATA/raw/refs/heads/main/logo/302cd7b646014ce2dd8469e25e304d87.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  CHATBOT : process.env.CHATBOT || "no",
                  AUTO_BIO : process.env.AUTO_BIO || "no",
                  AUTO_REACT : process.env.AUTO_REACT || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
