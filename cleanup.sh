rm -rf ./packages/*/node_modules
rm -rf ./node_modules

npm run bootstrap

tsc -p ./packages/components/
tsc -p ./packages/fuse/
tsc -p ./packages/common-module/
tsc -p ./packages/fuse_app/
tsc -p ./packages/hooks/
tsc -p ./packages/utils-js/
tsc -p ./packages/utils-ts/

npm run bootstrap

tsc -p ./packages/components/
tsc -p ./packages/fuse/
tsc -p ./packages/common-module/
tsc -p ./packages/hooks/
tsc -p ./packages/utils-js/
tsc -p ./packages/utils-ts/