function downloadDiv(divId, filename = 'palete.png') {
    if (typeof domtoimage === 'undefined') {
        console.error('dom-to-image required');
        return;
    }

    const div = document.getElementById(divId);
    if (!div) {
        console.error('Div not found');
        return;
    }

    const rect = div.getBoundingClientRect();
    
    domtoimage.toPng(div, {
        quality: 1,
        bgcolor: null,
        width: rect.width,
        height: rect.height,
        style: { 
            // transform: 'scale(5)', 
            // 'transform-origin': 'center',
            width: rect.width + 'px',
            height: rect.height + 'px'
        }
    })
    .then(dataUrl => {
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();
    })
    .catch(console.error);
}
