const { JWK } = require('jose');
const { jwkToPem } = require('jose/lib/help/key_utils');

const key = JWK.generateSync('RSA', 4096, {
  alg: 'RS256',
});

const jwk = JSON.stringify(key.toJWK(true), null, 4);

process.stdout.write(`Clave privada para el front: \n\n ${jwk}`);

const pem = jwkToPem(key.toJWK(false));

process.stdout.write(`\n\n\nClave pública para el front: \n\n${pem}\n\n`);
