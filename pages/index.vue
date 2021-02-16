<template>
  <div>
    <form @submit="submit">
      <input type="text" v-model="link" />
      <button @click="generate">Generate!</button>
      <NuxtLink :to="generatedPath" v-if="generatedPath !== undefined">
        {{ generatedUrl }}
      </NuxtLink>
    </form>
  </div>
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
      console.log(window.location.host);
    },
  };
</script>
