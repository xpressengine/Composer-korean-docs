# composer.json 구조

This chapter will explain all of the fields available in `composer.json`.<br />
이 챕터에서는 `composer.json`에서 사용중인 모든 항목을 설명할 것입니다.

## JSON 구조

We have a [JSON schema](http://json-schema.org) that documents the format and
can also be used to validate your `composer.json`. In fact, it is used by the
`validate` command. You can find it at:
[`res/composer-schema.json`](https://github.com/composer/composer/blob/master/res/composer-schema.json).<br />
우리는 [JSON 구조](http://json-schema.org)형태를 문서화 하여 가지고 있고, `composer.json` 를 확인하는 데에도 사용할 수 있습니다. 사실, 이것은 `validate` 명령어를 통해 사용됩니다. 다음과 같은 형식을 찾아볼 수 있습니다: [`res/composer-schema.json`](https://github.com/composer/composer/blob/master/res/composer-schema.json)

## Root 패키지

The root package is the package defined by the `composer.json` at the root of
your project. It is the main `composer.json` that defines your project
requirements.<br />
루트 패키지는 프로젝트의 루트에 있는 `composer.json`에 의해 정의 된 패키지입니다. 그것은 프로젝트의 요구사항을 정의하는 메인 `composer.json` 입니다.

Certain fields only apply when in the root package context. One example of
this is the `config` field. Only the root package can define configuration.
The config of dependencies is ignored. This makes the `config` field `root-only`.<br />
일부 항목은 루트 패키지 문맥에서 적용됩니다. `config` 항목이 그 예입니다. 오직 루트 패키지는 구성(형상?)만을 정의할 수 있습니다. 종속성의 설정은 무시됩니다. 이것은 `config`항목을 `root-only`로 만듭니다.

If you clone one of those dependencies to work on it, then that package is the
root package. The `composer.json` is identical, but the context is different.<br />
만약 그것에 쓰이고 있는 종속성들 중 하나를 복제한다면, 그것은 루트 패키지입니다. `composer.json`은 같지만 문맥은 다릅니다.

> **Note:** A package can be the root package or not, depending on the context.
> For example, if your project depends on the `monolog` library, your project
> is the root package. However, if you clone `monolog` from GitHub in order to
> fix a bug in it, then `monolog` is the root package.

> **Note:** 하나의 패키지는 문맥에 따라 루트 패키지가 될수도 있고 아닐수도 있습니다. 예를 들어, 만약 프로젝트가 `monolog` 라이브러리를 의존하고 있다면, 프로젝트가 루트 패키지 입니다. 하지만, 만약 Github로 부터 버그를 수정하기 위해 `monolog`를 복제한다면, `monolog`가 루트 패키지 입니다.

## 속성

### name(이름)

The name of the package. It consists of vendor name and project name,
separated by `/`.<br />
패키지의 이름입니다. 이것은 `/`로 나뉘는 벤더의 이름과 프로젝트의 이름으로 구성되어 있습니다.

Examples:

* monolog/monolog
* igorw/event-source

Required for published packages (libraries).<br />
퍼블리시 된 패키지(라이브러리)의 경우 필수입니다.

### description(설명)

A short description of the package. Usually this is just one line long.<br />
패키지의 짧은 설명글입니다. 일반적으로 한줄 정도의 길이입니다.

Required for published packages (libraries).<br />
퍼블리시 된 패키지(라이브러리)의 경우 필수입니다.

### version

The version of the package. In most cases this is not required and should
be omitted (see below).<br />
패키지의 버전입니다. 대부분의 경우 버전은 생략할 수 있으므로 필수사항이 아닙니다.(아래 참조)

This must follow the format of `X.Y.Z` or `vX.Y.Z` with an optional suffix
of `-dev`, `-patch`, `-alpha`, `-beta` or `-RC`. The patch, alpha, beta and
RC suffixes can also be followed by a number.<br />
버전은 `X.Y.Z` 또는 `vX.Y.Z`의 포멧을 따라야 합니다. 선택적으로 `-dev`, `-patch`, `-alpha`, `-beta` 또는 `-RC`와 같은 접미사와 함께 쓸 수 있습니다. patch, alpha, beta 그리고 RC는 접미사로 숫자가 따라올 수 있습니다.

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
to omit it.<br />
패키지 저장소가 VCS 저장소 안에 VCS 태그 이름과 같이 어딘가에서 버전을 유추할 수 있다면, 이러한 경우에도 생략하는 것이 좋습니다.

> **Note:** Packagist uses VCS repositories, so the statement above is very much true for Packagist as well. Specifying the version yourself will most likely end up creating problems at some point due to human error.
<br />
> **Note:** Packigist는 VCS 저장소를 사용합니다. 그래서 위의 문장은 Packigist에 대한 사실을 아주 잘 나타내줍니다(?). 버전을 직접 작성한다면 인적 오류로 인해 어떠한 지점에서 높은 확률로 결국 문제가 발생할 것 입니다.