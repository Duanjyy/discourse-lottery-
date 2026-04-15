export async function compressImageToDataUrl(file: File, opts?: { maxSize?: number; quality?: number }) {
  const maxSize = opts?.maxSize ?? 560
  const quality = opts?.quality ?? 0.86

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error("read_failed"))
    reader.onload = () => resolve(String(reader.result))
    reader.readAsDataURL(file)
  })

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("image_load_failed"))
    image.src = dataUrl
  })

  const w = img.naturalWidth || img.width
  const h = img.naturalHeight || img.height
  const scale = Math.min(1, maxSize / Math.max(w, h))
  const tw = Math.max(1, Math.round(w * scale))
  const th = Math.max(1, Math.round(h * scale))

  const canvas = document.createElement("canvas")
  canvas.width = tw
  canvas.height = th
  const ctx = canvas.getContext("2d")
  if (!ctx) return dataUrl
  ctx.drawImage(img, 0, 0, tw, th)

  const mime = file.type === "image/png" ? "image/png" : "image/jpeg"
  return canvas.toDataURL(mime, mime === "image/png" ? undefined : quality)
}

