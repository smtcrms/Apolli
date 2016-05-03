#!/bin/bash
SERVICE_NAME=apollo-configservice

cd `dirname $0`/..

if [[ ! -f $SERVICE_NAME".jar" && -d current ]]; then
    cd current
fi

if [[ -f $SERVICE_NAME".jar" ]]; then
  ./$SERVICE_NAME".jar" stop
fi
