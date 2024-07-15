import classNames from 'classnames/bind'
import style from './Section.module.scss'

const cx = classNames.bind(style)

function Section({
  children,
  className,
  title,
}: {
  children: React.ReactNode
  className?: string
  title?: React.ReactNode
}) {
  return (
    <section className={cx(`container`, className)}>
      {title !== null ? <div className={cx(`txt-title`)}>{title}</div> : null}
      {children}
    </section>
  )
}
export default Section
