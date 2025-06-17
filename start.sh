git reset --hard
git checkout .
git pull
yarn build
kill -9 $(netstat -luntp | grep node | perl -0777 -lne 'print $1 while m/^.*( [0-9]+)\/node.*$/gm') 2>/dev/null
echo "$(netstat -luntp | grep node)"
nohup yarn start &