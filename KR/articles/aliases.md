<!--
    tagline: Alias branch names to versions
-->

# 별칭(Aliases)

## 별칭을 왜 쓰는가?

VCS 저장소(Version Control System repository)를 사용하는 경우, `2.0` 또는 `2.0.x`와 같은 버전에
대해 비슷한 브랜치들을 보유하게 될 것이다. `master` 브랜치를 위해서 `dev-master` 버전을 보유할
것이다. `bugfix` 브랜치를 위해서, `dev-bugfix` 버전을 보유하게 될 것이다.

만약 `master` 브랜치가 `1.0` ― `1.0.1`, `1.0.2`, `1.0.3`, 등 ― 개발 과정의 배포 과정에
태그 되도록 이용된다면, 이에 의존하는 어떤 패키지들은 아마도 `1.0.*` 버전을 요구하게 될 것이다.

만약 최신 `dev-master`을 요구하는 어떤 패키지가 있다면, 다른 패키지들이 `1.0.*`에 의존하기 때문에
dev 버전이 충돌을 일으키는 문제를 만들 것이다. 왜냐하면 `dev-master`는 `1.0.*` 조건에 맞지 않기
때문이다.

별칭을 입력해라.

## 브랜치 별칭

`dev-master` 브랜치는 당신의 주요한 VCS 저장소 중 하나다. 이 저장소는 최신 master 개발 버전을 원할
어떤 패키지에게 상당히 흔하다. 그러므로 Composer는 당신이 `dev-master`를 `1.0.x-dev` 버전으로 별칭
할 수 있도록 한다. 이렇게 하기 위해서는 `composer.json` 중 `extra` 아래 `branch-alias` 필드를
다음과 같이 해야한다.

```json
{
    "extra": {
        "branch-alias": {
            "dev-master": "1.0.x-dev"
        }
    }
}
```

만약 호환되지 않는(non-comparible) 버전(dev-develop 같은)을 별칭하는 경우 `dev-`는
브랜치 이름이어야 한다. 당신은 이 경우에도 호환되는 버전으로 별칭할 수 있는데
(즉, 숫자로 시작하고, `.x-dev`로 끝난다), 더 특정한 버전이어야만 한다.
예를 들면, 1.x-dev는 1.2.x-dev 로 별칭되어야 한다.

별칭은 호환되는 개발 버전이어야 하고, `branch-alias`(브랜치 별칭)는 이 별칭이 참고하는
브랜치에 존재해야 한다. `dev-master`에 대해서, 당신은 이 브랜치 내용을 `master` 브랜치에
커밋 해야할 필요가 있다.

결과적으로, 이제 어떤 패키지든 `1.0.*`를 요구하면 즐겁게 `dev-master`를 설치해도 된다.

브랜치 별칭을 사용하기 위해서, 패키지 별칭을 붙인 저장소를 갖고 있어야 한다. 만약
유지 보수를 하지 않는 서드 파티 패키지의 한 포크(fork)를 별칭하고 싶은 경우, 아래에
설명하는 인라인 별칭(inline aliases)을 사용하라.

## 인라인 별칭 요구하기

브랜치 별칭은 주요 개발 과정에서 훌륭하다. 하지만 별칭을 사용하기 위해서는
소스 저장소에 대한 제어를 할 수 있어야 하고, 버전 제어에 대한 변화를 커밋
할 수 있어야 한다.

당신의 로컬 프로젝트가 의존하는 몇몇 라이브러리에 대해 단순히 버그 수정을
원하는 경우, 이는 정말 즐겁지 않다.

이런 이유 때문에, 당신 패키지 내부 `require` 와 `require-dev` 필드에 별칭할 수
있다. `monolog/monolog` 패키지에서 당신이 버그를 발견했다고 가정해보자. 당신은
깃허브에서 [Monolog](https://github.com/Seldaek/monolog) 를 복제하고, `bugfix`
라는 이름의 브랜치에 그 이슈를 수정했다. 이제 당신은 버그를 수정한 monolog 를
당신의 로컬 프로젝트에 설치하고 싶다.

당신은 `monolog/monolog` 버전 `1.*`가 필요한 `symfony/monolog-bundle`을 이용하고
있다. 그래서 당신은 당신의 `dev-bugfix`가 그 조건(`1.*`)에 맞길 바란다.

당신 프로젝트 루트 `composer.json` 에 다음을 추가하기만 하면 된다.

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/you/monolog"
        }
    ],
    "require": {
        "symfony/monolog-bundle": "2.0",
        "monolog/monolog": "dev-bugfix as 1.0.x-dev"
    }
}
```

이렇게 하면, 당신의 깃허브에서 `monolog/monolog`의 `dev-bugfix` 버전을 가지고 와서
`1.0.x-dev`라고 별칭할 것이다.

> **주:** 만약 한 패키지에서 인라인 별칭이 요구되면, 그 별칭(코드 중 `as`
> 오른쪽 부분)은 버전 조건으로 사용될 것이다. `as` 왼쪽 부분은 폐기된다.
> 결과적으로, 만약 A가 B를 요구했고, B가 `monolog/monolog`의
> `dev-bugfix as 1.0.x-dev` 버전을 요구했다면, A를 설치하는 것은 B가 `1.0.x-dev`
> 를 요구하게 하고, `1.0.x-dev`는 실제 `1.0`에 존재할 수도 있다.
> 만약 존재하지 않는다면, A의 `composer.json`에서 다시-인라인-별칭(re-inline-aliased)
> 한다.

> **주:** 인라인 별칭은 패키지를 발행하는 경우, 특히 피해야 한다.
> 만약 당신이 버그를 찾는다면, 상류(upstream)에 당신이 수정한 것이 반영될 수 있게 하고,
> 이 상류를 가져오도록 하라. 이렇게 하는 것이 당신 패키지 이용자들이
> 문제들을 겪지 않도록 할 것이다.
