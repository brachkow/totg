<template>
  <form @submit="submit" class="w-full">
    <div class="flex">
      <input
        type="text"
        v-model="link"
        class="bg-gray-100 px-4 py-2 rounded-tl-md rounded-bl-md w-full"
      />
      <button
        @click="generate"
        class="bg-telegram text-white px-4 py-2 rounded-tr-md rounded-br-md"
      >
        Generate
      </button>
    </div>
    <div class="mt-5 text-center" v-if="generatedPath !== undefined">
      <p class="leading-loose">Your link:</p>
      <div
        :to="generatedPath"
        class="bg-gray-100 flex rounded-md px-4 py-2 select-all cursor-pointer justify-center"
      >
        {{ generatedUrl }}
      </div>
      <p class="leading-loose">It's already copied to clipboard:)</p>
    </div>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        link: '',
        origin: '',
        generatedPath: undefined,
      };
    },
    computed: {
      generatedUrl() {
        return this.origin + this.generatedPath;
      },
    },
    watch: {
      generatedUrl() {
        this.$clipboard(this.generatedUrl);
      },
    },
    methods: {
      submit(e) {
        e.preventDefault();
        this.generate();
      },
      generate() {
        const match = this.link.match(
          /(?:https:\/\/)?t\.me\/([A-Za-z0-9]*)\/?([A-Za-z0-9]*)\/?/,
        );
        const slug1 = match[1];
        const slug2 = match[2];
        if (slug1 === 'addstickers') {
          this.generatedPath = `/addstickers/${slug2}`;
        } else if (slug1 === 'joinchat') {
          this.generatedPath = `/joinchat/${slug2}`;
        } else {
          if (slug2 !== '') {
            this.generatedPath = `/${slug1}/${slug2}/`;
          } else {
            this.generatedPath = `/${slug1}`;
          }
        }
      },
    },
    mounted() {
      this.origin = window.location.origin;
    },
  };
</script>
