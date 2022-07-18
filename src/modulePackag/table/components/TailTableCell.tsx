import { computed, defineComponent, h, PropType, VNodeChild, withModifiers } from 'vue'
import { TableExtension, TableRow } from '../types'
import { mustTableContext, mustTableFeatures } from '../symbols'

export default defineComponent({
  name: 'TailTableCell',
  props: {
    row: {
      type: Object as PropType<TableRow>,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    render: {
      type: Function as PropType<RenderFunction>,
      required: true
    },
    hidden: {
      type: Boolean,
      required: true
    }
  },
  emits: ['click'],
  setup(props, { emit }): RenderFunction {
    const features = mustTableFeatures()
    const context = mustTableContext()
    const indent = computed(() => {
      let deep = 0
      let parent = props.row.parent
      while (parent) {
        deep++
        parent = parent.parent
      }
      return deep
    })
    const onClick = withModifiers(() => emit('click'), ['stop'])
    return (): VNodeChild => {
      const expandable: TableExtension | undefined = context.findExtension('expandable')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!expandable || props.columnIndex !== (expandable.config.handlePosition ?? 0)) {
        return (
          <td
            class={['p-2', { hidden: props.hidden, border: features.value.lattice }]}
            onClick={onClick}
          >
            {props.render()}
          </td>
        )
      }
      return (
        <td
          class={[
            'p-2 flex items-center',
            { hidden: props.hidden, border: features.value.lattice }
          ]}
          onClick={onClick}
        >
          {indent.value > 0 ? <div style={{ width: `${indent.value * 2}rem` }}></div> : null}
          <div class="w-4 mr-2">
            {props.row.children?.length ? expandable.cell?.(props.row, expandable) : null}
          </div>
          <div class="grow">{props.render()}</div>
        </td>
      )
    }
  }
})
