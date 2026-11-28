#!/bin/bash
# Corre todas las pruebas de tests/ contra la app servida en local.
#   ./tests/run_all.sh            todas
#   ./tests/run_all.sh wo cd      solo wo_test.py y cd_test.py
# Requisitos: python3 con playwright (pip install playwright) y Google Chrome en /usr/bin/google-chrome.
cd "$(dirname "$0")" || exit 1
mkdir -p /tmp/g /tmp/t /tmp/shots
if ! curl -s -o /dev/null http://localhost:8765/index.html; then
  (python3 -m http.server 8765 --directory ../assets/web >/dev/null 2>&1 &)
  sleep 1
fi
if [ $# -gt 0 ]; then list=$(for a in "$@"; do echo "${a%_test}_test.py"; done); else list=$(ls *_test.py); fi
pass=0; fail=0; failed=""
for t in $list; do
  out=$(timeout 240 python3 "$t" 2>&1); rc=$?
  if [ $rc -eq 0 ] && ! echo "$out" | grep -q "Traceback"; then pass=$((pass+1)); echo "ok    $t"
  else fail=$((fail+1)); failed="$failed $t"; echo "FALLA $t"; echo "$out" | grep -v '^\s' | tail -3 | sed 's/^/        /'; fi
done
echo; echo "$pass pasaron, $fail fallaron${failed:+:$failed}"
[ $fail -eq 0 ]
