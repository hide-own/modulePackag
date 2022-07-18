import { defineComponent, inject, VNodeChild } from 'vue'
import { KPagination } from '@/modulePackag'
import { tablePaginationKey } from '@/modulePackag/table/symbols'

export default defineComponent({
  name: 'TailTablePage',
  inheritAttrs: false,
  emits: {
    click: (page: number) => true
  },
  setup(_, { emit }): RenderFunction {
    const paginator = inject(tablePaginationKey)!

    const onChange = (page: number): void => {
      emit('click', page)
      paginator.page.value = page
    }

    return (): VNodeChild => {
      return (
        <KPagination
          total={paginator.total.value}
          current={paginator.page.value}
          onChange={onChange}
          loading={paginator.loading.value}
        />
      )
    }
  }
})
