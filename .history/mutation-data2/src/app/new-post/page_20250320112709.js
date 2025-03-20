export default function NewPostPage(){
    
    function createPost(formData){
        "use server";
        const title = formData.get('title');
        const image = formData.get('image');
        const content = formData.get('content');

        console.log(title,image,content)

    }
    
    
    return(
        <>
        
        <h1>Create new post</h1>

        <form action={createPost}>
            <p className="form-control">
            <label htmlFor="title">Title</label>
            <input type='text' id='title' name='title' />

            </p>

            <p className="form-control">
            <label htmlFor="image">Image URL</label>
            <input type="file" accept="image/png, image/jpeg" 
            id="image"
            name="image" />
            </p>

            <p className="form-control">
                <label htmlFor="content">content</label>
                <textarea id ='content' name='content' row='5' />
            </p>

            <p className="form-action">
                <button type='reset'>reset</button>
                <button>Create post</button>
            </p>
        </form>
        </>
    )
}