<!--
    tagline: Access privately hosted packages
-->

# HTTP basic authentication

당신의 [Satis or Toran Proxy](handling-private-packages-with-satis.md) 서버는 http basic authentication(http 기본 인증)을 얻을 수 있습니다. 물론 당신의 프로젝트가 패키지에 접근할 수 있도록 자격을 인증하는 것은 composer로 해야합니다.

아래와 같이 당신의 자격 증명을 저장소 설명으로 간단하게 해줍니다. :

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

이것은 제공된 composer 저장소에서 패키지를 읽어올 때 composer로 자동으로 자격을 증명하는 기본적인 가르침이다.

당신의 composer.json에 자격 증명을 하지 않으면, 모두에게 작동하지 않습니다. 거기에 정보를 제공하고, 상호 작용을 하는 두번째 방법은 composer가 사용자 연결 시 사용자 이름과 비밀번호를 입력받는 방식입니다.

당신이 사전 구성을 원한 때의 세 번째 방법은 `COMPOSER_HOME`또는 `composer.json`
외에 `auth.json`파일을 이용하는 것이다.

이 파일은 hostnames 설정을 따르는 각각의 사용자 이름 / 패스워드 세트를 포함한다. 예시 : 

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

auth.json 파일의 주된 장점은 gitignore 할 수 있다는 것이다 그래서 팀의 모든 개발자가 자격 증명을 배치할 수 있으며, 모두가 공유할 때 보다 인증의 취소도 쉽게 할 수 있다.