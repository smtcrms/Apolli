#!/bin/bash
SERVICE_NAME=apollo-configservice
VERSION=0.0.1-SNAPSHOT
PATH_TO_JAR=$SERVICE_NAME"-"$VERSION".jar"

if [[ -z "$JAVA_HOME" && -d /usr/java/latest/ ]]; then
    export JAVA_HOME=/usr/java/latest/
fi

cd `dirname $0`/..

if [[ ! -f PATH_TO_JAR && -d current ]]; then
    cd current
fi

if [[ -f $SERVICE_NAME".jar" ]]; then
  rm -rf $SERVICE_NAME".jar"
fi

ln $PATH_TO_JAR $SERVICE_NAME".jar"
chmod a+x $SERVICE_NAME".jar"
./$SERVICE_NAME".jar" start

exit 0;
