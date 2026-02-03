import * as htmlToImage from "html-to-image"

export async function exportHtmlToImage(ref: React.RefObject<HTMLElement>, fileName = "export.png") {

    if (!ref.current) return

    const dataUrl = await htmlToImage.toPng(ref.current, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true, 
		style: {
			margin: "0",
			transform: "none",
		},
        backgroundColor: "#121212",
        filter: node => !node.classList?.contains("no-export")
    })

    const link = document.createElement("a")
    link.download = fileName
    link.href = dataUrl
    link.click()
}
