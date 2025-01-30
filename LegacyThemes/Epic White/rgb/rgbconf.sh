#!/bin/sh
. /opt/muos/script/var/func.sh
/opt/muos/device/"$(GET_VAR "device" "board/name")"/script/led_control.sh 6 25 10
