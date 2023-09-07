import { getBackendUrl } from "./BaseUrl"

export const RegisterApi = (
    username: String,
    hashedPassword: number | null,
) => async function register(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    return fetch(`${getBackendUrl()}/register`, {
        headers: { "content-type": "application/json" }, body: JSON.stringify({
            kind: "register",
            username: username,
            password: hashedPassword,
        }),
        method: "POST"
    }).then(async (response) => {
        if (response.status >= 400)
            throw response.status.toString()
        const responseData = await response.json();
        console.log(responseData)
        return responseData;
    })
} 
