# passport 타입 에러

### 문제 발생

```
// @types/passport 타입 정의에서 User 부분이 빈칸
import { IncomingMessage } from 'http';

declare global {
  namespace Express {
    interface AuthInfo {}
    interface User {} // <- User 타입 정의 부분 (Empty)

    interface Request {
      authInfo?: AuthInfo;
      user?: User; // <- user의 타입 = User

      login(user: User, done: (err: any) => void): void;

            ...

      logout(): void;
      logOut(): void;
      isAuthenticated(): boolean;
      isUnauthenticated(): boolean;
    }
  }
}
```

### 해결 방법

```
// 타입 재정의
// @types/index.t.ds
import UserModel from '../models/user'; // <- User Entity

declare global {
  namespace Express {
    export interface User extends UserModel { }
  }
}
```
