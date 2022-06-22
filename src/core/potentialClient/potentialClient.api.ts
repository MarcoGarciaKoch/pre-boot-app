import { PotentialClient } from "./potentialClient.model";


const generateClientPostRequest = (potentialClient: PotentialClient) => (
    {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(potentialClient)
    }
)

export const moreInfoClientAPI = async (potentialClient: PotentialClient) => {
    return await fetch(`${process.env.REACT_APP_API_BASE_URL}/potentialclient/moreInfo`, generateClientPostRequest(potentialClient));
}
