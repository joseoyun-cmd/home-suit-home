// Vercel Serverless Function to proxy Gemini API requests
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  // Vercel 환경 변수(Environment Variables)에 GEMINI_API_KEY를 등록하는 것이 안전하지만,
  // 우선 작동 확인을 위해 기존 키를 내장합니다.
  const apiKey = "AIzaSyAcIisPQHdKrNYx0T13ADC38h64ntWY7qM"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: "당신은 1920년대 말투를 쓰는 부동산 법률 전문가 조수입니다. 다음 질문에 답하세요: " + message }]
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "응답을 생성할 수 없습니다.";
    return res.status(200).json({ text: aiText });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
