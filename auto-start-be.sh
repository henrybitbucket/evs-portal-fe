BE=$(netstat -luntp | grep java)
if [ "$BE" = "" ];
then
  cd /home/henry/java-hd && nohup java -jar pa-evs-1.0.jar &
fi