#!/bin/bash
SERVICE_NAME=apollo-portal
VERSION=0.0.1-SNAPSHOT
PATH_TO_JAR=$SERVICE_NAME"-"$VERSION".jar"

export JAVA_OPTS="-server -Xms4096m -Xmx4096m -Xss256k -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=384m -XX:NewSize=1536m -XX:MaxNewSize=1536m -XX:SurvivorRatio=22 -XX:+UseParNewGC -XX:ParallelGCThreads=4 -XX:MaxTenuringThreshold=9 -XX:+UseConcMarkSweepGC -XX:+DisableExplicitGC -XX:+UseCMSInitiatingOccupancyOnly -XX:+ScavengeBeforeFullGC -XX:+UseCMSCompactAtFullCollection -XX:+CMSParallelRemarkEnabled -XX:CMSFullGCsBeforeCompaction=9 -XX:CMSInitiatingOccupancyFraction=60 -XX:+CMSClassUnloadingEnabled -XX:SoftRefLRUPolicyMSPerMB=0 -XX:-ReduceInitialCardMarks -XX:+CMSPermGenSweepingEnabled -XX:CMSInitiatingPermOccupancyFraction=70 -XX:+ExplicitGCInvokesConcurrent -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCApplicationConcurrentTime -XX:+PrintHeapAtGC -XX:+HeapDumpOnOutOfMemoryError -XX:-OmitStackTraceInFastThrow -Duser.timezone=Asia/Shanghai -Dclient.encoding.override=UTF-8 -Dfile.encoding=UTF-8"
export JAVA_OPTS="$JAVA_OPTS -Xloggc:/opt/logs/100003173/heap_trace.txt -XX:HeapDumpPath=/opt/logs/100003173/HeapDumpOnOutOfMemoryError/"

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
