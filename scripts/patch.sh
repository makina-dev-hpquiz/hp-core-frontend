#!/bin/bash
# file: patch.sh

# source :  https://github.com/coturiv/ionic-typeorm-starter/blob/master/scripts/patch.sh


# ==========================
# Remove typeorm warnings: 
# ==========================
#
# WARNING in ./node_modules/typeorm/browser/driver/react-native/ReactNativeDriver.js
# Module not found: Error: Can't resolve 'react-native-sqlite-storage' in '.\node
# _modules\typeorm\browser\driver\react-native'


# replace 'this.sqlite = require("react-native-sqlite-storage");' '' 'node_modules/typeorm/browser/driver/react-native/ReactNativeDriver.js'
