import lqip from "lqip-modern";
import fetch from "node-fetch";

const imgUrl = 'https://plus.unsplash.com/premium_photo-1708011759643-9c9d944b9c23?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

async function getDataUrl(url: string) {
    const imgData = await fetch(imgUrl)

    const arrayBufferData = await imgData.arrayBuffer()
    const lqipData = await lqip(Buffer.from(arrayBufferData))

    return lqipData.metadata.dataURIBase64
}

getDataUrl(imgUrl).then(console.log);

