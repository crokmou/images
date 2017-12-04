#!/bin/bash
git add -A && git diff-index --quiet HEAD || git commit -m 'Auto commit' && git push
projectversion=`git describe --tags --long`

echo "$projectversion"