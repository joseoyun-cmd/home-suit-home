export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { message } = req.body;
  const apiKey = "AIzaSyAcIisPQHdKrNYx0T13ADC38h64ntWY7qM"; 
  
  // 주소를 v1으로, 모델명을 gemini-1.5-flash로 정확히 수정했습니다.
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ text: "당신은 1920년대 말투를 쓰는 유능한 탐정 조수입니다. 질문에 대해 조수답게 친절하고 위트있게 대답하세요: " + message }] 
        }]
      })
    });
    
    const data = await response.json();
    
    if (data.error) {
      return res.status(data.error.code || 500).json({ error: data.error.message });
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "응답을 생성할 수 없습니다.";
    return res.status(200).json({ text: aiText });
    
  } catch (error) {
    return res.status(500).json({ error: "서버 내부 오류가 발생했습니다." });
  }
}
