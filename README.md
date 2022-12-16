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
    
    ![스크린샷 2022-12-16 오후 12.18.52.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9dabf8b9-c2c3-4fcb-a4c8-7d216f7a103f/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2022-12-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_12.18.52.png)
    
- API 명세서
    
    ![명세서.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4ad35380-a105-40d2-8e22-fcbed064fe85/%EB%AA%85%EC%84%B8%EC%84%9C.png)

## API 명세서

![API 명세서](./artifacts/docs_management/img/%EB%AA%85%EC%84%B8%EC%84%9C.png)
