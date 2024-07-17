function generateImageUrl({
  fileName,
  format,
  option = 'q_auto,c_fill',
}: {
  fileName: string
  format: 'jpg' | 'webp'
  option?: string
}) {
  return `https://res.cloudinary.com/dnb0nfuyo/image/upload/v1721102355/image1_bbyvw0.jpg`
}
export default generateImageUrl
