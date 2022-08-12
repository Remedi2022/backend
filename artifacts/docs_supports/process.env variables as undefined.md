# Process.env variables as undefined

process.env 변수가 undefined 로 인식되는 것을 방지하는 코드

```
error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string | IConnectionParameters<IClient>'.
Type 'undefined' is not assignable to type 'string | IConnectionParameters<IClient>'.
```

fixed it

```
// @types/d.ts
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            name: type
        }
    }
}
```
