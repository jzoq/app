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

// ローカルストレージから復元
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tab-content').forEach(content => {
        const tabId = content.id;
        const saved = localStorage.getItem(`policies-${tabId}`);
        if (saved) {
            const policies = JSON.parse(saved);
            policies.forEach(text => renderPolicy(tabId, text));
        }
    });
});

// 施策を表示 & 削除ボタンつきで追加（内部関数）
function renderPolicy(tabId, text) {
    const policyList = document.getElementById(`${tabId}-policies`);

    const item = document.createElement('div');
    item.className = 'policy-item';
    item.textContent = text;

    const delBtn = document.createElement('button');
    delBtn.textContent = '削除';
    delBtn.onclick = () => {
        item.remove();
        savePolicies(tabId); // 削除後に保存し直す
    };

    item.appendChild(delBtn);
    policyList.appendChild(item);
}

// 施策を追加（外部から呼ばれる）
window.addPolicy = function(tabId) {
    const input = document.getElementById(`${tabId}-input`);
    const policyText = input.value.trim();
    if (!policyText) return;

    renderPolicy(tabId, policyText);
    savePolicies(tabId);  // 追加後に保存
    input.value = '';
}

// 保存処理（LocalStorageにタブごとの内容を保存）
function savePolicies(tabId) {
    const items = document.querySelectorAll(`#${tabId}-policies .policy-item`);
    const policies = Array.from(items).map(item => {
        // 最後の要素（削除ボタン）を除いたテキストを取得
        return item.firstChild.textContent.trim();
    });
    localStorage.setItem(`policies-${tabId}`, JSON.stringify(policies));
}