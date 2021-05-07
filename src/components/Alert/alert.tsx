import React, { CSSProperties, FC, MouseEventHandler, ReactNode, useRef, useState } from 'react'
import classNames from 'classnames'
import Transition from '../Transition/transition'
import Icon from '../Icon/icon'

type AlertType = 'success' | 'warning' | 'info' | 'error'

export interface AlertProps {
  type?: AlertType
  closeable?: boolean
  closeText?: ReactNode
  message: ReactNode
  onClose?: MouseEventHandler<HTMLButtonElement>
  afterClose?: () => void
  showIcon?: boolean
  style?: CSSProperties
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  description?: ReactNode
}

const iconMapFilled = {
  success: <Icon icon='check-circle'></Icon>,
  info: <Icon icon='exclamation-circle'></Icon>,
  error: <Icon icon='times-circle'></Icon>,
  warning: <Icon icon='exclamation-triangle'></Icon>,
}

export const Alert: FC<AlertProps> = (props) => {
  const {
    type,
    description,
    message,
    className,
    style,
    onClick,
    afterClose,
    showIcon,
    closeable,
    closeText,
    ...restProps
  } = props
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const lg = description ? 'icon-large' : ''

  const classes = classNames('jsChen-alert-container', {
    [`${type}`]: type,
    [`${type}-border`]: type,
    [`${lg}`]: lg,
  })

  const classesIcon = classNames('icon', {
    [`${type}-icon`]: type,
    [`${lg}`]: lg,
  })

  const renderIcon = () => {
    const iconType = type ? type : 'info'
    return <div className={classesIcon}>{iconMapFilled[iconType]}</div>
  }

  const renderCloseIcon = () => {
    return (
      <div className={`closeIcon`}>
        {closeText ? (
          <div onClick={() => setIsVisible(false)}>{closeText}</div>
        ) : (
          <Icon icon={`times`} onClick={() => setIsVisible(false)}></Icon>
        )}
      </div>
    )
  }

  return (
    <Transition
      in={isVisible}
      timeout={300}
      animation='zoom-in-top'
      onExited={() => {
        setIsVisible(false)
      }}
    >
      <div className={classes} ref={ref}>
        {showIcon ? renderIcon() : null}
        <div className='jsChen-alert-center'>
          <div className='inner-message'>{message}</div>
          {description ? <div className='inner-description'>{description}</div> : null}
        </div>
        {closeable ? renderCloseIcon() : null}
      </div>
    </Transition>
  )
}
Alert.defaultProps = {
  type: 'info',
}

export default Alert
