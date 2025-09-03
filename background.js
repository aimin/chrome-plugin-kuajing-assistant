// 创建右键菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "format-selection",
    title: "生成物流公司表格行",
    contexts: ["selection"]
  });
});

// 监听右键菜单点击
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "format-selection" && info.selectionText) {
    // 向当前标签页的内容脚本发送消息
    chrome.tabs.sendMessage(tab.id, {
      action: "showFormatted",
      text: info.selectionText
    });
  }
});