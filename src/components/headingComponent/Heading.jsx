import './Heading.css'

function Heading({
  as: Tag = 'h2',
  size = 'lg',
  tone = 'default',
  className = '',
  children,
  ...props
}) {
  const classes = ['heading', `heading--${size}`, `heading--${tone}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  )
}

export default Heading
