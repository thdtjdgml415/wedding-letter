import classNames from 'classnames/bind'
import style from './Video.module.scss'

import Section from '@shared/Section'

const cx = classNames.bind(style)

function Video() {
  return (
    <Section className={cx(`container`)}>
      <video
        autoPlay={true}
        muted={true}
        loop={true}
        controls={true}
        poster="/assets/poster.jpg"
      >
        {/* webm을 우선으로 적용하고 브라우저에서 지원하지 않으면 mp4지정 */}
        <source src="/assets/main.webm" type="video/webm" />
        <source src="/assets/main.mp4" type="video/mp4" />
      </video>
    </Section>
  )
}
export default Video
