# Repositories - 저장소

이번 챕터에서는 패키지와 저장소에 대한 개념, 어떤 종류의 저장소가 사용가능한지 그리고 이것들이 어떻게 동작하는지 설명하겠습니다.

## 개념

먼저 실제의 다양한 형태의 저장소를 살펴 보기에 앞서, 컴포저에 내장 된 기본 개념들을 이해할 필요가 있습니다.


### 패키지

컴포저는 의존성 관리자로 패키지들을 로컬 공간에 설치합니다. 원래 패키지라는 것은 단순히 무언가를 담고 있는 디렉토리를 의미합니다. 여기에서는 PHP 코드를 의미하게 되겠지만, 이론상으로는 그 어떠한 것도 담을 수 있습니다. 그리고 패키지는 이름과 버전이 포함된 설명을 수록하고 있습니다. 이 이름과 버전은 패키지를 식별하는데 사용됩니다.

사실, 컴포저는 내부적으로 패키지의 모든 버전들을 별도의 패키지로 간주합니다. 이러한 특징은 여러분이 컴포저를 사용하는 동안에는 상관 없지만, 패키지를 변경하려고 할 때는 매우 중요한 요소가 됩니다.

이름과 버전 외에도 유용한 메타데이터가 있습니다. source 정의는 대부분 설치에 관련된 정보들 입니다. 설치와 밀접하게 관련된 정보는 source 정의이고, 패키지 컨텐츠가 어디 있는지 서술하고 있습니다. 패키지 데이터는 패키지의 컨텐츠를 가리킵니다.
그리고 dist 와 source 라는 두가지의 옵션이 있습니다. 

**Dist:** dist 는 패키지 데이터를 묶은 버전을 말합니다. 통상적으로 릴리즈 버전, stable 릴리즈 라고도 합니다.

**Source:**  source 는 개발용으로 사용됩니다. 보통 git과 같은 소스코드 저장소로부터 가져오게 됩니다. 내려받은 패키지를 수정하고 싶을 때에는 fetch 할 수도 있습니다.

Packages can supply either of these, or even both. Depending on certain factors, such as user-supplied options and stability of the package, one will be preferred.

[검수필]
패키지는 이중 하나의 옵션을 지원하거나 둘 다 지원할 수도 있습니다.
사용자 제공 옵션(user-supplied options)이나 패키지 안정성과 같은 특정한 목적에 한해 선호될 것입니다.

### 저장소

저장소란, 패키지 소스 입니다. 패키지들/버전들 의 목록입니다. 컴포저는 프로젝트에서 필요로 하는 패키지를 찾기 위해 당신의 모든 저장소를 조사할 것입니다.

컴포저에 기본으로 등록되어 있는 저장소는 Packagist 밖에 없습니다.
`composer.json`에 선언하면 프로젝트에 저장소를 더 추가할 수 있습니다.

repositories 는 root 패키지에서만 유효하며, 하위 종속 관계에 정의된 저장소는 로드 되지 않을 것입니다.
이유가 궁금하다면 [FAQ entry](faqs/why-can't-composer-load-repositories-recursively.md) 문서를 읽어 보시기 바랍니다.

## 타입

### Composer

주 저장소 타입은 `composer` 저장소 입니다.
전체 패키지 메타데이터를 담고있는 하나의 `packages.json` 파일을 사용합니다.

또한, packagist가 사용하는 저장소 타입입니다.
`composer` 저장소를 참조하려면, `packages.json` 파일 이전에 경로를 적용하기만 하면 됩니다.
packagist의 경우, `/packages.json` 위치에 파일이 있고, 저장소 URL은 `packagist.org` 입니다.
`example.org/packages.json`의 저장소 URL은 `example.org`가 될 것입니다.

#### packages

필수 필드는 `packages` 밖에 없습니다. JSON 구조는 아래와 같습니다.

```json
{
    "packages": {
        "vendor/package-name": {
            "dev-master": { @composer.json },
            "1.0.x-dev": { @composer.json },
            "0.0.1": { @composer.json },
            "1.0.0": { @composer.json }
        }
    }
}
```

`@composer.json` 표시는  아래와 같은 최소한의 패키지 버전을 담고 있는 `composer.json`의 내용이 됩니다.

* name
* version
* dist 혹은 source

최소 패키지는 아래와 같습니다.

```json
{
    "name": "smarty/smarty",
    "version": "3.1.7",
    "dist": {
        "url": "http://www.smarty.net/files/Smarty-3.1.7.zip",
        "type": "zip"
    }
}
```

여기에 [schema](04-schema.md)에 있는  다른 필드 정보도 명시할 수도 있습니다.

#### notify-batch

`notify-batch` 필드는 사용자가 패키지를 설치할 때 매번 호출하게 될 URL을 지정할 수 있습니다.
URL은 절대 경로(저장소와 동일한 도메인을 사용하게 게 됨)나 절대 표기 방식의 URL이 될 수 있습니다.

예제:

```json
{
    "notify-batch": "/downloads/"
}
```

For `example.org/packages.json` containing a `monolog/monolog` package, this
would send a `POST` request to `example.org/downloads/` with following
JSON request body:

`monolog/monolog` 패키지가 들어있는 `example.org/packages.json`이 있다고 하면,  `example.org/downloads/`로 아래와 같은 JSON 요청 body를 담아 `POST` 요청을 하게 될 것입니다.

```json
{
    "downloads": [
        {"name": "monolog/monolog", "version": "1.2.1.0"},
    ]
}
```

`version` 필드는 정규 표현 방식의 버전 넘버를 따릅니다.

이 필드는 선택사항 입니다.

#### includes

규모가 큰 저장소를 위해 `packages.json`을 여러개의 파일로 분리하는 기능을 제공합니다.
`includes` 필드를 사용하면  참조할 파일을 추가할 수 있습니다.

예제:

```json
{
    "includes": {
        "packages-2011.json": {
            "sha1": "525a85fb37edd1ad71040d429928c2c0edec9d17"
        },
        "packages-2012-01.json": {
            "sha1": "897cde726f8a3918faf27c803b336da223d400dd"
        },
        "packages-2012-02.json": {
            "sha1": "26f911ad717da26bbcac3f8f435280d13917efa5"
        }
    }
}
```

파일의 `SHA-1 sum`은 캐시되어 있다가 해시가 변경될 경우에만 재요청 하게 됩니다.



This field is optional. You probably don't need it for your own custom repository.

###[검수필]
이 필드는 선택사항 입니다. 별도로 구축한 저장소를 사용한다면 아마 필요하지 않을 것입니다.

#### provider-includes 와 providers-url

For very large repositories like packagist.org using the so-called provider
files is the preferred method. The `provider-includes` field allows you to
list a set of files that list package names provided by this repository. The
hash should be a sha256 of the files in this case.

The `providers-url` describes how provider files are found on the server. It
is an absolute path from the repository root.

An example:

```json
{
    "provider-includes": {
        "providers-a.json": {
            "sha256": "f5b4bc0b354108ef08614e569c1ed01a2782e67641744864a74e788982886f4c"
        },
        "providers-b.json": {
            "sha256": "b38372163fac0573053536f5b8ef11b86f804ea8b016d239e706191203f6efac"
        }
    },
    "providers-url": "/p/%package%$%hash%.json"
}
```

Those files contain lists of package names and hashes to verify the file
integrity, for example:

```json
{
    "providers": {
        "acme/foo": {
            "sha256": "38968de1305c2e17f4de33aea164515bc787c42c7e2d6e25948539a14268bb82"
        },
        "acme/bar": {
            "sha256": "4dd24c930bd6e1103251306d6336ac813b563a220d9ca14f4743c032fb047233"
        }
    }
}
```

The file above declares that acme/foo and acme/bar can be found in this
repository, by loading the file referenced by `providers-url`, replacing
`%package%` by the package name and `%hash%` by the sha256 field. Those files
themselves just contain package definitions as described [above](#packages).

위에 선언한 파일은 
 [above](#packages)
 
This field is optional. You probably don't need it for your own custom
repository.
###[검수필]
이 필드는 선택사항 입니다. 별도로 구축한 저장소를 사용한다면 아마 필요하지 않을 것입니다.

#### stream options

`packages.json` 파일은 PHP stream을 통해 적재됩니다.
`options` 파라미터를 통해 stream에 추가 옵션을 설정할 수 있습니다.
PHP stream context 옵션 이라면 어떤 것이든 설정할 수 있습니다.
추가 정보를 얻으려면 [컨택스트 옵션과 인수](http://php.net/manual/kr/context.php)을 확인하세요.


# XXX: ------------ 여기까지 ---------------------

### VCS

VCS stands for version control system. This includes versioning systems like
git, svn or hg. Composer has a repository type for installing packages from
these systems.

#### Loading a package from a VCS repository

There are a few use cases for this. The most common one is maintaining your
own fork of a third party library. If you are using a certain library for your
project and you decide to change something in the library, you will want your
project to use the patched version. If the library is on GitHub (this is the
case most of the time), you can simply fork it there and push your changes to
your fork. After that you update the project's `composer.json`. All you have
to do is add your fork as a repository and update the version constraint to
point to your custom branch. For version constraint naming conventions see
[Libraries](02-libraries.md) for more information.

Example assuming you patched monolog to fix a bug in the `bugfix` branch:

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/igorw/monolog"
        }
    ],
    "require": {
        "monolog/monolog": "dev-bugfix"
    }
}
```

When you run `php composer.phar update`, you should get your modified version
of `monolog/monolog` instead of the one from packagist.

Note that you should not rename the package unless you really intend to fork
it in the long term, and completely move away from the original package.
Composer will correctly pick your package over the original one since the
custom repository has priority over packagist. If you want to rename the
package, you should do so in the default (often master) branch and not in a
feature branch, since the package name is taken from the default branch.

If other dependencies rely on the package you forked, it is possible to
inline-alias it so that it matches a constraint that it otherwise would not.
For more information [see the aliases article](articles/aliases.md).

#### Using private repositories

Exactly the same solution allows you to work with your private repositories at
GitHub and BitBucket:

```json
{
    "require": {
        "vendor/my-private-repo": "dev-master"
    },
    "repositories": [
        {
            "type": "vcs",
            "url":  "git@bitbucket.org:vendor/my-private-repo.git"
        }
    ]
}
```

The only requirement is the installation of SSH keys for a git client.

#### Git alternatives

Git is not the only version control system supported by the VCS repository.
The following are supported:

* **Git:** [git-scm.com](http://git-scm.com)
* **Subversion:** [subversion.apache.org](http://subversion.apache.org)
* **Mercurial:** [mercurial.selenic.com](http://mercurial.selenic.com)

To get packages from these systems you need to have their respective clients
installed. That can be inconvenient. And for this reason there is special
support for GitHub and BitBucket that use the APIs provided by these sites, to
fetch the packages without having to install the version control system. The
VCS repository provides `dist`s for them that fetch the packages as zips.

* **GitHub:** [github.com](https://github.com) (Git)
* **BitBucket:** [bitbucket.org](https://bitbucket.org) (Git and Mercurial)

The VCS driver to be used is detected automatically based on the URL. However,
should you need to specify one for whatever reason, you can use `git`, `svn` or
`hg` as the repository type instead of `vcs`.

If you set the `no-api` key to `true` on a github repository it will clone the
repository as it would with any other git repository instead of using the
GitHub API. But unlike using the `git` driver directly, composer will still
attempt to use github's zip files.

#### Subversion Options

Since Subversion has no native concept of branches and tags, Composer assumes
by default that code is located in `$url/trunk`, `$url/branches` and
`$url/tags`. If your repository has a different layout you can change those
values. For example if you used capitalized names you could configure the
repository like this:

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "http://svn.example.org/projectA/",
            "trunk-path": "Trunk",
            "branches-path": "Branches",
            "tags-path": "Tags"
        }
    ]
}
```

If you have no branches or tags directory you can disable them entirely by
setting the `branches-path` or `tags-path` to `false`.

If the package is in a sub-directory, e.g. `/trunk/foo/bar/composer.json` and
`/tags/1.0/foo/bar/composer.json`, then you can make composer access it by
setting the `"package-path"` option to the sub-directory, in this example it
would be `"package-path": "foo/bar/"`.

If you have a private Subversion repository you can save credentials in the
http-basic section of your config (See [Schema](04-schema.md)):

```json
{
    "http-basic": {
        "svn.example.org": {
            "username": "username",
            "password": "password"
        }
    }
}
```

If your Subversion client is configured to store credentials by default these
credentials will be saved for the current user and existing saved credentials
for this server will be overwritten. To change this behavior by setting the
`"svn-cache-credentials"` option in your repository configuration:

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "http://svn.example.org/projectA/",
            "svn-cache-credentials": false
        }
    ]
}
```

### PEAR

It is possible to install packages from any PEAR channel by using the `pear`
repository. Composer will prefix all package names with `pear-{channelName}/` to
avoid conflicts. All packages are also aliased with prefix `pear-{channelAlias}/`

Example using `pear2.php.net`:

```json
{
    "repositories": [
        {
            "type": "pear",
            "url": "http://pear2.php.net"
        }
    ],
    "require": {
        "pear-pear2.php.net/PEAR2_Text_Markdown": "*",
        "pear-pear2/PEAR2_HTTP_Request": "*"
    }
}
```

In this case the short name of the channel is `pear2`, so the
`PEAR2_HTTP_Request` package name becomes `pear-pear2/PEAR2_HTTP_Request`.

> **Note:** The `pear` repository requires doing quite a few requests per
> package, so this may considerably slow down the installation process.

#### Custom vendor alias

It is possible to alias PEAR channel packages with a custom vendor name.

Example:

Suppose you have a private PEAR repository and wish to use Composer to
incorporate dependencies from a VCS. Your PEAR repository contains the
following packages:

 * `BasePackage`
 * `IntermediatePackage`, which depends on `BasePackage`
 * `TopLevelPackage1` and `TopLevelPackage2` which both depend on `IntermediatePackage`

Without a vendor alias, Composer will use the PEAR channel name as the
vendor portion of the package name:

 * `pear-pear.foobar.repo/BasePackage`
 * `pear-pear.foobar.repo/IntermediatePackage`
 * `pear-pear.foobar.repo/TopLevelPackage1`
 * `pear-pear.foobar.repo/TopLevelPackage2`

Suppose at a later time you wish to migrate your PEAR packages to a
Composer repository and naming scheme, and adopt the vendor name of `foobar`.
Projects using your PEAR packages would not see the updated packages, since
they have a different vendor name (`foobar/IntermediatePackage` vs
`pear-pear.foobar.repo/IntermediatePackage`).

By specifying `vendor-alias` for the PEAR repository from the start, you can
avoid this scenario and future-proof your package names.

To illustrate, the following example would get the `BasePackage`,
`TopLevelPackage1`, and `TopLevelPackage2` packages from your PEAR repository
and `IntermediatePackage` from a Github repository:

```json
{
    "repositories": [
        {
            "type": "git",
            "url": "https://github.com/foobar/intermediate.git"
        },
        {
            "type": "pear",
            "url": "http://pear.foobar.repo",
            "vendor-alias": "foobar"
        }
    ],
    "require": {
        "foobar/TopLevelPackage1": "*",
        "foobar/TopLevelPackage2": "*"
    }
}
```

### Package

If you want to use a project that does not support composer through any of the
means above, you still can define the package yourself by using a `package`
repository.

Basically, you define the same information that is included in the `composer`
repository's `packages.json`, but only for a single package. Again, the
minimum required fields are `name`, `version`, and either of `dist` or
`source`.

Here is an example for the smarty template engine:

```json
{
    "repositories": [
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
                },
                "autoload": {
                    "classmap": ["libs/"]
                }
            }
        }
    ],
    "require": {
        "smarty/smarty": "3.1.*"
    }
}
```

Typically you would leave the source part off, as you don't really need it.

> **Note**: This repository type has a few limitations and should be avoided
> whenever possible:
>
> - Composer will not update the package unless you change the `version` field.
> - Composer will not update the commit references, so if you use `master` as
>   reference you will have to delete the package to force an update, and will
>   have to deal with an unstable lock file.

## Hosting your own

While you will probably want to put your packages on packagist most of the time,
there are some use cases for hosting your own repository.

* **Private company packages:** If you are part of a company that uses composer
  for their packages internally, you might want to keep those packages private.

* **Separate ecosystem:** If you have a project which has its own ecosystem,
  and the packages aren't really reusable by the greater PHP community, you
  might want to keep them separate to packagist. An example of this would be
  wordpress plugins.

For hosting your own packages, a native `composer` type of repository is
recommended, which provides the best performance.

There are a few tools that can help you create a `composer` repository.

### Packagist

The underlying application used by packagist is open source. This means that you
can just install your own copy of packagist, re-brand, and use it. It's really
quite straight-forward to do. However due to its size and complexity, for most
small and medium sized companies willing to track a few packages will be better
off using Satis.

Packagist is a Symfony2 application, and it is [available on
GitHub](https://github.com/composer/packagist). It uses composer internally and
acts as a proxy between VCS repositories and the composer users. It holds a list
of all VCS packages, periodically re-crawls them, and exposes them as a composer
repository.

To set your own copy, simply follow the instructions from the [packagist
github repository](https://github.com/composer/packagist).

### Satis

Satis is a static `composer` repository generator. It is a bit like an ultra-
lightweight, static file-based version of packagist.

You give it a `composer.json` containing repositories, typically VCS and
package repository definitions. It will fetch all the packages that are
`require`d and dump a `packages.json` that is your `composer` repository.

Check [the satis GitHub repository](https://github.com/composer/satis) and
the [Satis article](articles/handling-private-packages-with-satis.md) for more
information.

### Artifact

There are some cases, when there is no ability to have one of the previously
mentioned repository types online, even the VCS one. Typical example could be
cross-organisation library exchange through built artifacts. Of course, most
of the times they are private. To simplify maintenance, one can simply use a
repository of type `artifact` with a folder containing ZIP archives of those
private packages:

```json
{
    "repositories": [
        {
            "type": "artifact",
            "url": "path/to/directory/with/zips/"
        }
    ],
    "require": {
        "private-vendor-one/core": "15.6.2",
        "private-vendor-two/connectivity": "*",
        "acme-corp/parser": "10.3.5"
    }
}
```

Each zip artifact is just a ZIP archive with `composer.json` in root folder:

```sh
unzip -l acme-corp-parser-10.3.5.zip

composer.json
...
```

If there are two archives with different versions of a package, they are both
imported. When an archive with a newer version is added in the artifact folder
and you run `update`, that version will be imported as well and Composer will
update to the latest version.

## Disabling Packagist

You can disable the default Packagist repository by adding this to your
`composer.json`:

```json
{
    "repositories": [
        {
            "packagist": false
        }
    ]
}
```

&larr; [Schema](04-schema.md)  |  [Community](06-community.md) &rarr;
