import { Ref, ref, watch } from 'vue'

/**
 * 用户分页返回
 */
export interface UserPaginationReturn {
  perPage: Ref<number>
  page: Ref<number>
  total: Ref<number>
  loading: Ref<boolean>
}

/**
 * 用户分页取消令牌
 */
export interface UserPaginationCancelToken {
  cancel(): void
  version: number
}

export default function (options: {
  perPage?: number
  page?: number
  total?: number
  load?: (page: number, perPage: number, cancel: UserPaginationCancelToken) => Promise<void>
  onError?: (err: unknown) => void
  onSuccess?: () => void
}): UserPaginationReturn {
  const page = ref<number>(options.page ?? 1)
  const perPage = ref<number>(options.perPage ?? 10)
  const total = ref<number>(options.total ?? 0)
  const loading = ref(false)
  let version = 0
  let token: UserPaginationCancelToken | undefined

  function reset(): void {
    loading.value = false
    token = undefined
  }

  async function load() {
    if (loading.value) return
    if (options.load == null) return
    loading.value = true
    try {
      version++
      token = { cancel: reset, version }
      await options.load!(page.value, perPage.value, token)
      options.onSuccess?.()
    } catch (e) {
      options.onError?.(e)
    }
    loading.value = false
  }

  watch(page, () => {
    reset()
    load()
  })

  watch(perPage, () => {
    reset()
    load()
  })

  return {
    page,
    perPage,
    total,
    loading
  }
}
