<template>
  <a
    class="bg-telegram text-white px-4 py-2 rounded mx-auto"
    :href="`tg://resolve?domain=${$route.params.name}&post=${$route.params.id}`"
    >Открыть в Telegram</a
  >
</template>
