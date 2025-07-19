<template>
    <div class="">
        <input type="radio" name="category" :value="option.id" :id="createID" class="hidden"
            @change="$parent.$emit('update:modelValue', $event.target.value)" :checked="isChecked" required />
        <label :for="createID" class="py-2 px-4 rounded-lg cursor-pointer" :class="getCheckStyle">
            {{ option.title || option.name }}
        </label>
    </div>
</template>

<script setup>

const createID = computed(() => {
    const token = Array.from(Array(10), () => Math.floor(Math.random() * 36).toString(36)).join('')
    return props.option.id + '-' + token
})

const getCheckStyle = computed(() => {
    return props.isChecked ? 'bg-primary-100 text-[#1A1A1A] hover:bg-white' : 'hover:bg-[#292929] text-white bg-primary-900'
})

const props = defineProps({
    option: {
        required: true,
        type: Object
    },
    isChecked: {
        type: Boolean
    },
})

defineEmits(['update:modelValue'])
</script>