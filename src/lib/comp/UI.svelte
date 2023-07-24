<script lang="ts">
    import { enhance } from '$app/forms';
    import PlayerCard from '$lib/comp/PlayerCard.svelte';
    import type { Question, QuizCategorie } from '$lib/questions';
    import { QuizEvent, UserType, type User } from '$lib/users';
    import { onMount } from 'svelte';

    export let data: { users: User[] };
    let users: User[] = data.users;
    let me: User;
    export let admin = false;

    let loaded_questions: { [key in QuizCategorie]?: object } = {};

    let question: { question?: string; choices?: string[]; answer?: string } | null = null;

    onMount(() => {
        const buzzer = new Audio('/dong.mp3');
        buzzer.volume = 0.2;
        buzzer.load();

        if (admin) {
            fetch('/api/questions', {
                method: 'GET'
            }).then(async (q) => {
                loaded_questions = await q.json();
                console.log(loaded_questions);
            });
        }

        const events = new EventSource('/api/listen');

        events.addEventListener(QuizEvent.You, (e) => {
            me = JSON.parse(e.data);
        });

        events.addEventListener(QuizEvent.Answer, (e) => {
            answer_prompt.showModal();
        });

        events.addEventListener(QuizEvent.LobbyUpdate, (e) => {
            const data = JSON.parse(e.data);
            users = data.users;
        });

        events.addEventListener(QuizEvent.HeartBeat, (e) => {
            fetch('/api/heartbeat', {
                method: 'POST',
                body: JSON.stringify(me.name)
            });
        });

        events.addEventListener(QuizEvent.Buzz, (e) => {
            (buzzer.cloneNode(true) as HTMLAudioElement).play();
        });

        events.addEventListener(QuizEvent.Question, (e) => {
            question = JSON.parse(e.data);
        });

        return () => events.close();
    });

    let user_action_modal: HTMLDialogElement;
    let question_select_modal: HTMLDialogElement;
    let username_change_modal: HTMLDialogElement;
    let answer_prompt: HTMLDialogElement;
    let selected_user: User | null;
    let current_question: Question;
    let revealed_question: Question;

    function buzz(e: KeyboardEvent) {
        if (document.activeElement?.tagName == 'INPUT') return;
        if (admin && e.code == 'KeyR') {
            e.preventDefault();
            fetch('/api/buzz', {
                method: 'DELETE'
            });
        }
        if (admin && e.code == 'KeyQ') {
            e.preventDefault();
            question_select_modal.showModal();
        }

        if (e.code == 'KeyU') {
            e.preventDefault();
            username_change_modal.showModal();
        }

        if (admin && e.code == 'KeyC') {
            e.preventDefault();
            revealed_question.choices = current_question.choices;
            fetch('/api/question', {
                method: 'POST',
                body: JSON.stringify(revealed_question)
            });
        }

        if (admin && e.code == 'KeyA') {
            e.preventDefault();
            revealed_question.answer = current_question.answer;
            fetch('/api/question', {
                method: 'POST',
                body: JSON.stringify(revealed_question)
            });
        }

        if (admin && e.code == 'KeyP') {
            e.preventDefault();
            fetch('/api/answer', {
                method: 'GET'
            });
        }

        if (me.type == UserType.Player && e.code == 'Space') {
            e.preventDefault();
            fetch('/api/buzz', {
                method: 'POST',
                body: JSON.stringify(me.name)
            });
        }
    }

    let username = '';

    $: {
        if (me) {
            username = me.name;
        }
    }
</script>

<svelte:window on:keydown={buzz} />

<dialog class="modal" bind:this={answer_prompt}>
    <form class="modal-box space-y-4" use:enhance method="POST" action="/api/answer">
        <h1 class="font-bold text-3xl text-center">Write your answer</h1>
        <input type="text" name="username" bind:value={username} hidden />
        <input class="w-full input" type="text" name="answer" />
        <div class="modal-actions">
            <button
                class="btn"
                on:click={() => {
                    answer_prompt.close();
                }}>Submit</button
            >
        </div>
    </form>
</dialog>

<dialog class="modal" bind:this={username_change_modal}>
    <div class="modal-box space-y-4">
        <h1 class="font-bold text-3xl text-center">Change your username</h1>
        <input
            class="w-full"
            type="text"
            value={(me || { name: 'ok' }).name}
            on:focusout={(e) => {
                fetch('/api/user', {
                    method: 'PATCH',
                    body: JSON.stringify({
                        old_username: me.name,
                        new_username: e.target.value
                    })
                });
                username_change_modal.close();
            }}
        />
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>

{#if admin}
    <dialog class="modal" bind:this={user_action_modal}>
        {#if selected_user}
            <div class="modal-box">
                <h1 class="font-bold text-center text-4xl">{selected_user.name}</h1>
                <div class="join">
                    <button
                        class="btn join-item"
                        on:click={() => {
                            fetch('/api/promote', {
                                method: 'POST',
                                body: JSON.stringify(selected_user?.name)
                            });
                        }}>Promote</button
                    >
                </div>
            </div>
        {/if}
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
    <dialog class="modal" bind:this={question_select_modal}>
        <div class="modal-box min-w-[75%] ">
            <h1 class="font-bold text-center text-4xl">Questions</h1>
            {#each Object.keys(loaded_questions) as category}
                <h1>{category}</h1>
                <div class="join join-vertical w-full">
                    {#each loaded_questions[category] as question}
                        <button
                            class="btn btn-outline join-item w-full text-center"
                            on:click={() => {
                                current_question = question;
                                revealed_question = {
                                    question: question.question,
                                    category: category
                                };
                                fetch('/api/question', {
                                    method: 'POST',
                                    body: JSON.stringify(revealed_question)
                                });


                                fetch('/api/question', {
                                    method: 'DELETE',
                                });

				question_select_modal.close()
                            }}
                        >
                            {question.question}
                        </button>
                    {/each}
                </div>
            {/each}
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
{/if}

<div class="flex flex-col h-full w-full">
    <p class="text-center text-white font-bold bg-cyan-700">Spectators</p>
    <div class="flex bg-red-600 px-1 pb-1 justify-center space-x-1">
        {#each users.filter((u) => u.type == UserType.Spectator) as spectator}
            <button
                disabled={!admin}
                on:click={() => {
                    selected_user = spectator;
                    user_action_modal.showModal();
                }}
                class="btn min-h-0 h-min !text-black !btn-active bg-white px-4 py-2 indicator rounded-t-none"
            >
                {#if spectator.missing_heartbeats != 0}
                    <span
                        class="indicator-item indicator-bottom indicator-center font-bold badge badge-sm"
                        >{'?'.repeat(spectator.missing_heartbeats)}</span
                    >
                {/if}
                <span class="font-bold italic">{spectator.name}</span>
            </button>
        {/each}
    </div>
    <h1
        class="font-bold text-5xl w-full text-center p-5 bg-red-600 text-white border-b-4 border-neutral-900"
    >
        You are {#if me}
            {me.name}
        {:else}
            <span class="loading loading-ring" />
        {/if}!
    </h1>
    {#if question}
        <h1 class="z-10 bg-neutral-100 text-center font-bold text-5xl">
            Category: {question.category}
        </h1>
    {/if}
    <div class="flex-1 flex justify-center flex-col items-center bg-neutral-100 space-y-2">
        {#if question}
            <h1 class="text-6xl text-center px-5">{question.question}</h1>
            {#if question.choices}
                <div class="flex space-x-1">
                    {#each question.choices as choice}
                        <div class="bg-green-500 text-xl rounded px-2 text-white">{choice}</div>
                    {/each}
                </div>
            {/if}
            {#if question.answer}
                <h1 class="text-xl"><b>Answer:</b> {question.answer}</h1>
            {/if}
        {/if}
    </div>
    <div
        class="flex space-x-3 justify-center overflow-visible items-end p-4 shadow-2xl bg-neutral-500 h-24"
    >
        {#each users.filter((u) => u.type == UserType.Player) as player}
            <PlayerCard user={player} {admin} player={me ? me.type == UserType.Player : true} />
        {/each}
    </div>
</div>
