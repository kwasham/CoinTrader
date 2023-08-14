export default function testHandler(req, res) {
    console.log('Test API route triggered');
    res.status(200).json({ message: 'Test API route is working' });
}