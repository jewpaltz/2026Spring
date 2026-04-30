<script setup lang="ts">
import useSessionStore from '@/stores/session'
import { ref, watch } from 'vue'

const events = ref<gapi.client.calendar.Event[]>([])
const sessionStore = useSessionStore()

watch(
    () => sessionStore.googleToken,
    (newToken) => {
        if (newToken) {
            getCalendarEvents(newToken)
        }
    }, { immediate: true }
)

async function getCalendarEvents(googleToken: string) {
    const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
            headers: {
                Authorization: `Bearer ${googleToken}`,
            },
        },
    )
    const data: gapi.client.calendar.Events = await response.json()
    events.value = data.items || []
}

</script>

<template>
    <div>

        <h1 class="title">Calendar Events</h1>
        <ul>
            <li v-for="event in events" :key="event.id">
                {{ event.summary }} - {{ event.start?.dateTime || event.start?.date }}
            </li>
        </ul>
    </div>
</template>

<style scoped></style>