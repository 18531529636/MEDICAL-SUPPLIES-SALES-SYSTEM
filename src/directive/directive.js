export default {
  /**
   * 禁止输入空格
   * @example v-filter-space="valeName"
   */
  filterSpace: {
    update(el, { value, modifiers }) {
      try {
        const input = el.children[0] || el;
        if (!input) {
          return;
        }
        // 获取当前光标所在位置
        const inputSelection = input.selectionStart;
        // 获取加上空格后的字符串长度
        const valueLength = input.value.length;
        const newValue = value.replace(/\s/g, '');
        if (value !== newValue) {
          input.value = newValue;
          if (input.value.length !== valueLength) {
            input.selectionStart = inputSelection - 1;
            input.selectionEnd = inputSelection - 1;
          }
          input.dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'));
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};
