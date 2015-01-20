# Libraries - 라이브러리

이번 챕터에서는 컴포저를 사용해서 라이브러리를 설치하는 방법에대해 설명하겠습니다.

## 모든 프로젝트는 패키지입니다

디렉토리에 `composer.json`가 존재하면 그 디렉토리는 패키지라는 것을 의미합니다. 프로젝트 컴포저에 `require`를 추가하게 되면 다른 패키지들에 의존성이 있는 패키지를 만들수 있습니다. 프로젝트와 라이브러리들의 차이는 단지 프로젝트는
이름을 가지지 않은 패키지라는것 뿐입니다.


패키지가 설치가능한 형태로 만들기 위해서는 이름이 필요한데, `composer.json` 에 `name` 를 추가하면 됩니다. 

```json
{
    "name": "acme/hello-world",
    "require": {
        "monolog/monolog": "1.0.*"
    }
}
```

In this case the project name is `acme/hello-world`, where `acme` is the
vendor name. Supplying a vendor name is mandatory.

이 예제에서 프로젝트의 이름은 `acme/hello-world`이고 `acme`은 벤더 이름이됩니다. 벤더의 이름은 항상 존재해야 합니다.

> **주의:** 만약 벤더 이름을 어떻게 정해야 할지 모르겠다면 보통은 github의 유저네임을 이용한다는 점을 참고합니다. 패키지의 이름은 대소문자를 구별하지 않고 모두 소문자를 사용하고 대쉬로 단어들을 구분합니다. 

## 플랫폼 패키지

컴포저를 통해서 실제 설치하는것은 아니지만 가상으로 설치하되는 패키지로 플랫폼 패키지라는 것이 있습니다. 이는 PHP 자체와 PHP 익스텐션, 그리고 일부 시스템 라이브러리들이 해당됩니다. (역주 - composer로 설치하는건 아니지만 플랫폼에 해당하는 패키지들의 제한 사항을 표시한다는 의미인거 같음)


* `php`는 유저의 PHP 버전으로 제약을 `>=5.4.0`와 같이 나타낼 수 있습니다. php  64비트가 필요하다면 `php-64bit` 패키지를 require 할 수도 있습니다. 

* `hhvm`은 HHVM 런타임의 버전을 의미하고 (HipHop Virtual Machine)'>=2.3.3'로 제약을 나타냅니다.  

* `ext-<name>`를 사용해서 필요한 PHP extensions를(코어 익스텐션을 포함해서) 표현할 수 있습니다. 버전을 표시하는것은 비일관적일 수 있기 때문에 `*`와 같이 제약을 표시하는것이 좋을 수도 있습니다. 익스텐션 패키지 이름은 예를 들면 `ext-gd`와 같습니다. 

* `lib-<name>`은 PHP에 쓰이는 라이브러리의 버전 제약을 나타내며 다음과 같은 것들이 있습니다. : `curl`, `iconv`, `icu`, `libxml`,
  `openssl`, `pcre`, `uuid`, `xsl`.

로컬환경에서 사용할 수 있는 플랫폼 패키지들의 목록은 `composer show --platform`명령어로 확인할 수 있습니다.

## 버전 표시하기

패키지에는 버전을 지정할 필요가 있습니다. 패키지를 패키지스트에 올리려고 할때 버전관리도구(git, svn, hg)를 통해서 버전 정보를 알려줄 수 있습니다.
이 경우에 버전을 특별히 지정할 필요는 없고, 또한 그렇게 하는 것을 추천합니다. 버전관리도구를 통해서 어떻게 버전번호를 확인 할지는 [tags](#tags) 와 [branches](#branches)을 참고하십시오. 

만약 패키지들을 직접 만들고 반드시 버전정보를 나타내야 한다면 `version` 필드를 추가하면 됩니다. 

```json
{
    "version": "1.0.0"
}
```

> **주의:** 버전의 표시는 반드시 태그 이름과 맞아야 하므로 가급적 명시적으로 버전 필드를 지정하는 것은 피하시길 바랍니다.

### Tags - 태그

버전처럼 보여지는 태그들 만다 해당 태그에 맞는 패키지의 버전이 생성되어 집니다. 이는 `-patch`, `-alpha`, `-beta`,`-RC`같은 옵션형 접미사를 가진 'X.Y.Z' 또는 'vX.Y.Z'와 같은 형태가 됩니다. 접미사에 숫자가 쓰일 수도 있습니다.

사용할 수 있는 태그 이름들에 대한 몇가지 예시는 다음과 같습니다.

- 1.0.0
- v1.0.0
- 1.10.5-RC1
- v4.4.4-beta2
- v2.0.0-alpha
- v2.0.4-p1


> **주의:** 태그의 버전에 `v` 접두어가 붙어 있더라도 [version constraint](01-basic-usage.md#package-versions) `require`를 지정할 때에는 접두어없이 지정합니다.(예를 들면 tag `v1.0.0` 는 버전 `1.0.0`을 의미합니다)

### Branches - 브랜치

개별 브랜치마다 패키지 개발버전이 생성됩어집니다. 만약 브랜치의 이름이 버전처럼 보이게 되어 있다면 `{branchname}-dev`와같이 됩니다. 
예를들어 브랜치 `2.0`은 `2.0.x-dev`(`.x`는 브랜치를 식별하려는 기술적 이유로 부가되었습니다. 브랜치 `2.0.x`가 `2.0.x-dev`로 될 수 있습니다.) 만약 브랜치가 버전처럼 보이는 형태가 아니라면 `dev-{branchname}`형태일 것이고 `master`는 `dev-master`버전 형태가 됩니다. 

버전 브랜치 이름에 대한 예제는 다음과 같습니다.

- 1.x
- 1.0 (equals 1.0.x)
- 1.1.x

> **주의:** 개발 버전을 설치할 때에는 패키지를 자동으로 `source`에서 내려받습니다.
> 더 자세한 사항은 [`설치`](03-cli.md#install) 명령어에 대해서 참고하십시오.

### Aliases- 앨리어스

It is possible to alias branch names to versions. For example, you could alias
`dev-master` to `1.0.x-dev`, which would allow you to require `1.0.x-dev` in all
the packages.

See [Aliases](articles/aliases.md) for more information.

브랜치 이름을 버전으로 앨리아스 할 수 있다. 예를 들면 `dev-master` 에서 `1.0.x-dev`로 앨리어스하면 모든 패키지에서 `1.0.x-dev`를 require한다. 앨리어스에관한 추가정보는 [Aliases](articles/aliases.md) 를 보라.


## Lock file

For your library you may commit the `composer.lock` file if you want to. This
can help your team to always test against the same dependency versions.
However, this lock file will not have any effect on other projects that depend
on it. It only has an effect on the main project.

`composer.lock` 을 커밋할 수 있다. 같이 일하는 팀이 항상 같은 의존성 버전으로 테스트 할 수 있게 해준다.
그러나 이 lock file은 다른 프로젝트에 어떤 영향도 없을 것이고 단지 주 프로젝트에만 영향이 있을것이다. 

If you do not want to commit the lock file and you are using git, add it to
the `.gitignore`.

만약 lock file을 커밋하기 원치 않고 git을 사용하고 있다면 `.gitignore`에 추가해라.

## Publishing to a VCS

## 버전관리도구로 퍼블리쉬하기

Once you have a vcs repository (version control system, e.g. git) containing a
`composer.json` file, your library is already composer-installable. In this
example we will publish the `acme/hello-world` library on GitHub under
`github.com/username/hello-world`.

버전관리도구 저장소에`composer.json` 파일이 있다면 이미 그 라이브러리는 이미 컴포저로 설치가 가능하다. 
이 예에서 우리는 github의 `github.com/username/hello-world`에 라이브러리 `acme/hello-world`를 퍼블리시 할것이다.  

Now, to test installing the `acme/hello-world` package, we create a new
project locally. We will call it `acme/blog`. This blog will depend on
`acme/hello-world`, which in turn depends on `monolog/monolog`. We can
accomplish this by creating a new `blog` directory somewhere, containing a
`composer.json`:

지금 `acme/hello-world`패키지 설치를 테스트 하기 위해 우리는 로컬로 새 프로젝트를 만든다. 이를 `acme/blog`라고 하자. 이 블로그는 `acme/hello-world`에 의존할것이고 결국 `monolog/monolog`에 의존한다. `composer.json`이 있는 디렉토리 어디에든 새로운 `blog`를 만들어 완성 할 수 있다. 

```json
{
    "name": "acme/blog",
    "require": {
        "acme/hello-world": "dev-master"
    }
}
```

The name is not needed in this case, since we don't want to publish the blog
as a library. It is added here to clarify which `composer.json` is being
described.

블로그를 라이브러리로 배포하지 않는 다면 이번 사례에서 이름은 필요없다. `composer.json`에 설명한것을 여기서 첨언하겠다.

Now we need to tell the blog app where to find the `hello-world` dependency.
We do this by adding a package repository specification to the blog's

지금 우리는 블로그앱에 `hello-world`의존성을 어디서 찾을지 알려줄 필요가 있다.
블로그에 패키지 repository 스펙을 추가해서 (의존성을 어디서 찾을지 알려줄) 수 있다.

`composer.json`:

```json
{
    "name": "acme/blog",
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/username/hello-world"
        }
    ],
    "require": {
        "acme/hello-world": "dev-master"
    }
}
```

For more details on how package repositories work and what other types are
available, see [Repositories](05-repositories.md).

어떻게 패키지 repositories가 작동하고 사용할수 있는 다른것들은 무엇이 있는지 더 알고자 한다면 [Repositories](05-repositories.md)을 보라. 

That's all. You can now install the dependencies by running Composer's
`install` command!

이것이 전부다. 지금 컴포저의 `install`명령어를 실행해서 의존성들을 설치할 수 있다.

**Recap:** Any git/svn/hg repository containing a `composer.json` can be added
to your project by specifying the package repository and declaring the
dependency in the `require` field.

`composer.json`가 있는 어떤 git/svn/hg 저장소도 패키지 repository에 명시하고 `require` 필드에 의존성을 선언해서 당신의 프로젝트에 추가 할 수 있다.

## Publishing to packagist

## 패키지스트로 퍼블리시하기

Alright, so now you can publish packages. But specifying the vcs repository
every time is cumbersome. You don't want to force all your users to do that.

이제 당신은 패키지를 퍼블리시 할 수 있다. 하지만 버전관리도구 저장소를 매번 지정하는것은 어렵다. 당신은 모든 사용자들에게 그모든것을 하도록 강요하길 원하지 않을것이다.

The other thing that you may have noticed is that we did not specify a package
repository for `monolog/monolog`. How did that work? The answer is packagist.

`monolog/monolog`패키지 저장소를 정해주지 않았는데 어떻게 작동한것일까? 정답은 패키지스트이다.

[Packagist](https://packagist.org/) is the main package repository for
Composer, and it is enabled by default. Anything that is published on
packagist is available automatically through Composer. Since monolog
[is on packagist](https://packagist.org/packages/monolog/monolog), we can depend
on it without having to specify any additional repositories.

[Packagist](https://packagist.org/)는 컴포저용 주요 패키지 저장소이며 기본으로 설정돼 있다.패키지스트에 퍼블리시된것들은 자동으로 컴포저로 사용할 수 있다. 추가로 저장소에대한 정보없이 monolog [is on packagist](https://packagist.org/packages/monolog/monolog)를 사용할 수 있다. 

If we wanted to share `hello-world` with the world, we would publish it on
packagist as well. Doing so is really easy.

만약 우리가 `hello-world`를 공유하기 원한다면 또한 패키지스트에 퍼블리시해라. 정말 쉽다.

You simply hit the big "Submit Package" button and sign up. Then you submit
the URL to your VCS repository, at which point packagist will start crawling
it. Once it is done, your package will be available to anyone.

간단하게 "Submit Package"버튼을 누르고 sign up해라. 그리고 당신의 버전관리도구 저장소의 URL을 제출하면 패키지스트가 크롤링하게된다. 이것이 다고 너의 패키지는 누구나 사용할 수 있게된다.

&larr; [Basic usage](01-basic-usage.md) |  [Command-line interface](03-cli.md) &rarr;