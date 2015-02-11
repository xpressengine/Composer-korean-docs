
# Vendor binaries 와 `vendor/bin` 디렉토리

## vendor binary란?

사용자가 컴포저 패키지 인스톨을 통해서 받은 패키지가 포함하고 있는 커맨드 라인 스크립트같은 것들을 vendor binary라고 합니다. 

만약 패키지가 구동에 필요로 하지 않는 (빌드나, 컴파일 스크립트와 같은) 다른 스크립트들을 포함하고 있다면 이러한 것들은 벤더 바이너리에 위치하지 않도록 해야합니다. 


## 어떻게 설정하는가?

Vendor binaries는 `composer.json`에 `bin` 항목을 추가하여 설정할 수 있습니다. 프로젝트에 여러개의 파일을 필요로 한다면 배열 형식으로 설정하면 됩니다. 

```json
{
    "bin": ["bin/my-script", "bin/my-other-script"]
}
```

## composer.json 파일에 vendor binary 를 정의하는 것은 무엇을 의미하나요?

컴포저가 프로젝트와 해당 프로젝트가 의존하는 프로젝트들을 설치 할 때 패키지의 바이너리들을 `vendor/bin` 디렉토리에 설
치하도록 합니다. 

이렇게 하면 실행하려는 스크립트들을 손쉽게 확인할 수 있게 합니다. 그렇지 않으면 이 파일들은 `vendor/` 디렉토리 깊숙히 위치하고 있기 때문에 알기가 어렵습니다. 


## composer.json 파일에 vendor binaries 를 정의하면 컴포저가 실행될 때 어떤 일이 일어 나나요?

패키지가 직접 지정하는 바이너리를 위해서는, 아무일도 일어나지 않습니다.


## What happens when Composer is run on a composer.json that has dependencies with vendor binaries listed?

Composer looks for the binaries defined in all of the dependencies. A
symlink is created from each dependency's binaries to `vendor/bin`.

Say package `my-vendor/project-a` has binaries setup like this:

```json
{
    "name": "my-vendor/project-a",
    "bin": ["bin/project-a-bin"]
}
```

Running `composer install` for this `composer.json` will not do
anything with `bin/project-a-bin`.

Say project `my-vendor/project-b` has requirements setup like this:

```json
{
    "name": "my-vendor/project-b",
    "require": {
        "my-vendor/project-a": "*"
    }
}
```

Running `composer install` for this `composer.json` will look at
all of project-b's dependencies and install them to `vendor/bin`.

In this case, Composer will make `vendor/my-vendor/project-a/bin/project-a-bin`
available as `vendor/bin/project-a-bin`. On a Unix-like platform
this is accomplished by creating a symlink.


## 윈도우와 .bat 확장자 파일의 경우는 어떻습니까?

Packages managed entirely by Composer do not *need* to contain any
`.bat` files for Windows compatibility. Composer handles installation
of binaries in a special way when run in a Windows environment:

 * A `.bat` file is generated automatically to reference the binary
 * A Unix-style proxy file with the same name as the binary is generated
   automatically (useful for Cygwin or Git Bash)

Packages that need to support workflows that may not include Composer
are welcome to maintain custom `.bat` files. In this case, the package
should **not** list the `.bat` file as a binary as it is not needed.


## vendor binaries를 vendor/bin 이외에 다른 곳에 설치가 가능한가요?

물론 가능하며, 다른곳에 위치하기 위한 2가지 방법이 존재합니다. 

 1. `composer.json` 파일에 `bin-dir` 설정을 추가하거나 `composer.json`
 1. `COMPOSER_BIN_DIR` 환경변수를 설정하는 방법입니다. 

설정을 지정한 예는 다음과 같은 형태일 것입니다. :

```json
{
    "config": {
        "bin-dir": "scripts"
    }
}
```

`composer.json`에 위와 같이 지정하고 `composer install`을 실행하면 `vendor/bin/` 대신에 `scripts/` 폴더에 vendor binaries 를 설치합니다. 

`bin-dir`을 `./`와 같이 설정하여 프로젝트 루트 디렉토리로 지정할 수도 있습니다. 
