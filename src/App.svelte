<script lang="ts">
	export let title: string;
	export let description: string;
	export let url: string;
	export let image: string;
</script>

<style>
</style>

<svg
	viewBox="0 0 90 55"
	width="90mm"
	height="55mm"
	xmlns="http://www.w3.org/2000/svg">
	<text>{title}</text>
	<text>{description}</text>
	<text>{url}</text>
	<text>{image}</text>
</svg>
