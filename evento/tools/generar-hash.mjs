#!/usr/bin/env node
/*
 * Genera el hash SHA-256 de una clave o de una lista de invitados,
 * listo para pegar en evento/assets/js/config.js.
 *
 * Uso:
 *   node evento/tools/generar-hash.mjs "encuentro2026"
 *   node evento/tools/generar-hash.mjs --invitados invitados.csv
 *
 * El CSV debe tener una línea por invitación:
 *   codigo,nombre,maxAcompanantes
 *   ABC-123,Familia Ruiz,3
 *   XYZ-777,Ana y Martín
 */

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

/* Debe coincidir exactamente con normalizar() de assets/js/app.js */
function normalizar(s) {
  return String(s ?? '').normalize('NFKC').trim().toLowerCase().replace(/\s+/g, '');
}

function hash(clave) {
  return createHash('sha256').update(normalizar(clave), 'utf8').digest('hex');
}

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Uso: node generar-hash.mjs "mi-clave"');
  console.error('     node generar-hash.mjs --invitados invitados.csv');
  process.exit(1);
}

if (args[0] === '--invitados') {
  const ruta = args[1];
  if (!ruta) {
    console.error('Falta la ruta del CSV.');
    process.exit(1);
  }

  const filas = readFileSync(ruta, 'utf8')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));

  // Se ignora una cabecera si la primera columna se llama "codigo".
  if (/^codigo\s*,/i.test(filas[0] ?? '')) filas.shift();

  const invitados = filas.map((linea) => {
    const [codigo, nombre, max] = linea.split(',').map((c) => (c ?? '').trim());
    const entrada = {
      nombre: nombre || codigo,
      codigoHash: hash(codigo),
    };
    if (max) entrada.maxAcompanantes = Number(max);
    return entrada;
  });

  console.log('// Pega esto en config.js dentro de acceso.invitados:');
  console.log(JSON.stringify(invitados, null, 2));
  console.log(`\n// ${invitados.length} invitaciones generadas.`);
} else {
  for (const clave of args) {
    console.log(`${clave}  ->  ${hash(clave)}`);
  }
}
