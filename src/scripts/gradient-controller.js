document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('gradient-canvas');
    const resetButton = document.getElementById('reset-button');
    const sliders = document.querySelectorAll('input[type="range"]');
    
    const hueSlider = document.getElementById('hue');
    const grayscaleSlider = document.getElementById('grayscale');
    const opacitySlider = document.getElementById('opacity');
    const brightnessSlider = document.getElementById('brightness');
    const blurSlider = document.getElementById('blur');

    function updateFilter() {
        const hue = hueSlider.value;
        const grayscale = grayscaleSlider.value;
        const opacity = opacitySlider.value;
        const brightness = brightnessSlider.value;
        const blur = blurSlider.value;

        target.style.filter = `hue-rotate(${hue}deg) grayscale(${grayscale/100}) opacity(${opacity/100}) brightness(${brightness/100}) blur(${blur}px)`;

        sliders.forEach(slider => {
                let valId = slider.id + '-value';
                console.log(valId);
                document.getElementById(valId).textContent = slider.value;
            });
    }

    hueSlider.addEventListener('input', updateFilter);
    grayscaleSlider.addEventListener('input', updateFilter);
    opacitySlider.addEventListener('input', updateFilter);
    brightnessSlider.addEventListener('input', updateFilter);
    blurSlider.addEventListener('input', updateFilter);

    function resetSettings() {
        hueSlider.value = 290;
        grayscaleSlider.value = 0;
        opacitySlider.value = 100;
        brightnessSlider.value = 100;
        blurSlider.value = 0;
        updateFilter();
    }

    resetButton.addEventListener('click', resetSettings);

    updateFilter();
});

