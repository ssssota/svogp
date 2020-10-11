<script lang="ts">
  export let title: string;
  export let url: string;
</script>

<style>
  a {
    transform: translate(10px, 280px);
    font-size: 1.25em;
  }
  text {
    font-weight: bold;
  }
</style>

<a href={url}>
  <text>{title}</text>
</a>
