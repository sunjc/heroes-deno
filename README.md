# Build REST API with Deno

## Installing Deno

Shell (Mac, Linux):
  curl -fsSL https://deno.land/x/install/install.sh | sh

PowerShell (Windows):
  iwr https://deno.land/x/install/install.ps1 -useb | iex

## Installing denon

  deno install -qAf --unstable https://deno.land/x/denon/denon.ts

## Running tests

run 'deno test --allow-env --allow-net --allow-read --allow-write --unstable --config tsconfig.json' or 'denon test' to execute the tests.

## Running server

run 'deno run --allow-env --allow-net --allow-read --allow-write --unstable --config tsconfig.json app.ts' or 'denon start' to start server.