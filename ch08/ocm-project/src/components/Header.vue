<template>
    <v-app-bar color="primary" dense>
        <!-- Menu Toggle Button -->
        <v-app-bar-nav-icon @click="$emit('toggle-menu')" />

        <!-- Title -->
        <v-app-bar-title>OCM System</v-app-bar-title>

        <!-- Right-side Actions -->
        <template v-slot:append>
            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </template>
    </v-app-bar>
</template>