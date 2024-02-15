import React,{useEffect, useContext, useState} from 'react'

import { CommentForm } from './CommentForm'
import { Loading } from './Loading'
import { Comment } from './Comment'
import { useCommentsLoading } from './useCommentsLoading'
import { FirebaseContext } from "../firebase/FirebaseContext";
import { IComment, IPost } from '../constants/typescript-types'

type TProps = { postAll: any[], postIDparam: string}
export const CommentsPage: React.FC<TProps> = ({ postAll, postIDparam }) =>{
   const [comments, setComments] = useState([] as any);
   var postsAll: any[] =[];
   const firebase = useContext(FirebaseContext);
   // const { comments, loadComments, isCommentsOver, isLoading } = useCommentsLoading()
   // if (comments.length === 0) {
   //    return [];
   // }
   
   let commentsTemplate ={};
   // if(postAll !== undefined){
      
      commentsTemplate = comments.map((comment: any, index: number) => {
         
         return (
         <Comment
            key={comment.comments.created.nanoseconds}
            commentIndex={index}
            comment={comment.comments}
         />
      )})
   // }
  
   useEffect(() => {
      firebase.db
        .collection("posts").doc(postIDparam)
        .collection("comments")
        .onSnapshot((snapshot) =>
          // setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
          {
            postsAll = snapshot.docs.map((doc) => ({
              postID: doc.id,
              comments: doc.data(),
            }));
            setComments(postsAll);
          }
        )
    }, []);


   // const showLoader: boolean = !isCommentsOver && !comments.length
   // const showLoadButton: boolean = !isCommentsOver && !isLoading

   return (
      // showLoader
      //    ?
      //    <Loading />
      //    :
         <div className="comments">
            <CommentForm  postIDparam={postIDparam} />
            {commentsTemplate}
            {/* {comments !== undefined && comments.length !== 0 ? "": 
            comments.forEach((comment: IComment, index: number) => {
               
               return <Comment
                     key={comment.created.nanoseconds}
                     commentIndex={index}
                     comment={comment}
                  />
            })} */}
         
            {/* {showLoadButton && <button onClick={loadComments}>Load more comments</button>} */}
         </div >
   )
}