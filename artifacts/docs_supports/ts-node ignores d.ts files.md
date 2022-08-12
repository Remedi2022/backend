# ts-node ignores d.ts files

-   TypeScript 를 js로 컴파일 한 경우 문제가 없지만, 빠르게 작업하기 위해 `ts-node` 로 컴파일 없이 작업하려 하면, types 가 작동 안함
-   `ts-node` doc 를 보면, `--files` 옵션을 사용 하지 않는 경우 `files`, `include`, `exclude` 가 default → `false` 가 된다고 함.

```
    // tsconfig.json 에서 수정하는 버전
    {
    "compilerOptions": {
        ...
    },
    "ts-node": {
        "files": true
    }
    }

    // script 에서 수정하는 버전
    "scripts": {
        "start": "ts-node --files ~~~~"
    }
```
