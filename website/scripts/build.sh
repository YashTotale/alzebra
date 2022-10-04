#!/bin/bash

set -e

TYPEDOC_WATCH=false

mkdir -p docs
docusaurus build
