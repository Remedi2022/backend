# index_signature

string literal 타입이 아닌 string 타입으로 객체에 접근하기

-   객체의 타입을 지정할 때, `index signature`를 한 줄 추가
-   객체의 Property를 읽을 때, key 값에 `string literal` 타입이 아닌, `string` 타입이 들어가도 컴파일 가능

```
// index signature 추가
interface config {
    [key: string]: ConnectionOptions;
}
```
