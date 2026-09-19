(function() {
  'use strict';

  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('injected.js');
  (document.head || document.documentElement).appendChild(script);
  script.onload = () => script.remove();

  const activeUploads = new Map();

  window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    if (event.data.type === 'UPLOAD_PROGRESS') {
      updateProgressUI(event.data.id, event.data.percent, event.data.loadedMB, event.data.totalMB);
    }
  });

  function updateProgressUI(id, percent, loadedMB, totalMB) {
    const targetRow = document.querySelector('.row.label-row');

    // اگر ردیف هدف پیدا نشد، هیچ کاری نکن (دیگه fallback پایین-راست نداریم)
    if (!targetRow) return;

    let container = document.getElementById('upload-progress-container');

    if (!container) {
      container = document.createElement('div');
      container.id = 'upload-progress-container';
      container.style.cssText = `
        display: flex;
        gap: 6px;
        align-items: center;
        margin-right: 8px;
        flex-wrap: wrap;
      `;

      const selectAllEl = Array.from(targetRow.querySelectorAll('*')).find(el =>
        el.textContent.trim().includes('Select all') && el.children.length === 0
      );

      if (selectAllEl) {
        selectAllEl.parentElement.insertBefore(container, selectAllEl);
      } else {
        targetRow.appendChild(container);
      }
    }

    // اگه کانتینر از DOM حذف شده (مثلاً صفحه تغییر کرده) دوباره به ردیف وصلش کن
    if (!container.isConnected) {
      const selectAllEl = Array.from(targetRow.querySelectorAll('*')).find(el =>
        el.textContent.trim().includes('Select all') && el.children.length === 0
      );
      if (selectAllEl) {
        selectAllEl.parentElement.insertBefore(container, selectAllEl);
      } else {
        targetRow.appendChild(container);
      }
    }

    let badge = document.getElementById(`upload-badge-${id}`);
    if (!badge) {
      badge = document.createElement('div');
      badge.id = `upload-badge-${id}`;
      badge.style.cssText = `
        background: #1a73e8;
        color: white;
        padding: 3px 8px;
        border-radius: 12px;
        font-family: 'Google Sans', sans-serif;
        font-size: 11px;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        direction: ltr;
        white-space: nowrap;
        transition: opacity 0.2s;
      `;
      container.appendChild(badge);
      activeUploads.set(id, badge);
    }

    badge.textContent = `${percent.toFixed(1)}% (${loadedMB}/${totalMB} MB)`;

    if (percent >= 100) {
      setTimeout(() => {
        if (badge && badge.parentElement) {
          badge.remove();
          activeUploads.delete(id);
          if (container && container.children.length === 0) {
            container.remove();
          }
        }
      }, 2000);
    }
  }
})();