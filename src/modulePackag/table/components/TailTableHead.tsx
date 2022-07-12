import {defineComponent, h, VNode, VNodeChild} from "vue";
import {TableColumn, TableExtension} from "../types";
import {mustTableContext} from "../symbols";
import TailTableTitle from "./TailTableTitle";

export default defineComponent({
  name: "TailTableHead",
  inheritAttrs: false,
  emits: {
    click: (column: TableColumn | TableExtension, columnIndex: number) => true,
  },
  setup(props, {emit}): RenderFunction {
    const context = mustTableContext();
    const renderWidget = (type: string, column: TableColumn | TableExtension): VNodeChild => {
      const slot = context.slot(`${type}-${column.field}`);
      const handle = (column as any)[type];
      if (slot != null) return slot({column});
      if (typeof handle === "function") return handle(column);
      if (handle == null) return null;
      return type === "handle" ? null : `${handle}`;
    };
    const renderTitle = (column: TableColumn | TableExtension): VNodeChild => {
      return [
        renderWidget("handle", column), // handle
        renderWidget("title", column), // title
      ];
    };
    return (): VNodeChild => {
      const colgroup: VNode[] = [];
      const titles: VNode[] = context.build((column, index) => {
        colgroup.push(<col width={column.width}/>);
        return (
          <TailTableTitle
            class={`text-${column.align ?? 'left'}`}
            column={column}
            render={() => renderTitle(column)}
            hidden={column.hidden === true}
            onClick={() => emit("click", column, index)}
          />
        );
      });
      return [<colgroup>{colgroup}</colgroup>, <thead>{titles}</thead>];
    };
  },
});
