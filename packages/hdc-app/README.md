# HDC_APP Front End
> author by jh.jeong

-  React Hooks + Redux ... ( package.json )
1. 각 폴더 별 기능 명세
	1. common : redux actions, reducers ( api network)
	2. components : render component ( ex Box, Footer, Header, Modal )  
	3. hooks : use React Hooks,  **always recycle need**
	4. images : 필요한 이미지들
	5. pages : 각 page
	6. utils : 유용하게 쓸 기능들, **react** 에 **종속적이지 않은 기능**들만 존재
2. FE 개발기술 관련 Notion.so
	- https://www.notion.so/moornmo/PMS-FE-268c2862c4ed4ddfbcbdef3fc9c42953

3. 자동 생성 커맨드 hygen 사용. ( npm i -g hygen )
	- 아래 커맨드에 "" 표시는 제외하고 해주세요.
	- component generate cmd : hygen pop component --name "component name ex ) box"
	```
	hygen pop component --name box
	```
	- redux action create cmd : hygen pop action_create --action "action project name ex ) user, customoer.." 
	```
	hygen pop action_create --action user
	```
	- redux action/reducer generate cmd : hygen pop action_add --store "reducer name ex ) user"  --action "action 명 ex ) login"
	```
	hygen pop action_add --store user --action login
	```
	- page add cmd  : hygen pop page_create --name "page name ex ) main, login .."
	```
	hygen pop page_create --name login
	```

4. 파일 상단 Description 규칙
	```
	/******************************************************************************
	* Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
	* Data modelings and methods used are assets of Moornmo Inc.                 *
	* <%=name%>/index.tsx -> 파일명 ( index 일 경우 폴더명 추가 )
	* hooks : -> 사용한 hooks 명세
		* ex ) useLocations
	* components : -> 사용한 component 명세
		* ex ) ConfirmButton 
	* actions : -> action 기능 명세
		* ex ) Login
	* lasy modify : git commit 시에 본인의 git 계정명으로 업데이트
	******************************************************************************/
	```

5. Fuse File List
	- tailwind.config.js
	src/
	- @fuse_app
	- @fuse
	- @history
	- @lodash