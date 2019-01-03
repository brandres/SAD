#!/bin/bash
cd /tmp
wget https://www.multichain.com/download/multichain-2.0-beta-1.tar.gz
tar -xvzf multichain-2.0-beta-1.tar.gz
cd multichain-2.0-beta-1
mv multichaind multichain-cli multichain-util /usr/local/bin

exit
