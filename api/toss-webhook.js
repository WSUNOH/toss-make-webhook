export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const {
    user_id,
    method,
    orderId,
    discount,
    amount,
    product,
  } = req.body;

  const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN; // ← 여기에 하드코딩

  try {
    console.log("TOKEN:", AIRTABLE_TOKEN);
    const airtableRes = await fetch('https://api.airtable.com/v0/appmtIGM3sHsOGQJq/tblDDbTlebFUp1kt8', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
    user_id,
    method,
    orderId,
    discount,
    amount,
    product,
            },
          },
        ],
      }),
    });

    const result = await airtableRes.json();
    console.log("RESULT:", result);

    return res.status(200).json({ success: true, airtable: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Airtable save failed' });
  }
}
