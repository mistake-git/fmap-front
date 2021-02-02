import React, { Fragment,useState } from "react";
import {　Box, Container, Grid} from "@material-ui/core";
import Template from "../../components/layouts/Template";
import UserModel from "../../models/UserModel";
import UserCard from "../../components/users/UserCard";
import SearchForm from "../../components/layouts/SearchForm";
import InfiniteScroll  from "react-infinite-scroller"
import LoadingDots from "../../components/layouts/LoadingDots";
import UsersRepository from "../../repositories/UsersRepository";

const Users = () => {
  const [users, setUsers] = useState<UserModel[]>([])
  const [hasMore, setHasMore] = useState(true);
  const　placeHolder ="ユーザー名を検索"

  const getUsers = async(page: number) => {
    try { 
    await
      UsersRepository.getUsers(page)
      .then((results) => {
        console.log(results)
        if (results.length < 1) {
          setHasMore(false);
          return;
        }
        const newUsers = users.concat(results)
        setUsers(newUsers)
      })
    }catch (error){
      console.log(error.message);
    }
  }

  const loadMore = async (page: number) => {
    getUsers(page)    
  }

  const search = async(search: string) => {
    try { 
    await
      UsersRepository.search(search)
      .then((results) => {
        console.log(results)
        setUsers(results)
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  const loader = <LoadingDots/>;

  return (
    <Fragment>
      <Template>
        <Container maxWidth="md">
          <Box my={3}>
            <SearchForm
              search={search}
              placeHolder={placeHolder}
            />
          </Box>
            <InfiniteScroll
              loadMore={loadMore} 
              hasMore={hasMore}
              loader={loader}>
                <Grid container style={{ marginTop: "1em" }}>
                {
                  users ? users.map((user) => {
                    return(
                      <Grid xs={6} sm={4} md={3} lg={2}>
                        <UserCard user={user} key={user.id}/>
                      </Grid>
                    )
                  }):
                  <div>ユーザーがいません</div>
                }
              </Grid>
            </InfiniteScroll>
        </Container>
        </Template>
    </Fragment>
  );
};
export default Users;






