if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = [
    { id: 'showHelloBtn', file: 'public/hello.txt', label: 'Show Hello' },
    { id: 'showHello2Btn', file: 'public/hello2.txt', label: 'Show Hello 2' },
    { id: 'showHello3Btn', file: 'public/hello3.txt', label: 'Show Hello 3' }
  ];
  const helloDiv = document.getElementById('helloText');
  let activeIndex = null;

  buttons.forEach((btn, idx) => {
    const button = document.getElementById(btn.id);
    if (button) {
      button.addEventListener('click', async () => {
        if (activeIndex === idx) {
          helloDiv.textContent = '';
          activeIndex = null;
        } else {
          try {
            const response = await fetch(btn.file);
            if (response.ok) {
              const text = await response.text();
              helloDiv.textContent = text;
              activeIndex = idx;
            } else {
              helloDiv.textContent = 'Could not load text.';
              activeIndex = null;
            }
          } catch (e) {
            helloDiv.textContent = 'Error loading text.';
            activeIndex = null;
          }
        }
      });
    }
  });
});
