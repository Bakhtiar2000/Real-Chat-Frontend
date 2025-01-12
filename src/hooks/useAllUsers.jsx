import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxios";

const useUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: usersData = [], isLoading: usersLoading, refetch: usersRefetch } = useQuery({
        queryKey: ['UsersData'],
        queryFn: async () => {
            const res = await axiosSecure.get("users");
            return res.data;
        },
    });
    return [usersData, usersLoading, usersRefetch];
};

export default useUsers;