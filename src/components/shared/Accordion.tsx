import classNames from 'classnames/bind'
import { PropsWithChildren, useState } from 'react'
import styles from './Accordion.module.scss'

const cx = classNames.bind(styles)

interface AccordionProps {
  label: string
}

function Accordion({ label, children }: PropsWithChildren<AccordionProps>) {
  const [expanded, setExpanded] = useState(false)

  const handleToggle = () => {
    setExpanded((prev) => !prev)
  }
  return (
    <div className={cx([`wrap-accordion`, expanded ? 'open' : ''])}>
      <div className={cx(`wrap-header`)} onClick={handleToggle}>
        <div>{label}</div>
        <IconArrowDown className={cx(`icon-arrow-down`)} />
      </div>
      <div className={cx(`wrap-content`)}>{children}</div>
    </div>
  )
}
export default Accordion

function IconArrowDown({ className }: { className: string }) {
  return (
    <svg
      className={className}
      enable-background="new 0 0 50 50"
      height="50px"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 50 50"
      width="50px"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect fill="none" height="50" width="50" />
      <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
    </svg>
  )
}
