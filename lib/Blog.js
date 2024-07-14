'use server'
import Blog from "../model/Blog";
import { connect } from "./connectDB";




export async function createBlog(prevState,formData){

        const title= formData.get('title');
        const quote=formData.get('quote');
        const description=formData.get('description');
        const photo=formData.get('photo');
        const category=formData.get('category');
        console.log(`${title}/n${quote}/n${description}${category}`);
        console.log(photo)


      
    
}


