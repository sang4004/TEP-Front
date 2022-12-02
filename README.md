# MMS Monorepo

> 항상 git pull 후에는 package.json 변경점이 있다면 "npm run bootstrap" 필요!

## default setting
0. nodejs lts version install ( 14.17v )
1. npm i -g typescript@3.9.7
2. npm i -g lerna@3.22.1
3. npm i -g concurrently@6.0.1
4. npm i -g cross-env
5. 아래 커맨드 실행
    ```
    node setup.js
    ```
6. npm run bootstrap => 각 pacakge 의존성 재설치 및 검토단계
7. npm run watch
8. Go package app dir, npm start. ex ) cd hdc-app & npm start

## 각 package 명세
- common-module ( common_module )
    ```
    - react-redux 저장소
    ```
- components
    ```
    - 공용 컴포넌트 모음
    ```
- history-module ( history_module )
    ```
    - react-router-dom history module
    ```
- hooks
    ```
    - react hooks 만을 사용한 모듈
    - hooks 기반 작업시에 유용한 기능들 모음
    ```
- lodash-module ( lodash_module )
- log-cli , log-core 
    ```
    - terminal log 
    ```
- utils-ts, utils-js ( utils_ts, utils_js )
    ```
    - only fure js function
    - ts, js 구분점은 ts 로 구현하기 애매한 기능들을 js 로 제외
    ```
- pop-fe ( pop_fe )
    ```
    - 바코드 모듈 app
    ```
- dashboard-app ( dashboard_app )
    ```
    - 대시보드 (현황판) app
    ```
- hdc-app ( hdc_app )
    ```
    - 통영에코파워 서비스
    - 공문서수발신 시스템
    - EDMS ( 도서관리 시스템 )
    ```

## Rules
0. initalized
    ```
    npm run bootstrap
    ```
1. packages app 추가시
    - lerna create <app_name>
    ```
    lerna create pop-fe
    ```
2. module 추가시
    - lerna add <module_name>
    ```
    lerna add react
    2-1. module을 scope에 추가
    ```
    - lerna add <module> --scope=<packages_name>
    ```
    lerna add hooks --scope=pop-fe
    ```
3. module import 에러시
    ```
    lerna clean
    ```
4. module delete
    ```
    1. remove package in package.json
    2. remove package-lock.json ( root, app both. )
    3. npm run bootstrap
    done.
    ```

## TODO
1. build 최적화 ( tailwind.css, babel etc. )
2. 배포 구조 변경
3. react dev server 최적화