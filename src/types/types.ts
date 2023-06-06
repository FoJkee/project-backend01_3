export type blogsType = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
}

export type Error = {
    message: string,
    field: string,
}
export type postsType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}

