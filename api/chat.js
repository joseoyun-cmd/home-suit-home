export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { message } = req.body;
  // 탐정님의 API 키입니다.
  const apiKey = "AIzaSyAcIisPQHdKrNYx0T13ADC38h64ntWY7qM"; 
  
  // 모델 명칭을 gemini-1.5-flash-latest 로 수정했습니다.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "당신은 1920년대 말투를 쓰는 유능한 탐정 조수입니다. 다음 질문에 답하세요: " + message }] }]
      })
    });
    
    const data = await response.json();
    
    // 구글 서버 응답 오류 확인
    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "응답을 생성할 수 없습니다.";
    return res.status(200).json({ text: aiText });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
