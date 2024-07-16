import Koa from 'koa';
import Serve from 'koa-static';
import https from 'https';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import App from "./index.js";
import { renderToString } from 'vue/server-renderer'

// Charger les certificats
const options = {
  key: readFileSync(resolve('key.pem')),
  cert: readFileSync(resolve('cert.pem'))
};

const app = new Koa();
const index = readFileSync('./public/index.html')

app.use(async (ctx, next) => {
  if (ctx.path === '/api') {
    ctx.body = { name: 'arnaud' };
  } 
  else if(ctx.path === '/') {
      ctx.set('content-type', 'text/html')
        const appContent = await renderToString(App);
      
        ctx.body = index.toString().replace('<!-- ssr -->', appContent);
  } 
  else {
    await next();
  }
});

app.use(Serve(resolve('public')));

// Créer un serveur HTTPS
https.createServer(options, app.callback()).listen(8080, () => {
  console.log('Server running on https://localhost:8080');
});





// TODO1 (required) : Mettre en place une certificat https autosigné avec openSSL
// TODO2 : on est sur internet et on veut accéder à mon serveur


//TODO : A LIRE => WebSocket  (socket.io (server et client)) + MIDDLEWARES 


//NEXT STEP => Executer l'application coté Serveur

// TODO 3 => Mettre en place un nouveau serveur (refaire un serveur Koa)