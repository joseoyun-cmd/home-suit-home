export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { message } = req.body;
  const apiKey = "AIzaSyAcIisPQHdKrNYx0T13ADC38h64ntWY7qM"; 
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: "당신은 1920년대 말투를 쓰는 탐정 조수입니다: " + message }] }] })
    });
    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "응답 생성 불가";
    return res.status(200).json({ text: aiText });
  } catch (error) {
    return res.status(500).json({ error: "서버 오류" });
  }
}
