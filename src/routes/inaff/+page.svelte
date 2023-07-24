<script lang="ts">
    import Ui from '$lib/comp/UI.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
</script>

<Ui {data} admin={true} />
