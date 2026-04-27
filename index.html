// 1. Vercel 환경 변수에서 API 키를 안전하게 불러옵니다.
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 2. 모델 엔드포인트 설정
const MODEL_NAME = "gemini-1.5-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

export default async function handler(req, res) {
    // 브라우저 보안(CORS) 허용 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 사전 요청(OPTIONS) 처리
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // POST 요청만 허용
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { message } = req.body;

        // 구글 API로 보낼 페이로드 (탐정 조수 컨셉 포함)
        const payload = {
            contents: [{
                parts: [{
                    text: `너는 1920년대 말투를 쓰는 유능한 탐정 조수야. 탐정님의 말씀에 조수답게 친절하고 재치있게 대답해: ${message}`
                }]
            }]
        };

        const geminiResponse = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await geminiResponse.json();

        if (geminiResponse.ok) {
            // 성공 시 텍스트만 추출해서 전달
            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "조수가 잠시 생각에 잠겼습니다.";
            res.status(200).json({ text: aiText });
        } else {
            // 구글 API에서 발생한 에러를 그대로 전달
            res.status(geminiResponse.status).json(data);
        }
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: '서버 통신 오류가 발생했습니다.', details: error.message });
    }
}
