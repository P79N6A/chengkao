<template>
  <div class="i-footer">aaa
    {{version}}bbb
  </div>
</template>

<script>
export default {
  data() {
    return {
      version: '<#=version#>',
    }
  },

  mounted() {

  }
}
</script>
