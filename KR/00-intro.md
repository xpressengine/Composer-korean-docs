# 소개하기

컴포저는 PHP 에서 의존성을 관리하기 위한 툴입니다. 컴포저는 프로젝트를 위한 라이브러리들을 선언하고 의존성이 있는 라이브러리들을 설치할 수 있게 해줍니다. 

## 의존성 관리

컴포저는 패키지 관리자가 아닙니다. 컴포저는 "패키지" 또는 라이브러리를 처리하긴 하지만 프로젝트 단위로 디렉토리에 설치하는 것을 책임집니다. (예를들어 `vendor` 디렉토리) 기본적으로 컴포저는 어떠한 것도 글로벌로 설치하지 않습니다. 따라서 컴포저는 그 자체로 의존성 관리자라고 할 수 있습니다. 

컴포저는 node.js 의 [npm](http://npmjs.org/)과 ruby의 [bundler](http://gembundler.com/)에 영감을 받았습니다. 이런 아이디어는 그다지 새롭지 않습니다만 이전까지 PHP 에서는 이러한 툴이 존재하지 않았습니다. 

컴포저가 할 수 있는 일들은 다음과 같습니다:

a) 여러 라이브러리에 의존하는 프로젝트를 가지고 있습니다.

b) 이러한 라이브러리들은 또다른 라이브러리들을 필요로 합니다. 

c) 이때 여러분이 필요로 하는 의존 관계의 라이브러리들을 지정해 줄수 있습니다. 

d) 컴포저는 패키지가 설치되어야하는 버전을 찾아, 알맞은 버전의 패키지들과 의존 패키지들을 설치합니다 (프로젝트 디렉토리로 다운로드 한다는 의미입니다).

## 의존성 선언

새로운 프로젝트를 생성하고 로깅을 위한 라이브러리가 필요하다고 생각해 봅시다. 이 때 [monolog](https://github.com/Seldaek/monolog)를 사용하기로 했다고 합시다. 이 라이브러리를 프로젝트에 추가하기 위해서는 다음과 같이 `composer.json`을 생성하고 여기 에 프로젝트의 의존성을 선언하면 됩니다. 

```json
{
    "require": {
        "monolog/monolog": "1.2.*"
    }
}
```

이렇게 프로젝트에서 `1.2`로 시작하는 `monolog/monolog` 패키지가 필요하다는 것을 간단하게 표시할 수 있습니다. 

## 시스템 요구사항

컴포저는 PHP 5.3.2+ 이상에서 동작합니다. 몇가지 민감한 PHP 설정을 필요로 하지만 인스톨러를 사용하면 이러한 비호환성을 체크하고 경고를 확인할 수 있습니다. 

To install packages from sources instead of simple zip archives, you will need
git, svn or hg depending on how the package is version-controlled.

Composer is multi-platform and we strive to make it run equally well on Windows,
Linux and OSX.

## 설치방법 - Linux / Unix / OSX

### 컴포저실행파일을 다운로드 하는 방법

간단하게 말하자면 컴포저를 인스톨 하는 데는 두가지 방법이 있습니다. 로컬 프로젝트에 인스톨 하는 방법과 시스템에 설치하여 실행가능하게 하는 글로벌 설치가 있습니다. 

#### 로컬 설치

로컬 설치를 하기 위해서는 프로젝트 디렉토리에서 다음과 같이 인스톨러를 실행하면 됩니다. :

```sh
curl -sS https://getcomposer.org/installer | php
```

> **주의:** 만약 위의 방법이 실패한다면 `php`를 앞에 붙여 인스톨러를 다운로드 하는 방법을 시도해 볼 수 있습니다. 

```sh
php -r "readfile('https://getcomposer.org/installer');" | php
```

인스톨러는 몇가지의 PHP 셋팅을 확인한 다음에 `composer.phar` 파일을 현재 디렉토리에 다운로드 합니다. 이 파일이 바로 컴포저 실행파일입니다. 이 파일은 커맨드 라인에서 실행할 수 있는 PHP 아카이브 포맷인 PHAR 로 되어 있습니다. 

만약 설치하고자 하는 디렉토리가 다르다면 `--install-dir` 옵션을 사용하여 원하는 설치 디렉토리를 설정할 수도 있습니다. (경로는 절대경로와 상대경로로 지정합니다.)

```sh
curl -sS https://getcomposer.org/installer | php -- --install-dir=bin
```

#### 글로벌 설치

설치된 컴포저 파일은 그 어디라도 쉽게 옮길 수 있습니다. 만약 파일을 `PATH`에 설정된 곳에 넣는다면 어디서라도 실행이 가능해집니다. 유닉스 시스템이라면 `php`를 붙이지 않더라도 바로 실행할 수 있습니다. 

다음 스크립트를 실행시키면 시스템 어디서라도 `composer` 라는 명령어를 통해서 실행할 수 있게 됩니다. 

```sh
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer
```

> **주의:** `mv` 명령어를 실행하는데는 권한이 필요하다면 sudo 와 함께 실행하시기 바랍니다. 

이제 `php composer.phar` 대신 `composer` 로 간단하게 컴포저를 구동 할 수 있습니다. 

## 윈도우에서의 설치

### 인스톨러를 사용한 방법

이 방법은 윈도우에서 컴포저를 설치하는 가장 손쉬운 방법입니다. 

다음의 파일을 다운 받고 실행합니다. [Composer-Setup.exe](https://getcomposer.org/Composer-Setup.exe),
이 인스톨러는 최신 버전의 컴포저를 설치하고 PATH를 지정하여 커맨드라인에서 언제라도 `composer`명령어를 입력해 프로그램이 실행될 수 있게 해줍니다.

> **주의:** 설치후에는 현재 터미널을 닫고, 새로운 터미널에서 명령어를 테스트해 보시길 바랍니다:
> 왜냐하면 PATH 설정은 터미널이 시작할 때만 새롭게 감지하기 때문입니다.

### 수동 설치

디렉토리를 `PATH`에 설정된 디렉토리로 변경하고 다음의 스크립트를 실행해 composer.phar 을 다운로드 합니다.

```sh
C:\Users\username>cd C:\bin
C:\bin>php -r "readfile('https://getcomposer.org/installer');" | php
```

> **주의:** 만약 readfile 스크립트가 실패한다면 `http` URL 을 이용하거나, php.ini 파일에서 php_openssl.dll 를 활성화 하십시오. 

그다음에 `composer.phar` 파일 옆에 `composer.bat` 파일을 만듭니다:

```sh
C:\bin>echo @php "%~dp0composer.phar" %*>composer.bat
```

현재의 터미널을 종료하고, 새로운 터미널에서 다음의 명령어를 테스트 해봅니다.


```sh
C:\Users\username>composer -V
Composer version 27d8904
```

## 컴포저 사용하기

이제 프로젝트의 의존성 관리를 위해 컴포저를 통해 패키지 설치를 해 보겠습니다. 현재 디렉토리에 `composer.json` 파일을 가지고 있지 않다면 먼저 
[기본사용법](01-basic-usage.md) 챕터를 확인하시기 바랍니다.

의존성 패키지들을 다운로드 하기 위해서는 `install` 명령어를 사용합니다:

```sh
php composer.phar install
```

글로벌 설치를 진행하였고, phar 확장자를 가지고 있지 않다면 다음처럼 해도 됩니다. 

```sh
composer install
```

[의존성 선언](#declaring-dependencies)에서와 같이 설정되어 있다면, 이 명령어를 통해서 monolog 를 다운로드 하여 `vendor/monolog/monolog` 라는 디렉토리를 생성하게 됩니다.  

## 오토로딩

라이브러리를 다운로드 하는 것과 함께 컴포저는 다운로드 된 어떤 라이브러리의 모든 클래스를 자동으로 불러 올 수 있도록 하는 오토로딩 파일을 준비하게 됩니다. 오토로딩을 사용하기 위해서는 다음처럼 코드의 부트스트랩 과정을 거쳐야 합니다. 

```php
require 'vendor/autoload.php';
```

이제! monolog 를 바로 사용할 수 있습니다.! 컴포저에 대한 더 자세한 내용은 "기본 사용법" 챕터를 확인하시기 바랍니다. 

[기본 사용법](01-basic-usage.md) &rarr;