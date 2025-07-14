import { instanceForJSON } from "../api/instance"

const postService = {
    async get_all_posts() {
        const postReponse = await instanceForJSON.get("/backpanel/post/get");
        return postReponse.data;
    }
}
export default postService;