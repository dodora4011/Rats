document.addEventListener('DOMContentLoaded', function() {
    const entryForm = document.getElementById('entryForm');
    const entryText = document.getElementById('entryText');
    const entryList = document.getElementById('entryList');

    // 이전에 저장된 일기 데이터 불러오기
    const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];

    // 불러온 일기 목록을 화면에 표시
    savedEntries.forEach((entry, index) => {
        addEntryToUI(entry, index); // 화면에 일기 추가
    });

    // 일기를 화면에 추가하는 함수
    function addEntryToUI(entry, index) {
        const listItem = document.createElement('li');
        listItem.textContent = entry;

        // 삭제 버튼 생성
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            // 해당 인덱스의 일기 제거
            savedEntries.splice(index, 1);
            // 로컬 스토리지 업데이트
            localStorage.setItem('entries', JSON.stringify(savedEntries));
            // 화면에서 해당 일기 제거
            entryList.removeChild(listItem);
        });

        listItem.appendChild(deleteButton);
        entryList.appendChild(listItem);
    }

    entryForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const text = entryText.value.trim(); // Get text from textarea and remove leading/trailing whitespace

        if (text !== '') {
            addEntryToUI(text, savedEntries.length); // 화면에 일기 추가
            savedEntries.push(text); // 저장된 목록에 일기 추가
            localStorage.setItem('entries', JSON.stringify(savedEntries)); // 로컬 스토리지 업데이트
            entryText.value = ''; // Clear textarea after saving entry
        } else {
            alert('Please write something before saving.');
        }
    });
});