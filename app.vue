<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css' // vue-sonner v2 requires this import
</script>

<template>
  <Toaster position="bottom-right" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>


