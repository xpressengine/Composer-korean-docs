<!--
    tagline: Modify and extend Composer's functionality
-->

# Setting up and using plugins
플러그인 설정및 사용법

## Synopsis

You may wish to alter or expand Composer's functionality with your own. 
컴포저의 기능을 바꾸거나 확장하고싶을 수 있습니다.
For example if your environment poses special requirements on the behaviour of
Composer which do not apply to the majority of its users or if you wish to
accomplish something with composer in a way that is not desired by most users.
예를들어 대다수 사용자들이 적용하기 원치 않는 특별한 환경을 원하거나 대부분의 사용자들이 원치 않는 
방식으로 컴포저를 이용해 뭔가를 하려할 수 있다. 

In these cases you could consider creating a plugin to handle your
specific logic.
이런 경우에 플러그인을 만들어 볼 수 있다.

## Creating a Plugin

A plugin is a regular composer package which ships its code as part of the
package and may also depend on further packages.
정규 컴포저 패키지에 플러그인은 패키지의 일부로 코드가 탑재되있고 추가 패키지에 의존성이 있을 수 있다.

### Plugin Package

The package file is the same as any other package file but with the following
requirements:
그 (플러그인) 패키지 파일은 다른 패키지 파일과 같지만 다음과 같은 요건이 있다.

1. the [type][1] attribute must be `composer-plugin`.
type 속성은 `composer-plugin` 이다.
2. the [extra][2] attribute must contain an element `class` defining the
   class name of the plugin (including namespace). If a package contains
   multiple plugins this can be array of class names.
extra 속성에는  플러그인의 클래스 (네임스페이스를 포함해서) 이름에대한 정보를 담은 `class` 요소가 반드시 있다. 
Additionally you must require the special package called `composer-plugin-api`
to define which composer API versions your plugin is compatible with. 
추가로 너의 플러그인과 호환되는 컴포저 API 버전에 대한 정보가 있는`composer-plugin-api`라는 특별한 패키지가 필요하다.
The current composer plugin API version is 1.0.0. 
현재 컴포저 플러그인 API 버전은 1.0.0 이다.

For example

```json
{
    "name": "my/plugin-package",
    "type": "composer-plugin",
    "require": {
        "composer-plugin-api": "1.0.0"
    }
}
```

### Plugin Class

Every plugin has to supply a class which implements the
[`Composer\Plugin\PluginInterface`][3]. 
플러그인들은 `Composer\Plugin\PluginInterface`을 구현한 클래스가 있어야한다. 
The `activate()` method of the plugin is called after the plugin is loaded and receives an instance of
[`Composer\Composer`][4] as well as an instance of [`Composer\IO\IOInterface`][5]. 
플러그인이 로드되고 `activate()`메소드가   `Composer\IO\IOInterface`와 `Composer\Composer`의 인스턴스를 넘겨받는다.
Using these two objects all configuration can
be read and all internal objects and state can be manipulated as desired.
이들 두개의 오브젝트들이 모든 설정에서 읽고 모든 내부 오브젝트와 상태를 원하는대로 조절 할 수 있다.

Example:

```php
<?php

namespace phpDocumentor\Composer;

use Composer\Composer;
use Composer\IO\IOInterface;
use Composer\Plugin\PluginInterface;

class TemplateInstallerPlugin implements PluginInterface
{
    public function activate(Composer $composer, IOInterface $io)
    {
        $installer = new TemplateInstaller($io, $composer);
        $composer->getInstallationManager()->addInstaller($installer);
    }
}
```

## Event Handler

Furthermore plugins may implement the
[`Composer\EventDispatcher\EventSubscriberInterface`][6] in order to have its
event handlers automatically registered with the `EventDispatcher` when the
plugin is loaded. 추가로 플러그인이 로드될때 `EventDispatcher`로 자동으로 등록하기 위해서 `Composer\EventDispatcher\EventSubscriberInterface`를 구현한다.

The events available for plugins are:
플러그인에서 가능한 이벤트들은 다음과 같다. 

* **COMMAND**, is called at the beginning of all commands that load plugins.
  COMMAND는 플러그인을 로드하는 모든 명령들의 시작 (이벤트)이다.
  It provides you with access to the input and output objects of the program.
  이는 프로그램의 입출력 오브젝트들을 액세스 할 수 있게 해준다.
* **PRE_FILE_DOWNLOAD**, is triggered before files are downloaded and allows
  you to manipulate the `RemoteFilesystem` object prior to downloading files
  based on the URL to be downloaded.
  PRE_FILE_DOWNLOAD는 파일이 다운로드 되기전 발생하는 이벤트이다. 다운로드받을 URL에서 다운받기전에`RemoteFilesystem`오브젝트를 조절하는데 사용 할 수 있다.

> A plugin can also subscribe to [script events][7].

Example:

```php
<?php

namespace Naderman\Composer\AWS;

use Composer\Composer;
use Composer\EventDispatcher\EventSubscriberInterface;
use Composer\IO\IOInterface;
use Composer\Plugin\PluginInterface;
use Composer\Plugin\PluginEvents;
use Composer\Plugin\PreFileDownloadEvent;

class AwsPlugin implements PluginInterface, EventSubscriberInterface
{
    protected $composer;
    protected $io;

    public function activate(Composer $composer, IOInterface $io)
    {
        $this->composer = $composer;
        $this->io = $io;
    }

    public static function getSubscribedEvents()
    {
        return array(
            PluginEvents::PRE_FILE_DOWNLOAD => array(
                array('onPreFileDownload', 0)
            ),
        );
    }

    public function onPreFileDownload(PreFileDownloadEvent $event)
    {
        $protocol = parse_url($event->getProcessedUrl(), PHP_URL_SCHEME);

        if ($protocol === 's3') {
            $awsClient = new AwsClient($this->io, $this->composer->getConfig());
            $s3RemoteFilesystem = new S3RemoteFilesystem($this->io, $event->getRemoteFilesystem()->getOptions(), $awsClient);
            $event->setRemoteFilesystem($s3RemoteFilesystem);
        }
    }
}
```

## Using Plugins

Plugin packages are automatically loaded as soon as they are installed and will
be loaded when composer starts up if they are found in the current project's
list of installed packages. 
플러그인 패키지들은 설치하면 현재 프로젝트 목록의 설치된 패키지를 발견한 컴포저가 시작하면 자동으로 로드된다. 
Additionally all plugin packages installed in the`COMPOSER_HOME` directory using the composer 
global command are loaded before local project plugins are loaded.
컴포저 전역 명령(global command)을 사용하는 `COMPOSER_HOME` 디렉토리에 설치된 모든 플러그인 패키지들은 로컬 프로젝트 플러그인들이
로드 되기 전에 로드 된다.

> You may pass the `--no-plugins` option to composer commands to disable all
> installed commands. 
> `--no-plugins` 컴포저 명령 옵션으로 모든 설치된 명령들을 비활성시킬 수 있다. 
> This may be particularly helpful if any of the plugins
> causes errors and you wish to update or uninstall it.
> 이는 특히 플러그인들로 생긴 에러로 업데이트나 제거 할 때 유용하다.

[1]: ../04-schema.md#type
[2]: ../04-schema.md#extra
[3]: https://github.com/composer/composer/blob/master/src/Composer/Plugin/PluginInterface.php
[4]: https://github.com/composer/composer/blob/master/src/Composer/Composer.php
[5]: https://github.com/composer/composer/blob/master/src/Composer/IO/IOInterface.php
[6]: https://github.com/composer/composer/blob/master/src/Composer/EventDispatcher/EventSubscriberInterface.php
[7]: ./scripts.md#event-names