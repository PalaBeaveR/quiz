<script lang="ts">
    import { onDestroy, onMount } from 'svelte';

    import { enhance } from '$app/forms';
    import { Event } from '$lib/users';

    let username = '';
    let events: WritableStreamDefaultWriter | null;

    onDestroy(() => {
        events?.close();
    });

    onMount(async () => {
        let events = new EventSource('/api/listen');

        events.addEventListener(Event.Join, (e) => {
            let data = JSON.parse(e.data);
            users = [...users, data.username];
        });

        events.addEventListener(Event.ChangeName, (e) => {
            let data = JSON.parse(e.data);
            let foundInd = users.findIndex((u) => u == data.old);
            if (foundInd != -1) {
                users.splice(foundInd, 1, data.new);
            }
            users = users;
        });

        events.addEventListener(Event.HeartBeat, () => {
            fetch('/api/heartbeat', { method: 'POST', body: JSON.stringify({ username }) });
        });

        events.addEventListener(Event.YourUsername, (e) => {
            username = JSON.parse(e.data).username;
        });

        events.addEventListener(Event.Left, (e) => {
            let data = JSON.parse(e.data);
            users = users.filter((u) => u != data.name);
        });

        users = await (
            await fetch('/api/get_users', {
                method: 'Post'
            })
        ).json();
    });
    let dialog: HTMLDialogElement;
    let users: string[] = [];
</script>

<dialog open bind:this={dialog} class="modal">
    <form
        action="?/register"
        method="POST"
        use:enhance={() => {
            return async ({ result }) => {
                if (result.status == 200) {
                    dialog.close();
                }
            };
        }}
        class="join join-vertical"
    >
        <input name="old" hidden bind:value={username} />
        <input placeholder="Name" name="name" class="join-item input input-bordered" />
        <button type="submit" class="btn join-item">ok</button>
    </form>
</dialog>

<h1 class="w-full absolute top-5 font-bold text-center text-5xl">You are {username}!</h1>

<div class="bg-gray-100 right-5 top-5 p-2 rounded-xl absolute w-1/4">
    {#each users as user}
        <h1 class="font-bold">{user}</h1>
    {/each}
</div>
