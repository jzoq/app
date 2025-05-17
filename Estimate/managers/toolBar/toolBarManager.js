import {elements} from '../../utils/elements.js';

export class ToolBarManager {
    constructor({valueState, deviceCollections}) {
        this.valueState = valueState;
        this.deviceCollections = deviceCollections;
        this.isCompareMode = false; // トグル用のフラグ
		this.isDocomoWorkMode = false;
		this.isContractRelatedMode = false;
    }

    init() {
        elements.resetButton.addEventListener('click', (event) => {
            // 比較表示は消さない（OFF状態なら非表示になる）
            this.resetLeftForm(); // 左側のフォームのみリセット
        });

        elements.compareButton.addEventListener('click', () => {
            this.isCompareMode = !this.isCompareMode; // ON/OFF切り替え

            if (this.isCompareMode) {
                // ボタンのスタイル変更
                elements.compareButton.classList.add('active');

                // 比較エリアを表示して中身をリセット
                elements.comparisonEstimate.style.display = 'block';
                elements.comparisonEstimate.innerHTML = '';

                const clone = elements.originalEstimate.cloneNode(true);
                clone.classList.remove('original-estimate');
                clone.classList.add('cloned-estimate');
				clone.style.width = '100%';

                this.syncFormValues(elements.originalEstimate, clone);
                elements.comparisonEstimate.appendChild(clone);
            } else {
                // OFFに戻す
                elements.compareButton.classList.remove('active');
                elements.comparisonEstimate.style.display = 'none';
                elements.comparisonEstimate.innerHTML = '';
            }
        });
			
		elements.contractRelatedButton.addEventListener('click', () => {
		    this.isContractRelatedMode = !this.isContractRelatedMode;
		    const iframe = document.getElementById('side-content');
		
		    elements.contractRelatedButton.classList.toggle('active', this.isContractRelatedMode);
		
		    if (this.isContractRelatedMode) {
		        iframe.src = '../ContractRelated/index.html/';
		        iframe.style.display = 'block';
		    } else {
		        iframe.style.display = 'none';
		        iframe.src = ''; // ここでリセット
		    }
		});
		
		elements.docomoWorkButton.addEventListener('click', () => {
		    this.isDocomoWorkMode = !this.isDocomoWorkMode;
		    const iframe = document.getElementById('side-content');
		
		    elements.docomoWorkButton.classList.toggle('active', this.isDocomoWorkMode);
		
		    if (this.isDocomoWorkMode) {
		        iframe.src = '../DocomoWork/index.html'; // 常に設定
		        iframe.style.display = 'block';
		    } else {
		        iframe.style.display = 'none';
		        iframe.src = ''; // こちらも必要ならリセット
		    }
		});
    }

    resetLeftForm() {
	    const original = document.getElementById('original-estimate');
	
	    original.querySelector('#device-select').selectedIndex = 0;
	    original.querySelector('#contract-type').selectedIndex = 0;
	    original.querySelector('#installments-num').value = "1";
	    original.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
		
		original.querySelector('#plan-eximo').selectedIndex = 0;
	    original.querySelector('#plan-irumo').selectedIndex = 0;
		original.querySelector('#plan-ahamo').selectedIndex = 0;
		
		original.querySelector('#call-option').selectedIndex = 0;
	    original.querySelector('#warranty-option').selectedIndex = 0;
		original.querySelector('#mail-option').selectedIndex = 0;
		original.querySelector('#security-option').selectedIndex = 0;
		
		original.querySelector('#family-discount-select').selectedIndex = 0;
	    original.querySelector('#wifi-discount-select').selectedIndex = 0;
		original.querySelector('#dcard-discount-select').selectedIndex = 0;
	
	    this.valueState.resetAll();
	}

    syncFormValues(from, to) {
        const fromElements = from.querySelectorAll('input, select');
        const toElements = to.querySelectorAll('input, select');

        fromElements.forEach((fromElem, i) => {
            const toElem = toElements[i];
            if (!toElem) return;

            if (fromElem.tagName === 'SELECT') {
                toElem.selectedIndex = fromElem.selectedIndex;
            } else if (fromElem.type === 'checkbox') {
                toElem.checked = fromElem.checked;
            } else if (fromElem.tagName === 'SPAN' || fromElem.tagName === 'DIV') {
                toElem.textContent = fromElem.textContent;
            } else {
                toElem.value = fromElem.value;
            }
        });
    }
}