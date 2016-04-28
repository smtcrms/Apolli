#!/bin/bash
SERVICE_NAME=apollo-configservice

cd `dirname $0`/..
./$SERVICE_NAME".jar" stop