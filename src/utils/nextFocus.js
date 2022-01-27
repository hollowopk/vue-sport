/**
 * 表单：回车到下一项
 * @param {表单名称} formName
 * @param {提交方法}} callback
 */
export function nextFocus(formName, callback) {
  // 获取到表单的所有input输入框
  const inputDoms = document.querySelectorAll(`#${formName} .el-input`);

  // 遍历input输入框
  inputDoms.forEach((item, index) => {
    // 添加索引
    item.setAttribute("data-index", index);
    // 添加事件处理程序
    item.addEventListener('keyup', function (e) {
      var ev = typeof event != "undefined" ? window.event : e;
      if (ev.keyCode == 13) {
        // 获取当前录入input的索引值
        const index = ev.target.getAttribute("data-index");
        const nextIndex = parseInt(index) + 1;
        const length = inputDoms.length;
 
        // 如果不是最后一个，则跳到下一项，如果是，走提交
        if (nextIndex < length -1) {
          inputDoms[nextIndex].focus();
        }
      }
    });
  });
}

/**
 *  else {
          if (typeof callback === "function") {
            callback();
          }
        }
 */