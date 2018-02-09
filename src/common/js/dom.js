export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join('')
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|//s)' + className + '($|//s)')
  return reg.test(el.className)
}

export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name

  // get and set
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

let elementStyle = document.createElement('div').style

let vender = (() => {
  let trasnformNames = {
    webkit: 'WebkitTansform',
    moz: 'MozTransform',
    o: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in trasnformNames) {
    if (elementStyle[trasnformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vender === false) {
    return false
  }

  if (vender === 'standard') {
    return style
  }

  return vender + style.charAt(0).toupperCase() + style.substr(1)
}
