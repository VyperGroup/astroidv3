# Your bash variables here
$AERO_PATH="static/aero" # The directory where aero's files should be

./node_modules/aero-proxy/examples/install-aero.sh

curl https://raw.githubusercontent.com/vortexdeveloperlabs/sdk/refs/heads/main/aeroHandleSimple.js -o static/aeroHandleSimple.js
cp ./node_modules/aero-proxy/examples/swWithSwitcher.js static/sw.js
sed -i 's/const defaultProxy = "aero";/const defaultProxy = "uv";/' static/sw.js
