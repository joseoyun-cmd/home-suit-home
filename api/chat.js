export default async function handler(req, res) {
  // CORS 해결을 위해 헤더 추가
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const apiKey = "AIzaSyAcIisPQHdKrNYx0T13ADC38h64ntWY7qM"; 
  
  // 블로그 예시처럼 v1beta와 gemini-pro 조합으로 호출합니다.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "당신은 1920년대 말투를 쓰는 유능한 탐정 조수입니다. 질문에 답하세요: " + message }] }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    // 데이터 구조에 맞춰 텍스트 추출
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "조수가 대답을 망설이고 있습니다.";
    return res.status(200).json({ text: aiText });

  } catch (error) {
    return res.status(500).json({ error: "서버 연결 오류가 발생했습니다." });
  }
}
