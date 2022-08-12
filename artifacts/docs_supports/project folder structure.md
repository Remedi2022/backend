# Project Folder Structure

### 프로젝트 폴더 구조 및 설명(Monolithic 구조 개발 시 - 최초 프로젝트 구조)

```
artifacts
L docs_management // 프로젝트 관리를 위한 문서 저장 폴더
L docs_supports // 프로젝트 참고 기술 자료 관리 폴더

src
L api
	L middleware // routes 와 controller 사이에서 validation 하는 폴더
  L routers // API 정의 폴더
L bin // 서버 동작 부분 분리한 폴더
L config // 공개되면 취약한 환경 변수 및 DB 설정 저장 폴더
L controllers // Services 연결, 클라이언트의 요청에 응답하는 폴더 -> Client Tier
L errors // Custom error 폴더
L dto // 레이어 간 데이터 이동에 사용할 객체 저장 폴더
L models
	L entities // DB Models 폴더
	L repositories // Data Access logic 관리 폴더 -> Data Tier
L passport // 사용자 인증 관련 폴더
L seeder // 처음 서버 실행 시, 생성되어야 할 DB 저장 폴더
L services // Business logic 캡슐화, DataAccess layer 연결 Application Tier
L loaders // 시작 프로세스를 모듈별로 분할 ex. express, typeorm
L app.ts // 서버 구성 코드, Entry Point For Application
```
