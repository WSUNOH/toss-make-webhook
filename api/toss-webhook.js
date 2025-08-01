export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    // 1. Toss에서 보낸 JSON 파싱
    const data = await req.json(); // ❗ 핵심

    // 2. Make.com Webhook 주소로 전달
    const response = await fetch('https://hook.us2.make.com/rx8axk4e9b1s9f6cz9jenjblzktiv8y3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // ❗ 반드시 JSON 형태로 보냄
    });

    if (!response.ok) {
      console.error('Make.com 전송 실패:', await response.text());
      return res.status(500).send('Failed to send to Make');
    }

    // 3. 완료 응답
    return res.status(200).send('OK');
  } catch (error) {
    console.error('에러 발생:', error);
    return res.status(500).send('Server Error');
  }
}
