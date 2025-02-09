// Update time and random numbers
function updateDisplay() {
    const time = new Date();
    const formattedTime = time.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        timeZone: 'UTC'
    });
    
    document.getElementById('time').textContent = formattedTime;
    
    // Update mode and active values
    const modeElement = document.getElementById('mode');
    const activeElement = document.getElementById('active');
    
    const modeValue = parseFloat(modeElement.textContent.match(/\d+(\.\d+)?/)?.[0] || 0);
    const activeValue = parseFloat(activeElement.textContent.match(/\d+(\.\d+)?/)?.[0] || 0);
    
    const newMode = (modeValue + (Math.random() - 0.5) * 2).toFixed(1);
    const newActive = (activeValue + (Math.random() - 0.5) * 0.5).toFixed(2);
    
    modeElement.textContent = `+    ${newMode}    MODE +`;
    activeElement.textContent = `${newActive} // :ACTIVE`;
}

// Update mouse position
document.addEventListener('mousemove', (e) => {
    const modeElement = document.getElementById('mode');
    const activeElement = document.getElementById('active');
    
    modeElement.textContent = `+    ${e.clientX}    MODE +`;
    activeElement.textContent = `${e.clientY} // :ACTIVE`;
});

// Start the update interval
setInterval(updateDisplay, 1000);
updateDisplay(); // Initial update