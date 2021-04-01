#! /usr/bin/env bash

function start {
  cd ~;
  tar xf node-modules.tar.gz;
  mkdir -p  /yinhe/app-logs/$APPNAME/$HOSTNAME/
  rm -rf /yinhe/logs/$APPNAME && ln -sf /yinhe/app-logs/$APPNAME/$HOSTNAME/ /yinhe/logs/$APPNAME
  yarn start
}

function build {
  yarn --registry https://registry.npm.taobao.org && yarn build
}

function unit_test {
  yarn jest
}

action=${1}
$action
