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


### VCS

VCS stands for version control system. This includes versioning systems like
git, svn or hg. Composer has a repository type for installing packages from
these systems.

#### Loading a package from a VCS repository

There are a few use cases for this. The most common one is maintaining your
own fork of a third party library. If you are using a certain library for your
project and you decide to change something in the library, you will want your
project to use the patched version. If the library is on GitHub (this is the
case most of the time), you can simply fork it there and push your changes to
your fork. After that you update the project's `composer.json`. All you have
to do is add your fork as a repository and update the version constraint to
point to your custom branch. For version constraint naming conventions see
[Libraries](02-libraries.md) for more information.

Example assuming you patched monolog to fix a bug in the `bugfix` branch:

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

When you run `php composer.phar update`, you should get your modified version
of `monolog/monolog` instead of the one from packagist.

Note that you should not rename the package unless you really intend to fork
it in the long term, and completely move away from the original package.
Composer will correctly pick your package over the original one since the
custom repository has priority over packagist. If you want to rename the
package, you should do so in the default (often master) branch and not in a
feature branch, since the package name is taken from the default branch.

If other dependencies rely on the package you forked, it is possible to
inline-alias it so that it matches a constraint that it otherwise would not.
For more information [see the aliases article](articles/aliases.md).

#### Using private repositories

Exactly the same solution allows you to work with your private repositories at
GitHub and BitBucket:

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

The only requirement is the installation of SSH keys for a git client.

#### Git alternatives

Git is not the only version control system supported by the VCS repository.
The following are supported:

* **Git:** [git-scm.com](http://git-scm.com)
* **Subversion:** [subversion.apache.org](http://subversion.apache.org)
* **Mercurial:** [mercurial.selenic.com](http://mercurial.selenic.com)

To get packages from these systems you need to have their respective clients
installed. That can be inconvenient. And for this reason there is special
support for GitHub and BitBucket that use the APIs provided by these sites, to
fetch the packages without having to install the version control system. The
VCS repository provides `dist`s for them that fetch the packages as zips.

* **GitHub:** [github.com](https://github.com) (Git)
* **BitBucket:** [bitbucket.org](https://bitbucket.org) (Git and Mercurial)

The VCS driver to be used is detected automatically based on the URL. However,
should you need to specify one for whatever reason, you can use `git`, `svn` or
`hg` as the repository type instead of `vcs`.

If you set the `no-api` key to `true` on a github repository it will clone the
repository as it would with any other git repository instead of using the
GitHub API. But unlike using the `git` driver directly, composer will still
attempt to use github's zip files.

#### Subversion Options

Since Subversion has no native concept of branches and tags, Composer assumes
by default that code is located in `$url/trunk`, `$url/branches` and
`$url/tags`. If your repository has a different layout you can change those
values. For example if you used capitalized names you could configure the
repository like this:

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

If you have no branches or tags directory you can disable them entirely by
setting the `branches-path` or `tags-path` to `false`.

If the package is in a sub-directory, e.g. `/trunk/foo/bar/composer.json` and
`/tags/1.0/foo/bar/composer.json`, then you can make composer access it by
setting the `"package-path"` option to the sub-directory, in this example it
would be `"package-path": "foo/bar/"`.

If you have a private Subversion repository you can save credentials in the
http-basic section of your config (See [Schema](04-schema.md)):

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

If your Subversion client is configured to store credentials by default these
credentials will be saved for the current user and existing saved credentials
for this server will be overwritten. To change this behavior by setting the
`"svn-cache-credentials"` option in your repository configuration:

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

이것은 PEAR 저장소를 이용하여 특정 PEAR 채널에서 패키지들을 설치할 수 있게 해줍니다. composer는 접두사 `pear-{channelName}/`를 가진 모든 패키지의 충돌을 회피 할 것입니다. 모든 패키지는 `pear-{channelAlias}/`로 별명을 달아줄 수 있습니다.

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



 * `BasePackage`
 * `IntermediatePackage`, which depends on `BasePackage`
 * `TopLevelPackage1` and `TopLevelPackage2` which both depend on `IntermediatePackage`

공급자의 별명이 없으면, composer는 임의의 제공자 이름으로써 PEAR 채널명을 사용합니다:

 * `pear-pear.foobar.repo/BasePackage`
 * `pear-pear.foobar.repo/IntermediatePackage`
 * `pear-pear.foobar.repo/TopLevelPackage1`
 * `pear-pear.foobar.repo/TopLevelPackage2`

향 후 당신의 PEAR패키지를 composer 저장소와 이름 구조로 이전할 계획이라면, 'foobar'제공자 이름을 채택합니다.
프로젝트가 당신의 PEAR 패키지를 사용하면 업데이트 된 패키지들이 보이지 않을 것입니다. 것들은 다른 제공자 이름을 가지고 있기 때문입니다.(`foobar/IntermediatePackage` vs
`pear-pear.foobar.repo/IntermediatePackage`).

처음 PEAR 저장소가 시작할때 '제공자-별명'을 명기하면 당신은 이 문제를 피할 수 있고, 당신의 패키지 이름이 미래지향적이게 됩니다.

설명하자면, 이 예제에서는 당신의 PEAR 저장소에서 `BasePackage`,
`TopLevelPackage1`와 `TopLevelPackage2` 패키지들을 가져오고 `IntermediatePackage`는 Github저장소에서 가져옵니다:


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

만약 당신이 위에 나온 어떠한 방법으로도 composer를 지원하지 않는 프로젝트를 사용하여야 한다면, 직접 `package` 저장소를 사용하여 패키지를 정의할 수 있습니다.

기본적으로, composer 저장소에 있는 `packages.json` 정보와 같이 정의해 줍니다. 하지만 단일 패키지에 대해서 만입니다. 또, 최소한으로 필요한 항목은  `name`, `version`, `dist` 혹은
`source`입니다.

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

일반적으로 당신이 소스 부분에서 신경을 쓰고 싶지 않다면 이것을 필요로 하지 않을 것입니다.

> **주의**: 이 저장소 타입에는 몇가지 제약사항을 가지고 있으며, 이러한 사항들은 가급적 피해야 합니다:
>
> - composer는 당신이 'version' 항목을 변경하지 않으면 패키지 업데이트 하지 않을것입니다.
> - composer는 커밋된 사항을 업데이트 하지 않습니다. 만약 당신이 'master'를 참조할 경우 패키지를 삭제하여
>   강제 업데이트를 하고, 불안정한 lock 파일에 대하여 대처 할 필요가 있습니다.

## Hosting your own

당신의 패키지를 packagist에 넣는데에 대부분의 시간을 쓰겠지만, 여기에 소유한 저장소에 호스팅할 수 있는 사례가 있습니다.

* **Private company packages:** 만약 당신이 회사 내부적으로 composer를 사용하는 경우 당신의 개인 패키지를 유지 할 수 있습니다.
* **Separate ecosystem:** 만약 당신의 프로젝트가 가진 생태계에서 그 패키지들이 훌륭한 PHP 커뮤니티에 의해서 재사용 될 수 없는 경우, 당신은 프로젝트를 packagist에 각각 저장하고 싶을지도 모릅니다. 한 예로 워드프레스 플러그인을 들 수 있겠습니다.

당신이 소유한 패키지를 호스팅할 때, 포함된 `composer` 저장소 기본 유형을 최상의 성능을 위해 추천하는 바입니다.

그곳엔 `composer` 저장소를 만들기 위한 몇가지 도구들을 제공하고 있습니다.


### Packagist

packagist는 기본적으로 오픈소스 사용을 지원합니다. 이 뜻은 당신이 packagist의 복사본을 설치 할 수 있고,
re-brand 할 수 있으며 이것을 사용할 수 있다는 뜻입니다. 이것을 정말 손쉽게 할 수 있습니다. 그러나 소-중 규모의 회사에서 몇가지 패키지들을
추적하기 위해서는 그 규모나 복잡성으로 인하여 Satis를 사용하는 것이 나을 것 입니다.

packagist는 Symfony2와 [available on
GitHub](https://github.com/composer/packagist)을 지원합니다. 그것은 composer 내부적으로 VCS 저장소와 composer 사용자간의 프록시 역활을 합니다. 이것은 모든 VCS 패키지들 리스트들을 보유하고, 주기적으로 정보를 갱신하며, composer 저장소에 나타냅니다.

당신이 소유한 복사본을 설정하려면, 간단히 [packagist
github repository](https://github.com/composer/packagist에 있는 지침을 따르면 됩니다.

### Satis

Satis는 정적 `composer` 저장소 생성기입니다. 이것은 packagist의 초경량 정적 파일기반 버전이라고 볼 수 있겠습니다.

당신은 `composer.json`을 포함하는 저장소를 비롯하여 보통 VCS와 패키지 저장소 경로를 제공 받을 수 있습니다. 이것은 모든 패키지의 `required`와 `packages.json`의 덤프를 당신의 `composer` 저장소로 가져옵니다.

더 자세한 정보를 얻기 원하시면 [the satis GitHub repository](https://github.com/composer/satis) 혹은
the [Satis article](articles/handling-private-packages-with-satis.md)에 방문하십시오.

### Artifact

어떠한 경우에는, 예전에 언급된 온라인 타입의 저장소 혹은 VCS 하나도 소유할 능력이 없을때가 있습니다. 일반적인 예로 artifacts를 구축하여 조직간의 라이브러리 교환을 하려고 할때 입니다. 물론, 대부분 개인적으로 프로젝트를 수행하겠지만요. 유지 보수를 단순화 하기 위해서 개인적인 패키지 폴더를 하나의 간단한 ZIP 압축파일로 `artifact` 저장소 타입을 사용 할 수 있습니다:

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


## Disabling Packagist

당신의 `composer.json`에 이를 추가하여 기본 Packagist 저장소를 사용하지 않도록 설정 할 수 있습니다:


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
