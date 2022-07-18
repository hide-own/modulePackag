import { defineComponent, PropType, VNodeChild, withModifiers, h } from 'vue'
import { TableColumn, TableExtension } from '../types'
import { mustTableFeatures } from '../symbols'

export default defineComponent({
  name: 'TailTableTitle',
  props: {
    column: {
      type: Object as PropType<TableColumn | TableExtension>,
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
    return (): VNodeChild => (
      <th
        class={['p-2', { hidden: props.hidden, border: features.value.lattice }]}
        onClick={withModifiers(() => emit('click'), ['stop'])}
      >
        {props.render()}
      </th>
    )
  }
})
