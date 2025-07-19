<template>
    <div
        class="px-6 py-4 border border-primary-800 bg-primary-900 rounded-lg flex items-center space-x-4 hover:bg-[#1F1F1F] cursor-pointer">
        <NuxtImg src="/icon/Iconly/Light/Paper.svg" width="24" height="24" class="w-6 h-6" alt="" />
        
        <p class="w-full truncate">
            <slot></slot>
        </p>
        <slot name="tooltip"></slot>
    </div>
</template>