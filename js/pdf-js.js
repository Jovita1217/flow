class PDFViewer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.initialize();
    }

    async initialize() {
        if (!this.container) return;

        // 设置PDF.js worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = 
            `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

        try {
            await this.loadPDF('/your-resume.pdf');
        } catch (error) {
            console.error('Error loading PDF:', error);
        }
    }

    async loadPDF(url) {
        try {
            const loadingTask = pdfjsLib.getDocument(url);
            const pdf = await loadingTask.promise;
            const page = await pdf.getPage(1);
            
            const scale = 1.2;
            const viewport = page.getViewport({ scale });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            this.container.appendChild(canvas);
            await page.render(renderContext);
        } catch (error) {
            console.error('Error rendering PDF:', error);
        }
    }
}

// 初始化PDF查看器
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('pdfViewer')) {
        new PDFViewer('pdfViewer');
    }
});