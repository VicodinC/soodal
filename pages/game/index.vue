<template>
    <h2>현재숫자: {{ currentNumber }}</h2>
    <h1>1부터 100까지 눌러주세요.</h1>
    <div class="grid grid-cols-10 gap-2">
        <div v-for="item in numberList" :key="i" class="bg-gray-200 p-2 text-center">
            <div @click="clickNumber(item)" :class="item.clickStatus ? 'bg-red-500' : ''">
                {{ item.number }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref} from 'vue'

const currentNumber = ref(0);

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
        
    }
    
    currentNumber.value = item.number;
    item.clickStatus = true;
}

</script>