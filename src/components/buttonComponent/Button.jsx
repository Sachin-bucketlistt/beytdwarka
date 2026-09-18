import { ArrowUpRight } from 'lucide-react'
import './Button.css'

function Button({
  as,
  href,
  type = 'button',
  arrow = false,
  size = 'md',
  block = false,
  tone = 'on-dark',
  className = '',
  children,
  ...props
}) {
  const Tag = as ?? (href ? 'a' : 'button')
  const classes = [
    'btn',
    `btn--${size}`,
    `btn--${tone}`,
    arrow ? 'btn--arrow' : '',
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
      {arrow ? (
        <span className="btn__arrow" aria-hidden="true">
          <ArrowUpRight size={16} strokeWidth={1.75} />
        </span>
      ) : null}
    </Tag>
  )
}

export default Button
