const SVGNamespaceURI = 'http://www.w3.org/2000/svg'

export const h = (tag: string, props?: Record<string, any>, children?: string | Node | (string | Node)[]) => {
  if (!props) {
    props = {}
  }

  if (children == null) {
    children = []
  }

  if (typeof children === 'string') {
    children = [children]
  }

  const ele = document.createElement(tag, props)

  Object.keys(props).forEach(key => {
    ele.setAttribute(key, (props as Record<string, any>)[key])
  })

  if (Array.isArray(children)) {
    ele.append(...children)
  } else {
    ele.append(children)
  }

  return ele
}

export const s = (tag: string, props?: Record<string, any>, children?: string | Node | (string | Node)[]) => {
  if (!props) {
    props = {}
  }

  if (children == null) {
    children = []
  }

  if (typeof children === 'string') {
    children = [children]
  }

  const ele = document.createElementNS(SVGNamespaceURI, tag)

  Object.keys(props).forEach(key => {
    ele.setAttribute(key, (props as Record<string, any>)[key])
  })

  if (Array.isArray(children)) {
    ele.append(...children)
  } else {
    ele.append(children)
  }

  return ele
}
