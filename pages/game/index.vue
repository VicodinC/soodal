<template>
    <h2>현재숫자: {{ currentNumber }}</h2>
    <h1>1부터 100까지 눌러주세요.</h1>
    <h1>버튼색깔 {{ currentColor }}</h1>
    <div class="grid grid-cols-10 p-2 gap-2">
        <div v-for="(item, i) in numberBtnColorList" :key="i" class="bg-gray-200 p-2 text-center">
            <div @click="currentColor = item.color" :class="item.color">
                {{ item.color }}
            </div>
        </div>
    </div>
    <div class="grid grid-cols-10 p-2 gap-2">
        <div v-for="item in numberList" :key="i" class="bg-gray-200 p-2 text-center">
            <div @click="clickNumber(item)" :class="item.clickStatus ? currentColor : ''">
                {{ item.number }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const currentNumber = ref(0);
const currentColor = ref('red');

//check 시 컬러리스트 check 클릭시 true 나머지 false
const numberBtnColorList = ref([
    { color: 'bg-red-200', check: false },
    { color: 'bg-blue-200', check: false },
    { color: 'bg-yellow-200', check: false },
    { color: 'bg-green-200', check: false },
    { color: 'bg-purple-200', check: false },
    { color: 'bg-orange-200', check: false },
    { color: 'bg-pink-200', check: false },
]);

//numberList 1부터 100까지 배열
const numberList = ref([]);
for (let i = 1; i <= 100; i++) {
    numberList.value.push({ number: i });
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

</script>