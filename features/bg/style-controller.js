document.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('gradient-canvas');
    const resetButton = document.getElementById('reset-button');
    
    const huerotateSlider = document.getElementById('hue-rotate');
    const grayscaleSlider = document.getElementById('grayscale');
    const opacitySlider = document.getElementById('opacity');
    const brightnessSlider = document.getElementById('brightness');

    function updateFilter() {
        const hue = huerotateSlider.value;
        const grayscale = grayscaleSlider.value;
        const opacity = opacitySlider.value;
        const brightness = brightnessSlider.value;
        target.style.filter = `hue-rotate(${hue}deg) grayscale(${grayscale/100}) opacity(${opacity/100}) brightness(${brightness/100})`;
    }
    
    huerotateSlider.addEventListener('input', updateFilter);
    grayscaleSlider.addEventListener('input', updateFilter);
    opacitySlider.addEventListener('input', updateFilter);
    brightnessSlider.addEventListener('input', updateFilter);
    
    updateFilter();

    function resetSettings() {
        huerotateSlider.value = 30;
        grayscaleSlider.value = 0;
        opacitySlider.value = 100;
        brightnessSlider.value = 100;
        updateFilter();
        updateValues();
    }

    resetButton.addEventListener('click', resetSettings);
});

