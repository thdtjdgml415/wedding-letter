import classNames from 'classnames/bind'
import React from 'react'

import styles from './FullScreenMessage.module.scss'

const cx = classNames.bind(styles)
interface FullScreenMessageProps {
  type: 'loading' | 'error'
}

function FullScreenMessage({ type }: FullScreenMessageProps) {
  return (
    <div className={cx('container')}>
      {type === 'loading' ? (
        <Heart />
      ) : (
        <>
          <Error />
          <p>에러가 발생했어요 잠시후 다시 시도해 주세요..</p>
        </>
      )}
    </div>
  )
}

function Heart() {
  return (
    <svg
      className={cx('icon-heart')}
      height="512px"
      enableBackground="new 0 0 512 512"
      version="1.1"
      viewBox="0 0 512 512"
      width="512px"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g id="_x31_66_x2C__Heart_x2C__Love_x2C__Like_x2C__Twitter">
        <g>
          <path
            d="M365.4,59.628c60.56,0,109.6,49.03,109.6,109.47c0,109.47-109.6,171.8-219.06,281.271    C146.47,340.898,37,278.568,37,169.099c0-60.44,49.04-109.47,109.47-109.47c54.73,0,82.1,27.37,109.47,82.1    C283.3,86.999,310.67,59.628,365.4,59.628z"
            style={{ fill: '#FF7979' }}
          />
        </g>
      </g>
      <g id="Layer_1" />
    </svg>
  )
}

function Error() {
  return (
    <svg
      className={cx('icon-error')}
      height="32"
      enableBackground="new 0 0 512 512"
      style={{ overflow: 'visible' }}
      viewBox="0 0 32 32"
      width="32"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g>
        <g id="Error_1_">
          <g id="Error">
            <circle
              cx="16"
              cy="16"
              id="BG"
              r="16"
              style={{ fill: '#D72828' }}
            />
            <path
              d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z"
              id="Exclamatory_x5F_Sign"
              style={{ fill: '#E6E6E6' }}
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default FullScreenMessage
