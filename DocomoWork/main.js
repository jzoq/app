document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    // タブボタンの切り替え
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // 表示切り替え
    const tabId = button.dataset.tab;
    document.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = (content.id === tabId) ? 'block' : 'none';
    });
  });
});