- 按钮 Button
    - type          "normal" | "success" | "warning" | "info"
    - disabled       禁用
    - 插槽            按钮文字

------------------------------------------------------------------

- 标签页             TabGroup
    - v-model:value  发生改变的值

- 标签页选项          Tab
    - 插槽           显示值

------------------------------------------------------------------

- 输入框 Input
    - v-model:value     数据值
    - placeholder       默认值
    - @change           值发生改变的回调

- 数字输入框             InputNumber
  - placeholder        默认值
  - v-model:modelvalue  响应数据

------------------------------------------------------------------

- 多选框组              CheckboxGroup
    - name             属性名
    - v-model:value    选中值 多选后[]
    - multiple         多选

- 多选框值               Checkbox
    - value             属性值
    - 插槽               显示值

------------------------------------------------------------------

- 单选框组                RadioGroup
  - v-model:value        响应数据

- 单选框值：自定义样式      RadioGroupOption    
  - value               数据值
  - #title              标题
  - #content            内容

- 单选框值               Radio
  - value               数据值
------------------------------------------------------------------

- 选择器             Select
    - v-model:value  下标

- 选择器值           Option
    - value         option文字,响应select的数据值

------------------------------------------------------------------

- 开关               Switch
    - v-model:value  响应数据的值
    - checked       选中值
    - unchecked     关闭值

------------------------------------------------------------------

- 对话框               Modal
    - v-model:visible  对话框显示
    - title           标题数据
    - footer          取消底部按钮选项
    - 插槽             对话框内容
    - @ok             确定
    - @cancel         取消

------------------------------------------------------------------

- 分页                   Pagination
    - total             总条数
    - v-model:current    当前选中页数
    - page-size         一页限制多少条数据

------------------------------------------------------------------

- 数字跳动              Statistic
    - value           数据 number

------------------------------------------------------------------

- 日历               Statistic
    - v-model:value  日期 number

------------------------------------------------------------------

- 树                 Tree
  - menu             开启菜单
  - data             {id,loading:是否有子菜单,children:子菜单数据}
  - @change          改变发生的变化
  - #title           数显示内容插槽
  - #menu            菜单插槽
