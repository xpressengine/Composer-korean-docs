# 기본 사용법

## 설치하기

아직 컴포저를 설치하지 않았다면, [소개](00-intro.md) 챕터를 참고하시기 바랍니다. 

## `composer.json`: 프로젝트 셋업

프로젝트에서 컴포저를 사용하기 위해서 필요한 것은 모두 `composer.json`파일에 있습니다. 이파일은 프로젝트의 의존성과 함께 많은 메타정보를 담고 있습니다. 

[JSON 포맷](http://json.org/)은 중첩된 구조를 정의하고 작성하는데 매우 쉬운 포맷입니다. 

### `require` key

`composer.json`에서 처음으로 살펴볼 것은 매번 확인하게 되는 `require`키입니다. 이 키는 컴포저에게 프로젝트가 어떤 패키지들을 필요로 하는지 알려줍니다. 
```json
{
    "require": {
        "monolog/monolog": "1.0.*"
    }
}
```

보시는 바와 같이 `require` 는 **패키지 이름** (e.g. `monolog/monolog`)
과 **패키지 버전** (e.g. `1.0.*`)의 맵핑 형태로 된 객체들로 표현됩니다.

### 패키지 이름

패키지 이름은 벤더의 이름과 프로젝트의 이름으로 구성되어져 있습니다. 벤더 이름은 동일한 패키지 이름을 충돌을 방지하기 위해서 존재합니다(종종 동일한 패키지가 존재할 수 있습니다). 만약 각각 다른 두명의 사람이 `json`이라는 라이브러리를 만들더라도, 둘다 `igorw/json` 그리고 `seldaek/json`와 같이 구분하여 사용할 수 있게 해줍니다.

위에서 예시로든 `monolog/monolog`의 경우에는 벤더의 이름과 패키지 이름이 동일한 경우 입니다. 프로젝트가 하나만 존재하는 경우에는 이렇게 구성하는것이 권장됩니다.  또한 나중에 관련된 프로젝트를 동일한 이름에 더 추가할 수도 있습니다. 만약 라이브러리를 유지 보수한다면, 더 작은 부분들로 이루어 질 수 있도록 손쉽게 분리 할 수 있습니다. 

### 패키지 버전

이전 예제에서 monolog 의 `1.0.*` 버전을 필요로 하다고 설정했습니다. 이 의미는 어떠한 `1.0` 브랜치도 가능하다는 뜻입니다. 따라서 버전이 `1.0.0`이 될수도 `1.0.2` 또는 `1.0.20`이 될수도 있습니다.

버전의 표시는 몇가지 다른 방법으로 지정할 수 있습니다.

이름           | 예제                                                                  | 설명
-------------- | ------------------------------------------------------------------------ | -----------
정확한 버전  | `1.0.2`                                                                  | 해당 패키지의 정확한 버전을 지정할 수 있습니다.
범위지정          | `>=1.0` `>=1.0 <2.0` <code>&gt;=1.0 &lt;1.1 &#124;&#124; &gt;=1.2</code> | 비교구문을 사용하여 일정한 범위내의 버전을 지정할 수 있습니다. 사용 가능한 연산자는 `>`, `>=`, `<`, `<=`, `!=` 입니다. <br /> 여러 범위를 지정할 수도 있습니다. 범위지정은 스페이스로 구분되어 지거나 (<code> </code>) **AND** 의미로 처리되는 콤마로 (`,`) 구분할 수도 있습니다. 두개의 파이프 기호는 (<code>&#124;&#124;</code>) **OR**로 처리됩니다. AND 가 OR 에 우선하는 처리순서를 가집니다. 
하이픈 범위지정   | `1.0 - 2.0`                                                              | 버전의 포괄적인 지정을 의미합니다. 오른쪽에 기입한 버전은 와일드카드로 표현되는 버전을 포함함을 의미합니다. 예를 들어 `1.0 - 2.0` 라는 표현은 `>=1.0.0 <2.1` 와 동일한데 오른쪽에 기입한 `2.0` 은 `2.0.*`의 의미가 됩니다. 다른 표현으로 `1.0.0 - 2.1.0` 는 `>=1.0.0 <=2.1.0`과 동일합니다.
와일드카드       | `1.0.*`                                                                  | 버전을 `*` 의 와일드카드를 포함한 형태로 입력할 수 있습니다. `1.0.*` 는 `>=1.0 <1.1`과 동일한 의미를 나타냅니다.
물결표 표시 | `~1.2`                                                                   | 이 표현은 프로젝트에 있어서 매우 유용한 표현입니다. `~1.2`는 `>=1.2 <2.0`와 동일한 의미를 가집니다. 좀더 자세한 설명은 다음 섹션을 참고하십시오. 
삽입기호(^) 표시 | `^1.2.3`                                                                 | 이 표현또한 프로젝트의 버전을 표시하는데 매우 유용합니다. `^1.2.3` 은 `>=1.2.3 <2.0`와 동일한 의미를 나타냅니다. 더 자세한 내용은, 다음 섹션을 참고하십시오.

### 다음 주요 릴리즈 (물결표 와 삽입기호(^)표현)

 `~` 물결표 표현은 예를 들어서 보는것이 제일 좋습니다. `~1.2`은 `>=1.2 <2.0.0`와 동일하고, `~1.2.3`은 `>=1.2.3 <1.3.0`와 의미가 같습니다. 이러한 표현은 [시멘틱 버저닝](http://semver.org/)을 따르는 프로젝트에 있어서 매우 유용합니다. 일반적으로 `~1.2`와 같이 최소버전을 표시하는 형식으로 사용되어집니다.  (이상의 버전을 의미하지만 2.0 버전을 포함하지는 않음). 이러한 버저닝이 유지되려면 2.0 버전 이전까지는 호환성에 아무런 문제가 없어야 합니다. 위에서 보다시피 `~` 을 사용해서 최소버전을 지정하면, 지정된 마지막 자리까지만 허용하게 됩니다. 

`^` 삽입기호 표현은 시멘틱 버저닝의 표현과 비슷하게 동작하지만 다른 형태의 업데이트까지 허용합니다. 예를 들면 `^1.2.3`은 2.0 버전 미만의 호환성을 유지하는 `>=1.2.3 <2.0.0` 까지를 의미합니다. 또한 `^0.3`은 `>=0.3.0 <0.4.0`과 동일한 의미를 지닙니다.

> **주의:** 비록 `2.0-beta.1`은 엄밀히 말해서 `2.0` 이전 버전이라고 할 수 있지만 
> `~1.2`으로 표시되었을 때 이버전을 설치하지는 않습니다. 다시말해서 `~1.2` 는 `.2` 버전만을 의미합니다. 
> 뒤의 버전은 변경될 수 있지만 `1.` 부분은 고정된 형식입니다.

> **주의:** `~` 물결표 표현은 메이저 릴리즈 버전을 표시할 때 예외적으로 동작합니다. 
> 이 말은 `~1` 으로 표현한 버전은 `~1.0`과 동일한 의미를 가지며 
> 메이저 릴리즈가 업데이트 되기 전까지의 버전을 지칭한다고 할 수 있습니다.

### Stability

By default only stable releases are taken into consideration. If you would like
to also get RC, beta, alpha or dev versions of your dependencies you can do
so using [stability flags](04-schema.md#package-links). To change that for all
packages instead of doing per dependency you can also use the
[minimum-stability](04-schema.md#minimum-stability) setting.

## Installing Dependencies

To fetch the defined dependencies into your local project, just run the
`install` command of `composer.phar`.

```sh
php composer.phar install
```

This will find the latest version of `monolog/monolog` that matches the
supplied version constraint and download it into the `vendor` directory.
It's a convention to put third party code into a directory named `vendor`.
In case of monolog it will put it into `vendor/monolog/monolog`.

> **Tip:** If you are using git for your project, you probably want to add
> `vendor` into your `.gitignore`. You really don't want to add all of that
> code to your repository.

Another thing that the `install` command does is it adds a `composer.lock`
file into your project root.

## `composer.lock` - The Lock File

After installing the dependencies, Composer writes the list of the exact
versions it installed into a `composer.lock` file. This locks the project
to those specific versions.

**Commit your application's `composer.lock` (along with `composer.json`) into version control.**

This is important because the `install` command checks if a lock file is present,
and if it is, it downloads the versions specified there (regardless of what `composer.json`
says).

This means that anyone who sets up the project will download the exact
same version of the dependencies. Your CI server, production machines, other
developers in your team, everything and everyone runs on the same dependencies, which
mitigates the potential for bugs affecting only some parts of the deployments. Even if you
develop alone, in six months when reinstalling the project you can feel confident the
dependencies installed are still working even if your dependencies released
many new versions since then.

If no `composer.lock` file exists, Composer will read the dependencies and
versions from `composer.json` and  create the lock file after executing the `update` or the `install`
command.

This means that if any of the dependencies get a new version, you won't get the updates
automatically. To update to the new version, use `update` command. This will fetch
the latest matching versions (according to your `composer.json` file) and also update
the lock file with the new version.

```sh
php composer.phar update
```
> **Note:** Composer will display a Warning when executing an `install` command if 
 `composer.lock` and `composer.json` are not synchronized.
 
If you only want to install or update one dependency, you can whitelist them:

```sh
php composer.phar update monolog/monolog [...]
```

> **Note:** For libraries it is not necessarily recommended to commit the lock file,
> see also: [Libraries - Lock file](02-libraries.md#lock-file).

## Packagist

[Packagist](https://packagist.org/) is the main Composer repository. A Composer
repository is basically a package source: a place where you can get packages
from. Packagist aims to be the central repository that everybody uses. This
means that you can automatically `require` any package that is available
there.

If you go to the [packagist website](https://packagist.org/) (packagist.org),
you can browse and search for packages.

Any open source project using Composer should publish their packages on
packagist. A library doesn't need to be on packagist to be used by Composer,
but it makes life quite a bit simpler.

## Autoloading

For libraries that specify autoload information, Composer generates a
`vendor/autoload.php` file. You can simply include this file and you
will get autoloading for free.

```php
require 'vendor/autoload.php';
```

This makes it really easy to use third party code. For example: If your
project depends on monolog, you can just start using classes from it, and they
will be autoloaded.

```php
$log = new Monolog\Logger('name');
$log->pushHandler(new Monolog\Handler\StreamHandler('app.log', Monolog\Logger::WARNING));

$log->addWarning('Foo');
```

You can even add your own code to the autoloader by adding an `autoload` field
to `composer.json`.

```json
{
    "autoload": {
        "psr-4": {"Acme\\": "src/"}
    }
}
```

Composer will register a [PSR-4](http://www.php-fig.org/psr/psr-4/) autoloader
for the `Acme` namespace.

You define a mapping from namespaces to directories. The `src` directory would
be in your project root, on the same level as `vendor` directory is. An example
filename would be `src/Foo.php` containing an `Acme\Foo` class.

After adding the `autoload` field, you have to re-run `install` to re-generate
the `vendor/autoload.php` file.

Including that file will also return the autoloader instance, so you can store
the return value of the include call in a variable and add more namespaces.
This can be useful for autoloading classes in a test suite, for example.

```php
$loader = require 'vendor/autoload.php';
$loader->add('Acme\\Test\\', __DIR__);
```

In addition to PSR-4 autoloading, classmap is also supported. This allows
classes to be autoloaded even if they do not conform to PSR-4. See the
[autoload reference](04-schema.md#autoload) for more details.

> **Note:** Composer provides its own autoloader. If you don't want to use
that one, you can just include `vendor/composer/autoload_*.php` files,
which return associative arrays allowing you to configure your own autoloader.

&larr; [Intro](00-intro.md)  |  [Libraries](02-libraries.md) &rarr;
