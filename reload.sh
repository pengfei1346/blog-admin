
echo '====build======'
yarn build:prod
echo '====rm======'
rm -rf ../reblog-server/admin
echo '====mv==='
mv dist ../reblog-server/admin
