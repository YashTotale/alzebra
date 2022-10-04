#!/bin/bash

set -e

git push
git push --follow-tags
npm run changelog-to-releases
