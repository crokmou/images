#!/bin/bash
git add -A && git diff-index --quiet HEAD || git commit -m 'Auto commit' && git push
projectversion=`git describe --tags --long`
git tag -a $projectversion -m 'Auto tag';
git push --tags

echo "$projectversion"