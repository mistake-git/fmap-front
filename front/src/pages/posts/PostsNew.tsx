import React, { Fragment, useEffect } from "react";
import { Container} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import PostForm from "../../components/posts/PostForm"
import axios from 'axios'
import auth from "../../plugins/firebase";
import UserModel from "../../models/UserModel";

const PostsNew = (props: any) => {
  const [user, setUser] = React.useState<UserModel | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      axios.get(`http://localhost:3000/api/v1/users/${user?.uid}`)
      .then((results) => {
        console.log(results)
        setUser(results.data.user)
      })
      .catch((data) =>{
        console.log(data.user)
      })
    });
  }, []);

  const createPost = async(post: any) => {
    try { 
    await
    axios.post('http://localhost:3000/api/v1/posts',{post: post} ) 
    .then((response) => {
      console.log(response.data)
      console.log('create post')
      props.history.push(`/posts/${response.data.id}`);
    })
    }
    catch (error) {
      alert(error.message);
    }
  }

  const values ={
    image: "",
    name: "", 
    size: "",
    weight: "",
    weather: "",
    number: 1,
    feed: "",
    memo: "",
    date: "",
    time: "",
    status: "",
    user_id: "",
  }

  return (
    <Fragment>
      <Template>
        <Container maxWidth="md" style={{marginTop: "3rem"}}>
          <PostForm 
            action={createPost} 
            values={values}
            user={user}
          />
        </Container>
      </Template>
    </Fragment>
  );
};
export default PostsNew;