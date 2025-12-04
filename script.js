let map;
let marker;

function initMap() {
    // 지도 초기화: 서울 중심으로 시작 (위도, 경도)
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.5665, lng: 126.9780 }, // 서울 좌표
        zoom: 12 // 확대 수준 (숫자가 클수록 확대)
    });

    // 지도 클릭 이벤트: 클릭하면 마커 찍기
    map.addListener('click', function(event) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        
        // 기존 마커 제거
        if (marker) {
            marker.setMap(null);
        }
        
        // 새 마커 추가
        marker = new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: map
        });
        
        // 선택된 장소 표시
        document.getElementById('selected-location').innerText = `선택된 장소: 위도 ${lat.toFixed(4)}, 경도 ${lng.toFixed(4)}`;
        
        // AI 호출: 다음 단계에서 구현
        generateItinerary(lat, lng);
    });
}

async function generateItinerary(lat, lng) {
    document.getElementById('itinerary').innerText = 'AI가 일정을 짜는 중...';
    
    const apiKey = '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'; // 네 OpenAI API 키로 교체
    const prompt = `너는 여행 계획사야. 사용자가 선택한 장소 (위도: ${lat}, 경도: ${lng})를 기반으로 3일간의 실제 여행 일정을 자세하게 짜줘. 
    실제 장소 이름, 교통, 식사, 활동, 팁을 포함해. 예를 들어, 주변 명소, 호텔 추천, 예산 등. 한국어로 답변해.`;
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', 
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7 // 창의성 수준
            })
        });
        
        const data = await response.json();
        const itinerary = data.choices[0].message.content;
        
        document.getElementById('itinerary').innerText = `AI 생성 일정:\n\n${itinerary}`;
    } catch (error) {
        document.getElementById('itinerary').innerText = '오류 발생: ' + error.message + ' (API 키 확인하세요)';
    }
}
