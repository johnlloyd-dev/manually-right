<template>
    <v-app>
        <header-menu />
        <v-container max-width="1300">
            <menu-tabs/>
        </v-container>
        <v-main>
            <v-container max-width="1300">
                <slot />
            </v-container>
        </v-main>
        <footer-menu />
        <component v-if="isActiveModal" :active="true" :is="activeModalComponent"></component>
    </v-app>
</template>

<script setup>
import { useModalStore } from '@/store/modal';
import AuthModal from '~/components/auth-modal.vue';

const modalStore = useModalStore();
const isActiveModal = computed(() => modalStore.isActiveModal);

const activeModalComponent = computed(() => {
    const components = {
        'auth-modal': AuthModal
    };
    
    return components[modalStore.activeModalComponent];
});
</script>