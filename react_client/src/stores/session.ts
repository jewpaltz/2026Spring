import type { DataEnvelope, User } from "../../../server/types"
import { loadScript } from "../services/myFetch"
import { api } from "../services/myFetch"

export type FeedbackMessage = {
    type: "success" | "danger" | "info"
    text: string
}
const useSessionStore = () => {
    return {
        user: {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            image: "https://via.placeholder.com/150",
        } as User | null,
        token: "",
        googleToken: "",
        messages: [] as FeedbackMessage[],
        addMessage(text: string, type: FeedbackMessage["type"] = "info") {
            this.messages.push({ type, text })
        },
        async login() {
            await loadScript(
                "https://accounts.google.com/gsi/client",
                "google-signin",
            )

            const tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                scope: "email profile https://www.googleapis.com/auth/calendar.events.readonly",
                callback: async (response: any) => {
                    if (response.error) {
                        throw new Error(response.error)
                    }
                    console.log({ response })
                    this.googleToken = response.access_token
                    await exchangeForOurToken(response.access_token)
                },
            })
            tokenClient.requestAccessToken()

            const exchangeForOurToken = async (googleToken: string) => {
                const response = await api<
                    DataEnvelope<{ user: User; token: string }>
                >("users/login", { googleToken }, { method: "POST" })
                if (!response.isSuccess) {
                    this.addMessage(
                        response.message || "Login failed",
                        "danger",
                    )
                    return
                }
                const { user: loggedInUser, token: authToken } = response.data
                this.user = loggedInUser
                this.token = authToken
            }
        },
        logout() {
            this.user = null
            //this.token = null;
        },
        handleError: () => {},
        isLoading: false,
        api: () => Promise.resolve(),
    }
}

export default useSessionStore
