# The composer.json Schema

This chapter will explain all of the fields available in `composer.json`.

## JSON schema

We have a [JSON schema](http://json-schema.org) that documents the format and
can also be used to validate your `composer.json`. In fact, it is used by the
`validate` command. You can find it at:
[`res/composer-schema.json`](https://github.com/composer/composer/blob/master/res/composer-schema.json).

## Root Package

The root package is the package defined by the `composer.json` at the root of
your project. It is the main `composer.json` that defines your project
requirements.

Certain fields only apply when in the root package context. One example of
this is the `config` field. Only the root package can define configuration.
The config of dependencies is ignored. This makes the `config` field
`root-only`.

If you clone one of those dependencies to work on it, then that package is the
root package. The `composer.json` is identical, but the context is different.

> **Note:** A package can be the root package or not, depending on the context.
> For example, if your project depends on the `monolog` library, your project
> is the root package. However, if you clone `monolog` from GitHub in order to
> fix a bug in it, then `monolog` is the root package.

## Properties

### name

The name of the package. It consists of vendor name and project name,
separated by `/`.

Examples:

* monolog/monolog
* igorw/event-source

Required for published packages (libraries).

### description

A short description of the package. Usually this is just one line long.

Required for published packages (libraries).

### version

The version of the package. In most cases this is not required and should
be omitted (see below).

This must follow the format of `X.Y.Z` or `vX.Y.Z` with an optional suffix
of `-dev`, `-patch`, `-alpha`, `-beta` or `-RC`. The patch, alpha, beta and
RC suffixes can also be followed by a number.

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
to omit it.

> **Note:** Packagist uses VCS repositories, so the statement above is very
> much true for Packagist as well. Specifying the version yourself will
> most likely end up creating problems at some point due to human error.

### type

The type of the package. It defaults to `library`.

Package types are used for custom installation logic. If you have a package
that needs some special logic, you can define a custom type. This could be a
`symfony-bundle`, a `wordpress-plugin` or a `typo3-module`. These types will
all be specific to certain projects, and they will need to provide an
installer capable of installing packages of that type.

Out of the box, composer supports four types:

- **library:** This is the default. It will simply copy the files to `vendor`.
- **project:** This denotes a project rather than a library. For example
  application shells like the [Symfony standard edition](https://github.com/symfony/symfony-standard),
  CMSs like the [SilverStripe installer](https://github.com/silverstripe/silverstripe-installer)
  or full fledged applications distributed as packages. This can for example
  be used by IDEs to provide listings of projects to initialize when creating
  a new workspace.
- **metapackage:** An empty package that contains requirements and will trigger
  their installation, but contains no files and will not write anything to the
  filesystem. As such, it does not require a dist or source key to be
  installable.
- **composer-plugin:** A package of type `composer-plugin` may provide an
  installer for other packages that have a custom type. Read more in the
  [dedicated article](articles/custom-installers.md).

Only use a custom type if you need custom logic during installation. It is
recommended to omit this field and have it just default to `library`.

### keywords

An array of keywords that the package is related to. These can be used for
searching and filtering.

Examples:

- logging
- events
- database
- redis
- templating

Optional.

### homepage

An URL to the website of the project.

Optional.

### time

Release date of the version.

Must be in `YYYY-MM-DD` or `YYYY-MM-DD HH:MM:SS` format.

Optional.

### license

The license of the package. This can be either a string or an array of strings.

The recommended notation for the most common licenses is (alphabetical):

- Apache-2.0
- BSD-2-Clause
- BSD-3-Clause
- BSD-4-Clause
- GPL-2.0
- GPL-2.0+
- GPL-3.0
- GPL-3.0+
- LGPL-2.1
- LGPL-2.1+
- LGPL-3.0
- LGPL-3.0+
- MIT

Optional, but it is highly recommended to supply this. More identifiers are
listed at the [SPDX Open Source License Registry](http://www.spdx.org/licenses/).

For closed-source software, you may use `"proprietary"` as the license identifier.

An Example:

```json
{
    "license": "MIT"
}
```

For a package, when there is a choice between licenses ("disjunctive license"),
multiple can be specified as array.

An Example for disjunctive licenses:

```json
{
    "license": [
       "LGPL-2.1",
       "GPL-3.0+"
    ]
}
```

Alternatively they can be separated with "or" and enclosed in parenthesis;

```json
{
    "license": "(LGPL-2.1 or GPL-3.0+)"
}
```

Similarly when multiple licenses need to be applied ("conjunctive license"),
they should be separated with "and" and enclosed in parenthesis.

### authors

The authors of the package. This is an array of objects.

Each author object can have following properties:

* **name:** The author's name. Usually his real name.
* **email:** The author's email address.
* **homepage:** An URL to the author's website.
* **role:** The authors' role in the project (e.g. developer or translator)

An example:

```json
{
    "authors": [
        {
            "name": "Nils Adermann",
            "email": "naderman@naderman.de",
            "homepage": "http://www.naderman.de",
            "role": "Developer"
        },
        {
            "name": "Jordi Boggiano",
            "email": "j.boggiano@seld.be",
            "homepage": "http://seld.be",
            "role": "Developer"
        }
    ]
}
```

Optional, but highly recommended.

### support

Various information to get support about the project.

Support information includes the following:

* **email:** Email address for support.
* **issues:** URL to the Issue Tracker.
* **forum:** URL to the Forum.
* **wiki:** URL to the Wiki.
* **irc:** IRC channel for support, as irc://server/channel.
* **source:** URL to browse or download the sources.

An example:

```json
{
    "support": {
        "email": "support@example.org",
        "irc": "irc://irc.freenode.org/composer"
    }
}
```

Optional.

### Package links

All of the following take an object which maps package names to
[version constraints](01-basic-usage.md#package-versions).

Example:

```json
{
    "require": {
        "monolog/monolog": "1.0.*"
    }
}
```

All links are optional fields.

`require` and `require-dev` additionally support stability flags (root-only).
These allow you to further restrict or expand the stability of a package beyond
the scope of the [minimum-stability](#minimum-stability) setting. You can apply
them to a constraint, or just apply them to an empty constraint if you want to
allow unstable packages of a dependency for example.

Example:

```json
{
    "require": {
        "monolog/monolog": "1.0.*@beta",
        "acme/foo": "@dev"
    }
}
```

If one of your dependencies has a dependency on an unstable package you need to
explicitly require it as well, along with its sufficient stability flag.

Example:

```json
{
    "require": {
        "doctrine/doctrine-fixtures-bundle": "dev-master",
        "doctrine/data-fixtures": "@dev"
    }
}
```

`require` and `require-dev` additionally support explicit references (i.e.
commit) for dev versions to make sure they are locked to a given state, even
when you run update. These only work if you explicitly require a dev version
and append the reference with `#<ref>`.

Example:

```json
{
    "require": {
        "monolog/monolog": "dev-master#2eb0c0978d290a1c45346a1955188929cb4e5db7",
        "acme/foo": "1.0.x-dev#abc123"
    }
}
```

> **Note:** While this is convenient at times, it should not be how you use
> packages in the long term because it comes with a technical limitation. The
> composer.json metadata will still be read from the branch name you specify
> before the hash. Because of that in some cases it will not be a practical
> workaround, and you should always try to switch to tagged releases as soon
> as you can.

It is also possible to inline-alias a package constraint so that it matches
a constraint that it otherwise would not. For more information [see the
aliases article](articles/aliases.md).

#### require

Lists packages required by this package. The package will not be installed
unless those requirements can be met.

#### require-dev <span>(root-only)</span>

Lists packages required for developing this package, or running
tests, etc. The dev requirements of the root package are installed by default.
Both `install` or `update` support the `--no-dev` option that prevents dev
dependencies from being installed.

#### conflict

Lists packages that conflict with this version of this package. They
will not be allowed to be installed together with your package.

Note that when specifying ranges like `<1.0 >=1.1` in a `conflict` link,
this will state a conflict with all versions that are less than 1.0 *and* equal
or newer than 1.1 at the same time, which is probably not what you want. You
probably want to go for `<1.0 | >=1.1` in this case.

#### replace

Lists packages that are replaced by this package. This allows you to fork a
package, publish it under a different name with its own version numbers, while
packages requiring the original package continue to work with your fork because
it replaces the original package.

This is also useful for packages that contain sub-packages, for example the main
symfony/symfony package contains all the Symfony Components which are also
available as individual packages. If you require the main package it will
automatically fulfill any requirement of one of the individual components,
since it replaces them.

Caution is advised when using replace for the sub-package purpose explained
above. You should then typically only replace using `self.version` as a version
constraint, to make sure the main package only replaces the sub-packages of
that exact version, and not any other version, which would be incorrect.

#### provide

List of other packages that are provided by this package. This is mostly
useful for common interfaces. A package could depend on some virtual
`logger` package, any library that implements this logger interface would
simply list it in `provide`.

#### suggest

Suggested packages that can enhance or work well with this package. These are
just informational and are displayed after the package is installed, to give
your users a hint that they could add more packages, even though they are not
strictly required.

The format is like package links above, except that the values are free text
and not version constraints.

Example:

```json
{
    "suggest": {
        "monolog/monolog": "Allows more advanced logging of the application flow"
    }
}
```

### autoload

Autoload mapping for a PHP autoloader.

Currently [`PSR-0`](http://www.php-fig.org/psr/psr-0/) autoloading,
[`PSR-4`](http://www.php-fig.org/psr/psr-4/) autoloading, `classmap` generation and
`files` includes are supported. PSR-4 is the recommended way though since it offers
greater ease of use (no need to regenerate the autoloader when you add classes).

#### PSR-4

Under the `psr-4` key you define a mapping from namespaces to paths, relative to the
package root. When autoloading a class like `Foo\\Bar\\Baz` a namespace prefix
`Foo\\` pointing to a directory `src/` means that the autoloader will look for a
file named `src/Bar/Baz.php` and include it if present. Note that as opposed to
the older PSR-0 style, the prefix (`Foo\\`) is **not** present in the file path.

Namespace prefixes must end in `\\` to avoid conflicts between similar prefixes.
For example `Foo` would match classes in the `FooBar` namespace so the trailing
backslashes solve the problem: `Foo\\` and `FooBar\\` are distinct.

The PSR-4 references are all combined, during install/update, into a single
key => value array which may be found in the generated file
`vendor/composer/autoload_psr4.php`.

Example:

```json
{
    "autoload": {
        "psr-4": {
            "Monolog\\": "src/",
            "Vendor\\Namespace\\": ""
        }
    }
}
```

If you need to search for a same prefix in multiple directories,
you can specify them as an array as such:

```json
{
    "autoload": {
        "psr-4": { "Monolog\\": ["src/", "lib/"] }
    }
}
```

If you want to have a fallback directory where any namespace will be looked for,
you can use an empty prefix like:

```json
{
    "autoload": {
        "psr-4": { "": "src/" }
    }
}
```

#### PSR-0

Under the `psr-0` key you define a mapping from namespaces to paths, relative to the
package root. Note that this also supports the PEAR-style non-namespaced convention.

Please note namespace declarations should end in `\\` to make sure the autoloader
responds exactly. For example `Foo` would match in `FooBar` so the trailing
backslashes solve the problem: `Foo\\` and `FooBar\\` are distinct.

The PSR-0 references are all combined, during install/update, into a single key => value
array which may be found in the generated file `vendor/composer/autoload_namespaces.php`.

Example:

```json
{
    "autoload": {
        "psr-0": {
            "Monolog\\": "src/",
            "Vendor\\Namespace\\": "src/",
            "Vendor_Namespace_": "src/"
        }
    }
}
```

If you need to search for a same prefix in multiple directories,
you can specify them as an array as such:

```json
{
    "autoload": {
        "psr-0": { "Monolog\\": ["src/", "lib/"] }
    }
}
```

The PSR-0 style is not limited to namespace declarations only but may be
specified right down to the class level. This can be useful for libraries with
only one class in the global namespace. If the php source file is also located
in the root of the package, for example, it may be declared like this:

```json
{
    "autoload": {
        "psr-0": { "UniqueGlobalClass": "" }
    }
}
```

If you want to have a fallback directory where any namespace can be, you can
use an empty prefix like:

```json
{
    "autoload": {
        "psr-0": { "": "src/" }
    }
}
```

#### Classmap

The `classmap` references are all combined, during install/update, into a single
key => value array which may be found in the generated file
`vendor/composer/autoload_classmap.php`. This map is built by scanning for
classes in all `.php` and `.inc` files in the given directories/files.

You can use the classmap generation support to define autoloading for all libraries
that do not follow PSR-0/4. To configure this you specify all directories or files
to search for classes.

Example:

```json
{
    "autoload": {
        "classmap": ["src/", "lib/", "Something.php"]
    }
}
```

#### Files

If you want to require certain files explicitly on every request then you can use
the 'files' autoloading mechanism. This is useful if your package includes PHP functions
that cannot be autoloaded by PHP.

Example:

```json
{
    "autoload": {
        "files": ["src/MyLibrary/functions.php"]
    }
}
```

### autoload-dev <span>(root-only)</span>

This section allows to define autoload rules for development purposes.

Classes needed to run the test suite should not be included in the main autoload
rules to avoid polluting the autoloader in production and when other people use
your package as a dependency.

Therefore, it is a good idea to rely on a dedicated path for your unit tests
and to add it within the autoload-dev section.

Example:

```json
{
    "autoload": {
        "psr-4": { "MyLibrary\\": "src/" }
    },
    "autoload-dev": {
        "psr-4": { "MyLibrary\\Tests\\": "tests/" }
    }
}
```

### include-path

> **DEPRECATED**: This is only present to support legacy projects, and all new code
> should preferably use autoloading. As such it is a deprecated practice, but the
> feature itself will not likely disappear from Composer.

A list of paths which should get appended to PHP's `include_path`.

Example:

```json
{
    "include-path": ["lib/"]
}
```

Optional.

### target-dir

> **DEPRECATED**: This is only present to support legacy PSR-0 style autoloading,
> and all new code should preferably use PSR-4 without target-dir and projects
> using PSR-0 with PHP namespaces are encouraged to migrate to PSR-4 instead.

Defines the installation target.

In case the package root is below the namespace declaration you cannot
autoload properly. `target-dir` solves this problem.

An example is Symfony. There are individual packages for the components. The
Yaml component is under `Symfony\Component\Yaml`. The package root is that
`Yaml` directory. To make autoloading possible, we need to make sure that it
is not installed into `vendor/symfony/yaml`, but instead into
`vendor/symfony/yaml/Symfony/Component/Yaml`, so that the autoloader can load
it from `vendor/symfony/yaml`.

To do that, `autoload` and `target-dir` are defined as follows:

```json
{
    "autoload": {
        "psr-0": { "Symfony\\Component\\Yaml\\": "" }
    },
    "target-dir": "Symfony/Component/Yaml"
}
```

Optional.

### minimum-stability <span>(root-only)</span>

This defines the default behavior for filtering packages by stability. This
defaults to `stable`, so if you rely on a `dev` package, you should specify
it in your file to avoid surprises.

All versions of each package are checked for stability, and those that are less
stable than the `minimum-stability` setting will be ignored when resolving
your project dependencies. Specific changes to the stability requirements of
a given package can be done in `require` or `require-dev` (see
[package links](#package-links)).

Available options (in order of stability) are `dev`, `alpha`, `beta`, `RC`,
and `stable`.

### prefer-stable <span>(root-only)</span>

When this is enabled, Composer will prefer more stable packages over unstable
ones when finding compatible stable packages is possible. If you require a
dev version or only alphas are available for a package, those will still be
selected granted that the minimum-stability allows for it.

Use `"prefer-stable": true` to enable.

### repositories <span>(root-only)</span>

Custom package repositories to use.

By default composer just uses the packagist repository. By specifying
repositories you can get packages from elsewhere.

Repositories are not resolved recursively. You can only add them to your main
`composer.json`. Repository declarations of dependencies' `composer.json`s are
ignored.

The following repository types are supported:

* **composer:** A composer repository is simply a `packages.json` file served
  via the network (HTTP, FTP, SSH), that contains a list of `composer.json`
  objects with additional `dist` and/or `source` information. The `packages.json`
  file is loaded using a PHP stream. You can set extra options on that stream
  using the `options` parameter.
* **vcs:** The version control system repository can fetch packages from git,
  svn and hg repositories.
* **pear:** With this you can import any pear repository into your composer
  project.
* **package:** If you depend on a project that does not have any support for
  composer whatsoever you can define the package inline using a `package`
  repository. You basically just inline the `composer.json` object.

For more information on any of these, see [Repositories](05-repositories.md).

Example:

```json
{
    "repositories": [
        {
            "type": "composer",
            "url": "http://packages.example.com"
        },
        {
            "type": "composer",
            "url": "https://packages.example.com",
            "options": {
                "ssl": {
                    "verify_peer": "true"
                }
            }
        },
        {
            "type": "vcs",
            "url": "https://github.com/Seldaek/monolog"
        },
        {
            "type": "pear",
            "url": "http://pear2.php.net"
        },
        {
            "type": "package",
            "package": {
                "name": "smarty/smarty",
                "version": "3.1.7",
                "dist": {
                    "url": "http://www.smarty.net/files/Smarty-3.1.7.zip",
                    "type": "zip"
                },
                "source": {
                    "url": "http://smarty-php.googlecode.com/svn/",
                    "type": "svn",
                    "reference": "tags/Smarty_3_1_7/distribution/"
                }
            }
        }
    ]
}
```

> **Note:** Order is significant here. When looking for a package, Composer
will look from the first to the last repository, and pick the first match.
By default Packagist is added last which means that custom repositories can
override packages from it.

### config <span>(root-only)</span>

설정을 변경합니다. 변경한 설정은 (현재) 프로젝트에만 적용됩니다. (--global 옵션을 붙여주면 전체에도 설정됩니다.)

아래 옵션들이 설정 변경을 지원합니다.

* **process-timeout:** 기본값은 `300`입니다. Composer가 실행하면서 'git clones'와 같은 일은 하면 프로세스가 죽을 수 있습니다. 그래서 연결 상태가 느리거나, vendors가 거대할 때, 기본값보다 높은 값이 필요합니다. 
* **use-include-path:** 기본값은 `false`입니다. 값을 true로 해준다면, autoloader가 include path에 해당하는 클래스를 PHP에서 직접 찾습니다.
* **preferred-install:** 기본값은 auto이고, source, dist, auto중 선택할 수 있습니다. 이 옵션으로 선호하는 방법을 선택해 설치할 수 있습니다. (source는 git clone과 같은 소스파일을 그대로 받는 방식, dist는 zip과같이 압축된 형태로 받는 방식, auto는 어떤것이든 상관없이 받는 방식입니다.)
* **store-auths:** 사용자 인증을 위한 메세지 표시로, `true` (저장), `false` (저장 안함), `prompt` (항상 물음) 중 하나를 선택할 수 있습니다. 기본값은 `prompt` 입니다.
* **github-protocols:** 기본값은 `["git", "https", "ssh"]`입니다. github.com 에서 cloning 하는 프로토콜의 우선순위로, 예를 들면 HTTPS 프로토콜 우선 순위를 프록시 뒤에, 또는, 효율성이 낮은 git protocol로 사용자가 아무렇게나 재구성할 수 있습니다.
* **github-oauth:** 도메인 네임과 OAuth 키에 대한 목록입니다. 예를 들어 `{"github.com": "oauthtoken"}` 에서 value인 `oauthtoken`는 github 비밀 저장소 접근 가능케 해주며, 낮은 IP 기반의 속도제한이 있는 API에 대한 접근을 회피 할 수 있도록 해줍니다. github의 OAuth 토큰을 얻는 방법을 읽어보시기 바랍니다. [Read more](articles/troubleshooting.md#api-rate-limit-and-oauth-tokens)
* **http-basic:** 인증에 사용되는 도메인 네임과 사용자이름/비밀번호 목록입니다.`{"example.org": {"username": "alice", "password": "foo"}` 위와 같은 방식으로 작성을 하면 `alice/foo` 값이 `example.org` 에 인증을 하게 됩니다.
* **vendor-dir:** 기본값은 `vendor` 입니다. 사용자는 원한다면 다른 디렉토리에 의존성을 설치할 수 있습니다. `$HOME`과 `~`는 `vendor-dir` 와 `$-dir` 이하의 모든 사용자의 홈디렉토리 경로로 대체할 수 있습니다.
* **bin-dir:** 기본값은 `vendor/bin` 입니다. 만약 프로젝트가 바이너리를 include했다면, `vendor/bin`에 해당하는 디렉토리에 심볼릭링크로 가리켜지게 됩니다.
* **cache-dir:** UNIX 에서의 기본값은 `$COMPOSER_HOME/cache` 이고, Window 에서의 기본값은 `C:\Users\<user>\AppData\Local\Composer` 입니다. Composer에 의해 사용된 캐시가 모두 저장됩니다. 또한 03-CLI에서 [COMPOSER_HOME](03-cli.md#composer-home)를 참고하기 바랍니다.
* **cache-files-dir:** 기본값은 `$cache-dir/files` 입니다. 캐시를 압축 패키지로 저장하는 경로입니다.
* **cache-repo-dir:** 기본값은 `$cache-dir/repo` 입니다. `composer` 타입의 metadata 저장소와 `svn`, `github`, 그리고 `bitbucket` 타입의 VCS 저장소를 저장하는 경로입니다.
* **cache-vcs-dir:** 기본값은 `$cache-dir/vcs` 입니다. VCS 저장소인 `git`/`hg` 의 metadata를 불러해서 빠른속도로 속도설치하는 VCS clones을 저장하는 경로입니다.
* **cache-files-ttl:** 기본값은 `15552000` (6개월) 입니다. Composer caches가 모든 dist 패키지를 다운로드합니다. 기본값인 6개월동안 사용되지 않으면 제거합니다. 이 옵션의 기간은 사용자가 정할 수 있으며, 0으로 설정해 기능을 완전히 사용하지 않을 수 있습니다. 
* **cache-files-maxsize:** 기본값은 `300MiB` 입니다. Composer caches가 모든 dist 패키지를 다운로드합니다. 가비지 콜렉션이 주기적으로 실행되는 경우, 캐시의 최대 사이즈로 실행됩니다. 캐시사이즈보다 클 경우, 가장 오래전에 사용됬던 파일부터 차례대로 지우기 시작합니다.
* **prepend-autoloader:** 기본값은 `true` 입니다. 만약 false 라면, 이미 존재하는 autoloader 앞에 새로운 autoloader가 추가되지 않습니다. 하지만, 이런 경우가 다른 autoloader들과의 상호작용하는 문제를 해결하기 위해 필요하기도 합니다.
* **autoloader-suffix:** 기본값은 `null` 입니다. autoloader에 접미사를 붙여줍니다.(autoloader-blahblah...) null 일때는 자동으로 `autoloader` 가 생성됩니다.
* **optimize-autoloader** 기본값은 `false`. `autoloader`를 dump 할 경우 항상 최적화를 시켜줍니다.
* **github-domains:** 기본값은 `["github.com"]` 입니다. 사용하는 github를 사용하는 도메인 목록입니다. github Enterprise  설정에서 사용됩니다.
* **github-expose-hostname:** 기본값은 `true` 입니다. 만약 false로 설정하면, github의 API를 액세스하기 위해 만든 OAuth의 토큰은 날짜 대신 장비의 호스트 이름이됩니다.
* **notify-on-install:** 기본값은 `true` 입니다. 저장소의 Notification URL을 정의할 수 있으며, 저장소에 패키지가 설치될 때 알려줍니다. 이 설정을 이용해 알림을 받지 않을 수 있습니다.
* **discard-changes:** 이 설정을 사용하면 비-대화식 모드에서 더러운(..) 업데이트를 처리하는 기본 스타일을 설정할 수 있습니다. `true`는 항상 vendors 안의 변경사항을 취소하는 반면, `stash`는 항상 변경된 사항을 재적용 합니다. 수정된 vendors가 적을 경우, CI서버나 배포용 스크립트에서 사용하게 됩니다.(????)

예제:

```json
{
    "config": {
        "bin-dir": "bin"
    }
}
```

> **Note:** `http-basic`, `github-oauth` 와 같이 사용자 인증 관련 옵션은 `composer.json`외에 `auth.json` 파일 내에 지정할 수 있습니다. 이러한 방법은 .gitignore에 추가할 수 있고, 개발자는 자신의 자격 증명(?)이 가능합니다.

### scripts <span>(root-only)</span>

설치 과정의 여러 부분을 스크립트로 후크 할 수 있습니다

여기를 보시면 [Scripts](articles/scripts.md) 자세한 설명과 예제가 있습니다.

### extra

`scripts`로 사용하기 위한 임의의 데이터 입니다.

사실상 뭐든지 할 수 있습니다. 스크립트 내에서 액세스 하기위한 이벤트 핸들러는
아래와 같습니다:

```php
$extra = $event->getComposer()->getPackage()->getExtra();
```

선택적으로 사용 가능합니다.

### bin

설정 파일을 바이너리로 처리하고, `bin-dir`이라는 심볼릭 링크로 만듭니다.

오른쪽 링크를 보시면 [Vendor Binaries](articles/vendor-binaries.md) 자세한 설명이 나옵니다.

선택적으로 사용 가능합니다.

### archive

패키지로 저장하기 위한 옵션을 설정합니다.

아래와 같은 옵션들이 지원됩니다.

* **exclude:**  제외한 경로에 대한 패턴을 목록으로 구성됩니다.  
이 패턴은 .gitignore 파일과 일치합니다.  
	* 느낌표 ( ! ) : 일치하는 파일에 나타내는데, 이전에 exclude한 패턴에서도 나타납니다.
	* 슬래쉬 ( / ) : 프로젝트 시작 시의 상대경로를 나타냅니다.
	* 아스타 ( * ) : 디렉토리를 구분하는 구분자로 확장(사용)되지 않습니다.

예제:

```json
{
    "archive": {
        "exclude": ["/foo/bar", "baz", "/*.test", "!/foo/bar/baz"]
    }
}
```

위 예제는 `/dir/foo/bar/file`, `/foo/bar/baz`, `/file.php`,
`/foo/my.test`, 4가지 경로를 include 하면, `/foo/bar/any`, `/foo/baz`, and `/my.test`, 3가지 경로를 exclude합니다.

선택적으로 사용 가능합니다.

&larr; [Command-line interface](03-cli.md)  |  [Repositories](05-repositories.md) &rarr;

