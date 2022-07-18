import { createVNode, render, VNode } from 'vue'
import Loading from './Loading.vue'

type Fun = () => void

export function KLoading(): { show: Fun; hide: Fun } {
  const VNode: VNode = createVNode(Loading)
  render(VNode, document.body)
  const show = () => VNode.component?.exposed?.show()
  const hide = () => VNode.component?.exposed?.hide()

  return {
    show,
    hide
  }
}
