#!/bin/bash

set -e

rm -rf dist

ncc build src/alzebra.ts -m --out dist
mv dist/index.js dist/alzebra.min.js

ncc build src/alzebra.ts --out dist
mv dist/index.js dist/alzebra.js

mv dist/alzebra.d.ts dist/index.d.ts
rm -rf dist/__tests__
