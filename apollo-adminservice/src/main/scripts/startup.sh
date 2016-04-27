#!/bin/bash
SERVICE_NAME=apollo-adminservice
PATH_TO_JAR=$SERVICE_NAME"-0.0.1-SNAPSHOT.jar"
LOG_PATH=/opt/logs/100003172/

cd `dirname $0`/..
source bin/common.sh start

