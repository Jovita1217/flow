// 更新显示的函数
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
    
    // 更新mode和active值
    const modeElement = document.getElementById('mode');
    const activeElement = document.getElementById('active');
    
    const modeValue = parseFloat(modeElement.textContent.match(/\d+(\.\d+)?/)?.[0] || 0);
    const activeValue = parseFloat(activeElement.textContent.match(/\d+(\.\d+)?/)?.[0] || 0);
    
    const newMode = (modeValue + (Math.random() - 0.5) * 2).toFixed(1);
    const newActive = (activeValue + (Math.random() - 0.5) * 0.5).toFixed(2);
    
    modeElement.textContent = `+    ${newMode}    MODE +`;
    activeElement.textContent = `${newActive} // :ACTIVE`;
}

// 更新鼠标位置
document.addEventListener('mousemove', (e) => {
    const modeElement = document.getElementById('mode');
    const activeElement = document.getElementById('active');
    
    modeElement.textContent = `+    ${e.clientX}    MODE +`;
    activeElement.textContent = `${e.clientY} // :ACTIVE`;
});

// 启动更新间隔
setInterval(updateDisplay, 1000);
updateDisplay(); // 初始更新