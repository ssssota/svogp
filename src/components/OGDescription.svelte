<script lang="ts">
  import { cardOptions } from "../constants";
  import { wrap } from "../utils";
  export let description: string;

  const x = cardOptions.height + cardOptions.margin;
  const y = cardOptions.margin + cardOptions.font.size * 3.5;
  const width = cardOptions.width - cardOptions.height - cardOptions.margin * 2;
  const lines = wrap(description, width).split("\n");
</script>

<style>
  text {
    fill: #666;
  }
</style>

<g>
  <text {x} {y} {width}>
    {#each lines as line, i}
      <tspan {x} {y} dy={cardOptions.font.size * i}>{line}</tspan>
    {/each}
  </text>
</g>
