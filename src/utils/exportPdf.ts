import html2pdf from "html2pdf.js"

export async function exportResumeToPdf(target: HTMLElement, fileName: string) {
  // 查找我们要导出的根节点
  const el = target.querySelector(`[data-pdf-target="true"]`) as HTMLElement
  if (!el) return

  // 设置导出配置，调整 scale 和 格式保证清晰度与无偏移
  const opt = {
    margin: 0,
    filename: `${fileName}.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 3,
      useCORS: true,
      letterRendering: true,
      scrollY: 0,
      windowWidth: el.offsetWidth,
      windowHeight: el.scrollHeight,
    },
    jsPDF: { unit: "pt", format: "a4", orientation: "portrait", compress: true },
  }

  // 临时创建一个脱离原来复杂包裹容器（没有 scale 干扰）的节点用于克隆截图
  const printContainer = document.createElement("div")
  printContainer.style.position = "absolute"
  printContainer.style.top = "-9999px"
  printContainer.style.left = "0"
  printContainer.style.width = `${el.offsetWidth}px`
  printContainer.style.backgroundColor = "white"

  // 深度克隆节点以保留样式
  const clonedEl = el.cloneNode(true) as HTMLElement
  printContainer.appendChild(clonedEl)
  document.body.appendChild(printContainer)

  try {
    // 调用 html2pdf 生成
    await html2pdf().set(opt).from(printContainer).save()
  } finally {
    // 销毁临时节点
    document.body.removeChild(printContainer)
  }
}

