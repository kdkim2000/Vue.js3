<template>
    <v-container>
        <h1>Settings</h1>

        <v-card class="pa-4">
            <v-card-title>Theme Settings</v-card-title>
            <v-card-text>
                <v-radio-group v-model="selectedTheme" @change="changeTheme">
                    <v-radio label="Light Theme" value="light"></v-radio>
                    <v-radio label="Dark Theme" value="dark"></v-radio>
                </v-radio-group>
            </v-card-text>
        </v-card>

        <v-btn color="primary" class="mt-4" @click="goBack">Back</v-btn>
    </v-container>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useTheme } from 'vuetify';
import { useRouter } from 'vue-router';

// Vuetify theme instance
const theme = useTheme();
const router = useRouter();

// 현재 테마를 저장
const selectedTheme = ref(localStorage.getItem('user-theme') || 'light');

// 테마 변경 함수
const changeTheme = () => {
    theme.global.name.value = selectedTheme.value;
    localStorage.setItem('user-theme', selectedTheme.value);
};

// 페이지 로드시 저장된 테마 적용
watch(selectedTheme, () => {
    changeTheme();
});

// 뒤로 가기 버튼 처리
const goBack = () => {
    router.push('/');
};
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 20px;
}
</style>
