document.addEventListener('DOMContentLoaded', function() {
    const entryForm = document.getElementById('entryForm');
    const entryText = document.getElementById('entryText');
    const entryList = document.getElementById('entryList');

    // 이전에 저장된 일기 데이터 불러오기
    const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];

    // 불러온 일기 목록을 화면에 표시
    savedEntries.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = entry;
        entryList.prepend(listItem);
    });

    entryForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const text = entryText.value.trim(); // Get text from textarea and remove leading/trailing whitespace

        if (text !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = text;
            entryList.prepend(listItem); // Add new entry to the beginning of the list

            // 새로운 일기를 저장된 목록에 추가
            savedEntries.push(text);
            localStorage.setItem('entries', JSON.stringify(savedEntries));

            entryText.value = ''; // Clear textarea after saving entry
        } else {
            alert('Please write something before saving.');
        }
    });
});