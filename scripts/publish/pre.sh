#!/bin/bash

set -e

pinst --disable # Disables postinstall script
npm run build
