document.addEventListener('DOMContentLoaded', () => {
  const deviceSelect = document.getElementById('edit-device-name');
  const saveButton = document.getElementById('save-device-info');

  // localStorage からデータを取得
  const loadDeviceDatabase = () => {
    const json = localStorage.getItem('deviceDatabase');
    return json ? JSON.parse(json) : {};
  };

  // localStorage にデータを保存
  const saveDeviceDatabase = (db) => {
    localStorage.setItem('deviceDatabase', JSON.stringify(db));
  };

  // セレクトボックスにデバイスを追加
  const loadDeviceOptions = (db) => {
	  deviceSelect.innerHTML = '';
	
	  // 先頭に選択不可のプレースホルダー追加
	  const placeholder = document.createElement('option');
	  placeholder.value = '';
	  placeholder.textContent = '端末を選択してください';
	  placeholder.disabled = true;
	  placeholder.selected = true;
	  deviceSelect.appendChild(placeholder);
	
	  // 通常の端末リスト追加
	  Object.keys(db).forEach(name => {
	    const option = document.createElement('option');
	    option.value = name;
	    option.textContent = name;
	    deviceSelect.appendChild(option);
	  });
	};

  // 初期化
  let deviceDatabase = loadDeviceDatabase();
  loadDeviceOptions(deviceDatabase);

  // デバイス選択時に値を入力欄へ反映
  deviceSelect.addEventListener('change', () => {
    const name = deviceSelect.value;
    const data = deviceDatabase[name];
    if (data) {
      document.getElementById('edit-device-price').value = data.price;
      document.getElementById('edit-kaedoki-price').value = data.kaedokiPrice;
      document.getElementById('edit-warranty-price').value = data.warranty;
      document.getElementById('edit-discount-mnp').value = data.discount.mnp;
      document.getElementById('edit-discount-new').value = data.discount.new;
      document.getElementById('edit-discount-change').value = data.discount.change;
    }
  });

  // 保存ボタンでlocalStorageに保存
  saveButton.addEventListener('click', () => {
    const name = deviceSelect.value;
    if (!name) return alert('端末名を選択してください');

    deviceDatabase[name] = {
      devicePrice: Number(document.getElementById('edit-device-price').value),
      kaedokiPrice: Number(document.getElementById('edit-kaedoki-price').value),
      warranty: Number(document.getElementById('edit-warranty-price').value),
      discount: {
        mnp: Number(document.getElementById('edit-discount-mnp').value),
        new: Number(document.getElementById('edit-discount-new').value),
        change: Number(document.getElementById('edit-discount-change').value),
      }
  };
    saveDeviceDatabase(deviceDatabase);
    alert('保存しました');
  });
});