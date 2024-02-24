type PluginFairyRawOptions = {
  hooks: string[]
}

export const PluginFairy = <Plugin extends Fn = Fn>(rawOptions: PluginFairyRawOptions) => {
  const options = normalizeOptions(rawOptions)
  const hooks: Record<string, Array<(...args: unknown[]) => void>> = Object.create(null)
  const installed: Set<Plugin> = new Set

  const isHookExist = (name: string) => {
    return Array.isArray(hooks[name])
  }

  const on = (name: string, fn: (...args: unknown[]) => unknown) => {
    if (!isHookExist(name)) {
      hooks[name] = []
    }

    hooks[name].push(fn)
  }

  const emit = <Args extends unknown[]>(name: string, ...args: Args) => {
    if (!isHookExist(name)) {
      return
    }

    hooks[name].forEach(hook => {
      hook(...args)
    })
  }

  const observe = (plugin: ReturnType<Plugin>, hooks: string[]) => {
    hooks.forEach(hook => {
      if (typeof plugin[hook] !== 'function') {
        return
      }

      on(hook, plugin[hook])
    })

    return plugin
  }

  const install = (plugin: Plugin, ...args: Parameters<Plugin>) => {
    if (typeof plugin !== 'function') {
      console.error(`[plugin-fairy.install]: plugin ${plugin} is not available`)

      return
    }

    if (installed.has(plugin)) {
      console.warn(`[plugin-fairy.install]: plugin ${plugin} has been installed`)

      return
    }

    installed.add(plugin)

    const instance = plugin(...args)

    return observe(instance, options.hooks)
  }

  return {
    hooks,

    install,
    emit,
    on,
  }
}

type PluginFairyOptions = Rewrite<PluginFairyRawOptions>
function normalizeOptions(rawOptions: PluginFairyRawOptions): PluginFairyOptions {
  const defaultOptions = {
    hooks: []
  }

  const options = {
    ...defaultOptions,
    ...rawOptions,
  }

  return options
}
