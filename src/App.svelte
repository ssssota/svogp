<script lang="ts">
	import { cardOptions } from "./constants";
	import OGImage from "./components/OGImage.svelte";
	import OGTitle from "./components/OGTitle.svelte";
	import OGDescription from "./components/OGDescription.svelte";
	export let title: string;
	export let description: string;
	export let url: string;
	export let image: string;
</script>

<style>
	svg {
		border: 1px solid #ccc;
		background: #f5f5f5;
	}
</style>

<svg
	viewBox={`0 0 ${cardOptions.width} ${cardOptions.height}`}
	width={`${cardOptions.width}px`}
	height={`${cardOptions.height}px`}
	xmlns="http://www.w3.org/2000/svg">
	<OGImage {image} />
	<OGTitle {title} {url} />
	<OGDescription {description} />
</svg>
