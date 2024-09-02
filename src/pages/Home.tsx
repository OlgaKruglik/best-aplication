import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/userSlice';
import Header from '../copmonent/Header';
import styles from '../style/Main.module.css';
import { RootState, AppDispatch } from '../store/stote';
import usePagination from '../hook/usePagination';

interface Post {
userId: number;
id: number;
title: string;
body: string;
}

function Home() {
const dispatch = useDispatch<AppDispatch>();
const posts = useSelector((state: RootState) => state.user.posts);
const status = useSelector((state: RootState) => state.user.status);
const error = useSelector((state: RootState) => state.user.error);

useEffect(() => {
if (status === 'idle') {
dispatch(fetchPosts());
}
}, [status, dispatch]);

const { currentItems, currentPage, setCurrentPageWithNavigation } = usePagination(posts, 8);

if (status === 'loading') {
return <div>Loading...</div>;
}

if (status === 'failed') {
return <div>Error: {error}</div>;
}

return (
<div className={styles.main}>
<Header />
<div className={styles.containerUsers}>
{currentItems.map((post: Post) => (
<div className={styles.infoUser} key={post.id}>
<p className={styles.pUser}>{post.body}</p>
<h2 className={styles.heading2}>{post.title}</h2>
</div>
))}
</div>
<div className={styles.pagination}>
<button className={styles.btn} onClick={() => setCurrentPageWithNavigation(currentPage - 1)} disabled={currentPage === 1}>
Previous
</button>
<button className={styles.btn} onClick={() => setCurrentPageWithNavigation(currentPage + 1)} disabled={currentItems.length < 8}>
Next
</button>
</div>
</div>
);
}

export default Home;


