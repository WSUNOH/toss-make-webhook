export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const {
    student_id,
    pay_method,
    pay_date,
    discount,
    final_price,
    plan_code,
  } = req.body;

  const AIRTABLE_TOKEN = 'pat4VAYd2zWRj4CJ0'; // ← 여기에 하드코딩

  try {
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
              student_id,
              pay_method,
              pay_date,
              discount,
              final_price,
              plan_code,
            },
          },
        ],
      }),
    });

    const result = await airtableRes.json();

    return res.status(200).json({ success: true, airtable: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Airtable save failed' });
  }
}
