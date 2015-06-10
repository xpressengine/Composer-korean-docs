---
layout: default
title: "Libraries - 라이브러리"
permalink: /doc/02-libraries.md/
---

# Libraries - 라이브러리

이번 챕터에서는 컴포저를 사용해서 라이브러리를 설치하는 방법에대해 설명하겠습니다.

## 모든 프로젝트는 패키지입니다

디렉토리에 `composer.json`이 존재하면 그 디렉토리는 패키지라는 것을 의미합니다. 프로젝트 컴포저에 `require`를 추가하게 되면 다른 패키지들에 의존성이 있는 패키지를 만들수 있습니다. 프로젝트와 라이브러리들의 차이는 단지 프로젝트는
이름을 가지지 않은 패키지라는것 뿐입니다.


패키지가 설치가능한 형태로 만들기 위해서는 이름이 필요한데, `composer.json` 에 `name` 를 추가하면 됩니다. 

{% highlight json %}
{
    "name": "acme/hello-world",
    "require": {
        "monolog/monolog": "1.0.*"
    }
}
{% endhighlight %}

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

{% highlight json %}
{
    "version": "1.0.0"
}
{% endhighlight %}

> **주의:** 버전의 표시는 반드시 태그 이름과 맞아야 하므로 가급적 명시적으로 버전 필드를 지정하는 것은 피하시길 바랍니다.

### Tags - 태그 {#tags}

버전처럼 보여지는 태그들 만다 해당 태그에 맞는 패키지의 버전이 생성되어 집니다. 이는 `-patch`, `-alpha`, `-beta`,`-RC`같은 옵션형 접미사를 가진 'X.Y.Z' 또는 'vX.Y.Z'와 같은 형태가 됩니다. 접미사에 숫자가 쓰일 수도 있습니다.

사용할 수 있는 태그 이름들에 대한 몇가지 예시는 다음과 같습니다.

- 1.0.0
- v1.0.0
- 1.10.5-RC1
- v4.4.4-beta2
- v2.0.0-alpha
- v2.0.4-p1


> **주의:** 태그의 버전에 `v` 접두어가 붙어 있더라도 [version constraint](/Composer-korean-docs/doc/01-basic-usage.md#package-versions) `require`를 지정할 때에는 접두어없이 지정합니다.(예를 들면 tag `v1.0.0` 는 버전 `1.0.0`을 의미합니다)

### Branches - 브랜치 {#branches}

개별 브랜치마다 패키지 개발버전이 생성됩어집니다. 만약 브랜치의 이름이 버전처럼 보이게 되어 있다면 `{branchname}-dev`와같이 됩니다. 
예를들어 브랜치 `2.0`은 `2.0.x-dev`(`.x`는 브랜치를 식별하려는 기술적 이유로 부가되었습니다. 브랜치 `2.0.x`가 `2.0.x-dev`로 될 수 있습니다.) 만약 브랜치가 버전처럼 보이는 형태가 아니라면 `dev-{branchname}`형태일 것이고 `master`는 `dev-master`버전 형태가 됩니다. 

버전 브랜치 이름에 대한 예제는 다음과 같습니다.

- 1.x
- 1.0 (equals 1.0.x)
- 1.1.x

> **주의:** 개발 버전을 설치할 때에는 패키지를 자동으로 `source`에서 내려받습니다.
> 더 자세한 사항은 [`설치`](/Composer-korean-docs/doc/03-cli.md#install) 명령어에 대해서 참고하십시오.

### Aliases - 앨리어스

브랜치 이름을 버전으로하는 별칭을 지정 할 수 있습니다. 예를 들면 `1.0.x-dev`를 필요로 하는 모든 패키지들에서 사용하기 위해서 `dev-master` 에서 `1.0.x-dev`로 별칭을 지정(alias)할 수 있습니다. 별칭-Aliases에 관한 추가정보는 [Aliases](/Composer-korean-docs/doc/articles/aliases.md)부분을 참고하십시오.

## Lock file

함께 협업하는 팀 모두가 항상 같은 의존성 버전으로 테스팅 할 수 있게 해주기 위해 필요한 경우에 `composer.lock` 파일을 포함하여 커밋할 수 있습니다. lock 파일은 다른 프로젝트에는 형상을 주지 않고 해당 프로젝트에만 적용됩니다.

만약 lock file을 커밋하기를 원치 않고 현재 git을 사용하고 있다면 `.gitignore`에 lock 파일을 추가하면 됩니다.

## 버전관리도구로 퍼블리싱하기

이미 VCS 저장소를 보유하고 있고(버전관리 시스템 예를들어 git) `composer.json` 파일을 보유하고 있다면 해당 라이브러리는 컴포저로 설치가 가능해집니다. 

다음 예에서 github의 `github.com/username/hello-world`에 라이브러리 `acme/hello-world`를 퍼블리싱 하는 것을 보여드리겠습니다. 

먼저 `acme/hello-world` 패키지를 인스톨하는것을 테스트 하기 위해서 로컬 환경에 새로운 프로젝트를 만듭니다. 이 패키지를 `acme/blog`라고 합시다. 이 블로그는 `monolog/monolog`에 의존성을 가지고 있는 `acme/hello-world`에 대한 의존성을 가지고 있습니다. 이 디렉토리에 다음과 같이 `composer.json`을 생성합니다. 

{% highlight json %}
{
    "name": "acme/blog",
    "require": {
        "acme/hello-world": "dev-master"
    }
}
{% endhighlight %}

이 블로그 라이브러리를 퍼블리싱-배포하지 않는다면 name 필드가 꼭 필요하지는 않지만 앞서 이야기한 `composer.json`에 대한 설명을 보여주기 위해서 추가해놓았습니다.  

이제 이 블로그 라이브러리가 어디에서 `hello-world`에 대한 의존성 패키지를 찾을 수 있는지 알려주어야 합니다. 다음처럼 repository에 대한 스펙을 추가하여 어디에서 찾을 수 있는지 알려줄 수 있습니다. 

`composer.json`:

{% highlight json %}
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
{% endhighlight %}

레파지토리-저장소가 어떻게 작동하고 사용 할 수 있는 자세한 사항들에 대해서는  [Repositories](/Composer-korean-docs/doc/05-repositories.md)챕터를 참고하십시오.

자 이제 다 됬습니다. 이제 컴포저의 `install` 명령어를 통해서 의존 패키지들을 다운로드 할 수 있습니다. 

**요약:** 어떠한 git/svn/hg 저장소라도 `composer.json`파일을 포함하고 있다면 프로젝트에서 필요로 하는 패키지들을 저장소 스펙에 맞게 추가하는 것만으로도 의존성 관리를 할 수 있습니다. 

## 패키지스트(packagist)로 퍼블리싱하기

이제 패키지들을 퍼블리싱 할 수 있게 되었습니다. 하지만 매번 VCS 저장소를 추가하는 것은 매우 어려운 일입니다. 그리고 실제로 매번 이렇게 할 필요는 없습니다. 

생각해 보면 `monolog/monolog`는 패키지 저장소를 따로 지정해주지 않았지만 정상적으로 작동했습니다. 어떻게 이러한일이 가능했을 까요? 정답은 바로 패키지스트(packagist)입니다. 

[Packagist](https://packagist.org/)는 컴포저용 주요 패키지 저장소를 말하며 컴포저에 기본으로 설정돼 있습니다. 패키지스트에 퍼블리싱된 것들은 자동으로 컴포저로 사용할 수 있습니다. 따라서 추가적으로 저장소에 대한 정보없이도 monolog [패키지스트에서 보기](https://packagist.org/packages/monolog/monolog)를 사용할 수 있는 것입니다. 

If we wanted to share `hello-world` with the world, we would publish it on
packagist as well. Doing so is really easy.

만약 우리가 `hello-world`를 공유하기 원한다면 이 또한 패키지스트에 올리면 됩니다(퍼블리싱). 이 또한 아주 쉽게 가능합니다. 

간단하게 말해서 "Submit Package" 버튼을 클릭하고 가입을 한 뒤에 보유한 버전관리도구 저장소의 URL을 입력하면 패키지스트가 알아서 크롤링을 하게 됩니다. 이것이 전부이며 이제 패키지스트를 통해서 퍼블리싱한 패키지를 누구나 사용할 수 있게 됩니다. 

&larr; [기본 사용법](/Composer-korean-docs/doc/01-basic-usage.md) |  [커맨드라인 인터페이스 / 명령어](/Composer-korean-docs/doc/03-cli.md) &rarr;