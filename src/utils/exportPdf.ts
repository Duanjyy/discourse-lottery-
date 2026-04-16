export async function exportResumeToPdf(target: HTMLElement, fileName: string) {
  // 从 target 内部，或者干脆从整个 document 里找
  const el = (target.querySelector(`[data-pdf-target="true"]`) ||
    document.querySelector(`[data-pdf-target="true"]`)) as HTMLElement

  if (!el) {
    console.error("未找到 PDF 导出目标节点")
    return
  }

  // 1. 保存当前页面的原有标题，用于打印时作为默认文件名
  const originalTitle = document.title
  document.title = fileName

  // 2. 动态插入一段专门用于打印的 CSS
  // 打印时：隐藏页面其他所有内容，只显示我们要打印的那个节点，并去除所有的圆角和阴影
  const style = document.createElement("style")
  style.textContent = `
    @media print {
      body * {
        visibility: hidden;
      }
      #print-pdf-container, #print-pdf-container * {
        visibility: visible;
      }
      #print-pdf-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        margin: 0;
        padding: 0;
        transform: none !important;
        box-shadow: none !important;
        border-radius: 0 !important;
      }
      @page {
        size: A4 portrait;
        margin: 0; /* 根据需要调整，0表示无边距 */
      }
    }
  `
  document.head.appendChild(style)

  // 3. 给我们要打印的节点加上指定的 ID，并临时去除导致问题的样式
  const originalTransform = el.style.transform
  const originalBoxShadow = el.style.boxShadow
  const originalBorderRadius = el.style.borderRadius
  
  el.id = "print-pdf-container"
  el.style.transform = "none"
  el.style.boxShadow = "none"
  el.style.borderRadius = "0"

  // 稍微延迟等待样式应用
  await new Promise((resolve) => setTimeout(resolve, 100))

  try {
    // 4. 调用浏览器原生的打印机
    window.print()
  } catch (err) {
    console.error("PDF 导出失败:", err)
  } finally {
    // 5. 清理现场
    el.id = ""
    el.style.transform = originalTransform
    el.style.boxShadow = originalBoxShadow
    el.style.borderRadius = originalBorderRadius
    document.head.removeChild(style)
    document.title = originalTitle
  }
}

