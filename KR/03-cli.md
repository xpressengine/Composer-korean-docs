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

(역자주 - 프로세스 종료코드는 실제 커맨드라인에서 명령어를 입력했을 때는 잘 알 수 없지만 composer 를 연동해서 작업을 수행해야하는 CI(continuous integration) 나 기타 시스템 스크립트 수행이 필요한 경우에 정상동작여부를 확인할 수 있게 제공되는 부분입니다. 만약 리눅스나 Mac 의 터미널이라면 composer 의 아무 명령어를 입력하고 $?를 입력하면 정상동작한 경우에 0, 에러가 난경우에는 1, 의존성 패키지 관련 에러는 2가 출력되는것을 확인할 수 있습니다.)


## init - 초기화

[라이브러리](02-libraries.md) 챕터에서 `composer.json` 을 수동으로 만드는 방법을 살펴보았습니다. `init` 명령어는 이 작업을 조금 더 쉽게할 수 있게 해줍니다.

명령어를 실행하면 몇가지 질문들에 대한 답을 통해서 필드들에 대한 기본값을 채우도록  할 것입니다.

```sh
php composer.phar init
```

### 초기화 옵션

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

### 설치 옵션

* **--prefer-source:** 패키지를 다운로드 하는 데에는 `source`와 `dist` 두가지 방법이 존재합니다. 안정화 버전에서는 `dist`가 기본값으로 쓰일것입니다. `source`는 버전 관리 저장소를 의미합니다. 만약 `--prefer-source`옵션을 사용하면, 컴포저는 `source`로 부터 설치를 하는데, 이러한 경우는 프로젝트에 버그를 수정하려 할때와 의존 패키지의 로컬 git에 복제하는데에 유용합니다.
* **--prefer-dist:** `--prefer-source`와 반대로, 가능하다면 컴포저는 `dist`로부터 설치를 합니다. 이 방법은 일반적으로 벤더를 업데이트 하지 않는 케이스와 빌드 서버로 부터 설치를 진행하는 형태로 설치 속도를 빠르게 해줄 수 있습니다. 또한 적절하게 셋업되지 않은 경우에 발생할 수 있는 git과 관련된 문제를 피하는 방법이기도 합니다.
* **--ignore-platform-reqs:** `php`, `hhvm`, `lib-*` 와 `ext-*`등의 요구사항을 무시하고 로컬 머신이 이 조건을 만족하지 못한다고 하더라도 설치를 강행합니다.
* **--dry-run:** 만약 실제로 패키지들을 설치 하지 않고 빠르게 설치과정만을 살펴보길 원한다면, `--dry-run`을 사용할 수 있습니다. 이것은 설치를 시뮬레이션 해보고 어떤일이 발생하는지 보여줍니다.
* **--dev:** `require-dev`에 있는 패키지들을 설치합니다 (기본설정된 행동입니다).
* **--no-dev:** `require-dev`에 있는 패키지들을 설치하지 않고 스킵합니다.
* **--no-autoloader:** 오토로더를 생성하지 않고 넘어갑니다.
* **--no-scripts:** `composer.json`에 정의된 스크립트를 실행하지 않고 넘어갑니다. 
* **--no-plugins:** 플러그인들을 사용하지 않습니다.
* **--no-progress:** 몇몇 터미널이나 백스페이스문자(\\)가 처리되지 않는 스크립트들에서 화면이 지저분 해질 수 있는 진행 화면 표시기능을 제거합니다. 
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

### 업데이트 옵션

* **--prefer-source:** 가능한 경우 `source`로 부터 패키지를 설치합니다.
* **--prefer-dist:** 가능한 경우 `dist`로 부터 패키지를 설치합니다.
* **--ignore-platform-reqs:** `php`, `hhvm`, `lib-*` 와 `ext-*` 요구사항을 무시하고 로컬 머신이 이 조건을 만족하지 못한다고 하더라도 설치를 강행합니다.
* **--dry-run:** 실제로는 명령을 수행하진 않고 시뮬레이션 합니다.
* **--dev:** `require-dev`에 있는 패키지들을 설치합니다 (기본 설정입니다).
* **--no-dev:** `require-dev`에 있는 패키지들은 설치하지 않고 넘어갑니다.
* **--no-autoloader:** 오토로더를 생성하지 않고 넘어갑니다.
* **--no-scripts:** `composer.json`에 정의된 스크립트를 실행하지 않고 넘어갑니다. 
* **--no-plugins:** 플러그인을 사용하지 않습니다.
* **--no-progress:** 몇몇 터미널이나 백스페이스문자(\\)가 처리되지 않는 스크립트들에서 화면이 지저분 해질 수 있는 진행 화면 표시기능을 제거합니다. 
* **--optimize-autoloader (-o):** PSR-0/4 오토로딩을 클래스맵으로 전환시켜서 오토로더를 더 빠르게 합니다. 특히 프로덕션에 추천되지만, 시간이 조금 걸릴 수 있어서 현재는 기본설정에서는 빠져있습니다.
* **--lock:** lock 파일이 오래되었다는 경고를 나오지 않게 하기 위해 lock 파일의 해시만 업데이트 합니다.
* **--with-dependencies** 화이트리스트에 화이트리스트 패키지의 모든 의존성을 추가합니다.
* **--prefer-stable:** 안정 버전(Stable version)의 의존성을 우선합니다.
* **--prefer-lowest:** 낮은 버전의 의존성을 우선합니다. 요구사항의 최소 버전을 테스트 하는데 유용하며, 일반적으로 `--prefer-stable`과 함께 쓰입니다.

## require

`require` 명령어는 현재 디렉토리에 있는 `composer.json` 파일에 새로운 패키지들을 추가하는 명령어입니다. 

`composer.json` 파일이 존재하지 않는 경우에는 파일을 직접 생성합니다.

```sh
php composer.phar require
```

필요로 하는 패키지를 추가하거나 변경한 이후에는 자동으로 설치하거나 업데이트가 수행됩니다.

만약 요구사항이 호환이 되지 않게 하길 원한다면, 다음과 같은 방법으로 무시할 수 있습니다.
If you do not want to choose requirements interactively, you can just pass them to the command.

```sh
php composer.phar require vendor/package:2.* vendor/package2:dev-master
```

### require 옵션

* **--prefer-source:** 가능한 경우 `source`로 부터 패키지를 설치합니다.
* **--prefer-dist:** 가능한 경우 `dist`로 부터 패키지를 설치합니다.
* **--ignore-platform-reqs:** `php`, `hhvm`, `lib-*` 와 `ext-*` 요구사항을 무시하고 로컬 머신이 이 조건을 만족하지 못한다고 하더라도 설치를 강행합니다.
* **--dev:** `require-dev`에 패키지들을 추가합니다.
* **--no-update:** 의존성 패키지들을 자동으로 업데이트 하지 않습니다. 
* **--no-progress:** 몇몇 터미널이나 백스페이스문자(\\)가 처리되지 않는 스크립트들에서 화면이 지저분 해질 수 있는 진행 화면 표시기능을 제거합니다. 
* **--update-no-dev** "--no-dev" 옵션을 추가하여 의존성 업데이트를 진행합니다.(`require-dev`에 있는 패키지들은 설치하지 않고 넘어갑니다.)
* **--update-with-dependencies** 기존의 의존성이 있는 항목 이외에도 새롭게 필요로하는 패키지를 함께 업데이트 합니다.

## remove - 삭제 
`remove` 명령어는 현재 디렉토리에 있는 `composer.json` 파일 안에 적혀있는 패키지를 제거하는 명령어입니다.

```sh
php composer.phar remove vendor/package vendor/package2
```
패키지들을 제거한 후에, 변경된 패키지 요구사항들(require)은 자동으로 삭제됩니다.

### 삭제 옵션
* **--ignore-platform-reqs:** `php`, `hhvm`, `lib-*` 와 `ext-*` 요구사항을 무시하고 로컬 머신이 이 조건을 만족하지 못한다고 하더라도 설치를 강행합니다.
* **--dev:** `require-dev`에 있는 패키지들을 제거합니다.
* **--no-update:** 의존성 패키지들을 자동으로 업데이트 하지 않습니다. 
* **--no-progress:** 몇몇 터미널이나 백스페이스문자(\\)가 처리되지 않는 스크립트들에서 화면이 지저분 해질 수 있는 진행 화면 표시기능을 제거합니다. 
* **--update-no-dev** "--no-dev" 옵션을 추가하여 의존성 업데이트를 진행합니다.(`require-dev`에 있는 패키지들은 설치하지 않고 넘어갑니다.)
* **--update-with-dependencies** 기존의 의존성이 있는 항목 이외에도 새롭게 필요로하는 패키지를 함께 업데이트 합니다.

## global - 글로벌

global 명령어는 [컴포저 홈 디렉토리](#composer-home)에 있는 패키지들도  `install`, `require`, `update`와 같은 다른 명령어를 쓸 수 있도록 해줍니다.

이 명령어는 CLI 유틸리티를 전역(globally)설치할 때 사용할 수 있습니다. 필요한 경우에 `$COMPOSER_HOME/vendor/bin`을 로컬 환경의 `$PATH` 환경 변수로 추가하면 유용하게 컴포저 홈 디렉토리에 접근할 수 있습니다. 여기 예제가 있습니다:

```sh
php composer.phar global require fabpot/php-cs-fixer:dev-master
```

이제 `php-cs-fixer` 바이너리는 어디에서든지 사용이 가능해졌습니다.(PATH에 적용을 했다면). 만약 나중에 바이너리를 업데이트 하고 싶다면, 그냥 global update를 사용하면 됩니다:

```sh
php composer.phar global update
```

(역자주 - 컴포저를 홈 디렉토리에 추가하는 경우는 주로 phpunit, phpcs, laravel-homestead 와 같이 패키지에서 실행가능한 바이너리를 제공하는 경우에 많이 사용된다고 할 수 있습니다. phpunit 의 경우에 모든 개별 프로젝트 vendor 에 추가할 필요없이 글로벌로 설치해 놓으면 어디서든 접근이 가능해지기 때문입니다.)

## search - 검색

`search` 명령어는 현재 프로젝트의 저장소를 검색할 수 있도록 만들어 줍니다. 기본적으로 저장소는 패키지스트로 설정되어 있습니다. 간단하게 search 명령어를 통해서 당신이 찾고 싶은 단어를 전달하면 됩니다.

```sh
php composer.phar search monolog
```

또한 여러개의 단어를 명령어 뒤에 붙여서 사용하면 하나 이상의 단어에 대한 패키지들을 찾을 수 있습니다.

### 검색 옵션

* **--only-name (-N):** 이름을 통해서만 검색합니다.

## show - 보기

사용가능한 모든 패키지의 목록을 확인하기 위해, `show` 명령어를 사용하면 됩니다.

```sh
php composer.phar show
```

(역자주 - 위의 명령어는 패키지스트를 통해서 설치 가능한 모든 패키지들의 목록을 확인하는 명령어로 수행 시간이 30초 이상, 오래걸릴 수 있습니다.)

만약에 패키지의 보다 상세한 정보를 보고 싶다면, 패키지 이름을 뒤에 입력하면 됩니다.


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

패키지 이름 뒤에 버전까지 입력하면, 입력한 버전에 대한 상세정보를 볼 수 있습니다.


```sh
php composer.phar show monolog/monolog 1.0.2
```

### 보기 옵션(show Options)

* **--installed (-i):** 현재 프로젝트에 이미 설치된 패키지들의 리스트를 보여줍니다.
* **--platform (-p):** 플랫폼 패키지만 리스트로 보여줍니다.(php or hhvm or extensions).
* **--self (-s):** 현재 프로젝트의 요약 정보를 목록으로 보여줍니다.

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

### depends 옵션

* **--link-type:** 열거할 링크 타입. 여러번 지정할 수 있습니다.
(역자주 link-type : require, require-dev)

## validate - 유효성 검사

`comoser.json`을 커밋하거나 릴리즈를 하기 위해서 버전을 태깅하기 전에 반드시 `validate` 명령을 실행하길 바랍니다. 이 명령어는 `composer.json` 파일이 유효한지 검사해줍니다. 

```sh
php composer.phar validate
```

### validate 옵션

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

(역자주 - 의존성 패키지들을 source 에서 받으면 git 저장소에서 복제하는 형태로 파일을 가져오고 dist 에서 받으면 zip 파일과 같이(존재한다면) 압축되어 있는 파일을 받는 형태로 설치 또는 업데이트가 진행됩니다. 따라서 일반적으로 dist 를 통해서 설치 또는 업데이트를 하는 것이 속도가 더 빠릅니다. status 명령어는 source 에서 설치한 경우에 해당 패키지들을 임의로 수정한 경우, 원래의 내용과 내가 임의로 수정한 vendor 밑에 패키지의 변경상태가 어떠한지 비교해서 보여줍니다. )

## self-update (컴포저 update)

composer 자체를 최신의 버전으로 갱신하려면, `self-update` 명령을 실행하십시요. 이 명령은 `composer.phar`을 최신의 버전으로 교체합니다.

(역자주 - 일반적으로 composer는 30일 동안 업데이트 하지 않으면 경고가 나타납니다. )

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

### self-update 옵션

* **--rollback (-r):** 설치된 가장 최신의 버전으로 롤백합니다.
* **--clean-backups:** 갱신하면서 이전 백업본을 삭제합니다. 이 옵션을 사용하면 현재 갱신된 버전이 유일한 백업본이 됩니다.

(역자주 - composer self-update 를 수행하면 컴포저 홈 디렉토리에 이전 버전의 컴포저 파일이 저장되어 지고, 롤백을 통해서 다시 복구하거나, 저장된 이전 버전의 컴포저 파일을 clean-backups 를 통해서 삭제할 수 있습니다.)

## config - 설정

`config` 명령어는 로컬 composer.json 파일 또는 글로벌 config.json 파일에 설정된 몇가지의 기본적인 컴포져 설정들을 편집할 수 있게 해줍니다.

```sh
php composer.phar config --list
```

### 사용법

`config [options] [setting-key] [setting-value1] ... [setting-valueN]`

`setting-key`는 설정 옵션 이름이며 `setting-value1`은 설정 값입니다.
(`github-protocols`과 같은) 값의 배열을 취할 수 있는 설정들에는 하나 이상의
setting-value 인자들이 허용됩니다.

사용 가능한 설정 옵션에 대해서는 [설정 스키마 섹션](04-schema.md#config)을
참조하십시오.

### 옵션

* **--global (-g):** 기본적으로 `$COMPOSER_HOME/config.json`에 위치한 글로벌 설정 파일을 조작합니다. 이 옵션이 없으면, 이 명령은 로컬 composer.json 파일 또는 `--file`에서 지정한 파일에 영향을 줍니다.
* **--editor (-e):** `EDITOR` 환경 변수에 정의된 텍스트 편집기를 사용하여 로컬 composer.json 파일을 엽니다. `--global` 옵션을 지정하면, 글로벌 설정 파일을 엽니다.
* **--unset:** `setting-key`로 명명된 설정 요소를 제거합니다.
* **--list (-l):** 현재 설정 변수들의 목록을 보여줍니다. `--global` 옵션을
 지정하면, 글로벌 설정만을 보여줍니다.
* **--file="..." (-f):** composer.json 대신에 특정 파일을 조작합니다. `--global` 옵션과 함께 사용할 수 없습니다.
* **--absolute:** *-dir 설정 값을 가져올 때 상대 경로 대신 절대 경로를 반환합니다.

### 저장소 수정하기

설정 섹션을 변경할뿐만 아니라, `config` 명령은 다음 방법을 사용하여 저장소
섹션을 변경하는 것 또한 지원합니다:

```sh
php composer.phar config repositories.foo vcs http://github.com/foo/bar
```

## create-project (프로젝트 생성)

컴포저를 이용하면 기존 패키지에서 새로운 프로젝트를 만들 수 있습니다. 이는 git
clone/svn checkout 한 후 그 밴더의 컴포저를 설치(install)한 것과 같습니다.

이것에 관한 몇 가지 응용이 있습니다:

1. 애플리케이션 패키지들을 배포 할 수 있습니다.
2. 어떤 패키지를 체크아웃 하고, 패치들에 개발을 시작 할 수 있습니다.
3. 여러 개발자들이 함께하는 프로젝트는 개발을 위한 초기 애플리케이션을
   부트스트랩 하기 위해 이 기능을 사용할 수 있습니다.

"create-project" 명령어를 실행하면 컴포져를 이용해 새 프로젝트를 만듭니다.
패키지명을 전달하고, 디렉토리에 프로젝트를 만듭니다. 또한 세 번째 인수로 버전을
지정 할 수 있습니다. 그렇지 않은 경우 최신 버전이 사용됩니다.

해당 디렉토리가 존재하지 않는 경우 설치 중에 새롭게 생성됩니다.

```sh
php composer.phar create-project doctrine/orm path 2.2.*
```

프로젝트를 부트스트랩하기 위해 `composer.json` 파일이 위치한 디렉토리 내에서
별도의 파라미터 없이 명령을 실행할 수도 있습니다.

기본값에 따라 이 명령은 packagist.org에서 패키지를 확인합니다.

### 옵션

* **--repository-url:** 패키지 검색을 위한 사용자 저장소를 지정하며, 이는
  packagist 대신에 사용됩니다. `composer` 저장소를 가리키는 HTTP URL 또는 로컬
  `packages.json` 파일 경로 중 하나가 될 수 있습니다.
* **--stability (-s):** 패키지의 최소 안전성. 기본값은 `stable`.
* **--prefer-source:** 가능한 `source`로부터 패키지를 설치합니다.
* **--prefer-dist:** 가능한 `dist`로부터 패키지를 설치합니다.
* **--dev:** `require-dev` 내 열거 된 패키지를 설치합니다.
* **--no-install:** 밴더의 설치를 금지합니다.
* **--no-plugins:** 플러그인을 금지합니다.
* **--no-scripts:** 루트 패키지에 정의된 스크립트들의 실행을 금지합니다.
* **--no-progress:** 백스페이스 캐릭터를 다루지 않는 일부 터미널이나 스크립트를
  어지럽히는 진행 표시를 제거합니다.
* **--keep-vcs:** 생성된 프로젝에 관한 VCS 메타데이터의 삭제를 건너뜁니다.
  비대화식 모드에서 명령을 실행하는 경우에 유용합니다.
* **--ignore-platform-reqs:** `php`, `hhvm`, `lib-*`, `ext-*` 요구사항들을
  무시하고, 로컬 머신이 이들을 충족하지 않은 경우에도 강제로 설치합니다.

## dump-autoload (오토로드 덤프)

클래스맵 패키지 안의 새로운 클래스들 때문에 오토로더를 업데이트 할 필요가 있는
경우, install 또는 update를 통하지 않고 "dump-autoload" 사용 할 수 있습니다.

또한, 성능상의 이유로 classmap에 PSR-0/4 패키지를 변환한 최적화 된 오토로더를
덤프 할 수 있습니다. 많은 클래스를 가진 커다란 애플리케이션에서 오토로더는 매
요청 시간의 상당 부분을 차지 할 수 있습니다. 모든 클래스에 대해 클래스맵을
사용하는 것은 개발 중에 편리함이 적습니다. 하지만 이 옵션을 사용하면 편리함을
위한 PSR-0/4와 성능을 위한 클래스맵을 여전히 사용 할 수 있습니다.

### 옵션

* **--optimize (-o):** 빠른 오토로더를 얻기 위해 클래스맵으로 PSR-0/4
  오토로딩을 변환합니다. 이것을 특히 production을 위해 권장됩니다. 그러나
  실행하는데 시간이 조금 걸릴 수 있기 때문에 현재 기본값으로 수행하진 않습니다.
* **--no-dev:** autoload-dev 규칙을 금지합니다.

## clear-cache

컴포져 캐쉬 디렉토리들 안의 모든 컨텐츠를 삭제합니다.

## licenses

설치 된 모든 패키지의 이름, 버전, 라이센스를 보여줍니다. 기계가 읽을 수 있는
출력을 얻기 위해서는 `--format=json`을 사용합니다.

### 옵션

* **--no-dev:** 출력에 dev 의존성을 제거합니다.
* **--format:** 출력 포맷: text 또는 json (기본값: "text")

## run-script

수동으로 [스크립트](articles/scripts.md)를 실행하기 위해 스크립트 이름과 개발 
모드 해제할 경우 선택적으로 --no-dev를 주고 이 명령을 사용합니다.

## diagnose - 진단하기

만약 버그나 어떤 잘못된 부분을 찾은것 같다고 생각된다면 `diagnose`명령어를 통해서 여러 공통된 문제들에 대해서 자동으로 진단해 볼 수 있습니다.  


```sh
php composer.phar diagnose
```

(역자주 : diagnose 를 통해서 체크하는 부분들은 
- composer.json 의 유효성
- platform 셋팅
- git 셋팅
- http 접속상태
- github oauth 접속 가능여부
- disk 여유공간 점검
- 최신 composer 버전 사용여부 입니다 )

## archive - 아카이브(압축파일)

이 명령어는 패키지의 버전별 zip/tar 압축파일을 생성하는 용도로 사용됩니다. 또는 제외되거나 무시되는 파일 없이 프로젝트 전체를 압축파일로 하는데 사용될 수도 있습니다. 

```sh
php composer.phar archive vendor/package 2.0.21 --format=zip
```

### 아카이브 - 옵션

* **--format (-f):** 압축결과 파일의 포맷을 결정합니다: tar or zip (기본: "tar")
* **--dir:** 현재 디렉토리에 압축파일 쓰기 (기본: ".")
 
## help - 도움말

어떠한 명령어에 대한 더 많은 정보를 알고 싶다면 `help`를 입력하면 됩니다. 

```sh
php composer.phar help install
```

## Environment variables - 환경변수

컴포저에는 사용자가 설정을 변경할 수 있는 환경변수들이 존재합니다. 
가능하다면 환경변수는 `composer.json`의 `config` 섹션에 설정하기를 권장합니다. 이 환경변수들은  `composer.json`에 명시되어 있는 값들보다 우선하여 적용된다는 것에 주목하십시오.

### COMPOSER - 컴포저

`COMPOSER`의 환경변수를 셋팅함으로써, 다른 형태의 'composer.json'을 설정이 가능합니다.

예를 들어:

```sh
COMPOSER=composer-other.json php composer.phar install
```
와 같이도 설정가능합니다.

 
### COMPOSER_ROOT_VERSION - 컴포저 루트 버전

만약 VCS 정보로 부터 루트 패키지(root package)의 버전을 추측할 수 없고, `composer.json`에 존재하지 않는다면, 이 변수를 셋팅함으로써 루트 패키지의 버젼을 명시 할 수 있습니다. 


### COMPOSER_VENDOR_DIR - 컴포저 벤더 디렉토리

이 변수를 셋팅함으로써 컴포저가 `vendor`가 아닌 다른 디렉토리에 패키지들을 설치 할 수 있습니다. 

### COMPOSER_BIN_DIR - 컴포저 바이너리 디렉토리
 
이 변수를 셋팅함으로써 `vender/bin`의 `bin`([Vendor Binaries](articles/vendor-binaries.md)) 디렉토리를 다르게 지정할 수 있습니다.

### http_proxy or HTTP_PROXY - http 프록시

만약 HTTP proxy를 통해서 컴포저를 사용하고 싶다면 `http_proxy` 또는  `HTTP_PROXY` 환경변수를 설정하여 프록시를 통한 URL 을 사용할 수 있습니다. 많은 OS에서 이 옵션을 지원하고 있습니다. 

소문자로 표시된 `http_proxy` 또는 대소문자 두가지 모두 정의하는 것은 git이나 curl과 같이 `http_proxy` 소문자만 사용하는 툴들 때문이라도 권장 할만합니다. 그렇지 않다면 git proxy에서 사용하여 정의한 것처럼 사용할 수도 있습니다.

`git config --global http.proxy <proxy url>`.
 

### no_proxy
 
프록시를 사용하고 있는 중에 특정 도메인에서 프록시를 사용하지 않기를 원한다면 `no_proxy` 변수를 사용하면 됩니다. 프록시를 사용하지 않기를 워하는 도메인을 콤마로 구분하여 셋팅하면 됩니다. 

설정값은 도메인, IP 어드레스 또는 CIDR 형식의 IP 어드레스를 사용할 수 있습니다. 또한 포트에 따라서 필터링을 적용해 차단할 수도 있습니다.(예를 들어 `:80`과 같은)
만약 전체 HTTP 요청에서 프록시 사용을 하지 않기를(무시하기를) 원한다면 `*`과 같이 설정할 수도 있습니다.  

(역자주 : CIDR 이란 123.123.10.* 와 같이 표현될 수 있는 형식을 의미합니다.)

### HTTP_PROXY_REQUEST_FULLURI

프록시를 사용하지만 request_fullurl flag를 지원하지 않는다면 이 환경변수를 `false` 또는 `0`으로 설정하여 컴포저가 request_fulluri 옵션을 설정하는 것을 방지할 수 있습니다. 

### COMPOSER_HOME 컴포저 홈 디렉토리

`COMPOSER_HOME` 변수는 컴포져의 home 디렉토리를 변경할 수 있게 해줍니다. 이것은 숨겨져 있는데, 모든 프로젝트에서 공유 되는 전역(머신의 사용자) 디렉토리입니다.  

기본적으로 \*nix 에서는 `/home/<user>/.composer`, OSX 에서는 `/Users/<user>/.composer` 그리고 윈도우 에서는 `C:\Users\<user>\AppData\Roaming\Composer` 입니다.
 

#### COMPOSER_HOME/config.json

`COMPOSER_HOME`의 위치에 `config.json` 파일을 생성해 놓는다면 컴포저는 `install` 과 `update` 명령을 실행할때 당신의 프로젝트의 `composer.json` 파일과 이 파일을 합쳐서 명령을 수행합니다. 

이 파일은 당신의 프로젝트에서 [configuration](04-schema.md#config)와 [repositories](05-repositories.md)를 설정하는 것을 가능하게 합니다.

만약 글로벌 설정이 _local_ 설정과 다른경우 프로젝트의 `composer.json` 안에서 설정한 _local_ 값이 항상 우선하도록 동작합니다.

### COMPOSER_CACHE_DIR

`COMPOSER_CACHE_DIR` 변수는 [`cache-dir`](04-schema.md#config) 옵션을 설정하는 경우와 같이 컴포저의 캐시 디렉토리를 변경하는 설정입니다. 

기본적으로 \*nix 와 OSC 에서는 `$COMPOSER_HOME/cache` 그리고 윈도우 에서는 `C:\Users\<user>\AppData\Local\Composer` (또는  `%LOCALAPPDATA%/Composer`) 를 가리킵니다.
 

### COMPOSER_PROCESS_TIMEOUT 컴포저 대기 시간 제한 

이 환경변수는 예를 들어 (git 명령어와 같은) 명령어가 종료되기 까지의 대기 시간제한을 설정합니다. 기본값은 300초(5분)입니다.

### COMPOSER_DISCARD_CHANGES

이 환경변수는 [config option](04-schema.md#config)와 같은 변경사항 취소를 컨트롤 합니다.
 

### COMPOSER_NO_INTERACTION

이 설정을 1로 설정하면, 모든 명령에서 `--no-interaction`를 사용한 것과 같이 동작하게 됩니다. 주로 빌드 스크립트나 CI 상에서 사용됩니다. 
 

&larr; [Libraries](02-libraries.md)  |  [Schema](04-schema.md) &rarr;