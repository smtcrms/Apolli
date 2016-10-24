#!/bin/bash

if grep -Fq "LimitNOFILE" /usr/lib/systemd/system/ctripapp\@100003173.service; then
       echo "already set LimitNOFILE";
else
       sed -i '/\[Service\]/a\LimitNOFILE=65536' /usr/lib/systemd/system/ctripapp\@100003173.service;
       systemctl daemon-reload
fi