# Repositories - 저장소

이번 챕터에서는 패키지와 저장소에 대한 개념, 어떤 종류의 저장소가 사용가능한지 그리고 이것들이 어떻게 동작하는지 설명하겠습니다.

## Concepts

먼저 실제의 다양한 형태의 저장소를 살펴 보기에 앞서, composer에 내장 된 기본 개념들을 이해할 필요가 있습니다.


### Package

composer는 의존성 관리자로 패키지들을 로컬 공간에 설치합니다. 원래 패키지라는 것은 단순히 무언가를 담고 있는 디렉토리를 의미합니다. 여기에서는 PHP 코드를 의미하게 되겠지만, 이론상으로는 그 어떠한 것도 담을 수 있습니다. 그리고 패키지는 이름과 버전이 포함된 설명을 수록하고 있습니다. 이 이름과 버전은 패키지를 식별하는데 사용됩니다.

사실, composer는 내부적으로 패키지의 모든 버전들을 별도의 패키지로 간주합니다. 이러한 특징은 여러분이 composer를 사용하는 동안에는 상관 없지만, 패키지를 변경하려고 할 때는 매우 중요한 요소가 됩니다.

이름과 버전 외에도 유용한 메타데이터가 있습니다. source 정의는 대부분 설치에 관련된 정보들 입니다. 설치와 밀접하게 관련된 정보는 source 정의이고, 패키지 컨텐츠가 어디 있는지 서술하고 있습니다. 패키지 데이터는 패키지의 컨텐츠를 가리킵니다.
그리고 dist 와 source 라는 두가지의 옵션이 있습니다. 

**Dist:** dist 는 패키지 데이터를 압축한 묶음 버전을 말합니다. 통상적으로 릴리즈 버전, stable 릴리즈 라고도 합니다.

**Source:**  source 는 주로 개발용으로 사용됩니다. 보통 git과 같은 소스코드 저장소로부터 가져오게 되는데, 내려받은 패키지를 수정하고 싶을 때에는 fetch 할 수도 있습니다.

각각의 패키지는 이중 하나의 또는 두개의 옵션 모두를 지원할 수 있습니다. 사용자 제공 옵션(user-supplied options)이나 패키지 안정성과 같은 특정한 요소에 의해서 선호되는 방식으로 결정됩니다.

### Repository

저장소란, 패키지 소스를 말하며, 패키지들/버전들 의 목록을 의미합니다. composer는 프로젝트에서 필요로 하는 패키지를 찾기 위해 설정된 모든 저장소를 조사할 것입니다.

composer가 기본적으로 확인하는 저장소는 Packagist 밖에 없습니다. `composer.json`를 통해서 저장소를 선언하면 프로젝트에 필요한 저장소를 더 추가할 수 있습니다.

repositories 는 root 패키지에서만 유효하며, 하위 의존성 패키지에 정의된 저장소는 로드 되지 않을 것입니다. 그 이유에 대해서는 [FAQ entry](faqs/why-can't-composer-load-repositories-recursively.md) 문서를 읽어 보시기 바랍니다.

## Types

### Composer

주요 저장소 타입은 `composer` 저장소를 일컫습니다. 이 저장소 타입은 전체 패키지 메타데이터를 담고있는 하나의 `packages.json` 파일을 사용합니다.

이 타입은 또한, packagist가 사용하는 저장소 타입입니다. `composer` 저장소를 참조하기 위해서는, `packages.json` 파일 이전에 경로를 적용하기만 하면 됩니다. packagist의 경우, `/packages.json` 위치에 파일이 있고, 저장소 URL은 `packagist.org` 입니다.
`example.org/packages.json`의 저장소 URL은 `example.org`가 될 것입니다.

#### packages

필수 필드는 `packages` 밖에 없습니다. JSON 구조는 아래와 같습니다.

```json
{
    "packages": {
        "vendor/package-name": {
            "dev-master": { @composer.json },
            "1.0.x-dev": { @composer.json },
            "0.0.1": { @composer.json },
            "1.0.0": { @composer.json }
        }
    }
}
```

`@composer.json` 표시는  아래와 같은 최소한의 패키지 버전을 담고 있는 `composer.json`의 내용이 됩니다.

* name
* version
* dist 혹은 source

최소 패키지는 아래와 같습니다.

```json
{
    "name": "smarty/smarty",
    "version": "3.1.7",
    "dist": {
        "url": "http://www.smarty.net/files/Smarty-3.1.7.zip",
        "type": "zip"
    }
}
```

여기에 [schema](04-schema.md)에 있는 다른 필드 정보도 명시할 수도 있습니다.

#### notify-batch

`notify-batch` 필드는 사용자가 패키지를 설치할 때 매번 호출하게 될 URL을 지정할 수 있습니다.
URL은 절대 경로(저장소와 동일한 도메인을 사용하게 게 됨)나 절대 표기 방식의 URL이 될 수 있습니다.

사용예:

```json
{
    "notify-batch": "/downloads/"
}
```

`monolog/monolog` 패키지가 들어있는 `example.org/packages.json`이 있다고 하면,  `example.org/downloads/`로 아래와 같은 JSON 요청 body를 담아 `POST` 요청을 하게 될 것입니다.

```json
{
    "downloads": [
        {"name": "monolog/monolog", "version": "1.2.1.0"},
    ]
}
```

`version` 필드는 정규 표현 방식의 버전 넘버를 따릅니다.

이 필드는 선택사항 입니다.

#### includes

규모가 큰 저장소를 위해 `packages.json`을 여러개의 파일로 분리하는 기능을 제공합니다.
`includes` 필드를 사용하면  참조할 파일을 추가할 수 있습니다.

예제:

```json
{
    "includes": {
        "packages-2011.json": {
            "sha1": "525a85fb37edd1ad71040d429928c2c0edec9d17"
        },
        "packages-2012-01.json": {
            "sha1": "897cde726f8a3918faf27c803b336da223d400dd"
        },
        "packages-2012-02.json": {
            "sha1": "26f911ad717da26bbcac3f8f435280d13917efa5"
        }
    }
}
```

파일의 `SHA-1 sum`은 캐시되어 있다가 해시가 변경될 경우에만 재요청 하게 됩니다.

이 필드는 선택사항 입니다. 별도로 구축한 저장소를 사용한다면 아마 필요하지 않을 것입니다.

#### provider-includes 와 providers-url

`provider files`라고 부르는 방식은 `packagist.org`처럼 아주 큰 저장소를 사용하는 경우에 가장 선호되는 방법입니다.
`provider-includes` 필드는 현재 저장소에서 제공하는 패키지 이름이 담긴 파일 정보를 나열할 수 있습니다.

`providers-url` 필드는 서버에서 `provider files`를 찾는 방법을 제시합니다. 이 내용은 저장소 root에서 시작하는 절대 경로가 됩니다.

예제 :

```json
{
    "provider-includes": {
        "providers-a.json": {
            "sha256": "f5b4bc0b354108ef08614e569c1ed01a2782e67641744864a74e788982886f4c"
        },
        "providers-b.json": {
            "sha256": "b38372163fac0573053536f5b8ef11b86f804ea8b016d239e706191203f6efac"
        }
    },
    "providers-url": "/p/%package%$%hash%.json"
}
```

여기에 나오는 파일들의 내용은 아래 예제 처럼, 패키지명과 파일 무결성 검증을 위한 해시를 나열하고 있습니다.

예제 :

```json
{
    "providers": {
        "acme/foo": {
            "sha256": "38968de1305c2e17f4de33aea164515bc787c42c7e2d6e25948539a14268bb82"
        },
        "acme/bar": {
            "sha256": "4dd24c930bd6e1103251306d6336ac813b563a220d9ca14f4743c032fb047233"
        }
    }
}
```

위 파일은 해당 저장소에서 `providers-url`을 조회한 파일을 참조하여, `%package%`는  패키지명으로, `%hash%`는 sha256 필드로 치환한 후,  acme/foo 와 acme/bar 를 찾을 수 있음을 선언하고 있습니다. 이파일들은 자체적으로 [위에서 설명](#packages)한 패키지 정의로 구성되어 있습니다.

이 필드는 선택사항 입니다. 별도로 구축한 저장소를 사용한다면 아마 필요하지 않을 것입니다.

#### stream options

`packages.json` 파일은 PHP stream을 통해 로드됩니다.
stream에 추가 옵션을 설정하려면 `options` 파라미터를 사용합니다.
PHP stream context 옵션 이라면 어떤 것이든 설정할 수 있습니다.
[컨택스트 옵션과 인수](http://php.net/manual/kr/context.php)에서 더 많은 정보를 얻을 수 있습니다.


### VCS - 버전컨트롤시스템

VCS는 버전컨트롤시스템을 말하며 git, svn 또는 hg와 같은 버전시스템들을 포함합니다.
컴포저는 이러한 시스템들로 부터 패키지를 설치할 수 있는 저장소 타입을 지원합니다. 

#### VCS 저장소에서 패키지 불러오기

몇가지 사용 예를 들어 봅시다. 가장 보편적인 예는 써드파티의 라이브러리르 포크(fork) 하여 수정하는 경우입니다. 여러분의 프로젝트가 특정한 라이브러리를 사용 하고 있고, 그 라이브러리의 일부를 변경하고자 한다면, 여러분의 프로젝트가 패치(patch)된 버전을 사용하길 원할 것입니다. (대부분의 경우와 같이) 라이브러리가 GitHub에 있다면, 손쉽게 라이브러리를 포크(fork) 하여 변경사항을 푸시(push)할 수 있습니다. 그 후에 프로젝트의 `composer.json`을 수정합니다. 이 때 할일은 여러분의 포크(fork)를 저장소로 추가하고 버전이 여러분의 별도의 브랜치를 가리키도록 수정하는 것입니다. 버전 명명 방식에 대한 더 많은 정보는 [Libraries - 라이브러리](02-libraries.md)에서 확인할 수 있습니다.

다음 예제는 버그를 수정하기 위해 `bugfix` 브랜치에서 monolog를 패치했다고 간주합니다:

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/igorw/monolog"
        }
    ],
    "require": {
        "monolog/monolog": "dev-bugfix"
    }
}
```

이제 `php composer.phar update`를 실행하면, 패키지스트(packagist)의 `monolog/monolog` 대신에 여러분이 수정한 버전을 가져오게 됩니다.

명심할 것은 원본 패키지에서 완전히 이전하려는 것이 아니고 장기간 동안 포크(fork)를 유지하는 한 패키지의 이름을 변경해서는 안된다는 점입니다. 별도의 저장소는 패키지스트(packagist)보다 우선권을 가지기 때문에 컴포저는 원본이 아닌 당신의 패키지를 선택하게 될 것입니다. 패키지 이름은 기본 브랜치에서 가져오기 때문에 만약 패키지 이름을 변경하길 원한다면, feature 브랜치가 아닌 기본(흔히 master) 브랜치에서 변경해야 합니다.

프로젝트가 의존하는 패키지들 중에 하나가 여러분이 포크(fork)한 패키지를 필요로 한다면, 버전 제약에 그것을 맞춰주거나 또는 그러지 않도록 인라인-별칭(inline-alias)를 지정하는 것이 가능합니다. 더 많은 정보는 [앨리어스 - aliases](articles/aliases.md) 문서에서 볼 수 있습니다.

#### 사설 저장소 사용하기

공용 저장소와 완전히 동일한 방식으로 GitHub과 BitBucket의 사설 저장소를 사용하는 것이 가능합니다.

```json
{
    "require": {
        "vendor/my-private-repo": "dev-master"
    },
    "repositories": [
        {
            "type": "vcs",
            "url":  "git@bitbucket.org:vendor/my-private-repo.git"
        }
    ]
}
```

필요한 건 단지 git 클라이언트를 위한 SSH 키를 설치하는 것 뿐입니다. 

#### Git 대신 사용가능한 것들

Git은 VCS 저장소로써 지원되는 유일한 버전컨트롤시스템이 아닙니다.
다음과 같은 저장소들이 지원되고 있습니다:

* **Git:** [git-scm.com](http://git-scm.com)
* **Subversion:** [subversion.apache.org](http://subversion.apache.org)
* **Mercurial:** [mercurial.selenic.com](http://mercurial.selenic.com)

이들 시스템에서 패키지를 가져오기 위해서는 각각에 해당하는 클라이언트가 설치되어 있어야 합니다.
그건 좀 불편할 수도 있습니다. 이러한 이유로 GitHub과 BitBucket에 대해서는 해당 사이트에서 제공되는 API를 사용하도록 별도로 지원하여, 버전컨트롤시스템을 설치할 필요 없이 패키지를 가져올 수 있습니다. 
이 VCS 저장소들은 패키지를 압축파일(zip)으로 가져갈 수 있도록 `dist`를 제공합니다.

* **GitHub:** [github.com](https://github.com) (Git)
* **BitBucket:** [bitbucket.org](https://bitbucket.org) (Git and Mercurial)

사용될 VCS 드라이버는 URL에 기반하여 자동으로 선택됩니다.
하지만 어떤 이유가 있어서 특정 드라이버를 명시할 필요가 있다면,
저장소 타입으로 `vcs` 대신 `git`, `svn` 또는 `hg`를 사용할 수 있습니다.

GitHub 저장소에서 `no-api` 키를 `true`로 설정한다면 컴포저는 GitHub API를 사용하지 않고 다른 git 저장소와 마찬가지로 저장소를 복제(clone)할 것입니다. 그러나 `git` 드라이버를 직접 사용하는 것과는 달리,
컴포저는 여전히 GitHub의 압축파일(zip)을 사용하려고 시도할 것입니다.

(역자주 : no-api 해봤는데 계속 API 에서 zip 파일 가져오려고 시도합니다. 추가 연구가 필요합니다.)

#### Subversion 옵션들

Subversion은 브랜치(branches)와 태그(tags) 개념을 내재하고 있지 않기 때문에, 컴포저는 기본적으로 코드가 `$url/trunk`, `$url/branches` 그리고 `$url/tags` 내에 존재한다고 간주합니다. 여러분의 저장소가 다른 디렉토리 구조를 가지고 있다면 해당 값들을 변경할 수 있습니다. 예를 들어 첫자가 대문자인 디렉토리명을 사용한다면  다음과 같이 저장소를 설정할 수 있습니다:
(역자주 : 굳이 Trunk 폴더가 따로 있다면..)

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "http://svn.example.org/projectA/",
            "trunk-path": "Trunk",
            "branches-path": "Branches",
            "tags-path": "Tags"
        }
    ]
}
```

branches 또는 tags 디렉토리를 가지고 있지 않다면 `branches-path` 또는 `tags-path` 항목을 `false`로 설정하여 완전히 사용불가능하도록 할 수 있습니다.

패키지가 예를 들어 `/trunk/foo/bar/composer.json`과 `/tags/1.0/foo/bar/composer.json`처럼 서브디렉토리 내에 존재한다면, `"package-path"` 옵션을 설정함으로써 컴포저가 해당 서브디렉토리에 접근하도록 만들 수 있습니다. 이번 예의 경우 `"package-path": "foo/bar/"`이 될 것입니다.

사설 Subversion 저장소를 가지고 있다면 설정([Schema - 구조](04-schema.md) 참조) 내의 http-basic 섹션에서 자격증명(credential) 정보를 저장할 수 있습니다:

```json
{
    "http-basic": {
        "svn.example.org": {
            "username": "username",
            "password": "password"
        }
    }
}
```

Subversion 클라이언트가 기본적으로 자격증명(credential)을 저장하도록 설정되어 있다면 이 자격증명(credential) 정보는 현재 사용자로 저장될 것이고 기존에 저장된 자격증명(credential) 정보는 덮어쓰여질 것입니다. 저장소 설정에서 `"svn-cache-credentials"` 옵션을 설정함으로써 이러한 행동을 변경할 수 있습니다:

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "http://svn.example.org/projectA/",
            "svn-cache-credentials": false
        }
    ]
}
```

### PEAR

이것은 PEAR 저장소를 이용하여 특정 PEAR 채널에서 패키지들을 설치할 수 있게 해줍니다. 컴포저는 접두사 `pear-{channelName}/`를 가진 모든 패키지의 충돌을 회피 할 것입니다. 모든 패키지는 `pear-{channelAlias}/`로 별명을 달아줄 수 있습니다.

예제 `pear2.php.net` 사용:

```json
{
    "repositories": [
        {
            "type": "pear",
            "url": "http://pear2.php.net"
        }
    ],
    "require": {
        "pear-pear2.php.net/PEAR2_Text_Markdown": "*",
        "pear-pear2/PEAR2_HTTP_Request": "*"
    }
}
```
이 경우에 채널의 단축 이름은 `pear2`입니다.  그래서 `PEAR2_HTTP_Request` 패키지 이름은 `pear-pear2/PEAR2_HTTP_Request`에서 온 것입니다.

> **참고:** `pear` 저장소는 패키지당 많은 요청을 필요로합니다.
> 이때문에 설치과정을 상당히 느려지게 할 수 있습니다.

#### Custom vendor alias

PEAR 채널 패키지에 임의 제공자 이름을 사용 할 수있습니다.

예제:

만약 당신이 개인적인 PEAR 저장소가 있고, 그것을 VCS에 종속시키려면  composer를 이용하십시요. 당신의 PEAR 저장소는 이 패키지들을 포함합니다:

 * `BasePackage`가 있고, 
 * `IntermediatePackage`가 `BasePackage`에 의존하며
 * `TopLevelPackage1` 와 `TopLevelPackage2`가 `IntermediatePackage`에 의존성이 있을 때

공급자의 별명이 없으면, composer는 임의의 제공자 이름으로써 PEAR 채널명을 사용합니다:

 * `pear-pear.foobar.repo/BasePackage`
 * `pear-pear.foobar.repo/IntermediatePackage`
 * `pear-pear.foobar.repo/TopLevelPackage1`
 * `pear-pear.foobar.repo/TopLevelPackage2`

향 후 당신의 PEAR패키지를 composer 저장소와 이름 구조로 이전할 계획이라면, 'foobar'제공자 이름을 채택합니다. 프로젝트가 당신의 PEAR 패키지를 사용하면 업데이트 된 패키지들이 보이지 않을 것입니다. 것들은 다른 제공자 이름을 가지고 있기 때문입니다.(`foobar/IntermediatePackage` vs `pear-pear.foobar.repo/IntermediatePackage`).

처음 PEAR 저장소가 시작할때 '제공자-별명'을 명기하면 당신은 이 문제를 피할 수 있고, 당신의 패키지 이름이 미래지향적이게 됩니다.

설명하자면, 이 예제에서는 당신의 PEAR 저장소에서 `BasePackage`, `TopLevelPackage1`와 `TopLevelPackage2` 패키지들을 가져오고 `IntermediatePackage`는 Github저장소에서 가져옵니다:


```json
{
    "repositories": [
        {
            "type": "git",
            "url": "https://github.com/foobar/intermediate.git"
        },
        {
            "type": "pear",
            "url": "http://pear.foobar.repo",
            "vendor-alias": "foobar"
        }
    ],
    "require": {
        "foobar/TopLevelPackage1": "*",
        "foobar/TopLevelPackage2": "*"
    }
}
```

### Package

만약 당신이 위에 나온 어떠한 방법으로도 컴포저를 지원하지 않는 프로젝트를 사용해야 한다면, 직접 `package` 저장소를 사용하여 패키지를 정의할 수도 있습니다.

기본적으로는, 컴포저 저장소에 있는 `packages.json` 정보와 같이 정의해 줍니다. 단 단일 패키지에 대해서 만입니다. 또, 최소한으로 필요한 항목은  `name`, `version`, `dist` 혹은 `source`입니다.

여기 smarty 템플릿 엔진을 위한 예제가 있습니다:

```json
{
    "repositories": [
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
                },
                "autoload": {
                    "classmap": ["libs/"]
                }
            }
        }
    ],
    "require": {
        "smarty/smarty": "3.1.*"
    }
}
```

일반적으로 당신이 소스 부분에서 신경을 쓰고 싶지 않다면 이것을 꼭 넣을 필요는 없습니다. 

> **주의**: 이 저장소 타입에는 몇가지 제약사항을 가지고 있으며, 이러한 사항들은 가급적 피해야 합니다:
>
> - composer는 당신이 'version' 항목을 변경하지 않으면 패키지 업데이트 하지 않을것입니다.
> - composer는 커밋된 사항을 업데이트 하지 않습니다. 만약 당신이 'master'를 참조할 경우 패키지를 삭제하여
>   강제 업데이트를 하고, 불안정한 lock 파일에 대하여 대처 할 필요가 있습니다.

## Hosting your own 나만의 호스팅 운영

대부분 여러분의 패키지를 패키지스트에 올리는데 집중하겠지만, 자신의 고유한 저장소를 호스팅할 수 있는 방법도 있습니다.

* **Private company packages:** 만약 당신이 회사 내부적으로 composer를 사용하는 경우 여러분의 사설 패키지를 유지 할 수 있습니다.
* **Separate ecosystem:** 만약 여러분의 프로젝트가 고유한 생태계를 가지고 있으며 그 패키지들이 PHP 커뮤니티에 의해서 재사용 될 수 없는 경우, 당신은 프로젝트를 패키지스트에 각각 따로 저장하고 싶을 수도 있습니다. 한 예로 워드프레스 플러그인과 같은 경우를 들 수 있겠습니다.

여러분의 고유한 패키지를 호스팅하는 경우, 최상의 성능을 위해서 저장소 타입은 `composer`으로 설정하는 것을 추천합니다. 

다음의 `composer` 저장소를 만들기 위한 몇가지 도구들을 제공하고 있습니다.


### Packagist - 패키지스트

패키지스트는 기본적으로 오픈소스입니다. 이 말은 여러분이 패키지스트의 복사본을 설치하여 새롭게 운영할 수 있으며 사용할 수 있다는 뜻입니다. 이것을 정말 손쉽게 할 수 있습니다. 그러나 소-중 규모의 회사에서 몇개의 패키지들을 제공하기 위해서는 그 규모나 복잡성으로 인하여 Satis를 사용하는 것이 더 나을 것 입니다.

패키지스트는 Symfony2 어플리케이션으로 [GitHub](https://github.com/composer/packagist)에서 확인할 수 있습니다. 패키지스트는 내부적으로 컴포저를 사용하며  VCS 저장소와 composer 사용자간의 프록시 역활을 수행 합니다. 이러한 역활은 모든 VCS 패키지들의 리스트들을 보유하고, 주기적으로 정보를 갱신하며, 컴포저 저장소를 나타나게 합니다.

패키지스트를 따로 설정하고자 한다면  [packagist github repository](https://github.com/composer/packagist에 있는 지침을 따르면 됩니다.

### Satis

Satis는 정적 `composer` 저장소 생성기입니다. 이것은 packagist의 초경량 정적 파일 기반 버전이라고 볼 수 있습니다.

여러분은 `composer.json`을 포함하는 저장소를 비롯하여 보통 VCS와 패키지 저장소 경로를 제공 받을 수 있습니다. 이것은 모든 패키지의 `required`와 `packages.json`의 정보를 여러분의 `composer` 저장소로 가져옵니다.

더 자세한 정보를 얻기 원하시면 [the satis GitHub repository](https://github.com/composer/satis) 혹은
[Satis article](articles/handling-private-packages-with-satis.md)에서 확인하실 수 있습니다.

(번역주 : 사내 활용용도나 기타 사용의 목적으로 비공개 패키지 저장소를 운영해야 하는 경우에 satis 를 통해서 사설 packagist 를 운영하는 효과를 낼 수 있습니다. )

### Artifact - 아티팩트

어떤 특수한 경우에는, 앞서 언급된 온라인 타입의 저장소 혹은 VCS 하나라도 구성할 수 없을 때가 있습니다. 예를 들면 artifacts를 구축하여 조직간의 라이브러리 교환을 하려고 할 때 입니다. 물론, 대부분의 경우 비공개 저장소를 운영할 것입니다. 유지 보수를 단순화 하기 위해서 비공개 패키지 폴더를 하나의 간단한 ZIP 압축파일로 `artifact` 저장소 타입을 사용 할 수 있습니다:

```json
{
    "repositories": [
        {
            "type": "artifact",
            "url": "path/to/directory/with/zips/"
        }
    ],
    "require": {
        "private-vendor-one/core": "15.6.2",
        "private-vendor-two/connectivity": "*",
        "acme-corp/parser": "10.3.5"
    }
}
```

각각의 zip 파일들은 `composer.json`의 root 폴더를 압축한 것입니다:

```sh
unzip -l acme-corp-parser-10.3.5.zip

composer.json
...
```

만약 그곳에 두개의 다른버전의 압축파일이 존재한다면, 그 두개 모두 가져오게됩니다. artifact 폴더에 새버전의 압축파일이 추가되고 당신이 `update`를 실행하게 되면, 그 버전도 가져오고 composer는 최신 버전으로 업데이트 할 것입니다.


## Packagist 비활성화 하기

`composer.json`에 기본 Packagist 저장소를 사용하지 않도록 설정 할 수 있습니다:


```json
{
    "repositories": [
        {
            "packagist": false
        }
    ]
}
```

&larr; [Schema](04-schema.md)  |  [Community](06-community.md) &rarr;
