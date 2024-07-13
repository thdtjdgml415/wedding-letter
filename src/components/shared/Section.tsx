import classNames from 'classnames/bind'
import style from './Section.module.scss'

const cx = classNames.bind(style)

function Section({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <section className={cx(`container`, className)}>{children}</section>
}
export default Section
