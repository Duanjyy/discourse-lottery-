import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export async function exportResumeToPdf(target: HTMLElement, fileName: string) {
  const canvas = await html2canvas(target, {
    backgroundColor: "#ffffff",
    scale: 2.5,
    useCORS: true,
  })

  const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4", compress: true })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  const ratio = pageWidth / canvas.width
  const pageHeightPx = pageHeight / ratio

  let y = 0
  let page = 0
  while (y < canvas.height) {
    const sliceHeight = Math.min(pageHeightPx, canvas.height - y)
    const sliceCanvas = document.createElement("canvas")
    sliceCanvas.width = canvas.width
    sliceCanvas.height = sliceHeight
    const ctx = sliceCanvas.getContext("2d")
    if (!ctx) break
    ctx.drawImage(canvas, 0, y, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight)

    const imgData = sliceCanvas.toDataURL("image/jpeg", 0.98)
    if (page > 0) pdf.addPage()
    pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, sliceHeight * ratio)

    y += sliceHeight
    page += 1
  }

  pdf.save(`${fileName}.pdf`)
}

