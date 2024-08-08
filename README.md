# 나만의 첨첩장

![이미지](https://raw.githubusercontent.com/thdtjdgml415/next-blog/main/assets/img/wedding/wedding0.webp)

npm을 왜 사용하지 않을까?

무겁고 복잡한 node_modules, 프로젝트 의존성이 많아지면 너무거대하고 복잡해진다

비효율적인 의존성 검색 - 여러 패키지들이 동일한 의존성을 공유하는데 새로 설치하게 되어도 중복설치된다. 파일시스템으로 관리하기 때문

비효율적인 설치 - 각각 다른 버전의 라이브러리를 쓸때 중복설치 될 수가 있음

유령의존성 - 호이스팅을 이르킨다.

### **Plug'n'Play**

pnp.cjs 파일에서 node_module대신 사용된다.

그러면 yarn berry는?

- 효율적인 의존성 검색
- 엄격한 의존성관리
- CI 시간 단축

```jsx
// node module을 사용하지 않고 베리를 사용하도록 함
yarn set version berry
```

```yaml
// yarnrc파일에서 nodeLinker을 설정하고
yarnPath: .yarn/releases/yarn-4.3.1.cjs
nodeLinker: pnp

// yarn intall 명령어 실행
.pnp.cjs -- 의존성 관리
.pnp.loader.mjs

yarn dlx @yarnpkg/sdks vscode
```

- yarn 모듈은 설치했을때 모듈이 zip파일로 압축되어 설치된다. 하지만 vscode는 아직 zip파일을 읽지 못하기 때문에 따로 extenion을 설치해 읽도록 추가해 주어야함

![이미지](https://raw.githubusercontent.com/thdtjdgml415/next-blog/main/assets/img/wedding/wedding1.webp)

### Craco Alias 설정

1. yarn add -D @craco/craco
2. yarn add -D craco/alias
3. tsconfig.paths.json 정의
4. craco.config.js 정의
5. tsconfig파일에 tsconfig.paths.json extends 시켜서 사용하기

### 폰트 설정

![이미지](https://raw.githubusercontent.com/thdtjdgml415/next-blog/main/assets/img/wedding/wedding2.webp)

다양한 폰트를 적용해야 지원범위가 다른 브라우저에 대응할 수 있다.

웹 폰트를 link를 사용해 가져오게되면 외부에서 폰트를 불러와 적용해야하기 때문에 초기 로딩속도에 문제가 있을 수도 있고 문제가 생겨 폰트가 적용이 안될 수 있다.

직접 다운받아 사용할 시 외부와 상관없이 항상 같은 폰트 사용을 강제할 수 있고 초기 로딩속도에 좋다. 단, 소스코드에 포함되기 때문에 용량상 문제가 있을 수 있다.

나는 직접 다운받아 사용했다.

### 비디오

```jsx
<video controls width="250">
  <source src="/media/cc0-videos/flower.webm" type="video/webm" />
  <source src="/media/cc0-videos/flower.mp4" type="video/mp4" />
  Download the
  <a href="/media/cc0-videos/flower.webm">WEBM</a>
  or
  <a href="/media/cc0-videos/flower.mp4">MP4</a>
  video.
</video>
```

비디오를 사용할대 mp4와 webM을 많이 사용하는데 webM은 구글에서 만들었고 고화질 동영상을 지원하여 효과적이지만 mp4와 다르게 많은 브라우저에서 지원하지 않는다. 그래서 위와 같이 WEBM이 지원하지 않으면 MP4를 사용하도록 한다.

### 중요속성

- Video Poster속성 - 동영상이 로딩될 때 또는 재생버튼을 누르기 전까지 보여줄 이미지

### 적응형 비트레이트 스트리밍

네트워크 탭에서 확인해보면 시간이 지남에 따라 여러번 나누어서 동영상을 다운받을 수 있다.

![이미지](https://raw.githubusercontent.com/thdtjdgml415/next-blog/main/assets/img/wedding/wedding3.webp)

이를 적응형 비트 프로토콜이라한다. 스트리밍 프로토콜은 동영상을 여러개의 세그먼트로 나누어 연속적으로 다운 받는다. 네트워크 상태에 따라 영상의 화질을 조절해 다운 받도록 조절할 수 있다.

실시간이나 네트워크가 불안정한 모바일에서 적용할 수 있다.

### 외부 비동기 api 동기처리

```tsx
const mapContainer = useRef(null)

useEffect(() => {
  const script = document.createElement('script')
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&autoload=false`
  script.async = true

  document.head.appendChild(script)

  script.onload = () => {
    window.kakao.maps.load(() => {
      const position = new window.kakao.maps.LatLng(location.lat, location.lng)

      const options = {
        center: position,
        level: 3,
      }
      const marker = new window.kakao.maps.Marker({
        position,
      })
      const map = new window.kakao.maps.Map(mapContainer.current, options)
      marker.setMap(map)
    })
  }
}, [location])
```

카카오 맵 api 사용시 비동기로 데이터를 불러와 사이드 이펙트가 발생할 수 있는 상황이 있었다. 이때 `autoload=false` 기능을 사용해 자동으로 load될 시점을 선택하지 않고 직접 load될 시점을 선택할 수 있도록 구현하였다.

script url을 불러와 컴포넌트가 마운트되는 시점에 카카오 맵에서 endpoint를 가져와 `mapContainer` 변수에 저장한 후 사용했다.

이렇게 사용하면 원하는 시점에 지도를 출력해 사용할 수 있기 때문에 사이드 이펙트를 예방할 수 있다.

### Context 사용

Context api는 react 16v 이상 부터 도입된 훅이다.

컴포넌트에서 props drilling이 심해지거나 전역 상태관리를 위해 사용되는 개념이다.

이는 애플리케이션에서 컴포넌트마다 props를 넘겨 공유하지 않아도 된다.

### 사용방법

```tsx
const defaultValue: ModalProps = {
  open: false,
  body: null,
  onRightButtonClick: () => {},
  onLeftButtonClick: () => {},
}
```

- 우선 모달을 사용하기 위한 초기값을 지정한다.
  1. 모달의 열림 상태를 위해 open 값, 본문내용, 버튼함수를 지정

```tsx
export function ModalContext({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState(defaultValue)
  const $portal_root = document.getElementById('root-portal')
  const open = (options: ModalOptions) => {
    setModalState({ ...options, open: true })
  }
  const close = () => {
    setModalState(defaultValue)
  }

  const values = {
    open,
    close,
  }
  return (
    <Context.Provider value={values}>
      {children}
      {$portal_root != null
        ? createPortal(<Modal {...modalState} />, $portal_root)
        : null}
    </Context.Provider>
  )
}
```

- state를 통해 context에서 사용할 값을 저장하고 렌더링 시킨다.
- portal라이브러리를 사용해 modal이 렌더링 시 최상단 dom으로 고정시킨다.
- value값을 통해서 provider에 공유할 값을 넘긴다.

```tsx
export function useModalContext() {
  const values = useContext(Context)

  if (values == null) {
    throw new Error('컨텍스트의 값을 찾을 수 없습니다.')
  }
  return values
}
```

컨텍스트를 잘못 사용할 시에 대비해 예외처리한다.

## 최적화

### 동영상 최적화

1. 동영상 압축
   1. [https://compress.media.io/app/video-compresso](https://compress.media.io/app/video-compressor)r를 사용해 압축
   2. 영상의 길이를 압축한다.
2. 동영상 길이 줄이기
3. 적절한 동영상 포맷 사용
4. CDN 서비스 사용

### 이미지 최적화

1. 클라우드너리를 활용해 이미지 최적화 도전
2. https://squoosh.app/editor사이트로 이미지 최적화
3. 클라우드에 있는 이미지 경로로 옵션을 주어 브라우저 상에 나타나는 이미지 사이즈 수정

### 폰트 최적화

- FOIT - 폰트가 다운되어지지 않으면 글씨를 나타내지 않는다.
- FOUT - 기본폰트를 먼저 노출하고 폰트 다운시 폰트 교체

![이미지](https://raw.githubusercontent.com/thdtjdgml415/next-blog/main/assets/img/wedding/wedding4.webp)

- Subset (필요한 글자들만 추려서 폰트만들기)
- **webpack-font-preload-plugin - font 프리로딩사용**

### 렌더링 최적화

- memo : props가 바뀌지 않는 이상 렌더링 되지 않는다.
  - 데이터가 계속 바뀌면 뭔가 계산을 추가적으로 진행하기 때문에 신중하게 사용해야함
- useCallback: 함수를 재사용 하기 위해 사용 특히 모달창
  - 컨텍스트를 통해 만든 모달창을 최적화

### 모달 최적화

현재 코드에서는 `context`로 모달창에 사용할 데이터를 `state`로 넘겨받고 `state`의 변함에 따라 렌더링 시키고 있다.

하지만 이렇게 사용하면 기술적으로 문제가 있다.

여기 모달 컴포넌트를 봐보자

```jsx
function AttendCountModal({ wedding }: { wedding: Wedding }) {
  const { open, close } = useModalContext()
  const $input = useRef<HTMLInputElement>(null)

  const haveSeenModal = localStorage.getItem('@have-seen-modal')

  useEffect(() => {
    if (haveSeenModal === 'true') return
    open({
      title: `현재 참석자 ${wedding.attendCount}`,
      body: (
        <div>
          <input
            ref={$input}
            type="number"
            placeholder="참석하실 인원을 입력해주세요."
            style={{ width: '100%' }}
          />
        </div>
      ),
      onRightButtonClick: async () => {
        if ($input.current == null) {
          return
        }
        await fetch('http://localhost:8888/wedding', {
          method: 'PUT',
          body: JSON.stringify({
            ...wedding,
            attendCount: wedding.attendCount + Number($input.current.value),
          }),
          headers: {
            'Content-type': 'application/json',
          },
        })
        localStorage.setItem('@have-seen-modal', 'true')
        close()
      },
      onLeftButtonClick: () => {
        localStorage.setItem('@have-seen-modal', 'true')
        close()
      },
    })
     // 무한렌더링
  }, [open, close, wedding, haveSeenModal])
  return null
}
export default AttendCountModal
```

모달 컴포넌트는 useEffect를 사용해 의존성을 추가해 해당 의존성이 변경될때마다 useEffect가 실행되고 있다.

하지만 무한 렌더링에 빠진다.

이유가 무엇일까?

이유는 아래에 ModalContext를 봐보자.

```jsx
export function ModalContext({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState(defaultValue)
  const $portal_root = document.getElementById('root-portal')

  const open = (options: ModalOptions) => {
    setModalState({ ...options, open: true })
  }
  const close = () => {
    setModalState(defaultValue)
  }

  const values = {
    open,
    close,
  }
  return (
    <Context.Provider value={values}>
      {children}
      {$portal_root != null
        ? createPortal(<Modal {...modalState} />, $portal_root)
        : null}
    </Context.Provider>
  )
}
```

`open` 함수는 단순히 모달을 통해 들어온 값을 변경해주는 역할을 하고 있다. 이렇게 사용하게 되면 `useEffect`에서 `open` 함수가 변하게되면 `ModalContext`를 다시 렌더링 시키고 `Context`로 감싼 하위 컴포넌트들도 렌더링 되면서 다시 `Modal`함수를 렌더링시킨다. 이 과정이 계속 반복되기 때문이다.

이를 막기 위해서 `useCallback`을 사용한다.

```tsx
import React, {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import Modal from '@/components/shared/Modal'
import { createPortal } from 'react-dom'

type ModalProps = ComponentProps<typeof Modal>
type ModalOptions = Omit<ModalProps, 'open'>

interface ModalContextValue {
  open: (option: ModalOptions) => void
  close: () => void
}

const Context = createContext<ModalContextValue | undefined>(undefined)

const defaultValue: ModalProps = {
  open: false,
  body: null,
  onRightButtonClick: () => {},
  onLeftButtonClick: () => {},
}

export function ModalContext({ children }: { children: React.ReactNode }) {
  const [modalState, setModalState] = useState(defaultValue)
  const $portal_root = document.getElementById('root-portal')

  const open = useCallback((options: ModalOptions) => {
    setModalState({ ...options, open: true })
  }, [])

  const close = useCallback(() => {
    setModalState(defaultValue)
  }, [])

  const values = useMemo(
    () => ({
      open,
      close,
    }),
    [open, close],
  )

  return (
    <Context.Provider value={values}>
      {children}
      {$portal_root != null
        ? createPortal(<Modal {...modalState} />, $portal_root)
        : null}
    </Context.Provider>
  )
}

export function useModalContext() {
  const values = useContext(Context)

  if (values == null) {
    throw new Error('컨텍스트의 값을 찾을 수 없습니다.')
  }
  return values
}
```

`useCallback`은 함수를 메모리에 저장해놓고 의존성의 값이 변했을때 변경시킨다. 위에서 `open`의 의존성은 비어있기때문에 초기 렌더링시 캐싱되고 외부 값에 영향을 받지 않는다. 따라서 렌더링 되어도 값이 변하지 않기 때문에 `useEffect`가 실행되어도 함수는 변하지 않는다.

### Suspense, ErrorBoundary

이전에 로딩처리와 에러처리를 위해서 데이터를 불러올때 마다 각각 로딩과 에러를 예외처리해 주었다.

```tsx
import classNames from 'classnames/bind'
import { useState } from 'react'
import styles from './App.module.scss'

import AttendCountModal from './components/AttendCountModal'
import Calendar from './components/sections/Calendar'
import Contact from './components/sections/Contact'
import Heading from './components/sections/Heading'
import ImageGallery from './components/sections/ImageGallery'
import Invitation from './components/sections/Invitation'
import Map from './components/sections/Map'
import Share from './components/sections/Share'
import Video from './components/sections/Video'
import Intro from './components/shared/Intro'
import useWedding from './hooks/useWedding'

const cx = classNames.bind(styles)

function App() {
  const { wedding, isLoading, error } = useWedding()
  const [count, setCount] = useState(0)
  // 1. wedding 데이터 호출

  if (isLoading) return <div>로딩중</div>
  if (error) return <div>에러</div>
  if (wedding == null) return null

  const { date, galleryImages, groom, bride, location, message } = wedding

  return (
    <div className={cx('container')}>
      <button
        style={{ position: 'fixed', top: 0 }}
        onClick={() => {
          setCount((prev) => prev + 1)
        }}
      >
        + {count}
      </button>
      <Heading date={date} />
      <Video />
      <Intro
        groomName={groom.name}
        brideName={bride.name}
        locationName={location.name}
        date={date}
        message={message.intro}
      />
      <Invitation message={message.invitation} />
      <ImageGallery images={galleryImages} />
      <Calendar date={date} />
      <Map location={location} />
      <Contact groom={groom} bride={bride} />
      <Share groomName={groom.name} brideName={bride.name} date={date} />
      <AttendCountModal wedding={wedding} />
    </div>
  )
}

export default App
```

이는 로직의 역할분리가 부족했다. 데이터를 불러오고 로딩과 에러처리는 그리고 데이터를 그려주는 영역을 분리해주고 싶었다.

이때 `Suspense`와 `ErrorBoundary`를 사용했다.

```jsx
<ErrorBoundary fallbackUI={<FullScreenMessage type="error" />}>
  <Suspense fallback={<FullScreenMessage type="loading" />}>
    <App />
  </Suspense>
</ErrorBoundary>
```

### Suspense

Suspense는 React에 따로 내장되어있다. index.ts파일에서 최상단에서 데이터를 불러오기전에 로딩해주기 때문에 초기에 데이터에 undefined가 되어지는 상태를 막을 수 있다. 또한 UX적으로 페이지를 불러오고 로딩이 끝나기 때문에 좋다.

### ErrorBoundary

데이터를 불러오며 에러가 생겼을때 사용한다. 이는 class에서 처리를 하며

```tsx
import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallbackUI?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log('error', error)
    console.log('errorInfo', errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallbackUI ?? <div>에러가 발생했습니다.</div>
    }

    return this.props.children
  }
}
export default ErrorBoundary
```

로딩중에 데이터를 가져오는게 에러가 발생하면 에러화면을 대신 넣어줄 수 있다.

## 개인적인 Error 발생

![이미지](https://raw.githubusercontent.com/thdtjdgml415/next-blog/main/assets/img/wedding/wedding5.webp)

scss 모듈파일을 불러올 때. 에러 발생

이유? scss 파일을 모듈로 불러올때 해당 확장자에 대한 타입이 명시 되어있지 않아서 발생하는 에러로 생각된다.

https://www.npmjs.com/package/typed-scss-modules

해당 모듈을 다운 받을 시 자동으로 .scss.d 파일이 생성되어 타입을 명시해준다. 이는 d파일에서 전역적으로 타입을 명시해주며 타입을 인식하도록 도와주기 위해 파일을 생성했다

![이미지](https://raw.githubusercontent.com/thdtjdgml415/next-blog/main/assets/img/wedding/wedding6.webp)
