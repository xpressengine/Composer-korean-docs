<!--
    tagline: Script are callbacks that are called before/after installing packages
-->

# Scripts

## What is a script?

## 스크립트(script)란?

컴포저(Composer)에서 이야기 하는 스크립트(script)는 PHP의 콜백(정적 메서드로도 정의할 수 있는) 혹은 커맨드 라인 환경에서 실행가능한 명령어를 이야기 합니다. 스크립트는 사용자가 만든 패키지의 맞춤형 코드 혹은 컴포저 실행 과정 중간에 발생하는 특정 명령어를 실행하는데 굉장히 유용합니다.

A script, in Composer's terms, can either be a PHP callback (defined as a
static method) or any command-line executable command. Scripts are useful
for executing a package's custom code or package-specific commands during
the Composer execution process.

> **노트:** 스크립트는 루트 패키지의 `composer.json`에서만 실행가능합니다. 만약 루트 패키지의 의존성 패키지에 스크립트가 정의되어 있다면, 컴포저는 해당 스크립트를 실행하지 않습니다.

> **Note:** Only scripts defined in the root package's `composer.json` are
> executed. If a dependency of the root package specifies its own scripts,
> Composer does not execute those additional scripts.

## 사용가능한 이벤트들

## Event names

컴포저는 실행과정 중에 다음 정의된 이벤트들을 실행합니다:

Composer fires the following named events during its execution process:

- **pre-install-cmd**: `install` 커맨드가 실행되기 전에 발생합니다.
- **post-install-cmd**: `install` 커맨드가 실행된 후에 발생합니다.
- **pre-update-cmd**: `update` 커맨드가 실행되기 전에 발생합니다.
- **post-update-cmd**: `update` 커맨드가 실행 된 후에 발생합니다.
- **pre-status-cmd**: `status` 커맨드가 실행되기 전에 발생합니다.
- **post-status-cmd**: `status` 커맨드 실행 된 후에 발생합니다.
- **pre-dependencies-solving**: 의존성이 해결되기 전에 발생합니다.
- **post-dependencies-solving**: 의존성이 해결 된 후에 발생합니다.
- **pre-package-install**: 패키지가 인스톨 되기 전에 발생합니다.
- **post-package-install**: 패키지가 인스톨 된 후에 발생합니다.
- **pre-package-update**: 패키지가 업데이트 되기 전에 발생합니다.
- **post-package-update**: 패키지가 업데이트 된 후에 발생합니다.
- **pre-package-uninstall**: 패키지가 삭제(uninstall) 되기 전에 발생합니다.
- **post-package-uninstall**: 패키지가 삭제(uninstall) 된 후에 발생합니다.
- **pre-autoload-dump**: 오토로더가 덤프되기 전에 발생합니다. 이는 `install`/`update` 즉 `dump-autoload`를 사용하는 커맨드를 의미합니다.
- **post-autoload-dump**: 오토로더가 덤프된 후에 발생합니다. 이는 `install`/`update` 즉 `dump-autoload`를 사용하는 커맨드를 의미합니다.
- **post-root-package-install**: `create-project` 커맨드가 되는 동안, 루트 패키지가 인스톨 되고 난 후에 발생합니다.
- **post-create-project-cmd**: `create-project` 커맨드가 실행 된 후에 발생합니다.
- **pre-archive-cmd**: `archive` 커맨드가 실행되기 전에 발생합니다.
- **post-archive-cmd**: `archive` 커맨드가 실행된 후에 발생합니다.


- **pre-install-cmd**: occurs before the `install` command is executed.
- **post-install-cmd**: occurs after the `install` command is executed.
- **pre-update-cmd**: occurs before the `update` command is executed.
- **post-update-cmd**: occurs after the `update` command is executed.
- **pre-status-cmd**: occurs before the `status` command is executed.
- **post-status-cmd**: occurs after the `status` command is executed.
- **pre-dependencies-solving**: occurs before the dependencies are resolved.
- **post-dependencies-solving**: occurs after the dependencies are resolved.
- **pre-package-install**: occurs before a package is installed.
- **post-package-install**: occurs after a package is installed.
- **pre-package-update**: occurs before a package is updated.
- **post-package-update**: occurs after a package is updated.
- **pre-package-uninstall**: occurs before a package has been uninstalled.
- **post-package-uninstall**: occurs after a package has been uninstalled.
- **pre-autoload-dump**: occurs before the autoloader is dumped, either
  during `install`/`update`, or via the `dump-autoload` command.
- **post-autoload-dump**: occurs after the autoloader is dumped, either
  during `install`/`update`, or via the `dump-autoload` command.
- **post-root-package-install**: occurs after the root package has been
  installed, during the `create-project` command.
- **post-create-project-cmd**: occurs after the `create-project` command is
  executed.
- **pre-archive-cmd**: occurs before the `archive` command is executed.
- **post-archive-cmd**: occurs after the `archive` command is executed.

> **노트:** 컴포저는 의존하고 있는 패키지들이 `install`, `update` 전에 하는 상태에 대해서 어떠한 가정도 할 수 없습니다. 그래서 `pre-update-cmd` 혹은, `pre-install-cmd` 이벤트 훅(hook) 안에 어떤 의존성 패키지들을 필요로 하는 지에 대해 스크립트를 작성하지 않아도 됩니다. 만약 당신이 `intall`, `update`이전에 스크립트를 실행해야 한다면 당신의 루트 패키지 안에 있는 그들 각 패키지 내부에 있는지 확인하십시오.

> **Note:** Composer makes no assumptions about the state of your dependencies
> prior to `install` or `update`. Therefore, you should not specify scripts
> that require Composer-managed dependencies in the `pre-update-cmd` or
> `pre-install-cmd` event hooks. If you need to execute scripts prior to
> `install` or `update` please make sure they are self-contained within your
> root package.

## 스크립트 정의하기

## Defining scripts

`composer.json`에 `"scripts"`라는 속성을 가질 수 있습니다. 이는 이벤트와 그 이벤트에 대응하는 스크립트의 쌍(pair)을 포함하고 있습니다.  이벤트의 스크립트는 문자열(하나의 스크립트를 위한) 또는 배열(하나 혹은 여러개의 스크립트를 위한)의 두가지 형태로 정의가능합니다.

The root JSON object in `composer.json` should have a property called
`"scripts"`, which contains pairs of named events and each event's
corresponding scripts. An event's scripts can be defined as either as a string
(only for a single script) or an array (for single or multiple scripts.)

주어진 이벤트에 대해서:

For any given event:

- 스크립트 이벤트가 발생할 때 정의된 순서대로 실행됩니다.
- 스크립트를 배열로 사용할 때, PHP 콜백과 CLI환경에서 실행가능한 커맨드 둘다 동시에 포함할 수 있습니다.
- 콜백을 포함한 PHP클래스는 반드시 컴포저에서 오토로드 할 수 있어야합니다.

- Scripts execute in the order defined when their corresponding event is fired.
- An array of scripts wired to a single event can contain both PHP callbacks
and command-line executable commands.
- PHP classes containing defined callbacks must be autoloadable via Composer's
autoload functionality.

스크립트 정의 예제:

Script definition example:

```json
{
    "scripts": {
        "post-update-cmd": "MyVendor\\MyClass::postUpdate",
        "post-package-install": [
            "MyVendor\\MyClass::postPackageInstall"
        ],
        "post-install-cmd": [
            "MyVendor\\MyClass::warmCache",
            "phpunit -c app/"
        ],
        "post-create-project-cmd" : [
            "php -r \"copy('config/local-example.php', 'config/local.php');\""
        ]
    }
}
```

위의 예제에서 사용한 `MyVendor\MyClass`라는 클래스는 다음의 PHP를 실행할 것입니다:

Using the previous definition example, here's the class `MyVendor\MyClass`
that might be used to execute the PHP callbacks:

```php
<?php

namespace MyVendor;

use Composer\Script\Event;

class MyClass
{
    public static function postUpdate(Event $event)
    {
        $composer = $event->getComposer();
        // do stuff
    }

    public static function postPackageInstall(Event $event)
    {
        $installedPackage = $event->getOperation()->getPackage();
        // do stuff
    }

    public static function warmCache(Event $event)
    {
        // make cache toasty
    }
}
```

이벤트가 발생 했을 때, 컴포저의 내부 이벤트 핸들러는 `Composer\Script\Event` 객체를 받습니다. 그리고 이 객체는 PHP 콜백의 첫번째 매개변수로 사용가능합니다. 이 `Event` 다음 접근자를 통해 다른 객체에 접근할 수 있습니다:

When an event is fired, Composer's internal event handler receives a
`Composer\Script\Event` object, which is passed as the first argument to your
PHP callback. This `Event` object has getters for other contextual objects:

- `getComposer()`: 현재 `Composer\Composer` 객체를 반환합니다.
- `getName()`: 발생한 이벤트의 이름을 문자열로 반환합니다.
- `getIO()`: returns the current input/output stream which implements
콘솔에 쓸 수 있는 `Composer\IO\IOInterface` 인터페이스를 구현한 현재의 인, 아웃풋 스트림을 반환합니다.

- `getComposer()`: returns the current instance of `Composer\Composer`
- `getName()`: returns the name of the event being fired as a string
- `getIO()`: returns the current input/output stream which implements
`Composer\IO\IOInterface` for writing to the console

## 스크립트 직접 실행

## Running scripts manually

스크립트를 직접 실행하고 싶다면 다음의 명령어를 이용하면 됩니다:

If you would like to run the scripts for an event manually, the syntax is:

```sh
composer run-script [--dev] [--no-dev] script
```

예를들어 `composer run-script post-install-cmd`은 **post-install-cmd**에 정의된 스크립트들을 실행할 것입니다.

For example `composer run-script post-install-cmd` will run any
**post-install-cmd** scripts that have been defined.

또 `--`를 추가하여 매개변수들을 추가할 수 있습니다. 예를 들어,
`composer run-script post-install-cmd -- --check`는 `--check`를 스크립트 핸들러로 보냅니다. 이러한 매개변수는 CLI 매개변수로서 사용할 수 있고, PHP 핸들러에서 `$event->getArguments()`를 통해 배열로서 불러올 수 있습니다.

You can also give additional arguments to the script handler by appending `--`
followed by the handler arguments. e.g.
`composer run-script post-install-cmd -- --check` will pass`--check` along to
the script handler. Those arguments are received as CLI arg by CLI handlers,
and can be retrieved as an array via `$event->getArguments()` by PHP handlers.

## 사용자 정의 커맨드

## Writing custom commands

위에 명시된 사용할 수 있는 이벤트 중에 원하는 것이 없다면 사용자 정의 스크립트를 추가할 수 있습니다. 그리고 이는 run-script를 통해서 사용가능하고, 컴포저의 자연스러운 커맨드 처럼 사용할 수 있습니다. 예를 들어 아래와 같이 단순한 내용을 정의하였다면 `composer test`라는 명령어를 통해 사용가능합니다:

If you add custom scripts that do not fit one of the predefined event name
above, you can either run them with run-script or also run them as native
Composer commands. For example the handler defined below is executable by
simply running `composer test`:

```json
{
    "scripts": {
        "test": "phpunit"
    }
}
```

> **노트:** 컴포저의 [bin-dir](articles/vendor-binaries.md#vendor-binaries를-vendor/bin-이외에-다른-곳에 설치가-가능한가요-)은 PATH의 최상위를 입력할 수 있는데, 이는 의존하고 있는 패키지들의 실행파일들을 쉽게 CLI 커맨드로서 입력할 수 있게 합니다.
> 예를들어 PHPUnit을 의존하고 있고, `bin-dir`을 `scripts`라는 값으로 설정을 해놓았다면 스크립트에서 `scripts/phpunit`라는 값을 통해 접근이 가능합니다.

> **Note:** Composer's bin-dir is pushed on top of the PATH so that binaries
> of dependencies are easily accessible as CLI commands when writing scripts.
