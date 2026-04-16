import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export async function exportResumeToPdf(target: HTMLElement, fileName: string) {
  // 保存原本的缩放
  const parent = target.parentElement
  const originalTransform = parent ? parent.style.transform : ""

  // 强行在渲染前，把页面的缩放复原，保证截图像素完全精确。html2canvas 的 onclone 对部分复杂 CSS 偏移处理并不总完美。
  if (parent) {
    parent.style.transform = "none"
  }

  // 稍微延迟等待重绘
  await new Promise((resolve) => setTimeout(resolve, 100))

  try {
    const canvas = await html2canvas(target, {
      backgroundColor: "#ffffff",
      scale: 3, // 稍微提高清晰度
      useCORS: true,
      logging: false,
      windowWidth: target.scrollWidth,
      windowHeight: target.scrollHeight,
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
  } finally {
    // 渲染完无论如何都恢复原来的缩放比例
    if (parent) {
      parent.style.transform = originalTransform
    }
  }
}

