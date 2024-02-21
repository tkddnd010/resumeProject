# resumeProject

## 1. 비밀번호를 DB에 저장할 때 Hash를 이용했는데, Hash는 단방향 암호화와 양방향 암호화 중 어떤 암호화 방식에 해당할까요?

#### 답변 : 단방향 암호화

## 2. 비밀번호를 그냥 저장하지 않고 Hash 한 값을 저장 했을 때의 좋은 점은 무엇인가요?

#### 답변 : 비밀번호를 그냥 평문으로 저장하게 되면 탈취를 당하게 될 경우 악의적인 사용자가 비밀번호를 이용해 로그인하여 내 정보를 가져가거나 수정하는 등의 위험이 있지만 Hash한 값으로 저장했을 경우 Hash로 이미 암호화된 암호문은 다시 복호화가 안 되기 때문에 탈취당할 위험이 줄어들어 좋다.

## 3. JWT(Json Web Token)을 이용해 인증 기능을 했는데, 만약 Access Token이 노출되었을 경우 발생할 수 있는 문제점은 무엇일까요?

#### 답변 : Access Token이 노출되면 이 토큰값이 인증에 필요한 모든 정보를 가지고 있어 피해 규모가 커지지고 하고, 이 토큰이 탈취당한 토큰인지 알 수도 없으며, 강제로 토큰을 만료시킬 수도 없기때문에 위험하다.

## 4. 해당 문제점을 보완하기 위한 방법으로는 어떤 것이 있을까요?

#### 답변 : access Token의 만료기간을 짧게 설정하고 인증에 필요한 정보를 서버에 저장하는 Refresh Token를 이용하여 access Token을 다시 발행 받는 방법으로 access Token의 노출위험을 줄일 수 있다.

## 5. 인증과 인가가 무엇인지 각각 설명해 주세요.

#### 답변 : 서비스를 이용하려는 사용자가 인증된 신분이 맞는지를 검증하는 작업이고 인가는 이미 인증된 사용자가 특정 작업이나 파일에 접근할 수 있는 권한이 있는지를 검증하는 작업을 뜻한다.

## 6. 과제에서 구현한 Middleware는 인증에 해당하나요? 인가에 해당하나요? 그 이유도 알려주세요.

#### 답변 : 로그인을 하여 인증된 사용자가 어떠한 특정한 작업을 하기 위해 Middleware을 지나가면서 문제가 없다면 해당 작업을 실행할 수 있기에 인가라고 생각합니다.

## 7. 과제를 진행하면서 사용한 Http Status Code를 모두 나열하고, 각각이 의미하는 것과 어떤 상황에 사용했는지 작성해 주세요.

#### 답변 : 200 - 요청이 성공적으러 되었습니다 , 201 - 요청이 성공적이었으며 그 결과로 새로운 리소스가 생성되었습니다 , 400 - 이 응답은 잘못된 문법으로 인하여 서버가 요청을 이해할 수 없습니다 , 401 - 요청한 응답을 받기 위해서는 반드시 인증이 필요합니다 , 403 - 클라이언트는 콘텐츠에 접근할 권리를 가지고 있지 않습니다 , 404 - 서버는 요청한 리소스를 찾을 수 없습니다 , 500 - 서버에 문제가 있습니다.

## 8. MySQL, Prisma로 개발했는데 MySQL을 MongoDB로 혹은 Prisma 를 TypeORM 로 변경하게 된다면 많은 코드 변경이 필요할까요? 주로 어떤 코드에서 변경이 필요한가요?

#### 답변 : 주로 속성값에 변경이 필요로 하다고 생각하고 속성값들의 종류에 따라 코드 변경의 양이 정해진다고 생각합니다.

## 9. 만약 이렇게 DB를 변경하는 경우가 또 발생했을 때, 코드 변경을 보다 쉽게 하려면 어떻게 코드를 작성하면 좋을 지 생각나는 방식이 있나요? 있다면 작성해 주세요.

#### 답변 : 정말 필요한 최소한의 정보들과 속성들을 정의하면 될것 같습니다.

## 10. notion 혹은 엑셀에 작성하여 전달하는 것 보다 swagger 를 통해 전달하면 장점은 무엇일까요?

#### 답변 : RESTful API를 문서화하고, 사용자가 테스트하고 호출하기 쉽도록 도와주고, 개발자간의 소통을 원할하게 도와줄 수 있습니다.

## API명세서 URL : https://www.notion.so/dc126dcab0514c1997eca8ec22b724c0?v=f5c4da9935da4a7ebc8b330c5d8636ab

## ERD URL : https://www.erdcloud.com/d/WEcG5wSLSHJz9hhDH
# Haha
