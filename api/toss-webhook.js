export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const data = req.body;

  const makeWebhookUrl = 'https://hook.us2.make.com/rx8axk4e9b1s9f6cz9jenjblzktiv8y3'; // <-- 여기 너 Make 주소로 바꿔!

  try {
    const response = await fetch(makeWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      console.error('Make 전송 실패', await response.text());
      return res.status(500).send('Make Webhook 전송 실패');
    }

    return res.status(200).send('OK');
  } catch (error) {
    console.error('에러 발생:', error);
    return res.status(500).send('Server Error');
  }
}
