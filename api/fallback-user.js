// /api/fallback-user.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const {
    user_id,
    name,
    birth,
    orderId,
    amount,
    discount,
    method,
    product,
  } = req.body;

  try {
    console.log("📦 Fallback 수신됨:");
    console.log({ user_id, name, birth, orderId, amount, discount, method, product });

    return res.status(200).json({ success: true, message: 'Fallback 수신 완료' });
  } catch (err) {
    console.error("❌ Fallback 처리 실패:", err);
    return res.status(500).json({ error: 'Fallback 저장 실패' });
  }
}
