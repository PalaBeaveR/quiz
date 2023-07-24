<script lang="ts">
    import { BuzzerState, type User } from '$lib/users';

    export let user: User;
    export let admin = false;
    export let player: boolean;

    function updateScore(amount: number) {
        fetch('/api/score', {
            method: 'POST',
            body: JSON.stringify({ username: user.name, score: amount })
        });
    }
</script>

<div class="w-40 h-56 p-1 bg-white card flex flex-col space-y-1 indicator tooltip tooltip-open" data-tip={player ? "" : user.answer}>
    <h1 class="m-2 text-center font-bold text-2xl">{user.name}</h1>
    {#if user.buzzer == BuzzerState.Reset}
        <span class="indicator-item indicator-center badge bg-gray-300" />
    {:else if user.buzzer == BuzzerState.First}
        <span class="indicator-item indicator-center badge bg-green-300" />
    {:else}
        <span class="indicator-item indicator-center badge bg-orange-300" />
    {/if}
    {#if admin}
        <input
            type="number"
            class="input input-bordered text-center"
            bind:value={user.score}
            on:change={(e) => {
                let value = parseInt(e?.target?.value);
                if (!isNaN(value)) {
                    updateScore(value);
                }
            }}
        />
        <div class="flex space-x-1">
            <button class="btn flex-1" on:click={() => updateScore(user.score - 1)}>-</button>
            <button class="btn flex-1" on:click={() => updateScore(user.score + 1)}>+</button>
        </div>
    {:else}
        <div class="flex flex-1 justify-center items-center">
            <h1 class="text-center text-4xl">{user.score} points</h1>
        </div>
    {/if}
</div>
