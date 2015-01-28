# The composer.json Schema

This chapter will explain all of the fields available in `composer.json`.

## JSON schema

We have a [JSON schema](http://json-schema.org) that documents the format and
can also be used to validate your `composer.json`. In fact, it is used by the
`validate` command. You can find it at:
[`res/composer-schema.json`](https://github.com/composer/composer/blob/master/res/composer-schema.json).

## Root Package

The root package is the package defined by the `composer.json` at the root of
your project. It is the main `composer.json` that defines your project
requirements.

Certain fields only apply when in the root package context. One example of
this is the `config` field. Only the root package can define configuration.
The config of dependencies is ignored. This makes the `config` field
`root-only`.

If you clone one of those dependencies to work on it, then that package is the
root package. The `composer.json` is identical, but the context is different.

> **Note:** A package can be the root package or not, depending on the context.
> For example, if your project depends on the `monolog` library, your project
> is the root package. However, if you clone `monolog` from GitHub in order to
> fix a bug in it, then `monolog` is the root package.

## Properties

### name

The name of the package. It consists of vendor name and project name,
separated by `/`.

Examples:

* monolog/monolog
* igorw/event-source

Required for published packages (libraries).

### description

A short description of the package. Usually this is just one line long.

Required for published packages (libraries).

### version

The version of the package. In most cases this is not required and should
be omitted (see below).

This must follow the format of `X.Y.Z` or `vX.Y.Z` with an optional suffix
of `-dev`, `-patch`, `-alpha`, `-beta` or `-RC`. The patch, alpha, beta and
RC suffixes can also be followed by a number.

Examples:

- 1.0.0
- 1.0.2
- 1.1.0
- 0.2.5
- 1.0.0-dev
- 1.0.0-alpha3
- 1.0.0-beta2
- 1.0.0-RC5

Optional if the package repository can infer the version from somewhere, such
as the VCS tag name in the VCS repository. In that case it is also recommended
to omit it.

> **Note:** Packagist uses VCS repositories, so the statement above is very
> much true for Packagist as well. Specifying the version yourself will
> most likely end up creating problems at some point due to human error.

### type

The type of the package. It defaults to `library`.

패키지의 타입을 정의합니다. 기본타입은 `library` 입니다.

Package types are used for custom installation logic. If you have a package
that needs some special logic, you can define a custom type. This could be a
`symfony-bundle`, a `wordpress-plugin` or a `typo3-module`. These types will
all be specific to certain projects, and they will need to provide an
installer capable of installing packages of that type.

패키지 타입은 커스텀 설치를 위해 사용됩니다. 당신의 패키지가 특별한 로직이 필요 하다면, 커스텀 타입을 선언해야 합니다.
예를들면 `symfony-bundle`, `wordpress-plugin` 혹은 `typo3-module`등을 사용 할수 있습니다. 이 모든 타입들은 각각의 프로젝트 마다 다르게 사용됩니다. 그리고 그 타입들은 그 타입에 맞는 설치 가능한 설치 패키지를 제공해야 합니다.

Out of the box, composer supports four types:

composer 가 기본으로 지원하는 4가지 타입들 (설치 패키지가 필요하지 않음).

- **library:** This is the default. It will simply copy the files to `vendor`.
- **library:** `vendor`에 파일들을 복사 하는 기본 타입입니다. 
- **project:** This denotes a project rather than a library. For example
  application shells like the [Symfony standard edition](https://github.com/symfony/symfony-standard),
    or full fledged applications distributed as packages. This can for example
  be used by IDEs to provide listings of projects to initialize when creating
  a new workspace.
- **project:** 라이브러리 가 아닌 패키지를 의미합니다. 예를 들면  [Symfony standard edition](https://github.com/symfony/symfony-standard)와 같은 쉘 어플리케이션이 있으며
  [SilverStripe installer](https://github.com/silverstripe/silverstripe-installer) 같은 CMS 프로젝트가 있습니다. 
  혹은 패키지 처럼 완전히 분리되었을 때 사용합니다. 새로운 작업공간을 생성할때 초기설정 리스트를 제공하는 IDE들에 의해 사용되는 것을 예로 들수 있다.
- **metapackage:** An empty package that contains requirements and will trigger
  their installation, but contains no files and will not write anything to the
  filesystem. As such, it does not require a dist or source key to be
  installable.
 - **metapackage:** requirement가 포함된 비어있는 객체는 작동시 설치가 된다. 그러나 파일이 포함되어 있지 않으면 어떠한 내용도 파일시스템에 쓰지 않는다. 그러므로 설치시에 dist 혹은 source key 를 요구하지 않고 설치됩니다.
- **composer-plugin:** A package of type `composer-plugin` may provide an
  installer for other packages that have a custom type. Read more in the
  [dedicated article](articles/custom-installers.md).
- **composer-plugin:** `composer-plugin`타입의 패키지는 다른 커스텀 패키지들을 위해 인스톨러를 제공합니다. 자세한 내용은 [dedicated article](articles/custom-installers.md)에서 확인 할수 있습니다.
  
Only use a custom type if you need custom logic during installation. It is
recommended to omit this field and have it just default to `library`.

당신이 설치하는 동안에 커스텀 로직이 필요하면 커스텀 타입을 사용하면 됩니다. 그 외에는 타입 설정을 하지 않거나 `library` 기본 셋팅을 하는것을 추천한다.

### keywords

An array of keywords that the package is related to. These can be used for
searching and filtering.

패키지와 관계가 있는 키워드가 배열 형태로 선언됩니다. 이것들은 검색과 필터링에 사용 됩니다.

Examples:

- logging
- events
- database
- redis
- templating

Optional.

(필수 입력 아님)

### homepage

An URL to the website of the project.

프로젝트의 웹사이트 URL 입니다.

Optional.

(필수 입력 아님)
### time

Release date of the version.

해당 버젼의 릴리즈 날짜입니다.

Must be in `YYYY-MM-DD` or `YYYY-MM-DD HH:MM:SS` format.

`YYYY-MM-DD` 혹의 `YYYY-MM-DD HH:MM:SS` 의 형태로 반드시 사용해야 합니다.

Optional.

(필수 입력 아님)
### license

The license of the package. This can be either a string or an array of strings.

패키지의 라이센스를 정의 합니다. 문자 형태 혹은 배열 형태로 정의할 수 있습니다.

The recommended notation for the most common licenses is (alphabetical):

가장 일반적인 사용되어 지는 라이센스의 추천 항목들 입니다. (알파벳 순 정렬)

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

Optional, but it is highly recommended to supply this. More identifiers are
listed at the [SPDX Open Source License Registry](http://www.spdx.org/licenses/).

필수 항목은 아니지만 라이센스를 정의하는 것을 매우 추천합니다. 라이센스들의 기타 항목들은 [SPDX Open Source License Registry](http://www.spdx.org/licenses/) 에서 확인 할수 있습니다.

For closed-source software, you may use `"proprietary"` as the license identifier.

더이상 제공하지 않는 소프트웨어에 대해서는 `"proprietary"` 로 설정 하면 됩니다.

An Example:

```json
{
    "license": "MIT"
}
```

For a package, when there is a choice between licenses ("disjunctive license"),
multiple can be specified as array.

배열 형태의 선언은 여러개의 라이센스 중 선택해서 사용해야 하는 패키지에 설정 할 수 있습니다.

An Example for disjunctive licenses:

분리된 라이센스의 예:

```json
{
    "license": [
       "LGPL-2.1",
       "GPL-3.0+"
    ]
}
```

Alternatively they can be separated with "or" and enclosed in parenthesis;

or로 구분된 라이센스를 괄호로 묶어 선택하여 사용 할 수 있습니다.

```json
{
    "license": "(LGPL-2.1 or GPL-3.0+)"
}
```

Similarly when multiple licenses need to be applied ("conjunctive license"),
they should be separated with "and" and enclosed in parenthesis.

비슷한 경우로 결합한 형태의 라이센스가 지원 되는 경우 위의 예시에서 "or" 대신 "and" 구분자를 사용하여 설정 할 수 있습니다.


### authors

패키지의 제작자입니다. 객체(object)의 배열로 들어갑니다.

The authors of the package. This is an array of objects.

각각의 제작자 객체는 다음의 값(properties)을 따릅니다.

Each author object can have following properties:

* **name:** 제작자의 이름, 대게 실제 이름을 사용합니다.
* **email:** 제작자의 이메일 주소.
* **homepage:** 제작자 웹사이트의 주소.
* **role:** 해당 프로젝트에서 제작자의 역할. (e.g. 개발자 혹은 번역가)

* **name:** The author's name. Usually his real name.
* **email:** The author's email address.
* **homepage:** An URL to the author's website.
* **role:** The authors' role in the project (e.g. developer or translator)

예시 :

An example:

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

선택사항, 그러나 사용하기를 권장합니다.

Optional, but highly recommended.

### support

해당 프로젝트 지원에대한 다양한 정보.

Various information to get support about the project.

지원 정보는 다음 내용을 따릅니다 :

Support information includes the following:

* **email:** 지원을 위한 이메일 주소.
* **issues:** 이슈관리를 위한 URL.
* **forum:** 포럼 URL.
* **wiki:** 위키 URL.
* **irc:** 지원을 위한 IRC 채널(irc://server/channel).
* **source:** 접근 혹은 다운로드 가능한 소스의 URL.

* **email:** Email address for support.
* **issues:** URL to the Issue Tracker.
* **forum:** URL to the Forum.
* **wiki:** URL to the Wiki.
* **irc:** IRC channel for support, as irc://server/channel.
* **source:** URL to browse or download the sources.

예시 :

An example:

```json
{
    "support": {
        "email": "support@example.org",
        "irc": "irc://irc.freenode.org/composer"
    }
}
```

선택사항

Optional.

### Package links (패키지 관련사항)

해당 내용에서는 패키지의 이름에 대응하는 [버전 제약](01-basic-usage.md#package-versions) 객체를 갖습니다.

All of the following take an object which maps package names to
[version constraints](01-basic-usage.md#package-versions).

예시 :

Example:

```json
{
    "require": {
        "monolog/monolog": "1.0.*"
    }
}
```

모든 패키지 관련사항은 선택사항입니다.

All links are optional fields.

`require`과 `require-dev`는 추가적으로 안정성(stability) 정보를 지원합니다 (root-only).
이것들은 [최소 안정성(minimum-stability)](#minimum-stability)뿐 아니라 더 제한되거나 더 확장할 수 있는 패키지의 안정성을 사용할 수 있게 해줍니다. 당신은 이러한 제약을 적용할 수 있습니다. 만약 안정적이지 않은(unstable) 의존하는 패키지를 사용하길 원한다면 예시처럼 그냥 비워두시면 됩니다.

`require` and `require-dev` additionally support stability flags (root-only).
These allow you to further restrict or expand the stability of a package beyond
the scope of the [minimum-stability](#minimum-stability) setting. You can apply
them to a constraint, or just apply them to an empty constraint if you want to
allow unstable packages of a dependency for example.

예시 :

Example:

```json
{
    "require": {
        "monolog/monolog": "1.0.*@beta",
        "acme/foo": "@dev"
    }
}
```

만약 의존하고 있는 패키지들 중 하나가 안정적이지 않는 패키지를 갖고 있다면 그것을 확실한 안정성 플래그(stability flag)를 통해 명시적으로 표시해주어야 합니다.

If one of your dependencies has a dependency on an unstable package you need to
explicitly require it as well, along with its sufficient stability flag.

예시 : 

Example:

```json
{
    "require": {
        "doctrine/doctrine-fixtures-bundle": "dev-master",
        "doctrine/data-fixtures": "@dev"
    }
}
```

`require`과 `require-dev`는 추가적으로 개발버전을 위한 참조 값(예컨데, commit)을 명시적으로 표기할 수 있습니다. 이는 업데이트를 수행하더라도 주어진 상태를 고정할 수 있도록  해줍니다. 개발버전을 명시적으로 표기하고자 할 때 `#<ref>`의 형태로 추가하시면 됩니다.

`require` and `require-dev` additionally support explicit references (i.e.
commit) for dev versions to make sure they are locked to a given state, even
when you run update. These only work if you explicitly require a dev version
and append the reference with `#<ref>`.

예시 :

Example:

```json
{
    "require": {
        "monolog/monolog": "dev-master#2eb0c0978d290a1c45346a1955188929cb4e5db7",
        "acme/foo": "1.0.x-dev#abc123"
    }
}
```

> **Note:** 이 기능은 매우 편리하지만, 이것이 가져오는 기술적 한계 때문에 오랜기간에 걸쳐 패키지들을 사용하는 방법이 되어서는 안됩니다. composer.json 메타데이터는 해쉬 전에 작성한 가지(branch) 이름으로 부터 여전히 읽어들일 것입니다. 이것은 이런 몇가지 상황 때문에 실용적인 방법이 될 수 없고, 가능한한 항상 tagged releases를 바꿔야합니다.

> **Note:** While this is convenient at times, it should not be how you use
> packages in the long term because it comes with a technical limitation. The
> composer.json metadata will still be read from the branch name you specify
> before the hash. Because of that in some cases it will not be a practical
> workaround, and you should always try to switch to tagged releases as soon
> as you can.

패키지 정보에 대해 해당하지 않는 버전에 대응하려면 패키지 정보를 한줄로 별칭을 작성함에 따라 가능합니다. 더 많은 정보는 [별칭](articles/aliases.md)에서 볼 수 있습니다.

It is also possible to inline-alias a package constraint so that it matches
a constraint that it otherwise would not. For more information [see the
aliases article](articles/aliases.md).

#### require

해당 패키지에서 필요한 패키지들입니다. 패키지는 요구사항에 작성되지 않는 것들 외에는 설치하지 않습니다.

Lists packages required by this package. The package will not be installed
unless those requirements can be met.

#### require-dev <span>(root-only)</span>

해당 패키지를 개발하거나 테스트를 수행하는 등에 필요한 패키지들입니다. 기본으로 최상위 패키지(root package)의 개발에 필요한 요구사항을 설치하게 됩니다. `install`과 `update`는 각각 `--no-dev`라는 옵션을 지원하는데, 이는 개발에 필요한 의존성 패키지들을 설치하지 않도록 합니다.

Lists packages required for developing this package, or running
tests, etc. The dev requirements of the root package are installed by default.
Both `install` or `update` support the `--no-dev` option that prevents dev
dependencies from being installed.

#### conflict

현재 패키지 버전에서 충돌을 일으키는 패키지들입니다. 이들은 당신의 패키지안에 설치되지 않습니다.

Lists packages that conflict with this version of this package. They
will not be allowed to be installed together with your package.

`충돌(conflic)` 링크 내에 `<1.0 >=1.1` 처럼 작성되었을 때, 이는 1.0보다 작고, *그리고* 1.1보다 크거나 같은 이 둘을 동시에 만족하는 버전을 참고하는데 이는 반드시 충돌을 일으킬 것입니다. 그리고 이는 아마도 원하는 동작이 아닐 것입니다. 이런 상황에는 `<1.0 | >=1.1`와 같이 작성하셔야 합니다.

Note that when specifying ranges like `<1.0 >=1.1` in a `conflict` link,
this will state a conflict with all versions that are less than 1.0 *and* equal
or newer than 1.1 at the same time, which is probably not what you want. You
probably want to go for `<1.0 | >=1.1` in this case.

#### replace

현재 패키지로 대체 가능한 패키지들의 리스트입니다. 이는 패키지를 복사(fork)하고, 고유한 버저닝과 다른 이름으로 배포할 수 있도록 합니다. 그리고 원본 패키지를 필요로하는 패키지들은 원본 패키지를 대체 할 수 있도록 당신의 복사본과 지속적으로 동작하게 해줍니다.

Lists packages that are replaced by this package. This allows you to fork a
package, publish it under a different name with its own version numbers, while
packages requiring the original package continue to work with your fork because
it replaces the original package.

이는 부가 패키지(sub-package)를 포함할때 매우 유용합니다. 예를 들어봅시다. 메인 symfony/symfony 패키지가 각각의 패키지로도 사용가능한 Symfony Components 전체를 포함하고 있습니다. 메인 패키지가 필요하다면 이것은 각 구성요소 모두가 대체될대까지 자동적으로 각 구성요소(components)들의 요구사항을 만족하도록 수행합니다. 

This is also useful for packages that contain sub-packages, for example the main
symfony/symfony package contains all the Symfony Components which are also
available as individual packages. If you require the main package it will
automatically fulfill any requirement of one of the individual components,
since it replaces them.

위에 설명한 부가 패키지의 목적을 위해 사용을 대체할 때 주의가 필요합니다(?). 일반적으로 메인 패키지가  정확하거나, 잘못될 수 있는 버전의 부가 패키지들을 명확하게 대체하기 위해서 버전 정보로서 `self.version`을 사용하면 됩니다. 
 
Caution is advised when using replace for the sub-package purpose explained
above. You should then typically only replace using `self.version` as a version
constraint, to make sure the main package only replaces the sub-packages of
that exact version, and not any other version, which would be incorrect.

#### provide

현재 패키지에서 제공하는 다른 패키지들의 리스트입니다. 이는 공통 인터페이스에서 매우 유용합니다. 패키지가 어떤 가상의 `logger` 패키지에 의존한다면, 이 logger 인터페이스를 구현하는 특정 라이브러리를 그저 `provide`안에 추가하면 됩니다. 

List of other packages that are provided by this package. This is mostly
useful for common interfaces. A package could depend on some virtual
`logger` package, any library that implements this logger interface would
simply list it in `provide`.

#### suggest

해당 항목은 현재 패키지와 함께하면 더 좋거나 강화할 수 있는 패키지들을 제안합니다. 이는 현재 패키지를 사용하는 사용자에게 반드시 필요하진 않지만 추가하면 좋은 패키지들의 정보를 제공하기 위해 설치 이후에 보여지는 단순한 정보이다.

Suggested packages that can enhance or work well with this package. These are
just informational and are displayed after the package is installed, to give
your users a hint that they could add more packages, even though they are not
strictly required.

형태는 위의 패키지 관련사항의 형태와 같습니다. 다만 위의 형태와 달리 값이 버전 정보가 아니고 자유롭게 작성할 수 있습니다.

The format is like package links above, except that the values are free text
and not version constraints.

Example:

```json
{
    "suggest": {
        "monolog/monolog": "Allows more advanced logging of the application flow"
    }
}
```

### autoload

PHP 오토로더를 위한 오토로더 매핑.

Autoload mapping for a PHP autoloader.

현재는 [`PSR-0`](http://www.php-fig.org/psr/psr-0/) 오토로딩,
[`PSR-4`](http://www.php-fig.org/psr/psr-4/) 오토로딩, 클래스맵(`classmap`) 생성, 파일(`files`) 포함을 지원합니다. PSR-4를 사용하기를 권장하며 이는 사용하기에 매우 쉽습니다(클래스를 추가할 때마다 매번 오토로더를 생성하는 번거로움을 피할 수 있습니다.).

Currently [`PSR-0`](http://www.php-fig.org/psr/psr-0/) autoloading,
[`PSR-4`](http://www.php-fig.org/psr/psr-4/) autoloading, `classmap` generation and
`files` includes are supported. PSR-4 is the recommended way though since it offers
greater ease of use (no need to regenerate the autoloader when you add classes).

#### PSR-4

`psr-4`에서는 어떤 네임스페이스가 파일경로(패키지 경로에 대한 상대경로)에 대응하는지를 정의할 수 있습니다. `Foo\\Bar\\Baz`와 같 클래스를 오토로딩할 때 `Foo\\` 네임스페이스의 전두사가 `src/` 디렉터리에 대응되어있다면, 오토로더는 `src/Bar/Baz.php` 파일을 찾을 것이고 그리고 해당 파일이 존재하면 이것을 불러올 것입니다. 예전 PSR-0에 완전히 대응되는 개념으로서 전두사(`Foo\\`)는 현재의 파일경로가 아닙니다.

Under the `psr-4` key you define a mapping from namespaces to paths, relative to the
package root. When autoloading a class like `Foo\\Bar\\Baz` a namespace prefix
`Foo\\` pointing to a directory `src/` means that the autoloader will look for a
file named `src/Bar/Baz.php` and include it if present. Note that as opposed to
the older PSR-0 style, the prefix (`Foo\\`) is **not** present in the file path.

네임스페이스 전두사는 비슷한 전두사들간의 충돌을 방지하기 위해 반드시 `\\`로 끝나야 합니다.  예를들어 `Foo`는 `FooBar`네임스페이스 내의 클래스에 매치 될 수 있습니다. 뒤에 백슬래쉬를 붙이는 것은 이러한 문제를 해결할 수 있습니다. `Foo\\`와 `FooBar\\`는 분명히 구분할 수 있습니다.

Namespace prefixes must end in `\\` to avoid conflicts between similar prefixes.
For example `Foo` would match classes in the `FooBar` namespace so the trailing
backslashes solve the problem: `Foo\\` and `FooBar\\` are distinct.

PSR-4는 설치와 업데이트하는 동안 생성된 `vendor/composer/autoload_psr4.php` 파일에서 볼 수 있는 key => value로 이루어진 모든 배열 값을 참조합니다.

The PSR-4 references are all combined, during install/update, into a single
key => value array which may be found in the generated file
`vendor/composer/autoload_psr4.php`.

예시 : 

Example:

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

같은 네임스페이스의 전두사를 여러 디렉토리에서 찾을 수 있다면 다음과 같이 배열을 통해 정의할 수 있습니다.

If you need to search for a same prefix in multiple directories,
you can specify them as an array as such:

```json
{
    "autoload": {
        "psr-4": { "Monolog\\": ["src/", "lib/"] }
    }
}
```

어떠한 네임스페이스에도 찾을 수 있는 폴백 디렉터리가 필요하면 다음과 같이 네임스페이스를 비워두면 됩니다.

If you want to have a fallback directory where any namespace will be looked for,
you can use an empty prefix like:

```json
{
    "autoload": {
        "psr-4": { "": "src/" }
    }
}
```

#### PSR-0

`psr-0`에서는 어떤 네임스페이스가 파일경로(패키지 경로에 대한 상대경로)에 대응하는지를 정의할 수 있습니다. 이는 PEAR 스타일의 네임스페이스를 사용하지 않는 규칙(convention?)도 지원합니다.

Under the `psr-0` key you define a mapping from namespaces to paths, relative to the
package root. Note that this also supports the PEAR-style non-namespaced convention.

확실히 알아두어야 하는 것은 오토로더가 제대로 동작하기 위해서 네임스페이스는 반드시 `\\`로 끝나야 합니다. 예를들어 `Foo`는 `FooBar`에 매치 될 수 있습니다. 뒤에 백슬래쉬를 붙이는 것은 이러한 문제를 해결할 수 있습니다. `Foo\\`와 `FooBar\\`는 분명히 구분할 수 있습니다.

Please note namespace declarations should end in `\\` to make sure the autoloader
responds exactly. For example `Foo` would match in `FooBar` so the trailing
backslashes solve the problem: `Foo\\` and `FooBar\\` are distinct.

PSR-0는 설치와 업데이트하는 동안 생성된 `vendor/composer/autoload_namespaces.php` 파일에서 볼 수 있는 key => value로 이루어진 모든 배열 값을 참조합니다.

The PSR-0 references are all combined, during install/update, into a single key => value
array which may be found in the generated file `vendor/composer/autoload_namespaces.php`.

예시 :

Example:

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

같은 네임스페이스의 전두사를 여러 디렉토리에서 찾을 수 있다면 다음과 같이 배열을 통해 정의할 수 있습니다.

If you need to search for a same prefix in multiple directories,
you can specify them as an array as such:

```json
{
    "autoload": {
        "psr-0": { "Monolog\\": ["src/", "lib/"] }
    }
}
```

PSR-0 스타일은 네임스페이스 선언을 하지 않고 사용하는 클래스도 사용가능합니다. 이는 전역 네임스페이스에 있는 라이브러리 클래스를 사용할 때 매우 유용합니다. php 소스파일이 패키지의 기본 디렉터리에 이ㅜ치한다면 다음 예제처럼 작성하실 수 있습니다.

The PSR-0 style is not limited to namespace declarations only but may be
specified right down to the class level. This can be useful for libraries with
only one class in the global namespace. If the php source file is also located
in the root of the package, for example, it may be declared like this:

```json
{
    "autoload": {
        "psr-0": { "UniqueGlobalClass": "" }
    }
}
```

어떠한 네임스페이스에도 대응할 수 있는 폴백 디렉터리가 필요하면 다음과 같이 네임스페이스를 비워두면 됩니다.

If you want to have a fallback directory where any namespace can be, you can
use an empty prefix like:

```json
{
    "autoload": {
        "psr-0": { "": "src/" }
    }
}
```

#### Classmap

`classmap`은 설치와 업데이트하는 동안 생성된 `vendor/composer/autoload_classmap.php` 파일에서 볼 수 있는 key => value로 이루어진 모든 배열 값을 참조합니다. 이러한 맵은 주어진 디렉터리와 파일에 있는 `.php`와 `.inc`파일 내에 있는 모든 클래스를 읽어들여 생성됩니다.

The `classmap` references are all combined, during install/update, into a single
key => value array which may be found in the generated file
`vendor/composer/autoload_classmap.php`. This map is built by scanning for
classes in all `.php` and `.inc` files in the given directories/files.

PSR-0/4에서 지원하지 않는 모든 라이브러리의 오토로드를 사용하기 위해서 classmap 생성을 사용할 수 있습니다. 클래스를 검색하기 위한 모든 파일과 디렉토리를 작성하시면 됩니다.

You can use the classmap generation support to define autoloading for all libraries
that do not follow PSR-0/4. To configure this you specify all directories or files
to search for classes.

예시 :

Example:

```json
{
    "autoload": {
        "classmap": ["src/", "lib/", "Something.php"]
    }
}
```

#### Files

모든 요청에서 특정 파일을 명시적으로 사용해야할 경우 'files' 오토로드를 사용할 수 있습니다. 이것은 PHP에서 불러올 수 없는 PHP 함수들을 포함한 패키지들을 사용하는데 있어 유용할 것입니다.

If you want to require certain files explicitly on every request then you can use
the 'files' autoloading mechanism. This is useful if your package includes PHP functions
that cannot be autoloaded by PHP.

예시 :

Example:

```json
{
    "autoload": {
        "files": ["src/MyLibrary/functions.php"]
    }
}
```

### autoload-dev <span>(root-only)</span>

해당 항목은 개발을 목적으로한 오토로드 규칙을 정의하도록 해줍니다.

This section allows to define autoload rules for development purposes.

의존성 패키지로서 해당 패키지를 사용하는 다른 사람들에게는 테스트를 수행하는 클래스는 메인 오토로드 규칙에 포함될 필요가 없습니다. 이러한 규칙은 오토로더를 그저 더럽히기만 할뿐입니다.

Classes needed to run the test suite should not be included in the main autoload
rules to avoid polluting the autoloader in production and when other people use
your package as a dependency.

이럴 때 autoload-dev에 해당 내용을 추가하시면 됩니다. 이는 유닛테스트를 위한 좋은 해결책이 될 것입니다.

Therefore, it is a good idea to rely on a dedicated path for your unit tests
and to add it within the autoload-dev section.

예시 :

Example:

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

> **DEPRECATED**: This is only present to support legacy projects, and all new code
> should preferably use autoloading. As such it is a deprecated practice, but the
> feature itself will not likely disappear from Composer.

A list of paths which should get appended to PHP's `include_path`.

Example:

```json
{
    "include-path": ["lib/"]
}
```

Optional.

### target-dir

> **DEPRECATED**: This is only present to support legacy PSR-0 style autoloading,
> and all new code should preferably use PSR-4 without target-dir and projects
> using PSR-0 with PHP namespaces are encouraged to migrate to PSR-4 instead.

Defines the installation target.

In case the package root is below the namespace declaration you cannot
autoload properly. `target-dir` solves this problem.

An example is Symfony. There are individual packages for the components. The
Yaml component is under `Symfony\Component\Yaml`. The package root is that
`Yaml` directory. To make autoloading possible, we need to make sure that it
is not installed into `vendor/symfony/yaml`, but instead into
`vendor/symfony/yaml/Symfony/Component/Yaml`, so that the autoloader can load
it from `vendor/symfony/yaml`.

To do that, `autoload` and `target-dir` are defined as follows:

```json
{
    "autoload": {
        "psr-0": { "Symfony\\Component\\Yaml\\": "" }
    },
    "target-dir": "Symfony/Component/Yaml"
}
```

Optional.

### minimum-stability <span>(root-only)</span>

This defines the default behavior for filtering packages by stability. This
defaults to `stable`, so if you rely on a `dev` package, you should specify
it in your file to avoid surprises.

All versions of each package are checked for stability, and those that are less
stable than the `minimum-stability` setting will be ignored when resolving
your project dependencies. Specific changes to the stability requirements of
a given package can be done in `require` or `require-dev` (see
[package links](#package-links)).

Available options (in order of stability) are `dev`, `alpha`, `beta`, `RC`,
and `stable`.

### prefer-stable <span>(root-only)</span>

When this is enabled, Composer will prefer more stable packages over unstable
ones when finding compatible stable packages is possible. If you require a
dev version or only alphas are available for a package, those will still be
selected granted that the minimum-stability allows for it.

Use `"prefer-stable": true` to enable.

### repositories <span>(root-only)</span>

Custom package repositories to use.

By default composer just uses the packagist repository. By specifying
repositories you can get packages from elsewhere.

Repositories are not resolved recursively. You can only add them to your main
`composer.json`. Repository declarations of dependencies' `composer.json`s are
ignored.

The following repository types are supported:

* **composer:** A composer repository is simply a `packages.json` file served
  via the network (HTTP, FTP, SSH), that contains a list of `composer.json`
  objects with additional `dist` and/or `source` information. The `packages.json`
  file is loaded using a PHP stream. You can set extra options on that stream
  using the `options` parameter.
* **vcs:** The version control system repository can fetch packages from git,
  svn and hg repositories.
* **pear:** With this you can import any pear repository into your composer
  project.
* **package:** If you depend on a project that does not have any support for
  composer whatsoever you can define the package inline using a `package`
  repository. You basically just inline the `composer.json` object.

For more information on any of these, see [Repositories](05-repositories.md).

Example:

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

> **Note:** Order is significant here. When looking for a package, Composer
will look from the first to the last repository, and pick the first match.
By default Packagist is added last which means that custom repositories can
override packages from it.

### config <span>(root-only)</span>

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

예제:

```json
{
    "config": {
        "bin-dir": "bin"
    }
}
```

> **Note:** `http-basic`, `github-oauth` 와 같이 사용자 인증 관련 옵션은 `composer.json`외에 `auth.json` 파일 내에 지정할 수 있습니다. 이러한 방법은 .gitignore에 추가할 수 있고, 개발자는 자신의 자격 증명(?)이 가능합니다.

### scripts <span>(root-only)</span>

설치 과정의 여러 부분을 스크립트로 후크 할 수 있습니다

여기를 보시면 [Scripts](articles/scripts.md) 자세한 설명과 예제가 있습니다.

### extra

`scripts`로 사용하기 위한 임의의 데이터 입니다.

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

패키지로 저장하기 위한 옵션을 설정합니다.

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

