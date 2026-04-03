import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'

function PostForm({post}) {
    const [formError, setFormError] = useState("")
    const { register, handleSubmit, control, watch, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });

    const navigate = useNavigate();
    const user = useSelector(state => state.auth.userData);

    const submit = async (data) => {
        setFormError("")

        if (!user?.$id) {
            setFormError("Please log in before creating a post.")
            return
        }

        if (post) {
            const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                await appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : post.featuredImage,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (!file) {
                setFormError("Please choose a featured image before creating the post.")
                return;
            }

            const dbPost = await appwriteService.createPost({
                ...data,
                featuredImage: file.$id,
                userId: user?.$id,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
        }

        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-4">
            {formError && (
                <div className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {formError}
                </div>
            )}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post?.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    label="Status :"
                    options={["active", "inactive"]}
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : "bg-blue-500"} className="w-full">
                    {post ? "Update Post" : "Create Post"}
                </Button>
                {!post && (
                    <p className="mt-3 text-xs text-slate-500">
                        New posts need a featured image, title, slug, and content.
                    </p>
                )}
            </div>
        </form>
    );
}

export default PostForm
