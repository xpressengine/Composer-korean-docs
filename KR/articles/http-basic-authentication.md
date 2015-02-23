
# HTTP basic authentication

여러분의 [Satis or Toran Proxy](handling-private-packages-with-satis.md) 서버는 HTTP 기본인증을 사용하여 보안을 강화할 수 있습니다. 프로젝트가 해당 저장소에 접근을 허용하기 위해서 컴포저에 인증에 필요한 정보를 추가해야 합니다. 

가장 간단한 방법은 다음과 같이 인증정보를 저장소 설정에 함께 지정하는 것입니다:

```json
{
    "repositories": [
        {
            "type": "composer",
            "url": "http://extremely:secret@repo.example.org"
        }
    ]
}
```

이렇게 하면 기본적으로 제공된 저장소에서 패키지를 읽어올 때 컴포저가 자동으로 자격을 증명하면서 패키지를 가져올 수 있습니다. 

함께 작업하는 모든 사람들의 경우를 고려하여 프로젝트의 composer.json에 인증정보를 입력하지 않을 수도 있습니다. 이러한 경우에 두번째 방법으로 인터렉티브 하게 인증 정보를 입력할 수 있습니다. 컴포저가 저장소에 연결시에 사용자 이름과 비밀번호를 프롬프트로 부터 입력받는 방식입니다.

인증을 위한 세 번째 방법은 `COMPOSER_HOME`또는 `composer.json` 외에 `auth.json`파일을 이용하는 것이다.

이 파일은 hostnames 설정을 따르는 각각의 사용자 이름 / 패스워드 세트를 포함하고 있습니다 . 예제 : 

```json
{
    "basic-auth": {
        "repo.example1.org": {
            "username": "my-username1",
            "password": "my-secret-password1"
        },
        "repo.example2.org": {
            "username": "my-username2",
            "password": "my-secret-password2"
        }
    }
}
```

auth.json 파일의 주요 장점은 gitignore에 포함 할 수 있다는 것입니다. 이렇게 하면 팀의 모든 개발자가 각자의 인증정보를 가질 수 있으며, 모두가 공유할 때 보다 인증의 취소도 쉽게 할 수 있습니다.