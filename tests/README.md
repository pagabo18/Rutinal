# Pruebas de Rutinal

Pruebas de extremo a extremo: abren la app en Chrome (Playwright), con el respaldo de Supabase simulado dentro de la página, y revisan cada flujo. No tocan la base de datos real ni necesitan internet ni llaves.

## Cómo correrlas

```bash
pip install playwright          # una vez
./tests/run_all.sh              # todas (unos 15 minutos)
./tests/run_all.sh wo cd arch   # solo algunas: wo_test.py, cd_test.py, arch_test.py
```

`run_all.sh` levanta la app en `http://localhost:8765` (sirviendo `assets/web`) si no está ya arriba. Cada prueba imprime lo que va viendo y termina con `errs []` / `errors []` (errores de JavaScript en la página); una prueba falla si truena o si esa lista no viene vacía.

Para correr una sola a mano hay que estar dentro de `tests/`, porque varias se arman a partir de otras (`wo_test.py`, `rep_test.py`) y cargan los simuladores por nombre:

```bash
cd tests && python3 cd_test.py        # opcional: python3 cd_test.py en  (inglés)
```

Dan por hecho Linux con Google Chrome en `/usr/bin/google-chrome` y dejan capturas en `/tmp/g`, `/tmp/t` y `/tmp/shots`.

## Qué hay

- `fake_sb.py`, `fake_links.py`: simuladores de Supabase (usuarios, vínculos atleta–especialista, documentos, mensajes, check-ins). Las contraseñas que aparecen ahí son de mentira.
- `*_test.py`: una por tema. Algunas de las más usadas:
  - `wo_test` entrenamiento · `live_test`, `gw_test` entrenamiento en vivo y widget · `arch_test` historial al borrar rutinas
  - `cd_test`, `wc_test`, `stp_test` cardio y pasos (tarjeta, widget, vista del coach)
  - `sum_test`, `day_test` resumen del día · `exl_test` historial por ejercicio
  - `hoy_test`, `hl2_test` pantalla de Hoy y su orden · `mod_test` módulos
  - `ck_test` check-in semanal · `rep_test` ficha del atleta · `xss_test` textos del atleta escapados en la vista del especialista
  - `es_test`, `match_test` búsqueda de ejercicios en español y emparejado con la base
- `desactualizadas/`: pruebas que ya no pasan porque la pantalla que recorren cambió (no por un error de la app). Están ahí como referencia para actualizarlas; `run_all.sh` no las corre.

Al cambiar una pantalla, corre las pruebas que la tocan y, si el flujo cambió a propósito, actualiza la prueba en el mismo commit.
