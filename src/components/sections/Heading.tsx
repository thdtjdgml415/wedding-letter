import classNames from 'classnames/bind'
import style from './Heading.module.scss'

import Section from '@shared/Section'

const cx = classNames.bind(style)

function Heading() {
  return (
    <Section className={cx(`container`)}>
      <div className={cx(`txt-date`)}>24.10.21</div>
      <div className={cx(`txt-day`)}>OCTOBER</div>
    </Section>
  )
}

export default Heading
