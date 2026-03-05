import puppeteer from 'puppeteer';
export async function POST(req: Request) {
    const { dashboardData } = await req.json();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.evaluateOnNewDocument((data) => {
    localStorage.setItem("rapport-de-stage", JSON.stringify(data));
    }, dashboardData);
    await page.goto("http://localhost:3000/rapport-de-stage/responsable", {
    waitUntil: "networkidle0",
    });
    await page.emulateMediaType("print");
    const pdf: any = await page.pdf({ format: "A4", printBackground: true, scale: 0.98, }); // Parameter of size, format and other
    await browser.close();
    return new Response(pdf, {
        headers: {
            "Content-Type": "application/pdf",
        },
    });
}
