import { RamanClient } from "@rumsan/raman";
import { useRumsan } from "@rumsan/react-query";
import { useQuery } from "@tanstack/react-query";


export const useUsersList = () => {
    const { queryClient, RsClient } = useRumsan<RamanClient>();
    
    return useQuery({
        queryKey: ['users'],
        

        queryFn: async () => {
            const { data } = await RsClient.Misc.getLookupData()
            return data
        }
    },
    
)







}