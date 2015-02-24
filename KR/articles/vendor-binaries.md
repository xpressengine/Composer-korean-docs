
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


## vendor binar가 설정된 composer.json 을 기반으로 컴포저가 구동될 때 어떤 일이 일어 나나요?

컴포저는 모든 의존 패키지들에 정의 된 바이너리를 찾습니다. 그 후 `vendor/bin` 디렉토리에 각각의 의존 패키지들의 바이너리 에 연결되는 심볼릭 링크가 생성됩니다. 

`my-vendor/project-a` 패키지가 다음과 같은 바이너리를 가지고 있다고 해봅시다:

```json
{
    "name": "my-vendor/project-a",
    "bin": ["bin/project-a-bin"]
}
```

이 `composer.json`을 기반으로 `composer install` 이 실행될 때에는 `bin/project-a-bin` 과 관련된 어떤 것도 싱행되지는 않을 것입니다. 

하지만 `my-vendor/project-b` 프로젝트가 다음과 같이 의존성을 가지고 있다고 해봅시다:


```json
{
    "name": "my-vendor/project-b",
    "require": {
        "my-vendor/project-a": "*"
    }
}
```

이 `composer.json`을 기반으로 `composer install`이 실행 될 때에는 project-b의 의존성을 체크하고 `vendor/bin` 을 설치하게 됩니다. 

이 경우 컴포저는 `vendor/bin/project-a-bin`로 연결이 가능한 `vendor/my-vendor/project-a/bin/project-a-bin`를 생성합니다. 유닉스-like 플랫폼인 경우, 이 연결은 심폴릭 링크로 구성됩니다. 


## 윈도우와 .bat 확장자 파일의 경우는 어떻습니까?

패키지들은 컴포저에 의해서 전적으로 관리되며 윈도우에서의 호환성을 위해서 특별히 `.bat`확장자 파일을 *포함할 필요는 없습니다.* 컴포저는 윈도우 환경에서 구동되기 위해서 바이너리들의 설치를 특별한 방법으로 처리합니다. 

 * 각 바이너리를 참조하기 위해서 `.bat` 파일이 자동으로 생성됩니다. 
 * 바이너리와 동일한 이름을 가지는 유닉스 스타일의 프록시 파일이 생성됩니다. (Cygwin 또는 Git Bash 등에서 유용한)
   

컴포저를 포함하지 않은 워크플로우를 지원해야 하는 패키지의 경우 커스텀 `.bat` 파일을 지원할 수도 있습니다. 
이러한 경우 패키지는 바이너리의 표시로 `.bat` 파일을 지정하지 않아야 합니다. 


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
