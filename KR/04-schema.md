# composer.json의 구조

이 챕터에서는 `composer.json`에서 사용가능한 모든 항목에 대해서 설명하겠습니다.

## JSON의 구조

[JSON의 구조](http://json-schema.org)는 문서화 형태로 포맷이 구성되어 있고, `composer.json`의 형태를 검증하는데도 사용할 수 있습니다. 실제로, 이것은 `validate` 명령어를 통해 사용됩니다. composer.json 의 형태는 다음과 같이 구성될 수 있습니다: [`res/composer-schema.json`](https://github.com/composer/composer/blob/master/res/composer-schema.json)

## Root 패키지

 루트 패키지는 프로젝트의 루트에 있는 `composer.json`에 의해 정의 된 패키지입니다. 그것은 프로젝트의 요구사항을 정의하는 메인 `composer.json`를 의미합니다.

일부 항목들은 루트 패키지의 문맥에서만 사용됩니다. `config` 항목이 그 예입니다. 오직 루트 패키지에서만 설정할 수 있습니다. 종속패키지의 설정들은 무시되어 집니다. 이러한 특징이 `config` 항목을 `root-only`로 만듭니다.

만약 그것에 쓰이고 있는 종속 패키지중 중 하나를 복제했다면, 이제 그 패키지가 루트 패키지입니다. `composer.json`은 같지만 문맥은 다른것을 확인할 수 있습니다.

> **참고:** 하나의 패키지는 문맥에 따라 루트 패키지가 될수도 있고 아닐수도 있습니다. 예를 들어, 만약 프로젝트가 `monolog` 라이브러리를 의존하고 있다면, 프로젝트가 루트 패키지 입니다. 하지만, 만약 Github로 부터 버그를 수정하기 위해 `monolog`를 복제한다면, `monolog`가 루트 패키지 입니다.

## 속성

### name - 이름

패키지의 이름입니다. 이것은 `/`로 나뉘는 벤더의 이름과 프로젝트의 이름으로 구성되어 있습니다.

예제:

* monolog/monolog
* igorw/event-source

퍼블리시 된 패키지(라이브러리)의 경우 필수속성입니다.

### description - 설명

패키지에 대한 짧은 설명입니다. 일반적으로 한줄 정도의 길이로 구성됩니다. 
퍼블리시 된 패키지(라이브러리)의 경우 필수속성입니다.

### version - 버전

패키지의 버전을 의미합니다. 대부분의 경우에 버전은 생략할 수 있으므로 필수사항은 아닙니다.(아래 참조)

버전은 `X.Y.Z` 또는 `vX.Y.Z`의 포멧을 따라야 합니다. 선택적으로 `-dev`, `-patch`, `-alpha`, `-beta` 또는 `-RC`와 같은 접미사와 함께 쓸 수 있습니다. patch, alpha, beta 그리고 RC는 접미사로 숫자가 따라올 수 있습니다.

사용예:

- 1.0.0
- 1.0.2
- 1.1.0
- 0.2.5
- 1.0.0-dev
- 1.0.0-alpha3
- 1.0.0-beta2
- 1.0.0-RC5

패키지 저장소가 VCS 저장소 안에 VCS 태그 이름과 같이 어딘가에서 버전을 유추할 수 있다면, 이러한 경우에도 생략하는 것이 좋습니다.

> **참고:** Packigist는 VCS 저장소를 사용합니다. 그래서 위의 문장은 Packigist에 대해서 아주 잘 나타내줍니다. 버전을 사용자가 직접 작성한다면 실수로 인해 언젠가 높은 확률로 문제가 발생할 소지가 있습니다. 

### type

패키지의 타입을 정의합니다. 기본타입은 `library` 입니다.

패키지 타입은 커스텀 설치를 위해 사용됩니다. 당신의 패키지가 설치하기 위한 특별한 로직이 필요 하다면, 커스텀 타입을 선언해야 합니다.
예를들면 `symfony-bundle`, `wordpress-plugin` 혹은 `typo3-module`등을 사용 할수 있습니다. 이 모든 타입들은 각각의 프로젝트 마다 다르게 사용됩니다. 그리고 그 타입들은 그 타입에 맞는 설치 가능한 설치 패키지를 제공해야 합니다.

composer 가 기본으로 지원하는 4가지 타입들 (설치 패키지가 필요하지 않음).

- **library:** `vendor`에 파일들을 복사 하는 기본 타입입니다. 
- **project:** 라이브러리 가 아닌 패키지를 의미합니다. 예를 들면  [Symfony standard edition](https://github.com/symfony/symfony-standard)와 같은 쉘 어플리케이션이 있으며 [SilverStripe installer](https://github.com/silverstripe/silverstripe-installer) 같은 CMS 프로젝트가 있습니다. 
  혹은 패키지 처럼 완전히 분리되었을 때 사용합니다. 새로운 작업공간을 생성할때 초기설정 리스트를 제공하는 IDE들에 의해 사용되는 것을 예로 들수 있습니다.
- **metapackage:** An empty package that contains requirements and will trigger
  their installation, but contains no files and will not write anything to the
  filesystem. As such, it does not require a dist or source key to be
  installable.
 - **metapackage:** requirement가 포함된 비어있는 패키지는 작동시 설치가 된다. 그러나 파일이 포함되어 있지 않으면 어떠한 내용도 파일시스템에 쓰지 않는다. 그러므로 설치시에 dist 혹은 source key 를 요구하지 않고 설치됩니다.
- **composer-plugin:** `composer-plugin`타입의 패키지는 다른 커스텀 패키지들을 위해 인스톨러를 제공합니다. 자세한 내용은 [dedicated article](articles/custom-installers.md)에서 확인 할수 있습니다.
  
Only use a custom type if you need custom logic during installation. It is
recommended to omit this field and have it just default to `library`.

패키지를 설치하는데 커스텀 로직이 필요하면 커스텀 타입을 사용하면 됩니다. 그 외에는 타입 설정을 하지 않거나 `library` 기본 셋팅을 하는것을 추천합니다.

### keywords

패키지와 관계가 있는 키워드가 배열 형태로 선언됩니다. 이것들은 검색과 필터링에 사용 됩니다.

사용예:

- logging
- events
- database
- redis
- templating

필수 항목이 아닙니다. 

### homepage

프로젝트의 웹사이트 URL 입니다.

필수 항목이 아닙니다. 

### time

해당 버젼의 릴리즈 날짜입니다.
반드시 `YYYY-MM-DD` 혹의 `YYYY-MM-DD HH:MM:SS` 의 형태로 사용해야 합니다.

필수 항목이 아닙니다. 

### license

패키지의 라이센스를 정의 합니다. 문자 형태 혹은 배열 형태로 정의할 수 있습니다.

가장 일반적인 사용되어 지는 라이센스의 추천 항목들은 다음과 같습니다. (알파벳 순 정렬)

- Apache-2.0
- BSD-2-Clause
- BSD-3-Clause
- BSD-4-Clause
- GPL-2.0
- GPL-2.0+
- GPL-3.0
- GPL-3.0+
- LGPL-2.1
- LGPL-2.1+
- LGPL-3.0
- LGPL-3.0+
- MIT

필수 항목은 아니지만 라이센스를 정의하는 것을 매우 추천합니다. 라이센스들의 기타 항목들은 [SPDX Open Source License Registry](http://www.spdx.org/licenses/) 에서 확인 할수 있습니다.

더이상 제공하지 않는 소프트웨어에 대해서는 `"proprietary"` 로 설정 하면 됩니다.

사용예:

```json
{
    "license": "MIT"
}
```

배열 형태의 선언은 여러개의 라이센스 중 선택해서 사용해야 하는 패키지에서 설정 할 수 있습니다.

다른 라이센스의 예:

```json
{
    "license": [
       "LGPL-2.1",
       "GPL-3.0+"
    ]
}
```

위의 형태 대신에 or로 구분된 괄호로 묶은 형태로 라이센스를 표시 할 수도 있습니다.

```json
{
    "license": "(LGPL-2.1 or GPL-3.0+)"
}
```

비슷한 경우로 결합한 형태의 라이센스가 지원 되는 경우 위의 예시에서 "or" 대신 "and" 구분자를 사용하여 설정 할 수 있습니다.


### authors - 제작자

패키지의 제작자입니다. 객체형태의 배열로 구성됩니다.

각각의 제작자를 나타내는 객체는 다음의 값들로 구성되어 집니다.

* **name:** 제작자의 이름, 대게 실제 이름을 사용합니다.
* **email:** 제작자의 이메일 주소.
* **homepage:** 제작자 웹사이트의 주소.
* **role:** 해당 프로젝트에서 제작자의 역할. (e.g. 개발자 혹은 번역가)

사용예 :

```json
{
    "authors": [
        {
            "name": "Nils Adermann",
            "email": "naderman@naderman.de",
            "homepage": "http://www.naderman.de",
            "role": "Developer"
        },
        {
            "name": "Jordi Boggiano",
            "email": "j.boggiano@seld.be",
            "homepage": "http://seld.be",
            "role": "Developer"
        }
    ]
}
```

필수 입력 사항은 아니지만, 가급적 입력하기를 권장합니다. 

### support - 지원정보

해당 프로젝트 지원에 대한 다양한 정보를 나타냅니다.

지원 정보는 다음 내용을 따릅니다 :

* **email:** 지원을 위한 이메일 주소.
* **issues:** 이슈관리를 위한 URL.
* **forum:** 포럼 URL.
* **wiki:** 위키 URL.
* **irc:** 지원을 위한 IRC 채널(irc://server/channel).
* **source:** 접근 혹은 다운로드 가능한 소스의 URL.

사용예 :

```json
{
    "support": {
        "email": "support@example.org",
        "irc": "irc://irc.freenode.org/composer"
    }
}
```

필수 항목이 아닙니다. 

### Package links (패키지 관련사항)

해당 내용에서는 패키지의 이름에 대응하는 [버전 제약](01-basic-usage.md#package-versions) 객체를 갖습니다.

사용예시 

```json
{
    "require": {
        "monolog/monolog": "1.0.*"
    }
}
```

모든 패키지 관련사항은 선택사항입니다.

`require`과 `require-dev`는 추가적으로 안정성(stability) 정보를 지원합니다 (root-only).
이것들은 [최소 안정성(minimum-stability)](#minimum-stability)뿐 아니라 더 제한되거나 더 확장할 수 있는 패키지의 안정성을 사용할 수 있게 해줍니다. 당신은 이러한 제약을 적용할 수 있습니다. 만약 안정적이지 않은(unstable) 패키지를 사용하길 원한다면 예시처럼 그냥 비워두시면 됩니다.

사용예 :

```json
{
    "require": {
        "monolog/monolog": "1.0.*@beta",
        "acme/foo": "@dev"
    }
}
```

만약 의존하고 있는 패키지들 중 하나가 안정적이지 않는 패키지라면 해당 패캐지의 확실한 안정성 플래그(stability flag)를 통해 명시적으로 표시해주어야 합니다.

사용예 : 

```json
{
    "require": {
        "doctrine/doctrine-fixtures-bundle": "dev-master",
        "doctrine/data-fixtures": "@dev"
    }
}
```

`require`과 `require-dev`는 추가적으로 개발버전을 위한 참조 값(예컨데, commit)을 명시적으로 표기할 수 있습니다. 이는 업데이트를 수행하더라도 주어진 상태를 고정할 수 있도록 해줍니다. 개발버전을 명시적으로 표기하고자 할 때 `#<ref>`의 형태로 추가하시면 됩니다.

사용예 :

```json
{
    "require": {
        "monolog/monolog": "dev-master#2eb0c0978d290a1c45346a1955188929cb4e5db7",
        "acme/foo": "1.0.x-dev#abc123"
    }
}
```

> **주의:** 이 기능은 매우 편리해 보이지만, 근본적인 위험성 때문에 장시간동안 패키지들을 사용하는 방법이 되어서는 안됩니다. composer.json 메타데이터는 기본적으로 커밋 해쉬값보다 branch 이름으로 부터 정보를 읽어들일 것입니다. 이러한 몇가지 상황 때문에 실제적으로 사용하는 방법이라고 보기 어렵고, 가능한한 항상 Tag 가 표시된 릴리즈를 사용하도록 변경해야합니다.

패키지 정보에 대해 해당하지 않는 버전에 대응하려면 패키지 정보를 한줄로 별칭을 작성함에 따라 가능합니다. 더 많은 정보는 [별칭](articles/aliases.md)에서 볼 수 있습니다.


#### require

해당 패키지에서 필요한 패키지들입니다. 패키지는 요구사항에 작성되지 않는 것들 외에는 설치하지 않습니다.

#### require-dev (root-only)

해당 패키지를 개발하거나 테스트를 수행하는 등에 필요한 패키지들입니다. 기본으로 최상위 패키지(root package)의 개발에 필요한 요구사항을 설치하게 됩니다. `install`과 `update`는 각각 `--no-dev`라는 옵션을 지원하는데, 이는 개발에 필요한 의존성 패키지들을 설치하지 않도록 합니다.

#### conflict

현재 패키지 버전에서 충돌을 일으키는 패키지들입니다. 이들은 당신의 패키지안에 설치되지 않습니다.

`충돌(conflic)` 링크 내에 `<1.0 >=1.1` 처럼 작성되었을 때, 이는 1.0보다 작고, *그리고* 1.1보다 크거나 같은 이 둘을 동시에 만족하는 버전을 참고하는데 이는 반드시 충돌을 일으킬 것입니다. 그리고 이는 아마도 원하는 동작이 아닐 것입니다. 이런 상황에는 `<1.0 | >=1.1`와 같이 작성하셔야 합니다.

#### replace

현재 패키지로 대체 가능한 패키지들의 리스트입니다. 이 replace 를 활용하는 경우는 패키지를 복사(fork)하고, 패키지의 고유한 버저닝과 다른 이름으로 배포할 수 있도록 합니다. 그리고 원본 패키지를 필요로하는 패키지들은 원본 패키지를 대체 할 수 있도록 복사한 패키지로도 동작이 가능하게 해줍니다.

이는 서브 패키지(sub-package)를 포함할때 매우 유용합니다. 예를 들어봅시다. 메인 symfony/symfony 패키지가 각각의 패키지로도 사용가능한 Symfony Components 전체를 포함하고 있습니다. 메인 패키지가 필요하다면 이것은 각 구성요소 모두가 대체될대까지 자동적으로 각 구성요소(components)들의 요구사항을 만족하도록 수행합니다. 

위에 설명한 부가 패키지의 목적을 위해 사용을 대체할 때에는 주의가 필요합니다. 메인 패키지가 정확한 버전 또는 잘못 지정될 수 있는 버전의 서브 패키지들을 명확하게 대체하기 위해서 버전 정보로서 `self.version`을 사용하면 됩니다. 

#### provide

현재 패키지에서 제공하는 다른 패키지들의 리스트입니다. 이는 공통 인터페이스에서 매우 유용합니다. 패키지가 어떤 가상의 `logger` 패키지에 의존한다면, 이 logger 인터페이스를 구현하는 특정 라이브러리를 그저 `provide`안에 추가하면 됩니다. 

#### suggest

해당 항목은 현재 패키지와 함께하면 더 좋거나 강화할 수 있는 패키지들을 제안합니다. 이는 현재 패키지를 사용하는 사용자에게 반드시 필요하진 않지만 추가하면 좋은 패키지들의 정보를 제공하기 위해 설치 이후에 보여지는 단순한 정보입니다.

형태는 위의 패키지 관련사항의 형태와 같습니다. 다만 위의 형태와 달리 값이 버전 정보가 아니고 자유롭게 작성할 수 있습니다.

사용예:

```json
{
    "suggest": {
        "monolog/monolog": "Allows more advanced logging of the application flow"
    }
}
```

### autoload

PHP 오토로더를 위한 오토로더 매핑.

현재는 [`PSR-0`](http://www.php-fig.org/psr/psr-0/) 오토로딩,
[`PSR-4`](http://www.php-fig.org/psr/psr-4/) 오토로딩, 클래스맵(`classmap`) 생성, 파일(`files`) 포함을 지원합니다. PSR-4를 사용하기를 권장하며 이는 사용하기에 매우 쉽습니다. (클래스를 추가할 때마다 매번 오토로드 파일을 재생성하는 번거로움을 피할 수 있습니다.).

(역자주 : PSR-0 는 현재 Deprecated 되었습니다. )

#### PSR-4

`psr-4`에서는 어떤 네임스페이스가 파일경로(패키지 경로에 대한 상대경로)에 대응하는지를 정의할 수 있습니다. `Foo\\Bar\\Baz`와 같이 클래스를 오토로딩할 때 `Foo\\` 네임스페이스의 전두사가 `src/` 디렉터리에 대응되어있다면, 오토로더는 `src/Bar/Baz.php` 파일을 찾을 것이고 그리고 해당 파일이 존재하면 이것을 불러올 것입니다. 예전 PSR-0에 완전히 대응되는 개념으로서 접두사(`Foo\\`)는 현재의 파일경로가 아닙니다.

네임스페이스 접두사는 비슷한 접두사들간의 충돌을 방지하기 위해 반드시 `\\`로 끝나야 합니다.  예를들어 `Foo`는 `FooBar`네임스페이스 내의 클래스에 매치 될 수 있습니다. 뒤에 백슬래쉬를 붙이는 것은 이러한 문제를 해결할 수 있습니다. `Foo\\`와 `FooBar\\`는 분명히 구분되어 집니다.

PSR-4는 설치와 업데이트하는 동안 생성된 `vendor/composer/autoload_psr4.php` 파일에서 볼 수 있는 key => value로 이루어진 모든 배열 값을 참조하도록 되어 있습니다. 

사용예 : 

```json
{
    "autoload": {
        "psr-4": {
            "Monolog\\": "src/",
            "Vendor\\Namespace\\": ""
        }
    }
}
```

같은 네임스페이스의 접두사를 여러 디렉토리에서 찾을 수 있다면 다음과 같이 배열을 통해 정의할 수 있습니다.


```json
{
    "autoload": {
        "psr-4": { "Monolog\\": ["src/", "lib/"] }
    }
}
```

어떠한 네임스페이스에도 찾을 수 있는 폴백 디렉터리가 필요하면 다음과 같이 네임스페이스를 비워두면 됩니다.


```json
{
    "autoload": {
        "psr-4": { "": "src/" }
    }
}
```

#### PSR-0

`psr-0`에서는 어떤 네임스페이스가 파일경로(패키지 경로에 대한 상대경로)에 대응하는지를 정의할 수 있습니다. 이는 PEAR 스타일의 비-네임스페이스 규격도 지원합니다.

확실히 알아두어야 하는 것은 오토로더가 제대로 동작하기 위해서 네임스페이스는 반드시 `\\`로 끝나야 한다는 것입니다. 예를들어 `Foo`는 `FooBar`에 매치 될 수 있습니다. 뒤에 백슬래쉬를 붙이는 것은 이러한 문제를 해결할 수 있습니다. `Foo\\`와 `FooBar\\`는 분명히 구분할 수 있습니다.

PSR-0는 설치와 업데이트하는 동안 생성된 `vendor/composer/autoload_namespaces.php` 파일에서 볼 수 있는 key => value로 이루어진 모든 배열 값을 참조합니다.

사용예 :

```json
{
    "autoload": {
        "psr-0": {
            "Monolog\\": "src/",
            "Vendor\\Namespace\\": "src/",
            "Vendor_Namespace_": "src/"
        }
    }
}
```

같은 네임스페이스의 접두사를 여러 디렉토리에서 찾을 수 있다면 다음과 같이 배열을 통해 정의할 수 있습니다.

```json
{
    "autoload": {
        "psr-0": { "Monolog\\": ["src/", "lib/"] }
    }
}
```

PSR-0 스타일은 네임스페이스 선언을 하지 않은 클래스도 사용이 가능합니다. 이는 전역 네임스페이스에 있는 라이브러리 클래스를 사용할 때 매우 유용합니다. php 소스파일이 패키지의 기본 디렉터리에 위치한다면 다음 예제처럼 작성하실 수 있습니다.

```json
{
    "autoload": {
        "psr-0": { "UniqueGlobalClass": "" }
    }
}
```

어떠한 네임스페이스에도 대응할 수 있는 폴백 디렉터리가 필요하면 다음과 같이 네임스페이스를 비워두면 됩니다.

```json
{
    "autoload": {
        "psr-0": { "": "src/" }
    }
}
```

#### Classmap

`classmap`은 설치와 업데이트하는 동안 생성된 `vendor/composer/autoload_classmap.php` 파일에서 볼 수 있는 key => value로 이루어진 모든 배열 값을 참조합니다. 이러한 맵은 주어진 디렉터리와 파일에 있는 `.php`와 `.inc`파일 내에 있는 모든 클래스를 읽어들여 생성됩니다.

PSR-0/4에서 지원하지 않는 모든 라이브러리의 오토로드를 사용하기 위해서 classmap을 사용할 수 있습니다. 클래스를 검색하기 위한 모든 파일과 디렉토리를 작성하시면 됩니다.

사용예 :


```json
{
    "autoload": {
        "classmap": ["src/", "lib/", "Something.php"]
    }
}
```

#### Files

모든 요청에서 특정 파일을 명시적으로 사용해야할 경우 'files' 오토로드를 사용할 수 있습니다. 이것은 PHP에서 불러올 수 없는 PHP 함수들을 포함한 패키지들을 사용하는데 있어 유용할 것입니다.

사용예 :

```json
{
    "autoload": {
        "files": ["src/MyLibrary/functions.php"]
    }
}
```

### autoload-dev (root-only)

해당 항목은 개발을 목적으로한 오토로드 규칙을 정의하도록 해줍니다.

의존성 패키지로서 해당 패키지를 사용하는 다른 사람들에게는 테스트를 수행하는 클래스와 같은 경우는 메인 오토로드 규칙에 포함될 필요가 없습니다. 이러한 규칙은 오토로더를 그저 지저분하게만 할뿐입니다.

이럴 때 autoload-dev에 해당 내용을 추가하면 됩니다. 이는 유닛테스트를 위한 좋은 해결책이 될 것입니다.

사용예 :

```json
{
    "autoload": {
        "psr-4": { "MyLibrary\\": "src/" }
    },
    "autoload-dev": {
        "psr-4": { "MyLibrary\\Tests\\": "tests/" }
    }
}
```

### include-path

> **DEPRECATED**: 해당 항목은 오래된 프로젝트(레거시 프로젝트)에서만 지원하며, 새로운 코드의 경우 오토로딩을 사용해야 합니다.
>  더이상 지원하진 않지만(deprecated) 컴포저에서 사라지지는 않을 것입니다.

PHP의 `include_path`에 추가되는 경로(paths)입니다.

(역주: `include_path`에 추가된 경로는 프로젝트내에서 `include`, `require` 또는 `file_get_contents(.., true)` 사용시 상대경로나 절대경로를 적지 않아도 됩니다.)


사용예:

```json
{
    "include-path": ["lib/"]
}
```

필수 항목이 아닙니다. 

### target-dir

> **DEPRECATED**: 해당 항목은 기존의 PSR-0 스타일의 오토로딩에서 지원하며, 새로 작성하는 코드의 경우 target-dir를 사용하지 않는 PSR-4를 사용하는 편이 낫습니다. PHP 네임스페이스와 함께 PSR-0를 사용하는 프로젝트의 경우 PSR-4로 옮기는 것이 더 좋습니다.

모든 설치 경로(target)을 정의합니다.

패키지의 기본폴더(root)가 네임스페이스 정의 보다 아래에 있다면, 오토로드하지 못할 것입니다. 이 문제를 해결하기 위해선 `target-dir`을 사용해야 합니다. (역주: PSR-0은 네임스페이스 중 하위 일부만 사용하더라도 기본 네임스페이스부터 모든 폴더를 생성해주어야 합니다.)

예제는 Symfony에서 가져왔습니다. 컴포넌트를 위한 각각의 패키지가 있습니다. Yaml 컴포넌트는 `Symfony\Component\Yaml` 네임스페이스에 있습니다. 패키지의 기본폴더는 `Yaml` 디렉터리입니다. 오토로드 하려면 `vendor/symfony/yaml` 디렉터리가 아닌 `vendor/symfony/yaml/Symfony/Component/Yaml` 디렉터리에 설치되어야 합니다. 그래야 오토로더가 `vendors/symfony/yaml` 디렉터리를 로드할 수 있을 것입니다.

이렇게 하고자 할 때, `autoload`와 `target-dir`은 다음과 같이 정의하면 됩니다.


```json
{
    "autoload": {
        "psr-0": { "Symfony\\Component\\Yaml\\": "" }
    },
    "target-dir": "Symfony/Component/Yaml"
}
```

필수 항목이 아닙니다. 

### minimum-stability (root-only)

- stability : 안정성
- requirement : 요구사항
 
해당 옵션은 패키지에서 안정성을 통해서 패키지를 필터링하는 행동을 정의할 수 있습니다. 기본적으로 `stable`을 기본값으로 합니다. 그렇기 때문에 만약 당신이 `dev` 패키지에 의존해 있다면 당신은 충돌 또는 에러들을 피하기 위해서라도 당신의 파일에 해당(`composer.json`) 옵션을 적어주셔야 합니다.

각 패키지의 모든 버전은 이러한 안정성이 체크되는데, `minimum-stability`로 지정된 값보다 더 낮은 패키지들은 패키지들간의 의존성을 처리할 때 무시됩니다. 특정 패키지의 안정성 요구사항의 변경은  `require` 또는 `require_dev`를 통해 해결할 수 있습니다(함께보기 
[package links](#package-links)).

사용가능한 옵션(앞에 있는 것일 수록 안정성이 낮습니다.)으로는 `dev`, `alpha`, `beta`, `RC`, `stable`이 있습니다.

### prefer-stable (root-only)

해당 옵션을 사용하면 Composer는 사용가능한 안정적인 패키지를 찾을 수 있을 때, 더 안정적인 패키지를 선호하게 됩니다. 당신이 개발 버전을 요구하였거나 알파버전만이 사용가능하다면, 이것들은 최소 안정성(minimum-stability)에서 허락된 것 중 가능한 것을 선택할 것입니다.

해당 옵션을 사용하기 위해서 `"prefer-stable": true`를 사용하면 됩니다.

### repositories (root-only)

추가로 사용하고자 하는 패키지 저장소를 설정할 때 사용합니다.

Composer는 packagist 저장소를 기본값으로 사용합니다. 그 밖에 다른 곳(packagist를 제외한)에서 제공해주는 패키지를 사용하고자 한다면 해당 저장소들을 추가로 작성하시면 됩니다.

저장소는 재귀적으로 사용할 수 없습니다. 그래서 반드시 메인이 되는 `composer.json` 파일에만 해당 내용을 추가하셔서 사용하셔야 합니다. 의존되는 패키지들의 (`vendor`안에 정의되어있는) `composer.json에서 저장소를 정의한다면 그것들은 무시됩니다.

다음 형태의 저장소를 지원합니다.

* **composer:** Composer 저장소는 단순히 네트워크(HTTP, FTP, SSH)를 통해 제공되는 `packages.json`파일입니다. 그리고 이 파일은 `composer.json`의 리스트를 갖고 있습니다. 그리고 `composer.json`은 부가적으로 `dist`, 혹은 `source` 정보를 갖고 있습니다.
* **vcs:** git, svn, hg와 같은 버전관리도구로 부터 패키지들을 가져올 수 있습니다.
* **pear:** 해당값을 통해 pear 저장소를 프로젝트에 추가할 수 있습니다.
* **package:** 만약 Composer를 지원하지 않는 프로젝트에 의존하고 싶다면, 무엇이든간에 당신은 `package` 저장소를 사용하는 패키지를 정의할 수 있습니다. 그저 단순하게 `composer.json` 객체를 나열하면 됩니다.

더 많은 정보를 얻고자 한다면 다음 링크를 참고하시면 됩니다. [Repositories](05-repositories.md)

사용예:

```json
{
    "repositories": [
        {
            "type": "composer",
            "url": "http://packages.example.com"
        },
        {
            "type": "composer",
            "url": "https://packages.example.com",
            "options": {
                "ssl": {
                    "verify_peer": "true"
                }
            }
        },
        {
            "type": "vcs",
            "url": "https://github.com/Seldaek/monolog"
        },
        {
            "type": "pear",
            "url": "http://pear2.php.net"
        },
        {
            "type": "package",
            "package": {
                "name": "smarty/smarty",
                "version": "3.1.7",
                "dist": {
                    "url": "http://www.smarty.net/files/Smarty-3.1.7.zip",
                    "type": "zip"
                },
                "source": {
                    "url": "http://smarty-php.googlecode.com/svn/",
                    "type": "svn",
                    "reference": "tags/Smarty_3_1_7/distribution/"
                }
            }
        }
    ]
}
```

> **주의:** 해당 항목의 경우 순서가 중요합니다. 컴포저는 패키지를 찾을 때 먼저 정의한 저장소부터 뒤쪽으로 순차적으로 검색하며, 가장 먼저 발견되는 패키지를 가져옵니다. Packagist를 기본값으로 사용자 정의 저장소를 덮어씌우고 싶다면 Packagist를 맨 마지막에 추가하시면 됩니다.

### config (root-only)

설정을 변경합니다. 변경한 설정은 (현재) 프로젝트에만 적용됩니다. (--global 옵션을 붙여주면 전체에도 설정됩니다.)

아래 옵션들이 설정 변경을 지원합니다.

* **process-timeout:** 기본값은 `300`입니다. Composer가 실행하면서 'git clones'와 같은 일은 하면 프로세스가 죽을 수 있습니다. 그래서 연결 상태가 느리거나, vendors가 거대할 때, 기본값보다 높은 값이 필요합니다. 
* **use-include-path:** 기본값은 `false`입니다. 값을 true로 해준다면, autoloader가 include path에 해당하는 클래스를 PHP에서 직접 찾습니다.
* **preferred-install:** 기본값은 auto이고, source, dist, auto중 선택할 수 있습니다. 이 옵션으로 선호하는 방법을 선택해 설치할 수 있습니다. (source는 git clone과 같은 소스파일을 그대로 받는 방식, dist는 zip과같이 압축된 형태로 받는 방식, auto는 어떤것이든 상관없이 받는 방식입니다.)
* **store-auths:** 사용자 인증을 위한 메세지 표시로, `true` (저장), `false` (저장 안함), `prompt` (항상 물음) 중 하나를 선택할 수 있습니다. 기본값은 `prompt` 입니다.
* **github-protocols:** 기본값은 `["git", "https", "ssh"]`입니다. github.com 에서 cloning 하는 프로토콜의 우선순위로, 예를 들면 HTTPS 프로토콜 우선 순위를 프록시 뒤에, 또는, 효율성이 낮은 git protocol로 사용자가 아무렇게나 재구성할 수 있습니다.
* **github-oauth:** 도메인 네임과 OAuth 키에 대한 목록입니다. 예를 들어 `{"github.com": "oauthtoken"}` 에서 value인 `oauthtoken`는 github 비밀 저장소 접근 가능케 해주며, 낮은 IP 기반의 속도제한이 있는 API에 대한 접근을 회피 할 수 있도록 해줍니다. github의 OAuth 토큰을 얻는 방법을 읽어보시기 바랍니다. [Read more](articles/troubleshooting.md#api-rate-limit-and-oauth-tokens)
* **http-basic:** 인증에 사용되는 도메인 네임과 사용자이름/비밀번호 목록입니다.`{"example.org": {"username": "alice", "password": "foo"}` 위와 같은 방식으로 작성을 하면 `alice/foo` 값이 `example.org` 에 인증을 하게 됩니다.
* **vendor-dir:** 기본값은 `vendor` 입니다. 사용자는 원한다면 다른 디렉토리에 의존성을 설치할 수 있습니다. `$HOME`과 `~`는 `vendor-dir` 와 `$-dir` 이하의 모든 사용자의 홈디렉토리 경로로 대체할 수 있습니다.
* **bin-dir:** 기본값은 `vendor/bin` 입니다. 만약 프로젝트가 바이너리를 include했다면, `vendor/bin`에 해당하는 디렉토리에 심볼릭링크로 가리켜지게 됩니다.
* **cache-dir:** UNIX 에서의 기본값은 `$COMPOSER_HOME/cache` 이고, Window 에서의 기본값은 `C:\Users\<user>\AppData\Local\Composer` 입니다. Composer에 의해 사용된 캐시가 모두 저장됩니다. 또한 03-CLI에서 [COMPOSER_HOME](03-cli.md#composer-home)를 참고하기 바랍니다.
* **cache-files-dir:** 기본값은 `$cache-dir/files` 입니다. 캐시를 압축 패키지로 저장하는 경로입니다.
* **cache-repo-dir:** 기본값은 `$cache-dir/repo` 입니다. `composer` 타입의 metadata 저장소와 `svn`, `github`, 그리고 `bitbucket` 타입의 VCS 저장소를 저장하는 경로입니다.
* **cache-vcs-dir:** 기본값은 `$cache-dir/vcs` 입니다. VCS 저장소인 `git`/`hg` 의 metadata를 불러해서 빠른속도로 속도설치하는 VCS clones을 저장하는 경로입니다.
* **cache-files-ttl:** 기본값은 `15552000` (6개월) 입니다. Composer caches가 모든 dist 패키지를 다운로드합니다. 기본값인 6개월동안 사용되지 않으면 제거합니다. 이 옵션의 기간은 사용자가 정할 수 있으며, 0으로 설정해 기능을 완전히 사용하지 않을 수 있습니다. 
* **cache-files-maxsize:** 기본값은 `300MiB` 입니다. Composer caches가 모든 dist 패키지를 다운로드합니다. 가비지 콜렉션이 주기적으로 실행되는 경우, 캐시의 최대 사이즈로 실행됩니다. 캐시사이즈보다 클 경우, 가장 오래전에 사용됬던 파일부터 차례대로 지우기 시작합니다.
* **prepend-autoloader:** 기본값은 `true` 입니다. 만약 false 라면, 이미 존재하는 autoloader 앞에 새로운 autoloader가 추가되지 않습니다. 하지만, 이런 경우가 다른 autoloader들과의 상호작용하는 문제를 해결하기 위해 필요하기도 합니다.
* **autoloader-suffix:** 기본값은 `null` 입니다. autoloader에 접미사를 붙여줍니다.(autoloader-blahblah...) null 일때는 자동으로 `autoloader` 가 생성됩니다.
* **optimize-autoloader** 기본값은 `false`. `autoloader`를 dump 할 경우 항상 최적화를 시켜줍니다.
* **github-domains:** 기본값은 `["github.com"]` 입니다. 사용하는 github를 사용하는 도메인 목록입니다. github Enterprise  설정에서 사용됩니다.
* **github-expose-hostname:** 기본값은 `true` 입니다. 만약 false로 설정하면, github의 API를 액세스하기 위해 만든 OAuth의 토큰은 날짜 대신 장비의 호스트 이름이됩니다.
* **notify-on-install:** 기본값은 `true` 입니다. 저장소의 Notification URL을 정의할 수 있으며, 저장소에 패키지가 설치될 때 알려줍니다. 이 설정을 이용해 알림을 받지 않을 수 있습니다.
* **discard-changes:** 이 설정을 사용하면 비-대화식 모드에서 더러운(..) 업데이트를 처리하는 기본 스타일을 설정할 수 있습니다. `true`는 항상 vendors 안의 변경사항을 취소하는 반면, `stash`는 항상 변경된 사항을 재적용 합니다. 수정된 vendors가 적을 경우, CI서버나 배포용 스크립트에서 사용하게 됩니다.(????)

사용예:

```json
{
    "config": {
        "bin-dir": "bin"
    }
}
```

> **주의:** `http-basic`, `github-oauth` 와 같이 사용자 인증 관련 옵션은 `composer.json`외에 `auth.json` 파일 내에 지정할 수 있습니다. 이러한 방법은 .gitignore에 추가할 수 있고, 개발자는 자신의 자격 증명(?)이 가능합니다.

### scripts (root-only)

설치 과정의 여러 부분들을 후킹하여 스크립트를 실행 할 수 있습니다

여기를 보시면 [Scripts](articles/scripts.md) 자세한 설명과 예제가 있습니다.

### extra

`scripts`에서 사용하기 위한 임의의 데이터 입니다.

사실상 뭐든지 할 수 있습니다. 스크립트 내에서 액세스 하기위한 이벤트 핸들러는
아래와 같습니다:

```php
$extra = $event->getComposer()->getPackage()->getExtra();
```

선택적으로 사용 가능합니다.

### bin

설정 파일을 바이너리로 처리하고, `bin-dir`이라는 심볼릭 링크로 만듭니다.

오른쪽 링크를 보시면 [Vendor Binaries](articles/vendor-binaries.md) 자세한 설명이 나옵니다.

선택적으로 사용 가능합니다.

### archive

패키지 압축으로 저장하기 위한 옵션을 설정합니다.

아래와 같은 옵션들이 지원됩니다.

* **exclude:**  제외한 경로에 대한 패턴을 목록으로 구성됩니다.  
이 패턴은 .gitignore 파일과 일치합니다.  
	* 느낌표 ( ! ) : 일치하는 파일에 나타내는데, 이전에 exclude한 패턴에서도 나타납니다.
	* 슬래쉬 ( / ) : 프로젝트 시작 시의 상대경로를 나타냅니다.
	* 아스타 ( * ) : 디렉토리를 구분하는 구분자로 확장(사용)되지 않습니다.

예제:

```json
{
    "archive": {
        "exclude": ["/foo/bar", "baz", "/*.test", "!/foo/bar/baz"]
    }
}
```

위 예제는 `/dir/foo/bar/file`, `/foo/bar/baz`, `/file.php`,
`/foo/my.test`, 4가지 경로를 include 하면, `/foo/bar/any`, `/foo/baz`, and `/my.test`, 3가지 경로를 exclude합니다.

선택적으로 사용 가능합니다.

&larr; [Command-line interface](03-cli.md)  |  [Repositories](05-repositories.md) &rarr;
