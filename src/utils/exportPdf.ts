import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export async function exportResumeToPdf(target: HTMLElement, fileName: string) {
  // 查找我们要导出的真实根节点
  const el = target.querySelector(`[data-pdf-target="true"]`) as HTMLElement
  if (!el) {
    console.error("未找到 PDF 导出目标节点")
    return
  }

  // 临时创建一个脱离原来复杂包裹容器的节点用于克隆截图
  const printContainer = document.createElement("div")
  printContainer.style.position = "absolute"
  // 不能放到屏幕外太远，否则某些浏览器的离屏渲染会有问题，直接放到最顶层 z-index 在后面即可
  printContainer.style.top = "0"
  printContainer.style.left = "0"
  printContainer.style.zIndex = "-9999"
  printContainer.style.width = `${el.offsetWidth}px`
  printContainer.style.backgroundColor = "white"
  // 清除一切缩放
  printContainer.style.transform = "none"

  // 深度克隆节点以保留样式
  const clonedEl = el.cloneNode(true) as HTMLElement
  // 去除克隆节点自身的缩放影响（如果有的话）
  clonedEl.style.transform = "none"
  printContainer.appendChild(clonedEl)
  document.body.appendChild(printContainer)

  try {
    // 稍微延迟，确保克隆出来的 DOM 渲染完成
    await new Promise((resolve) => setTimeout(resolve, 200))

    const canvas = await html2canvas(printContainer, {
      backgroundColor: "#ffffff",
      scale: 3,
      useCORS: true,
      logging: false,
      windowWidth: printContainer.offsetWidth,
      windowHeight: printContainer.scrollHeight,
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
  } catch (err) {
    console.error("PDF 导出失败:", err)
  } finally {
    // 销毁临时节点
    if (document.body.contains(printContainer)) {
      document.body.removeChild(printContainer)
    }
  }
}

