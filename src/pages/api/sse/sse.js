
export default async function serviceSendEvent(req, res) {
    if (req.method === 'GET') {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache, no-transform');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');
        const interval = setInterval(() => {
            console.log('Sending data...');
            res.write(`data: ${JSON.stringify({ time: new Date().toISOString() })}\n\n`);
        },1000)
        res.on('close', () => {
            clearInterval(interval);
            res.end();
            console.log('Client disconnected')
        })
    } else {
        res.status(405).end('Method Not Allowed');
    }
}