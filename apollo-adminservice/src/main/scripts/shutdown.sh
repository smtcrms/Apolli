#!/bin/bash
SERVICE_NAME=apollo-adminservice

cd `dirname $0`/..
./$SERVICE_NAME".jar" stop

