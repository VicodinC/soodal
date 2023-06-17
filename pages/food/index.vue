<template>
    <div>
        <div>food</div>
        <!-- 음식정보 목록 -->
        <div class="grid grid-cols-1 gap-5">
            <!-- 음식정보 한줄로 -->
            <div v-for="food in foods" :key="food.id" class="grid grid-cols-5">
                <div>{{ food.id }}</div>
                <div>{{ food.name }}</div>
                <div>{{ food.price }}</div>
                <div>{{ food.description }}</div>
                <!-- 음식정보 삭제 -->
                <div>
                    <button @click="deleteFood(food.id)">삭제</button>
                </div>
            </div>
        </div>
        <!-- 음식정보 추가 -->
        <div>
            <input type="text" placeholder="음식명" v-model="name" />
            <input type="number" placeholder="가격" v-model="price" />
            <input type="text" placeholder="설명" v-model="description" />
            <button @click="saveFood">추가</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const baseUrl = 'http://localhost:8080'
const apiUrl = computed(() => `${baseUrl}/api`)

const name = ref('')
const price = ref('')
const description = ref('')
const foods = ref([])

onMounted(async () => {
    const response = await fetch(apiUrl.value + '/foods')
    const data = await response.json()
    foods.value = data
})

//음식정보 삭제
const deleteFood = async (id) => {
    const response = await fetch(`${apiUrl.value}/food/${id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        const index = foods.value.findIndex((food) => food.id === id)
        foods.value.splice(index, 1)
    }
}

//음식정보 추가
const saveFood = async () => {
    const response = await fetch(`${apiUrl.value}/food`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name.value,
            price: price.value,
            description: description.value,
        }),
    })
    if (response.ok) {
        const data = await response.json()
        foods.value.push(data)
    }
}


</script>