// タブ切り替え
document.querySelectorAll('.tab-button').forEach(button => {
	button.addEventListener('click', () => {
		const tab = button.dataset.tab;

		document.querySelectorAll('.tab-content').forEach(content => {
			content.style.display = content.id === tab ? 'block' : 'none';
		});

		document.querySelectorAll('.tab-button').forEach(btn => {
			btn.classList.toggle('active', btn.dataset.tab === tab);
		});
	});
});

// 施策の追加
window.addPolicy = function(tabId) {
	const input = document.getElementById(`${tabId}-input`);
	const policyText = input.value.trim();
	if (!policyText) return;

	const policyList = document.getElementById(`${tabId}-policies`);

	const item = document.createElement('div');
	item.className = 'policy-item';
	item.textContent = policyText;

	const delBtn = document.createElement('button');
	delBtn.textContent = '削除';
	delBtn.onclick = () => item.remove();

	item.appendChild(delBtn);
	policyList.appendChild(item);

	input.value = '';
}