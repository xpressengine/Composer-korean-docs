# 커맨드라인 인터페이스 / 명령어

이미 여려분은 이 앞에서 커맨드라인 인터페이스를 사용하는 방법을 익혔습니다. 이 챕터에서는 모든 명령어들에 대해서 정리해 보겠습니다.

커맨드라인에 대한 도움말을 확인하고자 한다면, `composer` 또는 `composer list`를 입력하여 전체 명령어 목록을 확인한 다음에, 각 명령어 뒤에 `--help`를 붙이면 추가적인 정보를 확인 수 있습니다. 

## 글로벌 옵션

다음의 옵션들은 모든 명령어에서 사용할 수 있습니다:

* **--verbose (-v):** 출력 메시지를 더 상세하게 나타내줍니다.
* **--help (-h):** 도움말 정보를 표현합니다.
* **--quiet (-q):** 어떠한 메시지도 출력하지 않습니다.
* **--no-interaction (-n):** 어떠한 대화형 질문도 하지 않습니다.
* **--working-dir (-d):** 만약 옵션이 지정되면, 지정된 디렉토리를 작업 디렉토리로 사용합니다.
* **--profile:** 수행 시간과 메모리 사용 정보를 표현합니다.
* **--ansi:** 강제로 ANSI로 출력합니다.
* **--no-ansi:** ANSI 출력을 할 수 없게 합니다.
* **--version (-V):** 이 애플리케이션의 버전을 표현합니다. 

## 프로세스 종료 코드

* **0:** OK
* **1:** 포괄적인/알려지지 않은 에러 코드
* **2:** 의존성 해결 에러 코드

## init - 초기화

[라이브러리](02-libraries.md) 챕터에서 `composer.json` 을 수동으로 만드는 방법을 살펴보았습니다. `init` 명령어는 이 작업을 조금 더 쉽게할 수 있게 해줍니다.

명령어를 실행하면 몇가지 질문들에 대한 답을 통해서 필드들에 대한 기본값을 채우도록  할 것입니다.

```sh
php composer.phar init
```

### 옵션

* **--name:** 패키지 이름.
* **--description:** 패키지 설명.
* **--author:** 패키지 작성자의 이름
* **--homepage:** 패키지의 홈페이지.
* **--require:** 버전 제약하에 필요한 패키지들. `foo/bar:1.0.0`의 형태여야 합니다.
* **--require-dev:** 개발시 필요한 것들, **--require**를 보세요.
* **--stability (-s):** `minimum-stability` 필드 값.

## 설치

`install` 명령어는 현재 디렉토리에 있는 `composer.json` 파일을 읽고, 의존성을 해석하여, `vendor`에 패키지들을 설치합니다.

```sh
php composer.phar install
```

만약 현재 디렉토리에 `composer.lock` 파일이 있으면, 의존성을 해석하는 대신 `composer.lock`에 있는 것과 일치하는 버전을 사용할 것입니다. 이것은 라이브러리를 사용하는 사람들이 동일한 의존성 버전을 갖도록 보장해줍니다.

만약 `composer.lock` 파일이 없다면, 컴포저는 의존성을 해석한 후 새롭게 파일을 만들 것입니다.

### Options

* **--prefer-source:** 패키지를 다운로드 하는 데에는 `source`와 `dist` 두가지 방법이 존재합니다. 안정화 버전에서는 `dist`가 기본값으로 쓰일것입니다. `source`는 버전 관리 저장소를 의미합니다. 만약 `--prefer-source`옵션을 사용하면, 컴포저는 `source`로 부터 설치를 하는데, 이러한 경우는 프로젝트에 버그를 수정하려 할때와 의존 패키지의 로컬 git에 복제하는데에 유용합니다.
* **--prefer-dist:** `--prefer-source`와 반대로, 가능하다면 컴포저는 `dist`로부터 설치를 합니다. 이 방법은 일반적으로 벤더를 업데이트 하지 않는 케이스와 빌드 서버로 부터 설치를 진행하는 형태로 설치 속도를 빠르게 해줄 수 있습니다. 또한 적절하게 셋업되지 않은 경우에 발생할 수 있는 git과 관련된 문제를 피하는 방법이기도 합니다.
* **--ignore-platform-reqs:** `php`, `hhvm`, `lib-*` 와 `ext-*`등의 요구사항을 무시하고 로컬 머신이 이 조건을 만족하지 못한다고 하더라도 설치를 강행합니다.
* **--dry-run:** 만약 실제로 패키지들을 설치 하지 않고 빠르게 설치과정만을 살펴보길 원한다면, `--dry-run`을 사용할 수 있습니다. 이것은 설치를 시뮬레이션 해보고 어떤일이 발생하는지 보여줍니다.
* **--dev:** `require-dev`에 있는 패키지들을 설치합니다 (기본설정된 행동입니다).
* **--no-dev:** `require-dev`에 있는 패키지들을 설치하지 않고 스킵합니다.
* **--no-autoloader:** 오토로더를 생성하지 않고 넘어갑니다.
* **--no-scripts:** `composer.json`에 정의된 스크립트를 실행하지 않고 넘어갑니다. 
* **--no-plugins:** 플러그인들을 사용하지 않습니다.
* **--no-progress:** 스크립트를 지저분하게 만들 수 있는 터미널이나 백스페이스 문자를 다루지 않는 진행사항들의 표시를 제거합니다.
* **--optimize-autoloader (-o):** PSR-0/4 오토로딩을 클래스맵으로 전환시켜서 오토로더를 더 빠르게 합니다. 특히 프로덕션에 추천되지만, 시간이 조금 걸릴 수 있어서 현재는 기본설정에서는 빠져있습니다.

## 업데이트

의존성을 설정한 패키지들의 최신버전을 다운받고, `composer.lock` 파일을 업데이트 하기 위해서는, `update` 명령어를 사용합니다.

```sh
php composer.phar update
```

업데이트 명령어는 프로젝트의 모든 의존관계럴 설정한 패키지들을 확인하고`composer.lock`에 정확한 버전을 기입해줍니다.

만약 전체 패키지가 아닌 일부 패키지만 업데이트하길 원한다면, 다음과 같이 할 수 있습니다.

```sh
php composer.phar update vendor/package vendor/package2
```

와일드카드를 사용해서 패키지들을 한 번에 업데이트 할 수도 있습니다.

```sh
php composer.phar update vendor/*
```

### 옵션

* **--prefer-source:** 가능한 경우 `source`로 부터 패키지를 설치합니다.
* **--prefer-dist:** 가능한 경우 `dist`로 부터 패키지를 설치합니다.
* **--ignore-platform-reqs:** `php`, `hhvm`, `lib-*` 와 `ext-*` 요구사항을 무시하고 로컬 머신이 이 조건을 만족하지 못한다고 하더라도 설치를 강행합니다.
* **--dry-run:** 실제로는 실행하진 않고 커맨드를 시뮬레이션 합니다.
* **--dev:** `require-dev`에 있는 패키지들을 설치합니다 (기본 설정입니다).
* **--no-dev:** `require-dev`에 있는 패키지들은 설치하지 않고 넘어갑니다.
* **--no-autoloader:** 오토로더를 생성하지 않고 넘어갑니다.
* **--no-scripts:** `composer.json`에 정의된 스크립트를 실행하지 않고 넘어갑니다. 
* **--no-plugins:** 플러그인을 사용하지 않습니다.
* **--no-progress:** 스크립트를 지저분하게 만들 수 있는 터미널이나 백스페이스 문자를 다루지 않는 진행사항들의 표시를 제거합니다.
* **--optimize-autoloader (-o):** PSR-0/4 오토로딩을 클래스맵으로 전환시켜서 오토로더를 더 빠르게 합니다. 특히 프로덕션에 추천되지만, 시간이 조금 걸릴 수 있어서 현재는 기본설정에서는 빠져있습니다.
* **--lock:** lock 파일이 오래되었다는 경고를 나오지 않게 하기 위해 lock 파일의 해시만 업데이트 합니다.
* **--with-dependencies** 화이트리스트에 화이트리스트 패키지의 모든 의존성을 추가합니다.
* **--prefer-stable:** 안정 버전의 의존성을 우선합니다.
* **--prefer-lowest:** 낮은 버전의 의존성을 우선합니다. 요구사항의 최소 버전을 테스트 하는데 유용하며, 일반적으로 `--prefer-stable`과 함께 쓰입니다.

## require

`require` 명령어는 현재 디렉토리에 있는 `composer.json` 파일에 새로운 패키지들을 추가하는 명령어입니다. 
The `require` command adds new packages to the `composer.json` file from the current directory. 

`composer.json` 없을 경우(=no file exists)에는 즉시(on the fly) `composer.json`(=one)을 생성합니다.
If no file exists one will be created.

```sh
php composer.phar require
```

요구사항들(requirements = packages)을 추가하거나 변경한 이후에는 변경된 요구사항들을 설치하거나 업데이트가 됩니다.
After adding/changing the requirements, the modified requirements will be installed or updated.

만약 요구사항이 호환이 되지 않게 하길 원한다면, 다음과 같은 방법으로 무시할 수 있습니다.
If you do not want to choose requirements interactively, you can just pass them to the command.

```sh
php composer.phar require vendor/package:2.* vendor/package2:dev-master
```

### Options

* **--prefer-source:** Install packages from `source` when available. `source`에서 사용가능한 패키지를 설치합니다. 
* **--prefer-dist:** Install packages from `dist` when available. `dist`에서 사용가능한 패키지를 설치합니다. 
* **--ignore-platform-reqs:** ignore `php`, `hhvm`, `lib-*` and `ext-*`	requirements and force the installation even if the local machine does not fulfill these.
// `php`, `hhvm`, `lib-*`, `ext-*`의 요구사항을 무시하고, 로컬 머신(platform)이 요구를 충족하지 않더라도 인스톨을 강행합니다.
* **--dev:** Add packages to `require-dev`. // `require-dev`에 패키지를 더합니다.
* **--no-update:** Disables the automatic update of the dependencies. // 의존성에 의한(연관있는 항목) 자동 업데이트를 사용하지 않습니다.
* **--no-progress:** Removes the progress display that can mess with some terminals or scripts which don't handle backspace characters. // 몇몇 터미널이나 백스페이스문자(\\)가 처리되지 않는 스크립트를 망칠(mess) 수 있는 진행 화면을 제거합니다.
* **--update-no-dev** Run the dependency update with the --no-dev option. // "--no-dev" 옵션을 첨가하여 의존성(관련항목) 업데이트를 진행(실행)합니다.
* **--update-with-dependencies** Also update dependencies of the newly required packages. // 기존의 의존성이 있는 항목 이외에도 새롭게 필요로하는 패키지를 함께 업데이트 합니다.

## remove
`remove` 명령어는 현재 디렉토리에 있는 `composer.json` 파일 안에 적혀있는 패키지를 제거하는 명령어입니다.
The `remove` command removes packages from the `composer.json` file from the current directory.

```sh
php composer.phar remove vendor/package vendor/package2
```
요구사항들(requirements = packages)을 제거한 후에, 변경된 요구사항들은 (자동으로) 삭제(be uninstalled)됩니다.
After removing the requirements, the modified requirements will be uninstalled.

### Options
* **--ignore-platform-reqs:** ignore `php`, `hhvm`, `lib-*` and `ext-*` requirements and force the installation even if the local machine does not fulfill these. // `php`, `hhvm`, `lib-*`, `ext-*`의 요구사항을 무시하고, 로컬 머신(platform)이 요구를 충족하지 않더라도 인스톨을 강행합니다.
* **--dev:** Remove packages from `require-dev`. // `require-dev`에 있는 패키지들을 제거합니다.
* **--no-update:** Disables the automatic update of the dependencies.// 의존성에 의한(연관있는 항목) 자동 업데이트를 사용하지 않습니다.
* **--no-progress:** Removes the progress display that can mess with some terminals or scripts which don't handle backspace characters. // 몇몇 터미널이나 백스페이스문자(\\)가 처리되지 않는 스크립트를 망칠(mess) 수 있는 진행 화면을 제거합니다.
* **--update-no-dev** Run the dependency update with the --no-dev option. // "--no-dev" 옵션을 첨가하여 의존성(관련항목) 업데이트를 진행(실행)합니다.
* **--update-with-dependencies** Also update dependencies of the removed packages.// 기존의 의존성이 있는 항목 이외에도 새로이 필요로하는 패키지를 함께 업데이트 합니다.

## global

global 명령어는 [COMPOSER_HOME](#composer-home) 디렉토리에 있는 패키지이더라도 `install`, `require`, `update`와 같은 다른 명령어를 쓸 수 있도록 하게 합니다.

The global command allows you to run other commands like `install`, `require` or `update` as if you were running them from the [COMPOSER_HOME](#composer-home)
directory.

이 명령어는 CLI 유틸리티를 전역(globally)설치할 때 사용할 수 있고, `$COMPOSER_HOME/vendor/bin`을 당신의 `$PATH` 환경 변수로 추가 실킬수 있습니다. 여기 예제가 있습니다:
This can be used to install CLI utilities globally and if you add `$COMPOSER_HOME/vendor/bin` to your `$PATH` environment variable. Here is an example:

```sh
php composer.phar global require fabpot/php-cs-fixer:dev-master
```

이제 `php-cs-fixer` 바이너리는 어디에서든지(globally) 사용이 가능합니다(당신의 PATH에도 당연하게 적용됩니다.). 만약 나중에(later on) 바이너리를 업데이트 하고 싶다면, 그냥 global update를 사용하면 됩니다:
Now the `php-cs-fixer` binary is available globally (assuming you adjusted your PATH). If you wish to update the binary later on you can just run a global update:

```sh
php composer.phar global update
```

## search

`search` 명령어는 현재 프로젝트의 저장소를 검색할 수 있도록 만들어 줍니다. 보통 저장소(this)는 패키지스트입니다. 당신은 간단하게(simply)이 명령어에게 당신이 찾고 싶은 단어를 전달하면 됩니다.

The search command allows you to search through the current project's package repositories. Usually this will be just packagist. You simply pass it the terms you want to search for.

```sh
php composer.phar search monolog
```

또한 여러 단어(multiple arguments)를 명령어에 붙여서 사용하면 하나 이상의 단어를 찾을 수 있습니다.

You can also search for more than one term by passing multiple arguments.

### Options

* **--only-name (-N):** Search only in name. // 이름으로만 검색합니다.

## show

사용가능한 모든 패키지를 리스트화 시키기 위해, `show` 커맨드를 사용하면 됩니다.

To list all of the available packages, you can use the `show` command.

```sh
php composer.phar show
```

만약에 패키지의 상세정보를 보고 싶다면, 패키지 이름을 입력하면 됩니다.

If you want to see the details of a certain package, you can pass the package name.

```sh
php composer.phar show monolog/monolog

name     : monolog/monolog
versions : master-dev, 1.0.2, 1.0.1, 1.0.0, 1.0.0-RC1
type     : library
names    : monolog/monolog
source   : [git] http://github.com/Seldaek/monolog.git 3d4e60d0cbc4b888fe5ad223d77964428b1978da
dist     : [zip] http://github.com/Seldaek/monolog/zipball/3d4e60d0cbc4b888fe5ad223d77964428b1978da 3d4e60d0cbc4b888fe5ad223d77964428b1978da
license  : MIT

autoload
psr-0
Monolog : src/

requires
php >=5.3.0
```

패키지의 (이름에) 버전까지 입력하면, 입력한 버전의 상세정보를 볼 수 있습니다.

You can even pass the package version, which will tell you the details of that specific version.

```sh
php composer.phar show monolog/monolog 1.0.2
```

### Options

* **--installed (-i):** List the packages that are installed. // 이미 설치된 패키지를 리스트로 보여줍니다.
* **--platform (-p):** List only platform packages (php & extensions). // 플랫폼 패키지만 리스트로 보여줍니다.(php & extensions).
* **--self (-s):** List the root package info. // 본(현재) 패키지의 정보를 리스트로 보여줍니다.

## browse / home

`browse`(별칭 `home`)는 브라우저로 패키지 저장소 URL 또는 홈페이지를 엽니다.

### 옵션

* **--homepage (-H):** 저장소 URL 대신 홈페이지를 오픈하게 합니다.

## depends

`depends` 명령은 `composer.json`에 열거된 패키지 중에서 특정 패키지에 종속적인 패키지들을 보여줍니다. `require`, `require-dev` 옵션을 사용해서 열거할 패키지 종류를 지정할 수 있습니다. 지정하지 않으면 둘 다 사용됩니다.


```sh
php composer.phar depends --link-type=require monolog/monolog

nrk/monolog-fluent
poc/poc
propel/propel
symfony/monolog-bridge
symfony/symfony
```

### 옵션

* **--link-type:** 열거할 링크 타입. 여러번 지정할 수 있습니다.

## validate

`comoser.json`을 커밋하거나 릴리즈를 태그하기 전에 반드시 `validate` 명령을 항상 실행해야 합니다. 이 명령어는 `composer.json` 파일이 유효한지 체크합니다.

```sh
php composer.phar validate
```

### 옴션

* **--no-check-all:** 유효성 검사를 철저하게 할지 안할지 여부 지정

## status

패키지를 `source`에서 설치를 하고, 이 소스를 종종 수정할 필요가 있다면, `status` 명령을 사용해서 로컬에 저장된 소스에 변경사항이 있는지 확인할 수 있습니다.

```sh
php composer.phar status
```

`--verbose` 옵션과 같이 사용하면 변경된 내용에 대해 더 자세한 정보를 알 수 있습니다.

```sh
php composer.phar status -v

You have changes in the following dependencies:
vendor/seld/jsonlint:
    M README.mdown
```

## self-update

composer 자체를 최신의 버전으로 갱신하려면, `self-update` 명령을 실행하십시요. 이 명령은 `composer.phar`을 최신의 버전으로 교체합니다.

```sh
php composer.phar self-update
```

특정 버전으로 갱신하려면, 버전정보를 뒤에 지정하면 됩니다:

```sh
php composer.phar self-update 1.0.0-alpha7
```

만약 composer를 시스템에 글로벌하게 설치했다면 ([글로벌 설치](00-intro.md#globally) 참고),
`root` 권한으로 이 명령을 실행해야 합니다.

```sh
sudo composer self-update
```

### 옵션

* **--rollback (-r):** 설치된 가장 최신의 버전으로 롤백합니다.
* **--clean-backups:** 갱신하면서 이전 백업본을 삭제합니다. 이 옵션을 사용하면 현재 갱신된 버전이 유일한 백업본이 됩니다.

## config

The `config` command allows you to edit some basic composer settings in either
the local composer.json file or the global config.json file.

```sh
php composer.phar config --list
```

### Usage

`config [options] [setting-key] [setting-value1] ... [setting-valueN]`

`setting-key` is a configuration option name and `setting-value1` is a
configuration value.  For settings that can take an array of values (like
`github-protocols`), more than one setting-value arguments are allowed.

See the [config schema section](04-schema.md#config) for valid configuration
options.

### Options

* **--global (-g):** Operate on the global config file located at
  `$COMPOSER_HOME/config.json` by default.  Without this option, this command
  affects the local composer.json file or a file specified by `--file`.
* **--editor (-e):** Open the local composer.json file using in a text editor as
  defined by the `EDITOR` env variable.  With the `--global` option, this opens
  the global config file.
* **--unset:** Remove the configuration element named by `setting-key`.
* **--list (-l):** Show the list of current config variables.  With the `--global`
  option this lists the global configuration only.
* **--file="..." (-f):** Operate on a specific file instead of composer.json. Note
  that this cannot be used in conjunction with the `--global` option.
* **--absolute:** Returns absolute paths when fetching *-dir config values
  instead of relative.

### Modifying Repositories

In addition to modifying the config section, the `config` command also supports making
changes to the repositories section by using it the following way:

```sh
php composer.phar config repositories.foo vcs http://github.com/foo/bar
```

## create-project

You can use Composer to create new projects from an existing package. This is
the equivalent of doing a git clone/svn checkout followed by a composer install
of the vendors.

There are several applications for this:

1. You can deploy application packages.
2. You can check out any package and start developing on patches for example.
3. Projects with multiple developers can use this feature to bootstrap the
   initial application for development.

To create a new project using composer you can use the "create-project" command.
Pass it a package name, and the directory to create the project in. You can also
provide a version as third argument, otherwise the latest version is used.

If the directory does not currently exist, it will be created during installation.

```sh
php composer.phar create-project doctrine/orm path 2.2.*
```

It is also possible to run the command without params in a directory with an
existing `composer.json` file to bootstrap a project.

By default the command checks for the packages on packagist.org.

### Options

* **--repository-url:** Provide a custom repository to search for the package,
  which will be used instead of packagist. Can be either an HTTP URL pointing
  to a `composer` repository, or a path to a local `packages.json` file.
* **--stability (-s):** Minimum stability of package. Defaults to `stable`.
* **--prefer-source:** Install packages from `source` when available.
* **--prefer-dist:** Install packages from `dist` when available.
* **--dev:** Install packages listed in `require-dev`.
* **--no-install:** Disables installation of the vendors.
* **--no-plugins:** Disables plugins.
* **--no-scripts:** Disables the execution of the scripts defined in the root
  package.
* **--no-progress:** Removes the progress display that can mess with some
  terminals or scripts which don't handle backspace characters.
* **--keep-vcs:** Skip the deletion of the VCS metadata for the created
  project. This is mostly useful if you run the command in non-interactive
  mode.
* **--ignore-platform-reqs:** ignore `php`, `hhvm`, `lib-*` and `ext-*`
  requirements and force the installation even if the local machine does not
  fulfill these.

## dump-autoload

If you need to update the autoloader because of new classes in a classmap
package for example, you can use "dump-autoload" to do that without having to
go through an install or update.

Additionally, it can dump an optimized autoloader that converts PSR-0/4 packages
into classmap ones for performance reasons. In large applications with many
classes, the autoloader can take up a substantial portion of every request's
time. Using classmaps for everything is less convenient in development, but
using this option you can still use PSR-0/4 for convenience and classmaps for
performance.

### Options

* **--optimize (-o):** Convert PSR-0/4 autoloading to classmap to get a faster
  autoloader. This is recommended especially for production, but can take
  a bit of time to run so it is currently not done by default.
* **--no-dev:** Disables autoload-dev rules.

## clear-cache

Deletes all content from Composer's cache directories.

## licenses

Lists the name, version and license of every package installed. Use
`--format=json` to get machine readable output.

### Options

* **--no-dev:** Remove dev dependencies from the output
* **--format:** Format of the output: text or json (default: "text")

## run-script

To run [scripts](articles/scripts.md) manually you can use this command,
just give it the script name and optionally --no-dev to disable the dev mode.

## diagnose

If you think you found a bug, or something is behaving strangely, you might
want to run the `diagnose` command to perform automated checks for many common
problems.

```sh
php composer.phar diagnose
```

## archive

This command is used to generate a zip/tar archive for a given package in a
given version. It can also be used to archive your entire project without
excluded/ignored files.

```sh
php composer.phar archive vendor/package 2.0.21 --format=zip
```

### Options

* **--format (-f):** Format of the resulting archive: tar or zip (default:
  "tar")
* **--dir:** Write the archive to this directory (default: ".")

## help

To get more information about a certain command, just use `help`.

```sh
php composer.phar help install
```

## Environment variables

You can set a number of environment variables that override certain settings.
Whenever possible it is recommended to specify these settings in the `config`
section of `composer.json` instead. It is worth noting that the env vars will
always take precedence over the values specified in `composer.json`.

### COMPOSER

By setting the `COMPOSER` env variable it is possible to set the filename of
`composer.json` to something else.

For example:

```sh
COMPOSER=composer-other.json php composer.phar install
```

### COMPOSER_ROOT_VERSION

By setting this var you can specify the version of the root package, if it can
not be guessed from VCS info and is not present in `composer.json`.

### COMPOSER_VENDOR_DIR

By setting this var you can make composer install the dependencies into a
directory other than `vendor`.

### COMPOSER_BIN_DIR

By setting this option you can change the `bin` ([Vendor Binaries](articles/vendor-binaries.md))
directory to something other than `vendor/bin`.

### http_proxy or HTTP_PROXY

If you are using composer from behind an HTTP proxy, you can use the standard
`http_proxy` or `HTTP_PROXY` env vars. Simply set it to the URL of your proxy.
Many operating systems already set this variable for you.

Using `http_proxy` (lowercased) or even defining both might be preferable since
some tools like git or curl will only use the lower-cased `http_proxy` version.
Alternatively you can also define the git proxy using
`git config --global http.proxy <proxy url>`.

### no_proxy

If you are behind a proxy and would like to disable it for certain domains, you
can use the `no_proxy` env var. Simply set it to a comma separated list of
domains the proxy should *not* be used for.

The env var accepts domains, IP addresses, and IP address blocks in CIDR
notation. You can restrict the filter to a particular port (e.g. `:80`). You
can also set it to `*` to ignore the proxy for all HTTP requests.

### HTTP_PROXY_REQUEST_FULLURI

If you use a proxy but it does not support the request_fulluri flag, then you
should set this env var to `false` or `0` to prevent composer from setting the
request_fulluri option.

### HTTPS_PROXY_REQUEST_FULLURI

If you use a proxy but it does not support the request_fulluri flag for HTTPS
requests, then you should set this env var to `false` or `0` to prevent composer
from setting the request_fulluri option.

### COMPOSER_HOME

The `COMPOSER_HOME` var allows you to change the composer home directory. This
is a hidden, global (per-user on the machine) directory that is shared between
all projects.

By default it points to `/home/<user>/.composer` on \*nix,
`/Users/<user>/.composer` on OSX and
`C:\Users\<user>\AppData\Roaming\Composer` on Windows.

#### COMPOSER_HOME/config.json

You may put a `config.json` file into the location which `COMPOSER_HOME` points
to. Composer will merge this configuration with your project's `composer.json`
when you run the `install` and `update` commands.

This file allows you to set [configuration](04-schema.md#config) and
[repositories](05-repositories.md) for the user's projects.

In case global configuration matches _local_ configuration, the _local_
configuration in the project's `composer.json` always wins.

### COMPOSER_CACHE_DIR

The `COMPOSER_CACHE_DIR` var allows you to change the composer cache directory,
which is also configurable via the [`cache-dir`](04-schema.md#config) option.

By default it points to $COMPOSER_HOME/cache on \*nix and OSX, and
`C:\Users\<user>\AppData\Local\Composer` (or `%LOCALAPPDATA%/Composer`) on Windows.

### COMPOSER_PROCESS_TIMEOUT

This env var controls the time composer waits for commands (such as git
commands) to finish executing. The default value is 300 seconds (5 minutes).

### COMPOSER_DISCARD_CHANGES

This env var controls the discard-changes [config option](04-schema.md#config).

### COMPOSER_NO_INTERACTION

If set to 1, this env var will make composer behave as if you passed the
`--no-interaction` flag to every command. This can be set on build boxes/CI.

&larr; [Libraries](02-libraries.md)  |  [Schema](04-schema.md) &rarr;
