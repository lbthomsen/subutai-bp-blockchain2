#!/bin/bash
IP=`dig +short {{ domain }}`
cat <<-EOF
        Content-type: application/json

EOF
sudo geth --exec "admin.nodeInfo.enode" attach /home/biab/.ethereum/{{ ethereum_network }}/geth.ipc | sed -e "s/@\[::\]/@$IP/g"
