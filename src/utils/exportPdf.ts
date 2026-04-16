import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export async function exportResumeToPdf(target: HTMLElement, fileName: string) {
  // 从 target 内部，或者干脆从整个 document 里找
  const el = (target.querySelector(`[data-pdf-target="true"]`) ||
    document.querySelector(`[data-pdf-target="true"]`)) as HTMLElement

  if (!el) {
    console.error("未找到 PDF 导出目标节点")
    return
  }

  // 临时创建一个脱离原来复杂包裹容器的节点用于克隆截图
  const printContainer = document.createElement("div")
  printContainer.style.position = "absolute"
  // 直接挂到文档顶部最前方（不受任何滚动条干扰）
  printContainer.style.top = "0"
  printContainer.style.left = "0"
  // 放在肉眼看不见的最底层
  printContainer.style.zIndex = "-9999"
  // 强行赋予绝对准确的 A4 等比例宽度
  printContainer.style.width = `${el.offsetWidth}px`
  printContainer.style.backgroundColor = "white"

  // 深度克隆节点以保留样式
  const clonedEl = el.cloneNode(true) as HTMLElement
  // 去除克隆节点自身的缩放影响、阴影和圆角
  clonedEl.style.transform = "none"
  clonedEl.style.borderRadius = "0"
  clonedEl.style.boxShadow = "none"
  clonedEl.style.margin = "0"

  printContainer.appendChild(clonedEl)
  document.body.appendChild(printContainer)

  try {
    // 等待克隆节点在屏幕边缘彻底渲染完毕
    await new Promise((resolve) => setTimeout(resolve, 300))

    // 重点：生成 canvas 时必须让滚动参数归零，且指定真实的 DOM 宽高
    const canvas = await html2canvas(printContainer, {
      backgroundColor: "#ffffff",
      scale: 3, // 3 倍超高清缩放
      useCORS: true,
      logging: false,
      scrollY: 0,
      scrollX: 0,
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

