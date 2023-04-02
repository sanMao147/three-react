set -e
yarn build
git add -A
git commit -m 'deploy'
git push -u origin main
git subtree push --prefix dist origin gh-pages

cd -