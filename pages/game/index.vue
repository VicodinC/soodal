<template>

    <h2>현재숫자: {{ currentNumber }}</h2>
    <button @click="initGame">게임초기화</button>
    <button @click="setNumberListLength(10)">{{numberList.length}}개</button>
    <button @click="shuffle(numberList)">숫자배열 섞기</button>
    <h1>1부터 100까지 눌러주세요.</h1>
    <h1 :class="currentColor.color">버튼색깔 {{ currentColor.colorName }}</h1>
    <div class="grid grid-cols-10 p-2 gap-2">
        <div v-for="(item, i) in numberBtnColorList" :key="i" class="bg-gray-200 p-2 text-center">
            <div @click="clickColorBtn(item)" :class="item.check ? currentColor.color : ''">
                {{ item.colorName }}
            </div>
        </div>
    </div>
    <div class="grid grid-cols-10 p-2 gap-2">
        <div v-for="(item, i) in numberList" :key="i" :class="['bg-gray-200 flex items-center h-15', item.check ? currentColor.color : '']">
            <div @click="clickNumber(item)" class="w-full text-center">
                {{ item.number }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentNumber = ref(0);
const currentColor = ref({ colorName: '빨강',color: 'bg-red-200' });

//check 시 컬러리스트 check 클릭시 true 나머지 false
const numberBtnColorList = ref([
    { colorName: '빨강',color: 'bg-red-200', check: false },
    { colorName: '파랑',color: 'bg-blue-200', check: false },
    { colorName: '노랑',color: 'bg-yellow-200', check: false },
    { colorName: '초록',color: 'bg-green-200', check: false },
    { colorName: '보라',color: 'bg-purple-200', check: false },
    { colorName: '주황',color: 'bg-orange-200', check: false },
    { colorName: '분홍',color: 'bg-pink-200', check: false },
]);

//컬러선택버튼
const clickColorBtn = (item) => {
    currentColor.value = item;
    numberBtnColorList.value.forEach((item) => {
        item.check = false;
    });
    item.check = true;
}

//numberList 1부터 100까지 배열
const numberList = ref([]);
for (let i = 1; i <= 100; i++) {
    numberList.value.push({ number: i });
}

//숫자배열 길이 세팅
const setNumberListLength = (length) => {
    numberList.value = [];
    for (let i = 1; i <= length; i++) {
        numberList.value.push({ number: i });
    }
}

//numverList 배열 랜덤하게 섞기
const shuffle = () => {
    numberList.sort(() => Math.random() - 0.5);
}

//clickNumber 클릭한 item의 배경색 변하게
const clickNumber = (item) => {

    //item.number가 currentNumber보다 1 커야지 통과 
    if (item.number !== currentNumber.value + 1) {
        return;
    } else {
        currentNumber.value = item.number;
        item.clickStatus = true;
    }
}

const initGame = () => {
    currentNumber.value = 0;
    currentColor.value = { colorName: '빨강',color: 'bg-red-200' };
    numberBtnColorList.value.forEach((item) => {
        item.check = false;
    });
    numberList.value.forEach((item) => {
        item.clickStatus = false;
    });
}

onMounted(() => {
    console.log('onMounted');
    initGame();
});

</script>