document.addEventListener("DOMContentLoaded", () => {
    const menuSelect = document.getElementById("menu");
    const priceDisplay = document.getElementById("price");
    const addMenuBtn = document.getElementById("addMenuBtn");
    const selectedMenuList = document.getElementById("selectedMenuList");
    const totalCount = document.getElementById("totalCount");
    const totalAmount = document.getElementById("totalAmount");

    let selectedCount = 0;
    let totalPrice = 0;
    const maxSelection = 12;

    // JSON 파일 불러오기
    fetch("menu.json")
        .then(response => response.json())
        .then(data => {
            // 드롭다운 메뉴 옵션 생성
            data.forEach(item => {
                const option = document.createElement("option");
                option.value = item.price;
                option.textContent = `${item.name} - ${item.price}원`;
                menuSelect.appendChild(option);
            });

            // 기본 선택된 옵션 가격 표시
            if (data.length > 0) {
                priceDisplay.textContent = `가격: ${menuSelect.value}원`;
            }
        })
        .catch(error => console.error("메뉴를 불러오는 중 오류가 발생했습니다:", error));

    // 메뉴 선택 시 가격 업데이트
    menuSelect.addEventListener("change", () => {
        priceDisplay.textContent = `가격: ${menuSelect.value}원`;
    });

    // 메뉴 추가 버튼 클릭 시
    addMenuBtn.addEventListener("click", () => {
        if (selectedCount < maxSelection) {
            const selectedOption = menuSelect.options[menuSelect.selectedIndex];
            const listItem = document.createElement("li");
            listItem.textContent = `${selectedOption.textContent} `;
            
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "삭제";
            deleteButton.addEventListener("click", () => {
                selectedMenuList.removeChild(listItem);
                selectedCount--;
                totalPrice -= parseInt(selectedOption.value);
                
                totalCount.textContent = selectedCount;
                totalAmount.textContent = totalPrice;

                addMenuBtn.disabled = false;
            });

            listItem.appendChild(deleteButton);
            selectedMenuList.appendChild(listItem);

            selectedCount++;
            totalPrice += parseInt(selectedOption.value);

            totalCount.textContent = selectedCount;
            totalAmount.textContent = totalPrice;

            if (selectedCount === maxSelection) {
                addMenuBtn.disabled = true;
            }
        }
    });
});
