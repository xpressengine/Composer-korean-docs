<!--
    tagline: Solving problems
-->
# Troubleshooting - 문제 해결

이 섹션은 컴포저를 사용하는 중에 나타날 수 있는 공통된 문제들을 어떻게 해결하는지에 대한 목록입니다.  

## General - 일반적인 해결방법

1. 누군가에게 질문하기 전에 일반적인 문제인지 확인하기위해 [`composer diagnose`](../03-cli.md#diagnose)를 실행하세요. (실행 후) 모든 항목이 체크 되었다면(오류가 있다고 나오지 않았다면) 다음 단계로 넘어가세요. 

2. 컴포저를 사용하면서 어떠한 문제를 겪을 때에는 **최신버젼을 사용** 하길 권장합니다. 자세한 사항은 [self-update](../03-cli.md#self-update)에서 확인하세요. 

3. `curl -sS https://getcomposer.org/installer | php -- --check`라는 명령어를 통해서 인스톨러 체크를 실행하여 설치에 문제가 없는지 확인해야 합니다. 

4. 문제 해결을 하는 중, 벤더의 설치된 항목이나 `composer.lock`의 엔트리에서의 발생하는 충돌문제를 배제하기 위해서는 `rm -rf vendor && composer update -v` 를 통해서 **당신이 작성한 `composer.json`에 있는 벤더들을 올바르게 (재)설치**해서 해결해야 합니다.

5. `composer clear-cache`를 실행 시켜서 Composer의 케시 데이터를 비우도록 합니다. 

## Package not found : 패키지를 찾을 수 없을 경우

1. `composer.json`에 **오타가 있는지**, 혹은 저장소(repository)의 branch 나 tag 이름이 올바른지 꼼꼼히 확인하세요.

2. **[minimum-stability](../04-schema.md#minimum-stability)를 올바르게 설정했는지** 확인해야 합니다. 문제가 발생하지 않기 위해서는, "dev"에 있는 `minimum-stability`를 설정하세요. 

3. **[Packagist](https://packagist.org/)에 존재하지 않는** 페키지들은 항상 **루트페키지 안에서 정의되어야** 합니다.(해당 페키지는 모든 벤더에 의존됩니다.) 

4. 당신의 프로젝트 저장소의 tag 와 branch들 모두 **같은 벤더 이름과 패키지 이름**을 사용하세요, 특히 `replace`를 사용하거나 서드파티의 패키지를 포크해서 유지보수 할 경우도 포함됩니다.

5. 만약 최근에 출시된 버전의 패키지로 바로 업데이트를 한다면, 패키지스트의 패키지를 컴포져에서 확인하는데 최대 1분의 시간이 걸린다는 것을 유념하고 있어야 합니다.

## Package not found on travis-ci.org : travis-ci.org에서 패키지를 찾을 수 없는 경우

1. 우선 위의 ["Package not found"](#package-not-found)의 항목을 확인하세요.

2. 만약 테스트 되어진 패키지가 해당 패키지의 의존 패키지들 중 하나의 의존성일 경우(["순환 종속성"](http://en.wikipedia.org/wiki/Circular_dependency):서로가 서로를 의존하는 관계), 문제가 되는 것은 아마도 컴포저가 패키지의 버전을 정확하게 찾아내지 못하게 되는 부분입니다. 이것이 git clone이라면, 보통 올바르거나 컴포저가 현재 버전을 잘 찾아낼 것이지만, travis는 얕은 복사를 하기 때문에 보통 pull request나 branch들을 구성하는 작업의 테스트를 진행할 경우 실패 할 수 있습니다. 

 가장 좋은 방법은 여려분이 COMPOSER_ROOT_VERSION라는 환경변수를 통해 버전을 정의하는 것입니다. 여러분은 그런 정보들을 `dev-master`에서 설정할 수 있는데, 예를 들자면 루트 패키지의 버전을 `dev-master`로 정의할 수 있습니다. 
    
 사용법 : `before_script: COMPOSER_ROOT_VERSION=dev-master composer install` 컴포저를 부르기 위한 변수를 보냅니다. 

## Need to override a package version : 패키지 버전을 덮어 씌우는 것이 필요할 경우 

예를 들면 여러분의 프로젝트가 차래로 패키지 B의 특별한 버전을 의존하는(0.1 이라 하자.) 패키지 A에 의존하고 당신은 다른 버전의 패키지 B가 필요하다하면 - 버전 0.11과 같은. 

당신은 별칭 기능을 이용하여 버전 0.11을 0.1로 고칠 수 있습니다. 

composer.json:

```json
{
    "require": {
        "A": "0.2",
        "B": "0.11 as 0.1"
    }
}
```
[aliases](aliases.md)에서 더 자세한 내용을 확인하세요. 

## Memory limit errors : 메모리 제한 오류의 경우

만약 컴포저가 어떠한 명령의 실행중에서 메모리 에러를 보여준다면: 

`PHP Fatal error:  Allowed memory size of XXXXXX bytes exhausted <...>`

PHP의 `memory_limit` 부분을 올려주세요.

> **필기:** 컴포저에서는 자체적으로 `memory_limit`를 `512M`만큼 올려줍니다.
> 만약에 컴포저를 사용하는 도중에 메모리 문제가 발생한다면, [문제 보고 만들기](https://github.com/composer/composer/issues)를 만들어주셔야 우리가 그 문제를 자세히 확인할 수 있습니다. 

현재 `memory_limit` 설정값을 확인하기 위해서는, 아래와 같이 실행하세요: 

```sh
php -r "echo ini_get('memory_limit').PHP_EOL;"
```

`php.ini` 파일을 수정하여 메모리 제한 값을 올리는 일을 하세요. (ex. Debian계열의 시스템에서는 `/etc/php5/cli/php.ini` 입니다.): 

```ini
; Use -1 for unlimited or define an explicit value like 512M
memory_limit = -1
```

혹은 커맨드 라인 문법으로 제한을 올릴 수 있습니다: 

```sh
php -d memory_limit=-1 composer.phar <...>
```


## "The system cannot find the path specified" (Windows) : 시스템이 명시된 경로를 찾을 수 없다고 하는 경우. (Windows만 해당.)

1. regedit을 실행합니다. (시작 -> 실행 : regedit 입력) 
2. `HKEY_LOCAL_MACHINE\Software\Microsoft\Command Processor` 혹은 `HKEY_LOCAL_MACHINE\Software\Wow6432Node\Microsoft\Command Processor`안에 있는 `AutoRun`을 찾습니다. 
3. 만약 위의 것이 어떠한 경로에도 존재하지 않는 파일이라고 확인하고, 만약 그 경우라면 그냥 그것들을 삭제 하세요. 


## API rate limit and OAuth tokens (API rate limit 과 OAuth 토큰)

Github의 API에 대한 접근 횟수 제한 때문에 컴포저가 인증을 위해 당신의 username(ID)와 passoword를 요구할 수 있습니다만 그대로 진행하시면 됩니다. 

만약에 컴포저에서 당신의 Github 인증제공을 선호하지 않으시면 토큰을 이용하여 수동으로 인증하실 수 있습니다. 다음의 절차를 따라가세요. 

1. GitHub에서 OAuth 토큰을 [생성](https://github.com/settings/applications)하세요. [이곳](https://github.com/blog/1509-personal-api-tokens) 더 읽어보세요. 

2. `composer config -g github-oauth.github.com <oauthtoken>`을 실행 해서 설정값에 OAuth 토큰을 추가하세요. 

이제 컴포저는 인증을 묻는 일 없이 설치와 업데이트가 진행 됩니다. 

## proc_open(): fork failed errors - 포크 실패 에러

 만약 컴포저가 다른 명령어를 사용 중 proc_open() fork failed을 보여줄 경우에는:

`PHP Fatal error: Uncaught exception 'ErrorException' with message 'proc_open(): fork failed - Cannot allocate memory' in phar`

이 경우 VPS가 out of memony를 실행하면서 Swap 가능한 공간이 없기 때문에 발생할 수 있습니다. 

```sh
free -m

total used free shared buffers cached
Mem: 2048 357 1690 0 0 237
-/+ buffers/cache: 119 1928
Swap: 0 0 0
```

당신이 Swap (용량)을 사용 할 수 있도록 가능하게 하는 예제 입니다: 

```sh
/bin/dd if=/dev/zero of=/var/swap.1 bs=1M count=1024
/sbin/mkswap /var/swap.1
/sbin/swapon /var/swap.1
```
