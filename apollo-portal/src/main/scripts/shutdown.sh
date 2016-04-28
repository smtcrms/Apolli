#!/bin/bash
SERVICE_NAME=apollo-portal

cd `dirname $0`/..
if [[ -f $SERVICE_NAME".jar" ]]; then
  ./$SERVICE_NAME".jar" stop
fi