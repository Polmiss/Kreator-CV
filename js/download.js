document.addEventListener("DOMContentLoaded", () => {
	const btn = document.getElementById("download-pdf");
	const cv = document.getElementById("cv-preview");

	if (btn && cv) {
		btn.addEventListener("click", () => {
			const opt = {
				margin: [0, 0, 0, 0],
				filename: 'cv.pdf',
				image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 4 },
				jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
			};

			html2pdf().set(opt).from(cv).save();
		});
	}
});
