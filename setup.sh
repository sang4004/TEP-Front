npm run bootstrap &&
tsc -p ./packages/fuse/ &&
rm ./packages/fuse_app/lib/AppContext.d.ts &&
tsc -p ./packages/fuse_app/ &&
tsc -p ./packages/hooks/ && 
tsc -p ./packages/utils-js/ &&
tsc -p ./packages/components/ &&
npm run bootstrap &&
tsc -p ./packages/utils-ts/ &&
tsc -p ./packages/common-module/