import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export async function exportResumeToPdf(target: HTMLElement, fileName: string) {
  // 彻底解决偏移问题：将滚动条临时置顶
  const originalScrollY = window.scrollY
  const originalScrollX = window.scrollX
  window.scrollTo(0, 0)

  // 稍微延迟等待可能未完成的重绘
  await new Promise((resolve) => setTimeout(resolve, 100))

  try {
    const canvas = await html2canvas(target, {
      backgroundColor: "#ffffff",
      scale: 3, // 稍微提高清晰度
      useCORS: true,
      logging: false,
      scrollY: -window.scrollY,
      scrollX: 0,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
      onclone: (clonedDoc) => {
        // 在克隆的 DOM 中，找到我们要导出的节点
        const el = clonedDoc.body.querySelector(`[data-pdf-target="true"]`) as HTMLElement
        if (el) {
          // 清除外层所有可能的 transform 缩放
          let current: HTMLElement | null = el.parentElement
          while (current && current !== clonedDoc.body) {
            current.style.transform = "none"
            current = current.parentElement
          }
        }
      },
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
    // 恢复原有的滚动条位置
    window.scrollTo(originalScrollX, originalScrollY)
  }
}

