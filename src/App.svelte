<script lang="ts">
	import { cardOptions } from "./constants";
	import OGImage from "./components/OGImage.svelte";
	import OGTitle from "./components/OGTitle.svelte";
	import OGDescription from "./components/OGDescription.svelte";
	export let title: string | undefined;
	export let description: string | undefined;
	export let url: string;
	export let image: string | undefined;
</script>

<style>
	svg {
		border: 1px solid #ccc;
		background: #f5f5f5;
	}
</style>

<svg
	viewBox={`0 0 ${cardOptions.width} ${cardOptions.height}`}
	width={cardOptions.width}
	height={cardOptions.height}
	xmlns="http://www.w3.org/2000/svg">
	<OGImage image={image || ''} />
	<OGTitle title={title || url} {url} />
	<OGDescription description={description || ''} />
</svg>
