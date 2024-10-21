import useAxios from "../../hooks/useAxios";

export const getPosts = async () => {
    try {
        const res = await useAxios({
            url: "/posts",
            method: "GET",
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
