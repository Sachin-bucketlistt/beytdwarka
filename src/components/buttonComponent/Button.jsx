import './Button.css'

function Button({
  as,
  href,
  type = 'button',
  variant = 'primary',
  size = 'md',
  block = false,
  className = '',
  children,
  ...props
}) {
  const Tag = as ?? (href ? 'a' : 'button')
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    block ? 'btn--block' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag
      className={classes}
      href={href}
      type={Tag === 'button' ? type : undefined}
      {...props}
    >
      <span className="btn__label">{children}</span>
    </Tag>
  )
}

export default Button
