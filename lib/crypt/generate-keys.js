const fs = require('fs');
const jwkToPem = require('jwk-to-pem');
const { JWK } = require('jose');

const CONFIG_KEY_PATH = 'config/jwk';
const PRIVATE_KEY_PATH = 'config/jwk/private.json';
const PUBLIC_KEY_PATH = 'config/jwk/public.pem';

if (check_config_exists()) {
  process.stderr.write(
    `Ya existe un fichero de claves en ${PRIVATE_KEY_PATH}. Borra el archivo para generar nuevas.\n\n`
  );
  process.exit(1);
}

process.stdout.write(`Generando clave privada en: ${PRIVATE_KEY_PATH} `);
generate_private_key();
process.stdout.write(`... hecho.\n`);

process.stdout.write(`Generando clave pública en: ${PUBLIC_KEY_PATH} `);
generate_public_key();
process.stdout.write(`... hecho.\n`);

process.exit(0);

function check_config_exists() {
  let found = true;

  try {
    fs.statSync(PRIVATE_KEY_PATH, function (err, _) {
      if (err) {
        found = false;
      }
    });
  } catch {
    found = false;
  }

  return found;
}

function generate_private_key() {
  const key = JWK.generateSync('RSA', 4096, {
    alg: 'RS256',
  });

  const jwk = JSON.stringify(key.toJWK(true), null, 4);

  fs.mkdirSync(CONFIG_KEY_PATH, { recursive: true });
  fs.writeFileSync(PRIVATE_KEY_PATH, jwk);
}

function generate_public_key() {
  const data = fs.readFileSync(PRIVATE_KEY_PATH, 'utf-8');
  const key = JWK.importKey(JSON.parse(data));
  const pem = jwkToPem(key.toJWK(false));

  fs.writeFileSync(PUBLIC_KEY_PATH, pem);
}
