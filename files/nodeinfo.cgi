#!/bin/bash
cat <<-EOF
        Content-type: application/json

EOF
sudo geth --exec "admin.nodeInfo" attach /home/biab/.ethereum/{{ ethereum_network }}/geth.ipc