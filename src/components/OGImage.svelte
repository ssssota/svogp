<script lang="ts">
  import { cardOptions } from "../constants";
  export let image: string;
  const imageSize = cardOptions.height;
</script>

<style>
  * {
    transform-origin: center center;
  }
  image {
    width: 100%;
    height: 100%;
  }
</style>

<svg
  width={imageSize}
  height={imageSize}
  viewBox={`0 0 ${imageSize} ${imageSize}`}>
  <image href={image} />
</svg>
