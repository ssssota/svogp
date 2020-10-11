<script lang="ts">
  import { cardOptions } from "../constants";
  export let image: string;
  const imageWidth = cardOptions.width;
  const imageHeight = (630 / 1200) * cardOptions.width;
</script>

<style>
  image {
    width: 100%;
    transform: translateY(-50%);
  }
</style>

<svg
  width={imageWidth}
  height={imageHeight}
  viewBox={`0 0 ${imageWidth} ${imageHeight}`}>
  <g>
    <image href={image} />
  </g>
</svg>
