import {createVNode, render, VNode} from 'vue';
import Loading from './Loading.vue'



export function KLoading():{show:Function,hide:Function} {
  const VNode: VNode = createVNode(Loading)
  render(VNode, document.body)
  const show = () => VNode.component?.exposed?.show();
  const hide = () => VNode.component?.exposed?.hide();

  return {
    show,
    hide
  }
}
