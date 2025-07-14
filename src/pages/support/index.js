import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostPreview from "./component";
import { useAppDispatch, useAppSelector } from "../../custom/redux";
import { getPosts } from "../../store/action/post.action";

export default function Support() {

	const { posts } = useAppSelector((state) => state.post);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getPosts())
	}, [])

	return (
		<div className="min-h-screen bg-gray-100 p-4">
			<h1 className="text-2xl font-bold mb-4 text-center">Posts</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{posts.map((post) => (

					<PostPreview post={post} key={post._id} />
				))}
			</div>
		</div>
	);
}
