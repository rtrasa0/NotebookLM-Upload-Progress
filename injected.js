(function() {
  'use strict';

  console.log('✅ NotebookLM Upload Progress v2.2 loaded');

  // حداقل حجم برای اینکه یک آپلود «واقعی» در نظر گرفته بشه (نصف مگابایت)
  const MIN_UPLOAD_SIZE = 500 * 1024;

  const OriginalXHR = window.XMLHttpRequest;
  const originalSend = OriginalXHR.prototype.send;

  OriginalXHR.prototype.send = function(body) {
    // فقط بدنه‌هایی که واقعاً فایل هستن
    const isFileUpload =
      body instanceof FormData ||
      body instanceof Blob ||
      body instanceof File ||
      body instanceof ArrayBuffer;

    if (isFileUpload && this.upload) {
      const uploadId = 'upload-' + Math.random().toString(36).substr(2, 9);

      this.upload.addEventListener('progress', function(event) {
        // فقط درخواست‌های بزرگ رو نشون بده
        if (event.lengthComputable && event.total >= MIN_UPLOAD_SIZE) {
          const percent = (event.loaded / event.total) * 100;
          const loadedMB = (event.loaded / (1024 * 1024)).toFixed(1);
          const totalMB = (event.total / (1024 * 1024)).toFixed(1);

          window.postMessage({
            type: 'UPLOAD_PROGRESS',
            id: uploadId,
            percent: percent,
            loadedMB: loadedMB,
            totalMB: totalMB
          }, '*');
        }
      });
    }

    return originalSend.apply(this, arguments);
  };
})();