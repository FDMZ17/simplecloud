
#!/bin/bash

FILE=/home/simplecloud/config-lock
if [ -f $FILE ]; then
	echo "Simplecloud server is starting..."
	npm install
	npm start
else

	read -p "Your text editor: [vim, nano]: " selectedEditor
	selectedEditor /home/simplecloud/config.json
	touch /home/simplecloud/config-lock

fi
