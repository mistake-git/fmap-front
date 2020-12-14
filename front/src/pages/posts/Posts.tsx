import React, { Fragment, useEffect, useState } from "react";
import { Container, Grid } from "@material-ui/core";
import Template from "../../components/layouts/Template";
import PostCard from "../../components/posts/PostCard"
import PostModel from "../../models/PostModel";
import Loading from "../../components/layouts/Loading";
import { myHttpClient } from "../../plugins/axios";
import * as H from 'history';

interface Props {
  history: H.History;
  handleFlash: (message: string, severity: 'success'|'error') => void
  match: any
}

const Posts = (props: Props) => {
 
  const [posts, setPosts] = useState<PostModel[] | null>(null)
  const [loading, setLoading] = useState(true);
　
  //非同期で投稿をAPIから取得
  const getPosts = async() => {
    try { 
    await
      myHttpClient.get('/posts')
      .then((results) => {
        console.log(results)
        setPosts(results.data)
      })
    }
    catch (error) {
      alert(error.message);
    }
  　setLoading(false);
  }

  useEffect(() => {
    getPosts();
  },[setPosts]);


  return (
    <Fragment>
      {loading &&
       <Loading />
      }
      {posts &&
      <Template>
        <Container maxWidth="md">
          <Grid container spacing={2} style={{ marginTop: "4em" }}>
            {posts.map((post) => {
              return(
                <Grid item xs={12} sm={6} md={4}>
                  <PostCard post={post} key={post.id}/>
                </Grid>
              )
            })}
          </Grid>
        </Container>
        </Template>
      }
    </Fragment>
  );
};
export default Posts;



