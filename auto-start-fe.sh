ln -s /root/.nvm/versions/node/v10.15.3/bin/node /usr/bin/node
FE=$(netstat -luntp | grep node)
echo $FE >> log.txt
if [ "$FE" = "" ];
then
  echo "restart" >> log.txt
  cd /home/henry/fe/evs-portal-fe
  echo $(pwd) >> log.txt
  echo "restart" >> log.txt
  echo $(nohup /root/.nvm/versions/node/v10.15.3/bin/yarn start & 2>&1)
  echo "lol" >> log.txt
fi
