mini projet - to do list (https://boogling.atlassian.net/browse/MIN-2)
BTC - developer class 
Lee Soonmin 
 
폴더 구조
- **components**
    
    재사용 가능한 컴포넌트들이 위치하는 폴더입니다.
    
    컴포넌트는 매우 많아질 수 있기 때문에 이 폴더 내부에서 하위폴더로 추가로 분류하는 경우가 많습니다.
    
- **hooks (= hoc)**
    
    커스텀 훅이 위치하는 폴더입니다.
    
- **pages**
    
    react router등을 이용하여 라우팅을 적용할 때 페이지 컴포넌트를 이 폴더에 위치시킵니다.
    
- **constants**
    
    공통적으로 사용되는 상수들을 정의한 파일들이 위치하는 폴더입니다.
    
- **config**
    
    config 파일이 많지 않은 경우 보통 최상위에 위치시켜놓지만 여러개의 config 파일이 있을 경우 폴더로 분리하기도 합니다.
    
- **styles**
    
    css 파일들이 포함되는 폴더입니다.
    
- **services (= api)**

보통 api관련 로직의 모듈 파일이 위치하며 auth와 같이 인증과 관련된 파일이 포함되기도 합니다.

- **utils**
    
    정규표현식 패턴이나 공통함수 등 공통으로 사용하는 유틸 파일들이 위치하는 폴더입니다.
    
- **contexts**
    
    contextAPI를 사용할 때 관련 파일들이 위치하는곳으로 상태관리를 위해 contextAPI 대신 redux를 사용 할 경우 폴더 이름을 `store`로 사용하기도 합니다.