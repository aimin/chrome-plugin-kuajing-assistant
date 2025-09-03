// 接收来自 background 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showFormatted") {
    const selectedText = request.text;
    console.log(selectedText)

    // 格式化文本（示例：去除多余空格、首字母大写、每句换行）
    const formattedText = selectedText
      .trim()
      .replace(/\s+/g, ' ')
      .split('. ')
      .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1))
      .join('.\n')
      .replace(/\.$/, ''); // 去掉末尾多余的句号

    // 显示浮层
    showFloatingPopup(formattedText);
  }
});

function showFloatingPopup(text) {
  // 如果已有浮层，先移除
  const existing = document.getElementById('formatter-popup');
  if (existing) existing.remove();

  // 创建浮层容器
  const popup = document.createElement('div');
  popup.id = 'formatter-popup';
  popup.innerHTML = `
    <div id="popup-content">
      <h3>格式化内容</h3>
      <pre>${escapeHtml(text)}</pre>
      <button id="close-btn">关闭</button>
    </div>
  `;

  document.body.appendChild(popup);

  // 绑定关闭事件
  popup.querySelector('#close-btn').addEventListener('click', () => {
    popup.remove();
  });

  // 点击外部关闭
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.remove();
    }
  });
}

// 防止 XSS，转义 HTML
function escapeHtml(text) {
  console.log(text)
  r=text.match(/订单号：\s+(.*)\s+状态.*收货人\s+(.*)\s联系方式\s+(.*)\s+虚.*\s+收货地址\s+(.*)$/);
  text=r[1]+","+r[2]+","+r[3];
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}