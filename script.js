if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

document.addEventListener('DOMContentLoaded', () => {
  // Animal data for both age groups
  const animals = [
    {
      name: 'Crocodile',
      images: {
        '3-5': 'public/animals/crocodile/images/crocodile.bright.3-5.v1.png',
        '5-10': 'public/animals/crocodile/images/crocodile.bright.5-10.v1.png'
      },
      texts: {
        '3-5': 'public/animals/crocodile/wiki/crocodile.en.3-5.v1.txt',
        '5-10': 'public/animals/crocodile/wiki/crocodile.en.5-10.v1.txt'
      }
    },
    {
      name: 'Dragonfly',
      images: {
        '3-5': 'public/animals/dragonfly/images/dragonfly.bright.3-5.v1.png',
        '5-10': 'public/animals/dragonfly/images/dragonfly.bright.5-10.v1.png'
      },
      texts: {
        '3-5': 'public/animals/dragonfly/wiki/dragonfly.en.3-5.v1.txt',
        '5-10': 'public/animals/dragonfly/wiki/dragonfly.en.5-10.v1.txt'
      }
    },
    {
      name: 'Elephant',
      images: {
        '3-5': 'public/animals/elephant/images/elephant.bright.3-5.v1.png',
        '5-10': 'public/animals/elephant/images/elephant.bright.5-10.v1.png'
      },
      texts: {
        '3-5': 'public/animals/elephant/wiki/elephant.en.3-5.v1.txt',
        '5-10': 'public/animals/elephant/wiki/elephant.en.5-10.v1.txt'
      }
    }
  ];

  let ageGroup = '3-5';
  const helloDiv = document.getElementById('helloText');
  let activeIndex = null;

  // Update images based on age group
  function updateAnimalImages() {
    animals.forEach((animal, idx) => {
      const img = document.getElementById(`animalImg${idx + 1}`);
      if (img) {
        img.src = animal.images[ageGroup];
      }
    });
    // Clear text when switching age group
    helloDiv.textContent = '';
    activeIndex = null;
  }

  // Button click logic
  animals.forEach((animal, idx) => {
    const btn = document.getElementById(`animalBtn${idx + 1}`);
    if (btn) {
      btn.addEventListener('click', async () => {
        if (activeIndex === idx) {
          helloDiv.textContent = '';
          activeIndex = null;
        } else {
          try {
            const response = await fetch(animal.texts[ageGroup]);
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

  // Toggle switch logic
  const toggle = document.getElementById('toggleSwitch');
  const toggleLabel = document.getElementById('toggleLabel');
  if (toggle && toggleLabel) {
    toggle.addEventListener('change', () => {
      ageGroup = toggle.checked ? '5-10' : '3-5';
      toggleLabel.textContent = toggle.checked ? '5-10' : '3-5';
      updateAnimalImages();
    });
    // Set initial label
    toggleLabel.textContent = '3-5';
  }

  // Set initial images
  updateAnimalImages();
});
