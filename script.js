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

function generateItinerary(lat, lng) {
    // AI 기능: 다음 단계에서 채울게
    document.getElementById('itinerary').innerText = 'AI가 일정을 짜는 중...';
}