<!--
    tagline: Solving problems
-->
# Troubleshooting : 문제 해결

이것은 Composer를 사용하는 중에 나타날 수 있는 공통된 문제 리스트 이며 어떻게 피하는지 방법입니다.
This is a list of common pitfalls on using Composer, and how to avoid them.

## General : 일반적인 해결방법

1. 누군가에게 묻기 전에 일반적인 문제인지 확인하기위해 [`composer diagnose`](../03-cli.md#diagnose)를 실행하세요. (실행 후) 모든 항목이 체크 되었다면(오류가 있다고 나오지 않앗다면) 다음 단계로 넘어가세요. Before asking anyone, run [`composer diagnose`](../03-cli.md#diagnose) to check for common problems. If it all checks out, proceed to the next steps.

2. Composer를 사용하면서 어떠한 문제를 만날 때에는 **최신버젼을 사용**해야 합니다. 자세한 사항은 [self-update](../03-cli.md#self-update)에서 확인하세요. // When facing any kind of problems using Composer, be sure to **work with the latest version**. See [self-update](../03-cli.md#self-update) for details.

3. `curl -sS https://getcomposer.org/installer | php -- --check`라는 명령어를 통해서 installer's checker를 실행하여 setup에 문제가 없는지 확인해야 합니다. // Make sure you have no problems with your setup by running the installer's checks via `curl -sS https://getcomposer.org/installer | php -- --check`.

4. 문제 해결을 하는 중, 벤더의 설치된 항목이나 `composer.lock`의 엔트리에서의 충돌문제를 배제하기 위해서는 `rm -rf vendor && composer update -v` 를 통해서 **당신이 작성한 `composer.json`에 있는 벤더의 올바르게 (재)설치**해서 해결해야 합니다.(ensure가 개념은 잡히는데 한글로 넣기가 어렵군요.. 의역했습니다.) // Ensure you're **installing vendors straight from your `composer.json`** via `rm -rf vendor && composer update -v` when troubleshooting, excluding any possible interferences with existing vendor installations or `composer.lock` entries.

5. `composer clear-cache`를 실행 시켜서 Composer의 케시 데이터를 비우도록 합니다. // Try clearing Composer's cache by running `composer clear-cache`.

## Package not found : 패키지를 찾을 수 없을 경우

1. `composer.json`에 **오타가 있는지**, 혹은 저장소(repository)의 branch 나 tag 이름이 올바른지 꼼꼼히 확인(doucle-check)하세요. // Double-check you **don't have typos** in your `composer.json` or repository branches and tag names.

2. **[minimum-stability](../04-schema.md#minimum-stability)를 올바르게 설정했는지** 확인해야 합니다. 문제가 없이 시작하기 위해서는(교정필요), "dev"에 있는 `minimum-stability`를 설정하세요. // Be sure to **set the right [minimum-stability](../04-schema.md#minimum-stability)**. To get started or be sure this is no issue, set `minimum-stability` to "dev".

3. **[Packagist](https://packagist.org/)에 없는** 페키지들은 항상 **루트페키지 안에서 정의되어야** 합니다.(해당 페키지는 모든 벤더에 의존됩니다.) // Packages **not coming from [Packagist](https://packagist.org/)** should always be **defined in the root package** (the package depending on all vendors).

4. 당신의 프로젝트 저장소의 tag 와 branch들 모두 **같은 벤더 이름과 패키지 이름**을 사용하세요, 특히 `replace`를 사용하거나 서드파티의 패키지를 포크해서 유지보수 할 경우도요.  // Use the **same vendor and package name** throughout all branches and tags of your repository, especially when maintaining a third party fork and using `replace`.

5. 만약 최근에 출시된(발표된, 나온) 버전의 패키지로 업데이트를 한다면, 패키지스트(Packagist)의 패키지를 컴포져에서 보이는 데 최대 1분에시간이 걸린다는 것을 유념하고 있어야 합니다. // If you are updating to a recently published version of a package, be aware that Packagist has a delay of up to 1 minute before new packages are visible to Composer.

## Package not found on travis-ci.org : travis-ci.org에서 패키지를 찾을 수 없는 경우

1. 우선 위의 ["Package not found"](#package-not-found)의 항목을 확인하세요. // Check the ["Package not found"](#package-not-found) item above.

2. 만약 테스트 되어진 패키지가 해당 패키지의 의존분자 중 하나의 의존성일 경우(["순환 종속성"](http://en.wikipedia.org/wiki/Circular_dependency):서로가 서로를 의존하는 관계), 문제가 되는 것은 아마도 Composer가 패키지의 버전을 정확하게 찾아내지 못하게 되는 것입니다. 이것이 git clone이라면, 보통 올바르거나 Composer가 현재 버전을 잘 찾아낼 것이지만, travis는 얕은 복사를 하기 때문에 보통 pull request나 branch들을 구성하는 작업의 테스트를 진행할 경우 실패 할 수 있습니다. 
    가장 좋은 방법은 당신이 COMPOSER_ROOT_VERSION라는 환경변수를 통해 버전을 정의하는 것입니다. 당신은 그것을 `dev-master`에서 설정할 수 있는데, 예를 들자면 루트 패키지의 버전을 `dev-master`로 정의할 수 있습니다. 
    사용법 : `before_script: COMPOSER_ROOT_VERSION=dev-master composer install` Composer를 부르기 위한 변수를 보냅니다. // If the package tested is a dependency of one of its dependencies (cyclic dependency), the problem might be that composer is not able to detect the version of the package properly. If it is a git clone it is generally alright and Composer will detect the version of the current branch, but travis does shallow clones so that process can fail when testing pull requests and feature branches in general.
   The best solution is to define the version you are on via an environment variable called COMPOSER_ROOT_VERSION. You set it to `dev-master` for example to define the root package's version as `dev-master`.
   Use: `before_script: COMPOSER_ROOT_VERSION=dev-master composer install` to export the variable for the call to composer.

## Need to override a package version : 패키지 버전을 덮어 씌우는 것이 필요할 경우 

Let say your project depends on package A which in turn depends on a specific version of package B (say 0.1) and you need a different version of that package - version 0.11.

You can fix this by aliasing version 0.11 to 0.1:

composer.json:

```json
{
    "require": {
        "A": "0.2",
        "B": "0.11 as 0.1"
    }
}
```

See [aliases](aliases.md) for more information.

## Memory limit errors : 메모리 제한 오류의 경우

If composer shows memory errors on some commands:

`PHP Fatal error:  Allowed memory size of XXXXXX bytes exhausted <...>`

The PHP `memory_limit` should be increased.

> **Note:** Composer internally increases the `memory_limit` to `512M`.
> If you have memory issues when using composer, please consider [creating
> an issue ticket](https://github.com/composer/composer/issues) so we can look into it.

To get the current `memory_limit` value, run:

```sh
php -r "echo ini_get('memory_limit').PHP_EOL;"
```

Try increasing the limit in your `php.ini` file (ex. `/etc/php5/cli/php.ini` for
Debian-like systems):

```ini
; Use -1 for unlimited or define an explicit value like 512M
memory_limit = -1
```

Or, you can increase the limit with a command-line argument:

```sh
php -d memory_limit=-1 composer.phar <...>
```

## "The system cannot find the path specified" (Windows) : 시스템이 명시된 경로를 찾을 수 없다고 하는 경우. (Windows만 해당.)

1. Open regedit.
2. Search for an `AutoRun` key inside `HKEY_LOCAL_MACHINE\Software\Microsoft\Command Processor`,
   `HKEY_CURRENT_USER\Software\Microsoft\Command Processor`
   or `HKEY_LOCAL_MACHINE\Software\Wow6432Node\Microsoft\Command Processor`.
3. Check if it contains any path to non-existent file, if it's the case, just remove them.

## API rate limit and OAuth tokens (API rate limit? 과 OAuth 토큰)

Because of GitHub's rate limits on their API it can happen that Composer prompts for authentication asking your username and password so it can go ahead with its work.

If you would prefer not to provide your GitHub credentials to Composer you can manually create a token using the following procedure:

1. [Create](https://github.com/settings/applications) an OAuth token on GitHub.
[Read more](https://github.com/blog/1509-personal-api-tokens) on this.

2. Add it to the configuration running `composer config -g github-oauth.github.com <oauthtoken>`

Now Composer should install/update without asking for authentication.

## proc_open(): fork failed errors - 포크 실패 에러
If composer shows proc_open() fork failed on some commands:

`PHP Fatal error: Uncaught exception 'ErrorException' with message 'proc_open(): fork failed - Cannot allocate memory' in phar`

This could be happening because the VPS runs out of memory and has no Swap space enabled.

```sh
free -m

total used free shared buffers cached
Mem: 2048 357 1690 0 0 237
-/+ buffers/cache: 119 1928
Swap: 0 0 0
```

To enable the swap you can use for example:

```sh
/bin/dd if=/dev/zero of=/var/swap.1 bs=1M count=1024
/sbin/mkswap /var/swap.1
/sbin/swapon /var/swap.1
```
