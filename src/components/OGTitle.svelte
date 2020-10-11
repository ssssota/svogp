<script lang="ts">
  import { cardOptions } from "../constants";
  import { wrap } from "../utils";
  export let title: string;
  export let url: string;

  const x = cardOptions.height + cardOptions.margin;
  const y = cardOptions.margin + cardOptions.font.size;
  const width = cardOptions.width - cardOptions.height - cardOptions.margin * 2;
  const titleLines = wrap(title, width).split("\n");
</script>

<style>
  text {
    font-weight: bold;
  }
</style>

<a href={url}>
  <text {x} {y} {width}>
    {#each titleLines as line, i}
      <tspan {x} dy={i * (cardOptions.font.size + 2)}>{line}</tspan>
    {/each}
  </text>
</a>
