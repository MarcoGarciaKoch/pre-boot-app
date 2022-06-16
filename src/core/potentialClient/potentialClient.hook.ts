import { PotentialClient } from "./potentialClient.model";
import { useIonLoading } from "@ionic/react";
import { moreInfoClientAPI } from "./potentialClient.api";



export const usePotentialClient = () => {
    const [present, dismiss] = useIonLoading();

    const moreInfoClient = async (potentialClient: PotentialClient) => {
        present(); // loading mode on
        const r = await moreInfoClientAPI(potentialClient);  // Call API moreInfoClient function
        dismiss(); // When API call finishes, loading mode off
        return r.ok;
    }

    return {
        moreInfoClient
    }
}