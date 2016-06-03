#!/bin/bash
SERVICE_NAME=apollo-configservice
PATH_TO_JAR=$SERVICE_NAME".jar"

export JAVA_OPTS="-server -Xms5632m -Xmx5632m -Xss256k -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=384m -XX:NewSize=2560m -XX:MaxNewSize=2560m -XX:SurvivorRatio=22 -XX:+UseParNewGC -XX:ParallelGCThreads=4 -XX:MaxTenuringThreshold=9 -XX:+UseConcMarkSweepGC -XX:+DisableExplicitGC -XX:+UseCMSInitiatingOccupancyOnly -XX:+ScavengeBeforeFullGC -XX:+UseCMSCompactAtFullCollection -XX:+CMSParallelRemarkEnabled -XX:CMSFullGCsBeforeCompaction=9 -XX:CMSInitiatingOccupancyFraction=60 -XX:+CMSClassUnloadingEnabled -XX:SoftRefLRUPolicyMSPerMB=0 -XX:-ReduceInitialCardMarks -XX:+CMSPermGenSweepingEnabled -XX:CMSInitiatingPermOccupancyFraction=70 -XX:+ExplicitGCInvokesConcurrent -XX:+PrintGCDetails -XX:+PrintGCDateStamps -XX:+PrintGCApplicationConcurrentTime -XX:+PrintHeapAtGC -XX:+HeapDumpOnOutOfMemoryError -XX:-OmitStackTraceInFastThrow -Duser.timezone=Asia/Shanghai -Dclient.encoding.override=UTF-8 -Dfile.encoding=UTF-8"
export JAVA_OPTS="$JAVA_OPTS -Xloggc:/opt/logs/100003171/heap_trace.txt -XX:HeapDumpPath=/opt/logs/100003171/HeapDumpOnOutOfMemoryError/"

SERVER_PORT=8080
SERVER_URL="http://localhost:$SERVER_PORT"

source ./common_startup.sh
