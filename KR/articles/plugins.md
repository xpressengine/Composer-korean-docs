<!--
    tagline: Modify and extend Composer's functionality
-->

# Setting up and using plugins - 플러그인 설정및 사용법

## Synopsis - 시놉시스

여러분은 컴포저의 기능을 바꾸거나 확장하고 싶을 수 있습니다. 예를들어 대다수 사용자들이 적용지 않는 특별한 환경을 원하거나 대부분의 사용자들이 원치 않는 방식으로 컴포저를 이용해 뭔가를 하려할 수도 있습니다. 

이런 경우에는 플러그인을 만드는 것을 고려해 볼 수 있습니다.

## 플러그인 생성하기

플러그인은 추가 패키지에 의존성이 있을 수 있는 정규 컴포저 패키지의 일부로 코드가 탑재되어 있습니다. 

### 플러그인 패키지

플러그인 패키지 파일은 다른 패키지 파일과 같지만 다음과 같은 필수요건이 있습니다. 

1. [type][1] 속성은 반드시 `composer-plugin` 이어야 합니다.

2. [extra][2] 속성에는  플러그인의 클래스 (네임스페이스를 포함해서) 이름에대한 정보를 담은 `class` 요소가 반드시 포함되어야 합니다. 만약 패키지가 다수의 플러그인을 포함하는 구조라면 클래스 네임은 배열의 형태가 될 수 있습니다.  추가로 여러분의 플러그인과 호환되는 컴포저 API 버전에 대한 정보가 있는`composer-plugin-api`라는 특별한 패키지 require가 필요합니다. 현재 컴포저 플러그인 API 버전은 1.0.0 입니다.

다음 예제를 확인하십시오. 

```json
{
    "name": "my/plugin-package",
    "type": "composer-plugin",
    "require": {
        "composer-plugin-api": "1.0.0"
    }
}
```

### Plugin Class - 플러그인 클래스 

모든 플러그인들은 [`Composer\Plugin\PluginInterface`][3] 을 구현한 클래스가 있어야 합니다.
플러그인이 로딩된 후에 `activate()` 메소드가 [`Composer\Composer`][4] 와 [`Composer\IO\IOInterface`][5] 인스턴스를 인자로 넘겨 받아서 호출됩니다. 이 두개의 객체를 활용하여 모든 설정은 모든 내부 오브젝트와 상태를 원하는 대로 조절할 수 있게 됩니다. 

예제:
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

## Event Handler - 이벤트 핸들러

추가적으로 플러그인이 로딩될 때 `EventDispatcher`로 자동으로 등록되기 위해서 [`Composer\EventDispatcher\EventSubscriberInterface`][6]를 구현할 수 있습니다. 

플러그인에서 가능한 이벤트들은 다음과 같습니다. 

* **COMMAND**,   COMMAND는 플러그인을 로드하는 모든 명령들의 시작 이벤트입니다.  이는 프로그램의 입출력 오브젝트들을 액세스 할 수 있게 해줍니다.
* **PRE_FILE_DOWNLOAD**,  PRE_FILE_DOWNLOAD는 파일이 다운로드 되기전 발생하는 이벤트입니다. 다운로드받을 URL에서 파일을 다운받기전에`RemoteFilesystem`오브젝트를 조절하는데 사용 할 수 있습니다.
 
> 플러그인은 또한 [script events][7]를 참고할 수 있습니다. 

예제:

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

## Using Plugins - 플러그인 사용하기

플러그인 패키지가 설치되고 현재 프로젝트의 목록에서 확인되는 경우 자동으로 컴포저가 시작될 때 바로 로드됩니다. 추가적으로  컴포저 전역 명령어(global command)를 사용하여 `COMPOSER_HOME` 디렉토리에 설치된 모든 플러그인 패키지들은 로컬 프로젝트의 플러그인이 로딩되기 전에 로드됩니다. 

> `--no-plugins` 컴포저 명령 옵션으로 모든 설치된 명령들을 비활성시킬 수 있습니다. 
> 이는 특히 설치나 업데이트를 할 때 플러그인들로 발생하는 에러를 방지하는데 유용합니다.

[1]: ../04-schema.md#type
[2]: ../04-schema.md#extra
[3]: https://github.com/composer/composer/blob/master/src/Composer/Plugin/PluginInterface.php
[4]: https://github.com/composer/composer/blob/master/src/Composer/Composer.php
[5]: https://github.com/composer/composer/blob/master/src/Composer/IO/IOInterface.php
[6]: https://github.com/composer/composer/blob/master/src/Composer/EventDispatcher/EventSubscriberInterface.php
[7]: ./scripts.md#event-names