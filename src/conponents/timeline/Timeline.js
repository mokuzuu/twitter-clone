import React, { useEffect, useState } from 'react'
import Post from './Post'
import "./Timeline.css"
import TweetBox from './TweetBox'
import db from '../../firebase';
import { collection ,  onSnapshot, orderBy, query } from 'firebase/firestore';
import FlipMove from 'react-flip-move';
import {useSelector, useDispatch} from 'react-redux'
import {updatePosts} from '../../postsSlice'
function Timeline() {
  // const [posts,setPosts] = useState([]);
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts.values)
  useEffect(() => {
    const postData = collection(db , "posts");
    const q = query(postData, orderBy("timestamp" , "desc"));
   //getDocs(q).then((querySnapshot) => {
   //  setPosts(querySnapshot.docs.map((doc) => doc.data()));  
   //});

    //リアルタイムにデータを取得する。
    onSnapshot(q,(querySnapshot) => {
      const p = querySnapshot.docs.map((doc) => doc.data())
      console.log(p)
      dispatch(updatePosts(p)   ) })
  } , []);
console.log(posts)
  return (
    <div className='timeline'>
      {/* Header */}
        <div className='timeline-header'>
          <h2>ホーム</h2>
        </div>
      {/* TweetBox */}
      <TweetBox />
      {/* Post */}
      <FlipMove>
      {posts.map((post) =>(
        <Post 
        key={post.text}
        displayName={post.displayName}
        userName={post.userName}
        verified={post.verified}
        text={post.text}
        avatar={post.avatar}
        image={post.image}
      />
      ))}
      </FlipMove>
    </div>
  )
}

export default Timeline
