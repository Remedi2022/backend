# backend

22년도 졸업 프로젝트 백엔드 소스 코드입니다.

---

- Bulit with
    - Typescript
    - Express.js
    - PostgreSQL
    - Kafka
- DevOps
    - AWS EC2
    - AWS RDS(PostgreSQL)
- 실행 방법
    - 코드 다운로드
        
        ```markdown
        git clone https://github.com/Remedi2022/backend.git
        ```
        
    - PostgreSQL 설치 및 실행
    - Kafka 설치 및 실행
        
        [Apache Kafka](https://kafka.apache.org/downloads)
        
        ```markdown
        // terminal
        cd Downloads
        tar -xzf 다운로드된 카프카 파일 이름
        mv (다운로드된 카프카 파일 이름) (원하는 폴더 위치)
        cd 원하는 폴더 위치
        
        // 주키퍼 먼저 실행
        ./bin/windows/zookeeper-server-start.bat ./config/zookeeper.properties
        // 카프카 실행
        ./bin/windows/kafka-server-start.bat ./config/server.properties
        
        // 실행 확인
        netstat -a -> 포트 확인(kafka -> 9092, zookeeper ->2181)
        ```
        
    - src → .env 파일 만들기
        
        ```markdown
        // PostgreSQL 기준
        
        PORT=(원하는 포트 번호)
        _USERNAME=postgres
        PASSWORD=(설정한 DB 비밀번호)
        DATABASE=(설정한 DB 이름)
        HOST=localhost
        DB_PORT=5432
        COOKIE_SECRET=(원하는 값)
        ```
        
    - 필요 패키지 설치 및 실행
        
        ```markdown
        // terminal
        // 패키지 설치
        npm install
        
        // 패키지 실행
        npm start
        ```
        

- ERD
    
    <img width="674" alt="KakaoTalk_20221216_164644399" src="https://user-images.githubusercontent.com/102170253/208052324-7122efa7-062b-4efc-b252-4a6daa5af986.png">
    
- API 명세서
    
    ![API 명세서](./artifacts/docs_management/img/%EB%AA%85%EC%84%B8%EC%84%9C.png)
