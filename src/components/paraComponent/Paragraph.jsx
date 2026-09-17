import './Paragraph.css'

function Paragraph({
  as: Tag = 'p',
  size = 'body',
  tone = 'default',
  className = '',
  children,
  ...props
}) {
  const classes = ['para', `para--${size}`, `para--${tone}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  )
}

export default Paragraph
