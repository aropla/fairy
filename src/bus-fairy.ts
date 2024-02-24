type Fn<T = any> = (options: T) => void

export type Bus = ReturnType<typeof Bus>
export const Bus = <Events extends Record<string, any>>() => {
  const map = new Map<string, Fn[]>()

  const on = <EventName extends keyof Events>(name: EventName, fn: Fn<Events[EventName]>) => {
    let fns = map.get(name as string)

    if (!fns) {
      fns = []
      map.set(name as string, fns)
    }

    if (fns.indexOf(fn) !== -1) {
      console.warn('[Duplicated Fn in on]', fns)
      return
    }

    fns.push(fn)
  }

  const emit = <EventName extends keyof Events>(name: EventName, options: Events[EventName]) => {
    const fns = map.get(name as string)

    if (!fns) {
      return
    }

    fns.forEach(fn => fn(options))
  }

  const off = <EventName extends keyof Events>(name?: EventName, fn?: Fn<Events[EventName]>): any => {
    if (!name) {
      map.clear()

      return
    }

    if (!fn) {
      map.delete(name as string)

      return
    }

    const fns = map.get(name as string)

    if (!fns) {
      return
    }

    const index = fns.indexOf(fn)
    fns.splice(index, 1)
  }

  const once = <EventName extends keyof Events>(name: EventName, fn: Fn<Events[EventName]>) => {
    const onceFn = (options: Events[EventName]) => {
      fn(options)
      off(name, onceFn)
    }

    return on(name, onceFn)
  }

  return {
    on,
    emit,
    off,
    once,
  }
}
