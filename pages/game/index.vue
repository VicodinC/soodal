<template>
    <h2>현재숫자: {{ currentNumber }}</h2>
    <button @click="initGame">게임초기화</button>
    <div>
        <input type="number" v-model="numberListSize" class="input"><button @click="setNumberListLength()">숫자크기 변경</button>
    </div>
    <button @click="shuffle(numberList)" class="btn">숫자배열 섞기</button>
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
        <div v-for="(item, i) in numberList" :key="i"
            :class="['bg-gray-200 flex items-center h-15', item.clickStatus ? currentColor.color : '']">
            <div @click="clickNumber(item)" class="w-full text-center">
                {{ item.number }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

//변경되는 반응형 리스트 tempList


const currentNumber = ref(0);
const numberListSize = ref(100);
const numberList = ref([]);
const currentColor = ref({ colorName: '빨강', color: 'bg-red-200' });

//check 시 컬러리스트 check 클릭시 true 나머지 false
const numberBtnColorList = ref([
    { colorName: '빨강', color: 'bg-red-200', check: true },
    { colorName: '파랑', color: 'bg-blue-200', check: false },
    { colorName: '노랑', color: 'bg-yellow-200', check: false },
    { colorName: '초록', color: 'bg-green-200', check: false },
    { colorName: '보라', color: 'bg-purple-200', check: false },
    { colorName: '주황', color: 'bg-orange-200', check: false },
    { colorName: '분홍', color: 'bg-pink-200', check: false },
]);

//컬러선택버튼
const clickColorBtn = (item) => {
    console.log('clickColorBtn', item);
    currentColor.value = item;
    numberBtnColorList.value.forEach((item) => {
        item.check = false;
    });
    item.check = true;
}

//numberList 1부터 100까지 배열
const setNumberList = (size) => {
    console.log('setNumberList size', size);
    console.log('setNumberList numberList', numberList);
    
    //currentNumber 0으로 초기화
    currentNumber.value = 0;
    numberList.value = [];
    for (let i = 1; i <= size; i++) {
        numberList.value.push({ number: i, clickStatus: false });
    }
    watchEffect(() => {
        console.log('numberList', numberList);
    });
    console.log('setNumberList numberList2', numberList);
}


//숫자배열 길이 세팅
const setNumberListLength = () => {
    console.log('setNumberListLength', numberListSize.value);
    setNumberList(numberListSize.value);
}

//numverList 배열 랜덤하게 섞기
const shuffle = () => {
    console.log('shuffle', numberList);
    numberList.value.sort(() => Math.random() - 0.5);
    //currentNumber 0으로 초기화
    currentNumber.value = 0;
    initClick();
}

//clickNumber 클릭한 item의 배경색 변하게
const clickNumber = (item) => {
    console.log('clickNumber', item);
    //item.number가 currentNumber보다 1 커야지 통과 
    if (item.number !== currentNumber.value + 1) {
        console.log('clickNumber f', item.number, currentNumber.value + 1);
        return;
    } else {
        currentNumber.value = item.number;
        item.clickStatus = true;
        
        console.log('clickNumber t', item.number, item.clickStatus);
    }
}

const initGame = () => {
    console.log('initGame');
    setNumberList(numberListSize.value);
    currentColor.value = { colorName: '빨강', color: 'bg-red-200' };
    numberBtnColorList.value.forEach((item, index) => {
        if (index === 0) {
            item.check = true;
        } else {
            item.check = false;
        }
    });
}

//클릭 초기화
const initClick = () => {
    console.log('initClick');
    numberList.value.forEach((item) => {
        item.clickStatus = false;
    });
}

onMounted(() => {
    initGame();
});

watch(currentNumber, (newVal, oldVal) => {
    console.log('currentNumber', newVal, oldVal);
    if (newVal === numberListSize.value) {
        alert('임우주 축하합니다.');
        initGame();
    }
});
</script>